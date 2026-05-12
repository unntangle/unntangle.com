import { requireUser } from '../lib/auth';
import { supabase, ProjectStatus } from '../lib/supabase';
import NavBar from '../components/NavBar';
import ArtistDashboard from './ArtistDashboard';

// ============================================================
// 3D Artist dashboard
// - Lists all projects (across clients)
// - Can create new project
// - Can upload zip for any non-approved project
// - Can view feedback images on rejected projects
// ============================================================

export const dynamic = 'force-dynamic';

type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  status: ProjectStatus;
  revision_count: number;
  zip_url: string | null;
  glb_url: string | null;
  approved_glb_url: string | null;
  updated_at: string;
  client: { slug: string; name: string } | { slug: string; name: string }[] | null;
};

export default async function ArtistPage() {
  const user = await requireUser('3d_artist');

  const { data: projects } = await supabase()
    .from('crm_projects')
    .select(
      'id, slug, name, status, revision_count, zip_url, glb_url, approved_glb_url, updated_at, client:crm_clients(slug, name)'
    )
    .order('updated_at', { ascending: false });

  const { data: clients } = await supabase()
    .from('crm_clients')
    .select('slug, name')
    .order('name');

  // Normalise the joined `client` field (supabase typing returns it as
  // either an object or a single-element array depending on version).
  const normalised = (projects || []).map((p) => {
    const row = p as ProjectRow;
    const c = Array.isArray(row.client) ? row.client[0] : row.client;
    return { ...row, client: c ?? { slug: '', name: '' } };
  });

  return (
    <>
      <NavBar name={user.name} role={user.role} />
      <ArtistDashboard
        initialProjects={normalised as never}
        clients={clients || []}
      />
    </>
  );
}
