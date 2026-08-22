import re
import os
from typing import Dict, Any, List

class ResumeParser:
    """
    Parses PDF, DOCX, or text resumes into structured sections, entities,
    normalized technical skills, and quantified metrics.
    """

    KNOWN_SKILLS_TAXONOMY = {
        "Languages": ["Python", "TypeScript", "JavaScript", "Java", "Go", "Golang", "C++", "C#", "Rust", "SQL", "HTML/CSS"],
        "Frameworks": ["React", "Next.js", "Node.js", "FastAPI", "Django", "Flask", "Spring Boot", "Express", "Vue", "Tailwind CSS"],
        "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "GCP", "Azure", "Terraform", "CI/CD", "GitHub Actions", "Kafka", "RabbitMQ"],
        "AI & Machine Learning": ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "LLMs", "RAG", "OpenCV", "MediaPipe", "Whisper", "LangChain", "Vector Databases", "Embeddings"],
        "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "pgvector"],
        "Architecture & Methodologies": ["Microservices", "REST APIs", "GraphQL", "Agile", "System Design", "TDD", "Clean Architecture"]
    }

    def parse_file(self, file_path: str) -> Dict[str, Any]:
        raw_text = self._extract_text(file_path)
        return self.parse_text(raw_text)

    def parse_text(self, text: str) -> Dict[str, Any]:
        sections = self._split_sections(text)
        skills = self._extract_skills(text)
        metrics = self._extract_metrics(text)
        projects = self._extract_projects(sections.get("projects", "") or text)
        experience = self._extract_experience(sections.get("experience", "") or text)
        education = self._extract_education(sections.get("education", "") or text)
        
        return {
            "raw_text": text,
            "sections": sections,
            "skills": skills,
            "metrics": metrics,
            "projects": projects,
            "experience": experience,
            "education": education,
            "total_skills_count": sum(len(items) for items in skills.values())
        }

    def _extract_text(self, file_path: str) -> str:
        if not os.path.exists(file_path):
            return ""
        
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf":
            try:
                import pypdf
                reader = pypdf.PdfReader(file_path)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() or "" + "\n"
                return text.strip()
            except Exception:
                pass
        elif ext == ".docx":
            try:
                import docx
                doc = docx.Document(file_path)
                return "\n".join([p.text for p in doc.paragraphs]).strip()
            except Exception:
                pass
                
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read().strip()
        except Exception:
            return ""

    def _split_sections(self, text: str) -> Dict[str, str]:
        sections: Dict[str, str] = {}
        headers = [
            ("summary", r"(summary|objective|profile|about me)"),
            ("skills", r"(technical skills|skills|technologies|proficiencies)"),
            ("experience", r"(work experience|experience|employment history|work history)"),
            ("projects", r"(projects|key projects|notable projects|personal projects)"),
            ("education", r"(education|academic background|qualifications)"),
            ("certifications", r"(certifications|licenses|awards)")
        ]
        
        lines = text.split("\n")
        current_section = "general"
        sections[current_section] = []

        for line in lines:
            line_str = line.strip()
            matched_header = None
            for key, pattern in headers:
                if re.match(r"^#*\s*" + pattern + r"[:\s]*$", line_str, re.IGNORECASE):
                    matched_header = key
                    break
            
            if matched_header:
                current_section = matched_header
                if current_section not in sections:
                    sections[current_section] = []
            else:
                if current_section in sections:
                    sections[current_section].append(line)
        
        return {k: "\n".join(v).strip() for k, v in sections.items() if v}

    def _extract_skills(self, text: str) -> Dict[str, List[str]]:
        extracted = {}
        text_lower = " " + text.lower() + " "
        
        for category, skill_list in self.KNOWN_SKILLS_TAXONOMY.items():
            found = []
            for skill in skill_list:
                escaped = re.escape(skill.lower())
                pattern = rf"(?:\b|(?<=[^a-zA-Z0-9])){escaped}(?:\b|(?=[^a-zA-Z0-9]))"
                if re.search(pattern, text_lower):
                    found.append(skill)
            if found:
                extracted[category] = found
        return extracted

    def _extract_metrics(self, text: str) -> List[str]:
        # Captures percentages, latency, currency, scale metrics (e.g. 87%, 45% faster, $1.2M, 500k users)
        patterns = [
            r"([+\-]?\d+(?:\.\d+)?%\s*(?:increase|reduction|improvement|accuracy|faster|growth|decrease)?)",
            r"(?:reduced|improved|increased|accelerated|optimized)\s+[\w\s]{1,30}\s+by\s+\d+(?:\.\d+)?%",
            r"\$\d+(?:\.\d+)?(?:k|M|B)?(?:\s*arr|\s*revenue|\s*budget)?",
            r"\d+(?:k|M|\+)?\s*(?:users|DAU|MAU|requests|rps|qps|events|records|stars)"
        ]
        results = []
        for pat in patterns:
            matches = re.findall(pat, text, re.IGNORECASE)
            for m in matches:
                clean_m = m.strip() if isinstance(m, str) else m[0].strip()
                if clean_m and len(clean_m) > 1 and clean_m not in results:
                    results.append(clean_m)
        return results[:10]

    def _extract_projects(self, text: str) -> List[Dict[str, Any]]:
        # Split project bullets / headings
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        projects = []
        current_project = None
        
        for line in lines:
            if len(line) < 60 and not line.startswith(("-", "*", "•")):
                if current_project:
                    projects.append(current_project)
                current_project = {"title": line, "description": []}
            elif current_project:
                current_project["description"].append(line)
                
        if current_project:
            projects.append(current_project)
            
        return projects[:6]

    def _extract_experience(self, text: str) -> List[Dict[str, Any]]:
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        return [{"entry": l} for l in lines[:8] if len(l) > 10]

    def _extract_education(self, text: str) -> List[str]:
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        edu_keywords = ["university", "college", "bachelor", "master", "phd", "b.s.", "m.s.", "b.tech", "m.tech", "degree"]
        return [l for l in lines if any(k in l.lower() for k in edu_keywords)][:4]
