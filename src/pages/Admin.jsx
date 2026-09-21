import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Plus, Edit2, Trash2, Save, Download, 
  Upload, RefreshCw, Layers, Building2, Briefcase, FileText, Mail, 
  CheckCircle, AlertCircle, Eye, ArrowRight, ExternalLink, Sparkles,
  RotateCcw, Activity, Video, Image, User, Clock, Terminal, Globe,
  Menu, X, ChevronRight, LogOut, Check, Search, Filter, Crop, ZoomIn, 
  RotateCw, Camera, UploadCloud, Share2, Link as LinkIcon
} from 'lucide-react';
import { useData, detectSocialPlatform } from '../context/DataContext';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import PhotoCropper from '../components/PhotoCropper';

export default function Admin() {
  const {
    company,
    mediaSettings,
    socialProfiles,
    footerSettings,
    projects,
    services,
    inquiries,
    recycleBin,
    sessions,
    updateCompany,
    updateMediaSettings,
    addSocialProfile,
    updateSocialProfile,
    deleteSocialProfile,
    updateFooterSettings,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    deleteInquiry,
    restoreFromRecycleBin,
    permanentlyDeleteFromBin,
    emptyRecycleBin,
    recordSessionLogin,
    recordSessionLogout,
    terminateSession,
    exportDataJSON,
    importDataJSON,
    resetToFactoryDefaults
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('pmk_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Management Tab
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Forms State
  const [companyForm, setCompanyForm] = useState({ ...company });
  const [mediaForm, setMediaForm] = useState({
    heroVideoUrl: mediaSettings?.heroVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-loop-animation-43301-large.mp4",
    heroSecondaryVideoUrl: mediaSettings?.heroSecondaryVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-network-lines-and-dots-42999-large.mp4",
    founderImageUrl: mediaSettings?.founderImageUrl || "/pmk.jpeg",
    heroHeadline: mediaSettings?.heroHeadline || "Connecting Business. Creating Growth.",
    heroTag: mediaSettings?.heroTag || "ENTERPRISE CLOUD & OPERATIONS GRID"
  });

  const [footerForm, setFooterForm] = useState({
    copyrightText: footerSettings?.copyrightText || "© 2026 PMK Nexa Solutions Pvt. Ltd. All rights reserved.",
    ecosystemHeader: footerSettings?.ecosystemHeader || "// THE CONNECTED ECOSYSTEM",
    tagline: footerSettings?.tagline || "Connecting Business. Creating Opportunities. Driving Growth."
  });

  // New Social Link Input
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [detectedPlatformPreview, setDetectedPlatformPreview] = useState(null);

  // Image Cropper State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    category: 'Event Operations',
    client: '',
    year: '2026',
    image: '',
    metrics: '',
    description: '',
    deliverables: ''
  });

  // Service Modal State (Edit / Add Service)
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    number: '01',
    title: '',
    shortDescription: '',
    description: '',
    features: ''
  });

  // Import JSON Modal
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  // Synchronize forms when master data loads/updates
  useEffect(() => {
    setCompanyForm({ ...company });
  }, [company]);

  useEffect(() => {
    if (mediaSettings) {
      setMediaForm(prev => ({ ...prev, ...mediaSettings }));
    }
  }, [mediaSettings]);

  useEffect(() => {
    if (footerSettings) {
      setFooterForm(prev => ({ ...prev, ...footerSettings }));
    }
  }, [footerSettings]);

  // Real-time detection when typing new social URL
  useEffect(() => {
    if (newSocialUrl.trim()) {
      setDetectedPlatformPreview(detectSocialPlatform(newSocialUrl));
    } else {
      setDetectedPlatformPreview(null);
    }
  }, [newSocialUrl]);

  // Separate Candidate Applications & Client Inquiries
  const candidateApplications = inquiries.filter(
    inq => inq.subject?.includes('APPLICATION') || inq.subject?.includes('CV') || inq.company?.includes('Applicant')
  );
  const clientInquiries = inquiries.filter(
    inq => !(inq.subject?.includes('APPLICATION') || inq.subject?.includes('CV') || inq.company?.includes('Applicant'))
  );

  // Authentication Login Handler
  const handleLogin = (e) => {
    e?.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = passcode.trim();

    const normalizedUser = cleanUser.replace(/[\s_\-\.]+/g, '');
    const isUserValid = normalizedUser === 'pmk';

    const isPassValid = cleanPass === 'pmk123';

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pmk_admin_auth', 'true');
      setAuthError('');
      recordSessionLogin(username || 'pmk empolyee_01');
    } else {
      setAuthError('Invalid username or password. Please verify your credentials.');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('pmk_admin_auth', 'true');
    recordSessionLogin('pmk empolyee_01 (Quick Unlock)');
  };

  const handleLogout = () => {
    recordSessionLogout();
    setIsAuthenticated(false);
    sessionStorage.removeItem('pmk_admin_auth');
  };

  // Image Upload Handler
  const handleImageFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setRawImageSrc(reader.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Save Company Updates
  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    showToast('Company profile & founder information updated live across website!');
  };

  // Save Media Settings Updates
  const handleSaveMedia = (e) => {
    e.preventDefault();
    updateMediaSettings(mediaForm);
    showToast('Hero video loops and founder media updated live!');
  };

  // Save Footer Settings Updates
  const handleSaveFooter = (e) => {
    e.preventDefault();
    updateFooterSettings(footerForm);
    showToast('Footer text and ecosystem headlines saved live!');
  };

  // Add Social Profile
  const handleAddSocial = (e) => {
    e.preventDefault();
    if (!newSocialUrl.trim()) return;
    addSocialProfile(newSocialUrl.trim());
    showToast(`Added ${detectedPlatformPreview?.name || 'social link'} to footer!`);
    setNewSocialUrl('');
    setDetectedPlatformPreview(null);
  };

  // Project Modal Actions
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        ...proj,
        deliverables: Array.isArray(proj.deliverables) ? proj.deliverables.join('\n') : proj.deliverables || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        name: '',
        category: 'Event Operations',
        client: '',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        metrics: '',
        description: '',
        deliverables: 'Venue & Stage Production\nAV & Sound Synchronization\nOn-Ground SLA Coordination'
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const deliverablesArray = projectForm.deliverables
      ? projectForm.deliverables.split('\n').map(d => d.trim()).filter(Boolean)
      : [];

    const payload = {
      ...projectForm,
      deliverables: deliverablesArray
    };

    if (editingProject) {
      updateProject(editingProject.id, payload);
      showToast(`Project "${projectForm.name}" updated successfully!`);
    } else {
      addProject(payload);
      showToast(`New project "${projectForm.name}" published live!`);
    }

    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id, name) => {
    if (window.confirm(`Move project "${name}" to the Recycle Bin? (You can restore it anytime)`)) {
      deleteProject(id);
      showToast(`Project "${name}" moved to Recycle Bin.`);
    }
  };

  // Services Modal Actions (Add / Edit / Delete)
  const handleOpenServiceModal = (svc = null) => {
    if (svc) {
      setEditingService(svc);
      setServiceForm({
        number: svc.number || '01',
        title: svc.title || '',
        shortDescription: svc.shortDescription || '',
        description: svc.description || '',
        features: Array.isArray(svc.features) ? svc.features.join('\n') : svc.features || ''
      });
    } else {
      setEditingService(null);
      const nextNum = (services.length + 1).toString().padStart(2, '0');
      setServiceForm({
        number: nextNum,
        title: '',
        shortDescription: '',
        description: '',
        features: 'Strategic Consultation\nSLA Guaranteed Execution\nPan-India Operations Support'
      });
    }
    setServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    const featuresArray = serviceForm.features
      ? serviceForm.features.split('\n').map(f => f.trim()).filter(Boolean)
      : [];

    const payload = {
      ...serviceForm,
      features: featuresArray
    };

    if (editingService) {
      updateService(editingService.id, payload);
      showToast(`Service "${serviceForm.title}" updated successfully!`);
    } else {
      addService(payload);
      showToast(`New service "${serviceForm.title}" published live!`);
    }

    setServiceModalOpen(false);
  };

  const handleDeleteService = (id, title) => {
    if (window.confirm(`Move service "${title}" to the Recycle Bin? (You can restore it anytime)`)) {
      deleteService(id);
      showToast(`Service "${title}" moved to Recycle Bin.`);
    }
  };

  // Handle Import JSON
  const handleExecuteImport = () => {
    const res = importDataJSON(importJsonText);
    if (res.success) {
      showToast('Data imported successfully!');
      setImportModalOpen(false);
      setImportJsonText('');
    } else {
      alert(`Import failed: ${res.error}`);
    }
  };

  // 1. Unauthenticated Login Gate
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center bg-[#080E1C] text-slate-100 px-4 py-16 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#1D4ED8]/20 blur-3xl pointer-events-none" />
          
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-2xl bg-[#2563EB]/20 border border-[#3B82F6]/50 text-[#38BDF8] flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Lock className="h-7 w-7" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8]">
                ENTERPRISE CONTROL PLANE
              </span>
              <h1 className="text-2xl font-black font-display tracking-tight text-white">
                PMK Nexa CMS Admin
              </h1>
              <p className="text-xs text-slate-400">
                Direct management for projects, social links, and talent applications.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full rounded-xl bg-[#0A1224] border border-[#1E3A6C] py-3 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-[#0A1224] border border-[#1E3A6C] py-3 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              {authError && (
                <div className="flex items-start gap-1.5 text-xs text-rose-400 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#0369A1] text-white py-3.5 text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Unlock className="h-4 w-4" />
                <span>Authenticate &amp; Access</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#1E3A6C] text-center">
              <button
                onClick={handleQuickUnlock}
                className="text-xs font-bold text-[#38BDF8] hover:underline cursor-pointer"
              >
                ✨ Quick 1-Click Demo Unlock
              </button>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  // Navigation Items for Left-Side Admin Sidebar
  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Activity },
    { id: 'applications', label: 'Candidate Resumes & Careers', icon: Briefcase, count: candidateApplications.length, badgeColor: 'bg-[#2563EB]' },
    { id: 'company', label: 'Company & Founder Profile', icon: Building2 },
    { id: 'media', label: 'Hero Video & Media Settings', icon: Video },
    { id: 'footer', label: 'Footer & Social Hubs', icon: Share2, count: socialProfiles.length, isHighlight: true },
    { id: 'projects', label: 'Projects Portfolio', icon: Layers, count: projects.length },
    { id: 'services', label: 'Services Manager (5 Capabilities)', icon: FileText, count: services.length },
    { id: 'inquiries', label: 'Client Requirements & Leads', icon: Mail, count: clientInquiries.length },
    { id: 'recycle', label: 'Recycle Bin & Restore', icon: RotateCcw, count: recycleBin.length, badgeColor: 'bg-amber-500' },
    { id: 'sessions', label: 'Session Security & Audit Logs', icon: Clock, count: sessions.length }
  ];

  // 2. Authenticated Admin Dashboard Layout with Cobalt Slate Palette
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080E1C] text-slate-100 flex flex-col lg:flex-row antialiased overflow-x-hidden">
        
        {/* Hidden File Input for Image Upload / Gallery Pick */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageFileSelect}
        />

        {/* Mobile Top App Bar */}
        <div className="lg:hidden bg-[#101D38] border-b border-[#1E3A6C] p-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-black text-xs">
              PMK
            </div>
            <div>
              <span className="text-xs font-bold block text-white">PMK NEXA CMS</span>
              <span className="text-[10px] text-emerald-400 font-mono">LIVE CONTROL</span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-[#182C5B] text-white cursor-pointer"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* LEFT-SIDEBAR NAVIGATION PANEL */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0C152B] border-r border-[#1E3A6C]/80 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}>
          
          {/* Top Brand Block */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-[#1E3A6C]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center font-black shadow-lg">
                  PMK
                </div>
                <div>
                  <h2 className="text-sm font-black tracking-tight text-white font-display">
                    PMK NEXA CMS
                  </h2>
                  <span className="text-[10px] text-[#38BDF8] font-mono block">
                    ENTERPRISE CONTROL
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar Nav Links */}
            <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
                CONTROL NAVIGATION
              </span>
              
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30'
                        : 'text-slate-300 hover:bg-[#132347] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#38BDF8]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.isHighlight && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          HUBS
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#182C5B] text-slate-300'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Controls & Website Link */}
          <div className="pt-4 border-t border-[#1E3A6C] space-y-3">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#132347] hover:bg-[#182C5B] text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>View Live Website</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout Admin</span>
            </button>
          </div>

        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto overflow-x-hidden">
          
          {/* Top Admin Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8] mb-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE LIVE SESSION // PMK NEXA ENTERPRISE</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-display text-white">
                {sidebarItems.find(i => i.id === activeTab)?.label || "Control Panel"}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={exportDataJSON}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
                title="Download JSON backup"
              >
                <Download className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>Export Backup JSON</span>
              </button>

              <button
                onClick={() => setImportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5 text-emerald-400" />
                <span>Import JSON</span>
              </button>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500 text-white shadow-xl animate-fade-in font-bold text-xs">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW & KPIS */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-md space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8]">
                    CANDIDATE APPLICATIONS
                  </span>
                  <div className="text-3xl font-black font-display text-white">{candidateApplications.length}</div>
                  <p className="text-xs text-slate-400">Received via Opportunities portal</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-md space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]">
                    ACTIVE PROJECTS
                  </span>
                  <div className="text-3xl font-black font-display text-white">{projects.length}</div>
                  <p className="text-xs text-slate-400">Live in case studies portfolio</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-md space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                    SOCIAL CONNECT HUBS
                  </span>
                  <div className="text-3xl font-black font-display text-white">{socialProfiles.length}</div>
                  <p className="text-xs text-slate-400">Official LinkedIn &amp; media hubs</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-md space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                    RECYCLE BIN ITEMS
                  </span>
                  <div className="text-3xl font-black font-display text-white">{recycleBin.length}</div>
                  <p className="text-xs text-slate-400">Deleted items ready for restore</p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-5">
                <h3 className="text-lg font-black font-display text-white">
                  Quick Management Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Completed Project</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('footer')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#182C5B] hover:bg-[#203A75] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Share2 className="h-4 w-4 text-[#38BDF8]" />
                    <span>Manage Footer &amp; Social Links</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Upload &amp; Crop Founder Photo</span>
                  </button>

                  <button
                    onClick={resetToFactoryDefaults}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Factory Reset</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: FOOTER & DYNAMIC SOCIAL PROFILES (WITH AUTO-DETECTION) */}
          {/* ========================================================================= */}
          {activeTab === 'footer' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#38BDF8] text-xs font-black uppercase tracking-wider mb-2">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>FOOTER &amp; SOCIAL HUBS MANAGEMENT</span>
                </div>
                <h3 className="text-xl font-black font-display text-white">
                  Social Profiles &amp; Footer Configuration
                </h3>
                <p className="text-xs text-slate-400">
                  Add or edit official links. Platform icons (LinkedIn, Instagram, Twitter/X, YouTube, WhatsApp, GitHub) are detected automatically!
                </p>
              </div>

              {/* 1. Add New Social Link Form */}
              <div className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8] block">
                  // ADD NEW SOCIAL PROFILE / LINK
                </span>

                <form onSubmit={handleAddSocial} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="url"
                        required
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        placeholder="Paste any link e.g. https://www.linkedin.com/company/pmk-nexa-solutions-pvt-ltd/ or https://instagram.com/..."
                        className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add to Footer</span>
                    </button>
                  </div>

                  {/* Real-time Platform Auto-Detection Badge */}
                  {detectedPlatformPreview && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#182C5B] border border-[#2563EB]/40 text-xs text-slate-200">
                      <span className="text-[10px] text-[#38BDF8] font-bold">Auto-Detected Platform:</span>
                      <strong className="text-white font-bold">{detectedPlatformPreview.name}</strong>
                      <span className="text-[10px] font-mono text-emerald-400">(Icon: {detectedPlatformPreview.icon})</span>
                    </div>
                  )}
                </form>
              </div>

              {/* 2. Active Social Hubs Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  // CURRENT FOOTER SOCIAL HUBS ({socialProfiles.length})
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialProfiles.map((soc) => (
                    <div
                      key={soc.id}
                      className="p-4 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#2563EB]/20 text-[#38BDF8] font-mono">
                            {soc.platform}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">Icon: {soc.icon}</span>
                        </div>
                        <a 
                          href={soc.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-slate-300 hover:text-white truncate block hover:underline"
                        >
                          {soc.url}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-slate-300 hover:text-white text-xs"
                          title="Open Link"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            deleteSocialProfile(soc.id);
                            showToast(`Removed ${soc.platform} link.`);
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Footer Text & Copyright Settings */}
              <form onSubmit={handleSaveFooter} className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8] block">
                  // FOOTER TEXT &amp; COPYRIGHT CONFIGURATION
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Footer Ecosystem Headline
                    </label>
                    <input
                      type="text"
                      value={footerForm.ecosystemHeader}
                      onChange={(e) => setFooterForm({ ...footerForm, ecosystemHeader: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Copyright Notice Text
                    </label>
                    <input
                      type="text"
                      value={footerForm.copyrightText}
                      onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Footer Tagline
                  </label>
                  <input
                    type="text"
                    value={footerForm.tagline}
                    onChange={(e) => setFooterForm({ ...footerForm, tagline: e.target.value })}
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: CANDIDATE RESUMES & OPPORTUNITIES */}
          {/* ========================================================================= */}
          {activeTab === 'applications' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1E3A6C]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 text-[#38BDF8] text-xs font-black uppercase tracking-wider mb-2">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>CANDIDATE RESUMES &amp; TALENT INBOX</span>
                  </div>
                  <h3 className="text-xl font-black font-display text-white">
                    Talent Submissions &amp; Candidate Resumes ({candidateApplications.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Candidate Resumes and profiles submitted from the Opportunities &amp; Careers portal.
                  </p>
                </div>
              </div>

              {candidateApplications.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-[#1E3A6C] space-y-3">
                  <p>No candidate applications currently pending.</p>
                  <Link
                    to="/opportunities"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white font-bold"
                  >
                    <span>Submit a Test Resume on Opportunities Page →</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidateApplications.map(app => (
                    <div
                      key={app.id}
                      className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] hover:border-[#38BDF8]/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#38BDF8]">
                            {app.id}
                          </span>
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white flex items-center gap-1 font-mono">
                            <Sparkles className="h-3 w-3" />
                            CANDIDATE RESUME APPLICATION
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {app.date}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white">
                          {app.name} · <span className="text-[#38BDF8]">{app.company}</span>
                        </h4>

                        <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                          <span>📧 {app.email}</span>
                          {app.phone && <span>📱 {app.phone}</span>}
                          <span>🎯 {app.subject}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-[#080E1C] border border-[#1E3A6C] text-xs text-slate-200 whitespace-pre-line mt-2 font-sans leading-relaxed">
                          {app.message}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`mailto:${app.email}?subject=Regarding Your Resume Application at PMK Nexa Solutions`}
                          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email Candidate</span>
                        </a>

                        <button
                          onClick={() => {
                            deleteInquiry(app.id);
                            showToast('Resume application moved to Recycle Bin.');
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MEDIA & FOUNDER IMAGE (WITH GALLERY UPLOAD & CROPPER) */}
          {/* ========================================================================= */}
          {activeTab === 'media' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-8">
              <div>
                <h3 className="text-xl font-black font-display text-white">
                  Hero Video Loops &amp; Founder Profile Media
                </h3>
                <p className="text-xs text-slate-400">
                  Update background video reels, choose photo from device/gallery with interactive cropping.
                </p>
              </div>

              <form onSubmit={handleSaveMedia} className="space-y-6">
                
                {/* 1. Founder & CEO Image Manager with Interactive Upload & Crop */}
                <div className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8] block">
                        // FOUNDER &amp; CEO PROFILE PHOTO
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {company.founder || "Prasanna Korikana"} — Executive Portrait
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0284C7] hover:from-[#1D4ED8] hover:to-[#0369A1] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                      <UploadCloud className="h-4 w-4" />
                      <span>Choose Image from Gallery</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Live Preview Avatar */}
                    <div className="md:col-span-4 flex flex-col items-center sm:items-start space-y-2">
                      <div className="h-36 w-36 rounded-2xl overflow-hidden border-2 border-[#2563EB]/60 shadow-xl bg-[#080E1C] p-1">
                        <img 
                          src={mediaForm.founderImageUrl} 
                          alt="Founder" 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Live Website Preview</span>
                    </div>

                    {/* Image URL fallback & direct crop action */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Direct Image URL (or upload from gallery above)
                        </label>
                        <input
                          type="text"
                          value={mediaForm.founderImageUrl}
                          onChange={(e) => setMediaForm({ ...mediaForm, founderImageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Crop className="h-3.5 w-3.5 text-[#38BDF8]" />
                          <span>Pick &amp; Crop New Image</span>
                        </button>
                        <p className="text-[11px] text-slate-400">
                          Supports PNG, JPG, WebP photos up to 15MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Hero Background Video Loops */}
                <div className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] space-y-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#38BDF8] block">
                    // HERO VIDEO REEL CONFIGURATION
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">
                        Main Hero Background Video URL (MP4 / WebM)
                      </label>
                      <input
                        type="url"
                        value={mediaForm.heroVideoUrl}
                        onChange={(e) => setMediaForm({ ...mediaForm, heroVideoUrl: e.target.value })}
                        placeholder="https://...video.mp4"
                        className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                      />
                      <div className="mt-2.5 w-full aspect-video rounded-xl overflow-hidden border border-[#1E3A6C] bg-black">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                          <source src={mediaForm.heroVideoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">
                        Secondary Slide Video URL (MP4 / WebM)
                      </label>
                      <input
                        type="url"
                        value={mediaForm.heroSecondaryVideoUrl}
                        onChange={(e) => setMediaForm({ ...mediaForm, heroSecondaryVideoUrl: e.target.value })}
                        placeholder="https://...video2.mp4"
                        className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                      />
                      <div className="mt-2.5 w-full aspect-video rounded-xl overflow-hidden border border-[#1E3A6C] bg-black">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                          <source src={mediaForm.heroSecondaryVideoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0284C7] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Media Settings Live</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: COMPANY & FOUNDER PROFILE */}
          {/* ========================================================================= */}
          {activeTab === 'company' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-black font-display text-white">
                    Corporate Governance &amp; Founder Profile
                  </h3>
                  <p className="text-xs text-slate-400">
                    Updates to legal records, founder details, and official coordinates propagate live across the website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-[#38BDF8]" />
                  <span>Change Founder Photo</span>
                </button>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Legal Company Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Founder &amp; CEO Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.founder}
                      onChange={(e) => setCompanyForm({ ...companyForm, founder: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Incorporation Date
                    </label>
                    <input
                      type="text"
                      value={companyForm.incorporationDate}
                      onChange={(e) => setCompanyForm({ ...companyForm, incorporationDate: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Registered Jurisdiction
                    </label>
                    <input
                      type="text"
                      value={companyForm.registrationLocation}
                      onChange={(e) => setCompanyForm({ ...companyForm, registrationLocation: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Corporate Email Desk
                    </label>
                    <input
                      type="email"
                      value={companyForm.contact?.email || ''}
                      onChange={(e) => setCompanyForm({ 
                        ...companyForm, 
                        contact: { ...companyForm.contact, email: e.target.value } 
                      })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Direct Phone
                    </label>
                    <input
                      type="text"
                      value={companyForm.contact?.phone || ''}
                      onChange={(e) => setCompanyForm({ 
                        ...companyForm, 
                        contact: { ...companyForm.contact, phone: e.target.value } 
                      })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Founder Executive Statement
                  </label>
                  <textarea
                    rows="3"
                    value={companyForm.founderBio || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, founderBio: e.target.value })}
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-3 px-4 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Corporate Data Live</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PROJECTS PORTFOLIO */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1E3A6C]">
                <div>
                  <h3 className="text-xl font-black font-display text-white">
                    Our Work &amp; Case Studies Portfolio ({projects.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live showcase cards displayed on the homepage and <span className="font-mono text-[#38BDF8]">/our-work</span> portal.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    to="/our-work"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#182C5B] hover:bg-[#203A75] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>View /our-work</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#38BDF8]" />
                  </Link>

                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="h-32 w-full rounded-xl overflow-hidden bg-[#080E1C]">
                        <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#38BDF8] tracking-widest block">
                        {proj.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#1E3A6C] flex items-center justify-between">
                      <button
                        onClick={() => handleOpenProjectModal(proj)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#38BDF8] hover:underline cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.name)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Move to Bin</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SERVICES */}
          {/* ========================================================================= */}
          {activeTab === 'services' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1E3A6C]">
                <div>
                  <h3 className="text-xl font-black font-display text-white">
                    Enterprise Capabilities &amp; Services ({services.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage service offerings, numbers, descriptions, and capabilities.
                  </p>
                </div>

                <button
                  onClick={() => handleOpenServiceModal()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((svc) => (
                  <div 
                    key={svc.id} 
                    className="p-6 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/30 font-mono">
                          SERVICE {svc.number}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white">
                        {svc.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {svc.shortDescription || svc.description}
                      </p>

                      {svc.features && svc.features.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {(Array.isArray(svc.features) ? svc.features : []).slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#182C5B] text-slate-300 font-mono">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#1E3A6C] flex items-center justify-between">
                      <button
                        onClick={() => handleOpenServiceModal(svc)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2563EB]/20 hover:bg-[#2563EB]/30 text-[#38BDF8] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>Edit Service</span>
                      </button>

                      <button
                        onClick={() => handleDeleteService(svc.id, svc.title)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Move to Bin</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: CLIENT INQUIRIES */}
          {/* ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black font-display text-white">
                  Client Inquiries Inbox ({clientInquiries.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Direct commercial inquiries from the Contact page.
                </p>
              </div>

              {clientInquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-[#1E3A6C]">
                  No client contact inquiries logged yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {clientInquiries.map(inq => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#38BDF8]">
                            {inq.id}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            {inq.status || 'Received'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {inq.date}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white">
                          {inq.name} · <span className="text-slate-400">{inq.company}</span>
                        </h4>

                        <p className="text-xs text-slate-400">
                          {inq.email} {inq.phone ? `· Phone: ${inq.phone}` : ''} · Subject: <strong>{inq.subject}</strong>
                        </p>

                        <p className="text-xs text-slate-300 italic pt-1">
                          "{inq.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`mailto:${inq.email}?subject=Regarding Your Inquiry with PMK Nexa Solutions`}
                          className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Reply</span>
                        </a>

                        <button
                          onClick={() => {
                            deleteInquiry(inq.id);
                            showToast('Inquiry moved to Recycle Bin.');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: RECYCLE BIN & AUDIT RESTORE */}
          {/* ========================================================================= */}
          {activeTab === 'recycle' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1E3A6C]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>RESTORE &amp; AUDIT RECOVERY BIN</span>
                  </div>
                  <h3 className="text-xl font-black font-display text-white">
                    Recycle Bin ({recycleBin.length} Items)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Deleted projects, services, applications, and inquiries are preserved here. You can restore them instantly to the live site.
                  </p>
                </div>

                {recycleBin.length > 0 && (
                  <button
                    onClick={emptyRecycleBin}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Empty Recycle Bin</span>
                  </button>
                )}
              </div>

              {recycleBin.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs rounded-2xl border border-dashed border-[#1E3A6C]">
                  The Recycle Bin is empty. Any deleted records will appear here for safe recovery.
                </div>
              ) : (
                <div className="space-y-4">
                  {recycleBin.map((item) => (
                    <div
                      key={item.binId}
                      className="p-5 rounded-2xl bg-[#0C152B] border border-[#1E3A6C] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            {item.itemType || 'Record'}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            Deleted: {item.deletedAt}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {item.name || item.title || item.subject}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {item.description || item.message || item.company || 'Archived record'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            restoreFromRecycleBin(item.binId);
                            showToast(`Restored "${item.name || item.title || 'item'}" back to live site!`);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Restore to Live</span>
                        </button>

                        <button
                          onClick={() => {
                            permanentlyDeleteFromBin(item.binId);
                            showToast('Permanently deleted.');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Delete Permanently
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: SESSION TRACKING & AUDIT LOGS */}
          {/* ========================================================================= */}
          {activeTab === 'sessions' && (
            <div className="p-8 rounded-3xl bg-[#101D38] border border-[#1E3A6C] shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black font-display text-white">
                  Administrator Session Tracking &amp; Security Audits
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time audit log of admin login sessions, IP locations, and security timestamps.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1E3A6C] text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">User Account</th>
                      <th className="py-3 px-4">IP / Jurisdiction</th>
                      <th className="py-3 px-4">Browser &amp; OS</th>
                      <th className="py-3 px-4">Login Time</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A6C]/60 font-mono">
                    {sessions.map((sess) => (
                      <tr key={sess.id} className="hover:bg-[#132347] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white font-sans">
                          {sess.user}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {sess.ip}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-sans text-[11px]">
                          {sess.browser}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {sess.loginTime}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sess.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#182C5B] text-slate-400'
                          }`}>
                            {sess.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {sess.status === 'Active' && (
                            <button
                              onClick={() => {
                                terminateSession(sess.id);
                                showToast('Session terminated.');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[11px] font-sans font-bold cursor-pointer"
                            >
                              Terminate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

        {/* ========================================================================= */}
        {/* INTERACTIVE FULL CORNER & EDGE DRAG PHOTO CROPPER MODAL */}
        {/* ========================================================================= */}
        {cropModalOpen && rawImageSrc && (
          <PhotoCropper
            imageSrc={rawImageSrc}
            onCropComplete={(croppedDataUrl) => {
              setMediaForm(prev => ({ ...prev, founderImageUrl: croppedDataUrl }));
              updateMediaSettings({ founderImageUrl: croppedDataUrl });
              updateCompany({ founderImage: croppedDataUrl });
              showToast('Photo cropped and updated live across the website!');
              setCropModalOpen(false);
              setRawImageSrc(null);
            }}
            onCancel={() => {
              setCropModalOpen(false);
              setRawImageSrc(null);
            }}
          />
        )}

        {/* Project Edit / Add Modal */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div 
              onClick={() => setProjectModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
            />

            <div className="relative w-full max-w-2xl bg-[#101D38] border border-[#1E3A6C] rounded-3xl shadow-2xl z-10 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black font-display text-white">
                  {editingProject ? 'Edit Project Details' : 'Add New Completed Project'}
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in deliverables and case study metrics.
                </p>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Category *
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    >
                      <option>Business Growth Projects</option>
                      <option>Network Collaborations</option>
                      <option>Event Operations</option>
                      <option>Technical Projects</option>
                      <option>Digital Marketing Campaigns</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Metrics Badge
                    </label>
                    <input
                      type="text"
                      value={projectForm.metrics}
                      onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                      placeholder="e.g. 2,500+ Attendees · 99.8% SLA"
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Project Description
                  </label>
                  <textarea
                    rows="3"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Deliverables (1 per line)
                  </label>
                  <textarea
                    rows="3"
                    value={projectForm.deliverables}
                    onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                    placeholder="Stage Management&#10;AV & Sound Execution&#10;Vendor Due Diligence"
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#1E3A6C] text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Save &amp; Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Service Edit / Add Modal */}
        {serviceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div 
              onClick={() => setServiceModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
            />

            <div className="relative w-full max-w-xl bg-[#101D38] border border-[#1E3A6C] rounded-3xl shadow-2xl z-10 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black font-display text-white">
                  {editingService ? 'Edit Service Details' : 'Add New Enterprise Capability'}
                </h3>
                <p className="text-xs text-slate-400">
                  Update title, number, summary, and capability features.
                </p>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Service No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceForm.number}
                      onChange={(e) => setServiceForm({ ...serviceForm, number: e.target.value })}
                      placeholder="01"
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="e.g. Technical Services"
                      className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Short Summary (Homepage &amp; Grid)
                  </label>
                  <input
                    type="text"
                    value={serviceForm.shortDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                    placeholder="High-performance digital engineering and custom software..."
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows="3"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Features / Deliverables (1 per line)
                  </label>
                  <textarea
                    rows="3"
                    value={serviceForm.features}
                    onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                    placeholder="Cloud Microservices&#10;24/7 SLA Guarantee&#10;Enterprise Vendor Grid"
                    className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#1E3A6C] text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Save Service Live
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Import JSON Modal */}
        {importModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div 
              onClick={() => setImportModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
            />

            <div className="relative w-full max-w-xl bg-[#101D38] border border-[#1E3A6C] rounded-3xl shadow-2xl z-10 p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-black font-display text-white">
                Import CMS Backup JSON
              </h3>
              <p className="text-xs text-slate-400">
                Paste your JSON backup payload to restore company, projects, and media configurations.
              </p>

              <textarea
                rows="8"
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste {"company": {...}, "projects": [...]} here...'
                className="w-full rounded-xl bg-[#080E1C] border border-[#1E3A6C] p-4 text-xs font-mono text-white focus:outline-none focus:border-[#38BDF8]"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#1E3A6C] text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteImport}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                >
                  Execute Restore
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
