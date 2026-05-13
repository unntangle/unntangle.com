'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clipboard, ExternalLink, Download } from 'lucide-react';
import JSZip from 'jszip';
import Sidebar from '../../../components/Sidebar';
import ModelViewer from '../../../components/ModelViewer';
import { crmFetch, crmPath } from '../../../lib/client-fetch';

// ============================================================
// Types
// ============================================================
type Project = {
  id: string;
  slug: string;
  name: string;
  status: 'draft' | 'qa_pending' | 'rejected' | 'approved';
  revision_count: number;
  glb_url: string | null;
  brief: string | null;
  updated_at: string;
  client: { slug: string; name: string };
  assignee: { id: string; name: string; email: string } | null;
};

type Reference = {
  id: string;
  image_url: string;
  created_at: string;
};

// ============================================================
// QaReviewPage — full-page version of the old ReviewModal.
//
// Layout:
//   - The GLB viewer takes the FULL width of the content area so
//     QA has maximum room to inspect the model.
//   - Reference images do NOT appear here. Instead, two buttons
//     in the header give QA quick access:
//       "Open references" → /admin/qa/[id]/references (new tab)
//       "Download all"    → builds + downloads a zip of all refs
//     The reasoning: 12+ thumbs on the same page steal attention
//     from the model. A dedicated references tab + a one-click
//     zip cover the actual review workflows.
//   - Feedback dropzone accepts pasted images (Ctrl+V).
//   - After action, we navigate back to /admin so the Overview
//     reflects the new state on next render.
//
// Decision rule (preserved from the API):
//   feedback images empty   → APPROVE
//   feedback images present → REJECT
// ============================================================
export default function QaReviewPage({
  project,
  references,
  currentUser,
}: {
  project: Project;
  references: Reference[];
  currentUser: { name: string; role: 'admin' };
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  // Tiny visual signal when an image is added via paste, so the
  // user knows the paste actually landed (clipboard images don't
  // come with a file dialog or a drop animation).
  const [pasteFlash, setPasteFlash] = useState(false);

  // Download-all-refs state. Kept separate from the form-level
  // `busy` so the user can still queue feedback while a zip is
  // being prepared in the background.
  const [downloadingRefs, setDownloadingRefs] = useState(false);
  const [downloadRefsErr, setDownloadRefsErr] = useState<string | null>(null);

  function addFiles(picked: FileList | File[] | File[]) {
    const arr = Array.from(picked).filter((f) => /^image\//.test(f.type));
    if (arr.length === 0) return;
    setFiles((prev) => [...prev, ...arr]);
    // If the user just changed their mind after seeing "Approve", reset
    // the confirm step — the decision now flips to "Reject".
    setConfirm(false);
  }
  function removeAt(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setConfirm(false);
  }

  // ----- Paste handler (Ctrl+V anywhere on the page) -----
  // The textarea also receives paste events; we don't want pasting
  // an image into the note field to be lost, so we attach to window
  // and check whether the clipboard contains any image item. Plain
  // text pastes pass through to whatever element has focus naturally.
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      if (busy) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      const picked: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          const f = it.getAsFile();
          if (f) picked.push(f);
        }
      }
      if (picked.length === 0) return;

      // We have images — eat the event so the browser doesn't also
      // try to paste an <img> blob into a focused textarea/contentEditable.
      e.preventDefault();
      addFiles(picked);
      setPasteFlash(true);
      window.setTimeout(() => setPasteFlash(false), 700);
    }
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [busy]);

  // ----- Download all reference images as a single zip -----
  // Same client-side approach as the BriefModal in ArtistDashboard:
  // fetch each public R2 URL, stitch into a zip with JSZip, trigger
  // a save via a temporary <a download>. Tolerates individual fetch
  // failures (skip and continue); fails only when every image fails.
  async function downloadAllRefs() {
    if (references.length === 0 || downloadingRefs) return;
    setDownloadingRefs(true);
    setDownloadRefsErr(null);
    try {
      const zip = new JSZip();
      let ok = 0;
      await Promise.all(
        references.map(async (r, i) => {
          try {
            const res = await fetch(r.image_url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const ext = (() => {
              const m = r.image_url.match(/\.([a-z0-9]+)(?:\?|$)/i);
              return m ? m[1].toLowerCase() : 'jpg';
            })();
            const num = String(i + 1).padStart(2, '0');
            zip.file(`reference-${num}.${ext}`, blob);
            ok++;
          } catch {
            // Skip this image; rest still goes into the zip.
          }
        })
      );

      if (ok === 0) {
        setDownloadRefsErr('Could not download any of the reference images.');
        return;
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.slug}-references.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setDownloadRefsErr((e as Error).message);
    } finally {
      setDownloadingRefs(false);
    }
  }

  async function submit() {
    setErr(null);
    setBusy(true);
    try {
      let imageUrls: string[] = [];

      if (files.length > 0) {
        const signRes = await crmFetch(
          `/api/projects/${project.id}/feedback-sign`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              count: files.length,
              // Tell the server each file's MIME so it can sign
              // matching Content-Types. The browser must then send
              // the same header on the PUT or R2 rejects the request.
              content_types: files.map(
                (f) => f.type || 'application/octet-stream'
              ),
            }),
          }
        );
        const signData = await signRes.json();
        if (!signRes.ok) {
          setErr(signData.error || 'Could not sign feedback uploads.');
          return;
        }

        imageUrls = await Promise.all(
          files.map(async (f, i) => {
            const item = signData.signed[i];
            const r = await fetch(item.upload_url, {
              method: 'PUT',
              headers: { 'Content-Type': item.content_type },
              body: f,
            });
            if (!r.ok) {
              throw new Error(
                `R2 upload failed for ${f.name} (${r.status}).`
              );
            }
            // R2 returns an empty 200; the public URL is what
            // the sign endpoint already told us.
            return item.public_url as string;
          })
        );
      }

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
      // Done — back to the queue, refreshed.
      router.push(crmPath('/admin'));
      router.refresh();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const willApprove = files.length === 0;

  return (
    <div className="crm-shell">
      <Sidebar
        name={currentUser.name}
        role={currentUser.role}
        defaultCollapsed
      />

      <main className="crm-main">
        <div className="crm-page">
          {/* Compact single-row header: back button, title block,
              and right-side action cluster all on one line. The
              back button is now an icon-only square to save
              vertical room; the title sits in the middle and
              truncates if the project name is unusually long. */}
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => router.push(crmPath('/admin'))}
              className="crm-btn crm-btn-secondary"
              aria-label="Back to Overview"
              title="Back to Overview"
              style={{
                padding: '6px 8px',
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <div style={{ minWidth: 0, flex: 1 }}>
              <h1
                className="crm-page-title"
                style={{
                  fontSize: 18,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.name}
              </h1>
              <p
                className="crm-page-sub"
                style={{
                  fontSize: 12,
                  margin: '2px 0 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.client.name} · Revision {project.revision_count}
                {project.assignee ? ` · Artist: ${project.assignee.name}` : ''}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
              }}
            >
              {references.length > 0 && (
                <>
                  <a
                    className="crm-btn crm-btn-secondary"
                    href={crmPath(`/admin/qa/${project.id}/references`)}
                    target="_blank"
                    rel="noreferrer"
                    title="Open the reference gallery in a new tab"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    <ExternalLink
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    Open references ({references.length})
                  </a>
                  <button
                    type="button"
                    className="crm-btn crm-btn-secondary"
                    onClick={downloadAllRefs}
                    disabled={downloadingRefs}
                    title="Download all references as a zip"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    <Download size={13} strokeWidth={1.75} aria-hidden="true" />
                    {downloadingRefs ? 'Preparing…' : 'Download all'}
                  </button>
                </>
              )}
              {/* Status badge intentionally omitted from this header.
                  The QA review page only renders for qa_pending
                  projects (server-side guard), so the badge would
                  always say the same thing — redundant noise. */}
            </div>
          </header>

          {downloadRefsErr && (
            <div className="crm-error" style={{ marginBottom: 16 }}>
              {downloadRefsErr}
            </div>
          )}

          {/* ============================== Model (full width) ============================== */}
          {/* The viewer fills the entire content width so QA gets
              maximum room to inspect the model. With the sidebar
              collapsed this is basically the whole viewport. */}
          <div>
            {project.glb_url ? (
              <ModelViewer src={project.glb_url} height={640} />
            ) : (
              <div className="crm-empty">
                <h3>No GLB uploaded</h3>
                <p>The artist hasn&apos;t uploaded a model yet.</p>
              </div>
            )}
            <p className="crm-qa-hint">
              Drag to rotate · scroll to zoom · right-click to pan
            </p>
          </div>

          {project.brief && (
            <section className="crm-card" style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h2
                  className="crm-qa-section-title"
                  style={{ margin: 0 }}
                >
                  Brief
                </h2>
                <p
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: 13,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {project.brief}
                </p>
              </div>
            </section>
          )}

          {/* ============================== Feedback section ============================== */}
          <section className="crm-card" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h2
                  className="crm-qa-section-title"
                  style={{ margin: '0 0 6px' }}
                >
                  Feedback
                </h2>
                <p
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: 13,
                    margin: 0,
                  }}
                >
                  Attach annotated screenshots if changes are needed.
                  Submitting with <strong>no images</strong> will forward
                  the model to the client for final approval.
                </p>
              </div>

            <div
              ref={dropRef}
              className={`crm-dropzone ${pasteFlash ? 'is-drag' : ''}`}
              onClick={() => document.getElementById('qa-fb-input')?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              tabIndex={0}
            >
              <input
                id="qa-fb-input"
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files) addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
              <strong>Click, drop, or paste screenshots</strong>
              <div
                className="crm-dropzone-hint"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  justifyContent: 'center',
                  marginTop: 6,
                }}
              >
                <Clipboard size={12} strokeWidth={1.75} aria-hidden="true" />
                <span>Ctrl+V to paste from clipboard · PNG/JPG/WebP · &le; 15 MB each</span>
              </div>
            </div>

            {files.length > 0 && (
              <div className="crm-feedback-grid">
                {files.map((f, i) => (
                  <div key={i} className="crm-feedback-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(f)} alt={f.name} />
                    <button onClick={() => removeAt(i)} aria-label="Remove">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="crm-form-group" style={{ margin: 0 }}>
              <label className="crm-label">Note (optional)</label>
              <textarea
                className="crm-textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional summary — visible to the artist."
              />
            </div>

            {err && <div className="crm-error">{err}</div>}

            {/* Subtle intent indicator — just a one-liner telling
                the reviewer which path they're on. The detailed
                consequences live in the confirmation modal so we
                don't duplicate them. */}
            <div
              style={{
                fontSize: 13,
                color: willApprove ? 'var(--accent)' : 'var(--danger)',
              }}
            >
              {willApprove
                ? '✓ No feedback images attached — submitting will forward this model to the client for final approval.'
                : `✕ ${files.length} feedback image${
                    files.length === 1 ? '' : 's'
                  } attached — submitting will reject this model.`}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'flex-end',
              }}
            >
              <button
                className="crm-btn crm-btn-secondary"
                onClick={() => router.push(crmPath('/admin'))}
                disabled={busy}
              >
                Cancel
              </button>
              {/* Neutral "Submit" button regardless of decision.
                  Clicking opens a confirmation modal which carries
                  the green/red intent based on whether feedback
                  images are attached. Keeping the button neutral
                  here avoids a red "Reject" sitting on screen
                  during normal review (most projects approve). */}
              <button
                className="crm-btn"
                onClick={() => setConfirm(true)}
                disabled={busy}
              >
                Submit
              </button>
            </div>
            </div>
          </section>
        </div>
      </main>

      {/* ============================== Confirmation modal ============================== */}
      {/* Same modal shell for both approve and reject paths. Content
          adapts via `willApprove`. The actual submit is fired from
          the modal's primary button, not from the page form. */}
      {confirm && (
        <div
          className="crm-modal-backdrop"
          onClick={() => {
            if (!busy) setConfirm(false);
          }}
        >
          <div
            className="crm-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 480,
              // Tint the entire modal border + a subtle background
              // wash with the decision color (green = approve,
              // red = reject) so the reviewer sees the intent
              // before reading any text.
              borderColor: willApprove
                ? 'color-mix(in srgb, var(--success, #16a34a) 40%, var(--border))'
                : 'color-mix(in srgb, var(--danger) 40%, var(--border))',
              borderWidth: 2,
              boxShadow: willApprove
                ? '0 0 0 4px color-mix(in srgb, var(--success, #16a34a) 12%, transparent)'
                : '0 0 0 4px color-mix(in srgb, var(--danger) 12%, transparent)',
            }}
          >
            <div className="crm-modal-header">
              <div>
                <h2
                  className="crm-modal-title"
                  style={{
                    // Title color matches the decision so it reads
                    // unambiguously — green for approve, red for reject.
                    color: willApprove
                      ? 'var(--success, #16a34a)'
                      : 'var(--danger)',
                  }}
                >
                  {willApprove
                    ? 'Approve and forward to client?'
                    : `Reject this model with ${files.length} feedback image${
                        files.length === 1 ? '' : 's'
                      }?`}
                </h2>
                <p
                  style={{
                    margin: '4px 0 0',
                    color: 'var(--text-dim)',
                    fontSize: 13,
                  }}
                >
                  {project.client.name} · {project.name} · Revision{' '}
                  {project.revision_count}
                </p>
              </div>
              <button
                className="crm-modal-close"
                onClick={() => setConfirm(false)}
                disabled={busy}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: 16,
                background: willApprove
                  ? 'color-mix(in srgb, var(--success, #16a34a) 8%, transparent)'
                  : 'color-mix(in srgb, var(--danger) 8%, transparent)',
                border: '1px solid',
                borderColor: willApprove
                  ? 'color-mix(in srgb, var(--success, #16a34a) 30%, transparent)'
                  : 'color-mix(in srgb, var(--danger) 30%, transparent)',
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              {willApprove ? (
                <>
                  <strong>This will send the model to the client.</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
                    Status will change to <strong>Client Review</strong>.
                    The client will see the model in their dashboard and
                    give final approval (or send it back with feedback).
                    The model is NOT public yet — only the client's
                    approval publishes it.
                  </p>
                </>
              ) : (
                <>
                  <strong>
                    The artist will receive {files.length} feedback image
                    {files.length === 1 ? '' : 's'}.
                  </strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
                    Status will change to <strong>Rejected</strong>. The
                    artist will be asked to upload revision{' '}
                    {project.revision_count + 1}.
                  </p>
                </>
              )}
            </div>

            {err && (
              <div className="crm-error" style={{ marginTop: 12 }}>
                {err}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'flex-end',
                marginTop: 20,
              }}
            >
              <button
                className="crm-btn crm-btn-secondary"
                onClick={() => setConfirm(false)}
                disabled={busy}
              >
                Cancel
              </button>
              <button
                className="crm-btn"
                onClick={submit}
                disabled={busy}
                style={{
                  // Inline color override since we don't have a
                  // crm-btn-success class. Matches the existing
                  // crm-btn-danger pattern, just green.
                  background: willApprove
                    ? 'var(--success, #16a34a)'
                    : 'var(--danger)',
                  color: '#fff',
                }}
              >
                {busy
                  ? 'Submitting…'
                  : willApprove
                    ? 'Yes, send to client'
                    : 'Yes, reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
