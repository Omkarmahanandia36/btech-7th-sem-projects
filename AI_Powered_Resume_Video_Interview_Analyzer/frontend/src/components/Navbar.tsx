import React from 'react';
import { Sparkles, ShieldCheck, Database, Layers, ArrowLeft, RotateCcw } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'workspace' | 'processing' | 'report';
  onNavigate: (view: 'landing' | 'workspace') => void;
  onOpenEthics: () => void;
  activeProjectTitle?: string;
  onReset?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenEthics,
  activeProjectTitle,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-40 px-6 py-4 backdrop-blur-md bg-background/85 border-b border-purple-100/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary via-purple-500 to-accent flex items-center justify-center shadow-clay-btn transition-transform group-hover:scale-105">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-clayText">
                Clarify<span className="text-primary">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary-light text-primary clay-badge uppercase tracking-wider">
                Enterprise
              </span>
            </div>
            <p className="text-xs text-muted font-medium hidden sm:block">
              Multimodal Resume & Video Interview Intelligence
            </p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-white/70 p-1.5 rounded-clay-input border border-purple-100 shadow-sm">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentView === 'landing'
                ? 'bg-primary text-white shadow-clay-btn'
                : 'text-clayText/80 hover:text-primary hover:bg-purple-50/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('workspace')}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              currentView === 'workspace'
                ? 'bg-primary text-white shadow-clay-btn'
                : 'text-clayText/80 hover:text-primary hover:bg-purple-50/50'
            }`}
          >
            Analyze Interview
          </button>
          <button
            onClick={onOpenEthics}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-muted hover:text-clayText hover:bg-purple-50/50 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-secondary-dark" />
            <span>Fairness & Ethics</span>
          </button>
        </nav>

        {/* Right Action / System Pill */}
        <div className="flex items-center gap-3">
          {currentView === 'report' && onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold clay-button-secondary text-clayText rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary" />
              <span>New Analysis</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-clay-badge border border-purple-100 shadow-sm text-xs font-medium text-clayText">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <Database className="w-3.5 h-3.5 text-muted" />
            <span className="text-muted font-normal">DB:</span>
            <span className="font-semibold text-primary">MySQL</span>
          </div>
        </div>

      </div>
    </header>
  );
};
