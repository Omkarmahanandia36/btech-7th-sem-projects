import pytest
from backend.app.ai.resume_parser import ResumeParser
from backend.app.ai.jd_parser import JobDescriptionParser
from backend.app.ai.nlp_analyzer import NLPAnalyzer
from backend.app.ai.qa_segmenter import QASegmenter
from backend.app.ai.alignment_engine import MultimodalAlignmentEngine
from backend.app.ai.scoring_engine import ScoringEngine

def test_resume_parser():
    parser = ResumeParser()
    text = """
    Jane Doe
    Senior Software Engineer
    
    Technical Skills:
    Python, FastAPI, Docker, Kubernetes, PostgreSQL, Kafka, PyTorch
    
    Work Experience:
    - Led microservices transition reducing latency by 45%
    - Scaled real-time processing to 100k DAU
    """
    res = parser.parse_text(text)
    assert "Languages" in res["skills"] or "Frameworks" in res["skills"]
    assert len(res["metrics"]) > 0
    assert "45%" in res["metrics"][0]

def test_jd_parser():
    parser = JobDescriptionParser()
    text = """
    Senior Python Engineer
    Requirements:
    - 4+ years of Python and FastAPI
    - Experience with Kafka and Docker
    Preferred:
    - Kubernetes and GraphQL
    """
    res = parser.parse_text(text)
    assert len(res["required_skills"]) > 0

def test_nlp_analyzer():
    analyzer = NLPAnalyzer()
    q = "Explain how you resolved the transaction bottleneck."
    a = "In my last role, our monolith was slow. I decomposed it into FastAPI services and Kafka queues. We achieved a 45% reduction in latency."
    analysis = analyzer.analyze_answer(q, a, 30.0)
    assert analysis["relevance"] > 70.0
    assert "FastAPI" in analysis["technical_terms"] or "Kafka" in analysis["technical_terms"]
    assert len(analysis["strengths"]) > 0

def test_scoring_engine():
    scorer = ScoringEngine()
    resume_data = {"skills": {"Languages": ["Python"]}}
    jd_data = {"required_skills": ["Python"]}
    qa_analysis = [{
        "analysis": {
            "relevance": 90.0,
            "completeness": 85.0,
            "structure": 88.0,
            "technical_evidence": 92.0,
            "evidence_density": 85.0,
            "communication": 88.0
        }
    }]
    vision = {"camera_framing_score": 90.0, "lighting_quality_score": 90.0, "gaze_consistency_pct": 90.0, "posture_stability_pct": 90.0}
    findings = [{"status": "Supported", "resume_claim": "Python", "confidence": 0.9}]
    
    scores = scorer.compute_scores(resume_data, jd_data, qa_analysis, vision, findings)
    assert scores["overall_score"] > 80.0
    assert "resume_alignment" in scores["dimensions"]
