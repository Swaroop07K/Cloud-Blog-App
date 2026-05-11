import { getPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, TrendingUp } from 'lucide-react';

export default async function Home() {
  const posts = await getPosts().catch(() => []);

  return (
    <div className="animate-fade-in">
      <header className="hero">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            Engineering Dispatch
          </div>
        <h1 className="hero-title">
            Cloud notes for builders who ship.
        </h1>
        <p className="hero-subtitle">
            Practical essays on architecture, deployment, data, and the small choices that make modern web products feel reliable.
        </p>
        </div>
        <aside className="hero-panel">
          <div className="hero-panel-row">
            <span>Now reading</span>
            <TrendingUp size={16} />
          </div>
          <h2>{posts.length > 0 ? posts[0].title : 'Start your first published article'}</h2>
          <p>
            {posts.length > 0
              ? 'Fresh from the blog, with the newest posts always surfaced first.'
              : 'Connect Supabase and publish a post to bring this space to life.'}
          </p>
        </aside>
      </header>

      <div className="section-heading">
        <div>
          <h2>Latest Articles</h2>
          <p>{posts.length} published {posts.length === 1 ? 'post' : 'posts'}</p>
        </div>
      </div>

      <div className="grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/${post.slug}`}
              className="card"
            >
              <div className="card-tag">
                {post.tags?.[0] || 'Uncategorized'}
              </div>
              <h2 className="card-title">
                {post.title}
              </h2>
              <p className="card-excerpt">
                {post.markdown.substring(0, 150)}...
              </p>
              <div className="card-footer">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <ArrowRight size={16} color="var(--accent)" />
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <strong>No posts found.</strong>
            <p>Start by creating your first article in the Supabase dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
