import { ProjectStatus, ReportData, SampleScenario } from '../types';

const API_BASE = '/api/v1';

export const api = {
  async getSamples(): Promise<SampleScenario[]> {
    const res = await fetch(`${API_BASE}/projects/samples`);
    if (!res.ok) throw new Error('Failed to fetch sample scenarios');
    return res.json();
  },

  async loadSample(sampleId: string): Promise<ProjectStatus> {
    const res = await fetch(`${API_BASE}/projects/samples/${sampleId}/load`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to load sample project');
    return res.json();
  },

  async createProject(title: string, candidateName: string, targetRole: string): Promise<ProjectStatus> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        candidate_name: candidateName,
        target_role: targetRole,
      }),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async uploadResume(projectId: string, file?: File, text?: string): Promise<ProjectStatus> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text) formData.append('resume_text', text);

    const res = await fetch(`${API_BASE}/projects/${projectId}/resume`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload resume');
    return res.json();
  },

  async uploadJobDescription(projectId: string, file?: File, text?: string): Promise<ProjectStatus> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text) formData.append('jd_text', text);

    const res = await fetch(`${API_BASE}/projects/${projectId}/job-description`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload job description');
    return res.json();
  },

  async uploadInterview(projectId: string, file?: File, transcriptText?: string): Promise<ProjectStatus> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (transcriptText) formData.append('transcript_text', transcriptText);

    const res = await fetch(`${API_BASE}/projects/${projectId}/interview`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload interview media');
    return res.json();
  },

  async startAnalysis(projectId: string): Promise<ProjectStatus> {
    const res = await fetch(`${API_BASE}/projects/${projectId}/analyze`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to start analysis');
    return res.json();
  },

  async getProjectStatus(projectId: string): Promise<ProjectStatus> {
    const res = await fetch(`${API_BASE}/projects/${projectId}/status`);
    if (!res.ok) throw new Error('Failed to get status');
    return res.json();
  },

  async getReport(projectId: string): Promise<ReportData> {
    const res = await fetch(`${API_BASE}/projects/${projectId}/report`);
    if (!res.ok) throw new Error('Failed to get report');
    return res.json();
  },

  async deleteProject(projectId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/projects/${projectId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
  }
};
