/**
 * lib/crm/session.ts
 * -----------------------------------------------------------------------
 * Signed cookie sessions using JWT (jose). The session payload is small —
 * just the user id, role, and email. We sign with HS256 using a secret
 * from env. Cookies are httpOnly + secure + sameSite=lax.
 *
 * This is used by:
 *   - login route   → sets the cookie
 *   - logout route  → clears the cookie
 *   - layout/pages  → reads the cookie to gate access
 * -----------------------------------------------------------------------
 */
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import type { CrmRole } from './supabase';

const COOKIE = 'crm_session';
const ALG = 'HS256';
const MAX_AGE_S = 60 * 60 * 24 * 7;  // 7 days

function secret(): Uint8Array {
  const s = process.env.CRM_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      'CRM_SESSION_SECRET is missing or too short (need 16+ chars) in .env.local'
    );
  }
  return new TextEncoder().encode(s);
}

export interface Session {
  uid:   string;
  email: string;
  name:  string;
  role:  CrmRole;
}

export async function signSession(s: Session): Promise<string> {
  return await new SignJWT({ ...s })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_S}s`)
    .sign(secret());
}

export async function readSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      uid:   String(payload.uid),
      email: String(payload.email),
      name:  String(payload.name),
      role:  payload.role as CrmRole,
    };
  } catch {
    return null;
  }
}

export async function writeSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   MAX_AGE_S,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
