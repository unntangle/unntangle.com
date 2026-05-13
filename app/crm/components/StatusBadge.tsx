import { ProjectStatus } from '../lib/supabase';

type Props = {
  status: ProjectStatus;
  revisionCount?: number;
};

export default function StatusBadge({ status, revisionCount = 0 }: Props) {
  if (status === 'draft') {
    return <span className="crm-badge crm-badge-draft">Draft</span>;
  }
  if (status === 'qa_pending') {
    return <span className="crm-badge crm-badge-pending">QA Pending</span>;
  }
  if (status === 'rejected') {
    // Match the exact label the user asked for: "Rejected 1", "Rejected 2", ...
    return (
      <span className="crm-badge crm-badge-rejected">
        Rejected {revisionCount}
      </span>
    );
  }
  if (status === 'wip') {
    // Amber/warn token — visually distinct from QA Pending (also
    // orange but lighter) and Rejected (red). Reads as "in progress".
    return <span className="crm-badge crm-badge-wip">WIP</span>;
  }
  if (status === 'client_review') {
    // Distinct from 'qa_pending' — same shape, but blue/info colour
    // so admins reading the dashboard immediately see this isn't
    // their queue. Clients see this as "awaiting your review".
    return (
      <span className="crm-badge crm-badge-client-review">
        Client Review
      </span>
    );
  }
  return <span className="crm-badge crm-badge-approved">Approved</span>;
}
