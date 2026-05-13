import { notFound } from 'next/navigation';
import { requireUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';
import ReferencesGallery from './ReferencesGallery';

// ============================================================
// QA References gallery (one project per route)
// /admin/qa/[id]/references
//
// A standalone page that lists every reference image attached
// to a project at job-creation time. Opened in a NEW TAB from
// the QA review page so the reviewer can compare the model and
// the references side-by-side (one tab per monitor).
//
// Auth: admin only. We don't restrict by project status here
// (unlike /admin/qa/[id] which enforces qa_pending), since
// looking up references should still work for approved /
// rejected projects.
// ============================================================

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reference images',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Auth gate. We don't actually use the user info here, but
  // calling this enforces the session check + role.
  await requireUser('admin');
  const { id } = await params;

  const { data: project } = await supabase()
    .from('uflow_projects')
    .select('id, slug, name, client:uflow_clients(slug, name)')
    .eq('id', id)
    .maybeSingle();

  if (!project) notFound();

  const { data: references } = await supabase()
    .from('uflow_project_references')
    .select('id, image_url, created_at')
    .eq('project_id', id)
    .order('created_at', { ascending: true });

  // Same client-relation normalisation as the parent page.
  const c = Array.isArray(project.client) ? project.client[0] : project.client;

  return (
    <ReferencesGallery
      project={{
        id: project.id,
        slug: project.slug,
        name: project.name,
        client: c ?? { slug: '', name: '' },
      }}
      references={references ?? []}
    />
  );
}
