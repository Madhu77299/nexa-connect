import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Core
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './hooks/useTheme.jsx';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import BlogArticle from './pages/BlogArticle';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import ApplicationForm from './pages/ApplicationForm';
import Contact from './pages/Contact';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogArticle />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:jobId" element={<JobDetail />} />
            <Route path="/careers/apply/:jobId" element={<ApplicationForm />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
