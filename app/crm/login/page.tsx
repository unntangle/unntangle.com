import { redirect } from 'next/navigation';
import { getSession } from '../lib/session';
import { dashboardPathFor } from '../lib/auth';
import LoginForm from './LoginForm';

// Server component: if already logged in, bounce to dashboard.
export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect(dashboardPathFor(session.role));

  return (
    <div className="crm-login-wrap">
      <div className="crm-login-card">
        <h1>Unntangle CRM</h1>
        <p>Sign in with your team credentials.</p>
        <LoginForm />
      </div>
    </div>
  );
}
