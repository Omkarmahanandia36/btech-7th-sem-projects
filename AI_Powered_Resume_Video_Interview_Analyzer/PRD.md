# PRD — AI-Powered Resume Video Interview Analyzer

## 1. Product Overview

**Project:** AI-Powered Resume Video Interview Analyzer

The system analyzes a candidate's resume and recorded/video interview together to produce an evidence-based interview analysis. It uses real AI/ML capabilities rather than a rule-only recommendation engine.

The core intelligence combines:

- NLP/LLM analysis of resume and interview transcript.
- Speech-to-text for interview transcription.
- Computer vision for non-identifying behavioral/video signals.
- Multimodal alignment between what the candidate claims on the resume and what they explain in the interview.
- Retrieval-augmented generation (RAG) over the job description, resume, and interview evidence.
- Semantic similarity and contradiction/evidence analysis.
- Structured scoring with explainable evidence rather than a black-box hiring verdict.

## 2. Problem

Recruiters and candidates often have to manually compare a resume with a video interview. Important information is buried across documents, spoken answers, and video behavior.

The product should answer:

1. Did the candidate explain the skills/projects listed on the resume?
2. How relevant were their answers to the interview questions and job description?
3. Did answers contain concrete evidence, metrics, ownership, and outcomes?
4. Which technical and soft skills were demonstrated?
5. Where are claims unsupported, vague, inconsistent, or contradictory?
6. What should the candidate improve before the next interview?

## 3. Target Users

### Candidate
Wants actionable feedback, practice analytics, and evidence-backed improvement areas.

### Recruiter/Interviewer
Wants a structured summary of interview evidence and resume alignment.

### Placement/Training Team
Wants aggregate learning insights without exposing unnecessary personal data.

## 4. Goals

- Analyze a resume and interview video end-to-end.
- Produce transcript, answer segmentation, skill evidence, and improvement insights.
- Ground AI conclusions in source evidence.
- Keep candidate control and consent central.
- Make results explainable.
- Support asynchronous recorded interviews first.
- Build architecture that can later support live interviews.

## 5. Non-Goals

- Automatically reject candidates.
- Infer protected attributes.
- Diagnose personality, mental health, intelligence, or deception.
- Treat facial appearance as a measure of competence.
- Use facial emotion recognition as a hiring score.
- Replace human interviewers.

## 6. Core AI Features

### A. Resume Intelligence
- Resume parsing.
- Section classification.
- Entity/skill extraction.
- Project and experience extraction.
- Achievement/metric extraction.
- Semantic skill normalization.
- Resume-to-JD semantic matching.

### B. Interview Intelligence
- Speech-to-text transcription.
- Question/answer segmentation.
- Answer relevance scoring.
- Semantic answer quality scoring.
- STAR/CAR structure detection.
- Technical concept coverage.
- Evidence/metric extraction.
- Filler-word and repetition analysis.
- Topic drift detection.
- Unsupported-claim detection.
- Resume-claim verification using interview evidence.

### C. Computer Vision
Use video only for observable presentation signals:
- Face/person presence.
- Head pose.
- Gaze direction as an approximate presentation signal.
- Posture/pose stability.
- Framing and camera position.
- Lighting/visibility quality.
- Speaking/lip-motion synchronization.
- Excessive camera movement.

CV output must be described as presentation/recording signals, not personality or competence judgments.

### D. Multimodal AI
Combine:
- Resume embeddings.
- JD embeddings.
- Transcript embeddings.
- Timestamped video signals.
- Question-specific evidence.

Generate a grounded interview report with citations/timestamps.

## 7. MVP

### Inputs
- PDF/DOCX resume.
- Job description text/PDF.
- MP4/WebM/MOV interview video.
- Optional question set.

### Processing
1. Validate and securely store files.
2. Extract resume/JD text.
3. Transcribe video.
4. Detect questions and answers.
5. Analyze NLP.
6. Analyze CV signals.
7. Align resume claims with interview evidence.
8. Generate report.

### Outputs
- Overall interview readiness score.
- Resume-JD alignment.
- Answer quality by question.
- Technical/skill evidence.
- Communication metrics.
- Presentation/recording quality.
- Resume consistency analysis.
- Improvement plan.
- Timestamped evidence.

## 8. Success Metrics

Technical:
- Transcription word error rate tracked on validation data.
- Resume extraction F1.
- Question segmentation F1.
- Skill extraction F1.
- Human agreement with answer-quality rubric.
- Grounded-report citation accuracy.
- Processing success rate.

Product:
- Report completion rate.
- Time-to-report.
- Candidate usefulness rating.
- Percentage of AI findings supported by evidence.
- Reduction in manual review time.

## 9. User Safety and Fairness

- Explicit consent before video processing.
- Encrypt uploads and derived artifacts.
- Allow deletion.
- Avoid protected-attribute inference.
- Do not score appearance, skin tone, accent, disability, or facial attractiveness.
- Show uncertainty where model confidence is low.
- Human review remains available.
- Separate technical evidence from communication/presentation signals.

## 10. Future Scope

- Live interview assistant.
- Interview question generation based on JD.
- Personalized mock interviews.
- Longitudinal improvement tracking.
- Organization-level analytics with privacy controls.
- Pluggable local/open-source models.
