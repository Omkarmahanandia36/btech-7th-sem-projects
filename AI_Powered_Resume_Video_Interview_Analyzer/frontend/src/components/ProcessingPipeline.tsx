import React from 'react';
import { 
  CheckCircle2, Loader2, Sparkles, FileText, Video, 
  Cpu, Layers, BarChart3, ShieldCheck, ArrowRight
} from 'lucide-react';
import { ProjectStatus } from '../types';

interface ProcessingPipelineProps {
  status: ProjectStatus;
  onViewReport: () => void;
}

const STAGES = [
  { id: 'VALIDATING', label: 'Preflight Validation', icon: ShieldCheck, desc: 'Validating file integrity, MIME types, and codecs' },
  { id: 'PARSING', label: 'Resume & JD Parsing', icon: FileText, desc: 'Extracting skills, sections, projects, and requirements' },
  { id: 'TRANSCRIBING', label: 'ASR Transcription', icon: Video, desc: 'Converting speech into timestamped dialogue segments' },
  { id: 'SEGMENTING', label: 'Q/A Segmentation', icon: Layers, desc: 'Demarcating question boundaries and candidate responses' },
  { id: 'NLP_ANALYSIS', label: 'NLP & STAR Scoring', icon: Cpu, desc: 'Evaluating answer relevance, metrics, and STAR structure' },
  { id: 'CV_ANALYSIS', label: 'Computer Vision Signals', icon: Video, desc: 'Extracting framing, lighting, head pose & posture signals' },
  { id: 'ALIGNING', label: 'Multimodal Alignment', icon: Layers, desc: 'Cross-referencing resume claims with interview transcripts' },
  { id: 'REPORT_GENERATION', label: 'Grounded Report Generation', icon: BarChart3, desc: 'Compiling evidence citations, scores, and coaching plan' }
];

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({ status, onViewReport }) => {
  const currentStageIndex = STAGES.findIndex(s => s.id === status.status);
  const isCompleted = status.status === 'COMPLETED';
  const isFailed = status.status === 'FAILED';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-clay-badge bg-white shadow-sm border border-purple-100">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {isCompleted ? 'Analysis Completed' : 'AI Pipeline Active'}
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-clayText">
          Analyzing: {status.candidate_name}
        </h2>
        <p className="text-xs sm:text-sm text-muted font-medium">
          {status.target_role} • {status.current_stage_label}
        </p>
      </div>

      {/* Main Clay Progress Container */}
      <div className="clay-card p-6 md:p-8 space-y-8 bg-white">
        
        {/* Progress Percentage Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-clayText">
            <span className="text-primary flex items-center gap-1.5">
              {!isCompleted && !isFailed && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />}
              {status.current_stage_label}
            </span>
            <span>{status.progress_percentage}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-purple-100/70 overflow-hidden shadow-inner p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFailed ? 'bg-danger' : 'bg-gradient-to-r from-primary via-purple-500 to-secondary-dark'
              }`}
              style={{ width: `${Math.max(5, status.progress_percentage)}%` }}
            />
          </div>
        </div>

        {/* 8-Stage Interactive Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = isCompleted || (currentStageIndex > idx);
            const isCurrent = !isCompleted && (currentStageIndex === idx || (currentStageIndex === -1 && idx === 0));

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-purple-50/40 border-purple-100 text-clayText'
                    : isCurrent
                    ? 'bg-white border-primary/50 shadow-clay-card ring-2 ring-primary/20'
                    : 'bg-purple-50/10 border-purple-50/60 text-muted opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    isDone
                      ? 'bg-emerald-100 text-success'
                      : isCurrent
                      ? 'bg-primary text-white animate-pulse'
                      : 'bg-purple-100/50 text-muted'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate">{stage.label}</span>
                    {isDone && <span className="text-[10px] text-success font-bold">✓</span>}
                  </div>
                  <p className="text-[11px] text-muted leading-tight truncate">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button When Complete */}
        {isCompleted && (
          <div className="pt-4 flex justify-center animate-bounce-short">
            <button
              onClick={onViewReport}
              className="flex items-center gap-2.5 px-8 py-4 text-base clay-button-primary rounded-clay-btn group shadow-clay-btn"
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Executive Report</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Failure alert if any */}
        {isFailed && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-danger text-xs font-semibold">
            {status.error_message || 'Pipeline processing halted. Please retry with a valid file or sample.'}
          </div>
        )}

      </div>
    </div>
  );
};
