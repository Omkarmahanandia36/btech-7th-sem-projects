# AppFlow — AI-Powered Resume Video Interview Analyzer

## 1. Main User Flow

```text
Landing Page
   |
   v
Create Analysis
   |
   v
Upload Resume
   |
   v
Add Job Description
   |
   v
Upload Interview Video
   |
   v
Consent + Privacy Confirmation
   |
   v
Preflight Validation
   |
   v
Start AI Analysis
   |
   v
Processing Dashboard
   |
   +--> Resume Intelligence
   +--> Transcript
   +--> Question Analysis
   +--> Computer Vision Signals
   +--> Resume/Interview Alignment
   |
   v
Final Report
   |
   +--> Overview
   +--> Answer-by-Answer
   +--> Skills
   +--> Resume Consistency
   +--> Communication
   +--> Presentation Signals
   +--> Improvement Plan
```

## 2. Processing Flow

```text
Video
  |
  +--> Audio --> ASR --> Timestamped Transcript
  |
  +--> Frames --> CV Signal Extraction
  |
Resume --> Parser --> Structured Resume
                         |
JD --------------------> Structured Requirements
                         |
Transcript --> Q/A Segmentation
                         |
                         v
                 Evidence Engine
                         |
                         v
                 Multimodal Scoring
                         |
                         v
                  Grounded Report
```

## 3. Dashboard Flow

### Overview
Show:
- Overall readiness score.
- Resume-JD alignment.
- Interview answer quality.
- Technical evidence.
- Communication metrics.
- Presentation/recording quality.

### Answer Explorer
For every question:
- Question
- Candidate answer
- Score breakdown
- Strengths
- Weaknesses
- Evidence timestamps
- Suggested improvement

### Resume Alignment
Show:
- Supported claims
- Partially supported claims
- Unverified claims
- Potential contradictions

### Video Analysis
Show presentation signals with neutral wording:
- Gaze consistency
- Head movement
- Posture stability
- Camera framing
- Lighting
- Audio/video quality

## 4. Error Flow

If upload fails:
- Explain reason.
- Allow retry.

If transcription fails:
- Preserve uploaded files.
- Allow reprocessing with another ASR model.

If model confidence is low:
- Show "Low confidence".
- Avoid definitive conclusions.

## 5. Empty States

Examples:
- "Upload a resume to unlock Resume Intelligence."
- "Add a job description to calculate role alignment."
- "Upload an interview to start multimodal analysis."

## 6. Completion Flow

After processing:
1. Show report summary.
2. Allow drill-down.
3. Allow export to PDF.
4. Allow delete project.
5. Allow start another analysis.
