from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class ProjectCreate(BaseModel):
    title: Optional[str] = "Interview Analysis Project"
    candidate_name: Optional[str] = "Alex Morgan"
    target_role: Optional[str] = "Senior AI / Software Engineer"

class DocumentInfo(BaseModel):
    id: str
    type: str
    filename: str
    size_bytes: int
    created_at: datetime

class TranscriptSegmentDTO(BaseModel):
    id: str
    speaker: str
    start_time: float
    end_time: float
    text: str

class STARBreakdown(BaseModel):
    situation: Optional[str] = None
    task: Optional[str] = None
    action: Optional[str] = None
    result: Optional[str] = None

class AnswerDTO(BaseModel):
    id: str
    start_time: float
    end_time: float
    text: str
    relevance: float
    completeness: float
    technical_evidence: float
    structure: float
    evidence_density: float
    communication: float
    confidence: float
    star_structure: Optional[STARBreakdown] = None
    strengths: List[str] = []
    improvements: List[str] = []

class QuestionDTO(BaseModel):
    id: str
    question_number: int
    start_time: float
    end_time: float
    text: str
    category: str
    answers: List[AnswerDTO] = []

class SkillEvidenceDTO(BaseModel):
    id: str
    skill_name: str
    source_type: str
    evidence_text: str
    start_time: Optional[float] = None
    end_time: Optional[float] = None
    confidence: float
    demonstration_level: str

class AlignmentFindingDTO(BaseModel):
    id: str
    resume_claim: str
    interview_evidence: str
    status: str  # Supported, Partially Supported, Unverified, Inconsistency
    confidence: float
    evidence_start: Optional[float] = None
    evidence_end: Optional[float] = None
    recommendation: Optional[str] = None

class VisionSignalSummary(BaseModel):
    gaze_consistency_pct: float
    head_pose_stability_pct: float
    posture_stability_pct: float
    camera_framing_score: float
    lighting_quality_score: float
    audio_video_sync_score: float
    observations: List[str] = []

class CommunicationSummary(BaseModel):
    words_per_minute: int
    filler_word_count: int
    top_filler_words: List[Dict[str, Any]] = []
    clarity_score: float
    conciseness_score: float
    tone_confidence_score: float

class DimensionsScore(BaseModel):
    resume_alignment: float
    answer_quality: float
    technical_evidence: float
    communication: float
    presentation_quality: float

class ReportDTO(BaseModel):
    id: str
    project_id: str
    overall_score: float
    confidence: float
    dimension_scores: DimensionsScore
    summary: Dict[str, Any]
    strengths: List[str]
    improvements: List[str]
    recommendations: List[str]
    grounding: List[Dict[str, Any]] = []
    cv_presentation_summary: Optional[VisionSignalSummary] = None
    communication_metrics: Optional[CommunicationSummary] = None
    alignment_findings: List[AlignmentFindingDTO] = []
    skill_evidence: List[SkillEvidenceDTO] = []
    questions: List[QuestionDTO] = []
    transcript_segments: List[TranscriptSegmentDTO] = []
    resume_profile: Optional[Dict[str, Any]] = None
    job_requirements: Optional[Dict[str, Any]] = None
    created_at: datetime

class ProjectStatusDTO(BaseModel):
    id: str
    title: str
    candidate_name: str
    target_role: str
    status: str
    progress_percentage: int
    current_stage_label: str
    error_message: Optional[str] = None
    documents: List[DocumentInfo] = []
    has_resume: bool
    has_jd: bool
    has_interview: bool
    created_at: datetime
    completed_at: Optional[datetime] = None

class SampleScenarioDTO(BaseModel):
    id: str
    title: str
    candidate_name: str
    target_role: str
    description: str
    tags: List[str]
    overall_score: float
