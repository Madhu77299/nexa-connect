import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Upload, X, CheckCircle, 
  AlertCircle, FileText, Globe 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { jobsData } from '../data/companyData';
import { submitJobApplication } from '../services/api';

export default function ApplicationForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find((j) => j.id === jobId);

  if (!job) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-32 text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Role Not Found</h1>
          <p className="text-neutral-500">The position you want to apply for is no longer active.</p>
          <Link to="/careers" className="text-blue-600 dark:text-cyan-400 hover:underline">
            Back to Careers
          </Link>
        </div>
      </PageTransition>
    );
  }

  // Multi-step state management
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form Fields State
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const [roleDetails, setRoleDetails] = useState({
    employmentType: job.type,
    domain: job.domain,
    experienceLevel: 'Entry Level',
    availability: 'Immediate'
  });

  const [skillsList, setSkillsList] = useState({
    primary: '',
    secondary: '',
    tools: '',
    relevantYears: '0-1 Years'
  });

  const [portfolioLinks, setPortfolioLinks] = useState({
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    otherUrl: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [uploaderError, setUploaderError] = useState(null);

  const [aboutYou, setAboutYou] = useState({
    introduction: '',
    whyJoin: '',
    additionalInfo: ''
  });

  // Action States
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Resume drag-drop handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setUploaderError(null);
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

    if (!validTypes.includes(file.type)) {
      setUploaderError('Invalid file type: Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    if (file.size > maxSizeBytes) {
      setUploaderError('File too large: Resume size must be under 5MB.');
      return;
    }

    setResumeFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setUploaderError(null);
  };

  // Step Validation checks before moving forward
  const validateAndNext = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!personalDetails.name || !personalDetails.email || !personalDetails.phone || !personalDetails.location) {
        setErrorMsg('Please fill in all personal details.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(personalDetails.email)) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    }

    if (step === 3) {
      if (!skillsList.primary || !skillsList.tools) {
        setErrorMsg('Please list your primary skills and tools/software.');
        return;
      }
    }

    if (step === 5) {
      if (!resumeFile) {
        setErrorMsg('Please upload your resume file (PDF or Word format).');
        return;
      }
    }

    if (step === 6) {
      if (!aboutYou.whyJoin) {
        setErrorMsg('Please tell us why you want to join PMK Nexa.');
        return;
      }
    }

    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setErrorMsg(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Submit flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const consolidatedData = {
      jobId: job.id,
      jobTitle: job.title,
      ...personalDetails,
      ...roleDetails,
      ...skillsList,
      ...portfolioLinks,
      resumeFile,
      ...aboutYou
    };

    try {
      const res = await submitJobApplication(consolidatedData);
      setSuccessResponse(res);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Success view block
  if (successResponse) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400">
            <CheckCircle className="h-10 w-10 animate-bounce" />
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Application Submitted</h1>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Thank you for your interest in joining the team at PMK Nexa Solutions. Our recruitment managers will review your experience and coordinates soon.
          </p>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg max-w-xs mx-auto border border-neutral-200 dark:border-neutral-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Reference Code</span>
            <span className="font-mono text-base font-bold text-neutral-900 dark:text-white mt-1 block">
              {successResponse.applicationId}
            </span>
          </div>
          <div className="pt-4">
            <Link
              to="/careers"
              className="inline-flex rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-cyan-500 dark:text-neutral-950 dark:hover:bg-cyan-400 text-sm"
            >
              Return to Careers
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 transition-colors duration-300">
        
        {/* Title */}
        <div className="space-y-4 mb-8">
          <Link to={`/careers/${job.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 uppercase tracking-wider">
            <ArrowLeft className="h-3 w-3" />
            Back to details
          </Link>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            Apply: {job.title}
          </h1>
          
          {/* Progress Indicators */}
          <div className="relative pt-2">
            <div className="flex justify-between text-xs text-neutral-500 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span className="font-bold">
                {step === 1 && 'Personal Details'}
                {step === 2 && 'Role Specifics'}
                {step === 3 && 'Skills & Tools'}
                {step === 4 && 'Links & Portfolio'}
                {step === 5 && 'Resume Attachment'}
                {step === 6 && 'About You'}
                {step === 7 && 'Review & Complete'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 dark:bg-cyan-400 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-neutral-50 dark:bg-neutral-900/40 p-6 rounded-xl border border-neutral-200/60 dark:border-neutral-900 min-h-[350px] flex flex-col justify-between">
          <div>
            {errorMsg && (
              <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-4 rounded-lg text-sm border border-red-200 dark:border-red-950 mb-6">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Personal details */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={personalDetails.name}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Current Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, KA"
                      value={personalDetails.location}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, location: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Role specifics */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Role Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Selected Role</label>
                    <input
                      type="text"
                      readOnly
                      value={job.title}
                      className="w-full rounded-lg bg-neutral-200/50 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-400 px-4 py-2 text-sm focus:outline-none cursor-default"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Domain Area</label>
                    <input
                      type="text"
                      readOnly
                      value={roleDetails.domain}
                      className="w-full rounded-lg bg-neutral-200/50 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-400 px-4 py-2 text-sm focus:outline-none cursor-default"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Experience level</label>
                    <select
                      value={roleDetails.experienceLevel}
                      onChange={(e) => setRoleDetails({ ...roleDetails, experienceLevel: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    >
                      <option value="Internship / Student">Internship / Student</option>
                      <option value="Entry Level">Entry Level (0-2 years)</option>
                      <option value="Mid Level">Mid Level (2-5 years)</option>
                      <option value="Senior Level">Senior Level (5+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Availability Mode</label>
                    <select
                      value={roleDetails.availability}
                      onChange={(e) => setRoleDetails({ ...roleDetails, availability: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    >
                      <option value="Immediate">Immediate Availability</option>
                      <option value="15 Days">15 Days Notice Period</option>
                      <option value="30 Days">30 Days Notice Period</option>
                      <option value="Negotiable">Negotiable / Contract</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Skills list */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Skills & Expertise
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Primary Skills (Comma-separated) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adobe Premiere, Composition, Copywriting"
                      value={skillsList.primary}
                      onChange={(e) => setSkillsList({ ...skillsList, primary: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Tools & Software *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Figma, Lightroom, DaVinci, Git"
                      value={skillsList.tools}
                      onChange={(e) => setSkillsList({ ...skillsList, tools: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Secondary Skills / Minor Domains</label>
                    <input
                      type="text"
                      placeholder="e.g. Sound design, basic branding"
                      value={skillsList.secondary}
                      onChange={(e) => setSkillsList({ ...skillsList, secondary: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Portfolio */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Portfolio & Profile Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Portfolio / Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4.5 w-4.5 text-neutral-400" />
                      <input
                        type="url"
                        placeholder="https://myportfolio.com"
                        value={portfolioLinks.portfolioUrl}
                        onChange={(e) => setPortfolioLinks({ ...portfolioLinks, portfolioUrl: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4.5 w-4.5 text-neutral-400" />
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={portfolioLinks.linkedinUrl}
                        onChange={(e) => setPortfolioLinks({ ...portfolioLinks, linkedinUrl: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      GitHub URL {job.domain !== 'Technical' && '(Optional)'}
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4.5 w-4.5 text-neutral-400" />
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={portfolioLinks.githubUrl}
                        onChange={(e) => setPortfolioLinks({ ...portfolioLinks, githubUrl: e.target.value })}
                        className="w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Other Relevant Link</label>
                    <input
                      type="url"
                      placeholder="e.g. Behance, Vimeo link"
                      value={portfolioLinks.otherUrl}
                      onChange={(e) => setPortfolioLinks({ ...portfolioLinks, otherUrl: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Resume uploader */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Attach Resume File
                </h3>
                
                {uploaderError && (
                  <div className="flex items-start gap-1.5 text-xs text-red-600 font-semibold mb-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{uploaderError}</span>
                  </div>
                )}

                {!resumeFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-cyan-400 rounded-xl p-10 text-center cursor-pointer transition-colors"
                  >
                    <input
                      type="file"
                      id="resume-file-input"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="resume-file-input" className="cursor-pointer space-y-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-neutral-900 dark:text-cyan-400">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                          Click to select a file or drag and drop
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          Supported formats: PDF, DOC, DOCX. Max file size: 5MB.
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 rounded-lg">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate max-w-xs md:max-w-sm">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-1 text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
                      aria-label="Remove Resume"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: About candidate */}
            {step === 6 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Tell Us About Yourself
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Short Introduction</label>
                    <textarea
                      rows="2"
                      placeholder="Briefly summarize your career background..."
                      value={aboutYou.introduction}
                      onChange={(e) => setAboutYou({ ...aboutYou, introduction: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">Why do you want to join PMK Nexa Solutions? *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="What draws you to the Nexa network and this specific domain role..."
                      value={aboutYou.whyJoin}
                      onChange={(e) => setAboutYou({ ...aboutYou, whyJoin: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Review & submit details */}
            {step === 7 && (
              <div className="space-y-6">
                <h3 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-wider border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Review Your Application
                </h3>

                <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
                  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-neutral-950 p-4 rounded-lg border border-neutral-200 dark:border-neutral-900">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Candidate Name</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{personalDetails.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Email Address</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{personalDetails.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Phone Number</span>
                      <span>{personalDetails.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Work Mode</span>
                      <span>{roleDetails.employmentType} ({job.location})</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg border border-neutral-200 dark:border-neutral-900 space-y-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Key Skills</span>
                      <span>{skillsList.primary}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Tools / Software</span>
                      <span>{skillsList.tools}</span>
                    </div>
                  </div>

                  {resumeFile && (
                    <div className="flex items-center gap-2 p-3 bg-blue-50/50 dark:bg-neutral-900/30 rounded-lg border border-blue-100/50 dark:border-neutral-900">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                      <span className="font-semibold text-neutral-900 dark:text-white truncate text-xs">
                        Resume Attached: {resumeFile.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nav Controls */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 text-xs"
              >
                Previous Step
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={validateAndNext}
                className="inline-flex items-center gap-1 bg-blue-600 text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 dark:bg-cyan-500 dark:text-neutral-950 dark:hover:bg-cyan-400 text-xs shadow"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white font-semibold rounded-lg px-6 py-2.5 hover:bg-green-700 dark:bg-cyan-500 dark:text-neutral-950 dark:hover:bg-cyan-400 text-xs shadow-md disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
