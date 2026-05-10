import type { Metadata } from 'next';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    title: 'Cookie Preferences',
    description:
        'Control how Unntangle uses cookies on our website. Toggle analytics cookies on or off, learn what each cookie does, and review our cookie policy.',
    alternates: { canonical: '/cookie-preferences' },
    openGraph: {
        title: 'Cookie Preferences | Unntangle',
        description:
            'Control how Unntangle uses cookies on our website and review our cookie policy.',
        url: `${SITE_URL}/cookie-preferences`,
        type: 'website',
    },
    robots: {
        // The page itself isn't sensitive — let it be indexed so users can
        // discover the cookie policy via search.
        index: true,
        follow: true,
    },
};

export default function CookiePreferencesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
