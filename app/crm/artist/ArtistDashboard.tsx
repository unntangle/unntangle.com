'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';
import StatusBadge from '../components/StatusBadge';
import Sidebar from '../components/Sidebar';
import { crmFetch } from '../lib/client-fetch';

// ============================================================
// Types — mirror the server's joined select shape
// ============================================================
type Project = {
  id: string;
  slug: string;
  name: string;
  status: 'draft' | 'qa_pending' | 'rejected' | 'wip' | 'approved';
  revision_count: number;
  zip_url: string | null;
  glb_url: string | null;
  approved_glb_url: string | null;
  assigned_to: string | null;
  brief: string | null;
  updated_at: string;
  client: { slug: string; name: string };
};

type FeedbackImage = {
  id: string;
  revision: number;
  image_url: string;
  note: string | null;
  created_at: string;
};

type ReferenceImage = {
  id: string;
  image_url: string;
  created_at: string;
};

export default function ArtistDashboard({
  initialProjects,
  currentUser,
}: {
  initialProjects: Project[];
  currentUser: { name: string; role: '3d_artist' };
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [uploadFor, setUploadFor] = useState<Project | null>(null);
  const [viewFeedback, setViewFeedback] = useState<Project | null>(null);
  const [viewBrief, setViewBrief] = useState<Project | null>(null);
  // Per-project Start button state. We track which row is in flight
  // so concurrent clicks on different rows don't interfere; keyed by
  // project id rather than a single shared flag.
  const [starting, setStarting] = useState<Record<string, boolean>>({});
  const [startErr, setStartErr] = useState<string | null>(null);

  function refreshList() {
    crmFetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.projects) {
          const norm = d.projects.map(
            (p: Project & { client: Project['client'] | Project['client'][] }) => ({
              ...p,
              client: Array.isArray(p.client) ? p.client[0] : p.client,
            })
          );
          setProjects(norm);
        }
      });
  }

  async function startProject(p: Project) {
    if (starting[p.id]) return;
    setStarting((s) => ({ ...s, [p.id]: true }));
    setStartErr(null);
    try {
      const res = await crmFetch(`/api/projects/${p.id}/start`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        setStartErr(data.error || 'Could not start project.');
        return;
      }
      // Optimistically flip this row locally so the action column
      // re-renders to show View feedback + Re-upload without waiting
      // for the list refresh round-trip.
      setProjects((prev) =>
        prev.map((row) =>
          row.id === p.id ? { ...row, status: 'wip' as const } : row
        )
      );
      // Then refresh from the server to pick up updated_at etc.
      refreshList();
      router.refresh();
    } catch (e) {
      setStartErr((e as Error).message);
    } finally {
      setStarting((s) => ({ ...s, [p.id]: false }));
    }
  }

  return (
    <div className="crm-shell">
      <Sidebar name={currentUser.name} role={currentUser.role} />
      <main className="crm-main">
        <div className="crm-page">
          <header className="crm-page-header">
            <div>
              <h1 className="crm-page-title">My Jobs</h1>
              <p className="crm-page-sub">
                Projects assigned to you. Open a brief to see what&apos;s needed, then upload your zip.
              </p>
            </div>
          </header>

          {startErr && (
            <div className="crm-error" style={{ marginTop: 12 }}>
              {startErr}
            </div>
          )}

          {projects.length === 0 ? (
            <div className="crm-empty">
              <h3>No jobs assigned</h3>
              <p>You&apos;ll see new jobs here when an admin assigns one to you.</p>
            </div>
          ) : (
            <table className="crm-table">
              <thead>
                <tr>
                  {/* Client column intentionally omitted from the
                      artist view — artists shouldn't see which
                      client commissioned a job. The data still
                      flows through `project.client` (used in API
                      calls and folder paths) but is never
                      rendered to the artist. */}
                  <th style={{ width: '32%' }}>Project</th>
                  <th>Brief</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
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
                    <td>
                      <button
                        className="crm-btn crm-btn-secondary"
                        onClick={() => setViewBrief(p)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <StatusBadge
                        status={p.status}
                        revisionCount={p.revision_count}
                      />
                    </td>
                    <td style={{ color: 'var(--text-dim)' }}>
                      {new Date(p.updated_at).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {/*
                        Action cell is status-aware. Each project state
                        gets exactly one set of actions:

                          draft        → Upload zip  (first submission)
                          qa_pending   → "Awaiting QA review" — no actions
                          rejected     → Start  (acknowledge the feedback)
                          wip          → View feedback + Re-upload
                          approved     → View GLB

                        The Rejected→Start checkpoint forces the artist
                        to engage with the QA feedback before they can
                        re-submit. Once started, the feedback + upload
                        affordances appear together.
                      */}
                      {p.status === 'draft' && (
                        <button className="crm-btn" onClick={() => setUploadFor(p)}>
                          Upload zip
                        </button>
                      )}
                      {p.status === 'qa_pending' && (
                        <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>
                          Awaiting QA review
                        </span>
                      )}
                      {p.status === 'rejected' && (
                        <button
                          className="crm-btn"
                          onClick={() => startProject(p)}
                          disabled={!!starting[p.id]}
                        >
                          {starting[p.id] ? 'Starting…' : 'Start'}
                        </button>
                      )}
                      {p.status === 'wip' && (
                        <>
                          <button
                            className="crm-btn crm-btn-secondary"
                            style={{ marginRight: 8 }}
                            onClick={() => setViewFeedback(p)}
                          >
                            View feedback
                          </button>
                          <button className="crm-btn" onClick={() => setUploadFor(p)}>
                            Re-upload
                          </button>
                        </>
                      )}
                      {p.status === 'approved' && p.approved_glb_url && (
                        <a
                          className="crm-btn crm-btn-secondary"
                          href={p.approved_glb_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View GLB
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {uploadFor && (
        <UploadModal
          project={uploadFor}
          onClose={() => setUploadFor(null)}
          onDone={() => {
            setUploadFor(null);
            refreshList();
            router.refresh();
          }}
        />
      )}
      {viewFeedback && (
        <FeedbackModal
          project={viewFeedback}
          onClose={() => setViewFeedback(null)}
        />
      )}
      {viewBrief && (
        <BriefModal project={viewBrief} onClose={() => setViewBrief(null)} />
      )}
    </div>
  );
}

// ============================================================
// Brief modal — shows the admin's brief text + reference images
// ============================================================
function BriefModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [refs, setRefs] = useState<ReferenceImage[] | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadErr, setDownloadErr] = useState<string | null>(null);

  if (refs === null) {
    crmFetch(`/api/projects/${project.id}/references`)
      .then((r) => r.json())
      .then((d) => setRefs(d.references || []));
  }

  // ----- Download all reference images as a single zip -----
  // We fetch each public R2 URL from the browser (the bucket is
  // public-read), stitch the bytes into one zip via JSZip, then
  // trigger a save via a temporary <a download>. Entirely
  // client-side — no server round-trip, no R2 writes.
  //
  // Individual fetch failures are tolerated: a failed image is
  // skipped and the zip is built from whatever did succeed. A
  // total failure (zero images downloaded) surfaces an error
  // instead of writing an empty zip.
  async function downloadAll() {
    if (!refs || refs.length === 0 || downloading) return;
    setDownloading(true);
    setDownloadErr(null);
    try {
      const zip = new JSZip();
      let ok = 0;
      // Fetch in parallel, but limit concurrency implicitly by
      // just kicking everything off — the browser caps simultaneous
      // connections to a single origin (typically 6), which is
      // plenty for ~12 images. For larger ref sets we'd want a
      // pool, but reference counts are bounded to 20 server-side.
      await Promise.all(
        refs.map(async (r, i) => {
          try {
            const res = await fetch(r.image_url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            // Filename: "reference-01.jpg" — zero-padded so the
            // zip lists them in upload order even on Windows.
            const ext = (() => {
              const m = r.image_url.match(/\.([a-z0-9]+)(?:\?|$)/i);
              return m ? m[1].toLowerCase() : 'jpg';
            })();
            const num = String(i + 1).padStart(2, '0');
            zip.file(`reference-${num}.${ext}`, blob);
            ok++;
          } catch {
            // Skip this image; the rest still go into the zip.
          }
        })
      );

      if (ok === 0) {
        setDownloadErr('Could not download any of the reference images.');
        return;
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      // Trigger a save without leaving the page or opening a tab.
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.slug}-references.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Let the browser flush the download before revoking the blob URL.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setDownloadErr((e as Error).message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">Job Brief</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.name}
            </p>
          </div>
          <button className="crm-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="crm-form-group">
          <label className="crm-label">Brief</label>
          {project.brief ? (
            <p style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 14 }}>
              {project.brief}
            </p>
          ) : (
            <p style={{ color: 'var(--text-dim)', margin: 0, fontSize: 13 }}>
              No written brief was attached.
            </p>
          )}
        </div>

        <div className="crm-form-group" style={{ marginTop: 20 }}>
          {/* Header row with the section label on the left and the
              download-all button on the right, only when refs exist. */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <label className="crm-label" style={{ margin: 0 }}>
              Reference images
              {refs && refs.length > 0 && (
                <span
                  style={{ color: 'var(--text-faint)', fontWeight: 400, marginLeft: 6 }}
                >
                  ({refs.length})
                </span>
              )}
            </label>
            {refs && refs.length > 0 && (
              <button
                className="crm-btn crm-btn-secondary"
                onClick={downloadAll}
                disabled={downloading}
              >
                {downloading ? 'Preparing…' : 'Download all'}
              </button>
            )}
          </div>

          {refs === null ? (
            <p style={{ color: 'var(--text-dim)', fontSize: 13, margin: 0 }}>
              Loading…
            </p>
          ) : refs.length === 0 ? (
            <p style={{ color: 'var(--text-dim)', fontSize: 13, margin: 0 }}>
              No reference images.
            </p>
          ) : (
            <div className="crm-feedback-grid">
              {refs.map((r) => (
                <a
                  key={r.id}
                  href={r.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="crm-feedback-thumb"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image_url} alt="reference" />
                </a>
              ))}
            </div>
          )}

          {downloadErr && (
            <div className="crm-error" style={{ marginTop: 10 }}>
              {downloadErr}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Upload zip modal
// ============================================================
function UploadModal({
  project,
  onClose,
  onDone,
}: {
  project: Project;
  onClose: () => void;
  onDone: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<'idle' | 'signing' | 'uploading' | 'finalizing'>('idle');
  const [, startTransition] = useTransition();

  async function submit() {
    if (!file) return;
    setBusy(true);
    setErr(null);
    setProgress(0);

    try {
      setStage('signing');
      const signRes = await crmFetch(
        `/api/projects/${project.id}/upload-sign`,
        { method: 'POST' }
      );
      const signData = await signRes.json();
      if (!signRes.ok) {
        setErr(signData.error || 'Could not start upload.');
        return;
      }

      setStage('uploading');
      // R2 wants a raw PUT with the file body — no FormData, no
      // extra fields. The Content-Type must match what was signed.
      await uploadWithProgress(
        signData.upload_url,
        file,
        'application/zip',
        setProgress
      );
      // The public URL was already returned by the sign endpoint;
      // we don't need to parse anything out of the PUT response.
      const zipUrl = signData.public_url as string;

      setStage('finalizing');
      const finRes = await crmFetch(
        `/api/projects/${project.id}/finalize-upload`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            zip_url: zipUrl,
            revision: signData.revision,
          }),
        }
      );
      const finData = await finRes.json();
      if (!finRes.ok) {
        setErr(finData.error || 'Server could not process the zip.');
        return;
      }

      startTransition(() => onDone());
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
      setStage('idle');
    }
  }

  const stageLabel =
    stage === 'signing'    ? 'Preparing…' :
    stage === 'uploading'  ? `Uploading… ${progress}%` :
    stage === 'finalizing' ? 'Extracting zip (may take a minute)…' :
    'Submit for QA';

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">Upload zip</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.name}
            </p>
          </div>
          <button className="crm-modal-close" onClick={onClose}>×</button>
        </div>

        <div
          className={`crm-dropzone ${drag ? 'is-drag' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files[0];
            if (f && f.name.toLowerCase().endsWith('.zip')) setFile(f);
          }}
          onClick={() => document.getElementById('zip-input')?.click()}
        >
          <input
            id="zip-input"
            type="file"
            accept=".zip"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
          {file ? (
            <>
              <strong>{file.name}</strong>
              <div className="crm-dropzone-hint">
                {(file.size / 1024 / 1024).toFixed(1)} MB · click to replace
              </div>
            </>
          ) : (
            <>
              <strong>Click or drop your .zip file</strong>
              <div className="crm-dropzone-hint">
                Must contain folders: <code>fbx/</code> <code>glb/</code> <code>gltf/</code>
                <br />
                Max 90 MB.
              </div>
            </>
          )}
        </div>

        {busy && stage === 'uploading' && (
          <div
            style={{
              marginTop: 14,
              height: 6,
              background: 'var(--surface-2)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'var(--accent)',
                transition: 'width 0.2s',
              }}
            />
          </div>
        )}

        {err && <div className="crm-error" style={{ marginTop: 12 }}>{err}</div>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="crm-btn crm-btn-secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button className="crm-btn" onClick={submit} disabled={!file || busy}>
            {busy ? stageLabel : 'Submit for QA'}
          </button>
        </div>
      </div>
    </div>
  );
}

function uploadWithProgress(
  url: string,
  file: Blob,
  contentType: string,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    // The signed URL pins the Content-Type; the browser must send
    // it back exactly or R2 rejects the PUT with a signature error.
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // R2 PUT returns an empty body; success is just the 2xx.
        resolve();
      } else {
        reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText || 'no body'}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(file);
  });
}

// ============================================================
// Feedback viewer modal
//
// Shows all rejection feedback grouped by revision (newest at
// top). Each revision can be downloaded as a zip; or the whole
// thing as one zip with revision-N/ subfolders.
// ============================================================
function FeedbackModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState<FeedbackImage[] | null>(null);
  // Track which download(s) are in flight. We allow the modal-level
  // "Download all" and individual per-revision downloads to run
  // concurrently, so the busy state is per-key.
  //   '__all'  → the top-of-modal Download all button
  //   '<n>'    → the per-revision button for revision n
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [downloadErr, setDownloadErr] = useState<string | null>(null);

  if (feedback === null) {
    crmFetch(`/api/projects/${project.id}/feedback`)
      .then((r) => r.json())
      .then((d) => setFeedback(d.feedback || []));
  }

  const groups: Record<number, FeedbackImage[]> = {};
  (feedback || []).forEach((f) => {
    (groups[f.revision] ||= []).push(f);
  });
  const revisions = Object.keys(groups)
    .map((n) => parseInt(n, 10))
    .sort((a, b) => b - a);

  // ----- Download helper used by both the all-revisions button
  // and the per-revision buttons. Same JSZip pattern as the brief
  // modal: fetch each public R2 URL in parallel, stitch into a
  // zip, save via a temporary <a download>. Individual fetch
  // failures are skipped; total failure surfaces an error. -----
  async function downloadImages(
    key: string,
    images: FeedbackImage[],
    filename: string,
    pathFor: (img: FeedbackImage, index: number) => string
  ) {
    if (images.length === 0 || downloading[key]) return;
    setDownloading((d) => ({ ...d, [key]: true }));
    setDownloadErr(null);
    try {
      const zip = new JSZip();
      let ok = 0;
      await Promise.all(
        images.map(async (img, i) => {
          try {
            const res = await fetch(img.image_url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            zip.file(pathFor(img, i), blob);
            ok++;
          } catch {
            // Skip; continue with the rest.
          }
        })
      );

      if (ok === 0) {
        setDownloadErr('Could not download any of the feedback images.');
        return;
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setDownloadErr((e as Error).message);
    } finally {
      setDownloading((d) => ({ ...d, [key]: false }));
    }
  }

  // Extract the file extension from a URL; defaults to jpg.
  function extOf(url: string): string {
    const m = url.match(/\.([a-z0-9]+)(?:\?|$)/i);
    return m ? m[1].toLowerCase() : 'jpg';
  }

  async function downloadAllRevisions() {
    if (!feedback) return;
    // Build with `revision-N/feedback-MM.ext` paths so the artist
    // can see the chronology after unzipping.
    await downloadImages(
      '__all',
      feedback,
      `${project.slug}-feedback.zip`,
      (img) => {
        // Per-revision index, padded — reset per revision via groups.
        const inRev = groups[img.revision]
          ? groups[img.revision].indexOf(img)
          : 0;
        const num = String(inRev + 1).padStart(2, '0');
        return `revision-${img.revision}/feedback-${num}.${extOf(img.image_url)}`;
      }
    );
  }

  async function downloadRevision(rev: number) {
    await downloadImages(
      String(rev),
      groups[rev] || [],
      `${project.slug}-revision-${rev}-feedback.zip`,
      (img, i) => {
        const num = String(i + 1).padStart(2, '0');
        return `feedback-${num}.${extOf(img.image_url)}`;
      }
    );
  }

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">QA Feedback</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.name}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Download-all button only shows once feedback has loaded
                AND there's at least one image. Keeps the header tidy
                during loading / empty states. */}
            {feedback && feedback.length > 0 && (
              <button
                className="crm-btn crm-btn-secondary"
                onClick={downloadAllRevisions}
                disabled={!!downloading['__all']}
                title="Download every revision as one zip"
              >
                {downloading['__all'] ? 'Preparing…' : 'Download all'}
              </button>
            )}
            <button className="crm-modal-close" onClick={onClose}>×</button>
          </div>
        </div>

        {downloadErr && (
          <div className="crm-error" style={{ marginBottom: 12 }}>
            {downloadErr}
          </div>
        )}

        {feedback === null ? (
          <p style={{ color: 'var(--text-dim)' }}>Loading…</p>
        ) : feedback.length === 0 ? (
          <p style={{ color: 'var(--text-dim)' }}>No feedback yet.</p>
        ) : (
          revisions.map((rev) => (
            <div key={rev} style={{ marginBottom: 24 }}>
              {/* Per-revision header row: "Revision N" on the left,
                  per-revision download button on the right. Lets the
                  artist grab just one revision's images without
                  hunting through the all-revisions zip. */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    margin: 0,
                    color: 'var(--text-dim)',
                  }}
                >
                  Revision {rev}
                  <span
                    style={{
                      color: 'var(--text-faint)',
                      fontWeight: 400,
                      marginLeft: 6,
                    }}
                  >
                    ({groups[rev].length})
                  </span>
                </h3>
                <button
                  className="crm-btn crm-btn-secondary"
                  onClick={() => downloadRevision(rev)}
                  disabled={!!downloading[String(rev)]}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                  title={`Download revision ${rev} feedback images`}
                >
                  {downloading[String(rev)] ? 'Preparing…' : 'Download'}
                </button>
              </div>
              <div className="crm-feedback-grid">
                {groups[rev].map((f) => (
                  <a
                    key={f.id}
                    href={f.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="crm-feedback-thumb"
                    title={f.note || ''}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image_url} alt={f.note || 'feedback'} />
                  </a>
                ))}
              </div>
              {groups[rev][0]?.note && (
                <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)' }}>
                  Note: {groups[rev][0].note}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
