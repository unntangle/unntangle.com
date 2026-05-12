-- =====================================================================
-- Unntangle CRM Schema  —  run this in Supabase → SQL Editor
-- =====================================================================
-- This is idempotent: safe to re-run. It will create what's missing
-- and skip what exists.
-- =====================================================================

-- 1. USERS  (hardcoded staff — 3D artists + QA)
create table if not exists public.crm_users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  password_hash text not null,                  -- bcrypt
  name          text not null,
  role          text not null check (role in ('artist','qa','admin')),
  created_at    timestamptz not null default now()
);

-- 2. CLIENTS  (officemate, future clients...)
create table if not exists public.crm_clients (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,              -- e.g. 'officemate'
  name       text not null,                     -- e.g. 'OfficeMate'
  created_at timestamptz not null default now()
);

-- 3. PROJECTS  (one 3D model = one project)
-- Status state machine:
--   draft              → artist created it, nothing uploaded yet
--   qa_pending         → artist uploaded zip, waiting for QA
--   rejected_<n>       → QA rejected with feedback (n = round number)
--   approved           → QA approved; model is live
create table if not exists public.crm_projects (
  id                uuid primary key default gen_random_uuid(),
  client_id         uuid not null references public.crm_clients(id) on delete cascade,
  slug              text not null,              -- e.g. 'jupiter'  (unique per client)
  name              text not null,              -- e.g. 'Jupiter 3D Chair'
  status            text not null default 'draft'
                    check (status in ('draft','qa_pending','rejected','approved')),
  rejection_round   int not null default 0,     -- 0,1,2... how many times rejected

  -- Cloudinary asset references (latest upload)
  glb_url           text,                       -- public GLB url
  zip_public_id     text,                       -- cloudinary public_id of the zip
  zip_url           text,                       -- cloudinary url of zip backup

  -- Audit
  artist_id         uuid references public.crm_users(id),
  qa_id             uuid references public.crm_users(id),

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  uploaded_at       timestamptz,                -- last artist upload
  reviewed_at       timestamptz,                -- last QA review

  unique(client_id, slug)
);

-- 4. FEEDBACK IMAGES  (QA uploads when rejecting)
create table if not exists public.crm_feedback_images (
  id             uuid primary key default gen_random_uuid(),
  project_id     uuid not null references public.crm_projects(id) on delete cascade,
  round          int not null,                  -- which rejection round this belongs to
  image_url      text not null,
  cloudinary_id  text not null,
  note           text,
  created_by     uuid references public.crm_users(id),
  created_at     timestamptz not null default now()
);

-- 5. ACTIVITY LOG  (audit trail)
create table if not exists public.crm_activity (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.crm_projects(id) on delete cascade,
  user_id    uuid references public.crm_users(id),
  action     text not null,                     -- 'created','uploaded','approved','rejected'
  detail     jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- INDEXES
-- =====================================================================
create index if not exists crm_projects_client_idx   on public.crm_projects(client_id);
create index if not exists crm_projects_status_idx   on public.crm_projects(status);
create index if not exists crm_feedback_project_idx  on public.crm_feedback_images(project_id);
create index if not exists crm_activity_project_idx  on public.crm_activity(project_id);

-- =====================================================================
-- updated_at trigger
-- =====================================================================
create or replace function public.crm_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_crm_projects_updated_at on public.crm_projects;
create trigger trg_crm_projects_updated_at
  before update on public.crm_projects
  for each row execute function public.crm_set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- We bypass RLS by using the service_role key on the server side.
-- Keep RLS enabled so the anon key can't accidentally read anything.
-- =====================================================================
alter table public.crm_users           enable row level security;
alter table public.crm_clients         enable row level security;
alter table public.crm_projects        enable row level security;
alter table public.crm_feedback_images enable row level security;
alter table public.crm_activity        enable row level security;

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- OfficeMate client
insert into public.crm_clients (slug, name)
values ('officemate', 'OfficeMate')
on conflict (slug) do nothing;

-- Jupiter project (already exists in /public/officemate/jupiter)
insert into public.crm_projects (client_id, slug, name, status, glb_url)
select
  c.id,
  'jupiter',
  'Jupiter 3D Chair',
  'approved',
  'https://officemate.unntangle.com/jupiter/Jupiter5.glb'
from public.crm_clients c
where c.slug = 'officemate'
on conflict (client_id, slug) do nothing;

-- ===== USERS =====
-- Passwords are bcrypt hashes. To generate new ones, run in your terminal:
--   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
--
-- The hashes below are for the following passwords (CHANGE THEM after first login!):
--   artist@unntangle.com  /  artist123
--   qa@unntangle.com      /  qa123
--   admin@unntangle.com   /  admin123

insert into public.crm_users (email, password_hash, name, role) values
  ('artist@unntangle.com', '$2a$10$rZ8kQqV5xL3J4nM6yP1vYeF8wH2dG5tA9bC7sR1eU3iO0kN6mP4xW', '3D Artist',  'artist'),
  ('qa@unntangle.com',     '$2a$10$tY9lRrW6yM4K5oN7zQ2wZfG9xI3eH6uB0cD8tS2fV4jP1lO7nQ5yX', 'QA Artist',  'qa'),
  ('admin@unntangle.com',  '$2a$10$uZ0mSsX7zN5L6pO8aR3xAgH0yJ4fI7vC1dE9uT3gW5kQ2mP8oR6zY', 'Admin',      'admin')
on conflict (email) do nothing;

-- NOTE: The bcrypt hashes above are PLACEHOLDERS and will NOT validate.
-- You must regenerate them. The CRM has a "first-run" setup script that
-- handles this — see /scripts/seed-users.mjs after npm install completes.
