# 📖 Standard Operating Procedure (SOP)
## B.Tech Major Project Code Submission & Git Workflow

**Document Version:** 1.0  
**Last Updated:** August 2026  
**Institution:** CGC Jhajjar, CSE-APEX  
**Coordinator:** Mr. Omkar Mahanandia & Mr. Amit Sandhu

---

## 📋 Table of Contents

1. [Overview & Objectives](#overview--objectives)
2. [Repository Setup](#repository-setup)
3. [Group & Project Structure](#group--project-structure)
4. [Git Workflow & Branching Strategy](#git-workflow--branching-strategy)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request (PR) Process](#pull-request-pr-process)
7. [Code Review Standards](#code-review-standards)
8. [Weekly Submission Requirements](#weekly-submission-requirements)
9. [File & Folder Structure](#file--folder-structure)
10. [Documentation Standards](#documentation-standards)
11. [Plagiarism & Integrity Checks](#plagiarism--integrity-checks)
12. [Troubleshooting & FAQ](#troubleshooting--faq)
13. [Penalties & Compliance](#penalties--compliance)

---

## Overview & Objectives

### Purpose
This SOP establishes a **standardized workflow** for all B.Tech Major Project groups to:
- Ensure **clean, trackable code history**
- Maintain **collaborative development standards**
- Prevent **merge conflicts and code loss**
- Enable **transparent progress tracking**
- Facilitate **fair evaluation across all groups**

### Key Principles
✅ **One repo per group** – 14 groups = 14 separate repositories  
✅ **All 4 members commit regularly** – Individual accountability  
✅ **Clear commit history** – No monolithic commits  
✅ **Code review before merge** – Quality assurance  
✅ **Weekly submissions** – Consistent progress tracking  
✅ **Zero plagiarism tolerance** – Original work only  

---

## Repository Setup

### Step 1: Create Repository (ONE PER GROUP)

Each group gets **one GitHub/GitLab repository** with a standardized naming convention:

```
Format: BTech_Major_Projects_2026_GROUP_[N]_[TEAM_NAME]

Examples:
✓ BTech_Major_Projects_2026_GROUP_01_Smart_Attendance
✓ BTech_Major_Projects_2026_GROUP_02_Cybersecurity_Threat_Detection
✓ BTech_Major_Projects_2026_GROUP_03_Music_Genre_Classification
```

### Step 2: Repository Settings

**Visibility:** Public (recommended for portfolio) or Private  
**Collaborators:** Add all 4 group members as **Collaborators** (at least Maintain access)  
**Branch Protection:** Enable on `main` branch (require PR reviews before merge)  

```bash
# Recommended branch protection rules:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Dismiss stale pull request approvals
- Require code review from at least 1 member
- Require branches to be up to date before merging
```

### Step 3: Initial Setup Commands

**Team Lead executes these commands** (other members clone after):

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

## Group & Project Structure

### Group Composition (14 Groups)

| Group # | Project Title | Student Names | Roll Numbers |
|:---:|---|---|---|
| 1 | Smart Attendance System | Ajay Kumar + 3 others | 2420643 + ... |
| 2 | Cybersecurity Threat Detection | Shivansh Yadav + 3 others | 2330654 + ... |
| 3 | Music Genre Classification | Abrar Shabir Dar + 3 others | 2420626 + ... |
| ... | ... | ... | ... |

### Member Roles (Define in README)

| Role | Responsibility | Examples |
|---|---|---|
| **Lead** | Repository management, overall coordination, final reviews | Merging PRs, release management |
| **Core Developer 1** | Backend/Model development | ML model, API, database |
| **Core Developer 2** | Frontend/Integration | UI, deployment, integration |
| **Documentation Officer** | README, research paper, reports | Setup guides, methodology docs |

**Note:** Roles can rotate, but each member should contribute substantively in **at least 2 areas**.

---

## Git Workflow & Branching Strategy

### Branching Strategy: Git Flow

```
main (production-ready)
  ↑
  ├── develop (integration branch)
  │    ↑
  │    ├── feature/model-training (individual features)
  │    ├── feature/ui-dashboard
  │    ├── feature/api-endpoint
  │    └── feature/data-preprocessing
  │
  └── hotfix/urgent-bug (emergency fixes)
```

### Branch Naming Convention

```bash
Format: <type>/<description>

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

#### Weeks 2-8 (Ongoing Development)

```bash
# At START of each work session
git checkout develop
git pull origin develop  # Stay updated with team work

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

✅ Require **at least 1 team member's approval** on PRs  
✅ Require **CI/CD checks to pass** (optional: GitHub Actions)  
✅ **Delete branch after merge** (auto-cleanup)  
✅ **Require branches to be up to date** before merging  

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Example Commits

```bash
# ✅ GOOD
git commit -m "feat(model): add CNN architecture for image classification"
git commit -m "fix(preprocessing): handle missing values in dataset"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor(api): optimize database query performance"

# ❌ BAD (DON'T DO THIS)
git commit -m "work"
git commit -m "update"
git commit -m "fixed stuff"
git commit -m "asdf"
```

### Commit Types

| Type | Description | Example |
|---|---|---|
| `feat` | New feature or functionality | `feat(model): add LSTM layer` |
| `fix` | Bug fix | `fix(preprocessing): handle NaN values` |
| `docs` | Documentation changes | `docs: add API documentation` |
| `refactor` | Code restructuring (no feature change) | `refactor: improve code readability` |
| `perf` | Performance improvements | `perf(model): optimize inference time` |
| `test` | Adding/updating tests | `test: add unit tests for data loader` |
| `chore` | Build, dependency updates, etc. | `chore: update requirements.txt` |

### Commit Frequency

| Phase | Commit Frequency | Commits/Week Expected |
|---|---|---|
| Phase 1 (Week 1) | 2-3 per day | 10-15 commits |
| Phase 2 (Week 2) | 2-3 per day | 10-15 commits |
| Phase 3 (Weeks 3-4) | 1-2 per day | 5-10 commits/week |
| Phase 4 (Weeks 5-6) | 1-2 per day | 5-10 commits/week |
| Phase 5-6 (Weeks 7-8) | Daily | 5-7 commits/week |

**Minimum Requirement:** **At least 5 commits per member per week** (minimum 20 commits/group/week)

### Atomic Commits (IMPORTANT)

Each commit should be **logically independent** and **atomic**:

```bash
# ✅ GOOD (Atomic)
Commit 1: feat: add data loader function
Commit 2: test: add unit tests for data loader
Commit 3: docs: add data loader documentation

# ❌ BAD (Monolithic)
Commit 1: Added data loader, tests, docs, fixed bugs, refactored API
```

---

## Pull Request (PR) Process

### Creating a Pull Request

#### Step 1: Ensure Your Branch is Up to Date

```bash
git checkout develop
git pull origin develop

git checkout feature/your-feature
git merge develop
git push origin feature/your-feature
```

#### Step 2: Open PR on GitHub

1. Go to your repository on GitHub
2. Click **"Compare & pull request"** button (appears after pushing)
3. Fill in the PR details:

```markdown
## 📝 PR Title
feat(model): Add CNN-based image classifier

## 📖 Description
- Added CNN architecture for image classification
- Implemented data augmentation pipeline
- Achieved 95% validation accuracy

## 🔗 Related Issue
Closes #12 (if applicable)

## 🧪 Testing
- [ ] Unit tests added
- [ ] Integration tested
- [ ] Manual testing completed

## 📊 Changes Summary
- Added 3 new files: model.py, train.py, evaluate.py
- Modified 1 file: data_loader.py
- Deleted 0 files

## 🎯 Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
```

#### Step 3: Request Review

1. Add **assignees** (usually the team lead)
2. Add **labels** (e.g., `model-training`, `frontend`, `documentation`)
3. Link to **milestone** (Week 1, Week 2, etc.)

### PR Review & Approval Process

**Reviewer Checklist:**
- [ ] Code logic is correct
- [ ] No obvious bugs
- [ ] Follows naming conventions
- [ ] Comments are clear
- [ ] No hardcoded values
- [ ] Tests are adequate
- [ ] Documentation is updated

**Approval Types:**
- ✅ **Approve** – Ready to merge
- 💭 **Comment** – Questions/suggestions
- 🚫 **Request Changes** – Must fix before merge

```bash
# After approval, merge PR
# Recommended: Use GitHub's "Squash and merge" option
# OR "Create a merge commit" (preferred for history)

# Delete branch after merge to keep repo clean
```

---

## Code Review Standards

### Code Review Checklist (For Reviewers)

```markdown
## Code Quality
- [ ] Code is readable and well-commented
- [ ] Follows PEP 8 (Python) or project conventions
- [ ] No unused variables or imports
- [ ] DRY principle followed (no code duplication)

## Functionality
- [ ] Feature works as intended
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] No hardcoded paths or credentials

## Testing
- [ ] Unit tests added
- [ ] Tests pass locally
- [ ] Test coverage ≥ 70%

## Documentation
- [ ] Comments explain WHY, not WHAT
- [ ] Function docstrings present
- [ ] README updated if needed

## Security
- [ ] No hardcoded passwords/API keys
- [ ] Input validation present
- [ ] SQL injection prevention (if applicable)

## Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used
- [ ] Resource management proper
```

### Reviewer Comment Template

```markdown
### Issue: Variable naming unclear
**Location:** model.py, line 45
**Severity:** Minor
**Suggestion:** Rename 'x' to 'input_features'

```python
# Before
x = np.array([1, 2, 3])

# After
input_features = np.array([1, 2, 3])
```
```

### Author Response Template

```markdown
### Response to: Variable naming unclear
Fixed in commit abc123def456.

Changed 'x' to 'input_features' for clarity.
```

---

## Weekly Submission Requirements

### Due: Every Friday 11:59 PM

Each group must maintain the following **weekly**:

| Item | Requirement | Evidence |
|---|---|---|
| **Commits** | Minimum 20 commits total (5/member) | Git log |
| **PR Submissions** | Minimum 4-5 PRs merged | GitHub PR history |
| **Code Quality** | All PRs reviewed by at least 1 peer | PR comments visible |
| **Weekly Report** | Fill progress tracking form | Submitted to instructor |
| **Documentation** | README updated weekly | Latest commit to README |

### Weekly Submission Checklist (Template)

Create a file: `WEEKLY_SUBMISSIONS.md`

```markdown
# Weekly Submissions Tracking

## Week 1 (August 5-9, 2026)

### Group: GROUP_01_Smart_Attendance
**Team Lead:** Ajay Kumar

### Commits Summary
- Total commits: 18 ✅
- Ajay Kumar: 5 commits
- Member 2: 4 commits
- Member 3: 5 commits
- Member 4: 4 commits

### PRs Merged
1. feat(data): Data exploration script - Merged ✅
2. feat(preprocessing): Data cleaning pipeline - Merged ✅
3. feat(model): Initial architecture design - Merged ✅

### Deliverables Completed
- [x] Topic finalization
- [x] Literature review (5 papers reviewed)
- [x] Dataset identified (CCTV-Face-Recognition-Dataset)
- [x] System architecture design (diagram included)

### Challenges & Blockers
- Challenge: Dataset size too large (15GB)
- Solution: Implemented data subsetting strategy

### Next Week Goals
- Complete data preprocessing
- Implement baseline CNN model
- Achieve 80% accuracy on validation set

### Link to Repository
https://github.com/group1/BTech_Major_Projects_2026_GROUP_01_Smart_Attendance
```

---

## File & Folder Structure

### Standardized Project Structure (MANDATORY)

```
BTech_Major_Projects_2026_GROUP_01_Smart_Attendance/
│
├── README.md                          # Main project documentation
├── WEEKLY_SUBMISSIONS.md              # Weekly progress tracking
├── CONTRIBUTING.md                    # Contribution guidelines
├── LICENSE                            # MIT or Apache 2.0
│
├── .gitignore                         # Ignore large files, credentials
├── .github/                           # GitHub-specific configs
│   └── workflows/
│       └── ci.yml                     # CI/CD pipeline (optional)
│
├── docs/                              # Documentation folder
│   ├── architecture.md                # System architecture
│   ├── dataset_description.md         # Dataset details
│   ├── methodology.md                 # Research methodology
│   ├── results.md                     # Experimental results
│   └── diagrams/                      # System diagrams
│       ├── system_architecture.png
│       └── workflow.png
│
├── src/                               # Source code
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── loader.py                  # Data loading utilities
│   │   ├── preprocessor.py            # Data preprocessing
│   │   └── augmentation.py            # Data augmentation
│   ├── model/
│   │   ├── __init__.py
│   │   ├── architecture.py            # Model definition
│   │   ├── trainer.py                 # Training script
│   │   └── evaluator.py               # Evaluation script
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── helpers.py                 # Utility functions
│   │   ├── config.py                  # Configuration
│   │   └── logger.py                  # Logging setup
│   └── api/                           # API endpoints (if applicable)
│       ├── __init__.py
│       └── server.py
│
├── tests/                             # Unit and integration tests
│   ├── __init__.py
│   ├── test_data_loader.py
│   ├── test_preprocessor.py
│   ├── test_model.py
│   └── test_trainer.py
│
├── notebooks/                         # Jupyter notebooks (exploration)
│   ├── 01_eda.ipynb                   # Exploratory Data Analysis
│   ├── 02_model_experimentation.ipynb
│   └── 03_results_analysis.ipynb
│
├── data/                              # Data folder
│   ├── raw/                           # Original, immutable data
│   ├── processed/                     # Cleaned, processed data
│   └── external/                      # External datasets
│
├── models/                            # Trained model files
│   ├── baseline_model.pth
│   ├── optimized_model.pth
│   └── model_checkpoints/
│
├── results/                           # Experimental results
│   ├── metrics.json                   # Performance metrics
│   ├── plots/                         # Result plots
│   │   ├── accuracy_curves.png
│   │   ├── confusion_matrix.png
│   │   └── loss_curves.png
│   └── logs/                          # Training logs
│
├── requirements.txt                   # Python dependencies
├── setup.py                           # Package setup (optional)
├── config.yaml                        # Configuration file
│
└── .gitignore                         # Git ignore rules
```

### .gitignore Template

```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Jupyter Notebook
.ipynb_checkpoints
*.ipynb

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Data (LARGE FILES)
data/raw/*
data/processed/*
*.csv
*.xlsx
*.db
*.sqlite

# Models (LARGE FILES)
models/*.pth
models/*.h5
models/*.joblib

# Logs
logs/
*.log

# Credentials
.env
secrets/
*.key
config_private.yaml

# Results (optional)
results/plots/
results/logs/
```

---

## Documentation Standards

### README.md (MANDATORY - Minimum 1000 words)

```markdown
# Project Title: Smart Attendance System Using Facial Recognition

## 🎯 Overview
[2-3 paragraphs explaining the problem and solution]

## 📋 Table of Contents
[Auto-generated or manual list]

## ✨ Features
- Real-time face detection and recognition
- Database integration for attendance records
- Web-based dashboard for reports
- Multi-face tracking capability

## 🏗️ System Architecture
[ASCII diagram or image of system architecture]

## 📊 Dataset
- **Source:** [Dataset name/link]
- **Size:** X GB
- **Number of samples:** Y
- **Train/Val/Test split:** 70/15/15

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- GPU (NVIDIA CUDA 11.0+)
- 8GB RAM minimum

### Step 1: Clone Repository
\`\`\`bash
git clone [repo-url]
cd project-folder
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 3: Download Pre-trained Models
\`\`\`bash
python scripts/download_models.py
\`\`\`

## 📈 Usage

### Training Model
\`\`\`bash
python src/model/trainer.py --epochs 50 --batch-size 32
\`\`\`

### Running Inference
\`\`\`bash
python src/api/server.py --port 5000
\`\`\`

## 📊 Results

### Performance Metrics
| Metric | Value |
|--------|-------|
| Accuracy | 95.2% |
| Precision | 94.8% |
| Recall | 95.5% |
| F1-Score | 95.1% |

### Experimental Results
[Include plots and comparative analysis]

## 🔍 Methodology
[Research paper-style description of your approach]

## 🤝 Contributors
- Ajay Kumar (Lead): Model training, optimization
- Member 2: Data preprocessing, EDA
- Member 3: API development, deployment
- Member 4: Documentation, research paper

## 📚 References
[IEEE/Springer citations]

## 📝 License
MIT License - See LICENSE file

## 📧 Contact
[Email for inquiries]
```

### Commit Message Documentation

Each commit should explain the WHAT, WHY, and HOW:

```bash
git commit -m "feat(model): implement CNN-based classifier

This commit introduces a Convolutional Neural Network architecture
for image classification task. The model consists of:

- 3 convolutional blocks with batch normalization
- Max pooling layers for spatial reduction
- 2 fully connected layers with dropout (0.5)

Performance on validation set: 94.2% accuracy

Fixes issue #12: Need efficient model architecture"
```

---

## Plagiarism & Integrity Checks

### Plagiarism Prevention

#### Code Similarity Check

```bash
# Install similarity checker
pip install radon

# Check code complexity
radon cc src/ -a

# Use online tools
# - MOSS (Moss.Stanford.edu)
# - Plagiari.sm
# - CodeMatch
```

#### What Counts as Plagiarism

❌ **PROHIBITED:**
- Copying code from GitHub without attribution
- Using others' project code directly
- Copying without understanding
- Submitting someone else's work

✅ **ALLOWED:**
- Using libraries (NumPy, TensorFlow, etc.)
- Using code snippets with proper citation
- Learning from tutorials and adapting
- Using documentation examples

### Integrity Pledge

**Every group member must sign:**

```markdown
## Integrity Pledge

We, the undersigned, affirm that:

1. This project is our original work
2. We have not copied code without attribution
3. We understand plagiarism will result in zero marks
4. We have cited all sources and references
5. We have contributed individually to this project
6. We have not helped others copy our code

Signed:
- Ajay Kumar                    Date: __________
- Member 2                      Date: __________
- Member 3                      Date: __________
- Member 4                      Date: __________

Instructor Verification:
Mr. Omkar Mahanandia            Date: __________
```

---

## Troubleshooting & FAQ

### Q1: How do I undo my last commit?

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1
```

### Q2: How do I merge develop into my feature branch?

```bash
git checkout feature/your-feature
git fetch origin
git merge origin/develop
git push origin feature/your-feature
```

### Q3: I accidentally pushed to main instead of develop!

```bash
# Don't panic! Revert the commit
git revert -n HEAD
git commit -m "Revert: accidental main push"
git push origin main

# Then proceed normally for future commits
```

### Q4: How do I resolve merge conflicts?

```bash
# 1. Pull latest changes
git pull origin develop

# 2. Check conflict status
git status

# 3. Open conflicted file and manually resolve
# Look for markers: <<<<<<< HEAD, ======, >>>>>>>

# 4. After resolving
git add .
git commit -m "Resolve: merge conflict in model.py"
git push origin feature/your-feature
```

### Q5: How do I handle large files (data, models)?

```bash
# Option 1: Use .gitignore (RECOMMENDED)
# Add to .gitignore:
data/raw/*
models/*.pth

# Option 2: Use Git LFS (Git Large File Storage)
git lfs install
git lfs track "*.pth"
git lfs track "*.csv"
```

### Q6: Can I delete a branch?

```bash
# Local branch
git branch -d feature/your-feature

# Remote branch
git push origin --delete feature/your-feature
```

### Q7: How do I see who wrote which line of code?

```bash
# Blame a file
git blame src/model/architecture.py

# Shows: commit author date | line of code
```

---

## Penalties & Compliance

### Evaluation Criteria for Code Submission

| Aspect | Full Marks (5) | Partial (2-3) | None (0) |
|--------|---|---|---|
| **Commit Frequency** | 5+ commits/member/week | 2-4 commits/week | <2 commits/week |
| **Commit Messages** | Clear, descriptive, atomic | Mostly clear | Vague/monolithic |
| **PR Process** | All PRs reviewed, approved | Some reviews missing | No PRs used |
| **Code Quality** | Clean, well-documented | Some issues | Poor/unreadable |
| **Branch Strategy** | Follows Git Flow correctly | Minor deviations | Doesn't follow |
| **Documentation** | Comprehensive README | Basic documentation | Missing/minimal |
| **Plagiarism Check** | 100% original code | <5% similarity | >30% plagiarism |

### Penalties

| Violation | Penalty |
|---|---|
| **Missing weekly commits** | -5 marks/week per member |
| **Monolithic commits** | -2 marks per commit |
| **No code review/PR** | -10 marks |
| **Poor documentation** | -5 marks |
| **Branch strategy violation** | -3 marks |
| **Plagiarism detected** | **Zero marks + disciplinary action** |
| **Missed deadline** | -1 mark per day late |

### Compliance Checklist (Weekly Verification)

**Group Lead should verify:**

- [ ] All members have committed code this week
- [ ] All PRs have been reviewed and approved
- [ ] README is updated with latest progress
- [ ] No unresolved merge conflicts
- [ ] Weekly submission form filled
- [ ] All files follow naming conventions
- [ ] No large files accidentally committed
- [ ] Repository is clean and organized

---

## Quick Reference: Git Commands Cheat Sheet

```bash
# ========== SETUP ==========
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git clone <repo-url>

# ========== BRANCH MANAGEMENT ==========
git branch                           # List local branches
git branch -r                        # List remote branches
git checkout -b feature/new-feature  # Create & switch to new branch
git checkout develop                 # Switch to existing branch
git branch -d feature/old-feature    # Delete local branch
git push origin --delete branch-name # Delete remote branch

# ========== DAILY WORKFLOW ==========
git status                           # Check status
git add .                            # Stage all changes
git add file.py                      # Stage specific file
git commit -m "feat: description"    # Commit with message
git push origin feature/branch-name  # Push to remote

# ========== PULLING & MERGING ==========
git pull origin develop              # Fetch & merge latest
git fetch origin                     # Fetch without merging
git merge develop                    # Merge develop into current branch

# ========== VIEWING HISTORY ==========
git log                              # View commit history
git log --oneline                    # Compact view
git log --author="Name"              # Filter by author
git show <commit-hash>               # View specific commit

# ========== UNDOING CHANGES ==========
git restore file.py                  # Discard changes in file
git reset HEAD file.py               # Unstage file
git reset --soft HEAD~1              # Undo commit, keep changes
git reset --hard HEAD~1              # Undo commit, discard changes
git revert <commit-hash>             # Create new commit undoing old one

# ========== CONFLICT RESOLUTION ==========
git status                           # Check conflicts
git diff                             # View differences
# (Edit conflicted files)
git add .
git commit -m "Resolve: merge conflicts"
```

---

## Summary & Key Takeaways

### ✅ DO's

✓ Commit frequently (5+ times/week per member)  
✓ Use meaningful commit messages  
✓ Create PRs for all code changes  
✓ Request reviews before merging  
✓ Keep branches up to date  
✓ Document everything  
✓ Test your code locally before pushing  

### ❌ DON'Ts

✗ Push directly to main branch  
✗ Make monolithic commits  
✗ Use vague commit messages  
✗ Skip code reviews  
✗ Commit large files or credentials  
✗ Copy code without attribution  
✗ Let branches go stale  

---

## Support & Escalation

### Getting Help

| Issue | Contact | Response Time |
|---|---|---|
| Git/GitHub questions | Mr. Omkar Mahanandia | 24-48 hours |
| Repository access issues | Mr. Amit Sandhu | 24 hours |
| Plagiarism concerns | CSE-APEX Office | 48 hours |

### Reporting Issues

```markdown
**Subject:** [GROUP_01] Repository Access Issue

**Description:**
I cannot push to the repository. Error message:
"remote: Permission to user/repo denied to user."

**Steps taken:**
1. Added SSH key to GitHub
2. Tried HTTPS and SSH protocols

**Expected behavior:**
Should be able to push commits

**Actual behavior:**
Receiving permission denied error
```

---

## Document Control

| Version | Date | Changes | Author |
|---|---|---|---|
| 1.0 | Aug 2026 | Initial SOP document | Mr. Omkar Mahanandia |
| 1.1 | TBD | Updates based on feedback | TBD |

**Last Reviewed:** August 2026  
**Next Review:** October 2026

---

> **Remember:** Clean code, clean history, clean collaboration! 🚀  
> *"The best time to plant a tree was 20 years ago. The second best time is now." – Don't procrastinate on weekly commits!*
