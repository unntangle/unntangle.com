/**
 * Branded HTML emails for the contact form, styled to match the website:
 * slim dark bar with the white logo, soft pastel gradient header, rounded
 * white cards, dark pill button, blue accents.
 *
 * Built with tables and inline styles so they render consistently in
 * Gmail, Outlook, Apple Mail and Zoho Mail. Gradients have a flat
 * background-color fallback for clients that don't support them.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://unntangle.com').replace(/\/$/, '');

const FONT = "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif";

export const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- Shared layout ---------- */

function layout({ preheader, hero, body }: { preheader: string; hero: string; body: string }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>Unntangle</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f6fa;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f6fa;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

  <!-- Dark bar with logo -->
  <tr><td style="background-color:#0c0d17;border-radius:24px 24px 0 0;padding:22px 32px;">
    <a href="${SITE_URL}" style="text-decoration:none;">
      <img src="${SITE_URL}/images/unntangle_logo_white.png" width="130" alt="Unntangle" style="display:block;border:0;height:auto;color:#ffffff;font-family:${FONT};font-size:20px;font-weight:700;">
    </a>
  </td></tr>

  <!-- Pastel gradient hero -->
  <tr><td style="background-color:#f1e8ff;background-image:linear-gradient(135deg,#ffe9df 0%,#f1e8ff 55%,#e3f1ff 100%);padding:40px 32px 44px;">
    ${hero}
  </td></tr>

  <!-- Body -->
  <tr><td style="background-color:#ffffff;border-radius:0 0 24px 24px;padding:32px;">
    ${body}
  </td></tr>

  <!-- Footer -->
  <tr><td align="center" style="padding:24px 16px 8px;font-family:${FONT};font-size:12px;line-height:1.6;color:#8a8f9c;">
    Unntangle Technologies &middot; Chennai, India<br>
    AI | Website | App | Software Solutions<br>
    <a href="${SITE_URL}/privacy" style="color:#8a8f9c;text-decoration:underline;">Privacy Policy</a>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function eyebrow(text: string) {
    return `<div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1f6bff;margin:0 0 14px;">${escapeHtml(text)}</div>`;
}

function heading(text: string) {
    return `<h1 style="font-family:${FONT};font-size:28px;line-height:1.2;font-weight:700;color:#0c0d17;margin:0 0 14px;">${text}</h1>`;
}

function paragraph(text: string, color = '#3a3f4b') {
    return `<p style="font-family:${FONT};font-size:15px;line-height:1.65;color:${color};margin:0;">${text}</p>`;
}

function detailRows(rows: [string, string][]) {
    return rows
        .map(
            ([k, v], i) => `
      <tr>
        <td style="padding:12px 16px;${i ? 'border-top:1px solid #eef0f4;' : ''}font-family:${FONT};font-size:13px;color:#8a8f9c;width:34%;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:12px 16px;${i ? 'border-top:1px solid #eef0f4;' : ''}font-family:${FONT};font-size:14px;color:#0c0d17;vertical-align:top;white-space:pre-wrap;">${escapeHtml(v)}</td>
      </tr>`,
        )
        .join('');
}

function card(title: string, inner: string) {
    return `
    <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8a8f9c;margin:0 0 10px;">${escapeHtml(title)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f8fb;border-radius:16px;">
      ${inner}
    </table>`;
}

/* ---------- 1. Confirmation email to the visitor ---------- */

export function confirmationEmail({
    name,
    interest,
    size,
    workflow,
}: {
    name: string;
    interest: string;
    size: string;
    workflow: string;
}) {
    const first = name.split(/\s+/)[0] || '';
    const greeting = first ? `Thanks, ${escapeHtml(first)}.` : 'Thank you.';

    const summary: [string, string][] = [
        ['Interested in', interest || 'Not specified'],
        ['Company size', size || 'Not specified'],
        ['Workflow', workflow ? (workflow.length > 400 ? `${workflow.slice(0, 400)}\u2026` : workflow) : 'Not specified'],
    ];

    const steps = [
        ['We review what you shared', 'An AI deployment specialist looks at the workflow and systems you described.'],
        ['We get in touch', 'We\u2019ll contact you to talk it through and ask any questions we need answered.'],
        ['You get an honest answer', 'Whether AI can automate or augment that work, and what a sensible first step would be.'],
    ];

    const stepRows = steps
        .map(
            ([t, d], i) => `
      <tr>
        <td width="44" valign="top" style="padding:0 0 18px;">
          <div style="width:32px;height:32px;line-height:32px;border-radius:16px;background-color:${['#ffe4d9', '#e9e1ff', '#d9f4e6'][i]};text-align:center;font-family:${FONT};font-size:14px;font-weight:700;color:#3a3f4b;">${i + 1}</div>
        </td>
        <td valign="top" style="padding:4px 0 18px;">
          <div style="font-family:${FONT};font-size:15px;font-weight:700;color:#0c0d17;margin:0 0 4px;">${t}</div>
          <div style="font-family:${FONT};font-size:14px;line-height:1.55;color:#5b5f6b;">${d}</div>
        </td>
      </tr>`,
        )
        .join('');

    const hero = `
      ${eyebrow('AI Workflow Assessment')}
      ${heading(`${greeting}<br>We&rsquo;ve Received Your Request.`)}
      ${paragraph('Your enquiry has reached our team. Here&rsquo;s a copy of what you sent, and what happens next.')}`;

    const body = `
      ${card('What You Sent', detailRows(summary))}

      <div style="height:28px;line-height:28px;">&nbsp;</div>

      <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8a8f9c;margin:0 0 14px;">What Happens Next</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}</table>

      <div style="height:8px;line-height:8px;">&nbsp;</div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-radius:999px;background-color:#0c0d17;">
            <a href="${SITE_URL}/ai-workflow-examples" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">See AI Workflow Examples &rarr;</a>
          </td>
        </tr>
      </table>

      <div style="height:20px;line-height:20px;">&nbsp;</div>
      ${paragraph(`While you wait, you might find our <a href="${SITE_URL}/blog" style="color:#1f6bff;font-weight:600;text-decoration:none;">Knowledge Hub</a> useful: practical articles on putting AI to work inside businesses.`, '#5b5f6b')}`;

    return {
        subject: 'We\u2019ve received your request \u2014 Unntangle',
        html: layout({
            preheader: 'Thanks for getting in touch. Here\u2019s what happens next.',
            hero,
            body,
        }),
        text: [
            `${first ? `Thanks, ${first}.` : 'Thank you.'} We've received your request.`,
            '',
            'What you sent:',
            ...summary.map(([k, v]) => `- ${k}: ${v}`),
            '',
            'What happens next:',
            ...steps.map(([t, d], i) => `${i + 1}. ${t} \u2014 ${d}`),
            '',
            `See AI workflow examples: ${SITE_URL}/ai-workflow-examples`,
            `Knowledge Hub: ${SITE_URL}/blog`,
            '',
            'Unntangle Technologies, Chennai, India',
        ].join('\n'),
    };
}

/* ---------- 2. Internal notification to the Unntangle team ---------- */

export function internalEmail({ rows, email }: { rows: [string, string][]; email: string }) {
    const hero = `
      ${eyebrow('New Website Enquiry')}
      ${heading('Someone Wants to Talk About AI.')}
      ${paragraph('A new enquiry just came in from the Contact page. Reply to this email to respond to them directly.')}`;

    const body = `
      ${card('Enquiry Details', detailRows(rows))}
      <div style="height:24px;line-height:24px;">&nbsp;</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-radius:999px;background-color:#1f6bff;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Reply to Enquiry &rarr;</a>
          </td>
        </tr>
      </table>`;

    return layout({ preheader: 'New enquiry from unntangle.com', hero, body });
}
