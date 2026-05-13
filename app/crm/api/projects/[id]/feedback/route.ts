import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { isOurPublicUrl } from '../../../../lib/r2';

export const runtime = 'nodejs';
export const maxDuration = 300;

// ============================================================
// POST /api/projects/:id/feedback
// Body (JSON):
//   { image_urls: string[],   // R2 public URLs from feedback-sign
//     note?: string }
//
// Decision rule:
//   - image_urls non-empty → REJECT (back to artist)
//   - image_urls empty     → APPROVE (forward to client for sign-off)
//
// REJECT path:
//   - status = 'rejected'
//   - one row per URL inserted into uflow_feedback_images,
//     tagged with current revision
//
// APPROVE path:
//   - status = 'client_review' (NOT 'approved' — two-stage approval)
//   - We do NOT copy the GLB to the approved/ folder yet. That
//     happens only when the client also approves (in the client-
//     review endpoint). Until then the public viewer must not
//     publish this model.
// ============================================================

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('admin');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  // ----- Load project (we no longer need the client slug here —
  // the GLB copy to the approved/ folder happens in the client-
  // review endpoint now). -----
  const { data: project, error: pErr } = await supabase()
    .from('uflow_projects')
    .select(
      'id, slug, name, status, revision_count, glb_url'
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

  // Validate every URL is from our R2 bucket so a malicious admin
  // client can't insert arbitrary external image references.
  const imageUrls: string[] = rawUrls
    .filter((u): u is string => typeof u === 'string')
    .filter((u) => isOurPublicUrl(u));

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
      .from('uflow_feedback_images')
      .insert(rows);
    if (fErr) {
      console.error('[feedback.reject] insert', fErr);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    const { error: uErr } = await supabase()
      .from('uflow_projects')
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
  // Branch B: APPROVE → forward to client
  //
  // Two-stage approval: admin approval no longer finalises the
  // job. We move it to 'client_review' so the client can sign off
  // in /client/qa/[id]. The GLB copy to the approved/ folder is
  // deferred until that final approval (so the public viewer
  // doesn't accidentally publish unsigned-off models).
  // ============================================================
  const { error: uErr } = await supabase()
    .from('uflow_projects')
    .update({
      status: 'client_review',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (uErr) {
    console.error('[feedback.approve] update', uErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    decision: 'client_review',
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
    .from('uflow_feedback_images')
    .select('id, revision, image_url, note, created_at')
    .eq('project_id', id)
    .order('revision', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ feedback: data });
}
