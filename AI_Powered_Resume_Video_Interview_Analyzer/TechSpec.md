# TechSpec — AI-Powered Resume Video Interview Analyzer

## 1. Architecture

Recommended architecture:

```text
React/Next.js Web App
        |
        v
FastAPI API Layer
        |
        +---- Auth / Project Service
        +---- File Service
        +---- Interview Processing Queue
        |
        v
AI Orchestrator
   |       |       |
   v       v       v
NLP      Speech    CV
   |       |       |
   +-------+-------+
           |
           v
Multimodal Evidence Engine
           |
           v
Scoring + Report Generator
           |
           v
PostgreSQL + pgvector
Object Storage
Redis
```

## 2. Recommended Stack

### Frontend
- Next.js / React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide icons

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Alembic

### AI/ML
- Hugging Face Transformers
- sentence-transformers
- spaCy
- scikit-learn
- PyTorch
- OpenCV
- MediaPipe
- Whisper-compatible ASR
- LLM provider abstraction
- Optional local LLM via Ollama/vLLM

### Data
- PostgreSQL
- pgvector
- Redis
- S3-compatible object storage

### Processing
- Celery/RQ or equivalent queue
- FFmpeg
- Docker

## 3. AI Pipeline

### Stage 1 — Ingestion
Validate MIME type, duration, size and codec.

### Stage 2 — Resume Parsing
Convert PDF/DOCX to normalized text, then extract:
- Skills
- Education
- Experience
- Projects
- Certifications
- Metrics
- Technologies

### Stage 3 — Job Description Parsing
Extract:
- Required skills
- Preferred skills
- Responsibilities
- Experience requirements
- Domain terms

### Stage 4 — Speech Processing
Extract audio and transcribe with timestamps.

### Stage 5 — Question/Answer Segmentation
Use transcript structure and semantic similarity to identify questions and answer boundaries.

### Stage 6 — NLP Analysis
For each answer:
- relevance
- completeness
- semantic similarity to question
- technical concept coverage
- STAR/CAR structure
- evidence density
- metrics
- filler/repetition
- unsupported assertions
- contradiction candidates

### Stage 7 — Computer Vision
Process sampled frames instead of storing unnecessary frame sequences.

Calculate:
- person presence
- head pose
- approximate gaze direction
- posture stability
- frame quality
- lighting
- camera alignment

No facial-emotion or attractiveness score.

### Stage 8 — Multimodal Alignment
Align transcript timestamps with CV signals and answer segments.

Example:

```text
Answer 04
Question: Explain your ML project.
Resume claim: Random Forest + 87% accuracy.
Transcript evidence: discusses Random Forest and evaluation.
Evidence timestamp: 12:34–13:48
Alignment: Supported
```

### Stage 9 — LLM Report Generation
Use structured JSON output and require evidence references for every substantive conclusion.

## 4. Model Strategy

Use model adapters:

```python
class EmbeddingModel:
    def embed(self, texts): ...

class ASRModel:
    def transcribe(self, audio_path): ...

class VisionModel:
    def analyze(self, video_path): ...

class LLMModel:
    def generate_structured(self, prompt, schema): ...
```

This avoids vendor lock-in.

## 5. API

### POST /api/v1/projects
Create analysis project.

### POST /api/v1/projects/{id}/resume
Upload resume.

### POST /api/v1/projects/{id}/job-description
Upload or enter JD.

### POST /api/v1/projects/{id}/interview
Upload video.

### POST /api/v1/projects/{id}/analyze
Start asynchronous analysis.

### GET /api/v1/projects/{id}/status
Get processing state.

### GET /api/v1/projects/{id}/report
Return final report.

### GET /api/v1/projects/{id}/evidence
Return timestamped evidence.

## 6. Processing States

```text
UPLOADED
VALIDATING
PARSING
TRANSCRIBING
SEGMENTING
NLP_ANALYSIS
CV_ANALYSIS
ALIGNING
REPORT_GENERATION
COMPLETED
FAILED
```

## 7. Security

- Signed upload URLs.
- MIME validation.
- File size limits.
- Malware scanning.
- Encryption at rest.
- HTTPS in transit.
- Row-level authorization.
- Audit logs.
- Automatic cleanup policy.

## 8. Performance

For MVP, optimize for asynchronous processing rather than real-time inference.

Use:
- GPU worker for NLP/CV where available.
- CPU worker for document extraction.
- Frame sampling.
- Cached embeddings.
- Batch embedding inference.
- Queue-based processing.

## 9. Testing

- Unit tests for parsers/scorers.
- API integration tests.
- Golden transcript tests.
- Model evaluation dataset.
- Report-grounding tests.
- Adversarial resume/interview consistency tests.
- Frontend accessibility tests.
