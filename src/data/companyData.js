/**
 * Centralized data and configuration for PMK Nexa Solutions Pvt. Ltd.
 */

export const companyConfig = {
  name: "PMK Nexa Solutions Pvt. Ltd.",
  shortName: "PMK Nexa",
  tagline: "Building Connections. Creating Opportunities. Driving Growth.",
  description: "PMK Nexa Solutions Pvt. Ltd. is a premium technology-driven business services provider and talent ecosystem builder. We connect businesses, optimize networks, orchestrate events, deliver custom technical solutions, and design cutting-edge digital marketing campaigns.",
  contact: {
    email: "info@pmknexasolutions.com",
    phone: "+91 98765 43210",
    address: "Nexa Tower, 4th Floor, Tech Park Road, Bengaluru, KA - 560001",
    officeHours: "Monday - Friday: 9:00 AM - 6:00 PM"
  },
  socials: {
    linkedin: "https://linkedin.com/company/pmk-nexa-solutions",
    twitter: "https://twitter.com/pmknexa",
    instagram: "https://instagram.com/pmknexa",
    facebook: "https://facebook.com/pmknexa",
    // github: "https://github.com/pmknexa"
  }
};

export const socialLinks = {
  instagram: "",
  linkedin: "",
  facebook: "",
  youtube: "",
  twitter: ""
};

export const servicesData = [
  {
    id: "business-development",
    number: "01",
    title: "Business Development",
    shortDescription: "Identify growth opportunities, build strategic partnerships, and cultivate long-term business relations.",
    description: "We help organizations unlock their potential. Our strategic approach identifies and executes key growth initiatives, negotiates rewarding partnerships, and establishes reliable market entry strategies to drive long-term business sustainability.",
    icon: "Briefcase",
    capabilities: [
      "Market Research & Opportunity Assessment",
      "Lead Generation & Client Acquisition Strategy",
      "Strategic Partnerships & Alliance Formation",
      "B2B Sales Optimization & Pipeline Design",
      "Corporate Growth Consultation"
    ]
  },
  {
    id: "vendor-network",
    number: "02",
    title: "Vendor Network Support",
    shortDescription: "Coordinate vendor relations, source strategic suppliers, and optimize supply-chain operations.",
    description: "We bridge the gap between quality providers and demanding organizations. By vetting, onboarding, and coordinating a diverse vendor ecosystem, we ensure smooth procurement, competitive pricing, and reliable service delivery.",
    icon: "Network",
    capabilities: [
      "Vendor Identification & Due Diligence",
      "Contract Negotiation & Service Level Management",
      "Supplier Performance Evaluation & Audits",
      "Multi-vendor Coordination Frameworks",
      "Procurement Optimization"
    ]
  },
  {
    id: "event-operations",
    number: "03",
    title: "Event Operations",
    shortDescription: "Precision planning, end-to-end logistics coordination, and seamless event execution.",
    description: "From corporate conferences and tech summits to talent exhibitions, our team takes charge of on-ground operations, vendor synchronization, timeline management, and logistical coordination for maximum impact.",
    icon: "Calendar",
    capabilities: [
      "Comprehensive Event Planning & Timeline Coordination",
      "On-Ground Logistics & Venue Setup Management",
      "AV, Stage Production, & Tech Execution Support",
      "Vendor Management & SLA Tracking",
      "Post-Event Analytics & Feedback Systems"
    ]
  },
  {
    id: "technical",
    number: "04",
    title: "Technical Services",
    shortDescription: "High-performance digital engineering, web applications, custom platforms, and automation tools.",
    description: "We build responsive, state-of-the-art websites, custom cloud interfaces, database platforms, and digital infrastructure to streamline operations, enhance user reach, and automate repetitive workflows.",
    icon: "Cpu",
    capabilities: [
      "Custom Full-Stack Web Application Development",
      "Cloud Infrastructure & API Integrations",
      "Automated Business Workflow Systems",
      "Technology Consulting & IT Stack Audits",
      "Performance Optimization & Database Architecture"
    ]
  },
  {
    id: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    shortDescription: "Engaging content campaigns, social media management, brand identity systems, and SEO.",
    description: "We craft data-informed content strategies, manage cross-channel social campaigns, design cohesive visual brands, and engineer high-ranking SEO frameworks to ensure maximum digital visibility and lead engagement.",
    icon: "TrendingUp",
    capabilities: [
      "Creative Content Strategy & Production",
      "Social Media Management & Community Moderation",
      "Search Engine Optimization (SEO) & Analytics",
      "Targeted Multi-Channel Digital Campaigns",
      "Brand Identity Systems & Visual Design"
    ]
  }
];

export const jobsData = [
  {
    id: "video-editor",
    title: "Video Editor",
    domain: "Non-Technical",
    type: "Full Time",
    location: "Hybrid (Bengaluru)",
    description: "We are seeking a creative Video Editor to design engaging visual stories across short-form platforms (Reels, TikToks, Shorts) and professional long-form corporate presentations.",
    responsibilities: [
      "Edit high-retention short-form and high-impact long-form video content.",
      "Incorporate professional graphics, clean transitions, kinetic typography, and audio effects.",
      "Work closely with our creative and digital marketing teams to brainstorm fresh angles.",
      "Ensure consistent brand aesthetic across all video publications."
    ],
    skills: ["Video Editing", "Visual Storytelling", "Adobe Premiere Pro / DaVinci Resolve / CapCut", "Motion Graphics (After Effects is a plus)"],
    preferredSkills: ["Audio leveling & color grading", "Basic script-writing", "Social media trend awareness"],
    whatYouWillLearn: "Advanced motion storytelling, data-informed creative workflows, and collaborating directly with corporate campaign leaders."
  },
  {
    id: "photographer",
    title: "Photographer",
    domain: "Non-Technical",
    type: "Part Time",
    location: "On-site (Bengaluru)",
    description: "We are looking for an dynamic photographer who can capture corporate milestones, event operations, workspace culture, and high-quality marketing campaign materials.",
    responsibilities: [
      "Coordinate and conduct high-quality photography shoots for corporate events, team milestones, and marketing assets.",
      "Post-process, color-correct, and format imagery for web and print.",
      "Maintain our visual library archive.",
      "Collaborate with the Graphic Design team to align imagery with visual styles."
    ],
    skills: ["Photography & Composition", "Lighting Setup & Coordination", "Adobe Lightroom & Photoshop", "Camera Hardware Competency"],
    preferredSkills: ["Experience in event photography", "Basic portrait lighting setups", "Quick-turnaround editing schedules"],
    whatYouWillLearn: "Directing professional brand shoots, visual asset management, and event-focused documentation principles."
  },
  {
    id: "videographer",
    title: "Videographer / Video Shooter",
    domain: "Non-Technical",
    type: "Full Time",
    location: "On-site (Bengaluru)",
    description: "Capture the action live. Join us to film high-quality promotional materials, event updates, client testimonials, and behind-the-scenes content.",
    responsibilities: [
      "Set up, test, and capture raw footage for events, promotions, and tutorials.",
      "Orchestrate lighting, sound recorders, and multi-camera angles on location.",
      "Maintain and store audio/video recording equipment.",
      "Review raw footage and organize project folders for the editing pipeline."
    ],
    skills: ["Camera Operation (Mirrorless/DSLR)", "On-set Lighting & Audio Capture", "Pre-production Storyboarding", "Shot Composition & Movement"],
    preferredSkills: ["Gimbal operation", "Drone license/experience", "Multi-camera sync capability"],
    whatYouWillLearn: "Real-time production planning, lighting in variable event environments, and working within an agile marketing pipeline."
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    domain: "Non-Technical",
    type: "Full Time",
    location: "Hybrid (Bengaluru)",
    description: "Design the visual identity of our clients and our internal branding. We want an artist with an eye for typography, layout, and clean vector graphics.",
    responsibilities: [
      "Design digital banners, social creatives, event backdrops, print PDFs, and corporate slide-decks.",
      "Adhere to established design guidelines and brand guidelines.",
      "Collaborate with marketing teams to translate project objectives into clean visual assets.",
      "Export assets efficiently for different device footprints."
    ],
    skills: ["Graphic Design Systems", "Typography & Grid Systems", "Adobe Photoshop & Illustrator", "Figma"],
    preferredSkills: ["Basic Vector Animation (Lottie)", "Brand Identity design portfolio", "UI layout prototyping"],
    whatYouWillLearn: "Designing cohesive design systems, scaling vector assets across web platforms, and standardizing high-end business branding."
  },
  {
    id: "social-media-executive",
    title: "Social Media Executive",
    domain: "Non-Technical",
    type: "Full Time",
    location: "Hybrid (Bengaluru)",
    description: "Manage content calendars, engage with our community, monitor metrics, and build the online presence of PMK Nexa and our partner networks.",
    responsibilities: [
      "Manage posting schedules across LinkedIn, Twitter, Instagram, and Facebook.",
      "Write engaging post copy and respond to community messages.",
      "Analyze weekly engagement analytics and recommend improvements.",
      "Stay updated on platform algorithm changes and visual trend updates."
    ],
    skills: ["Social Media Management", "Content Scheduling (Hootsuite/Buffer)", "Copywriting & Editing", "Basic Design & Video Tooling (Canva)"],
    preferredSkills: ["Familiarity with LinkedIn corporate branding", "Analytics reporting setup", "Short-form video posting strategies"],
    whatYouWillLearn: "Audience analytics modeling, organic brand growth execution, and corporate networking optimization."
  },
  {
    id: "content-writer",
    title: "Content Writer",
    domain: "Non-Technical",
    type: "Full Time",
    location: "Remote",
    description: "We are seeking a versatile writer to draft blog articles, website copy, email newsletters, and thought leadership articles.",
    responsibilities: [
      "Write original, researched, and grammatically precise blog articles, newsletters, and webpage content.",
      "Inject SEO guidelines naturally to improve search positioning.",
      "Proofread content generated by internal teams.",
      "Outline creative content ideas to engage professional demographics."
    ],
    skills: ["Copywriting & Storytelling", "Detailed Topical Research", "SEO & Keyword Integration", "Grammar & Proofreading"],
    preferredSkills: ["Technical blogging experience", "Email campaign writing", "Ghostwriting corporate posts"],
    whatYouWillLearn: "SEO optimization, structured editorial planning, and building content paths for business-to-business readers."
  },
  {
    id: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    domain: "Non-Technical",
    type: "Internship",
    location: "Hybrid (Bengaluru)",
    description: "Kickstart your career in marketing. Work alongside managers to plan, publish, and track modern digital campaigns.",
    responsibilities: [
      "Support campaign coordination, publishing schedules, and asset collection.",
      "Assist in auditing competitor search results and keyword analysis.",
      "Help coordinate community responses on social media platforms.",
      "Document campaign reports and compile performance logs."
    ],
    skills: ["Digital Marketing Principles", "Basic Analytics", "Team Communication", "Self-Organization & Motivation"],
    preferredSkills: ["Familiarity with Google Sheets", "Active personal social media presence", "Fast learner"],
    whatYouWillLearn: "Real-world paid campaign dynamics, Search Engine Marketing (SEM), and collaborative workflow tools."
  },
  {
    id: "event-operations-intern",
    title: "Event Operations Intern",
    domain: "Non-Technical",
    type: "Internship",
    location: "On-site (Bengaluru)",
    description: "Get hands-on experience in high-energy event operations. Support coordination, vendor alignments, and logistical execution.",
    responsibilities: [
      "Assist coordinators with vendor check-ins, registration logistics, and venue walkthroughs.",
      "Organize event assets, badges, merchandise, and banners.",
      "Support on-site operations to address minor troubleshooting tasks during live event hours.",
      "Maintain active communication logs with off-site and on-site suppliers."
    ],
    skills: ["Organization & Scheduling", "Strong Verbal Communication", "Problem-solving under pressure", "Coordination & Reliability"],
    preferredSkills: ["Prior college fest or local event experience", "Fluent in local languages", "Active transportation mode"],
    whatYouWillLearn: "Event lifecycle management, contract vendor negotiation, and large-scale crowd coordination systems."
  },
  {
    id: "business-development-intern",
    title: "Business Development Intern",
    domain: "Non-Technical",
    type: "Internship",
    location: "Hybrid (Bengaluru)",
    description: "Learn how to build a business. Assist with client outreach, lead qualification, industry research, and presentation designs.",
    responsibilities: [
      "Perform industry research to identify potential corporate leads and partners.",
      "Coordinate outbound lead engagement materials (emails, brochures).",
      "Update CRM contacts, client histories, and meeting notes.",
      "Support preparing high-quality slides and proposal responses."
    ],
    skills: ["Market Research", "Professional Correspondence", "Google Workspace/MS Office Competency", "Organization"],
    preferredSkills: ["Sales mindset", "Excellent conversational skills", "Active LinkedIn presence"],
    whatYouWillLearn: "Strategic client outreach, business proposal mechanics, and B2B customer lifecycle tracking."
  }
];

export const blogsData = [
  {
    id: "navigating-vendor-relations",
    slug: "navigating-vendor-relations",
    title: "Navigating Vendor Relations: Building a High-Trust Network",
    category: "Business Growth",
    date: "Aug 15, 2026",
    readingTime: "5 min read",
    author: "Operations Lead, PMK Nexa",
    shortDescription: "How vetting processes and clear communication protocols help businesses scale their procurement networks smoothly.",
    content: `
A business is only as strong as its surrounding network. In the modern business services ecosystem, managing multiple external vendors, service providers, and suppliers is crucial. If your vendor coordination fails, your client commitments are immediately at risk.

At PMK Nexa Solutions, we build and coordinate resilient ecosystems. Here are the core pillars we use to manage a vendor network:

### 1. Rigorous Due Diligence
Don't choose vendors based on price alone. Vetting must include a review of past projects, reference calls, compliance documentation, and scale capacity. Ensure they can grow when your demand grows.

### 2. Transparent SLA Design
Service Level Agreements (SLAs) shouldn't be pages of legal jargon that no one reads. They must outline clear KPIs:
- Turnaround time limits
- Error/failure tolerances
- Immediate notification channels for disruptions
- Penalty/remedy frameworks

### 3. Centralized Communication
Avoid having five different team members contact the same vendor via WhatsApp, Slack, and email. Appoint clear Single Points of Contact (SPOCs) and use systematic ticketing or tracker files.

By building high-trust partnerships, both companies grow together, unlocking competitive rates and priority scheduling.
    `
  },
  {
    id: "digital-marketing-roi",
    slug: "digital-marketing-roi",
    title: "Maximizing Digital Marketing ROI: Content Strategy Over Hype",
    category: "Marketing",
    date: "Aug 02, 2026",
    readingTime: "6 min read",
    author: "Marketing Director, PMK Nexa",
    shortDescription: "Why chasing viral trends without a solid brand foundation is a waste of budget, and how to execute content with measurable outcomes.",
    content: `
In digital marketing, it is easy to get distracted by viral trends, meme formats, and vanity metrics like views or likes. However, views do not pay the bills unless they translate into qualified leads, customer loyalty, or brand authority.

Here is how we structure high-ROI content strategies for modern businesses:

### The Hub-and-Spoke Content Model
Instead of publishing scattered daily thoughts, focus on high-quality structural content:
1. **Hub (Core Asset)**: Create a comprehensive guide, an in-depth whitepaper, or a highly detailed video explaining a core solution.
2. **Spokes (Distribution)**: Break that asset down into 10 smaller parts: infographic snippets, quotes for social posts, newsletter articles, and short-form videos.

### Metric Alignment
Align your channels with real objectives:
- **Awareness**: Impressions and click-through rates.
- **Engagement**: Share rates, saves, and comments.
- **Conversion**: Form submissions, downloads, and demo bookings.

By treating content as an investment rather than an expense, you build an organic search presence that generates value long after the campaign ends.
    `
  },
  {
    id: "modern-event-operations-guide",
    slug: "modern-event-operations-guide",
    title: "Designing Seamless Event Operations: On-Ground Execution Lessons",
    category: "Event Operations",
    date: "Jul 20, 2026",
    readingTime: "8 min read",
    author: "Events Director, PMK Nexa",
    shortDescription: "A behind-the-scenes look at coordinating AV, logistics, staging, and vendor schedules under live pressure.",
    content: `
Planning an event is exciting, but executing it on the ground is where the real challenge lies. Whether it is a product launch, a tech summit, or a large-scale career fair, the difference between success and failure is in the operations schedule.

Here is our playbook for successful event execution:

### 1. The Master Run-of-Show (ROS)
Every coordinator, technician, and vendor must work from a single ROS sheet. This document details:
- Time slots (down to the minute)
- On-stage activity (who is speaking, what mic they are using)
- Audio-Visual states (what slides/video play on screen, lighting setup)
- Behind-the-scenes actions (who manages speaker entry, catering schedules)

### 2. Redundancy Frameworks
If it can go wrong, it eventually will. Plan for these backups:
- **AV**: Copy all slides onto a local backup laptop next to the main deck.
- **Power**: Verify backup generator cutover speeds.
- **Audio**: Keep handheld wireless mics ready in case headset batteries fail.

At PMK Nexa, we approach event operations with rigorous logistics discipline, ensuring smooth transitions and professional presentation.
    `
  }
];
