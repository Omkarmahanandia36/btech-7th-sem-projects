export interface ProjectStatus {
  id: string;
  title: string;
  candidate_name: string;
  target_role: string;
  status: string;
  progress_percentage: number;
  current_stage_label: string;
  error_message?: string;
  documents: Array<{
    id: string;
    type: string;
    filename: string;
    size_bytes: number;
    created_at: string;
  }>;
  has_resume: boolean;
  has_jd: boolean;
  has_interview: boolean;
  created_at: string;
  completed_at?: string;
}

export interface STARBreakdown {
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

export interface Answer {
  id: string;
  start_time: number;
  end_time: number;
  text: string;
  relevance: number;
  completeness: number;
  technical_evidence: number;
  structure: number;
  evidence_density: number;
  communication: number;
  confidence: number;
  star_structure?: STARBreakdown;
  strengths: string[];
  improvements: string[];
}

export interface Question {
  id: string;
  question_number: number;
  start_time: number;
  end_time: number;
  text: string;
  category: string;
  answers: Answer[];
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  start_time: number;
  end_time: number;
  text: string;
}

export interface SkillEvidence {
  id: string;
  skill_name: string;
  source_type: string;
  evidence_text: string;
  start_time?: number;
  end_time?: number;
  confidence: number;
  demonstration_level: string;
}

export interface AlignmentFinding {
  id: string;
  resume_claim: string;
  interview_evidence: string;
  status: 'Supported' | 'Partially Supported' | 'Unverified' | 'Inconsistency';
  confidence: number;
  evidence_start?: number;
  evidence_end?: number;
  recommendation?: string;
}

export interface VisionSignalSummary {
  gaze_consistency_pct: number;
  head_pose_stability_pct: number;
  posture_stability_pct: number;
  camera_framing_score: number;
  lighting_quality_score: number;
  audio_video_sync_score: number;
  observations: string[];
}

export interface CommunicationSummary {
  words_per_minute: number;
  filler_word_count: number;
  top_filler_words: Array<{ word: string; count: number }>;
  clarity_score: number;
  conciseness_score: number;
  tone_confidence_score: number;
}

export interface DimensionsScore {
  resume_alignment: number;
  answer_quality: number;
  technical_evidence: number;
  communication: number;
  presentation_quality: number;
}

export interface ReportData {
  id: string;
  project_id: string;
  overall_score: number;
  confidence: number;
  dimension_scores: DimensionsScore;
  summary: {
    headline: string;
    verdict_context: string;
    top_demonstrated_domains: string[];
  };
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  grounding: Array<{
    claim: string;
    evidence_snippet: string;
    timestamp_start: number;
    timestamp_end: number;
    confidence: number;
  }>;
  cv_presentation_summary?: VisionSignalSummary;
  communication_metrics?: CommunicationSummary;
  alignment_findings: AlignmentFinding[];
  skill_evidence: SkillEvidence[];
  questions: Question[];
  transcript_segments: TranscriptSegment[];
  resume_profile?: any;
  job_requirements?: any;
  created_at: string;
}

export interface SampleScenario {
  id: string;
  title: string;
  candidate_name: string;
  target_role: string;
  description: string;
  tags: string[];
  overall_score: number;
}
