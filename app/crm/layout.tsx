import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './crm.css';

// ============================================================
// UFlow layout — completely separate from the marketing site.
// This layout REPLACES the root layout's <html>/<body> because
// it sits at app/crm/ (legacy folder name; the public-facing
// brand is uFLOW). Next.js root layouts are global. Workaround:
// we render inside the existing <body> from app/layout.tsx but
// reset styles via a wrapper class.
// ============================================================

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--crm-font',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  // We override metadataBase because the app lives on a different
  // subdomain. metadataBase still inherits from root, but title +
  // robots are scoped here.
  title: {
    template: '%s | uFLOW',
    default: 'uFLOW',
  },
  description: 'Internal project management for 3D artists and QA reviewers.',
  // Override the root layout's Unntangle favicon for the entire
  // CRM. Without this, every uFLOW page would show the Unntangle
  // mark in the browser tab. We list the same WebP file in all
  // three slots so favicons, taskbar shortcuts, and iOS home-screen
  // saves all pick it up.
  icons: {
    icon: [
      { url: '/uflow/uFLOW-fav-icon.webp', type: 'image/webp' },
    ],
    shortcut: '/uflow/uFLOW-fav-icon.webp',
    apple: '/uflow/uFLOW-fav-icon.webp',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  // Strip the global OG/Twitter cards from the marketing layout
  // so the app doesn't get a public-facing social card.
  openGraph: { title: 'uFLOW', images: [] },
  twitter: { title: 'uFLOW', images: [] },
  alternates: { canonical: undefined },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`crm-root ${plusJakarta.variable}`}>
      {/* Explicit favicon override.
          The CRM lives at a different subdomain (uflow.unntangle.com)
          and needs its own brand mark in the browser tab. The
          `metadata.icons` config above SHOULD do this on its own,
          but Next.js sometimes emits both the root layout's icon
          link and the child layout's, in which case the browser
          picks the first one (Unntangle). Rendering an explicit
          <link rel="icon"> here guarantees the uFLOW favicon wins
          for every page under /crm/*.

          The ?v=1 cache-buster forces browsers to refetch instead
          of using whatever stale icon they cached previously. Bump
          this number whenever the favicon file changes. */}
      <link
        rel="icon"
        type="image/webp"
        href="/uflow/uFLOW-fav-icon.webp?v=1"
      />
      {children}
    </div>
  );
}
