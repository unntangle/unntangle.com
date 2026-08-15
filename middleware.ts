import { NextRequest, NextResponse } from 'next/server';

// HIDDEN-UBIQ: master switch for the uBIQ brand site.
//
// While `true`, every /ubiq and /ubiq/* route returns the standard 404
// instead of rendering. The source under app/ubiq/ is untouched and still
// compiles — it's just unreachable. Flip this to `false` to bring the whole
// brand site back online in one edit.
//
// Other uBIQ surfaces are hidden separately and each is marked with a
// HIDDEN-UBIQ comment. To fully unhide, search the repo for HIDDEN-UBIQ:
//   - middleware.ts        (this flag)
//   - components/Navbar.tsx    (header CTA + uBIQ logo swap)
//   - components/Footer.tsx    (Quick Links entry + "Our Brands" column)
//   - app/page.tsx             (BrandEcosystem section)
//   - app/sitemap.ts           (/ubiq sitemap entry)
//   - app/layout.tsx           (uBIQ keyword + Organization brand JSON-LD)
const HIDE_UBIQ = true;

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  // HIDDEN-UBIQ: serve a 404 for the whole /ubiq subtree.
  if (HIDE_UBIQ && (url.pathname === '/ubiq' || url.pathname.startsWith('/ubiq/'))) {
    url.pathname = '/_ubiq-hidden';
    return NextResponse.rewrite(url);
  }

  // Route officemate.unntangle.com/* → /officemate/* (rewrite, URL stays clean)
  if (host.startsWith('officemate.')) {
    if (!url.pathname.startsWith('/officemate')) {
      url.pathname = `/officemate${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Route uflow.unntangle.com/* → /crm/* (same pattern as officemate).
  // The app source still lives under app/crm/ — only the public-facing
  // subdomain is renamed. We rewrite (not redirect) so the URL bar
  // stays clean.
  //
  // Exception: static files we ship under /public/uflow/ (logo, favicons,
  // etc.) must be served as-is, not rewritten to /crm/uflow/* (which
  // doesn't exist). We detect those by extension. _next/* is already
  // excluded by the matcher below, but our own assets in /public/ are not.
  if (host.startsWith('uflow.')) {
    const isStaticAsset = /\.(webp|png|jpe?g|gif|svg|ico|webmanifest|woff2?|ttf|otf|css|js|map|txt|xml)$/i
      .test(url.pathname);
    if (!url.pathname.startsWith('/crm') && !isStaticAsset) {
      url.pathname = `/crm${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
