import { NextRequest, NextResponse } from 'next/server';

// HIDDEN-UBIQ: master switch for the uBIQ brand site.
//
// The brand site has moved to its own domain (ubiqautomation.com). While
// `true`, every /ubiq and /ubiq/* route 301s to the matching path there,
// so existing links and indexed pages carry their ranking across instead
// of dying on a 404. The source under app/ubiq/ is untouched and still
// compiles — it's just no longer served from this domain.
//
// Flip this to `false` only if the brand site is ever brought back onto
// unntangle.com; the /ubiq routes would then render from here again.
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

// HIDDEN-UBIQ: the domain the uBIQ brand site now lives on.
const UBIQ_SITE_URL = 'https://ubiqautomation.com';

// Retired growth-marketing service pages. Unntangle no longer offers these,
// so their URLs 301 to /services instead of 404ing for old links and
// search results.
const RETIRED_SERVICE_PATHS = new Set([
  '/services/meta-ads',
  '/services/google-ads',
  '/services/seo',
  '/services/smm',
]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // HIDDEN-UBIQ: 301 the whole /ubiq subtree to the brand's own domain.
  //   /ubiq            -> https://ubiqautomation.com/
  //   /ubiq/about      -> https://ubiqautomation.com/about
  //   /ubiq/senz?x=1   -> https://ubiqautomation.com/senz?x=1
  // 301 (not 307) so search engines transfer ranking to the new URLs.
  if (HIDE_UBIQ && (url.pathname === '/ubiq' || url.pathname.startsWith('/ubiq/'))) {
    const path = url.pathname.slice('/ubiq'.length) || '/';
    return NextResponse.redirect(`${UBIQ_SITE_URL}${path}${url.search}`, 301);
  }

  if (RETIRED_SERVICE_PATHS.has(url.pathname.replace(/\/$/, ''))) {
    url.pathname = '/services';
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  // Cookie Preferences page retired: the site sets no analytics or tracking
  // cookies, so cookies are covered in the Privacy Policy instead.
  if (url.pathname.replace(/\/$/, '') === '/cookie-preferences') {
    url.pathname = '/privacy';
    url.search = '';
    url.hash = 'cookies';
    return NextResponse.redirect(url, 301);
  }

  // Host-based rewrites used to live here for officemate.unntangle.com and
  // uflow.unntangle.com. Both brands are their own standalone projects and
  // deployments now, so neither host reaches this middleware and both
  // rewrites pointed at app/ subtrees that no longer exist. Removed rather
  // than left dangling — a rewrite to a missing route serves a 404, which
  // is worse than no rule at all. If a subdomain ever needs to be served
  // from this app again, add it back in the shape of the /ubiq block above.

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
