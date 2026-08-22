-- AI-Powered Resume & Video Interview Analyzer (ClarifyAI)
-- MySQL Schema conforming to Schema.md

CREATE DATABASE IF NOT EXISTS `interview_analyzer` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `interview_analyzer`;

-- 1. users
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(36) PRIMARY KEY,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `name` VARCHAR(255) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. projects
CREATE TABLE IF NOT EXISTS `projects` (
    `id` VARCHAR(36) PRIMARY KEY,
    `user_id` VARCHAR(36) NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT 'Untitled Analysis',
    `candidate_name` VARCHAR(255) NULL DEFAULT 'Candidate',
    `target_role` VARCHAR(255) NULL DEFAULT 'Target Role',
    `status` VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    `progress_percentage` INT DEFAULT 0,
    `current_stage_label` VARCHAR(255) DEFAULT 'Initialized',
    `error_message` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `completed_at` DATETIME NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 3. documents
CREATE TABLE IF NOT EXISTS `documents` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `storage_key` VARCHAR(500) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `mime_type` VARCHAR(100) NULL,
    `size_bytes` INT DEFAULT 0,
    `checksum` VARCHAR(64) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 4. resume_profiles
CREATE TABLE IF NOT EXISTS `resume_profiles` (
    `id` VARCHAR(36) PRIMARY KEY,
    `document_id` VARCHAR(36) NOT NULL,
    `raw_text` LONGTEXT NULL,
    `structured_json` JSON NULL,
    FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE CASCADE
);

-- 5. job_requirements
CREATE TABLE IF NOT EXISTS `job_requirements` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `raw_text` LONGTEXT NULL,
    `structured_json` JSON NULL,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 6. interviews
CREATE TABLE IF NOT EXISTS `interviews` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `video_document_id` VARCHAR(36) NULL,
    `duration_seconds` FLOAT DEFAULT 0.0,
    `fps` FLOAT DEFAULT 30.0,
    `width` INT DEFAULT 1280,
    `height` INT DEFAULT 720,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`video_document_id`) REFERENCES `documents`(`id`) ON DELETE SET NULL
);

-- 7. transcript_segments
CREATE TABLE IF NOT EXISTS `transcript_segments` (
    `id` VARCHAR(36) PRIMARY KEY,
    `interview_id` VARCHAR(36) NOT NULL,
    `speaker` VARCHAR(50) DEFAULT 'Candidate',
    `start_time` FLOAT NOT NULL,
    `end_time` FLOAT NOT NULL,
    `text` TEXT NOT NULL,
    FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON DELETE CASCADE
);

-- 8. questions
CREATE TABLE IF NOT EXISTS `questions` (
    `id` VARCHAR(36) PRIMARY KEY,
    `interview_id` VARCHAR(36) NOT NULL,
    `question_number` INT NOT NULL,
    `start_time` FLOAT NOT NULL,
    `end_time` FLOAT NOT NULL,
    `text` TEXT NOT NULL,
    `category` VARCHAR(100) DEFAULT 'Technical / Experience',
    FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON DELETE CASCADE
);

-- 9. answers
CREATE TABLE IF NOT EXISTS `answers` (
    `id` VARCHAR(36) PRIMARY KEY,
    `question_id` VARCHAR(36) NOT NULL,
    `start_time` FLOAT NOT NULL,
    `end_time` FLOAT NOT NULL,
    `text` LONGTEXT NOT NULL,
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE
);

-- 10. skills
CREATE TABLE IF NOT EXISTS `skills` (
    `id` VARCHAR(36) PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `normalized_name` VARCHAR(100) NOT NULL,
    `category` VARCHAR(100) DEFAULT 'Technical'
);

-- 11. skill_evidence
CREATE TABLE IF NOT EXISTS `skill_evidence` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `skill_name` VARCHAR(100) NOT NULL,
    `source_type` VARCHAR(50) NOT NULL,
    `source_id` VARCHAR(36) NULL,
    `evidence_text` TEXT NOT NULL,
    `start_time` FLOAT NULL,
    `end_time` FLOAT NULL,
    `confidence` FLOAT DEFAULT 1.0,
    `demonstration_level` VARCHAR(50) DEFAULT 'Demonstrated',
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 12. vision_signals
CREATE TABLE IF NOT EXISTS `vision_signals` (
    `id` VARCHAR(36) PRIMARY KEY,
    `interview_id` VARCHAR(36) NOT NULL,
    `timestamp` FLOAT NOT NULL,
    `head_pose` JSON NULL,
    `gaze_direction` JSON NULL,
    `posture` JSON NULL,
    `person_present` BOOLEAN DEFAULT TRUE,
    `frame_quality` FLOAT DEFAULT 0.9,
    `lighting_quality` FLOAT DEFAULT 0.85,
    FOREIGN KEY (`interview_id`) REFERENCES `interviews`(`id`) ON DELETE CASCADE
);

-- 13. answer_scores
CREATE TABLE IF NOT EXISTS `answer_scores` (
    `id` VARCHAR(36) PRIMARY KEY,
    `answer_id` VARCHAR(36) NOT NULL,
    `relevance` FLOAT DEFAULT 80.0,
    `completeness` FLOAT DEFAULT 80.0,
    `technical_evidence` FLOAT DEFAULT 80.0,
    `structure` FLOAT DEFAULT 80.0,
    `evidence_density` FLOAT DEFAULT 80.0,
    `communication` FLOAT DEFAULT 80.0,
    `confidence` FLOAT DEFAULT 0.85,
    `explanation` JSON NULL,
    `star_structure` JSON NULL,
    `strengths` JSON NULL,
    `improvements` JSON NULL,
    FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON DELETE CASCADE
);

-- 14. alignment_findings
CREATE TABLE IF NOT EXISTS `alignment_findings` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `resume_claim` TEXT NOT NULL,
    `interview_evidence` TEXT NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `confidence` FLOAT DEFAULT 0.85,
    `evidence_start` FLOAT NULL,
    `evidence_end` FLOAT NULL,
    `recommendation` TEXT NULL,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 15. reports
CREATE TABLE IF NOT EXISTS `reports` (
    `id` VARCHAR(36) PRIMARY KEY,
    `project_id` VARCHAR(36) NOT NULL,
    `overall_score` FLOAT DEFAULT 0.0,
    `confidence` FLOAT DEFAULT 0.88,
    `dimension_scores` JSON NULL,
    `summary` JSON NULL,
    `strengths` JSON NULL,
    `improvements` JSON NULL,
    `recommendations` JSON NULL,
    `grounding` JSON NULL,
    `cv_presentation_summary` JSON NULL,
    `communication_metrics` JSON NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);
