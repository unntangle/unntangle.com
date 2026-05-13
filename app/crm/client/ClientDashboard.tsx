'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import StatusBadge from '../components/StatusBadge';
import Sidebar from '../components/Sidebar';
import { crmPath } from '../lib/client-fetch';

// ============================================================
// Types
// ============================================================
type Project = {
  id: string;
  slug: string;
  name: string;
  status:
    | 'draft'
    | 'qa_pending'
    | 'rejected'
    | 'wip'
    | 'client_review'
    | 'approved';
  revision_count: number;
  glb_url: string | null;
  approved_glb_url: string | null;
  assigned_to: string | null;
  brief: string | null;
  created_at: string;
  updated_at: string;
  client: { slug: string; name: string };
  assignee: { id: string; name: string; email: string } | null;
};

type Brand = { id: string; slug: string; name: string };

// ============================================================
// ClientDashboard
//
// Four URL-driven modes mirroring admin's layout:
//   /client                  → Overview (Pending review / Open jobs / WIP / Approved jobs)
//   /client?tab=allocated    → Allocated Jobs (single-table view of jobs assigned to artists)
//   /client?tab=approved     → Approved Jobs (single-table view of completed jobs)
//   /client?tab=pending      → Quality Audit (Pending your review / Rejected / Approved)
//
// The mode is determined by the `tab` query parameter, set by the
// sidebar links. Each mode renders a different tab set so we don't
// duplicate the table-rendering code across three components.
//
// The client cannot:
//   - Assign artists (admin only)
//   - Approve / reject admin-stage submissions (admin QA does that)
//   - See other brands' jobs (server-side scoping prevents this)
// ============================================================
export default function ClientDashboard({
  initialProjects,
  brand,
  currentUser,
}: {
  initialProjects: Project[];
  brand: Brand;
  currentUser: { name: string; role: 'client' };
}) {
  const searchParams = useSearchParams();
  const [projects] = useState<Project[]>(initialProjects);

  // ----- Mode plumbing -----
  // URL is the source of truth so deep links work and the sidebar
  // links drive the page state via ?tab=... without us having to
  // pipe extra props down. Four mutually-exclusive modes.
  const tabParam = searchParams?.get('tab');
  const isAllocatedMode = tabParam === 'allocated';
  const isApprovedMode = tabParam === 'approved';
  const isQaMode =
    !isAllocatedMode &&
    !isApprovedMode &&
    (tabParam === 'pending' || tabParam === 'rejected');
  // Default (no tabParam OR an unrecognised value) → Overview mode.
  const isOverviewMode =
    !isAllocatedMode && !isApprovedMode && !isQaMode;

  // ----- Bucket projects by status -----
  // 'review' = client_review (admin approved, awaiting client sign-off — actionable)
  const review   = projects.filter((p) => p.status === 'client_review');
  // 'open' = brand-new drafts (newly created, no artist yet)
  const open     = projects.filter((p) => p.status === 'draft');
  // 'wip' = anything in active motion server-side that the client
  // is observing: qa_pending (admin reviewing) or wip (artist
  // building). Rejected jobs are surfaced in their own tab now,
  // so we exclude them here to avoid double-counting.
  const wip      = projects.filter(
    (p) => p.status === 'wip' || p.status === 'qa_pending'
  );
  // 'rejected' = jobs the admin sent back to the artist for
  // another revision. Shown both in Overview (so the client has
  // visibility into what's been bounced) and in QA mode.
  const rejected = projects.filter((p) => p.status === 'rejected');
  const history  = projects.filter((p) => p.status === 'approved');

  // 'allocated' = anything past the draft stage that's not yet
  // final-approved. This is the client's view of "stuff that's
  // been handed to an artist and is working its way through".
  // Includes their own client_review queue so the client can
  // still see context in one place if they want a flat list.
  const allocated = projects.filter(
    (p) =>
      p.status === 'wip' ||
      p.status === 'qa_pending' ||
      p.status === 'rejected' ||
      p.status === 'client_review'
  );

  // ----- Tab plumbing for Overview/QA modes -----
  type Tab = 'review' | 'open' | 'wip' | 'rejected' | 'history';
  const overviewTabs: Tab[] = ['review', 'open', 'wip', 'rejected', 'history'];
  const qaTabs: Tab[]       = ['review', 'rejected', 'history'];
  const allowedTabs = isQaMode ? qaTabs : overviewTabs;

  // Only consume tabParam as the active tab if it's a known tab
  // name; otherwise fall back to the first allowed tab so the
  // dashboard lands in the same predictable place every time.
  // (Allocated/Approved modes have no tab bar so this doesn't apply.)
  const validTab: Tab | null =
    tabParam && allowedTabs.includes(tabParam as Tab)
      ? (tabParam as Tab)
      : null;

  const initialTab: Tab = validTab ?? allowedTabs[0];
  const [tab, setTab] = useState<Tab>(initialTab);

  // ----- Title + subtitle per mode -----
  const pageTitle = isAllocatedMode
    ? 'Allocated Jobs'
    : isApprovedMode
    ? 'Approved Jobs'
    : isQaMode
    ? 'QA Review'
    : 'Overview';
  const pageSub = isAllocatedMode
    ? `${brand.name} · Jobs handed to artists and working their way through.`
    : isApprovedMode
    ? `${brand.name} · Jobs you've signed off on. Final GLBs ready to use.`
    : isQaMode
    ? `${brand.name} · Models waiting for your final approval, plus any rejected revisions.`
    : `${brand.name} · All 3D modelling jobs for your brand.`;

  return (
    <div className="crm-shell">
      <Sidebar
        name={currentUser.name}
        role={currentUser.role}
        brandName={brand.name}
      />

      <main className="crm-main">
        <div className="crm-page">
          <header className="crm-page-header">
            <div>
              <h1 className="crm-page-title">{pageTitle}</h1>
              <p className="crm-page-sub">{pageSub}</p>
            </div>
            {/* The Create Job entry point lives in the sidebar
                only (under Jobs → Create Job). The Overview
                header no longer carries a duplicate button so
                the page reads as a pure list view, matching
                Allocated Jobs and Quality Audit. */}
          </header>

          {/* ============================== Allocated Jobs mode ============================== */}
          {/* Single-table view. No tab bar \u2014 it's a focused list of
              jobs in the pipeline post-allocation. The client can
              see the assigned artist and current status but can't
              act on these directly (admin handles QA, client acts
              only when status === 'client_review'). */}
          {isAllocatedMode && (
            allocated.length === 0 ? (
              <EmptyMini message="No allocated jobs yet. Create a job to get one assigned." />
            ) : (
              <ProjectTable
                projects={allocated}
                showAsset={false}
                showArtist={true}
              />
            )
          )}

          {/* ============================== Approved Jobs mode ============================== */}
          {/* Single-table view, mirroring Allocated Jobs but for
              the other end of the pipeline: jobs the client has
              signed off on. Read-only \u2014 the assignee is shown
              for context and the final GLB is downloadable. */}
          {isApprovedMode && (
            history.length === 0 ? (
              <EmptyMini message="No approved jobs yet." />
            ) : (
              <ProjectTable
                projects={history}
                showAsset={true}
                showArtist={true}
              />
            )
          )}

          {/* ============================== Tab bar (Overview + QA modes) ============================== */}
          {!isAllocatedMode && !isApprovedMode && (
            <div className="crm-tabs" role="tablist" aria-label="My projects">
              <button
                role="tab"
                aria-selected={tab === 'review'}
                className={`crm-tab ${tab === 'review' ? 'is-active' : ''}`}
                onClick={() => setTab('review')}
              >
                Pending review
                <span className="crm-tab-count">{review.length}</span>
              </button>
              {isOverviewMode && (
                <button
                  role="tab"
                  aria-selected={tab === 'open'}
                  className={`crm-tab ${tab === 'open' ? 'is-active' : ''}`}
                  onClick={() => setTab('open')}
                >
                  Open jobs
                  <span className="crm-tab-count">{open.length}</span>
                </button>
              )}
              {isOverviewMode && (
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
              {(isQaMode || isOverviewMode) && (
                <button
                  role="tab"
                  aria-selected={tab === 'rejected'}
                  className={`crm-tab ${tab === 'rejected' ? 'is-active' : ''}`}
                  onClick={() => setTab('rejected')}
                >
                  Rejected
                  <span className="crm-tab-count">{rejected.length}</span>
                </button>
              )}
              <button
                role="tab"
                aria-selected={tab === 'history'}
                className={`crm-tab ${tab === 'history' ? 'is-active' : ''}`}
                onClick={() => setTab('history')}
              >
                {isQaMode ? 'Approved' : 'Approved jobs'}
                <span className="crm-tab-count">{history.length}</span>
              </button>
            </div>
          )}

          {/* ============================== Pending review ============================== */}
          {!isAllocatedMode && !isApprovedMode && tab === 'review' && (
            review.length === 0 ? (
              <EmptyMini message="Nothing awaiting your review." />
            ) : (
              <ProjectTable
                projects={review}
                showAsset={false}
                showReviewAction={true}
              />
            )
          )}

          {/* ============================== Open jobs (Overview mode) ============================== */}
          {isOverviewMode && tab === 'open' && (
            open.length === 0 ? (
              <EmptyMini message="No open jobs. Create one to get started." />
            ) : (
              <ProjectTable
                projects={open}
                showAsset={false}
              />
            )
          )}

          {/* ============================== WIP (Overview mode) ============================== */}
          {isOverviewMode && tab === 'wip' && (
            wip.length === 0 ? (
              <EmptyMini message="Nothing in progress right now." />
            ) : (
              <ProjectTable
                projects={wip}
                showAsset={false}
              />
            )
          )}

          {/* ============================== Rejected (Overview + QA modes) ============================== */}
          {!isAllocatedMode && !isApprovedMode && tab === 'rejected' && (
            rejected.length === 0 ? (
              <EmptyMini message="Nothing rejected." />
            ) : (
              <ProjectTable
                projects={rejected}
                showAsset={false}
              />
            )
          )}

          {/* ============================== Approved (both Overview + QA) ============================== */}
          {!isAllocatedMode && !isApprovedMode && tab === 'history' && (
            history.length === 0 ? (
              <EmptyMini message="No approved jobs yet." />
            ) : (
              <ProjectTable
                projects={history}
                showAsset={true}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// Helpers
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

// Shared project list table for client tabs.
// Props:
//   - showAsset: adds a "View GLB" column (Approved tab)
//   - showReviewAction: adds a "Review" link per row (Pending review tab)
//   - showArtist: adds an "Artist" column (Allocated Jobs mode)
function ProjectTable({
  projects,
  showAsset,
  showReviewAction = false,
  showArtist = false,
}: {
  projects: Project[];
  showAsset: boolean;
  showReviewAction?: boolean;
  showArtist?: boolean;
}) {
  return (
    <table className="crm-table">
      <thead>
        <tr>
          <th>Project</th>
          {showArtist && <th>Artist</th>}
          <th>References</th>
          <th>Created</th>
          <th>Updated</th>
          {showAsset && <th>Asset</th>}
          {showReviewAction && <th>Action</th>}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>
            <td>
              <strong style={{ display: 'block' }}>{p.name}</strong>
              <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
                {p.slug}
              </span>
            </td>
            {showArtist && (
              <td>
                {p.assignee?.name || (
                  <em style={{ color: 'var(--text-faint)' }}>unassigned</em>
                )}
              </td>
            )}
            <td>
              {/* Clients use the same references gallery URL as
                  admins; the server-side route checks role and
                  scopes to the caller's own brand. */}
              <a
                href={crmPath(`/admin/qa/${p.id}/references`)}
                target="_blank"
                rel="noreferrer"
                className="crm-link"
              >
                View
              </a>
            </td>
            <td style={{ color: 'var(--text-dim)' }}>
              {new Date(p.created_at).toLocaleDateString()}
            </td>
            <td style={{ color: 'var(--text-dim)' }}>
              {new Date(p.updated_at).toLocaleDateString()}
            </td>
            {showAsset && (
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
            )}
            {showReviewAction && (
              <td>
                <a
                  className="crm-link"
                  href={crmPath(`/client/qa/${p.id}`)}
                >
                  Review
                </a>
              </td>
            )}
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
  );
}
