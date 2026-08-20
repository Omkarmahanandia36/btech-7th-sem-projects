# Rules — AI-Powered Resume Video Interview Analyzer

## 1. Product Rules

1. The product is an analysis and coaching system, not an autonomous hiring authority.
2. Every important AI finding must be traceable to source evidence.
3. Do not fabricate interview evidence.
4. Do not generate a conclusion when the evidence is insufficient.
5. Show confidence for model-generated findings.
6. Preserve timestamps for video-derived evidence.

## 2. AI Rules

1. Use real model inference for NLP, ASR, embeddings, and CV.
2. Rule-based logic may support AI but must not be presented as AI by itself.
3. Keep model providers replaceable.
4. Version models and prompts.
5. Store evaluation results.
6. Validate scoring against human annotations.
7. Do not silently change model versions in production.

## 3. NLP Rules

1. Analyze semantic meaning, not keyword presence alone.
2. Distinguish skill mention from skill demonstration.
3. Prefer concrete evidence over generic statements.
4. Detect uncertainty and unsupported claims.
5. Never invent a candidate's experience.
6. Preserve original transcript evidence.

## 4. Computer Vision Rules

Allowed:
- Person presence.
- Head pose.
- Approximate gaze direction.
- Posture stability.
- Framing.
- Lighting.
- Camera quality.
- Audio-video synchronization.

Not allowed:
- Personality inference from face.
- Intelligence inference.
- Honesty/deception inference.
- Attractiveness scoring.
- Protected-attribute inference.
- Mental-health inference.
- Medical inference.
- Hiring score based on facial appearance.

## 5. Scoring Rules

1. Scores are indicators, not objective measures of candidate worth.
2. Do not display "hire" or "reject" as an automated result.
3. Explain score dimensions.
4. Show evidence for score-driving findings.
5. Avoid false precision.
6. If confidence is low, clearly label it.

## 6. Privacy Rules

1. Obtain explicit consent before processing video.
2. Encrypt data in transit and at rest.
3. Use least-privilege access.
4. Allow project deletion.
5. Do not retain raw video longer than necessary.
6. Avoid logging raw video/audio/transcript unnecessarily.
7. Do not use candidate data for model training without separate consent and appropriate governance.

## 7. UX Rules

1. Follow Claymorphism consistently.
2. Keep analytical content readable.
3. Never hide critical evidence behind decorative animation.
4. Provide loading and failure states.
5. Provide captions/transcripts.
6. Support keyboard navigation.
7. Support reduced motion.

## 8. Engineering Rules

1. Type-check frontend and backend contracts.
2. Validate all uploaded files.
3. Never trust client-provided MIME types alone.
4. Use background jobs for video processing.
5. Keep AI providers behind interfaces.
6. Add unit and integration tests.
7. Use migrations for schema changes.
8. Do not commit secrets.
9. Add structured logging.
10. Keep API versioned.

## 9. Report Rules

Every major finding should follow:

```text
Finding
Why it matters
Evidence
Timestamp/source
Confidence
Suggested improvement
```

Example:

```text
Finding:
The candidate demonstrated practical Random Forest experience.

Evidence:
Interview answer discussing model selection and evaluation.

Timestamp:
12:34–13:48

Confidence:
0.91

Improvement:
Add the evaluation metric and validation approach when explaining the project.
```

## 10. Ethical Product Boundary

The system should help people understand interview evidence and improve interview performance. It should not claim to know a candidate's character, personality, honesty, intelligence, or future job performance from a face or video.

The strongest product differentiator is therefore **evidence-grounded multimodal AI**, not an arbitrary "AI hiring score."
