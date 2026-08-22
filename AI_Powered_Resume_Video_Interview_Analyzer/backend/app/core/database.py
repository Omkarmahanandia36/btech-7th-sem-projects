import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

def create_db_engine():
    db_url = settings.DATABASE_URL
    try:
        # Try connecting with provided URL (MySQL by default)
        engine = create_engine(
            db_url,
            pool_recycle=3600,
            pool_pre_ping=True
        )
        # Test connection
        with engine.connect() as conn:
            logger.info("Successfully connected to MySQL database.")
            return engine
    except Exception as e:
        logger.warning(f"Could not connect to MySQL at {db_url}: {e}")
        logger.info("Falling back to local SQLite database for uninterrupted local runtime.")
        sqlite_url = f"sqlite:///{settings.BASE_DIR}/interview_analyzer.db"
        return create_engine(sqlite_url, connect_args={"check_same_thread": False})

engine = create_db_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
