import { signup } from '@/app/auth/actions';
import Link from 'next/link';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <div className="auth-shell animate-fade-in">
      <div className="form-card">
        <h1 className="form-title">Create Account</h1>
        <p className="form-subtitle">Set up an author account and start publishing.</p>

        {error && (
          <div className="notice notice-error">
            {error}
          </div>
        )}

        <form action={signup} className="flex flex-col gap-4">
          <div className="field">
            <label>Full Name</label>
            <input
              name="displayName"
              type="text"
              required
              placeholder="John Doe"
              className="input"
            />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="input"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="input"
            />
          </div>
          <button type="submit" className="btn-primary">
            Get Started
          </button>
        </form>

        <p className="muted-link">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
