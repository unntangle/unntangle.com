'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatusBadge from '../components/StatusBadge';
import Sidebar from '../components/Sidebar';
import {
  CLIENT_FILTER_EVENT,
  getStoredClientId,
} from '../components/ClientSwitcher';
import { crmFetch, crmPath } from '../lib/client-fetch';

// ============================================================
// Types
// ============================================================
type Project = {
  id: string;
  slug: string;
  name: string;
  status: 'draft' | 'qa_pending' | 'rejected' | 'wip' | 'approved';
  revision_count: number;
  glb_url: string | null;
  approved_glb_url: string | null;
  assigned_to: string | null;
  brief: string | null;
  created_at: string;
  updated_at: string;
  // Raw FK to uflow_clients.id. Used by the admin sidebar's client
  // selector to filter the dashboard by brand. Joined `client.slug`
  // / `client.name` are still here for display.
  client_id: string;
  client: { slug: string; name: string };
  assignee: { id: string; name: string; email: string } | null;
};

type Client = { slug: string; name: string };
type Artist = { id: string; name: string; email: string };

export default function AdminDashboard({
  initialProjects,
  artists,
  currentUser,
}: {
  initialProjects: Project[];
  artists: Artist[];
  currentUser: { name: string; role: 'admin' };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [reassigning, setReassigning] = useState<Project | null>(null);

  // ---- Client filter: synced with the sidebar's ClientSwitcher.
  // Read once on mount from localStorage, then listen for the
  // custom event the switcher dispatches when the admin picks a
  // new option. We also listen for the native 'storage' event so
  // a change in another tab updates this dashboard too.
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  useEffect(() => {
    setSelectedClientId(getStoredClientId());
    function onChange() {
      setSelectedClientId(getStoredClientId());
    }
    window.addEventListener(CLIENT_FILTER_EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(CLIENT_FILTER_EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  // Apply the client filter before bucketing into tabs. When no
  // client is selected (null), all projects pass through. We use
  // useMemo because every render would otherwise filter the array
  // again, even when neither projects nor the filter has changed.
  const visibleProjects = useMemo(() => {
    if (!selectedClientId) return projects;
    return projects.filter((p) => p.client_id === selectedClientId);
  }, [projects, selectedClientId]);

  const pending  = visibleProjects.filter((p) => p.status === 'qa_pending');
  // Open jobs = brand-new (draft) only. Rejected jobs used to be
  // bundled in here as well, but they now have their own tab in
  // Overview so each row appears in exactly one place.
  const openJobs = visibleProjects.filter((p) => p.status === 'draft');
  const wip      = visibleProjects.filter((p) => p.status === 'wip');
  const rejected = visibleProjects.filter((p) => p.status === 'rejected');
  const history  = visibleProjects.filter((p) => p.status === 'approved');

  // Mode is driven by the URL:
  //   /admin                  → Overview (Pending / Open / WIP / Approved)
  //   /admin?tab=pending      → QA       (Pending / Rejected)
  //   /admin?tab=allocation   → Job Allocation (YTA jobs)
  // The sidebar's links set these query params. Same component,
  // three different views so we don't duplicate the rendering.
  type Tab = 'pending' | 'open' | 'wip' | 'rejected' | 'history';
  const tabParam = searchParams?.get('tab');
  const isQaMode = tabParam === 'pending' || tabParam === 'rejected';
  const isAllocationMode = tabParam === 'allocation';

  // YTA (Yet To Assign): draft jobs with no artist. Client creates
  // them; admin allocates here.
  const yta = visibleProjects.filter(
    (p) => p.status === 'draft' && p.assigned_to === null
  );

  const overviewTabs: Tab[] = ['pending', 'open', 'wip', 'rejected', 'history'];
  const qaTabs: Tab[]       = ['pending', 'rejected', 'history'];
  const allowedTabs = isQaMode ? qaTabs : overviewTabs;

  // Tab selection priority:
  //   1. ?tab=<x> if it's allowed in the current mode
  //   2. Otherwise, the first tab in the current mode's list,
  //      so the dashboard always lands in the same predictable
  //      place regardless of how many items each bucket has.
  const validTab: Tab | null =
    tabParam && allowedTabs.includes(tabParam as Tab)
      ? (tabParam as Tab)
      : null;
  const initialTab: Tab = validTab ?? allowedTabs[0];
  const [tab, setTab] = useState<Tab>(initialTab);

  function refreshProjects() {
    crmFetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.projects) {
          const norm = d.projects.map(
            (
              p: Project & {
                client: Client | Client[];
                assignee: Artist | Artist[] | null;
              }
            ) => ({
              ...p,
              client: Array.isArray(p.client) ? p.client[0] : p.client,
              assignee: Array.isArray(p.assignee) ? p.assignee[0] : p.assignee,
            })
          );
          setProjects(norm);
        }
      });
  }

  return (
    <div className="crm-shell">
      <Sidebar
        name={currentUser.name}
        role={currentUser.role}
      />
      <main className="crm-main">
        <div className="crm-page">
          <header className="crm-page-header">
            <div>
              <h1 className="crm-page-title">
                {isAllocationMode
                  ? 'Job Allocation'
                  : isQaMode
                  ? 'QA Review'
                  : 'Overview'}
              </h1>
              <p className="crm-page-sub">
                {isAllocationMode
                  ? 'Jobs created by clients that are waiting for an artist to be assigned.'
                  : isQaMode
                  ? 'Models waiting for review, plus everything previously rejected and awaiting another revision.'
                  : 'All jobs in one place. Switch tabs to focus on what needs attention.'}
              </p>
            </div>
          </header>

          {/* ============================== Job Allocation mode ============================== */}
          {/* Standalone view: no tab bar, just the YTA table. */}
          {isAllocationMode && (
            yta.length === 0 ? (
              <EmptyMini message="No jobs waiting for allocation." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {yta.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong style={{ display: 'block' }}>{p.name}</strong>
                        <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
                          {p.slug}
                        </span>
                      </td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <DateCell value={p.created_at} />
                      <td>
                        <span
                          className="crm-badge crm-badge-draft"
                          title="Yet to assign"
                        >
                          YTA
                        </span>
                      </td>
                      <td>
                        <a
                          className="crm-link"
                          onClick={() => setReassigning(p)}
                        >
                          Allocate
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* ============================== Tab bar ============================== */}
          {/* Hidden in allocation mode — that view has no tabs. */}
          {!isAllocationMode && (
          <div className="crm-tabs" role="tablist" aria-label="Job lists">
            <button
              role="tab"
              aria-selected={tab === 'pending'}
              className={`crm-tab ${tab === 'pending' ? 'is-active' : ''}`}
              onClick={() => setTab('pending')}
            >
              Pending review
              <span className="crm-tab-count">{pending.length}</span>
            </button>
            {!isQaMode && (
              <button
                role="tab"
                aria-selected={tab === 'open'}
                className={`crm-tab ${tab === 'open' ? 'is-active' : ''}`}
                onClick={() => setTab('open')}
              >
                Open jobs
                <span className="crm-tab-count">{openJobs.length}</span>
              </button>
            )}
            {/* WIP tab: only in Overview mode. Jobs the artist has
                acknowledged and is actively working on — distinct
                from "open" (untouched) and "pending" (with QA). */}
            {!isQaMode && (
              <button
                role="tab"
                aria-selected={tab === 'wip'}
                className={`crm-tab ${tab === 'wip' ? 'is-active' : ''}`}
                onClick={() => setTab('wip')}
              >
                WIP
                <span className="crm-tab-count">{wip.length}</span>
              </button>
            )}
            {/* Rejected tab: visible in both Overview and QA
                modes. In Overview it sits between WIP and
                Approved jobs as its own bucket; in QA it sits
                between Pending review and Approved (no WIP
                column there). */}
            <button
              role="tab"
              aria-selected={tab === 'rejected'}
              className={`crm-tab ${tab === 'rejected' ? 'is-active' : ''}`}
              onClick={() => setTab('rejected')}
            >
              Rejected
              <span className="crm-tab-count">{rejected.length}</span>
            </button>
            {!isQaMode && (
              <button
                role="tab"
                aria-selected={tab === 'history'}
                className={`crm-tab ${tab === 'history' ? 'is-active' : ''}`}
                onClick={() => setTab('history')}
              >
                Approved jobs
                <span className="crm-tab-count">{history.length}</span>
              </button>
            )}
            {isQaMode && (
              <button
                role="tab"
                aria-selected={tab === 'history'}
                className={`crm-tab ${tab === 'history' ? 'is-active' : ''}`}
                onClick={() => setTab('history')}
              >
                Approved
                <span className="crm-tab-count">{history.length}</span>
              </button>
            )}
          </div>
          )}

          {/* ============================== Pending Review ============================== */}
          {!isAllocationMode && tab === 'pending' && (
            pending.length === 0 ? (
              <EmptyMini message="No models waiting for review." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    {/* Column order: Artist, Project, References, Client, ...
                        Artist first so the admin scans by who is responsible.
                        References is a quick-action column so reviewers can
                        open the reference gallery without going through the
                        full QA page. */}
                    <th>Artist</th>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Revision</th>
                    <th>Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((p) => (
                    <tr key={p.id}>
                      <td>{p.assignee?.name || <em style={{ color: 'var(--text-faint)' }}>unassigned</em>}</td>
                      <td><strong>{p.name}</strong></td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <td>Rev {p.revision_count}</td>
                      <td style={{ color: 'var(--text-dim)' }}>
                        {new Date(p.updated_at).toLocaleDateString()}
                      </td>
                      <td>
                        <a
                          className="crm-link"
                          onClick={() =>
                            router.push(crmPath(`/admin/qa/${p.id}`))
                          }
                        >
                          Review
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* ============================== Rejected (Overview + QA modes) ============================== */}
          {!isAllocationMode && tab === 'rejected' && (
            rejected.length === 0 ? (
              <EmptyMini message="Nothing rejected. Artists are caught up." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Revision</th>
                    <th>Rejected</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rejected.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.assignee?.name || (
                          <em style={{ color: 'var(--text-faint)' }}>unassigned</em>
                        )}
                      </td>
                      <td>
                        <strong style={{ display: 'block' }}>{p.name}</strong>
                        <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
                          {p.slug}
                        </span>
                      </td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <td>Rev {p.revision_count}</td>
                      <td style={{ color: 'var(--text-dim)' }}>
                        {new Date(p.updated_at).toLocaleDateString()}
                      </td>
                      <td>
                        <a
                          className="crm-link"
                          onClick={() => setReassigning(p)}
                        >
                          Reassign
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* ============================== Open Jobs ============================== */}
          {!isAllocationMode && !isQaMode && tab === 'open' && (
            openJobs.length === 0 ? (
              <EmptyMini message="No open jobs. Create one from the sidebar." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Created</th>
                    <th>Assigned</th>
                    <th>Started</th>
                    <th>Last uploaded</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {openJobs.map((p) => (
                    <tr key={p.id}>
                      <td>{p.assignee?.name || <em style={{ color: 'var(--text-faint)' }}>unassigned</em>}</td>
                      <td>
                        <strong style={{ display: 'block' }}>{p.name}</strong>
                        <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
                          {p.slug}
                        </span>
                      </td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <DateCell value={p.created_at} />
                      <DateCell value={null} />
                      <DateCell value={null} />
                      <DateCell value={p.updated_at} />
                      <td>
                        <StatusBadge status={p.status} revisionCount={p.revision_count} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* ============================== WIP (Overview mode only) ============================== */}
          {!isAllocationMode && !isQaMode && tab === 'wip' && (
            wip.length === 0 ? (
              <EmptyMini message="Nothing in progress. Artists haven't started their rejected jobs yet." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Created</th>
                    <th>Assigned</th>
                    <th>Started</th>
                    <th>Last uploaded</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {wip.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.assignee?.name || (
                          <em style={{ color: 'var(--text-faint)' }}>unassigned</em>
                        )}
                      </td>
                      <td>
                        <strong style={{ display: 'block' }}>{p.name}</strong>
                        <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
                          {p.slug}
                        </span>
                      </td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <DateCell value={p.created_at} />
                      <DateCell value={null} />
                      <DateCell value={null} />
                      <DateCell value={p.updated_at} />
                      <td>
                        <StatusBadge
                          status={p.status}
                          revisionCount={p.revision_count}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* ============================== Approved jobs ============================== */}
          {!isAllocationMode && tab === 'history' && (
            history.length === 0 ? (
              <EmptyMini message="No approved jobs yet." />
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Project</th>
                    <th>References</th>
                    <th>Client</th>
                    <th>Created</th>
                    <th>Assigned</th>
                    <th>Started</th>
                    <th>Last uploaded</th>
                    <th>Asset</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((p) => (
                    <tr key={p.id}>
                      <td>{p.assignee?.name || '—'}</td>
                      <td><strong>{p.name}</strong></td>
                      <td>
                        <a
                          href={crmPath(`/admin/qa/${p.id}/references`)}
                          target="_blank"
                          rel="noreferrer"
                          className="crm-link"
                          title="Open the reference gallery in a new tab"
                        >
                          View
                        </a>
                      </td>
                      <td>{p.client.name}</td>
                      <DateCell value={p.created_at} />
                      <DateCell value={null} />
                      <DateCell value={null} />
                      <DateCell value={p.updated_at} />
                      <td>
                        {(p.approved_glb_url || p.glb_url) && (
                          <a
                            className="crm-link"
                            href={p.approved_glb_url || p.glb_url!}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View GLB
                          </a>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={p.status} revisionCount={p.revision_count} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </main>

      {/* ============================== Modals ============================== */}
      {reassigning && (
        <ReassignModal
          project={reassigning}
          artists={artists}
          onClose={() => setReassigning(null)}
          onDone={() => {
            setReassigning(null);
            refreshProjects();
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// Small UI helpers
// ============================================================
function EmptyMini({ message }: { message: string }) {
  return (
    <p
      style={{
        color: 'var(--text-dim)',
        padding: '16px 0 32px',
        fontSize: 13,
      }}
    >
      {message}
    </p>
  );
}

// Format a date string as DD/MM/YYYY for table cells. Returns an
// em-dash when the value is missing so the column still shows a
// placeholder instead of collapsing.
function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '\u2014';
  return new Date(iso).toLocaleDateString();
}

// Reusable date cell. The em-dash version (no value tracked) is
// styled dimmer so the columns with real data lead the eye.
function DateCell({ value }: { value: string | null | undefined }) {
  if (!value) {
    return (
      <td style={{ color: 'var(--text-faint)' }}>—</td>
    );
  }
  return (
    <td style={{ color: 'var(--text-dim)' }}>{fmtDate(value)}</td>
  );
}

// ============================================================
// Reassign modal
// ============================================================
function ReassignModal({
  project,
  artists,
  onClose,
  onDone,
}: {
  project: Project;
  artists: Artist[];
  onClose: () => void;
  onDone: () => void;
}) {
  const [target, setTarget] = useState(project.assigned_to || artists[0]?.id || '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    setBusy(true);
    try {
      const res = await crmFetch(`/api/projects/${project.id}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: target }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Failed.');
        return;
      }
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">Reassign</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.client.name} · {project.name}
            </p>
          </div>
          <button className="crm-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="crm-form-group">
          <label className="crm-label">Assign to</label>
          <select
            className="crm-input"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.email})
              </option>
            ))}
          </select>
        </div>

        {err && <div className="crm-error">{err}</div>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="crm-btn crm-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="crm-btn" onClick={submit} disabled={busy || !target}>
            {busy ? 'Saving…' : 'Reassign'}
          </button>
        </div>
      </div>
    </div>
  );
}
