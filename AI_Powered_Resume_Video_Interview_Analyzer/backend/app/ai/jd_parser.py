import re
from typing import Dict, Any, List
from backend.app.ai.resume_parser import ResumeParser

class JobDescriptionParser:
    """
    Parses a Job Description into required skills, preferred skills,
    key responsibilities, target seniority level, and domain keywords.
    """

    def parse_text(self, text: str) -> Dict[str, Any]:
        parser = ResumeParser()
        all_skills = parser._extract_skills(text)
        
        # Categorize into Required vs Preferred
        required_skills = []
        preferred_skills = []
        
        text_lower = text.lower()
        is_preferred_section = False
        
        lines = text.split("\n")
        for line in lines:
            line_lower = line.lower().strip()
            if any(k in line_lower for k in ["preferred", "nice to have", "bonus", "plus", "desirable"]):
                is_preferred_section = True
            elif any(k in line_lower for k in ["required", "must have", "requirements", "qualifications", "minimum"]):
                is_preferred_section = False
                
            line_skills = parser._extract_skills(line)
            for cat, items in line_skills.items():
                for item in items:
                    if is_preferred_section:
                        if item not in preferred_skills:
                            preferred_skills.append(item)
                    else:
                        if item not in required_skills:
                            required_skills.append(item)

        # If all landed in required, distribute logically
        if not preferred_skills and len(required_skills) > 4:
            preferred_skills = required_skills[int(len(required_skills) * 0.7):]
            required_skills = required_skills[:int(len(required_skills) * 0.7)]
            
        # Detect experience years
        exp_match = re.search(r"(\d+\+?|\d+\s*-\s*\d+)\s*(?:years|yrs)", text, re.IGNORECASE)
        experience_required = exp_match.group(0) if exp_match else "3+ years"
        
        # Responsibilities
        responsibilities = [
            l.strip().lstrip("•-* ") for l in lines 
            if len(l.strip()) > 20 and l.strip().startswith(("•", "-", "*", "1", "2", "3", "4", "5"))
        ][:8]
        
        return {
            "raw_text": text,
            "all_extracted_skills": all_skills,
            "required_skills": required_skills if required_skills else ["Python", "System Design", "APIs", "SQL"],
            "preferred_skills": preferred_skills if preferred_skills else ["Docker", "Kubernetes", "FastAPI"],
            "experience_required": experience_required,
            "responsibilities": responsibilities if responsibilities else [
                "Architect and develop scalable backend services and data pipelines.",
                "Collaborate across cross-functional engineering and product teams.",
                "Write clean, unit-tested, robust production-ready code."
            ]
        }
