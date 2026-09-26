import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { confirmationEmail, internalEmail } from './emailTemplates';

/**
 * POST /api/contact — emails an AI Workflow Assessment / project enquiry
 * from the Contact page to the Unntangle inbox.
 *
 * Required environment variables (put them in .env.local, and in your
 * hosting provider's environment settings for production):
 *   SMTP_HOST   Zoho Mail: smtp.zoho.in (India accounts) or smtp.zoho.com
 *   SMTP_PORT   465 (SSL)
 *   SMTP_USER   the sending mailbox, e.g. gokul@unntangle.com
 *   SMTP_PASS   the Zoho app-specific password for that mailbox
 * Optional:
 *   CONTACT_TO  recipient; defaults to gokul@unntangle.com
 *
 * Zoho only allows sending "from" the authenticated mailbox, so the
 * From address is always SMTP_USER; the visitor is set as Reply-To.
 */

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = /\.(pdf|docx?|xlsx?|csv|txt|png|jpe?g)$/i;

const labels: Record<string, string> = {
    assessment: 'AI Workflow Assessment',
    deployment: 'AI agent / workflow deployment',
    integration: 'System integration (ERP, CRM, APIs)',
    products: 'AI products (uVOIZ, uDYLR, uSCRIBR)',
    engineering: 'Software & web engineering',
    other: 'Something else',
    'under-50': 'Under 50 employees',
    '50-200': '50 – 200 employees',
    '200-1000': '200 – 1,000 employees',
    '1000-plus': '1,000+ employees',
};

const clean = (v: FormDataEntryValue | null, max = 2000) =>
    typeof v === 'string' ? v.trim().slice(0, max) : '';

export async function POST(req: Request) {
    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
    }

    // Honeypot: real visitors never see or fill this field.
    if (clean(form.get('company_website'))) {
        return NextResponse.json({ ok: true });
    }

    const name = clean(form.get('name'), 120);
    const email = clean(form.get('email'), 200);
    const phone = clean(form.get('phone'), 40);
    const interest = clean(form.get('interest'), 60);
    const size = clean(form.get('size'), 60);
    const workflow = clean(form.get('workflow'), 4000);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ ok: false, error: 'Please enter a valid work email.' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
        return NextResponse.json({ ok: false, error: 'Please enter a 10-digit mobile number.' }, { status: 400 });
    }

    // Optional attachment
    const attachments: { filename: string; content: Buffer }[] = [];
    const file = form.get('attachment');
    if (file && typeof file !== 'string' && file.size > 0) {
        if (file.size > MAX_FILE_BYTES) {
            return NextResponse.json({ ok: false, error: 'Attachment must be 5 MB or smaller.' }, { status: 400 });
        }
        if (!ALLOWED_EXT.test(file.name)) {
            return NextResponse.json(
                { ok: false, error: 'Please attach a PDF, Word, Excel, CSV, text or image file.' },
                { status: 400 },
            );
        }
        attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    const to = process.env.CONTACT_TO || 'gokul@unntangle.com';

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.error('[contact] SMTP environment variables are not set.');
        return NextResponse.json(
            { ok: false, error: 'Email is not configured yet.' },
            { status: 500 },
        );
    }

    const port = Number(SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const rows: [string, string][] = [
        ['Name', name || '—'],
        ['Work email', email],
        ['Phone', `+91 ${phone}`],
        ['Interested in', labels[interest] || interest || '—'],
        ['Company size', labels[size] || size || '—'],
        ['Workflow', workflow || '—'],
        ['Attachment', attachments[0]?.filename || 'None'],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

    // 1. Notify the Unntangle team (required — if this fails, the visitor sees an error)
    try {
        await transporter.sendMail({
            from: `"Unntangle Website" <${SMTP_USER}>`,
            to,
            replyTo: name ? `"${name.replace(/"/g, '')}" <${email}>` : email,
            subject: `New enquiry: ${labels[interest] || 'Contact form'}${name ? ` — ${name}` : ''}`,
            text,
            html: internalEmail({ rows, email }),
            attachments,
        });
    } catch (err) {
        console.error('[contact] Failed to send email', err);
        return NextResponse.json({ ok: false, error: 'We couldn\u2019t send your enquiry.' }, { status: 502 });
    }

    // 2. Branded confirmation to the visitor (best-effort — a failure here
    //    doesn't affect the enquiry, which has already reached the team)
    try {
        const confirm = confirmationEmail({
            name,
            interest: labels[interest] || '',
            size: labels[size] || '',
            workflow,
        });
        await transporter.sendMail({
            from: `"Unntangle" <${SMTP_USER}>`,
            to: email,
            subject: confirm.subject,
            text: confirm.text,
            html: confirm.html,
        });
    } catch (err) {
        console.error('[contact] Confirmation email to visitor failed', err);
    }

    return NextResponse.json({ ok: true });
}
