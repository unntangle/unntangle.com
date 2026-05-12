import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'node:crypto';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import { feedbackFolder } from '../../../../lib/cloudinary';

export const runtime = 'nodejs';

// ============================================================
// POST /api/projects/:id/feedback-sign
// Body: { count: number }
//
// Returns N signed Cloudinary upload params. The QA dashboard
// uses these to upload feedback images directly to Cloudinary
// (bypassing Vercel's 4.5 MB body limit), then sends just the
// resulting URLs to /feedback to finalise the rejection.
// ============================================================

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('qa');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  let body: { count?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const count = body.count || 0;
  if (count < 1 || count > 20) {
    return NextResponse.json(
      { error: 'count must be between 1 and 20.' },
      { status: 400 }
    );
  }

  // Look up project + client
  const { data: project } = await supabase()
    .from('crm_projects')
    .select('slug, status, revision_count, client:crm_clients(slug)')
    .eq('id', id)
    .maybeSingle();
  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }
  if (project.status !== 'qa_pending') {
    return NextResponse.json(
      { error: `Cannot sign feedback uploads for status "${project.status}".` },
      { status: 400 }
    );
  }
  const clientSlug = Array.isArray(project.client)
    ? (project.client[0] as { slug: string } | undefined)?.slug
    : (project.client as { slug: string } | null)?.slug;
  if (!clientSlug) {
    return NextResponse.json({ error: 'Project has no client.' }, { status: 500 });
  }

  // Configure Cloudinary
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: 'Cloudinary not configured.' },
      { status: 500 }
    );
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  const folder = feedbackFolder(
    clientSlug,
    project.slug,
    project.revision_count || 1
  );
  const timestamp = Math.round(Date.now() / 1000);

  const signed = Array.from({ length: count }, () => {
    const publicId = `${timestamp}-${randomUUID().slice(0, 8)}`;
    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder,
      public_id: publicId,
      overwrite: 'true',
      use_filename: 'false',
      unique_filename: 'false',
    };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      CLOUDINARY_API_SECRET
    );
    return {
      upload_url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      params: {
        ...paramsToSign,
        api_key: CLOUDINARY_API_KEY,
        signature,
      },
    };
  });

  return NextResponse.json({ signed });
}
