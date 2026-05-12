/**
 * lib/crm/auth.ts
 * -----------------------------------------------------------------------
 * Higher-level auth helpers. Wraps session + Supabase user lookup +
 * role-based access control.
 * -----------------------------------------------------------------------
 */
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { supa, type CrmUser, type CrmRole } from './supabase';
import { readSession, signSession, writeSessionCookie, clearSessionCookie, type Session } from './session';

/**
 * Verify email + password against the crm_users table.
 * Returns the full user row on success, or null on failure.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<CrmUser | null> {
  const { data, error } = await supa()
    .from('crm_users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (error || !data) return null;

  const user = data as CrmUser;
  const ok = bcrypt.compareSync(password, user.password_hash);
  return ok ? user : null;
}

/**
 * Log a user in: verify credentials, sign a JWT, set the cookie.
 * Returns the session payload on success or throws on failure.
 */
export async function login(email: string, password: string): Promise<Session> {
  const user = await verifyCredentials(email, password);
  if (!user) throw new Error('Invalid email or password');

  const session: Session = {
    uid:   user.id,
    email: user.email,
    name:  user.name,
    role:  user.role,
  };
  const token = await signSession(session);
  await writeSessionCookie(token);
  return session;
}

export async function logout() {
  await clearSessionCookie();
}

/**
 * Server-component guard. Use at the top of any protected page:
 *
 *   const session = await requireSession();              // any logged-in user
 *   const session = await requireSession('artist');      // must be artist
 *   const session = await requireSession(['qa','admin']);// must be qa OR admin
 *
 * Redirects to /login if unauthenticated, or to /crm if wrong role.
 */
export async function requireSession(
  roles?: CrmRole | CrmRole[]
): Promise<Session> {
  const s = await readSession();
  if (!s) redirect('/crm/login');

  if (roles) {
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(s.role)) {
      // logged in but wrong role — send to their own dashboard
      redirect('/crm');
    }
  }
  return s;
}

/**
 * Like requireSession but returns null instead of redirecting. Useful
 * for the root /crm page that decides where to send the user.
 */
export async function getSession(): Promise<Session | null> {
  return await readSession();
}
