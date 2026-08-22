import React from 'react';
import { 
  FileText, Video, Sparkles, ArrowRight, CheckCircle, 
  Shield, Cpu, Play, BarChart3, Clock, Target, Layers
} from 'lucide-react';
import { SampleScenario } from '../types';

interface LandingHeroProps {
  onStartUpload: () => void;
  samples: SampleScenario[];
  onLoadSample: (sampleId: string) => void;
  onOpenEthics: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartUpload,
  samples,
  onLoadSample,
  onOpenEthics
}) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-8 px-4 text-center max-w-4xl mx-auto space-y-8">
        
        {/* Clay Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-clay-badge bg-white shadow-sm border border-purple-100/80">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-bold tracking-wide uppercase text-primary">
            Next-Gen Multimodal Intelligence
          </span>
          <span className="text-muted text-xs">• Evidence-Grounded AI</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-clayText leading-[1.15]">
          Turn your resume + interview into <br className="hidden sm:block"/>
          <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
            AI-powered evidence.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Ground candidate evaluations in objective evidence. Seamlessly align spoken interview answers with resume claims, evaluate STAR structure, and extract presentation telemetry without black-box bias.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartUpload}
            className="flex items-center gap-2.5 px-8 py-4 text-base clay-button-primary rounded-clay-btn group"
          >
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Analyze Interview</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onLoadSample('sample-alex-morgan')}
            className="flex items-center gap-2 px-6 py-4 text-base clay-button-secondary rounded-clay-btn text-clayText"
          >
            <Play className="w-4 h-4 text-primary fill-primary/20" />
            <span>Explore Demo (Alex Morgan)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-success" />
            Zero Black-Box Hiring Verdicts
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-success" />
            Timestamped Citation Grounding
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-success" />
            Enterprise MySQL DB Storage
          </span>
        </div>
      </section>

      {/* BENCHMARK CANDIDATES CAROUSEL / CARDS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Instant Interactive Benchmarks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-clayText">
              Test Pre-Analyzed Industry Scenarios
            </h2>
          </div>
          <p className="text-sm text-muted max-w-md">
            Click any candidate below to instantly inspect full radar charts, synchronized video transcripts, STAR rubrics, and claim verification findings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samples.map((s) => (
            <div
              key={s.id}
              onClick={() => onLoadSample(s.id)}
              className="clay-card p-6 cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-primary font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                    {s.candidate_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 rounded-clay-badge border border-emerald-100 text-xs font-bold text-secondary-dark flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-dark" />
                    Score: {s.overall_score}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-clayText group-hover:text-primary transition-colors">
                    {s.candidate_name}
                  </h3>
                  <p className="text-xs text-primary font-medium">{s.target_role}</p>
                </div>

                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {s.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-lg bg-purple-50/70 text-clayText/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark">
                <span>View Full Executive Report</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 CORE AI PILLARS (DESIGN.MD SPEC) */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary text-xs font-bold uppercase tracking-wider">Multi-Stage Engine</span>
          <h2 className="text-3xl font-bold text-clayText mt-1">
            Built for Evidence, Not Intuition
          </h2>
          <p className="text-sm text-muted mt-2">
            Every score and insight is traceable to concrete source documents and timestamped transcript evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="clay-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100/70 flex items-center justify-center text-primary shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-clayText">Resume Intelligence</h3>
            <p className="text-xs text-muted leading-relaxed">
              Deep section parsing, skill taxonomy normalization, metric extraction, and automated alignment with job description requirements.
            </p>
            <ul className="text-[11px] text-clayText/80 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">✓ Section Classification</li>
              <li className="flex items-center gap-1.5">✓ Metric & Scale Extraction</li>
              <li className="flex items-center gap-1.5">✓ Skill Normalization</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="clay-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100/70 flex items-center justify-center text-secondary-dark shadow-sm">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-clayText">Speech & Q/A Intelligence</h3>
            <p className="text-xs text-muted leading-relaxed">
              Millisecond-accurate ASR transcription, automated question-answer segmentation, and STAR/CAR framework structure scoring.
            </p>
            <ul className="text-[11px] text-clayText/80 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">✓ Millisecond Timestamps</li>
              <li className="flex items-center gap-1.5">✓ STAR Methodology Rubric</li>
              <li className="flex items-center gap-1.5">✓ Filler Word & Pace Analysis</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="clay-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100/70 flex items-center justify-center text-accent-dark shadow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-clayText">Computer Vision Signals</h3>
            <p className="text-xs text-muted leading-relaxed">
              Strictly objective presentation telemetry including camera framing, head pose stability, lighting quality, and gaze consistency proxy.
            </p>
            <ul className="text-[11px] text-clayText/80 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">✓ Eye-Level Framing Score</li>
              <li className="flex items-center gap-1.5">✓ Lighting Condition Check</li>
              <li className="flex items-center gap-1.5">✓ Posture & Pose Stability</li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="clay-card p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100/70 flex items-center justify-center text-danger shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-clayText">Multimodal Grounding</h3>
            <p className="text-xs text-muted leading-relaxed">
              Cross-references resume claims against spoken answers, flagging Supported, Partially Supported, or Unverified claims with exact citations.
            </p>
            <ul className="text-[11px] text-clayText/80 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">✓ Claim Verification Graph</li>
              <li className="flex items-center gap-1.5">✓ Timestamped Citations</li>
              <li className="flex items-center gap-1.5">✓ Actionable Coaching Tips</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FAIRNESS & ETHICAL BOUNDARY CALLOUT */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="clay-card bg-gradient-to-br from-white via-purple-50/40 to-white p-8 md:p-10 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-secondary-dark font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Ethical AI Commitment</span>
            </div>
            <h3 className="text-2xl font-bold text-clayText">
              Zero Facial Emotion Scoring. Zero Bias.
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              We never infer character, protected attributes, or mental state from facial video. Our analysis is 100% grounded in technical clarity and spoken evidence.
            </p>
          </div>
          <button
            onClick={onOpenEthics}
            className="px-6 py-3 rounded-clay-btn text-xs font-bold clay-button-secondary text-clayText shrink-0"
          >
            Review Fairness Policy
          </button>
        </div>
      </section>

    </div>
  );
};
