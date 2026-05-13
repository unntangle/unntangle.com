import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { signUploadUrl, uploadKey } from '../../../../lib/r2';

export const runtime = 'nodejs';

// ============================================================
// POST /api/projects/:id/upload-sign
//
// Mints a Cloudflare R2 presigned PUT URL scoped to THIS
// project's next revision folder. The browser then PUTs the
// zip body directly to that URL — bypassing Vercel's 4.5 MB
// inbound limit and not bound by any per-file size cap from
// our storage layer.
//
// Returns:
//   {
//     upload_url:    string  // presigned URL the browser PUTs to
//     public_url:    string  // where the file will be readable from
//     revision:      number  // so the UI can label the upload
//   }
//
// Server-side validation:
//   - Project must exist
//   - Project must not be 'approved' (already done)
//   - Key is derived from project metadata, not from client input,
//     so a compromised browser can't write into another project.
// ============================================================

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('3d_artist');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  // ----- Load project + client -----
  const { data: project, error: pErr } = await supabase()
    .from('uflow_projects')
    .select('id, slug, status, revision_count, client:uflow_clients(slug)')
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

  // First upload on a draft → revision 1;
  // resubmission after a rejection → previous + 1.
  const nextRevision =
    project.status === 'draft' ? 1 : project.revision_count + 1;

  // The zip lands at <client>/<slug>/uploads/rev-N/source.zip.
  // Fixed filename so each revision has exactly one source zip;
  // the browser is told to PUT to this key.
  const key = uploadKey(cSlug, project.slug, nextRevision, 'source.zip');

  try {
    const { url, publicUrl } = await signUploadUrl({
      key,
      contentType: 'application/zip',
      // Long enough for a slow connection uploading a big zip,
      // short enough that a leaked URL stops being useful soon.
      expiresInSeconds: 3600,
    });

    return NextResponse.json({
      upload_url: url,
      public_url: publicUrl,
      revision: nextRevision,
    });
  } catch (err) {
    console.error('[upload-sign]', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Could not sign upload.' },
      { status: 500 }
    );
  }
}
