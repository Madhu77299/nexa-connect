import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Award, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { jobsData } from '../data/companyData';

export default function JobDetail() {
  const { jobId } = useParams();
  const job = jobsData.find((j) => j.id === jobId);

  if (!job) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-32 text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Role Not Found</h1>
          <p className="text-neutral-500">The role description you are looking for is no longer active.</p>
          <Link to="/careers" className="text-blue-600 dark:text-cyan-400 hover:underline">
            Back to Open Positions
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 transition-colors duration-300">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link to="/careers" className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Open Positions
          </Link>
        </div>

        {/* Job Title Card */}
        <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/60 dark:bg-neutral-900/30 dark:border-neutral-900 space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-neutral-900 text-xs font-semibold text-blue-700 dark:text-cyan-400 rounded">
              {job.type}
            </span>
            <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-xs font-semibold text-neutral-600 dark:text-neutral-400 rounded">
              {job.domain}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl leading-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
              {job.type}
            </span>
          </div>
        </div>

        {/* Core Descriptions */}
        <div className="space-y-10 text-neutral-700 dark:text-neutral-300">
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Role Overview</h3>
            <p className="leading-relaxed text-sm">{job.description}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Key Responsibilities</h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shrink-0 mt-2" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Required Skills & Capabilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.skills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm bg-neutral-50 dark:bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-900">
                  <CheckCircle className="h-4.5 w-4.5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Preferred Qualifications</h3>
              <ul className="space-y-2">
                {job.preferredSkills.map((pref, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-purple-400 shrink-0 mt-2" />
                    <span>{pref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.whatYouWillLearn && (
            <div className="p-6 bg-blue-50/50 dark:bg-neutral-900/30 rounded-xl border border-blue-100/50 dark:border-neutral-900 space-y-2">
              <h4 className="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4.5 w-4.5 text-blue-600 dark:text-cyan-400" />
                What You Will Learn / Gain:
              </h4>
              <p className="text-sm leading-relaxed">{job.whatYouWillLearn}</p>
            </div>
          )}

          {/* Call To Action Redirect */}
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <Link
              to={`/careers/apply/${job.id}`}
              className="inline-flex w-full md:w-auto items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-cyan-500 dark:text-neutral-950 dark:hover:bg-cyan-400 transition-all text-sm"
            >
              Apply for this Role
            </Link>
          </div>

        </div>

      </section>
    </PageTransition>
  );
}
