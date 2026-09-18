import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, User, Calendar, Share2, Check, 
  Tag, BookOpen, ArrowRight, Sparkles, Building2 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { blogsData } from '../data/companyData';

export default function BlogArticle() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  // Match either by slug or id
  const post = blogsData.find((b) => b.slug === slug || b.id === slug);

  if (!post) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-32 text-center space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white font-display">
            Article Not Found
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            The journal entry you are looking for may have been archived or moved.
          </p>
          <div className="pt-4">
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Journal
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const relatedPosts = blogsData
    .filter((b) => (b.id !== post.id && b.slug !== post.slug))
    .slice(0, 3);

  const paragraphs = (post.content || post.excerpt || '').trim().split('\n\n');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300">
        
        {/* Progress bar accent */}
        <div className="sticky top-0 z-30 h-1 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 w-full" />

        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          
          {/* Top Navigation */}
          <div className="flex items-center justify-between pb-8">
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-amber-400 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800/80 border border-neutral-200 dark:border-slate-700 hover:border-blue-500/40 text-neutral-700 dark:text-slate-200 shadow-sm transition-all cursor-pointer"
              title="Share article"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header */}
          <header className="space-y-6 pb-8 border-b border-neutral-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Sparkles className="h-3 w-3" />
                {post.category}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                Editorial Dispatch
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white leading-[1.15] font-display tracking-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-neutral-600 dark:text-slate-300 leading-relaxed font-normal">
              {post.excerpt || post.summary}
            </p>

            {/* Author & Meta Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                {post.authorAvatar ? (
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/30 shadow-md"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    {post.author?.charAt(0) || "N"}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    {post.author}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-slate-400">
                    {post.authorRole || "Nexa Contributor"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs text-neutral-500 dark:text-slate-400 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-neutral-400" />
                  {post.readTime || post.readingTime || "4 min read"}
                </span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          {post.image && (
            <div className="my-10 rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-slate-800 shadow-xl relative group">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-80 sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 text-white/80 text-xs font-mono">
                PMK NEXA SOLUTIONS // FIELD REPORT
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-neutral-200/60 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 font-mono"
                >
                  <Tag className="h-2.5 w-2.5 opacity-60" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div className="space-y-6 text-neutral-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            {paragraphs.map((p, index) => {
              if (p.startsWith('### ')) {
                return (
                  <h2 
                    key={index} 
                    className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white pt-6 pb-2 font-display tracking-tight border-b border-neutral-200/60 dark:border-slate-800"
                  >
                    {p.replace('### ', '')}
                  </h2>
                );
              }
              if (p.startsWith('1. ') || p.startsWith('- ')) {
                return (
                  <div 
                    key={index} 
                    className="pl-5 border-l-4 border-blue-600 dark:border-amber-400 py-2 text-sm sm:text-base bg-white dark:bg-slate-800/40 rounded-r-xl shadow-xs"
                  >
                    <span className="font-semibold text-neutral-900 dark:text-white">{p}</span>
                  </div>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {p}
                </p>
              );
            })}
          </div>

          {/* Author Signoff Box */}
          <div className="my-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-neutral-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {post.authorAvatar ? (
              <img 
                src={post.authorAvatar} 
                alt={post.author}
                className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-500/20"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
                {post.author?.charAt(0) || "P"}
              </div>
            )}
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Published by
              </span>
              <h4 className="text-lg font-black text-neutral-900 dark:text-white">
                {post.author}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-slate-400">
                {post.authorRole} · PMK Nexa Solutions Private Limited
              </p>
              <p className="text-xs text-neutral-600 dark:text-slate-300 pt-1">
                Dedicated to engineering robust supply chains, high-velocity event infrastructure, and cloud technical architectures across India.
              </p>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-neutral-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-display">
                  Recommended Reads
                </h3>
                <Link 
                  to="/blogs" 
                  className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  View All Journal <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/blogs/${rel.id}`}
                    className="group flex flex-col justify-between bg-white dark:bg-slate-900/80 rounded-2xl p-4 border border-neutral-200/80 dark:border-slate-800 hover:border-blue-500/40 hover:shadow-lg transition-all"
                  >
                    <div className="space-y-3">
                      <div className="h-32 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-slate-800">
                        <img 
                          src={rel.image} 
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 dark:border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{rel.readTime}</span>
                      <span className="inline-flex items-center gap-0.5 font-bold text-neutral-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                        Read <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </div>
    </PageTransition>
  );
}
