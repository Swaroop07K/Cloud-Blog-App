import { createPostAction } from './actions';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  return (
    <div className="editor-shell animate-fade-in">
      <header className="page-header">
        <div className="eyebrow">Author Studio</div>
        <h1>Create New Article</h1>
        <p>Draft a technical post, add a few searchable tags, and publish it to the blog.</p>
      </header>

      {error && (
        <div className="notice notice-error">
          {error}
        </div>
      )}

      <form action={createPostAction} className="editor-card flex flex-col gap-6">
        <div className="field">
          <label>Post Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Scaling Next.js with Supabase"
            className="input"
          />
        </div>

        <div className="field">
          <label>Tags (comma separated)</label>
          <input
            name="tags"
            type="text"
            placeholder="cloud, nextjs, supabase"
            className="input"
          />
        </div>

        <div className="field">
          <label>Content (Markdown)</label>
          <textarea
            name="markdown"
            required
            rows={15}
            placeholder="Write your article in markdown here..."
            className="textarea"
          />
        </div>

        <div className="form-footer">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Markdown rendering is supported.</p>
          <button type="submit" className="btn-primary">
            Publish Article
          </button>
        </div>
      </form>
    </div>
  );
}
