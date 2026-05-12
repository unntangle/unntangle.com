import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

export const runtime = 'nodejs';

// ============================================================
// GET /api/projects        → list all projects (joined with client)
// POST /api/projects       → create a new project (artist-only)
//   body: { client_slug: 'officemate', slug: 'mars-desk', name: 'Mars Desk' }
// ============================================================

export async function GET() {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabase()
    .from('crm_projects')
    .select(
      'id, slug, name, status, revision_count, zip_url, glb_url, fbx_url, gltf_url, approved_glb_url, updated_at, client:crm_clients(slug, name)'
    )
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[projects.list]', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ projects: data });
}

export async function POST(req: NextRequest) {
  const auth = await requireApiUser('3d_artist');
  if (auth instanceof NextResponse) return auth;

  let body: { client_slug?: string; slug?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { client_slug, slug, name } = body;
  if (!client_slug || !slug || !name) {
    return NextResponse.json(
      { error: 'client_slug, slug, name required.' },
      { status: 400 }
    );
  }

  // Normalise slug — lowercase, alphanumeric + dash only.
  const cleanSlug = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!cleanSlug) {
    return NextResponse.json({ error: 'Invalid slug.' }, { status: 400 });
  }

  // Resolve client.
  const { data: client, error: cErr } = await supabase()
    .from('crm_clients')
    .select('id')
    .eq('slug', client_slug)
    .maybeSingle();
  if (cErr || !client) {
    return NextResponse.json(
      { error: `Unknown client: ${client_slug}` },
      { status: 400 }
    );
  }

  const { data, error } = await supabase()
    .from('crm_projects')
    .insert({
      client_id: client.id,
      slug: cleanSlug,
      name,
      status: 'draft',
      created_by: auth.userId,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: `A project with slug "${cleanSlug}" already exists for this client.` },
        { status: 409 }
      );
    }
    console.error('[projects.create]', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ project: data });
}
