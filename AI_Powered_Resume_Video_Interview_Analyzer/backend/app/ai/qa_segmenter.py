import re
from typing import List, Dict, Any

class QASegmenter:
    """
    Segments a timestamped transcript into discrete Question and Answer units.
    """

    def segment(self, transcript_segments: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        qa_pairs = []
        current_question = None
        current_answer_chunks = []
        question_counter = 1

        for seg in transcript_segments:
            text = seg["text"].strip()
            speaker = seg.get("speaker", "Candidate")
            is_question = (
                speaker.lower() in ["interviewer", "recruiter"] 
                or text.endswith("?") 
                or any(text.lower().startswith(q) for q in ["can you", "could you", "tell me", "how do", "why did", "what was", "describe", "walk us through"])
            )

            if is_question:
                # If there's an existing accumulated question & answer, save it
                if current_question and current_answer_chunks:
                    qa_pairs.append(self._build_qa_pair(question_counter, current_question, current_answer_chunks))
                    question_counter += 1
                    current_answer_chunks = []
                
                current_question = seg
            else:
                if current_question is None:
                    # Initial greeting / statement
                    current_question = {
                        "speaker": "Interviewer",
                        "start_time": seg["start_time"],
                        "end_time": seg["start_time"] + 2.0,
                        "text": "Tell us about your background and technical journey."
                    }
                current_answer_chunks.append(seg)

        # Save final pair
        if current_question and current_answer_chunks:
            qa_pairs.append(self._build_qa_pair(question_counter, current_question, current_answer_chunks))

        # Fallback if no questions detected
        if not qa_pairs and transcript_segments:
            qa_pairs.append({
                "question_number": 1,
                "question": {
                    "text": "Technical Presentation & Project Deep Dive",
                    "start_time": transcript_segments[0]["start_time"],
                    "end_time": transcript_segments[0]["start_time"] + 4.0,
                    "category": "Architecture & Experience"
                },
                "answer": {
                    "text": " ".join(s["text"] for s in transcript_segments),
                    "start_time": transcript_segments[0]["start_time"],
                    "end_time": transcript_segments[-1]["end_time"]
                }
            })

        return qa_pairs

    def _build_qa_pair(self, num: int, q_seg: Dict[str, Any], a_segs: List[Dict[str, Any]]) -> Dict[str, Any]:
        q_text = q_seg["text"]
        cat = "Technical Architecture" if any(w in q_text.lower() for w in ["architecture", "scale", "microservice", "system", "database"]) else (
            "Machine Learning / AI" if any(w in q_text.lower() for w in ["machine learning", "ai", "model", "scikit", "pytorch"]) else (
                "Leadership & Culture" if any(w in q_text.lower() for w in ["mentor", "lead", "team", "conflict", "quality"]) else "Technical Experience"
            )
        )
        
        full_answer_text = " ".join(s["text"] for s in a_segs).strip()
        ans_start = a_segs[0]["start_time"]
        ans_end = a_segs[-1]["end_time"]

        return {
            "question_number": num,
            "question": {
                "text": q_text,
                "start_time": q_seg["start_time"],
                "end_time": q_seg["end_time"],
                "category": cat
            },
            "answer": {
                "text": full_answer_text,
                "start_time": ans_start,
                "end_time": ans_end
            }
        }
