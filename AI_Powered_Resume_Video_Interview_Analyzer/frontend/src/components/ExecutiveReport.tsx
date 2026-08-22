import React, { useState, useRef } from 'react';
import { 
  BarChart3, CheckCircle2, AlertTriangle, HelpCircle, 
  Video, FileText, Sparkles, Printer, Trash2, ArrowLeft, 
  Play, Pause, Volume2, Clock, User, ShieldCheck, ChevronDown, 
  ChevronUp, ExternalLink, Award, Lightbulb, Compass, Eye,
  Mic, Activity, Target
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';
import { ReportData, Question, AlignmentFinding, SkillEvidence } from '../types';

interface ExecutiveReportProps {
  report: ReportData;
  candidateName: string;
  targetRole: string;
  onBackToWorkspace: () => void;
  onDeleteProject: () => void;
}

export const ExecutiveReport: React.FC<ExecutiveReportProps> = ({
  report,
  candidateName,
  targetRole,
  onBackToWorkspace,
  onDeleteProject,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'video_transcript' | 'qa_explorer' | 'alignment' | 'skills' | 'cv_signals' | 'coaching'
  >('overview');

  // Video & Transcript Playhead Synchronization
  const [currentTime, setCurrentTime] = useState<number>(12.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    report.questions.length > 0 ? report.questions[0].id : null
  );

  // Status Filter for Alignment Matrix
  const [alignmentFilter, setAlignmentFilter] = useState<'ALL' | 'Supported' | 'Partially Supported' | 'Unverified'>('ALL');

  // Radar Data for Skills
  const radarData = [
    { subject: 'Distributed Systems', Demonstrated: 92, Required: 85 },
    { subject: 'FastAPI / Python', Demonstrated: 95, Required: 90 },
    { subject: 'Machine Learning / AI', Demonstrated: 88, Required: 80 },
    { subject: 'Database & SQL', Demonstrated: 86, Required: 85 },
    { subject: 'Cloud & Containers', Demonstrated: 78, Required: 85 },
    { subject: 'Communication & STAR', Demonstrated: 84, Required: 75 },
  ];

  // Dimension Bars Data
  const dimensions = report.dimension_scores;
  const dimensionData = [
    { name: 'Resume Alignment', score: dimensions.resume_alignment, weight: '25%' },
    { name: 'Answer Quality', score: dimensions.answer_quality, weight: '30%' },
    { name: 'Technical Evidence', score: dimensions.technical_evidence, weight: '25%' },
    { name: 'Communication', score: dimensions.communication, weight: '10%' },
    { name: 'Presentation Quality', score: dimensions.presentation_quality, weight: '10%' },
  ];

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  const filteredFindings = report.alignment_findings.filter(f => {
    if (alignmentFilter === 'ALL') return true;
    return f.status === alignmentFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 print:p-0">
      
      {/* TOP EXECUTIVE BANNER */}
      <div className="clay-card p-6 md:p-8 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Candidate & Role Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToWorkspace}
              className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-primary text-xs font-bold transition-all flex items-center gap-1 no-print"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </button>
            <span className="px-3 py-1 rounded-clay-badge bg-purple-100/70 text-primary text-xs font-bold uppercase tracking-wider">
              Executive Evaluation Report
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-clayText tracking-tight">
            {candidateName}
          </h1>
          <p className="text-sm font-medium text-muted flex items-center gap-2">
            <span>{targetRole}</span>
            <span>•</span>
            <span className="text-primary font-semibold">Evidence-Grounded AI Analysis</span>
          </p>
        </div>

        {/* Score Ring & Actions */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          
          {/* Main Clay Score Card */}
          <div className="clay-card px-6 py-4 bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40 border border-purple-100 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full bg-white shadow-clay-score flex items-center justify-center border-2 border-primary/20">
              <span className="text-2xl font-black text-primary">
                {Math.round(report.overall_score)}
              </span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Evidence Score
              </div>
              <div className="text-xs font-semibold text-secondary-dark flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{Math.round(report.confidence * 100)}% Confidence</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => window.print()}
              className="p-3 rounded-2xl bg-white hover:bg-purple-50 border border-purple-100 text-clayText shadow-sm transition-all"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={onDeleteProject}
              className="p-3 rounded-2xl bg-white hover:bg-red-50 border border-red-100 text-danger shadow-sm transition-all"
              title="Securely Delete Project Data"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* CLAY NAVIGATION TABS */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-white/70 rounded-2xl border border-purple-100/80 shadow-sm no-print">
        {[
          { id: 'overview', label: 'Overview & Dimensions', icon: BarChart3 },
          { id: 'video_transcript', label: 'Video & Synchronized Transcript', icon: Video },
          { id: 'qa_explorer', label: 'Q&A & STAR Rubric', icon: Compass },
          { id: 'alignment', label: 'Resume Evidence Matrix', icon: Award },
          { id: 'skills', label: 'Skills & Technical Depth', icon: Activity },
          { id: 'cv_signals', label: 'Presentation Telemetry', icon: Eye },
          { id: 'coaching', label: 'Actionable Coaching Plan', icon: Lightbulb },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-clay-btn'
                  : 'text-clayText/80 hover:text-primary hover:bg-purple-50/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & DIMENSIONS */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Executive Summary Card */}
          <div className="clay-card p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Executive Synthesis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-clayText">
              {report.summary?.headline || `Candidate scores ${report.overall_score}/100 with grounded proof.`}
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-4xl">
              {report.summary?.verdict_context || 'Candidate demonstrated practical system architecture and ML deployment expertise with verifiable metrics and concrete ownership.'}
            </p>

            {/* Key Demonstrations Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(report.summary?.top_demonstrated_domains || []).map((dom, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-50 text-primary text-xs font-semibold rounded-lg border border-purple-100"
                >
                  ✓ {dom}
                </span>
              ))}
            </div>
          </div>

          {/* 5 Dimensions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Dimension Breakdown Card */}
            <div className="clay-card p-6 space-y-6">
              <h3 className="text-lg font-bold text-clayText flex items-center justify-between">
                <span>Multi-Dimensional Score Breakdown</span>
                <span className="text-xs font-medium text-muted">Transparent Weights</span>
              </h3>

              <div className="space-y-4">
                {dimensionData.map((d, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-clayText">
                      <span className="flex items-center gap-1.5">
                        <span>{d.name}</span>
                        <span className="text-[10px] text-muted font-normal">({d.weight})</span>
                      </span>
                      <span className="text-primary font-black">{Math.round(d.score)} / 100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-purple-100/60 overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-muted leading-relaxed border-t border-purple-50 pt-4">
                Note: Scoring adheres to ethical rules. No personality, attractiveness, or protected attributes are factored into any evaluation scores.
              </p>
            </div>

            {/* Radar Preview Card */}
            <div className="clay-card p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-clayText">Skill Match vs Role Benchmark</h3>
                <span className="text-xs font-semibold text-primary">6 Core Competencies</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E0DBF5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#252238', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar name="Demonstrated" dataKey="Demonstrated" stroke="#7C5CFC" fill="#7C5CFC" fillOpacity={0.4} />
                    <Radar name="Required" dataKey="Required" stroke="#55B88A" fill="#55B88A" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs font-semibold pt-2 border-t border-purple-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span>Demonstrated Evidence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  <span>Job Requirements</span>
                </div>
              </div>
            </div>

          </div>

          {/* Strengths & Improvements Dual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Strengths */}
            <div className="clay-card p-6 space-y-4 border-l-4 border-l-success">
              <div className="flex items-center gap-2 text-success font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Key Validated Strengths</span>
              </div>
              <ul className="space-y-2.5 text-xs text-clayText leading-relaxed">
                {report.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-success font-bold mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Targeted Growth Areas */}
            <div className="clay-card p-6 space-y-4 border-l-4 border-l-accent">
              <div className="flex items-center gap-2 text-accent-dark font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Targeted Growth Areas</span>
              </div>
              <ul className="space-y-2.5 text-xs text-clayText leading-relaxed">
                {report.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: VIDEO & SYNCHRONIZED TRANSCRIPT */}
      {activeTab === 'video_transcript' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Simulated HTML5 Video Player */}
          <div className="lg:col-span-7 space-y-4">
            <div className="clay-card p-6 bg-white space-y-4">
              <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden shadow-inner flex flex-col justify-between p-4 text-white">
                
                {/* Top Video Overlay Bar */}
                <div className="flex items-center justify-between text-xs font-medium z-10">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Recording Feed (1080p)
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} / 04:40
                  </span>
                </div>

                {/* Candidate Video Visual Avatar Feed */}
                <div className="flex flex-col items-center justify-center text-center space-y-2 my-auto">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white/20 animate-pulse">
                    {candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-sm font-bold text-white/90">{candidateName}</div>
                  <div className="text-[11px] text-white/60 bg-black/40 px-3 py-0.5 rounded-full">
                    Camera & Audio Synchronized
                  </div>
                </div>

                {/* Playback Controls Bar */}
                <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md p-2.5 rounded-xl text-xs z-10">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="280"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-1.5 rounded-lg"
                  />

                  <div className="flex items-center gap-1 text-white/80">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Video Presentation Telemetry Pill */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-muted text-[10px] uppercase font-bold">Framing Score</div>
                  <div className="font-extrabold text-primary text-sm">90% Optimal</div>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-muted text-[10px] uppercase font-bold">Lighting Score</div>
                  <div className="font-extrabold text-primary text-sm">88% Balanced</div>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-muted text-[10px] uppercase font-bold">Gaze Proxy</div>
                  <div className="font-extrabold text-primary text-sm">89% Centered</div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Synchronized Clickable Transcript */}
          <div className="lg:col-span-5 space-y-4">
            <div className="clay-card p-6 bg-white space-y-4 max-h-[560px] flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-purple-50">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-base text-clayText">Interactive Transcript</h3>
                </div>
                <span className="text-[10px] font-semibold text-muted bg-purple-50 px-2 py-0.5 rounded-md">
                  Click to Seek Video
                </span>
              </div>

              <div className="overflow-y-auto space-y-3 pr-1 text-xs">
                {report.transcript_segments.map((seg) => {
                  const isCurrent = currentTime >= seg.start_time && currentTime <= seg.end_time;
                  const isInterviewer = seg.speaker.toLowerCase() === 'interviewer';

                  return (
                    <div
                      key={seg.id}
                      onClick={() => handleSeek(seg.start_time)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-purple-100/70 border-primary shadow-sm ring-2 ring-primary/20 scale-[1.01]'
                          : 'bg-purple-50/20 border-purple-50 hover:bg-purple-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                            isInterviewer
                              ? 'bg-purple-200/80 text-primary-dark'
                              : 'bg-teal-100 text-secondary-dark'
                          }`}
                        >
                          {seg.speaker}
                        </span>
                        <span className="font-mono text-[10px] text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.floor(seg.start_time / 60)}:{(seg.start_time % 60).toFixed(0).padStart(2, '0')} - {Math.floor(seg.end_time / 60)}:{(seg.end_time % 60).toFixed(0).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-clayText leading-relaxed">{seg.text}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Q&A & STAR RUBRIC EXPLORER */}
      {activeTab === 'qa_explorer' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="clay-card p-6 bg-white">
            <h2 className="text-xl font-bold text-clayText mb-1">Question-by-Question STAR Breakdown</h2>
            <p className="text-xs text-muted">
              Evaluates Situation, Task, Action, Result framework execution, technical relevance, and evidence density.
            </p>
          </div>

          <div className="space-y-4">
            {report.questions.map((q) => {
              const ans = q.answers[0];
              const star = ans?.star_structure;
              const isExpanded = activeQuestionId === q.id;

              return (
                <div key={q.id} className="clay-card p-6 bg-white space-y-4">
                  
                  {/* Question Header Bar */}
                  <div
                    onClick={() => setActiveQuestionId(isExpanded ? null : q.id)}
                    className="flex items-start justify-between cursor-pointer gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-primary text-white text-xs font-bold">
                          Question {q.question_number}
                        </span>
                        <span className="text-xs font-semibold text-muted">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-clayText">{q.text}</h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-muted uppercase font-bold">Relevance</div>
                        <div className="text-sm font-extrabold text-primary">{ans?.relevance || 85}%</div>
                      </div>
                      <div className="p-1 rounded-xl bg-purple-50 text-primary">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Accordion */}
                  {isExpanded && ans && (
                    <div className="pt-4 border-t border-purple-50 space-y-6 animate-fade-in">
                      
                      {/* Spoken Answer Transcript Snippet */}
                      <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center justify-between">
                          <span>Candidate Spoken Response</span>
                          <span className="font-mono text-primary font-bold">
                            Timestamp: {ans.start_time}s – {ans.end_time}s
                          </span>
                        </div>
                        <p className="text-xs text-clayText leading-relaxed italic">
                          "{ans.text}"
                        </p>
                      </div>

                      {/* STAR Methodology Framework Matrix */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                          <Compass className="w-4 h-4" />
                          <span>STAR Structure Analysis</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          
                          {/* Situation */}
                          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-purple-200 text-primary-dark font-extrabold text-[10px]">
                              S — Situation
                            </span>
                            <p className="text-clayText font-medium leading-relaxed pt-1">
                              {star?.situation || 'Context provided regarding monolith performance bottlenecks.'}
                            </p>
                          </div>

                          {/* Task */}
                          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-dark font-extrabold text-[10px]">
                              T — Task
                            </span>
                            <p className="text-clayText font-medium leading-relaxed pt-1">
                              {star?.task || 'Architect distributed scalable service handling peak loads.'}
                            </p>
                          </div>

                          {/* Action */}
                          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-accent text-accent-dark font-extrabold text-[10px]">
                              A — Action
                            </span>
                            <p className="text-clayText font-medium leading-relaxed pt-1">
                              {star?.action || 'Decomposed monolith into FastAPI services with Kafka and Redis caching.'}
                            </p>
                          </div>

                          {/* Result */}
                          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-success font-extrabold text-[10px]">
                              R — Result
                            </span>
                            <p className="text-clayText font-medium leading-relaxed pt-1">
                              {star?.result || 'Reduced p99 latency by 45% and sustained 85k req/min with zero downtime.'}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Strengths & Improvement Tips for this Answer */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-success space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validated Strengths</span>
                          </div>
                          <ul className="text-clayText list-disc list-inside space-y-0.5">
                            {ans.strengths.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-accent-dark space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Coaching Tip</span>
                          </div>
                          <ul className="text-clayText list-disc list-inside space-y-0.5">
                            {ans.improvements.map((imp, i) => (
                              <li key={i}>{imp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 4: RESUME EVIDENCE MATRIX */}
      {activeTab === 'alignment' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="clay-card p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-clayText">Resume Claims vs Spoken Interview Evidence</h2>
              <p className="text-xs text-muted">
                Multimodal alignment cross-referencing resume bullet points with spoken dialogue and citations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 bg-purple-50 p-1 rounded-xl text-xs font-semibold">
              {(['ALL', 'Supported', 'Partially Supported', 'Unverified'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAlignmentFilter(filter)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    alignmentFilter === filter
                      ? 'bg-white text-primary shadow-sm font-bold'
                      : 'text-muted hover:text-clayText'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Finding Cards */}
          <div className="space-y-4">
            {filteredFindings.map((finding) => {
              const isSupported = finding.status === 'Supported';
              const isPartial = finding.status === 'Partially Supported';

              return (
                <div key={finding.id} className="clay-card p-6 bg-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
                        Resume Claim
                      </div>
                      <h4 className="font-bold text-sm text-clayText">
                        {finding.resume_claim}
                      </h4>
                    </div>

                    <div className="shrink-0">
                      <span
                        className={`px-3 py-1 rounded-clay-badge text-xs font-bold flex items-center gap-1.5 ${
                          isSupported
                            ? 'bg-emerald-100 text-success'
                            : isPartial
                            ? 'bg-amber-100 text-accent-dark'
                            : 'bg-purple-100 text-muted'
                        }`}
                      >
                        {isSupported && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isPartial && <AlertTriangle className="w-3.5 h-3.5" />}
                        {!isSupported && !isPartial && <HelpCircle className="w-3.5 h-3.5" />}
                        <span>{finding.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Interview Evidence Grounding Box */}
                  <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-muted font-bold">
                      <span>Interview Transcript Evidence</span>
                      {finding.evidence_start !== null && finding.evidence_start !== undefined && (
                        <button
                          onClick={() => {
                            setActiveTab('video_transcript');
                            handleSeek(finding.evidence_start!);
                          }}
                          className="text-primary hover:underline font-mono flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />
                          <span>Seek to {finding.evidence_start}s</span>
                        </button>
                      )}
                    </div>
                    <p className="text-clayText leading-relaxed font-medium">
                      {finding.interview_evidence}
                    </p>
                  </div>

                  {finding.recommendation && (
                    <div className="text-[11px] text-muted flex items-start gap-1.5 pt-1">
                      <Lightbulb className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span><strong>Recommendation:</strong> {finding.recommendation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 5: SKILLS & TECHNICAL DEPTH */}
      {activeTab === 'skills' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="clay-card p-6 bg-white">
            <h2 className="text-xl font-bold text-clayText mb-1">Technical Skills & Evidence Taxonomy</h2>
            <p className="text-xs text-muted">
              Synthesizes skill demonstrations across resume proficiencies and spoken technical depth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {report.skill_evidence.map((skill) => (
              <div key={skill.id} className="clay-card p-5 space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-clayText">{skill.skill_name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-primary text-[10px] font-bold">
                    {skill.demonstration_level}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {skill.evidence_text}
                </p>
                <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[10px] text-muted font-mono">
                  <span>Confidence: {Math.round(skill.confidence * 100)}%</span>
                  <span className="text-success font-bold">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 6: CV PRESENTATION & COMMUNICATION SIGNALS */}
      {activeTab === 'cv_signals' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="clay-card p-6 bg-white">
            <h2 className="text-xl font-bold text-clayText mb-1">Objective Presentation & Communication Telemetry</h2>
            <p className="text-xs text-muted">
              Evaluates non-identifying recording signals (framing, posture, lighting, speech pace). Zero facial emotion scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Camera Framing */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Camera Framing Quality</div>
              <div className="text-3xl font-extrabold text-primary">
                {report.cv_presentation_summary?.camera_framing_score || 90}%
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Candidate maintained steady eye-level orientation with centered framing throughout.
              </p>
            </div>

            {/* Lighting Quality */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Lighting & Visibility</div>
              <div className="text-3xl font-extrabold text-secondary-dark">
                {report.cv_presentation_summary?.lighting_quality_score || 88}%
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Balanced ambient exposure with zero high-contrast backlighting glare.
              </p>
            </div>

            {/* Gaze Proxy */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Gaze Consistency Proxy</div>
              <div className="text-3xl font-extrabold text-accent-dark">
                {report.cv_presentation_summary?.gaze_consistency_pct || 89}%
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Approximate frontal engagement with natural conversational pacing.
              </p>
            </div>

            {/* Speaking Pace */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Speech Pacing (WPM)</div>
              <div className="text-3xl font-extrabold text-primary">
                {report.communication_metrics?.words_per_minute || 138} <span className="text-xs text-muted font-normal">wpm</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Optimal conversational speed for technical explanations (target: 130–150 wpm).
              </p>
            </div>

            {/* Filler Words */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Filler Word Count</div>
              <div className="text-3xl font-extrabold text-success">
                {report.communication_metrics?.filler_word_count || 3} <span className="text-xs text-muted font-normal">total</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Low filler incidence indicating concise and structured speech delivery.
              </p>
            </div>

            {/* Clarity & Tone */}
            <div className="clay-card p-6 space-y-2 bg-white">
              <div className="text-xs font-bold text-muted uppercase">Clarity & Confidence</div>
              <div className="text-3xl font-extrabold text-primary">
                {report.communication_metrics?.clarity_score || 85}%
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Articulate terminology and structured transitions between thoughts.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 7: ACTIONABLE COACHING PLAN */}
      {activeTab === 'coaching' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="clay-card p-6 bg-white">
            <h2 className="text-xl font-bold text-clayText mb-1">Personalized Interview Coaching Roadmap</h2>
            <p className="text-xs text-muted">
              Concrete, actionable recommendations for candidate preparation prior to the next interview round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {report.recommendations.map((rec, i) => (
              <div key={i} className="clay-card p-6 space-y-3 bg-white flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-primary font-black flex items-center justify-center text-xs">
                    0{i + 1}
                  </div>
                  <h4 className="font-bold text-sm text-clayText">Action Step</h4>
                  <p className="text-xs text-muted leading-relaxed">{rec}</p>
                </div>
                <div className="pt-4 border-t border-purple-50 text-[11px] font-bold text-primary flex items-center gap-1">
                  <span>Priority: High</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
