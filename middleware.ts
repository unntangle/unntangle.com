import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

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

  // Legacy redirect: the products page used to live at /shop/usynq and was
  // moved to /usynq/products to live under the brand namespace. Anyone with
  // an old bookmark or external link gets a permanent 308 redirect to the
  // new location, with query params preserved (e.g. ?category=touch-switches).
  // Using 308 (not 301) preserves the request method, which matters for any
  // POSTs that might hit the old URL during the transition.
  if (
    url.pathname === '/shop/usynq' ||
    url.pathname.startsWith('/shop/usynq/')
  ) {
    const newUrl = url.clone();
    newUrl.pathname = url.pathname.replace('/shop/usynq', '/usynq/products');
    return NextResponse.redirect(newUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
