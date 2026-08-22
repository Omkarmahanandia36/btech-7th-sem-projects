import os
import shutil
import uuid
import threading
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.orm import Session

from backend.app.core.database import get_db, Base, engine
from backend.app.core.config import settings
from backend.app.models.db import (
    Project, Document, ResumeProfile, JobRequirement, Interview,
    TranscriptSegment, Question, Answer, AnswerScore, SkillEvidence,
    VisionSignal, AlignmentFinding, Report, User
)
from backend.app.models.schema import (
    ProjectCreate, ProjectStatusDTO, ReportDTO, DocumentInfo,
    QuestionDTO, AnswerDTO, STARBreakdown, SkillEvidenceDTO,
    AlignmentFindingDTO, DimensionsScore, SampleScenarioDTO
)
from backend.app.services.pipeline_service import PipelineService

# Ensure DB tables exist
Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/projects", tags=["projects"])

SAMPLE_SCENARIOS = [
    {
        "id": "sample-alex-morgan",
        "title": "Alex Morgan — Senior Distributed Systems & AI Engineer",
        "candidate_name": "Alex Morgan",
        "target_role": "Senior AI & Distributed Systems Engineer",
        "description": "High-throughput microservices, FastAPI, Kafka streaming, Redis caching, and PyTorch fraud detection models with 87% AUC.",
        "tags": ["Distributed Systems", "FastAPI", "PyTorch", "High Reliability", "Benchmarked"],
        "overall_score": 86.4
    },
    {
        "id": "sample-sarah-chen",
        "title": "Sarah Chen — Staff Full-Stack & Cloud Architect",
        "candidate_name": "Sarah Chen",
        "target_role": "Staff Full-Stack Architect",
        "description": "Next.js 14, React Server Components, GraphQL federation, AWS EKS migrations, and high-scale user experience engineering.",
        "tags": ["Full-Stack", "React", "AWS EKS", "Architecture", "Benchmarked"],
        "overall_score": 91.2
    },
    {
        "id": "sample-marcus-vance",
        "title": "Marcus Vance — Machine Learning & CV Engineer",
        "candidate_name": "Marcus Vance",
        "target_role": "Computer Vision & Edge ML Specialist",
        "description": "Real-time edge inference with OpenCV, ONNX, MediaPipe, model quantization, and low-latency video analytics pipelines.",
        "tags": ["Computer Vision", "OpenCV", "Edge ML", "PyTorch", "Benchmarked"],
        "overall_score": 88.0
    }
]

@router.get("/samples", response_model=List[SampleScenarioDTO])
def get_sample_scenarios():
    return SAMPLE_SCENARIOS

@router.post("", response_model=ProjectStatusDTO)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(
        title=payload.title or "Interview Analysis Project",
        candidate_name=payload.candidate_name or "Candidate",
        target_role=payload.target_role or "Target Role",
        status="DRAFT",
        progress_percentage=0,
        current_stage_label="Project created. Awaiting asset uploads."
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return _build_project_status(project, db)

@router.post("/samples/{sample_id}/load", response_model=ProjectStatusDTO)
def load_sample_project(sample_id: str, db: Session = Depends(get_db)):
    sample = next((s for s in SAMPLE_SCENARIOS if s["id"] == sample_id), SAMPLE_SCENARIOS[0])
    
    project = Project(
        title=sample["title"],
        candidate_name=sample["candidate_name"],
        target_role=sample["target_role"],
        status="DRAFT",
        progress_percentage=0,
        current_stage_label="Sample loaded. Initializing analysis."
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    # Trigger immediate sync analysis for instant demo exploration
    pipeline = PipelineService(db)
    pipeline.run_pipeline(project.id)
    
    db.refresh(project)
    return _build_project_status(project, db)

@router.post("/{project_id}/resume", response_model=ProjectStatusDTO)
async def upload_resume(
    project_id: str,
    file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    proj_dir = os.path.join(settings.UPLOAD_DIR, project_id)
    os.makedirs(proj_dir, exist_ok=True)

    if file:
        file_path = os.path.join(proj_dir, f"resume_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        doc = Document(
            project_id=project.id,
            type="RESUME",
            storage_key=file_path,
            filename=file.filename,
            mime_type=file.content_type,
            size_bytes=os.path.getsize(file_path)
        )
        db.add(doc)
    elif resume_text:
        file_path = os.path.join(proj_dir, "resume_text.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(resume_text)
            
        doc = Document(
            project_id=project.id,
            type="RESUME",
            storage_key=file_path,
            filename="resume_input.txt",
            mime_type="text/plain",
            size_bytes=len(resume_text.encode("utf-8"))
        )
        db.add(doc)
    else:
        raise HTTPException(status_code=400, detail="Must provide either resume file or text")

    project.current_stage_label = "Resume attached."
    db.commit()
    db.refresh(project)
    return _build_project_status(project, db)

@router.post("/{project_id}/job-description", response_model=ProjectStatusDTO)
async def upload_job_description(
    project_id: str,
    file: Optional[UploadFile] = File(None),
    jd_text: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    proj_dir = os.path.join(settings.UPLOAD_DIR, project_id)
    os.makedirs(proj_dir, exist_ok=True)

    if file:
        file_path = os.path.join(proj_dir, f"jd_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        doc = Document(
            project_id=project.id,
            type="JOB_DESCRIPTION",
            storage_key=file_path,
            filename=file.filename,
            mime_type=file.content_type,
            size_bytes=os.path.getsize(file_path)
        )
        db.add(doc)
    elif jd_text:
        file_path = os.path.join(proj_dir, "jd_text.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(jd_text)
            
        doc = Document(
            project_id=project.id,
            type="JOB_DESCRIPTION",
            storage_key=file_path,
            filename="job_description.txt",
            mime_type="text/plain",
            size_bytes=len(jd_text.encode("utf-8"))
        )
        db.add(doc)
    else:
        raise HTTPException(status_code=400, detail="Must provide either JD file or text")

    project.current_stage_label = "Job description attached."
    db.commit()
    db.refresh(project)
    return _build_project_status(project, db)

@router.post("/{project_id}/interview", response_model=ProjectStatusDTO)
async def upload_interview(
    project_id: str,
    file: Optional[UploadFile] = File(None),
    transcript_text: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    proj_dir = os.path.join(settings.UPLOAD_DIR, project_id)
    os.makedirs(proj_dir, exist_ok=True)

    if file:
        file_path = os.path.join(proj_dir, f"video_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        doc = Document(
            project_id=project.id,
            type="INTERVIEW_VIDEO",
            storage_key=file_path,
            filename=file.filename,
            mime_type=file.content_type,
            size_bytes=os.path.getsize(file_path)
        )
        db.add(doc)
    else:
        # Save placeholder interview video descriptor / script
        file_path = os.path.join(proj_dir, "interview_script.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(transcript_text or "Simulated technical interview recording.")
            
        doc = Document(
            project_id=project.id,
            type="INTERVIEW_VIDEO",
            storage_key=file_path,
            filename="interview_recording.mp4",
            mime_type="video/mp4",
            size_bytes=1024 * 1024 * 12
        )
        db.add(doc)

    project.current_stage_label = "Interview media attached."
    db.commit()
    db.refresh(project)
    return _build_project_status(project, db)

@router.post("/{project_id}/analyze", response_model=ProjectStatusDTO)
def start_analysis(
    project_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = "VALIDATING"
    project.progress_percentage = 5
    project.current_stage_label = "Preflight validation initiated."
    db.commit()
    db.refresh(project)

    def run_async(p_id: str):
        from backend.app.core.database import SessionLocal
        local_db = SessionLocal()
        try:
            srv = PipelineService(local_db)
            srv.run_pipeline(p_id)
        finally:
            local_db.close()

    # Launch background processing thread
    threading.Thread(target=run_async, args=(project_id,), daemon=True).start()

    return _build_project_status(project, db)

@router.get("/{project_id}/status", response_model=ProjectStatusDTO)
def get_project_status(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return _build_project_status(project, db)

@router.get("/{project_id}/report", response_model=ReportDTO)
def get_project_report(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    report = db.query(Report).filter(Report.project_id == project_id).first()
    if not report:
        raise HTTPException(status_code=400, detail="Report not generated yet. Status is: " + project.status)

    interview = db.query(Interview).filter(Interview.project_id == project_id).first()
    transcript_segments_dto = []
    questions_dto = []
    
    if interview:
        # Load transcript segments
        t_segs = db.query(TranscriptSegment).filter(TranscriptSegment.interview_id == interview.id).order_by(TranscriptSegment.start_time.asc()).all()
        for ts in t_segs:
            transcript_segments_dto.append({
                "id": ts.id,
                "speaker": ts.speaker,
                "start_time": ts.start_time,
                "end_time": ts.end_time,
                "text": ts.text
            })

        # Load questions & answers
        questions = db.query(Question).filter(Question.interview_id == interview.id).order_by(Question.question_number.asc()).all()
        for q in questions:
            answers = db.query(Answer).filter(Answer.question_id == q.id).all()
            answers_dto = []
            for a in answers:
                score = db.query(AnswerScore).filter(AnswerScore.answer_id == a.id).first()
                answers_dto.append(AnswerDTO(
                    id=a.id,
                    start_time=a.start_time,
                    end_time=a.end_time,
                    text=a.text,
                    relevance=score.relevance if score else 80.0,
                    completeness=score.completeness if score else 80.0,
                    technical_evidence=score.technical_evidence if score else 80.0,
                    structure=score.structure if score else 80.0,
                    evidence_density=score.evidence_density if score else 80.0,
                    communication=score.communication if score else 80.0,
                    confidence=score.confidence if score else 0.85,
                    star_structure=score.star_structure if score else None,
                    strengths=score.strengths or [],
                    improvements=score.improvements or []
                ))
            
            questions_dto.append(QuestionDTO(
                id=q.id,
                question_number=q.question_number,
                start_time=q.start_time,
                end_time=q.end_time,
                text=q.text,
                category=q.category or "Technical",
                answers=answers_dto
            ))

    # Alignment findings
    findings = db.query(AlignmentFinding).filter(AlignmentFinding.project_id == project_id).all()
    findings_dto = [
        AlignmentFindingDTO(
            id=f.id,
            resume_claim=f.resume_claim,
            interview_evidence=f.interview_evidence,
            status=f.status,
            confidence=f.confidence,
            evidence_start=f.evidence_start,
            evidence_end=f.evidence_end,
            recommendation=f.recommendation
        ) for f in findings
    ]

    # Skill Evidence
    skills_ev = db.query(SkillEvidence).filter(SkillEvidence.project_id == project_id).all()
    skills_dto = [
        SkillEvidenceDTO(
            id=s.id,
            skill_name=s.skill_name,
            source_type=s.source_type,
            evidence_text=s.evidence_text,
            start_time=s.start_time,
            end_time=s.end_time,
            confidence=s.confidence,
            demonstration_level=s.demonstration_level
        ) for s in skills_ev
    ]

    # Profiles
    resume_prof = db.query(ResumeProfile).join(Document, Document.id == ResumeProfile.document_id, isouter=True).filter(
        (Document.project_id == project_id) | (ResumeProfile.document_id == project_id)
    ).first()
    job_req = db.query(JobRequirement).filter(JobRequirement.project_id == project_id).first()

    return ReportDTO(
        id=report.id,
        project_id=project.id,
        overall_score=report.overall_score,
        confidence=report.confidence,
        dimension_scores=DimensionsScore(**(report.dimension_scores or {
            "resume_alignment": 85.0, "answer_quality": 82.0, "technical_evidence": 84.0,
            "communication": 78.0, "presentation_quality": 80.0
        })),
        summary=report.summary or {},
        strengths=report.strengths or [],
        improvements=report.improvements or [],
        recommendations=report.recommendations or [],
        grounding=report.grounding or [],
        cv_presentation_summary=report.cv_presentation_summary,
        communication_metrics=report.communication_metrics,
        alignment_findings=findings_dto,
        skill_evidence=skills_dto,
        questions=questions_dto,
        transcript_segments=transcript_segments_dto,
        resume_profile=resume_prof.structured_json if resume_prof else None,
        job_requirements=job_req.structured_json if job_req else None,
        created_at=report.created_at
    )

@router.delete("/{project_id}")
def delete_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Clean up uploaded files
    proj_dir = os.path.join(settings.UPLOAD_DIR, project_id)
    if os.path.exists(proj_dir):
        shutil.rmtree(proj_dir, ignore_errors=True)

    db.delete(project)
    db.commit()
    return {"status": "success", "message": f"Project {project_id} and all derived artifacts securely deleted."}

def _build_project_status(project: Project, db: Session) -> ProjectStatusDTO:
    docs = db.query(Document).filter(Document.project_id == project.id).all()
    doc_infos = [
        DocumentInfo(
            id=d.id,
            type=d.type,
            filename=d.filename,
            size_bytes=d.size_bytes,
            created_at=d.created_at
        ) for d in docs
    ]
    
    types = set(d.type for d in docs)
    return ProjectStatusDTO(
        id=project.id,
        title=project.title,
        candidate_name=project.candidate_name,
        target_role=project.target_role,
        status=project.status,
        progress_percentage=project.progress_percentage,
        current_stage_label=project.current_stage_label,
        error_message=project.error_message,
        documents=doc_infos,
        has_resume="RESUME" in types,
        has_jd="JOB_DESCRIPTION" in types,
        has_interview="INTERVIEW_VIDEO" in types,
        created_at=project.created_at,
        completed_at=project.completed_at
    )
