import { requireUser } from '../lib/auth';
import { supabase, ProjectStatus } from '../lib/supabase';
import NavBar from '../components/NavBar';
import QaDashboard from './QaDashboard';

export const dynamic = 'force-dynamic';

type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  status: ProjectStatus;
  revision_count: number;
  glb_url: string | null;
  approved_glb_url: string | null;
  updated_at: string;
  client: { slug: string; name: string } | { slug: string; name: string }[] | null;
};

export default async function QaPage() {
  const user = await requireUser('qa');

  const { data } = await supabase()
    .from('crm_projects')
    .select(
      'id, slug, name, status, revision_count, glb_url, approved_glb_url, updated_at, client:crm_clients(slug, name)'
    )
    .order('updated_at', { ascending: false });

  const normalised = (data || []).map((p) => {
    const r = p as ProjectRow;
    const c = Array.isArray(r.client) ? r.client[0] : r.client;
    return { ...r, client: c ?? { slug: '', name: '' } };
  });

  return (
    <>
      <NavBar name={user.name} role={user.role} />
      <QaDashboard initialProjects={normalised as never} />
    </>
  );
}
