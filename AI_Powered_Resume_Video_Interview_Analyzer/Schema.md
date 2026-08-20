# Schema — AI-Powered Resume Video Interview Analyzer

## 1. Core Entities

### users

```sql
id UUID PRIMARY KEY
email TEXT UNIQUE NOT NULL
name TEXT
created_at TIMESTAMP
updated_at TIMESTAMP
```

### projects

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
title TEXT
status TEXT
created_at TIMESTAMP
completed_at TIMESTAMP
```

### documents

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
type TEXT
storage_key TEXT
mime_type TEXT
size_bytes BIGINT
checksum TEXT
created_at TIMESTAMP
```

### resume_profiles

```sql
id UUID PRIMARY KEY
document_id UUID REFERENCES documents(id)
raw_text TEXT
structured_json JSONB
embedding VECTOR
```

### job_requirements

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
raw_text TEXT
structured_json JSONB
embedding VECTOR
```

### interviews

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
video_document_id UUID REFERENCES documents(id)
duration_seconds FLOAT
fps FLOAT
width INT
height INT
```

### transcript_segments

```sql
id UUID PRIMARY KEY
interview_id UUID REFERENCES interviews(id)
speaker TEXT
start_time FLOAT
end_time FLOAT
text TEXT
embedding VECTOR
```

### questions

```sql
id UUID PRIMARY KEY
interview_id UUID REFERENCES interviews(id)
question_number INT
start_time FLOAT
end_time FLOAT
text TEXT
embedding VECTOR
```

### answers

```sql
id UUID PRIMARY KEY
question_id UUID REFERENCES questions(id)
start_time FLOAT
end_time FLOAT
text TEXT
embedding VECTOR
```

### skills

```sql
id UUID PRIMARY KEY
name TEXT
normalized_name TEXT
category TEXT
```

### skill_evidence

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
skill_id UUID REFERENCES skills(id)
source_type TEXT
source_id UUID
evidence_text TEXT
start_time FLOAT
end_time FLOAT
confidence FLOAT
```

### vision_signals

```sql
id UUID PRIMARY KEY
interview_id UUID REFERENCES interviews(id)
timestamp FLOAT
head_pose JSONB
gaze_direction JSONB
posture JSONB
person_present BOOLEAN
frame_quality FLOAT
lighting_quality FLOAT
```

### answer_scores

```sql
id UUID PRIMARY KEY
answer_id UUID REFERENCES answers(id)
relevance FLOAT
completeness FLOAT
technical_evidence FLOAT
structure FLOAT
evidence_density FLOAT
communication FLOAT
confidence FLOAT
explanation JSONB
```

### alignment_findings

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
resume_claim TEXT
interview_evidence TEXT
status TEXT
confidence FLOAT
evidence_start FLOAT
evidence_end FLOAT
```

### reports

```sql
id UUID PRIMARY KEY
project_id UUID REFERENCES projects(id)
overall_score FLOAT
summary JSONB
strengths JSONB
improvements JSONB
recommendations JSONB
grounding JSONB
created_at TIMESTAMP
```

## 2. Vector Search

Use pgvector for:
- Resume chunks.
- JD requirements.
- Transcript segments.
- Questions.
- Answers.
- Skill descriptions.

Similarity is an evidence-retrieval mechanism, not a final hiring decision.

## 3. JSON Report Contract

```json
{
  "overall_score": 82,
  "confidence": 0.88,
  "dimensions": {
    "resume_alignment": 86,
    "answer_quality": 81,
    "technical_evidence": 84,
    "communication": 78,
    "presentation_quality": 80
  },
  "findings": [
    {
      "title": "Strong project evidence",
      "claim": "Candidate explained the Random Forest project.",
      "evidence": [
        {
          "type": "transcript",
          "start": 754.2,
          "end": 819.5
        }
      ],
      "confidence": 0.91
    }
  ]
}
```

## 4. Data Retention

Every project should support:
- Delete project.
- Delete raw video.
- Delete derived artifacts.
- Delete transcript.
- Delete embeddings.

Retention should be configurable.
