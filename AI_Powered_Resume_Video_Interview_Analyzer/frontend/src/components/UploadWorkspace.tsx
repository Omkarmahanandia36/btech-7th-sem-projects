import React, { useState } from 'react';
import { 
  FileText, Briefcase, Video, Upload, CheckCircle2, 
  AlertCircle, Sparkles, Shield, ArrowRight, X, Play, FileUp
} from 'lucide-react';
import { SampleScenario } from '../types';

interface UploadWorkspaceProps {
  onStartAnalysis: (params: {
    candidateName: string;
    targetRole: string;
    resumeFile?: File;
    resumeText?: string;
    jdFile?: File;
    jdText?: string;
    videoFile?: File;
    videoText?: string;
  }) => void;
  onLoadSample: (sampleId: string) => void;
  samples: SampleScenario[];
  isLoading: boolean;
}

export const UploadWorkspace: React.FC<UploadWorkspaceProps> = ({
  onStartAnalysis,
  onLoadSample,
  samples,
  isLoading
}) => {
  // Metadata
  const [candidateName, setCandidateName] = useState('Alex Morgan');
  const [targetRole, setTargetRole] = useState('Senior AI & Software Engineer');
  
  // Resume state
  const [resumeMode, setResumeMode] = useState<'file' | 'text'>('file');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState(
    `Alex Morgan\nSenior AI & Software Engineer\n\nProfessional Experience:\n- Lead Backend Engineer at FinTech Corp (2021-Present)\n  * Architected high-throughput microservices using FastAPI, Kafka, and Redis caching, reducing p99 latency by 45% under 85k req/min peak load.\n  * Deployed automated fraud detection machine learning models using Random Forest & PyTorch with 87% AUC, preventing $420k in annual fraudulent chargebacks.\n  * Led zero-downtime database migrations with Alembic and MySQL/PostgreSQL schema partitioning.\n\nTechnical Proficiencies:\nPython, FastAPI, TypeScript, React, Docker, Kubernetes, PostgreSQL, MySQL, Redis, Kafka, PyTorch, Scikit-Learn, CI/CD, System Design`
  );

  // Job Description state
  const [jdMode, setJdMode] = useState<'file' | 'text'>('text');
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState(
    `Role: Senior AI & Distributed Systems Engineer\n\nKey Responsibilities:\n• Architect, scale, and maintain asynchronous distributed backend services and real-time streaming pipelines.\n• Build, train, and deploy production ML models with robust evaluation and monitoring.\n• Lead architectural code reviews, champion automated test coverage (>80%), and mentor junior engineers.\n\nRequirements:\n• 4+ years experience with Python, FastAPI, and distributed systems.\n• Hands-on experience with Kafka, Redis, and relational databases (PostgreSQL/MySQL).\n• Practical knowledge of ML frameworks (PyTorch, Scikit-Learn).\n• Strong understanding of containerization (Docker, Kubernetes) and CI/CD pipelines.`
  );

  // Interview state
  const [videoMode, setVideoMode] = useState<'file' | 'text'>('text');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoScript, setVideoScript] = useState(
    `Interviewer: Hello Alex! Could you walk us through the microservices architecture you designed in your previous role?\nCandidate: In my last project at FinTech Corp, our monolithic transaction endpoint was degrading under peak load, exceeding 1200ms p99 latency. I decomposed the service into asynchronous FastAPI microservices and introduced Apache Kafka for event-driven message queuing. By tuning our Redis caching layer and implementing Dockerized containers on Kubernetes, we reduced p99 latency by 45% and comfortably handled over 85,000 requests per minute with zero downtime.\n\nInterviewer: Great. Can you describe a challenging machine learning model you deployed?\nCandidate: We built an automated fraud detection pipeline using XGBoost and Random Forest ensembles in Scikit-Learn and PyTorch. The primary hurdle was severe class imbalance in transaction data. I employed SMOTE and focal loss techniques, and implemented stratified cross-validation. We achieved an 87% precision-recall AUC score, reducing fraudulent chargebacks by $420,000 annually while keeping false positives below 1.2%.\n\nInterviewer: How do you approach mentoring junior developers and driving code quality standards?\nCandidate: I established automated PR linting and test coverage gates requiring at least 85% branch coverage with pytest. Additionally, I host weekly architecture syncs and pair programming sessions to guide junior engineers through complex distributed systems debugging.`
  );

  // Consent toggle (Mandatory per PRD)
  const [hasConsent, setHasConsent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      alert('Please confirm candidate consent before initiating video interview analysis.');
      return;
    }

    onStartAnalysis({
      candidateName,
      targetRole,
      resumeFile: resumeMode === 'file' && resumeFile ? resumeFile : undefined,
      resumeText: resumeMode === 'text' ? resumeText : undefined,
      jdFile: jdMode === 'file' && jdFile ? jdFile : undefined,
      jdText: jdMode === 'text' ? jdText : undefined,
      videoFile: videoMode === 'file' && videoFile ? videoFile : undefined,
      videoText: videoMode === 'text' ? videoScript : undefined,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      
      {/* Header & Quick Sample Loader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-purple-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">New Session</span>
          <h1 className="text-3xl font-extrabold text-clayText">Interview Analysis Workspace</h1>
          <p className="text-xs sm:text-sm text-muted">Upload candidate assets to run end-to-end multimodal intelligence.</p>
        </div>

        {/* Quick Demo Pre-fill Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted">Quick Load Sample:</span>
          <button
            type="button"
            onClick={() => onLoadSample('sample-alex-morgan')}
            className="px-3 py-1.5 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-primary text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alex Morgan</span>
          </button>
          <button
            type="button"
            onClick={() => onLoadSample('sample-sarah-chen')}
            className="px-3 py-1.5 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-primary text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sarah Chen</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Candidate Metadata Bar */}
        <div className="clay-card p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Candidate Full Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
              className="w-full px-4 py-2.5 clay-input text-sm font-semibold text-clayText"
              placeholder="e.g. Alex Morgan"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Target Position / Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              required
              className="w-full px-4 py-2.5 clay-input text-sm font-semibold text-clayText"
              placeholder="e.g. Senior AI & Software Engineer"
            />
          </div>
        </div>

        {/* 3 LARGE CLAY CARDS (RESUME, JOB DESCRIPTION, VIDEO) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: RESUME */}
          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100/80 flex items-center justify-center text-primary shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-clayText">1. Resume Profile</h3>
                    <p className="text-[11px] text-muted">PDF, DOCX, or text</p>
                  </div>
                </div>

                {/* Toggle Input Mode */}
                <div className="flex rounded-xl bg-purple-50 p-1 text-[11px] font-semibold text-muted">
                  <button
                    type="button"
                    onClick={() => setResumeMode('file')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${resumeMode === 'file' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    File
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeMode('text')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${resumeMode === 'text' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    Text
                  </button>
                </div>
              </div>

              {resumeMode === 'file' ? (
                <div className="border-2 border-dashed border-purple-200/80 rounded-2xl p-4 text-center hover:border-primary/60 transition-colors bg-purple-50/20">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer block space-y-2 py-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 mx-auto flex items-center justify-center text-primary">
                      <FileUp className="w-5 h-5" />
                    </div>
                    {resumeFile ? (
                      <div className="text-xs font-bold text-primary truncate px-2">
                        {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-clayText">Drag or browse resume</p>
                        <p className="text-[10px] text-muted">PDF or DOCX up to 25MB</p>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={7}
                  className="w-full p-3 text-xs clay-input font-mono resize-none leading-relaxed text-clayText/90"
                  placeholder="Paste candidate resume..."
                />
              )}
            </div>

            <div className="text-[11px] text-muted flex items-center gap-1.5 pt-2 border-t border-purple-50">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Extracts metrics, skills & projects</span>
            </div>
          </div>

          {/* CARD 2: JOB DESCRIPTION */}
          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100/80 flex items-center justify-center text-secondary-dark shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-clayText">2. Job Description</h3>
                    <p className="text-[11px] text-muted">Role & requirements</p>
                  </div>
                </div>

                <div className="flex rounded-xl bg-purple-50 p-1 text-[11px] font-semibold text-muted">
                  <button
                    type="button"
                    onClick={() => setJdMode('file')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${jdMode === 'file' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    File
                  </button>
                  <button
                    type="button"
                    onClick={() => setJdMode('text')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${jdMode === 'text' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    Text
                  </button>
                </div>
              </div>

              {jdMode === 'file' ? (
                <div className="border-2 border-dashed border-purple-200/80 rounded-2xl p-4 text-center hover:border-primary/60 transition-colors bg-purple-50/20">
                  <input
                    type="file"
                    id="jd-upload"
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    onChange={(e) => setJdFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="jd-upload" className="cursor-pointer block space-y-2 py-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-secondary-dark">
                      <FileUp className="w-5 h-5" />
                    </div>
                    {jdFile ? (
                      <div className="text-xs font-bold text-primary truncate px-2">
                        {jdFile.name} ({(jdFile.size / 1024).toFixed(1)} KB)
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-clayText">Drag or browse JD document</p>
                        <p className="text-[10px] text-muted">PDF or TXT</p>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={7}
                  className="w-full p-3 text-xs clay-input font-mono resize-none leading-relaxed text-clayText/90"
                  placeholder="Paste Job Description specifications..."
                />
              )}
            </div>

            <div className="text-[11px] text-muted flex items-center gap-1.5 pt-2 border-t border-purple-50">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Categorizes required vs preferred skills</span>
            </div>
          </div>

          {/* CARD 3: INTERVIEW VIDEO */}
          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/80 flex items-center justify-center text-accent-dark shadow-sm">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-clayText">3. Interview Media</h3>
                    <p className="text-[11px] text-muted">Video recording or transcript</p>
                  </div>
                </div>

                <div className="flex rounded-xl bg-purple-50 p-1 text-[11px] font-semibold text-muted">
                  <button
                    type="button"
                    onClick={() => setVideoMode('file')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${videoMode === 'file' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoMode('text')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${videoMode === 'text' ? 'bg-white text-primary shadow-sm' : ''}`}
                  >
                    Script
                  </button>
                </div>
              </div>

              {videoMode === 'file' ? (
                <div className="border-2 border-dashed border-purple-200/80 rounded-2xl p-4 text-center hover:border-primary/60 transition-colors bg-purple-50/20">
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="video-upload" className="cursor-pointer block space-y-2 py-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-accent-dark">
                      <Video className="w-5 h-5" />
                    </div>
                    {videoFile ? (
                      <div className="text-xs font-bold text-primary truncate px-2">
                        {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-clayText">Upload MP4 / WebM recording</p>
                        <p className="text-[10px] text-muted">Supports up to 250MB</p>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <textarea
                  value={videoScript}
                  onChange={(e) => setVideoScript(e.target.value)}
                  rows={7}
                  className="w-full p-3 text-xs clay-input font-mono resize-none leading-relaxed text-clayText/90"
                  placeholder="Paste interview Q&A transcript..."
                />
              )}
            </div>

            <div className="text-[11px] text-muted flex items-center gap-1.5 pt-2 border-t border-purple-50">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>ASR timestamps + presentation signals</span>
            </div>
          </div>

        </div>

        {/* CONSENT + PREFLIGHT CHECK BAR */}
        <div className="clay-card p-6 bg-purple-50/40 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(e) => setHasConsent(e.target.checked)}
              className="mt-1 w-5 h-5 rounded-lg text-primary focus:ring-primary border-purple-200 accent-primary cursor-pointer"
            />
            <div className="text-xs text-clayText/90">
              <span className="font-bold block text-clayText">Explicit Candidate Consent & Privacy Confirmation</span>
              I confirm candidate consent has been granted for multimodal interview presentation analysis and automated evidence verification under fairness guidelines.
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading || !hasConsent}
            className={`flex items-center gap-2 px-8 py-4 text-sm clay-button-primary rounded-clay-btn shrink-0 ${
              isLoading || !hasConsent ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>{isLoading ? 'Processing Pipeline...' : 'Start AI Analysis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
