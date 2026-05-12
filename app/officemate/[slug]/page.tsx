import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '../../crm/lib/supabase';

// ============================================================
// officemate.unntangle.com/<slug>
//
// Renders an interactive 3D model viewer for whichever model
// the CRM has marked as 'approved' for this slug.
//
// The existing static jupiter page (public/officemate/jupiter/
// index.html) takes priority over this route for the literal
// path /jupiter — Next.js always serves public/ files before
// hitting the app router. New models added via the CRM after
// today will route through this dynamic page.
// ============================================================

export const dynamic = 'force-dynamic';
export const revalidate = 60;

type ApprovedModel = {
  name: string;
  glb_url: string;
  updated_at: string;
};

async function loadModel(slug: string): Promise<ApprovedModel | null> {
  const { data } = await supabase()
    .from('crm_projects')
    .select(
      'name, approved_glb_url, updated_at, client:crm_clients!inner(slug)'
    )
    .eq('slug', slug)
    .eq('status', 'approved')
    .eq('crm_clients.slug', 'officemate')
    .maybeSingle();

  if (!data || !data.approved_glb_url) return null;
  return {
    name: data.name,
    glb_url: data.approved_glb_url,
    updated_at: data.updated_at,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = await loadModel(slug);
  if (!model) {
    return { title: 'OfficeMate', robots: { index: false, follow: false } };
  }
  return {
    title: `${model.name} · OfficeMate`,
    description: `Interactive 360° 3D model preview of the ${model.name} by OfficeMate`,
    robots: { index: true, follow: true },
  };
}

export default async function OfficeMateModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = await loadModel(slug);
  if (!model) notFound();

  // We render a minimal HTML shell that loads Google's
  // <model-viewer> web component, matching the look-and-feel
  // of the existing static jupiter page. Doing it server-side
  // avoids any client JS for the page shell — only the model
  // viewer's own JS loads in the browser.
  return (
    <main
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#ffffff',
        color: '#0a0a0a',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Top brand bar (kept lightweight; mirrors existing static page) */}
      <header
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ fontSize: 16, letterSpacing: '-0.01em' }}>
          OfficeMate
        </strong>
        <span style={{ color: '#666', fontSize: 13 }}>{model.name}</span>
      </header>

      {/* model-viewer is a Google web component. We load it via
          a plain <script type="module"> (Server Component, so no
          'use client' needed for non-React markup). */}
      <script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        async
      />

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error -- model-viewer is a custom element not in JSX.IntrinsicElements globally */}
      <model-viewer
        src={model.glb_url}
        alt={`${model.name} — 3D preview`}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        ar
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          background: 'linear-gradient(180deg, #f7f7f7, #e8e8e8)',
          display: 'block',
        }}
      />
    </main>
  );
}
