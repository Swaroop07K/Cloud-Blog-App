import { login } from '@/app/auth/actions';
import Link from 'next/link';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const { error, message } = await searchParams;

  return (
    <div className="auth-shell animate-fade-in">
      <div className="form-card">
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Sign in to manage and publish CloudBlog articles.</p>

        {error && (
          <div className="notice notice-error">
            {error}
          </div>
        )}

        {message && (
          <div className="notice notice-info">
            {message}
          </div>
        )}

        <form action={login} className="flex flex-col gap-4">
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
            Sign In
          </button>
        </form>

        <p className="muted-link">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
