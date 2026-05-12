import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { processArtistZipFromUrl } from '../../../../lib/zip';

export const runtime = 'nodejs';
// Long-running because we still extract + re-upload pieces to Cloudinary.
// The original zip is already on Cloudinary (uploaded direct from browser),
// so this server only does the extraction step.
export const maxDuration = 300;

// ============================================================
// POST /api/projects/:id/finalize-upload
// Body: { zip_url: string }
//
// Called AFTER the browser has uploaded the .zip directly to
// Cloudinary. We:
//   1. Verify the project exists and is in a state that accepts uploads
//   2. Compute next revision number
//   3. Fetch the zip from Cloudinary, extract its parts, push each
//      part back to Cloudinary under .../uploads/rev-N/
//   4. Update project row → qa_pending
//
// Why split from upload-signature?
//   The signature endpoint is hit ONCE before upload — fast.
//   This endpoint runs AFTER upload — slow (downloads, parses zip,
//   uploads 3 files). Splitting lets the signing path stay snappy
//   and lets us safely set a long maxDuration just for the heavy step.
// ============================================================

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('3d_artist');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  let body: { zip_url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { zip_url } = body;
  if (!zip_url || !/^https:\/\/res\.cloudinary\.com\//.test(zip_url)) {
    return NextResponse.json(
      { error: 'zip_url must be a Cloudinary URL.' },
      { status: 400 }
    );
  }

  // ----- 1. Load project + client -----
  const { data: project, error: pErr } = await supabase()
    .from('crm_projects')
    .select('id, slug, status, revision_count, client:crm_clients(slug)')
    .eq('id', id)
    .maybeSingle();

  if (pErr || !project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }
  if (project.status === 'approved') {
    return NextResponse.json(
      { error: 'Project is already approved.' },
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

  const nextRevision =
    project.status === 'draft' ? 1 : project.revision_count + 1;

  // ----- 2. Extract + re-upload pieces -----
  let processed;
  try {
    processed = await processArtistZipFromUrl(
      zip_url,
      cSlug,
      project.slug,
      nextRevision
    );
  } catch (err) {
    console.error('[finalize-upload] zip error', err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }

  // ----- 3. Update project row -----
  const { error: uErr } = await supabase()
    .from('crm_projects')
    .update({
      status: 'qa_pending',
      revision_count: nextRevision,
      zip_url,
      glb_url: processed.glbUrl,
      fbx_url: processed.fbxUrl,
      gltf_url: processed.gltfUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (uErr) {
    console.error('[finalize-upload] db update', uErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    revision: nextRevision,
    status: 'qa_pending',
    urls: processed,
  });
}
