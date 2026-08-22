import pytest
from backend.app.core.database import SessionLocal, Base, engine
from backend.app.models.schema import ProjectCreate
from backend.app.api.projects import create_project, get_sample_scenarios, load_sample_project, get_project_report, delete_project

def test_api_flow_direct():
    db = SessionLocal()
    try:
        # 1. Samples endpoint
        samples = get_sample_scenarios()
        assert len(samples) >= 3
        assert samples[0]["candidate_name"] == "Alex Morgan"

        # 2. Create project
        payload = ProjectCreate(
            title="Alex Morgan Test Direct",
            candidate_name="Alex Morgan",
            target_role="Senior AI Engineer"
        )
        status = create_project(payload, db)
        assert status.candidate_name == "Alex Morgan"
        assert status.status == "DRAFT"
        project_id = status.id

        # 3. Load sample
        sample_status = load_sample_project("sample-alex-morgan", db)
        assert sample_status.status == "COMPLETED"
        assert sample_status.progress_percentage == 100

        # 4. Get generated report
        report = get_project_report(sample_status.id, db)
        assert report.overall_score > 70.0
        assert report.dimension_scores.resume_alignment > 0
        assert len(report.questions) > 0
        assert len(report.alignment_findings) > 0
        assert len(report.transcript_segments) > 0

        # 5. Delete project
        del_res = delete_project(sample_status.id, db)
        assert del_res["status"] == "success"

        # Clean up first project
        delete_project(project_id, db)
    finally:
        db.close()
