import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BookOpenText, LogOut, Search, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { signOut } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "CloudBlog | Modern Engineering Notes",
  description: "Technical writing, cloud architecture notes, and modern web development ideas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <nav className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="nav-mark">
              <BookOpenText size={20} />
            </span>
            <span className="brand-text">CloudBlog</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link is-active">Articles</Link>
            {user && <Link href="/admin" className="nav-link">Admin</Link>}
          </div>
          <div className="nav-actions">
            <button className="icon-btn" type="button" aria-label="Search articles">
              <Search size={20} />
            </button>
            {user ? (
              <div className="nav-actions">
                <form action={signOut}>
                  <button type="submit" className="icon-btn" title="Sign Out">
                    <LogOut size={20} />
                  </button>
                </form>
                <div className="user-avatar">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                <User size={16} />
                Sign In
              </Link>
            )}
          </div>
        </nav>
        <main className="container main-shell">
          {children}
        </main>
        <footer className="container site-footer">
          <span>&copy; {new Date().getFullYear()} CloudBlog. Built with Next.js and Supabase.</span>
          <span className="footer-dot" aria-hidden="true" />
        </footer>
      </body>
    </html>
  );
}
