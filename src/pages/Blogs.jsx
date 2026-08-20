import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { blogsData } from '../data/companyData';

export default function Blogs() {
  const featured = blogsData[0];
  const remaining = blogsData.slice(1);

  return (
    <PageTransition>
      {/* 1. Editorial Header */}
      <section className="bg-neutral-50 dark:bg-neutral-900/10 py-24 border-b border-neutral-200/50 dark:border-neutral-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#1d4ed8] dark:text-[#f97316] uppercase">PERSPECTIVES & ESSAYS</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-7xl max-w-3xl leading-tight">
            The Nexa Blog.
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
            Read expert research and analyses written by our operational managers on enterprise growth, multi-vendor coordination, staging logistics, and automation stacks.
          </p>
        </div>
      </section>

      {/* 2. Journal Content Area */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#faf9f6] dark:bg-[#0a0f1d] transition-colors duration-300 space-y-24">
        
        {/* Featured Entry */}
        {featured && (
          <div className="border border-neutral-200 dark:border-neutral-900 rounded-sm p-8 lg:p-12 bg-white dark:bg-neutral-950 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" data-cursor="explore">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                <span className="text-[#1d4ed8] dark:text-[#f97316]">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white sm:text-5xl leading-tight font-display">
                <Link to={`/blogs/${featured.slug}`} className="hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                {featured.shortDescription}
              </p>
              <div className="pt-2">
                <Link
                  to={`/blogs/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-colors shadow-sm"
                >
                  Read Essay
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 h-[280px] w-full overflow-hidden border border-neutral-200 dark:border-neutral-900 rounded-sm relative">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
                alt="Featured Blog Visual"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        )}

        {/* Asymmetrical List Section */}
        <div>
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            // BLOG ENTRIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {remaining.map((post, idx) => (
              <div
                key={post.id}
                className="space-y-4 border-b border-neutral-100 dark:border-neutral-900/60 pb-8 flex flex-col justify-between"
                data-cursor="explore"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    <span className="text-[#1d4ed8] dark:text-[#f97316]">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-neutral-900 dark:text-white hover:text-[#1d4ed8] dark:hover:text-[#f97316] transition-colors leading-tight">
                    <Link to={`/blogs/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {post.shortDescription}
                  </p>
                </div>
                
                <div className="pt-4 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <User className="h-3 w-3" /> By {post.author}
                  </span>
                  <Link to={`/blogs/${post.slug}`} className="text-xs font-bold text-neutral-900 dark:text-white hover:text-[#1d4ed8] dark:hover:text-[#f97316] inline-flex items-center gap-1 transition-colors">
                    Read <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </PageTransition>
  );
}
