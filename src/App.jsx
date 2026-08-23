import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Core
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { DataProvider } from './context/DataContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OurWork from './pages/OurWork';
import Blogs from './pages/Blogs';
import BlogArticle from './pages/BlogArticle';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import ApplicationForm from './pages/ApplicationForm';
import Contact from './pages/Contact';
import Opportunities from './pages/Opportunities';
import Admin from './pages/Admin';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {!isAdmin && <Navbar />}
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/how-we-work" element={<OurWork />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogArticle />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/careers/:jobId" element={<JobDetail />} />
            <Route path="/careers/apply/:jobId" element={<ApplicationForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </DataProvider>
  );
}
