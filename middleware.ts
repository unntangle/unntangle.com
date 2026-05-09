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
