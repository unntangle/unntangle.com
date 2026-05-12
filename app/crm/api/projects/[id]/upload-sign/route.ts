import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { uploadFolder } from '../../../../lib/cloudinary';

export const runtime = 'nodejs';

// ============================================================
// POST /api/projects/:id/upload-sign
//
// Mints a Cloudinary signature scoped to THIS project's next
// revision folder. The browser uses the returned `upload_url`
// and `params` to PUT the zip directly to Cloudinary,
// bypassing Vercel's 4.5 MB inbound body limit.
//
// Returns:
//   {
//     upload_url: "https://api.cloudinary.com/v1_1/<cloud>/raw/upload",
//     params:    { ...all the form fields to POST },
//     revision:  N      ← so the UI can label the upload
//   }
//
// Server-side validation:
//   - Project must exist
//   - Project must not be 'approved' (already done)
//   - Folder + public_id are derived from project metadata, not
//     from client input, so a compromised browser can't write
//     into another project's namespace.
// ============================================================

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('3d_artist');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary env vars missing on server.' },
      { status: 500 }
    );
  }

  // ----- Load project + client -----
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

  // Compute the upcoming revision number. First upload on a draft
  // → revision 1; resubmission after a rejection → previous + 1.
  const nextRevision =
    project.status === 'draft' ? 1 : project.revision_count + 1;

  const folder = uploadFolder(cSlug, project.slug, nextRevision);
  const publicId = 'source';
  // Cloudinary appends the format automatically based on the
  // uploaded file — so the final URL will end in ".zip".

  const timestamp = Math.floor(Date.now() / 1000);

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  const paramsToSign = {
    folder,
    public_id: publicId,
    timestamp,
    overwrite: true,
    use_filename: false,
    unique_filename: false,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    CLOUDINARY_API_SECRET
  );

  return NextResponse.json({
    upload_url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    params: {
      api_key: CLOUDINARY_API_KEY,
      timestamp,
      signature,
      folder,
      public_id: publicId,
      overwrite: 'true',
      use_filename: 'false',
      unique_filename: 'false',
    },
    revision: nextRevision,
  });
}
