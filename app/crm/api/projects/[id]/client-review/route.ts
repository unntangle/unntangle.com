import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import {
  uploadBuffer,
  fetchFromUrl,
  approvedKey,
  isOurPublicUrl,
} from '../../../../lib/r2';

export const runtime = 'nodejs';
export const maxDuration = 300;

// ============================================================
// POST /api/projects/:id/client-review
// Body (JSON):
//   { image_urls: string[],   // R2 public URLs from client-feedback-sign
//     note?: string }
//
// Mirrors the admin /feedback endpoint's decision rule:
//   - image_urls non-empty → REJECT (back to admin's QA queue)
//   - image_urls empty     → APPROVE (final — model goes public)
//
// Auth: 'client' role only. Project must be in 'client_review'
// status AND belong to the caller's own brand (auth.clientId).
// A client can NEVER act on another brand's project.
//
// REJECT path:
//   - status = 'qa_pending' (back to admin, NOT to artist directly)
//   - one row per URL inserted into uflow_client_feedback_images
//   - admin sees the rejected project in their QA queue with the
//     client's feedback alongside it
//
// APPROVE path:
//   - Copy the latest glb_url to <client>/<slug>/approved/<slug>.glb
//     so officemate.unntangle.com/<slug> serves a stable URL even
//     when the artist later uploads new revisions to other projects
//   - status = 'approved' (final)
//   - approved_glb_url = the copied URL
// ============================================================
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('client');
  if (auth instanceof NextResponse) return auth;

  if (!auth.clientId) {
    return NextResponse.json(
      { error: 'Your account is not linked to a client brand.' },
      { status: 403 }
    );
  }

  const { id } = await params;

  // ----- Load project + client slug -----
  const { data: project, error: pErr } = await supabase()
    .from('uflow_projects')
    .select(
      'id, slug, name, status, revision_count, glb_url, client_id, client:uflow_clients(slug)'
    )
    .eq('id', id)
    .maybeSingle();

  if (pErr || !project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  // ----- Brand scoping check -----
  // A client can only act on projects belonging to their own brand.
  // We compare the trusted JWT clientId against the project's
  // client_id; never trust anything from the request body.
  if (project.client_id !== auth.clientId) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  // ----- Status guard -----
  if (project.status !== 'client_review') {
    return NextResponse.json(
      {
        error: `Project is "${project.status}" — only "client_review" projects can be reviewed by a client.`,
      },
      { status: 400 }
    );
  }
  if (!project.glb_url) {
    return NextResponse.json(
      { error: 'Project has no GLB to review.' },
      { status: 400 }
    );
  }

  const clientRel = project.client as
    | { slug: string }
    | { slug: string }[]
    | null;
  const cSlug = Array.isArray(clientRel) ? clientRel[0]?.slug : clientRel?.slug;
  if (!cSlug) {
    return NextResponse.json(
      { error: 'Project has no client.' },
      { status: 500 }
    );
  }

  // ----- Parse JSON body -----
  let body: { image_urls?: unknown; note?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const rawUrls = Array.isArray(body.image_urls) ? body.image_urls : [];

  // Defensive: ensure every URL is from our R2 bucket so a client
  // can't pin arbitrary external image references as "feedback".
  const imageUrls: string[] = rawUrls
    .filter((u): u is string => typeof u === 'string')
    .filter((u) => isOurPublicUrl(u));

  const revision = project.revision_count || 1;

  // ============================================================
  // Branch A: REJECT → back to admin's QA queue
  //
  // Per the agreed policy, client rejection sends the project
  // back to admin (status='qa_pending') rather than directly to
  // the artist. The admin then decides whether to forward the
  // rejection to the artist or push back on the client.
  // ============================================================
  if (imageUrls.length > 0) {
    const rows = imageUrls.map((url) => ({
      project_id: id,
      revision_number: revision,
      image_url: url,
      uploaded_by: auth.userId,
    }));
    const { error: fErr } = await supabase()
      .from('uflow_client_feedback_images')
      .insert(rows);
    if (fErr) {
      console.error('[client-review.reject] insert', fErr);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    const { error: uErr } = await supabase()
      .from('uflow_projects')
      .update({
        status: 'qa_pending',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (uErr) {
      console.error('[client-review.reject] update', uErr);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      decision: 'rejected',
      revision,
      feedback_count: imageUrls.length,
    });
  }

  // ============================================================
  // Branch B: APPROVE → final, publish
  //
  // Now we copy the GLB to the stable approved/ folder. This was
  // previously done by the admin /feedback endpoint; with the
  // new two-stage flow it moves here, since client approval is
  // what makes a model public.
  // ============================================================
  let approvedUrl: string;
  try {
    const buf = await fetchFromUrl(project.glb_url);
    const { publicUrl } = await uploadBuffer({
      key: approvedKey(cSlug, project.slug, `${project.slug}.glb`),
      body: buf,
      contentType: 'model/gltf-binary',
    });
    approvedUrl = publicUrl;
  } catch (err) {
    console.error('[client-review.approve] copy', err);
    return NextResponse.json(
      { error: 'Could not finalise approved asset: ' + (err as Error).message },
      { status: 500 }
    );
  }

  const { error: uErr } = await supabase()
    .from('uflow_projects')
    .update({
      status: 'approved',
      approved_glb_url: approvedUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (uErr) {
    console.error('[client-review.approve] update', uErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    decision: 'approved',
    approved_glb_url: approvedUrl,
  });
}

// ============================================================
// GET /api/projects/:id/client-review
//
// Returns all client-feedback images for the project. Used by
// admin's QA page to surface why the client previously rejected
// a project that has come back around to qa_pending.
//
// Auth:
//   - admin: any project
//   - client: only their own brand's project
// ============================================================
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;
  if (auth.role !== 'admin' && auth.role !== 'client') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  // Client-role scoping check: verify the project belongs to the
  // caller's own brand before exposing any feedback.
  if (auth.role === 'client') {
    if (!auth.clientId) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
    const { data: p } = await supabase()
      .from('uflow_projects')
      .select('client_id')
      .eq('id', id)
      .maybeSingle();
    if (!p || p.client_id !== auth.clientId) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
  }

  const { data, error } = await supabase()
    .from('uflow_client_feedback_images')
    .select('id, revision_number, image_url, created_at')
    .eq('project_id', id)
    .order('revision_number', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[client-review.list]', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ feedback: data });
}
