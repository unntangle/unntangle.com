import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { uploadBuffer, approvedFolder } from '../../../../lib/cloudinary';

export const runtime = 'nodejs';
export const maxDuration = 300;

// ============================================================
// POST /api/projects/:id/feedback
// Body (JSON):
//   { image_urls: string[],   // Cloudinary URLs from feedback-sign
//     note?: string }
//
// Decision rule (as specified by the user):
//   - image_urls non-empty → REJECT
//   - image_urls empty     → APPROVE
//
// REJECT path:
//   - status = 'rejected'
//   - one row per URL inserted into crm_feedback_images,
//     tagged with current revision
//
// APPROVE path:
//   - status = 'approved'
//   - the current glb_url is copied to <client>/<slug>/approved/<slug>.glb
//     so OfficeMate gets a stable, version-pinned public URL
// ============================================================

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('qa');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  // ----- Load project + client -----
  const { data: project, error: pErr } = await supabase()
    .from('crm_projects')
    .select(
      'id, slug, name, status, revision_count, glb_url, client:crm_clients(slug)'
    )
    .eq('id', id)
    .maybeSingle();

  if (pErr || !project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }
  if (project.status !== 'qa_pending') {
    return NextResponse.json(
      {
        error: `Project is "${project.status}" — only "qa_pending" projects can be reviewed.`,
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
  const note =
    typeof body.note === 'string' && body.note.trim() ? body.note.trim() : null;

  // Validate every URL is from our Cloudinary cloud so a malicious
  // QA client can't insert arbitrary external image references.
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const imageUrls: string[] = rawUrls
    .filter((u): u is string => typeof u === 'string')
    .filter(
      (u) =>
        cloud
          ? u.startsWith(`https://res.cloudinary.com/${cloud}/`)
          : u.startsWith('https://res.cloudinary.com/')
    );

  const revision = project.revision_count || 1;

  // ============================================================
  // Branch A: REJECT
  // ============================================================
  if (imageUrls.length > 0) {
    const rows = imageUrls.map((url) => ({
      project_id: id,
      revision,
      image_url: url,
      note,
      uploaded_by: auth.userId,
    }));
    const { error: fErr } = await supabase()
      .from('crm_feedback_images')
      .insert(rows);
    if (fErr) {
      console.error('[feedback.reject] insert', fErr);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    const { error: uErr } = await supabase()
      .from('crm_projects')
      .update({
        status: 'rejected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (uErr) {
      console.error('[feedback.reject] update', uErr);
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
  // Branch B: APPROVE
  // Copy the latest glb to the stable "approved" folder so that
  // officemate.unntangle.com/<slug> serves a consistent URL even
  // when the artist later uploads new revisions.
  //
  // Cloudinary has no "copy" op — we fetch the bytes and re-upload
  // under a fixed public_id.
  // ============================================================
  let approvedUrl: string;
  try {
    const res = await fetch(project.glb_url);
    if (!res.ok) {
      throw new Error(`Could not fetch glb_url: ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const uploaded = await uploadBuffer(buf, {
      folder: approvedFolder(cSlug, project.slug),
      publicId: project.slug,
      resourceType: 'raw',
    });
    approvedUrl = uploaded.secure_url;
  } catch (err) {
    console.error('[feedback.approve] copy', err);
    return NextResponse.json(
      { error: 'Could not finalise approved asset: ' + (err as Error).message },
      { status: 500 }
    );
  }

  const { error: uErr } = await supabase()
    .from('crm_projects')
    .update({
      status: 'approved',
      approved_glb_url: approvedUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (uErr) {
    console.error('[feedback.approve] update', uErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    decision: 'approved',
    approved_glb_url: approvedUrl,
  });
}

// ============================================================
// GET /api/projects/:id/feedback
// Returns all feedback images for the project, grouped by revision.
// Used by the artist dashboard so they can review what QA flagged.
// ============================================================
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const { data, error } = await supabase()
    .from('crm_feedback_images')
    .select('id, revision, image_url, note, created_at')
    .eq('project_id', id)
    .order('revision', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ feedback: data });
}
