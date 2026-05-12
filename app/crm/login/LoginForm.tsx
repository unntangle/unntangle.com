'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crmFetch, crmPath } from '../lib/client-fetch';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await crmFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }
      // Server returns { redirect: '/artist' } etc. Prefix /crm in
      // local dev (no-op on the subdomain) so the router navigates
      // to the correct path.
      const target = data.redirect || '/';
      router.push(crmPath(target));
      router.refresh();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="crm-form-group">
        <label className="crm-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="crm-input"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="crm-form-group">
        <label className="crm-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="crm-input"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="crm-error">{error}</div>}
      <button
        type="submit"
        className="crm-btn"
        style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
