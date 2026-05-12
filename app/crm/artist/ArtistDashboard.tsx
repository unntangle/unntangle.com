'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from '../components/StatusBadge';
import { crmFetch } from '../lib/client-fetch';

// ============================================================
// Types — mirror the server's joined select shape
// ============================================================
type Project = {
  id: string;
  slug: string;
  name: string;
  status: 'draft' | 'qa_pending' | 'rejected' | 'approved';
  revision_count: number;
  zip_url: string | null;
  glb_url: string | null;
  approved_glb_url: string | null;
  updated_at: string;
  client: { slug: string; name: string };
};

type Client = { slug: string; name: string };

type FeedbackImage = {
  id: string;
  revision: number;
  image_url: string;
  note: string | null;
  created_at: string;
};

export default function ArtistDashboard({
  initialProjects,
  clients,
}: {
  initialProjects: Project[];
  clients: Client[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showNew, setShowNew] = useState(false);
  const [uploadFor, setUploadFor] = useState<Project | null>(null);
  const [viewFeedback, setViewFeedback] = useState<Project | null>(null);

  function refreshList() {
    // Re-fetch projects from the server.
    crmFetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.projects) {
          const norm = d.projects.map((p: Project & { client: Client | Client[] }) => ({
            ...p,
            client: Array.isArray(p.client) ? p.client[0] : p.client,
          }));
          setProjects(norm);
        }
      });
  }

  return (
    <div className="crm-page">
      <header className="crm-page-header">
        <div>
          <h1 className="crm-page-title">3D Artist Dashboard</h1>
          <p className="crm-page-sub">
            Upload your zipped model. Status updates automatically after QA review.
          </p>
        </div>
        <button className="crm-btn" onClick={() => setShowNew(true)}>
          + New project
        </button>
      </header>

      {projects.length === 0 ? (
        <div className="crm-empty">
          <h3>No projects yet</h3>
          <p>Click &ldquo;New project&rdquo; to get started.</p>
        </div>
      ) : (
        <table className="crm-table">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Project</th>
              <th>Client</th>
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
                <td>{p.client.name}</td>
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
                  {p.status === 'rejected' && (
                    <button
                      className="crm-btn-secondary crm-btn"
                      style={{ marginRight: 8 }}
                      onClick={() => setViewFeedback(p)}
                    >
                      View feedback
                    </button>
                  )}
                  {p.status !== 'approved' && (
                    <button
                      className="crm-btn"
                      onClick={() => setUploadFor(p)}
                    >
                      {p.status === 'draft' ? 'Upload zip' : 'Re-upload'}
                    </button>
                  )}
                  {p.status === 'approved' && p.approved_glb_url && (
                    <a
                      className="crm-btn-secondary crm-btn"
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

      {showNew && (
        <NewProjectModal
          clients={clients}
          onClose={() => setShowNew(false)}
          onCreated={() => {
            setShowNew(false);
            refreshList();
            router.refresh();
          }}
        />
      )}
      {uploadFor && (
        <UploadModal
          project={uploadFor}
          onClose={() => setUploadFor(null)}
          onDone={() => {
            setUploadFor(null);
            refreshList();
          }}
        />
      )}
      {viewFeedback && (
        <FeedbackModal
          project={viewFeedback}
          onClose={() => setViewFeedback(null)}
        />
      )}
    </div>
  );
}

// ============================================================
// New project modal
// ============================================================
function NewProjectModal({
  clients,
  onClose,
  onCreated,
}: {
  clients: Client[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [clientSlug, setClientSlug] = useState(clients[0]?.slug || '');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr(null);
    setBusy(true);
    try {
      const res = await crmFetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_slug: clientSlug, slug, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Failed.');
        return;
      }
      onCreated();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <h2 className="crm-modal-title">New project</h2>
          <button className="crm-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="crm-form-group">
          <label className="crm-label">Client</label>
          <select
            className="crm-input"
            value={clientSlug}
            onChange={(e) => setClientSlug(e.target.value)}
          >
            {clients.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="crm-form-group">
          <label className="crm-label">Project name</label>
          <input
            className="crm-input"
            placeholder="e.g. Mars Desk"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) {
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                );
              }
            }}
          />
        </div>

        <div className="crm-form-group">
          <label className="crm-label">Slug (used in folder + URL)</label>
          <input
            className="crm-input"
            placeholder="mars-desk"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        {err && <div className="crm-error">{err}</div>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="crm-btn crm-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="crm-btn"
            onClick={submit}
            disabled={busy || !name || !slug || !clientSlug}
          >
            {busy ? 'Creating…' : 'Create project'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Upload zip modal
//
// Uses the direct-to-Cloudinary flow because Vercel limits
// inbound request bodies to 4.5 MB and zips are typically much
// larger. Three steps:
//   1. POST /upload-sign → server returns signed Cloudinary params
//   2. Browser POSTs the zip directly to Cloudinary with those params
//   3. POST /finalize-upload → server pulls the zip back from
//      Cloudinary, extracts it, updates the project row.
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
      // ---- 1. Get a signed Cloudinary upload URL ----
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

      // ---- 2. Upload directly to Cloudinary ----
      setStage('uploading');
      const fd = new FormData();
      Object.entries(signData.params).forEach(([k, v]) =>
        fd.append(k, String(v))
      );
      fd.append('file', file);

      const zipUrl = await uploadWithProgress(
        signData.upload_url,
        fd,
        setProgress
      );

      // ---- 3. Tell our server we're done; it extracts the zip ----
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
              {project.client.name} · {project.name}
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

// XHR (not fetch) so we get upload progress events. Returns the
// secure_url of the uploaded file.
function uploadWithProgress(
  url: string,
  fd: FormData,
  onProgress: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          if (json.secure_url) resolve(json.secure_url);
          else reject(new Error('Cloudinary returned no secure_url'));
        } catch {
          reject(new Error('Bad response from Cloudinary'));
        }
      } else {
        reject(new Error(`Cloudinary upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(fd);
  });
}

// ============================================================
// Feedback viewer modal
// ============================================================
function FeedbackModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState<FeedbackImage[] | null>(null);

  // Lazy-load on first render
  if (feedback === null) {
    crmFetch(`/api/projects/${project.id}/feedback`)
      .then((r) => r.json())
      .then((d) => setFeedback(d.feedback || []));
  }

  // Group by revision
  const groups: Record<number, FeedbackImage[]> = {};
  (feedback || []).forEach((f) => {
    (groups[f.revision] ||= []).push(f);
  });
  const revisions = Object.keys(groups)
    .map((n) => parseInt(n, 10))
    .sort((a, b) => b - a);

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">QA Feedback</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.client.name} · {project.name}
            </p>
          </div>
          <button className="crm-modal-close" onClick={onClose}>×</button>
        </div>

        {feedback === null ? (
          <p style={{ color: 'var(--text-dim)' }}>Loading…</p>
        ) : feedback.length === 0 ? (
          <p style={{ color: 'var(--text-dim)' }}>No feedback yet.</p>
        ) : (
          revisions.map((rev) => (
            <div key={rev} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, margin: '0 0 10px', color: 'var(--text-dim)' }}>
                Revision {rev}
              </h3>
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
