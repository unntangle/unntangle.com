/**
 * lib/crm/supabase.ts
 * -----------------------------------------------------------------------
 * Server-side Supabase client. Uses the service_role key so it bypasses
 * Row Level Security — NEVER import this from client components. This
 * file is only safe to use inside route handlers, server components,
 * and server actions.
 * -----------------------------------------------------------------------
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  // Don't throw at import time so the rest of the site keeps building
  // when the env vars aren't set yet. Throw on first use instead.
  console.warn(
    '[crm/supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — CRM routes will 500.'
  );
}

// Cache a single client per process. Recreating it on every request
// works but burns ~30ms on cold starts.
let cached: SupabaseClient | null = null;

export function supa(): SupabaseClient {
  if (!url || !key) {
    throw new Error(
      'CRM Supabase env vars missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { 'x-application-name': 'unntangle-crm' } },
    });
  }
  return cached;
}

// ----------------------------------------------------------------------
// Row types — mirror schema.sql exactly. Keep them in sync manually;
// if the table count grows we'll switch to supabase gen types.
// ----------------------------------------------------------------------

export type CrmRole = 'artist' | 'qa' | 'admin';
export type CrmStatus = 'draft' | 'qa_pending' | 'rejected' | 'approved';

export interface CrmUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: CrmRole;
  created_at: string;
}

export interface CrmClient {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface CrmProject {
  id: string;
  client_id: string;
  slug: string;
  name: string;
  status: CrmStatus;
  rejection_round: number;
  glb_url: string | null;
  zip_public_id: string | null;
  zip_url: string | null;
  artist_id: string | null;
  qa_id: string | null;
  created_at: string;
  updated_at: string;
  uploaded_at: string | null;
  reviewed_at: string | null;
}

export interface CrmFeedbackImage {
  id: string;
  project_id: string;
  round: number;
  image_url: string;
  cloudinary_id: string;
  note: string | null;
  created_by: string | null;
  created_at: string;
}
