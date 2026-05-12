/**
 * scripts/seed-users.mjs
 * -----------------------------------------------------------------------
 * Run this ONCE after running schema.sql in Supabase.
 * It creates real bcrypt password hashes for the three default users.
 *
 * Usage:
 *   node scripts/seed-users.mjs
 *
 * Requires env vars:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Edit the USERS array below to change default passwords before running.
 * -----------------------------------------------------------------------
 */
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// --- Tiny .env.local loader (no dotenv dep needed) ----------------------
try {
  const envText = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of envText.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch {
  // .env.local optional — env vars may be set externally
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supa = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

// ⚠️  CHANGE THESE PASSWORDS BEFORE RUNNING IN PRODUCTION
const USERS = [
  { email: 'artist@unntangle.com', password: 'artist123', name: '3D Artist', role: 'artist' },
  { email: 'qa@unntangle.com',     password: 'qa123',     name: 'QA Artist', role: 'qa'     },
  { email: 'admin@unntangle.com',  password: 'admin123',  name: 'Admin',     role: 'admin'  },
];

async function main() {
  console.log('🌱  Seeding CRM users...\n');

  for (const u of USERS) {
    const hash = bcrypt.hashSync(u.password, 10);

    const { error } = await supa
      .from('crm_users')
      .upsert(
        {
          email: u.email,
          password_hash: hash,
          name: u.name,
          role: u.role,
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error(`❌  ${u.email}:`, error.message);
    } else {
      console.log(`✅  ${u.email.padEnd(30)} (${u.role}) password: ${u.password}`);
    }
  }

  console.log('\n✨  Done. You can now log in at /crm/login\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
