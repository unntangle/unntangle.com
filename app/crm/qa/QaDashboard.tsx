'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from '../components/StatusBadge';
import ModelViewer from '../components/ModelViewer';
import { crmFetch } from '../lib/client-fetch';

type Project = {
  id: string;
  slug: string;
  name: string;
  status: 'draft' | 'qa_pending' | 'rejected' | 'approved';
  revision_count: number;
  glb_url: string | null;
  approved_glb_url: string | null;
  updated_at: string;
  client: { slug: string; name: string };
};

export default function QaDashboard({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [active, setActive] = useState<Project | null>(null);

  // Default: focus on items that need attention
  const pending = projects.filter((p) => p.status === 'qa_pending');
  const others = projects.filter((p) => p.status !== 'qa_pending');

  function refresh() {
    crmFetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.projects) {
          const norm = d.projects.map((p: Project & { client: { slug: string; name: string } | { slug: string; name: string }[] }) => ({
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
          <h1 className="crm-page-title">QA Review Dashboard</h1>
          <p className="crm-page-sub">
            Review pending models. Upload feedback images to reject, or submit empty to approve.
          </p>
        </div>
      </header>

      <h2 style={{ fontSize: 14, color: 'var(--text-dim)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Pending review ({pending.length})
      </h2>
      {pending.length === 0 ? (
        <div className="crm-empty" style={{ padding: '32px 24px' }}>
          <h3>All caught up</h3>
          <p>No models waiting for review.</p>
        </div>
      ) : (
        <table className="crm-table" style={{ marginBottom: 32 }}>
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Project</th>
              <th>Client</th>
              <th>Revision</th>
              <th>Updated</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>{p.client.name}</td>
                <td>Rev {p.revision_count}</td>
                <td style={{ color: 'var(--text-dim)' }}>
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="crm-btn" onClick={() => setActive(p)}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 style={{ fontSize: 14, color: 'var(--text-dim)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        History
      </h2>
      {others.length === 0 ? (
        <p style={{ color: 'var(--text-dim)' }}>—</p>
      ) : (
        <table className="crm-table">
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Updated</th>
              <th style={{ textAlign: 'right' }}>Asset</th>
            </tr>
          </thead>
          <tbody>
            {others.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.client.name}</td>
                <td>
                  <StatusBadge status={p.status} revisionCount={p.revision_count} />
                </td>
                <td style={{ color: 'var(--text-dim)' }}>
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {(p.approved_glb_url || p.glb_url) && (
                    <a
                      className="crm-btn crm-btn-secondary"
                      href={p.approved_glb_url || p.glb_url!}
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

      {active && (
        <ReviewModal
          project={active}
          onClose={() => setActive(null)}
          onDone={() => {
            setActive(null);
            refresh();
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// Review modal — GLB preview + feedback upload
// ============================================================
function ReviewModal({
  project,
  onClose,
  onDone,
}: {
  project: Project;
  onClose: () => void;
  onDone: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  function addFiles(picked: FileList | File[]) {
    const arr = Array.from(picked).filter((f) => /^image\//.test(f.type));
    setFiles((prev) => [...prev, ...arr]);
  }
  function removeAt(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function submit() {
    setErr(null);
    setBusy(true);
    try {
      let imageUrls: string[] = [];

      // ---- Reject path: upload images directly to Cloudinary first ----
      if (files.length > 0) {
        const signRes = await crmFetch(
          `/api/projects/${project.id}/feedback-sign`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: files.length }),
          }
        );
        const signData = await signRes.json();
        if (!signRes.ok) {
          setErr(signData.error || 'Could not sign feedback uploads.');
          return;
        }

        imageUrls = await Promise.all(
          files.map(async (f, i) => {
            const fd = new FormData();
            Object.entries(signData.signed[i].params).forEach(([k, v]) =>
              fd.append(k, String(v))
            );
            fd.append('file', f);
            const res = await fetch(signData.signed[i].upload_url, {
              method: 'POST',
              body: fd,
            });
            if (!res.ok) {
              throw new Error(
                `Cloudinary upload failed for ${f.name} (${res.status}).`
              );
            }
            const json = (await res.json()) as { secure_url?: string };
            if (!json.secure_url) {
              throw new Error('Cloudinary returned no URL.');
            }
            return json.secure_url;
          })
        );
      }

      // ---- Finalise (reject if URLs present, approve if empty) ----
      const res = await crmFetch(`/api/projects/${project.id}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_urls: imageUrls,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Submission failed.');
        return;
      }
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const willApprove = files.length === 0;

  return (
    <div className="crm-modal-backdrop" onClick={onClose}>
      <div
        className="crm-modal"
        style={{ maxWidth: 880 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crm-modal-header">
          <div>
            <h2 className="crm-modal-title">Review · {project.name}</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: 13 }}>
              {project.client.name} · Revision {project.revision_count}
            </p>
          </div>
          <button className="crm-modal-close" onClick={onClose}>×</button>
        </div>

        {project.glb_url && (
          <ModelViewer src={project.glb_url} height={380} />
        )}

        <div style={{ marginTop: 20 }}>
          <label className="crm-label">Feedback images (optional)</label>
          <div
            className="crm-dropzone"
            onClick={() => document.getElementById('fb-input')?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
          >
            <input
              id="fb-input"
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = '';
              }}
            />
            <strong>Click or drop annotated screenshots</strong>
            <div className="crm-dropzone-hint">
              Each image &le; 15 MB. PNG/JPG/WebP.
            </div>
          </div>

          {files.length > 0 && (
            <div className="crm-feedback-grid">
              {files.map((f, i) => (
                <div key={i} className="crm-feedback-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(f)} alt={f.name} />
                  <button onClick={() => removeAt(i)} aria-label="Remove">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="crm-form-group" style={{ marginTop: 16 }}>
          <label className="crm-label">Note (optional)</label>
          <textarea
            className="crm-textarea"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional summary — visible to the artist."
          />
        </div>

        {err && <div className="crm-error">{err}</div>}

        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: willApprove ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'color-mix(in srgb, var(--danger) 8%, transparent)',
            border: '1px solid',
            borderColor: willApprove ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : 'color-mix(in srgb, var(--danger) 30%, transparent)',
            borderRadius: 10,
            fontSize: 13,
          }}
        >
          <strong>
            {willApprove ? '✓ This will APPROVE the model.' : `✕ This will REJECT the model (revision ${project.revision_count + 1} expected).`}
          </strong>
          <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
            {willApprove
              ? 'No feedback images attached — submitting will mark this approved and copy the GLB to the public folder.'
              : `${files.length} feedback image${files.length === 1 ? '' : 's'} will be sent to the artist.`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="crm-btn crm-btn-secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          {!confirm ? (
            <button
              className={`crm-btn ${!willApprove ? 'crm-btn-danger' : ''}`}
              onClick={() => setConfirm(true)}
              disabled={busy}
            >
              {willApprove ? 'Approve' : 'Reject with feedback'}
            </button>
          ) : (
            <button
              className={`crm-btn ${!willApprove ? 'crm-btn-danger' : ''}`}
              onClick={submit}
              disabled={busy}
            >
              {busy ? 'Submitting…' : `Confirm ${willApprove ? 'approve' : 'reject'}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
