import os
import sys

# Ensure root directory is in sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = CURRENT_DIR
BACKEND_DIR = os.path.dirname(APP_DIR)
ROOT_DIR = os.path.dirname(BACKEND_DIR)

for path in [ROOT_DIR, BACKEND_DIR, APP_DIR]:
    if path not in sys.path:
        sys.path.insert(0, path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.app.core.config import settings
from backend.app.api.projects import router as projects_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Multimodal evidence-grounded AI analyzer for resumes and video interviews.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(projects_router, prefix=settings.API_V1_STR)

# Static file serving for uploads
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

@app.get("/")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "online",
        "api_docs": "/docs",
        "version": "1.0.0",
        "design_theme": "Claymorphism Dynamic UI/UX",
        "database": "MySQL / Active"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
