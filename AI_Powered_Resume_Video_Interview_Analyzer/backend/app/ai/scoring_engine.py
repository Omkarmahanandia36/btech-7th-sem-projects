from typing import Dict, Any, List

class ScoringEngine:
    """
    Computes transparent, explainable scores across five core dimensions:
    - Resume-JD Alignment (25%)
    - Answer Quality & Relevance (30%)
    - Technical Evidence & Depth (25%)
    - Communication & Clarity (10%)
    - Presentation & Recording Quality (10%)
    """

    WEIGHTS = {
        "resume_alignment": 0.25,
        "answer_quality": 0.30,
        "technical_evidence": 0.25,
        "communication": 0.10,
        "presentation_quality": 0.10
    }

    def compute_scores(
        self,
        resume_data: Dict[str, Any],
        jd_data: Dict[str, Any],
        qa_analysis: List[Dict[str, Any]],
        vision_signals: Dict[str, Any],
        alignment_findings: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        # 1. Resume Alignment Score
        supported_count = sum(1 for f in alignment_findings if f["status"] == "Supported")
        partial_count = sum(1 for f in alignment_findings if f["status"] == "Partially Supported")
        total_findings = max(1, len(alignment_findings))
        resume_alignment_score = min(96.0, max(50.0, (supported_count * 95.0 + partial_count * 75.0) / total_findings))

        # 2. Answer Quality Score
        if qa_analysis:
            avg_answer_quality = sum(
                (q["analysis"]["relevance"] * 0.4 + q["analysis"]["completeness"] * 0.3 + q["analysis"]["structure"] * 0.3)
                for q in qa_analysis
            ) / len(qa_analysis)
        else:
            avg_answer_quality = 82.0

        # 3. Technical Evidence Score
        if qa_analysis:
            avg_tech_evidence = sum(
                (q["analysis"]["technical_evidence"] * 0.6 + q["analysis"]["evidence_density"] * 0.4)
                for q in qa_analysis
            ) / len(qa_analysis)
        else:
            avg_tech_evidence = 84.0

        # 4. Communication Score
        if qa_analysis:
            avg_comm = sum(q["analysis"]["communication"] for q in qa_analysis) / len(qa_analysis)
        else:
            avg_comm = 80.0

        # 5. Presentation Quality Score
        presentation_score = (
            vision_signals.get("camera_framing_score", 90.0) * 0.3 +
            vision_signals.get("lighting_quality_score", 85.0) * 0.3 +
            vision_signals.get("gaze_consistency_pct", 88.0) * 0.2 +
            vision_signals.get("posture_stability_pct", 92.0) * 0.2
        )

        # Composite overall readiness score
        overall_score = (
            self.WEIGHTS["resume_alignment"] * resume_alignment_score +
            self.WEIGHTS["answer_quality"] * avg_answer_quality +
            self.WEIGHTS["technical_evidence"] * avg_tech_evidence +
            self.WEIGHTS["communication"] * avg_comm +
            self.WEIGHTS["presentation_quality"] * presentation_score
        )

        return {
            "overall_score": round(overall_score, 1),
            "confidence": 0.89,
            "dimensions": {
                "resume_alignment": round(resume_alignment_score, 1),
                "answer_quality": round(avg_answer_quality, 1),
                "technical_evidence": round(avg_tech_evidence, 1),
                "communication": round(avg_comm, 1),
                "presentation_quality": round(presentation_score, 1)
            }
        }
