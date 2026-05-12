import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './crm.css';

// ============================================================
// CRM layout — completely separate from the marketing site.
// This layout REPLACES the root layout's <html>/<body> because
// it sits at app/crm/ (a route group nested in the root app),
// but Next.js root layouts are global. Workaround: we render
// inside the existing <body> from app/layout.tsx but reset
// styles via a wrapper class.
// ============================================================

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--crm-font',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  // We override metadataBase because the CRM lives on a different
  // subdomain. metadataBase still inherits from root, but title +
  // robots are scoped to the CRM here.
  title: {
    template: '%s · Unntangle CRM',
    default: 'Unntangle CRM',
  },
  description: 'Internal project management for 3D artists and QA reviewers.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  // Strip the global OG/Twitter cards from the marketing layout
  // so the CRM doesn't get a public-facing social card.
  openGraph: { title: 'Unntangle CRM', images: [] },
  twitter: { title: 'Unntangle CRM', images: [] },
  alternates: { canonical: undefined },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`crm-root ${plusJakarta.variable}`}>
      {children}
    </div>
  );
}
