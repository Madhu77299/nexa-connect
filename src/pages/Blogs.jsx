import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Search, Clock, Calendar, 
  Sparkles, BookOpen, Share2, Check, 
  X, Flame, Mail, CheckCircle2
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import NeuralBackground from '../components/NeuralBackground';
import { blogsData } from '../data/companyData';

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Derive unique categories with counts
  const categories = useMemo(() => {
    const list = ['All'];
    blogsData.forEach(item => {
      if (item.category && !list.includes(item.category)) {
        list.push(item.category);
      }
    });
    return list;
  }, []);

  // Filtered list based on search and category
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        post.title.toLowerCase().includes(q) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        (post.category && post.category.toLowerCase().includes(q)) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q))) ||
        (post.author && post.author.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Featured article: first one marked featured or first in array
  const featuredArticle = useMemo(() => {
    return blogsData.find(b => b.featured) || blogsData[0];
  }, []);

  // Normal articles excluding featured when no filter is applied
  const displayArticles = useMemo(() => {
    if (searchQuery || selectedCategory !== 'All') {
      return filteredBlogs;
    }
    return filteredBlogs.filter(b => b.id !== featuredArticle?.id);
  }, [filteredBlogs, searchQuery, selectedCategory, featuredArticle]);

  const handleShare = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blogs/${postId}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER AREA WITH AMBIENT GLOW */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-12 overflow-hidden border-b border-neutral-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0F141F]">
          <NeuralBackground />
          {/* Ambient light gradient orbs */}
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -z-10 h-96 w-96 rounded-full bg-amber-500/10 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-slate-800/90 border border-neutral-200 dark:border-slate-700 text-xs font-black tracking-wider text-blue-600 dark:text-cyan-400 uppercase shadow-xs mx-auto">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
              <span>THE NEXA JOURNAL &amp; INTELLIGENCE</span>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
              Perspectives on Scale, Operations &amp; Technology
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Analytical dispatches from our leadership on structured vendor networks, zero-downtime event operations, and modern cloud architectures.
            </p>

            {/* Search & Stats Bar */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or keyword..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-400/50 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-4 flex flex-wrap justify-center items-center gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = cat === 'All' 
                  ? blogsData.length 
                  : blogsData.filter(b => b.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                      isSelected
                        ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-blue-500/25 dark:shadow-cyan-500/20 scale-102'
                        : 'bg-white dark:bg-slate-800/80 hover:bg-neutral-100 dark:hover:bg-slate-700/80 text-neutral-600 dark:text-slate-300 border border-neutral-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-white/20 text-white dark:text-slate-950 font-black' 
                        : 'bg-neutral-100 dark:bg-slate-700 text-neutral-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED ARTICLE SPOTLIGHT (Only shown on "All" without active search) */}
        {/* ========================================================================= */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16 relative z-10">
            <div className="bg-white dark:bg-[#111726] border border-neutral-200/90 dark:border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left: Expansive Visual Media */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden bg-slate-900">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                      <Flame className="h-3.5 w-3.5" />
                      Featured Editorial
                    </span>

                    <button
                      onClick={(e) => handleShare(e, featuredArticle.id)}
                      className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      title="Share link"
                    >
                      {copiedId === featuredArticle.id ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                      {featuredArticle.category}
                    </span>
                    <p className="text-xs text-slate-200/90 hidden sm:block line-clamp-1 font-mono">
                      Field Insights · {featuredArticle.date} · {featuredArticle.readTime}
                    </p>
                  </div>
                </div>

                {/* Right: Rich Editorial Content & CTAs */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 dark:text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{featuredArticle.date}</span>
                      <span>·</span>
                      <Clock className="h-3.5 w-3.5" />
                      <span>{featuredArticle.readTime}</span>
                    </div>

                    <Link to={`/blogs/${featuredArticle.id}`}>
                      <h2 className="text-2xl sm:text-3xl font-black font-display text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                      {featuredArticle.excerpt || featuredArticle.summary}
                    </p>

                    {/* Tags */}
                    {featuredArticle.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredArticle.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author & Action Footer */}
                  <div className="pt-6 border-t border-neutral-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {featuredArticle.authorAvatar ? (
                        <img 
                          src={featuredArticle.authorAvatar} 
                          alt={featuredArticle.author}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {featuredArticle.author?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">
                          {featuredArticle.author}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-slate-400">
                          {featuredArticle.authorRole}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/blogs/${featuredArticle.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all group/btn"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. ARTICLES GRID SECTION */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          {/* Section Heading with Results Count */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200/60 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-neutral-900 dark:text-white flex items-center gap-2">
                <span>{selectedCategory === 'All' ? 'All Journal Entries' : `${selectedCategory} Articles`}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-200/80 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 font-mono font-bold">
                  {displayArticles.length}
                </span>
              </h2>
            </div>

            {searchQuery && (
              <span className="text-xs text-neutral-500 dark:text-slate-400">
                Filtered by: <strong className="text-neutral-900 dark:text-white">"{searchQuery}"</strong>
              </span>
            )}
          </div>

          {/* Empty State */}
          {displayArticles.length === 0 ? (
            <div className="py-8 text-center space-y-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-neutral-200 dark:border-slate-800">
              <div className="h-16 w-16 mx-auto rounded-full bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-neutral-400">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">No articles found</h3>
              <p className="text-sm text-neutral-500 dark:text-slate-400 max-w-sm mx-auto">
                We couldn't find any articles matching your search criteria. Try a different query or reset filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Responsive 3-Column Grid with Ultra-Attractive Cards */
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {displayArticles.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white dark:bg-[#111726] border border-neutral-200/80 dark:border-slate-800/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative"
                  >
                    {/* Top Ambient Glow Line on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Visual Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                        {/* Floating Category Pill */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 dark:bg-slate-950/85 backdrop-blur-md text-blue-600 dark:text-cyan-400 shadow-sm border border-white/20">
                            <Sparkles className="h-2.5 w-2.5" />
                            {post.category}
                          </span>
                        </div>

                        {/* Top Right Floating Actions: Reading Time & Share */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <button
                            onClick={(e) => handleShare(e, post.id)}
                            className="h-7 w-7 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                            title="Share article link"
                          >
                            {copiedId === post.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Share2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Bottom Date Overlay */}
                        <div className="absolute bottom-3 left-4 text-white/90 text-[11px] font-mono flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-white/70" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-3">
                        
                        {/* Title */}
                        <Link to={`/blogs/${post.id}`}>
                          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {post.excerpt || post.summary}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-slate-800/90 text-neutral-600 dark:text-slate-300 font-mono"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Bottom Meta Bar */}
                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                        {/* Author Pill */}
                        <div className="flex items-center gap-2.5">
                          {post.authorAvatar ? (
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="h-7 w-7 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-slate-700"
                            />
                          ) : (
                            <div className="h-7 w-7 rounded-full bg-blue-600/10 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                              {post.author?.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-neutral-700 dark:text-slate-300 truncate max-w-[120px]">
                            {post.author}
                          </span>
                        </div>

                        {/* Read Link with Animated Icon */}
                        <Link
                          to={`/blogs/${post.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300"
                        >
                          <span>Read</span>
                          <div className="h-6 w-6 rounded-full bg-blue-50 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      </div>
                    </div>

                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </section>

        {/* ========================================================================= */}
        {/* 4. NEWSLETTER SUBSCRIPTION CALLOUT CARD */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
            {/* Background pattern decor */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase font-bold text-cyan-200">
                  <Mail className="h-3 w-3" />
                  <span>EXECUTIVE BRIEFING</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
                  Stay Ahead of Enterprise Shifts
                </h3>
                <p className="text-sm sm:text-base text-blue-100/85 max-w-xl leading-relaxed">
                  Join 1,200+ industry executives, procurement directors, and engineering leaders receiving our monthly briefing on vendor networks, technical velocity, and commercial scale.
                </p>
              </div>

              <div className="lg:col-span-5">
                {subscribed ? (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center space-y-2">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-white text-base">You are subscribed!</h4>
                    <p className="text-xs text-blue-100">Look out for our next monthly intelligence dispatch.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your corporate email..."
                        className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer whitespace-nowrap"
                      >
                        Subscribe
                      </button>
                    </div>
                    <p className="text-[11px] text-blue-200/60">
                      No spam. Unsubscribe anytime with a single click.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

