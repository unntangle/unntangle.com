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

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
