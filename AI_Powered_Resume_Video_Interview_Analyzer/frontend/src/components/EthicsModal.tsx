import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, EyeOff, Lock, HeartHandshake } from 'lucide-react';

interface EthicsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicsModal: React.FC<EthicsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clayText/40 backdrop-blur-sm animate-fade-in">
      <div className="clay-card bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-muted hover:text-clayText hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary-light flex items-center justify-center text-secondary-dark shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-clayText">Ethics, Fairness & Privacy Policy</h2>
            <p className="text-sm text-muted">Strict compliance with AI transparency and candidate protection guidelines</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-clayText/90">
          
          {/* Principle Banner */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-primary mb-1">Human-in-the-Loop & Coaching Standard</h4>
              <p className="text-xs text-clayText/80 leading-relaxed">
                This product is an evidence-grounded interview analysis and coaching assistant. It provides transparent, traceable insights for humans rather than issuing autonomous hiring verdicts or rejection decisions.
              </p>
            </div>
          </div>

          {/* Explicit Non-Goals */}
          <div>
            <h3 className="font-bold text-base text-clayText mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-danger" />
              <span>Strict Non-Goals (What AI Will NEVER Measure)</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <li className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-danger-dark font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                No facial emotion or beauty scoring
              </li>
              <li className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-danger-dark font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                No protected-attribute inference
              </li>
              <li className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-danger-dark font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                No personality or deception diagnosis
              </li>
              <li className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-danger-dark font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                No autonomous "Hire / Reject" verdicts
              </li>
            </ul>
          </div>

          {/* Computer Vision Boundaries */}
          <div>
            <h3 className="font-bold text-base text-clayText mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>Permitted Computer Vision Signals</span>
            </h3>
            <p className="text-xs text-muted mb-2">
              Computer vision is strictly bounded to objective, non-identifying presentation and recording conditions:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">Camera Framing</span>
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">Lighting Quality</span>
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">Posture Stability</span>
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">Gaze Consistency Proxy</span>
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">Head Pose Stability</span>
              <span className="p-2 bg-purple-50/60 rounded-lg text-clayText font-medium text-center">A/V Synchronization</span>
            </div>
          </div>

          {/* Privacy and Data Rights */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <h4 className="font-bold text-secondary-dark mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Privacy & Candidate Data Sovereignty</span>
            </h4>
            <p className="text-xs text-clayText/80 leading-relaxed">
              All uploaded resumes, interview recordings, transcripts, and analysis vectors are encrypted and can be permanently deleted at any time with a single click. Candidate data is never used for foundation model training without separate explicit governance.
            </p>
          </div>

        </div>

        {/* Footer Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-clay-btn font-semibold text-sm clay-button-primary"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
