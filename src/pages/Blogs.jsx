import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import { blogsData } from '../data/companyData';

export default function Blogs() {
  const featuredArticle = blogsData[0];
  const smallArticles = blogsData.slice(1);

  return (
    <PageTransition>
      {/* 1. Header Hero Area */}
      <section className="bg-neutral-50 dark:bg-[#101c2f] py-20 border-b border-neutral-200/50 dark:border-neutral-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase">JOURNAL & UPDATES</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-6xl max-w-3xl leading-tight">
            From the Nexa Journal.
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            Analytical insights on logistics optimization, full-stack tech structures, and corporate campaign scalability.
          </p>
        </div>
      </section>

      {/* 2. Featured + Smaller Articles Grid Layout */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Featured Large Article (7 columns) */}
          {featuredArticle && (
            <div className="lg:col-span-7 bg-white dark:bg-[#101c2f] border border-neutral-200/60 dark:border-neutral-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#3167ff] dark:text-[#20c9b5] uppercase tracking-widest bg-[#3167ff]/10 px-2.5 py-0.5 rounded">
                  FEATURED // {featuredArticle.category}
                </span>
                <Link to={`/blogs/${featuredArticle.id}`}>
                  <h2 className="text-3xl font-black text-neutral-900 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] transition-colors leading-tight font-display">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-450 leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/55 dark:border-neutral-800 flex justify-between items-center text-xs">
                <span className="text-neutral-500">{featuredArticle.date} · {featuredArticle.readTime}</span>
                <Link 
                  to={`/blogs/${featuredArticle.id}`} 
                  className="flex items-center gap-1 font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-[#3167ff]"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT: Smaller Articles Feed (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">// LATEST ENTRIES</h3>
            <div className="space-y-4">
              {smallArticles.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white dark:bg-[#101c2f] border border-neutral-200/60 dark:border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-[#3167ff]/40 shadow-sm transition-all group"
                  data-cursor="explore"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-[#20c9b5] uppercase tracking-wider block">
                      {post.category}
                    </span>
                    <Link to={`/blogs/${post.id}`}>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                  </div>
                  <div className="pt-4 border-t border-neutral-200/30 dark:border-neutral-800 mt-4 flex justify-between items-center text-[10px] text-neutral-450">
                    <span>{post.date} · {post.readTime}</span>
                    <Link to={`/blogs/${post.id}`} className="font-bold text-neutral-900 dark:text-white flex items-center gap-0.5 hover:text-[#3167ff]">
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
