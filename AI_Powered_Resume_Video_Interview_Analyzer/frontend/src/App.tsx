import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { UploadWorkspace } from './components/UploadWorkspace';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { ExecutiveReport } from './components/ExecutiveReport';
import { EthicsModal } from './components/EthicsModal';
import { api } from './services/api';
import { ProjectStatus, ReportData, SampleScenario } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace' | 'processing' | 'report'>('landing');
  const [samples, setSamples] = useState<SampleScenario[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectStatus | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEthicsOpen, setIsEthicsOpen] = useState<boolean>(false);

  // Load sample scenarios on initial mount
  useEffect(() => {
    api.getSamples()
      .then(data => setSamples(data))
      .catch(err => console.error('Failed to load samples:', err));
  }, []);

  // Poll project status if in processing state
  useEffect(() => {
    if (currentView !== 'processing' || !activeProject) return;

    const interval = setInterval(async () => {
      try {
        const status = await api.getProjectStatus(activeProject.id);
        setActiveProject(status);

        if (status.status === 'COMPLETED') {
          clearInterval(interval);
          // Pre-fetch report
          const report = await api.getReport(status.id);
          setReportData(report);
        } else if (status.status === 'FAILED') {
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Error polling project status:', err);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [currentView, activeProject]);

  // Load Instant Sample Handler
  const handleLoadSample = async (sampleId: string) => {
    setIsLoading(true);
    try {
      const project = await api.loadSample(sampleId);
      setActiveProject(project);
      
      // If completed immediately, fetch report
      if (project.status === 'COMPLETED') {
        const rep = await api.getReport(project.id);
        setReportData(rep);
        setCurrentView('report');
      } else {
        setCurrentView('processing');
      }
    } catch (err) {
      console.error('Failed to load sample project:', err);
      alert('Error loading sample project.');
    } finally {
      setIsLoading(false);
    }
  };

  // Start Custom Upload Analysis
  const handleStartAnalysis = async (params: {
    candidateName: string;
    targetRole: string;
    resumeFile?: File;
    resumeText?: string;
    jdFile?: File;
    jdText?: string;
    videoFile?: File;
    videoText?: string;
  }) => {
    setIsLoading(true);
    try {
      // 1. Create project
      const proj = await api.createProject(
        `${params.candidateName} — Interview Analysis`,
        params.candidateName,
        params.targetRole
      );

      // 2. Upload assets
      await api.uploadResume(proj.id, params.resumeFile, params.resumeText);
      await api.uploadJobDescription(proj.id, params.jdFile, params.jdText);
      await api.uploadInterview(proj.id, params.videoFile, params.videoText);

      // 3. Trigger analysis
      const started = await api.startAnalysis(proj.id);
      setActiveProject(started);
      setCurrentView('processing');
    } catch (err) {
      console.error('Error starting analysis:', err);
      alert('Failed to start analysis. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!activeProject) return;
    if (confirm('Are you sure you want to permanently delete this project and all derived files?')) {
      try {
        await api.deleteProject(activeProject.id);
        setActiveProject(null);
        setReportData(null);
        setCurrentView('landing');
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-clayText font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenEthics={() => setIsEthicsOpen(true)}
        activeProjectTitle={activeProject?.title}
        onReset={() => {
          setActiveProject(null);
          setReportData(null);
          setCurrentView('workspace');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingHero
            onStartUpload={() => setCurrentView('workspace')}
            samples={samples}
            onLoadSample={handleLoadSample}
            onOpenEthics={() => setIsEthicsOpen(true)}
          />
        )}

        {currentView === 'workspace' && (
          <UploadWorkspace
            onStartAnalysis={handleStartAnalysis}
            onLoadSample={handleLoadSample}
            samples={samples}
            isLoading={isLoading}
          />
        )}

        {currentView === 'processing' && activeProject && (
          <ProcessingPipeline
            status={activeProject}
            onViewReport={() => setCurrentView('report')}
          />
        )}

        {currentView === 'report' && reportData && activeProject && (
          <ExecutiveReport
            report={reportData}
            candidateName={activeProject.candidate_name}
            targetRole={activeProject.target_role}
            onBackToWorkspace={() => setCurrentView('workspace')}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100/80 bg-white/40 py-6 px-4 text-center text-xs text-muted font-medium no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ClarifyAI • Multimodal Resume & Video Interview Intelligence</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsEthicsOpen(true)}
              className="hover:text-primary transition-colors underline"
            >
              Ethics & Fairness Charter
            </button>
            <span>•</span>
            <span>MySQL Enterprise Database</span>
          </div>
        </div>
      </footer>

      {/* Ethics & Fairness Modal */}
      <EthicsModal
        isOpen={isEthicsOpen}
        onClose={() => setIsEthicsOpen(false)}
      />

    </div>
  );
}

export default App;
