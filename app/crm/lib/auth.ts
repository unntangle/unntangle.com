// ============================================================
// Auth guards — used by pages and API routes
// ============================================================

import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getSession, SessionPayload } from './session';

// ============================================================
// For SERVER COMPONENTS / PAGES
// Redirects to /login if not authenticated. Optionally enforce
// a role and redirect to the correct dashboard if mismatched.
// ============================================================
export async function requireUser(
  expectedRole?: SessionPayload['role']
): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  if (expectedRole && session.role !== expectedRole && session.role !== 'admin') {
    // User is logged in but for the wrong dashboard — bounce them
    // to their own dashboard rather than showing "forbidden".
    redirect(dashboardPathFor(session.role));
  }
  return session;
}

// ============================================================
// For API ROUTE HANDLERS
// Returns either a session or a NextResponse to short-circuit
// the handler with 401/403. Pattern:
//
//   const auth = await requireApiUser('qa');
//   if (auth instanceof NextResponse) return auth;
//   // auth is SessionPayload from here on
// ============================================================
export async function requireApiUser(
  expectedRole?: SessionPayload['role']
): Promise<SessionPayload | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (expectedRole && session.role !== expectedRole && session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return session;
}

// ============================================================
// Role → landing page
// ============================================================
export function dashboardPathFor(role: SessionPayload['role']): string {
  if (role === 'qa') return '/qa';
  if (role === '3d_artist') return '/artist';
  return '/artist'; // admin defaults to artist view; can switch via header
}
