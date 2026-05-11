import { getPostBySlug, getPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | CloudBlog`,
    description: post.markdown.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.markdown.substring(0, 160),
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts().catch(() => []);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="article-shell animate-fade-in">
      <Link href="/" className="back-link">
        <ChevronLeft size={16} />
        Back to articles
      </Link>

      <header className="article-header">
        <div className="article-tags">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="article-title">
          {post.title}
        </h1>
        <div className="article-meta">
          <div className="author-chip">
            <div className="author-avatar" />
            <span>{post.author_profile?.display_name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
      </header>

      <div className="markdown-content">
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
