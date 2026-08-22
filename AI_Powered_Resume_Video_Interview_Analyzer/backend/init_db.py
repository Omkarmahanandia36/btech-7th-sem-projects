import os
import sys

# Ensure parent directory is in sys.path so 'backend' package imports work from any working directory
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import pymysql
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(CURRENT_DIR, ".env")
if not os.path.exists(dotenv_path):
    dotenv_path = os.path.join(PARENT_DIR, ".env")
load_dotenv(dotenv_path)

MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DB = os.getenv("MYSQL_DB", "interview_analyzer")

def init_database():
    print(f"Connecting to MySQL server at {MYSQL_HOST}:{MYSQL_PORT} as '{MYSQL_USER}'...")
    try:
        # 1. Connect without selecting database to create it if needed
        conn = pymysql.connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            charset="utf8mb4"
        )
        with conn.cursor() as cursor:
            print(f"Creating database '{MYSQL_DB}' if not exists...")
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{MYSQL_DB}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        conn.commit()
        conn.close()
        print(f"Database '{MYSQL_DB}' is ready.")

        # 2. Use SQLAlchemy to create all tables
        print("Creating all tables from SQLAlchemy models...")
        from backend.app.core.database import Base, engine
        Base.metadata.create_all(bind=engine)
        print("All tables created successfully:")
        for table_name in Base.metadata.tables.keys():
            print(f"  - {table_name}")
        print("\nMySQL database initialization completed successfully!")

    except pymysql.MySQLError as e:
        print(f"\n[MySQL Error]: {e}")
        print("\nPlease check your credentials in 'backend/.env':")
        print(f"  MYSQL_HOST={MYSQL_HOST}")
        print(f"  MYSQL_USER={MYSQL_USER}")
        print(f"  MYSQL_PASSWORD={'*' * len(MYSQL_PASSWORD) if MYSQL_PASSWORD else '(empty)'}")
        print(f"  MYSQL_DB={MYSQL_DB}")
    except Exception as e:
        import traceback
        print(f"\n[Error]: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    init_database()
