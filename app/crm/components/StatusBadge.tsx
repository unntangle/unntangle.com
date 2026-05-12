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
  return <span className="crm-badge crm-badge-approved">Approved</span>;
}
