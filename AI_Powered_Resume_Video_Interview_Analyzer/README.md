# AI-Powered Resume & Video Interview Analyzer (ClarifyAI)

An evidence-grounded, multimodal AI platform that analyzes candidates' resumes and recorded video interviews together to produce explainable, citation-backed evaluation reports.

---

## 🌟 Key Highlights

- **Dynamic Claymorphic UI/UX**: Soft 3D clay cards with subtle layered shadows, 28px card radius, 18px puffy buttons, responsive design, and smooth spring micro-interactions.
- **Fairness & Strict Ethical AI Boundary**: Restricts computer vision to objective presentation signals (lighting, camera framing, posture stability, gaze consistency proxy). **Zero facial emotion recognition, beauty scoring, or black-box hiring verdicts.**
- **Instant Benchmark Scenarios**: Pre-analyzed candidates (*Alex Morgan*, *Sarah Chen*, *Marcus Vance*) for instant one-click executive report exploration.
- **Interactive Video & Synchronized Clickable Transcript**: Click any spoken segment in the transcript to instantly seek the video playhead.
- **Question-by-Question STAR Rubric**: Automated extraction and breakdown of Situation, Task, Action, and Result with relevance and evidence density metrics.
- **Resume Claim Verification Matrix**: Classifies resume bullet points as `Supported`, `Partially Supported`, or `Unverified` with timestamp citations.
- **Enterprise MySQL Database**: Full relational schema conforming to `Schema.md`.

---

## 🚀 Quickstart Guide

### 1. Backend (FastAPI + MySQL/SQLite)

```bash
# Navigate to project root
cd AI_Powered_Resume_Video_Interview_Analyzer_docs

# Install dependencies
pip install -r backend/requirements.txt

# Run FastAPI Server (starts on http://localhost:8000)
python -m uvicorn backend.app.main:app --reload --port 8000
```

> **Database Configuration**:
> The backend connects to MySQL using standard credentials (`root@localhost:3306/interview_analyzer` or environment variables `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB`). If a MySQL server is not locally running, it automatically and gracefully uses local SQLite fallback.

### 2. Frontend (Vite + React + Tailwind CSS + Framer Motion)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (already installed)
npm install

# Start development server (http://localhost:3000)
npm run dev

# Or build for production
npm run build
```

---

## 🧪 Running Automated Tests

```bash
# Run pytest test suite
python -m pytest backend/tests/
```

---

## 📐 Architecture & Modules

```
AI_Powered_Resume_Video_Interview_Analyzer_docs/
├── backend/
│   ├── app/
│   │   ├── ai/               # AI Engine (Resume, JD, ASR, Q&A, NLP, CV, Alignment, Scoring, Report)
│   │   ├── api/              # FastAPI Endpoints (Projects, Uploads, Pipeline, Reports, Samples)
│   │   ├── core/             # Config & Database Engine (MySQL + SQLite fallback)
│   │   ├── models/           # SQLAlchemy DB Models & Pydantic DTO Schemas
│   │   └── services/         # Async 8-Stage Pipeline Orchestrator
│   ├── tests/                # Pytest Test Suite
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, LandingHero, UploadWorkspace, ProcessingPipeline, ExecutiveReport, EthicsModal
│   │   ├── services/         # API Client
│   │   ├── types/            # TypeScript Interface Definitions
│   │   ├── App.tsx           # React App Coordinator
│   │   └── index.css         # Claymorphism Tokens & Classes
│   ├── tailwind.config.js    # Custom Claymorphic Theme
│   └── package.json
└── README.md
```
