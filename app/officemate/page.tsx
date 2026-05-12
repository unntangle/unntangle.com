import Link from 'next/link';
import type { Metadata } from 'next';
import { supabase } from '../crm/lib/supabase';

// ============================================================
// officemate.unntangle.com/  (the root of the subdomain)
// Lists every approved model in the CRM with a link to its
// dedicated viewer page.
// ============================================================

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'OfficeMate · 3D Catalog',
  description: 'Browse the OfficeMate 3D product catalog.',
};

type Row = {
  name: string;
  slug: string;
  approved_glb_url: string | null;
  updated_at: string;
};

export default async function OfficeMateIndex() {
  const { data } = await supabase()
    .from('crm_projects')
    .select(
      'name, slug, approved_glb_url, updated_at, client:crm_clients!inner(slug)'
    )
    .eq('status', 'approved')
    .eq('crm_clients.slug', 'officemate')
    .order('updated_at', { ascending: false });

  const models = (data || []) as Row[];

  return (
    <main
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#ffffff',
        color: '#0a0a0a',
        minHeight: '100vh',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28, letterSpacing: '-0.02em' }}>
          OfficeMate
        </h1>
        <p style={{ margin: '0 0 32px', color: '#666' }}>
          Interactive 3D product catalog. Tap any item to preview in 360°.
        </p>

        {models.length === 0 ? (
          <p style={{ color: '#999' }}>No products yet.</p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {models.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/${m.slug}`}
                  style={{
                    display: 'block',
                    padding: 20,
                    border: '1px solid #eee',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <strong style={{ display: 'block', fontSize: 15 }}>{m.name}</strong>
                  <span style={{ color: '#999', fontSize: 12 }}>
                    Updated {new Date(m.updated_at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
