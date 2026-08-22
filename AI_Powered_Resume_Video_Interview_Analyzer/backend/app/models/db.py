import uuid
import datetime
from sqlalchemy import (
    Column, String, Text, Integer, Float, Boolean, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String(255), nullable=False, default="Untitled Analysis")
    candidate_name = Column(String(255), nullable=True, default="Candidate")
    target_role = Column(String(255), nullable=True, default="Target Role")
    status = Column(String(50), nullable=False, default="DRAFT") 
    # DRAFT, UPLOADED, VALIDATING, PARSING, TRANSCRIBING, SEGMENTING, NLP_ANALYSIS, CV_ANALYSIS, ALIGNING, REPORT_GENERATION, COMPLETED, FAILED
    progress_percentage = Column(Integer, default=0)
    current_stage_label = Column(String(255), default="Initialized")
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="projects")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")
    job_requirements = relationship("JobRequirement", back_populates="project", cascade="all, delete-orphan")
    interview = relationship("Interview", back_populates="project", uselist=False, cascade="all, delete-orphan")
    skill_evidence = relationship("SkillEvidence", back_populates="project", cascade="all, delete-orphan")
    alignment_findings = relationship("AlignmentFinding", back_populates="project", cascade="all, delete-orphan")
    report = relationship("Report", back_populates="project", uselist=False, cascade="all, delete-orphan")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    type = Column(String(50), nullable=False)  # RESUME, JOB_DESCRIPTION, INTERVIEW_VIDEO, AUDIO
    storage_key = Column(String(500), nullable=False)
    filename = Column(String(255), nullable=False)
    mime_type = Column(String(100), nullable=True)
    size_bytes = Column(Integer, default=0)
    checksum = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    project = relationship("Project", back_populates="documents")
    resume_profile = relationship("ResumeProfile", back_populates="document", uselist=False, cascade="all, delete-orphan")

class ResumeProfile(Base):
    __tablename__ = "resume_profiles"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    raw_text = Column(Text, nullable=True)
    structured_json = Column(JSON, nullable=True)
    # structured_json: {skills, experience, education, projects, metrics, certifications}
    
    document = relationship("Document", back_populates="resume_profile")

class JobRequirement(Base):
    __tablename__ = "job_requirements"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    raw_text = Column(Text, nullable=True)
    structured_json = Column(JSON, nullable=True)
    # structured_json: {required_skills, preferred_skills, responsibilities, experience_level, domain_terms}
    
    project = relationship("Project", back_populates="job_requirements")

class Interview(Base):
    __tablename__ = "interviews"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    video_document_id = Column(String(36), ForeignKey("documents.id"), nullable=True)
    duration_seconds = Column(Float, default=0.0)
    fps = Column(Float, default=30.0)
    width = Column(Integer, default=1280)
    height = Column(Integer, default=720)
    
    project = relationship("Project", back_populates="interview")
    transcript_segments = relationship("TranscriptSegment", back_populates="interview", cascade="all, delete-orphan")
    questions = relationship("Question", back_populates="interview", cascade="all, delete-orphan")
    vision_signals = relationship("VisionSignal", back_populates="interview", cascade="all, delete-orphan")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    interview_id = Column(String(36), ForeignKey("interviews.id"), nullable=False)
    speaker = Column(String(50), default="Candidate")
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    text = Column(Text, nullable=False)
    
    interview = relationship("Interview", back_populates="transcript_segments")

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    interview_id = Column(String(36), ForeignKey("interviews.id"), nullable=False)
    question_number = Column(Integer, nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    text = Column(Text, nullable=False)
    category = Column(String(100), default="Technical / Experience")
    
    interview = relationship("Interview", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")

class Answer(Base):
    __tablename__ = "answers"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    question_id = Column(String(36), ForeignKey("questions.id"), nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    text = Column(Text, nullable=False)
    
    question = relationship("Question", back_populates="answers")
    answer_score = relationship("AnswerScore", back_populates="answer", uselist=False, cascade="all, delete-orphan")

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    normalized_name = Column(String(100), nullable=False, index=True)
    category = Column(String(100), default="Technical")

class SkillEvidence(Base):
    __tablename__ = "skill_evidence"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    skill_name = Column(String(100), nullable=False)
    source_type = Column(String(50), nullable=False)  # RESUME, INTERVIEW_TRANSCRIPT, MULTIMODAL
    source_id = Column(String(36), nullable=True)
    evidence_text = Column(Text, nullable=False)
    start_time = Column(Float, nullable=True)
    end_time = Column(Float, nullable=True)
    confidence = Column(Float, default=1.0)
    demonstration_level = Column(String(50), default="Demonstrated") # Mentioned vs Demonstrated
    
    project = relationship("Project", back_populates="skill_evidence")

class VisionSignal(Base):
    __tablename__ = "vision_signals"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    interview_id = Column(String(36), ForeignKey("interviews.id"), nullable=False)
    timestamp = Column(Float, nullable=False)
    head_pose = Column(JSON, nullable=True)
    gaze_direction = Column(JSON, nullable=True)
    posture = Column(JSON, nullable=True)
    person_present = Column(Boolean, default=True)
    frame_quality = Column(Float, default=0.9)
    lighting_quality = Column(Float, default=0.85)
    
    interview = relationship("Interview", back_populates="vision_signals")

class AnswerScore(Base):
    __tablename__ = "answer_scores"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    answer_id = Column(String(36), ForeignKey("answers.id"), nullable=False)
    relevance = Column(Float, default=80.0)
    completeness = Column(Float, default=80.0)
    technical_evidence = Column(Float, default=80.0)
    structure = Column(Float, default=80.0)
    evidence_density = Column(Float, default=80.0)
    communication = Column(Float, default=80.0)
    confidence = Column(Float, default=0.85)
    explanation = Column(JSON, nullable=True)
    star_structure = Column(JSON, nullable=True) # {situation, task, action, result}
    strengths = Column(JSON, nullable=True)
    improvements = Column(JSON, nullable=True)
    
    answer = relationship("Answer", back_populates="answer_score")

class AlignmentFinding(Base):
    __tablename__ = "alignment_findings"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    resume_claim = Column(Text, nullable=False)
    interview_evidence = Column(Text, nullable=False)
    status = Column(String(50), nullable=False)  # Supported, Partially Supported, Unverified, Inconsistency
    confidence = Column(Float, default=0.85)
    evidence_start = Column(Float, nullable=True)
    evidence_end = Column(Float, nullable=True)
    recommendation = Column(Text, nullable=True)
    
    project = relationship("Project", back_populates="alignment_findings")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    overall_score = Column(Float, default=0.0)
    confidence = Column(Float, default=0.88)
    dimension_scores = Column(JSON, nullable=True)
    # {resume_alignment, answer_quality, technical_evidence, communication, presentation_quality}
    summary = Column(JSON, nullable=True)
    strengths = Column(JSON, nullable=True)
    improvements = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)
    grounding = Column(JSON, nullable=True)
    cv_presentation_summary = Column(JSON, nullable=True)
    communication_metrics = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    project = relationship("Project", back_populates="report")
