import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { blogsData } from '../data/companyData';

export default function BlogArticle() {
  const { slug } = useParams();
  const post = blogsData.find((b) => b.slug === slug);

  if (!post) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-32 text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Article Not Found</h1>
          <p className="text-neutral-500">The blog article you are looking for does not exist.</p>
          <Link to="/blogs" className="text-blue-600 dark:text-cyan-400 hover:underline">
            Back to Blogs
          </Link>
        </div>
      </PageTransition>
    );
  }

  const paragraphs = post.content.trim().split('\n\n');

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300">
        
        {/* Back navigation */}
        <div className="mb-10">
          <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        </div>

        {/* Headline block */}
        <header className="space-y-4 border-b border-neutral-200 dark:border-neutral-900 pb-8 mb-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#1d4ed8] dark:text-[#f97316]">
            {post.category}
          </span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-6xl leading-tight font-display">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 pt-2 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif text-lg">
          {paragraphs.map((p, index) => {
            if (p.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl font-black text-neutral-900 dark:text-white pt-6 font-display not-italic">
                  {p.replace('### ', '')}
                </h3>
              );
            }
            if (p.startsWith('1. ') || p.startsWith('- ')) {
              return (
                <div key={index} className="pl-6 border-l-2 border-neutral-900 dark:border-white py-1 text-sm bg-neutral-100/50 dark:bg-neutral-900/40 rounded-sm font-sans not-italic">
                  {p}
                </div>
              );
            }
            return <p key={index} className="leading-relaxed">{p}</p>;
          })}
        </div>

      </article>
    </PageTransition>
  );
}
