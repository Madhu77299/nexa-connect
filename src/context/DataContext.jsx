import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  companyConfig as defaultCompanyConfig, 
  servicesData as defaultServicesData, 
  opportunitiesData as defaultJobsData, 
  blogsData as defaultBlogsData 
} from '../data/companyData';

const DataContext = createContext();

const STORAGE_KEY = 'pmk_nexa_live_cms_data_v8';

export function detectSocialPlatform(url) {
  if (!url) return { name: 'Website', icon: 'globe' };
  const lower = url.toLowerCase();
  if (lower.includes('linkedin.com')) return { name: 'LinkedIn', icon: 'linkedin' };
  if (lower.includes('instagram.com')) return { name: 'Instagram', icon: 'instagram' };
  if (lower.includes('x.com') || lower.includes('twitter.com')) return { name: 'Twitter / X', icon: 'twitter' };
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return { name: 'YouTube', icon: 'youtube' };
  if (lower.includes('github.com')) return { name: 'GitHub', icon: 'github' };
  if (lower.includes('wa.me') || lower.includes('whatsapp.com')) return { name: 'WhatsApp', icon: 'whatsapp' };
  if (lower.includes('facebook.com')) return { name: 'Facebook', icon: 'facebook' };
  return { name: 'Web Link', icon: 'globe' };
}

// Seed Initial Projects
const initialProjects = [
  {
    id: "proj-1",
    name: "Global Tech Summit 2026",
    category: "Event Operations",
    client: "Apex Enterprise Forum",
    year: "2026",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    metrics: "2,500+ Attendees · 45 Speakers · 100% SLA",
    description: "End-to-end stage logistics, multi-camera broadcasting, sound engineering, and synchronized vendor management for a premier global technology summit.",
    deliverables: ["Venue & Stage Production", "AV & Multi-cam Broadcast", "VIP Guest Protocol", "Real-time Operations Desk"]
  },
  {
    id: "proj-2",
    name: "NexProcure Cloud Platform",
    category: "Technical Projects",
    client: "National Logistics Grid",
    year: "2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    metrics: "3.2x Procurement Speed · 10k+ Suppliers",
    description: "High-performance full-stack vendor discovery and compliance verification interface built on modern microservices and React architecture.",
    deliverables: ["Custom Full-Stack Web App", "Automated Compliance Auditing", "Real-time SLA Analytics", "Cloud Database Integration"]
  },
  {
    id: "proj-3",
    name: "Retail Reach Growth Campaign",
    category: "Digital Marketing Campaigns",
    client: "Kore Retail Networks",
    year: "2026",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    metrics: "+140% Qualified Inquiries · 2.4M Reach",
    description: "Multi-channel content strategy, LinkedIn corporate lead generation, promotional graphic designing, and performance-driven visibility pipelines.",
    deliverables: ["Content Hub & Spokes", "Social Media Authority", "Conversion Rate Optimization", "Video Production Pipelines"]
  },
  {
    id: "proj-4",
    name: "PartnerGrid Vendor Network",
    category: "Network Collaborations",
    client: "Horizon Infra Group",
    year: "2026",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    metrics: "85+ Verified Suppliers · 100% SLA Guarantee",
    description: "Dynamic procurement hub connecting corporate teams with verified local technical, logistical, and staging service providers.",
    deliverables: ["Supplier Due Diligence", "SLA Master Contracts", "Multi-Vendor Operations SPOC", "Procurement Audits"]
  },
  {
    id: "proj-5",
    name: "Strategic Market Entry Blueprint",
    category: "Business Growth Projects",
    client: "Andhra Enterprise Corp",
    year: "2026",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    metrics: "₹4.8 Cr Pipeline · 18 Strategic Alliances",
    description: "Formulated B2B commercial outreach channels and established strategic institutional alliances across coastal Andhra and Bengaluru hubs.",
    deliverables: ["Market Feasibility Study", "B2B Sales Pipeline Setup", "Key Account Management", "Alliance Contracts"]
  }
];

// Seed Initial Applications & Inquiries (Zero use of "CV" - only "Resume")
const initialInquiries = [
  {
    id: "PMK-RESUME-829104",
    name: "Vikram Sundaram",
    email: "vikram.sundaram@gmail.com",
    phone: "+91 98451 23456",
    company: "Applicant (Full-Stack Development - Full-Time)",
    subject: "[RESUME APPLICATION] Full-Stack Web & Cloud Developer - Ref: PMK-RESUME-829104",
    message: "Applicant Applied for: Full-Stack Web & Cloud Developer\nProgram: Full-Time\nTrack: Full-Stack Development\nExperience: 3-5 Years\nPortfolio/GitHub: https://github.com/vikramsundaram\nResume Attachment: Vikram_Sundaram_Resume.pdf\nResume Summary: Full-stack React & Node.js developer with 4 years building scalable cloud microservices, Three.js dashboards, and REST APIs. Ready to join immediately.",
    date: "2026-08-23",
    status: "Shortlisted"
  },
  {
    id: "PMK-RESUME-619283",
    name: "Ananya Sharma",
    email: "ananya.sharma@gmail.com",
    phone: "+91 97012 88419",
    company: "Applicant (Web Development - Internship)",
    subject: "[RESUME APPLICATION] Web Development Specialist Intern - Ref: PMK-RESUME-619283",
    message: "Applicant Applied for: Web Development Specialist Intern\nProgram: Internship Program\nTrack: Web Development\nExperience: 2026 Batch Final Year B.Tech (CSE)\nPortfolio/GitHub: https://github.com/ananya-webdev\nResume Attachment: Ananya_Sharma_WebDev_Resume.pdf\nResume Summary: Passionate frontend developer skilled in React, TailwindCSS, and JavaScript. Built multiple responsive web apps and ready for full-time conversion.",
    date: "2026-08-22",
    status: "Interview Scheduled"
  },
  {
    id: "NXA-892401",
    name: "Ramesh Verma",
    email: "r.verma@techsolutions.com",
    phone: "+91 86880 07523",
    company: "TechSolutions India",
    subject: "Vendor Network Solutions Requirement",
    message: "We need 15+ verified audiovisual, drone survey, and staging suppliers across Hyderabad and Bengaluru for Q3.",
    date: "2026-08-20",
    status: "Under Review"
  }
];

// Seed Initial Social Links with Requested Official LinkedIn URL
const initialSocialProfiles = [
  {
    id: "soc-1",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/pmk-nexa-solutions-pvt-ltd/",
    icon: "linkedin"
  },
  {
    id: "soc-2",
    platform: "Instagram",
    url: "https://instagram.com/pmknexasolutions",
    icon: "instagram"
  },
  {
    id: "soc-3",
    platform: "Twitter / X",
    url: "https://x.com/pmknexa",
    icon: "twitter"
  },
  {
    id: "soc-4",
    platform: "YouTube",
    url: "https://youtube.com/@pmknexasolutions",
    icon: "youtube"
  },
  {
    id: "soc-5",
    platform: "WhatsApp",
    url: "https://wa.me/918688007523",
    icon: "whatsapp"
  }
];

export const DataProvider = ({ children }) => {
  // Master CMS State
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load CMS data from localStorage:", e);
    }

    // Default Seed strictly aligned with PDF specification
    return {
      company: {
        ...defaultCompanyConfig,
        name: "PMK NEXA SOLUTIONS PRIVATE LIMITED",
        shortName: "PMK NEXA SOLUTIONS",
        tagline: "Your Growth. Our Network.",
        supportingMessage: "One Network. Multiple Capabilities. Endless Opportunities.",
        description: "PMK NEXA SOLUTIONS PRIVATE LIMITED connects businesses, professionals, vendors and opportunities through a strong and reliable network.",
        founder: "Prasanna Korikana",
        founderTitle: "Founder & CEO",
        founderBio: "Prasanna Korikana is an entrepreneur and operations strategist committed to building interconnected business ecosystems. Under her leadership, PMK Nexa Solutions provides integrated business development, enterprise vendor networks, high-stakes event operations, modern technical solutions, and digital marketing.",
        incorporationDate: "April 20, 2026",
        registrationLocation: "Rajam, Srikakulam district, Andhra Pradesh, 532127",
        stats: {
          projectsCount: "150+",
          slaAdherence: "99.8%",
          partnersCount: "85+",
          hubsCount: "12+"
        },
        contact: {
          email: "pmknexasolutions@gmail.com",
          phone: "+91 86880 07523",
          whatsapp: "+91 86880 07523",
          address: "Head Office: Vizag - Madhurawada | Branch Office: Krishna Complex (1st Floor), Palakonda Road, Rajam, Srikakulam district, Andhra Pradesh, 532127",
          headOffice: {
            title: "Head Office",
            city: "Vizag (Visakhapatnam)",
            area: "Madhurawada",
            state: "Andhra Pradesh",
            full: "Vizag - Madhurawada, Andhra Pradesh, India"
          },
          branchOffice: {
            title: "Branch Office",
            building: "Krishna Complex (First Floor)",
            street: "Palakonda Road",
            city: "Rajam",
            district: "Srikakulam district",
            state: "Andhra Pradesh",
            pincode: "532127",
            full: "Krishna Complex (First Floor), Palakonda Road, Rajam, Srikakulam district, Andhra Pradesh, 532127"
          }
        }
      },
      mediaSettings: {
        heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-loop-animation-43301-large.mp4",
        heroSecondaryVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-network-lines-and-dots-42999-large.mp4",
        founderImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        heroHeadline: "Your Growth. Our Network.",
        heroTag: "ONE NETWORK. MULTIPLE CAPABILITIES. ENDLESS OPPORTUNITIES."
      },
      socialProfiles: initialSocialProfiles,
      footerSettings: {
        copyrightText: "© 2026 PMK NEXA SOLUTIONS PRIVATE LIMITED. All rights reserved.",
        ecosystemHeader: "// THE CONNECTED ECOSYSTEM",
        tagline: "Your Growth. Our Network."
      },
      projects: initialProjects,
      services: defaultServicesData,
      jobs: defaultJobsData,
      blogs: defaultBlogsData,
      inquiries: initialInquiries,
      recycleBin: [],
      sessions: [
        {
          id: "sess-1",
          user: "pmk empolyee_01",
          role: "Administrator",
          ip: "103.24.12.89 (Visakhapatnam / AP)",
          browser: "Chrome 128 (Windows 11)",
          loginTime: new Date(Date.now() - 3600000).toLocaleString(),
          logoutTime: "Active Now",
          status: "Active"
        }
      ]
    };
  });

  // Auto-sync to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save CMS data:", e);
    }
  }, [data]);

  // Company Info Actions
  const updateCompany = (newCompanyData) => {
    setData(prev => ({
      ...prev,
      company: { ...prev.company, ...newCompanyData }
    }));
  };

  // Media Settings Actions
  const updateMediaSettings = (newMediaData) => {
    setData(prev => ({
      ...prev,
      mediaSettings: { ...(prev.mediaSettings || {}), ...newMediaData }
    }));
  };

  // Social Profiles & Footer Actions
  const addSocialProfile = (url) => {
    const detected = detectSocialPlatform(url);
    const newProfile = {
      id: `soc-${Date.now()}`,
      platform: detected.name,
      url: url,
      icon: detected.icon
    };
    setData(prev => ({
      ...prev,
      socialProfiles: [...(prev.socialProfiles || []), newProfile]
    }));
  };

  const updateSocialProfile = (id, newUrl) => {
    const detected = detectSocialPlatform(newUrl);
    setData(prev => ({
      ...prev,
      socialProfiles: (prev.socialProfiles || []).map(s => 
        s.id === id ? { ...s, url: newUrl, platform: detected.name, icon: detected.icon } : s
      )
    }));
  };

  const deleteSocialProfile = (id) => {
    setData(prev => ({
      ...prev,
      socialProfiles: (prev.socialProfiles || []).filter(s => s.id !== id)
    }));
  };

  const updateFooterSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      footerSettings: { ...(prev.footerSettings || {}), ...newSettings }
    }));
  };

  // Projects Actions (with Recycle Bin backup)
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || `proj-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id, updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedProject } : p)
    }));
  };

  const deleteProject = (id) => {
    const itemToDelete = data.projects.find(p => p.id === id);
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
      recycleBin: itemToDelete 
        ? [{ ...itemToDelete, binId: `bin-${Date.now()}`, itemType: 'Project', deletedAt: new Date().toLocaleString() }, ...(prev.recycleBin || [])]
        : prev.recycleBin || []
    }));
  };

  // Services Actions (with Recycle Bin backup)
  const addService = (service) => {
    const newService = {
      ...service,
      id: service.id || `svc-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const updateService = (id, updatedService) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updatedService } : s)
    }));
  };

  const deleteService = (id) => {
    const itemToDelete = data.services.find(s => s.id === id);
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id),
      recycleBin: itemToDelete 
        ? [{ ...itemToDelete, binId: `bin-${Date.now()}`, itemType: 'Service', deletedAt: new Date().toLocaleString() }, ...(prev.recycleBin || [])]
        : prev.recycleBin || []
    }));
  };

  // Inquiries / Resume Applications Actions (with Recycle Bin backup)
  const logInquiry = (inquiry) => {
    const refCode = inquiry.subject?.includes('Ref:') 
      ? inquiry.subject.split('Ref:')[1]?.trim() || `NXA-${Date.now()}`
      : `NXA-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInquiry = {
      id: refCode,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || '',
      company: inquiry.company || 'Direct Client',
      subject: inquiry.subject || 'Enterprise Requirement',
      message: inquiry.message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    setData(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));

    return refCode;
  };

  const deleteInquiry = (id) => {
    const itemToDelete = data.inquiries.find(i => i.id === id);
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id),
      recycleBin: itemToDelete 
        ? [{ ...itemToDelete, binId: `bin-${Date.now()}`, itemType: itemToDelete.subject?.includes('APPLICATION') ? 'Resume Submission' : 'Inquiry', deletedAt: new Date().toLocaleString() }, ...(prev.recycleBin || [])]
        : prev.recycleBin || []
    }));
  };

  // Recycle Bin Restore & Purge
  const restoreFromRecycleBin = (binId) => {
    const binItem = (data.recycleBin || []).find(b => b.binId === binId);
    if (!binItem) return;

    const { binId: _, deletedAt: __, itemType, ...originalData } = binItem;

    setData(prev => {
      let updatedProjects = prev.projects;
      let updatedServices = prev.services;
      let updatedInquiries = prev.inquiries;

      if (itemType === 'Project') {
        updatedProjects = [originalData, ...prev.projects];
      } else if (itemType === 'Service') {
        updatedServices = [...prev.services, originalData];
      } else {
        updatedInquiries = [originalData, ...prev.inquiries];
      }

      return {
        ...prev,
        projects: updatedProjects,
        services: updatedServices,
        inquiries: updatedInquiries,
        recycleBin: (prev.recycleBin || []).filter(b => b.binId !== binId)
      };
    });
  };

  const permanentlyDeleteFromBin = (binId) => {
    setData(prev => ({
      ...prev,
      recycleBin: (prev.recycleBin || []).filter(b => b.binId !== binId)
    }));
  };

  const emptyRecycleBin = () => {
    setData(prev => ({
      ...prev,
      recycleBin: []
    }));
  };

  // Session Logging
  const recordSessionLogin = (username) => {
    const newSession = {
      id: `sess-${Date.now()}`,
      user: username || "pmk empolyee_01",
      role: "Administrator",
      ip: "103.24.12.89 (Visakhapatnam / AP)",
      browser: `${navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser'} (${navigator.platform || 'Desktop'})`,
      loginTime: new Date().toLocaleString(),
      logoutTime: "Active Now",
      status: "Active"
    };

    setData(prev => ({
      ...prev,
      sessions: [newSession, ...(prev.sessions || []).slice(0, 19)]
    }));
  };

  const recordSessionLogout = () => {
    setData(prev => ({
      ...prev,
      sessions: (prev.sessions || []).map((s, idx) => idx === 0 && s.status === 'Active' ? { ...s, logoutTime: new Date().toLocaleString(), status: 'Logged Out' } : s)
    }));
  };

  const terminateSession = (sessionId) => {
    setData(prev => ({
      ...prev,
      sessions: (prev.sessions || []).map(s => s.id === sessionId ? { ...s, logoutTime: new Date().toLocaleString(), status: 'Terminated by Admin' } : s)
    }));
  };

  // Export / Import
  const exportDataJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `pmk_nexa_cms_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed.company || !parsed.projects) {
        throw new Error("Invalid CMS backup structure.");
      }
      setData(parsed);
      return { success: true, message: "Backup successfully restored!" };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const resetToFactoryDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <DataContext.Provider value={{
      company: data.company || {},
      mediaSettings: data.mediaSettings || {},
      socialProfiles: data.socialProfiles || initialSocialProfiles,
      footerSettings: data.footerSettings || {},
      projects: data.projects || [],
      services: data.services || [],
      jobs: data.jobs || [],
      blogs: data.blogs || [],
      inquiries: data.inquiries || [],
      recycleBin: data.recycleBin || [],
      sessions: data.sessions || [],
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
      logInquiry,
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
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
