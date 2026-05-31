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

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
