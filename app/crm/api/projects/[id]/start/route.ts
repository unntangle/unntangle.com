import { NextRequest, NextResponse } from 'next/server';
import { requireApiUser } from '../../../../lib/auth';
import { supabase } from '../../../../lib/supabase';

export const runtime = 'nodejs';

// ============================================================
// POST /api/projects/:id/start
//
// Transitions a `rejected` project to `wip` (work in progress).
// This is the artist's "I've seen the feedback, I'm working
// on it" acknowledgement. After this transition the artist
// dashboard shows View feedback + Re-upload (without it, only
// the Start button shows, so the artist can't just silently
// re-upload without engaging with the QA feedback).
//
// State machine reminder:
//   draft → qa_pending → (rejected → wip → qa_pending)* → approved
//
// Authorization:
//   - Caller must be a 3D artist
//   - Caller must be the ASSIGNED artist on this project
//     (no taking over someone else's job)
//   - Project must be in 'rejected' status
// ============================================================

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiUser('3d_artist');
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  // Verify ownership + state in one query, before the update,
  // so we can return a meaningful error code if either check fails.
  const { data: project, error: pErr } = await supabase()
    .from('uflow_projects')
    .select('id, status, assigned_to')
    .eq('id', id)
    .maybeSingle();

  if (pErr || !project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }
  if (project.assigned_to !== auth.userId) {
    // Don't leak whether the project exists vs. is just not theirs;
    // both look like "not yours" from the artist's perspective.
    return NextResponse.json(
      { error: 'This project is not assigned to you.' },
      { status: 403 }
    );
  }
  if (project.status !== 'rejected') {
    return NextResponse.json(
      {
        error: `Cannot start work \u2014 project is "${project.status}". Only "rejected" projects can be started.`,
      },
      { status: 400 }
    );
  }

  const { data: updated, error: uErr } = await supabase()
    .from('uflow_projects')
    .update({
      status: 'wip',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    // Guard against a race: only transition if it's still 'rejected'.
    // If two artist clicks land at the same time, only one wins.
    .eq('status', 'rejected')
    .select()
    .single();

  if (uErr || !updated) {
    console.error('[projects.start]', uErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, project: updated });
}
