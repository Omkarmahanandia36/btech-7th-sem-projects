# 📖 Standard Operating Procedure (SOP)
## B.Tech Major Project Code Submission & Git Workflow

**Document Version:** 1.0  
**Last Updated:** August 2026  
**Institution:** CGC Jhanjeri, CSE-APEX  
**Coordinators:** Mr. Omkar Mahanandia & Mr. Amit Sandhu  

---

## 📋 Table of Contents
1. [Overview & Objectives](#1-overview--objectives)
2. [Repository Setup](#2-repository-setup)
3. [Group & Project Structure](#3-group--project-structure)
4. [Git Workflow & Branching Strategy](#4-git-workflow--branching-strategy)
5. [Commit Guidelines](#5-commit-guidelines)
6. [Pull Request (PR) Process](#6-pull-request-pr-process)
7. [Code Review Standards](#7-code-review-standards)
8. [Weekly Submission Requirements](#8-weekly-submission-requirements)
9. [File & Folder Structure](#9-file--folder-structure)
10. [Documentation Standards](#10-documentation-standards)
11. [Plagiarism & Integrity Checks](#11-plagiarism--integrity-checks)
12. [Troubleshooting & FAQ](#12-troubleshooting--faq)
13. [Penalties & Compliance](#13-penalties--compliance)
14. [Summary & Support](#14-summary--support)

---

## 1. Overview & Objectives

### Purpose
This SOP establishes a standardized workflow for all B.Tech Major Project groups to:
- Ensure clean, trackable code history
- Maintain collaborative development standards
- Prevent merge conflicts and code loss
- Enable transparent progress tracking
- Facilitate fair evaluation across all groups

### Key Principles
- **One repo per group** – 14 groups = 14 separate repositories
- **All 4 members commit regularly** – Individual accountability
- **Clear commit history** – No monolithic commits
- **Code review before merge** – Quality assurance
- **Weekly submissions** – Consistent progress tracking
- **Zero plagiarism tolerance** – Original work only

---

## 2. Repository Setup

### Step 1: Create Repository (ONE PER GROUP)
Each group gets one GitHub/GitLab repository with a standardized naming convention:

- **Format:** `BTech_Major_Projects_2026_GROUP_[N]_[TEAM_NAME]`
- **Examples:**
  - `BTech_Major_Projects_2026_GROUP_01_Smart_Attendance`
  - `BTech_Major_Projects_2026_GROUP_02_Cybersecurity_Threat_Detection`
  - `BTech_Major_Projects_2026_GROUP_03_Music_Genre_Classification`

### Step 2: Repository Settings
- **Visibility:** Public (recommended for portfolio) or Private
- **Collaborators:** Add all group members as Collaborators (at least Maintain access)
- **Branch Protection:** Enable on `main` branch (require PR reviews before merge)

#### Recommended branch protection rules:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Dismiss stale pull request approvals
- Require code review from at least 1 member
- Require branches to be up to date before merging

### Step 3: Initial Setup Commands
Team Lead executes these commands (other members clone after):

```bash
# Create local directory
mkdir BTech_Major_Projects_2026_GROUP_01_Smart_Attendance
cd BTech_Major_Projects_2026_GROUP_01_Smart_Attendance

# Initialize git
git init
git add .
git commit -m "Initial commit: Project setup - Group 1"
git branch -M main

# Add remote (replace URL with your repo URL)
git remote add origin https://github.com/username/BTech_Major_Projects_2026_GROUP_01_Smart_Attendance.git
git push -u origin main

# Verify
git remote -v
```

### Step 4: Team Members Clone Repository

```bash
# Each member clones the repository
git clone https://github.com/username/BTech_Major_Projects_2026_GROUP_01_Smart_Attendance.git
cd BTech_Major_Projects_2026_GROUP_01_Smart_Attendance

# Verify remote
git remote -v
```

---

## 3. Group & Project Structure

### Group Composition (14 Groups)

| Group # | Project Title | Student Names | Roll Numbers / URN |
| :---: | | | |
| 1 | Smart Attendance System Using Facial Recognition | Ajay Kumar + Team | 2420643 |
| 2 | AI-Based Cybersecurity Threat Detection System | Shivansh Yadav + Team | 2330654 |
| 3 | AI-Based Music Genre Classification System | Abrar Shabir Dar + Team | 2420626 |
| 4 | Real-Time Sign Language Translator | Janvi Rawat + Team | 2330623 |
| 5 | AI-Based Customer Churn Prediction Model | Vishesh Kumar + Team | 2330666 |
| 6 | AI-Powered Voice Assistant for Visually Impaired | Abhinav Pandey + Team | 2330605 |
| 7 | AI-Powered Code Plagiarism Detector for Programming Assignments | Vaishnavee + Team | 2330661 |
| 8 | AI-Based Credit Card Fraud Detection System | Nancy Garg + Team | 2330638 |
| 9 | Smart Chatbot for Mental Health Support | Divpreet Kaur + Team | 2330614 |
| 10 | Automated Resume-Based Skill Gap Identifier | Kratika Gupta + Team | 2330630 |
| 11 | AI-Based Weather Prediction Model for Local Regions | Vibhuti + Team | 2330663 |
| 12 | AI-Driven Fake Job Posting Detector | Raj Pratap Singh Tomar + Team | 2330646 |
| 13 | AI-Powered Resume Video Interview Analyzer | Harsh Raj + Team | 2330618 |
| 14 | AI-Based Smart Grocery List Generator (from Receipts) | Pragyansh Chauhan + Team | 2330641 |

### Member Roles (Define in README)

| Role | Responsibility | Examples |
| | | |
| **Team Lead** | Repository management, overall coordination, final reviews | Merging PRs, release management |
| **Core Developer 1** | Backend / Model development | ML model, API, database |
| **Core Developer 2** | Frontend / System integration | UI, deployment, integration |
| **Documentation Officer** | README, research paper, technical reports | Setup guides, methodology docs |

*Note: Roles can rotate, but each member must contribute substantively in at least 2 areas.*

---

## 4. Git Workflow & Branching Strategy

### Branching Strategy: Git Flow

```text
main (production-ready)
  ↑
  ├── develop (integration branch)
  │     ↑
  │     ├── feature/model-training (individual features)
  │     ├── feature/ui-dashboard
  │     ├── feature/api-endpoint
  │     └── feature/data-preprocessing
  │
  └── hotfix/urgent-bug (emergency fixes)
```

### Branch Naming Convention

**Format:** `<type>/<description>`

```bash
# Feature branches (NEW WORK)
feature/model-training
feature/data-preprocessing
feature/api-endpoint
feature/ui-dashboard

# Bug fix branches
bugfix/fix-memory-leak
bugfix/resolve-crash

# Documentation branches
docs/api-documentation
docs/setup-guide

# Hotfix branches (URGENT)
hotfix/critical-security-issue
```

### Workflow: Step-by-Step

#### Week 1 (Topic Finalization Phase)
```bash
# 1. Team Lead creates develop branch from main
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop

# 2. Each member creates a feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/data-exploration
git push -u origin feature/data-exploration

# 3. Make changes, commit, and push
git add .
git commit -m "feat: initial data exploration script"
git push origin feature/data-exploration

# 4. Create Pull Request (PR) on GitHub
# → Open PR from feature/data-exploration → develop
# → Add description, screenshots if needed
# → Request review from team lead
# → Wait for approval

# 5. After approval, merge PR on GitHub
# → Merge and delete branch
```

#### Weeks 2–8 (Ongoing Development)
```bash
# At START of each work session
git checkout develop
git pull origin develop      # Stay updated with team work

# Create feature branch for this week's task
git checkout -b feature/model-training
git push -u origin feature/model-training

# Work on feature
git add .
git commit -m "feat: add baseline model training script"
git push origin feature/model-training

# Create PR and get approval
# → After approval, merge to develop
```

### Branch Protection Rules (ENFORCED)
- Require at least 1 team member's approval on PRs
- Require status checks / CI pipeline to pass
- Automatically delete branch after merge
- Require branches to be up to date before merging

---

## 5. Commit Guidelines

### Commit Message Format
```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Example Commits

#### GOOD Commits:
```bash
git commit -m "feat(model): add CNN architecture for image classification"
git commit -m "fix(preprocessing): handle missing values in dataset"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor(api): optimize database query performance"
```

#### BAD Commits (STRICTLY PROHIBITED):
```bash
git commit -m "work"
git commit -m "update"
git commit -m "fixed stuff"
git commit -m "asdf"
```

### Commit Types

| Type | Description | Example |
| :---: | | |
| `feat` | New feature or functionality | `feat(model): add LSTM layer` |
| `fix` | Bug fix | `fix(preprocessing): handle NaN values` |
| `docs` | Documentation changes | `docs: add API documentation` |
| `refactor` | Code restructuring (no feature change) | `refactor: improve code readability` |
| `perf` | Performance improvements | `perf(model): optimize inference time` |
| `test` | Adding / updating tests | `test: add unit tests for data loader` |
| `chore` | Build, dependency updates, configuration | `chore: update requirements.txt` |

### Commit Frequency

| Phase | Recommended Frequency | Expected Commits / Week |
| | :---: | :---: |
| **Phase 1 (Week 1)** | 2–3 per day | 10–15 commits |
| **Phase 2 (Week 2)** | 2–3 per day | 10–15 commits |
| **Phase 3 (Weeks 3–4)** | 1–2 per day | 5–10 commits / week |
| **Phase 4 (Weeks 5–6)** | 1–2 per day | 5–10 commits / week |
| **Phase 5–6 (Weeks 7–8)** | Daily | 5–7 commits / week |

*Minimum Requirement: At least 5 commits per member per week (minimum 20 commits/group/week).*

### Atomic Commits
Each commit should be logically independent and atomic:

```bash
# GOOD (Atomic)
Commit 1: feat: add data loader function
Commit 2: test: add unit tests for data loader
Commit 3: docs: add data loader documentation

# BAD (Monolithic)
Commit 1: Added data loader, tests, docs, fixed bugs, refactored API
```

---

## 6. Pull Request (PR) Process

### Step 1: Ensure Your Branch is Up to Date
```bash
git checkout develop
git pull origin develop
git checkout feature/your-feature
git merge develop
git push origin feature/your-feature
```

### Step 2: Open PR on GitHub
1. Navigate to repository on GitHub
2. Click **"Compare & pull request"**
3. Fill in PR details template:

```markdown
## 📝 PR Title
feat(model): Add CNN-based image classifier

## 📖 Description
- Added CNN architecture for image classification
- Implemented data augmentation pipeline
- Achieved 95% validation accuracy

## 🔗 Related Issue
Closes #12

## 🧪 Testing
- [x] Unit tests added
- [x] Integration tested
- [x] Manual testing completed

## 📊 Changes Summary
- Added 3 new files: `model.py`, `train.py`, `evaluate.py`
- Modified 1 file: `data_loader.py`

## 🎯 Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
```

### Step 3: Request Review & Approval
- Add assignees (Team Lead)
- Add labels (`model-training`, `frontend`, `documentation`)
- Reviewer verifies code using checklist before merging.

---

## 7. Code Review Standards

### Reviewer Checklist

| Category | Verification Item |
| | |
| **Code Quality** | Readable, well-commented, PEP 8 compliance, no duplicate code (DRY) |
| **Functionality** | Expected behavior, edge cases handled, error handling, no hardcoded secrets |
| **Testing** | Unit tests present, test coverage adequate |
| **Documentation** | Clear docstrings, README updated if required |
| **Security** | No exposed API keys, passwords, or vulnerable queries |
| **Performance** | Efficient memory and compute usage |

### Reviewer & Author Interaction Template

#### Reviewer Comment:
```markdown
### Issue: Variable naming unclear
**Location:** `model.py`, line 45  
**Severity:** Minor  
**Suggestion:** Rename `x` to `input_features`

```python
# Before
x = np.array([1, 2, 3])

# After
input_features = np.array([1, 2, 3])
```
```

#### Author Response:
```markdown
### Response: Variable naming unclear
Fixed in commit `abc123def456`. Changed `x` to `input_features` for clarity.
```

---

## 8. Weekly Submission Requirements

**Submission Deadline:** Every Friday at 11:59 PM IST

| Metric | Requirement | Evidence |
| | | |
| **Commits** | Min. 20 commits total (5 per member) | Git Log History |
| **PR Submissions** | Min. 4–5 PRs merged to `develop` | GitHub PR History |
| **Code Quality** | Reviewed by at least 1 peer | Visible PR Review Comments |
| **Weekly Report** | Progress tracking document updated | `WEEKLY_SUBMISSIONS.md` |
| **Documentation** | README updated weekly | Commit timestamps |

### Weekly Submission Log Template (`WEEKLY_SUBMISSIONS.md`)

```markdown
# Weekly Submissions Tracking

## Week 1 (August 2026)
### Group: GROUP_01_Smart_Attendance
**Team Lead:** Ajay Kumar

### Commits Summary
- Total commits: 18
- Ajay Kumar: 5 commits
- Member 2: 4 commits
- Member 3: 5 commits
- Member 4: 4 commits

### PRs Merged
1. `feat(data)`: Data exploration script - Merged
2. `feat(preprocessing)`: Data cleaning pipeline - Merged
3. `feat(model)`: Initial architecture design - Merged

### Deliverables Completed
- [x] Topic finalization
- [x] Literature review (5 papers reviewed)
- [x] Dataset identified
- [x] System architecture design

### Challenges & Blockers
- **Challenge:** Large dataset size
- **Solution:** Implemented data subsetting & streaming loader

### Next Week Goals
- Complete data preprocessing
- Implement baseline CNN model
- Achieve 80%+ validation accuracy
```

---

## 9. File & Folder Structure

### Standardized Project Layout (MANDATORY)

```text
BTech_Major_Projects_2026_GROUP_01_Smart_Attendance/
│
├── README.md                     # Main project documentation
├── WEEKLY_SUBMISSIONS.md         # Weekly progress tracking
├── CONTRIBUTING.md               # Contribution guidelines
├── LICENSE                       # MIT or Apache 2.0
├── .gitignore                    # Ignore large files, credentials
│
├── .github/
│   └── workflows/
│       └── ci.yml                # Automated CI pipeline
│
├── docs/                         # Documentation
│   ├── architecture.md           # System architecture details
│   ├── dataset_description.md    # Dataset metadata
│   ├── methodology.md            # Research methodology
│   ├── results.md                # Experimental findings
│   └── diagrams/                 # Architecture diagrams
│
├── src/                          # Source code
│   ├── data/                     # Data processing code
│   │   ├── loader.py
│   │   └── preprocessor.py
│   ├── model/                    # ML / DL models
│   │   ├── architecture.py
│   │   ├── trainer.py
│   │   └── evaluator.py
│   ├── utils/                    # Helper scripts
│   │   ├── helpers.py
│   │   └── logger.py
│   └── api/                      # Web / API Endpoints
│       └── server.py
│
├── tests/                        # Automated unit tests
│   ├── test_data_loader.py
│   └── test_model.py
│
├── notebooks/                    # Jupyter notebooks (EDA)
│   └── 01_eda.ipynb
│
├── data/                         # Data directory (Ignored in Git)
│   ├── raw/
│   └── processed/
│
├── models/                       # Model weights (Ignored in Git)
│   └── baseline_model.pth
│
├── results/                      # Experimental plots & metrics
│   ├── metrics.json
│   └── plots/
│
├── requirements.txt              # Dependencies
└── config.yaml                   # Configuration file
```

### Standard `.gitignore` Template

```text
# Python
__pycache__/
*.py[cod]
*$py.class
venv/
env/
dist/
build/
*.egg-info/

# Jupyter Notebook
.ipynb_checkpoints

# IDE & OS
.vscode/
.idea/
.DS_Store
Thumbs.db

# Data & Model Weights (LARGE FILES)
data/raw/*
data/processed/*
*.csv
*.pth
*.h5
*.joblib
*.pkl

# Logs & Credentials
logs/
*.log
.env
secrets/
config_private.yaml
```

---

## 10. Documentation Standards

### README.md Requirements (Minimum 1000 words)

Each group repository `README.md` must include:
1. **Project Title & Overview**
2. **Table of Contents**
3. **Features List**
4. **System Architecture (Diagram & Flow)**
5. **Dataset Details & Train/Val/Test Split**
6. **Installation & Setup Instructions**
7. **Usage & Execution Commands**
8. **Results & Evaluation Metrics Table**
9. **Methodology & Model Description**
10. **Team Member Contributions & Roles**
11. **References & Citations (IEEE Format)**
12. **License Information**

---

## 11. Plagiarism & Integrity Checks

### Plagiarism Guidelines

| Classification | Actions / Code Practices |
| :---: | |
| **PROHIBITED** | Copying code from external repos without attribution, direct copying from peers, submitting non-original work |
| **ALLOWED** | Utilizing standard open-source libraries (`numpy`, `torch`, `scikit-learn`), adapting tutorials with clear citations |

### Integrity Pledge Template

```markdown
## Integrity Pledge
We, the undersigned, affirm that:
1. This project represents our original work.
2. We have properly cited all references and third-party code snippets.
3. We understand that plagiarism will result in zero marks and disciplinary action.
4. Each member has contributed individually to the repository.

Signed:
- Ajay Kumar (Lead): ______________  Date: __________
- Member 2: ______________________  Date: __________
- Member 3: ______________________  Date: __________
- Member 4: ______________________  Date: __________

Instructor Verification:
Mr. Omkar Mahanandia: _____________  Date: __________
Mr. Amit Sandhu: __________________  Date: __________
```

---

## 12. Troubleshooting & FAQ

| # | Question | Solution Command / Procedure |
| :---: | | |
| **Q1** | How do I undo my last commit? | `git reset --soft HEAD~1` (keep changes) or `git reset --hard HEAD~1` (discard changes) |
| **Q2** | How do I update my feature branch with develop? | `git checkout feature/branch` → `git fetch origin` → `git merge origin/develop` |
| **Q3** | Accidental push to `main` branch? | `git revert -n HEAD` → `git commit -m "Revert: accidental main push"` → `git push origin main` |
| **Q4** | How do I resolve merge conflicts? | `git pull origin develop` → Open conflicted files → Remove `<<<<<<<` markers → `git add .` → `git commit` |
| **Q5** | Handling large files (>100MB)? | Add file paths to `.gitignore` or configure **Git LFS** (`git lfs track "*.pth"`) |
| **Q6** | How to delete a local / remote branch? | Local: `git branch -d feature/name` \| Remote: `git push origin --delete feature/name` |
| **Q7** | How to check who wrote a specific line? | `git blame path/to/file.py` |

---

## 13. Penalties & Compliance

### Evaluation Matrix

| Aspect | Full Marks (5) | Partial Marks (2–3) | Zero Marks (0) |
| | | | |
| **Commit Frequency** | 5+ commits / member / week | 2–4 commits / week | <2 commits / week |
| **Commit Messages** | Clear, descriptive, atomic | Mostly clear | Vague / monolithic |
| **PR Process** | All PRs reviewed & approved | Minor review gaps | No PRs used |
| **Code Quality** | Clean, well-documented | Minor formatting issues | Unreadable / broken |
| **Branch Strategy** | Git Flow followed | Minor deviations | Directly pushing to main |
| **Plagiarism Check** | 100% original work | <5% cited snippets | Plagiarized code (>30%) |

### Violation Penalty Schedule

| Violation | Penalty Imposed |
| | |
| **Missing Weekly Commits** | -5 marks per week per member |
| **Monolithic / Single Commit** | -2 marks per occurrence |
| **Skipping PR & Review** | -10 marks |
| **Poor Documentation** | -5 marks |
| **Branch Protection Violation** | -3 marks |
| **Plagiarism Detected** | **Zero marks + Disciplinary Action** |
| **Late Weekly Submission** | -1 mark per day delayed |

---

## 14. Summary & Support

### Quick DOs & DON'Ts

| DOs | DON'Ts |
| | |
| Commit frequently (5+ times/week) | Push directly to `main` branch |
| Use clear, atomic commit messages | Make monolithic single-file commits |
| Create PRs for every single feature | Skip peer code reviews |
| Document setup & API details | Commit credentials, secrets, or large data |
| Test code locally before opening PR | Copy external repos without attribution |

### Support & Contact Escalation

| Issue Category | Contact Person | Target Resolution Time |
| | | |
| **Git / Repository Technical Issues** | Mr. Omkar Mahanandia | 24–48 Hours |
| **Access & Collaboration Support** | Mr. Amit Sandhu | 24 Hours |
| **Academic & Plagiarism Queries** | CSE-APEX Department | 48 Hours |

---

> *"Clean code, clean history, clean collaboration! Don't procrastinate on weekly commits."*
