import os
import urllib.parse
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import List

# Load environment variables from backend/.env if available
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(BASE_DIR, "backend", ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
elif os.path.exists(os.path.join(BASE_DIR, ".env")):
    load_dotenv(os.path.join(BASE_DIR, ".env"))

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI-Powered Resume Video Interview Analyzer"
    API_V1_STR: str = "/api/v1"
    
    # Database Configuration (MySQL)
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_PORT: int = int(os.getenv("MYSQL_PORT", 3306))
    MYSQL_USER: str = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "")
    MYSQL_DB: str = os.getenv("MYSQL_DB", "interview_analyzer")
    
    # Safely URL-encode user and password for special characters (like '@', '#', '$')
    @property
    def DATABASE_URL(self) -> str:
        custom_url = os.getenv("DATABASE_URL")
        if custom_url:
            return custom_url
        encoded_user = urllib.parse.quote_plus(self.MYSQL_USER)
        encoded_password = urllib.parse.quote_plus(self.MYSQL_PASSWORD)
        return f"mysql+pymysql://{encoded_user}:{encoded_password}@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"
    
    # Upload Directories
    BASE_DIR: str = BASE_DIR
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "uploads")
    SAMPLE_DATA_DIR: str = os.path.join(BASE_DIR, "sample_data")
    
    # Allowed File Extensions & Limits
    ALLOWED_RESUME_EXTS: List[str] = [".pdf", ".docx", ".txt"]
    ALLOWED_VIDEO_EXTS: List[str] = [".mp4", ".webm", ".mov", ".mkv"]
    MAX_FILE_SIZE_MB: int = 250
    
    # CORS
    CORS_ORIGINS: List[str] = ["*"]
    
    class Config:
        case_sensitive = True

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.SAMPLE_DATA_DIR, exist_ok=True)
