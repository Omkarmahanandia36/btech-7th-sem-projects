# Implementation — AI-Powered Resume Video Interview Analyzer

## 1. Repository Structure

```text
ai-resume-video-interview-analyzer/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── lib/
│   └── styles/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── workers/
│   └── tests/
├── ai/
│   ├── asr/
│   ├── nlp/
│   ├── embeddings/
│   ├── vision/
│   ├── alignment/
│   ├── scoring/
│   └── reporting/
├── migrations/
├── docker/
├── docs/
└── README.md
```

## 2. Development Order

### Phase 1 — Foundation
- Initialize Git repository.
- Create frontend.
- Create FastAPI backend.
- Configure PostgreSQL + pgvector.
- Configure object storage.
- Configure Redis/queue.
- Add environment configuration.

### Phase 2 — Upload System
Implement:
- Resume upload.
- JD upload/text entry.
- Video upload.
- Validation.
- Secure storage.
- Project status.

### Phase 3 — Resume NLP
Implement:
- PDF/DOCX extraction.
- Section detection.
- Skill extraction.
- Project extraction.
- Metric extraction.
- Embeddings.

### Phase 4 — ASR
Implement:
- Audio extraction with FFmpeg.
- ASR model adapter.
- Timestamped transcript.
- Transcript persistence.

### Phase 5 — Interview NLP
Implement:
- Question segmentation.
- Answer segmentation.
- Semantic relevance.
- STAR/CAR detection.
- Technical evidence extraction.
- Filler/repetition statistics.

### Phase 6 — Computer Vision
Implement:
- Frame sampling.
- Person detection/presence.
- Head pose.
- Approximate gaze.
- Posture.
- Lighting/frame quality.
- Audio-video timing alignment.

Avoid storing every frame.

### Phase 7 — Multimodal Evidence
Create an evidence graph:

```text
Resume Claim
     |
     +--> Skill
     |
     +--> Interview Answer
               |
               +--> Transcript timestamp
               |
               +--> CV presentation signal
```

Classify resume claims:
- Supported
- Partially supported
- Not demonstrated
- Potential inconsistency
- Insufficient evidence

### Phase 8 — Report Generation

Use structured LLM output.

Prompt architecture:

```text
SYSTEM:
You are an evidence-grounded interview analyst.

INPUT:
Job requirements
Resume evidence
Interview question
Interview answer
Relevant timestamps
Model scores

RULES:
Do not invent evidence.
Every substantive finding must reference evidence.
Separate observed signals from interpretation.
Do not infer protected attributes.
Return the required JSON schema.
```

### Phase 9 — UI

Build:
- Claymorphic dashboard.
- Upload cards.
- Processing timeline.
- Score cards.
- Evidence timeline.
- Answer explorer.
- Resume alignment view.

### Phase 10 — Evaluation

Create a manually annotated evaluation set containing:
- Resume sections.
- Interview questions.
- Answer-quality labels.
- Skill evidence.
- Ground-truth timestamps.
- CV signal annotations.

Compare model results against human labels.

## 3. Scoring Engine

Do not directly use arbitrary weighted averages without validation.

Initial prototype:

```text
Overall =
0.25 Resume Alignment
+ 0.30 Answer Quality
+ 0.25 Technical Evidence
+ 0.10 Communication
+ 0.10 Presentation/Recording Quality
```

Treat these weights as configurable experimental parameters. Validate them against human evaluation before presenting them as meaningful hiring metrics.

## 4. AI Implementation Principle

Every AI feature must have:

```text
Input
  -> Model
  -> Structured Output
  -> Confidence
  -> Evidence
  -> Human-readable Explanation
```

This prevents "AI" from becoming a simple collection of hard-coded recommendations.

## 5. Observability

Log:
- Model version.
- Prompt version.
- Processing duration.
- Token usage where applicable.
- Confidence.
- Errors.
- Pipeline stage.

Do not log raw sensitive video/transcript data unnecessarily.

## 6. Deployment

MVP:
- Docker Compose.
- PostgreSQL.
- Redis.
- API container.
- Worker container.
- Frontend container.
- Object storage.

Production:
- Managed PostgreSQL.
- GPU worker.
- CDN.
- HTTPS.
- Secret manager.
- Monitoring.
- Automated backups.
