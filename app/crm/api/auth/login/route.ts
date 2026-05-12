import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase, CrmUser } from '../../../lib/supabase';
import { createSession } from '../../../lib/session';
import { dashboardPathFor } from '../../../lib/auth';

// ============================================================
// POST /api/auth/login
// Body: { email, password }
// Returns: { redirect: '/artist' | '/qa' } and sets crm_session cookie.
// ============================================================

export const runtime = 'nodejs'; // bcrypt needs Node, not Edge

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password required.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase()
    .from('crm_users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle<CrmUser>();

  if (error) {
    console.error('[login] db error', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
  if (!data) {
    // Same message for "no user" and "bad password" — don't leak user existence.
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, data.password_hash);
  if (!ok) {
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );
  }

  await createSession({
    userId: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
  });

  return NextResponse.json({ redirect: dashboardPathFor(data.role) });
}
