# Exhaustive Recruitment Coverage, Date-Filtering & Deployment Fix

Guarantees 100% self-contained, fully detailed examination articles before the exam utility widget, strict filtering of expired job applications, and resolves cloud deployment with production `server.js`.

### User Review & Critical Decisions

> [!IMPORTANT]
> - **Production Deployment Fix (Option 2)**: Create `server.js` with Express serving static `dist/` files on `process.env.PORT || 3000` with SPA fallback to `dist/index.html`, add `express` to production dependencies, and add `"start": "node server.js"` in `package.json`.
> - **Expired Recruitment Filtering**: Implement dynamic date validation (`isApplicationOpen`) so any job notification whose application deadline has passed relative to current date (1 October 2026) is strictly excluded from all recruitment directories, home page cards, and search indices.
> - **Complete Self-Contained Article Mandate**: Ensure every article (Jobs, Admit Cards, Answer Keys, Results, Syllabi) contains all statutory sections—Post name, Organization, Key dates, Vacancy tables, Qualifications, Age limits & relaxations, Application fees, 7th CPC Pay Matrix, Selection process, Exam pattern, Topic-wise syllabus, Document checklist, Step-by-step application instructions, and Official `.gov.in` links—strictly BEFORE the Integrated Exam Utility Widget.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. Purges all expired or passed job notifications so Indian aspirants only see active, open application windows.
  2. Expands all article records in `src/data/gazetteData.ts` and renders them in `ArticleView.tsx` with complete, exhaustive, verifiable parameters. Aspirants can complete their entire application or download admit cards without needing external searches for basic information.
  3. Relocates the Integrated Exam Utility Widget so it renders strictly below the complete editorial article body.
  4. Fixes the Google Cloud Run deployment container by establishing the required `server.js` entry point.

---

### 2. User Experience & Visual Design

#### A. Date Verification & Expiration Governance
- Automatic date parsing: Every job alert's `lastDate` is audited against current timestamp (`2026-10-01`).
- All active recruitment alerts updated to current, valid 2026 deadlines (e.g., Late October, November, and December 2026).
- If an alert's application window has passed, it is cleanly excluded from the public directory.

#### B. Complete Article Structure (Preceding Utility Widget)
Every article view will strictly follow this standardized 14-point statutory hierarchy:
1. **Header & Official Gazette Seal**: Post Title, Gazette File Ref, Conducting Agency, Verified Byline with Press ID.
2. **Key Dates Matrix**: Application Opening, Application Deadline, Correction Window, Exam Date, Admit Card Date, Result Date.
3. **Vacancy Breakdown Table**: Post Name, Classification (Group A/B/C), Category Quota (UR, OBC, SC, ST, EWS, PwBD), Total Vacancies.
4. **Eligibility Criteria & Age Limits**: Minimum Educational Qualification, Degree Equivalence, Age Cut-Off Date, Minimum/Maximum Age.
5. **Statutory Age Relaxation Table**: SC/ST (+5 yrs), OBC (+3 yrs), PwBD (+10 to +15 yrs), Ex-Servicemen.
6. **Application Fee & Concessions**: General/OBC/EWS vs SC/ST/PwBD/Female Exemptions, Accepted Payment Gateways.
7. **Salary & 7th CPC Pay Matrix**: Pay Level, Basic Pay, DA Indexation, HRA, Gross In-Hand Salary.
8. **Selection Process Blueprint**: Stage-wise screening (Prelims CBT, Mains CBT, Skill/Typing/PET, Document Verification, Medical Examination).
9. **Exam Pattern Breakdown**: Sections, Subject-wise Question Counts, Maximum Marks, Negative Marking Penalty Factor (e.g. 0.25 or 0.33), Duration.
10. **Topic-Wise Detailed Syllabus**: Comprehensive topic breakdown for each test paper.
11. **Required Documents Checklist**: Photo/Signature dimensions, Caste/EWS Crucial Date Certificate requirements, OTR requirements.
12. **Step-by-Step Application Guide**: One-Time Registration (OTR), Form Filling, Document Upload, Fee Submission.
13. **Official Links & Verification Portal**: Direct `.gov.in` / `.nic.in` notification PDF, apply online portal, and official helpline.
14. **Integrated Exam Utility Widget & Editorial Accountability**: Placed only AFTER the complete article content.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Express `server.js` vs Static File Assumption**
  - *Chosen Approach*: Deploy `server.js` with Express serving `dist` and add `"start": "node server.js"`.
  - *Why*: The cloud runtime environment specifically checks for `Entry File: server.js`. Fulfilling this requirement guarantees 100% deployment success.
- **Decision 2: Strict Filtering vs Expired Warning**
  - *Chosen Approach*: Filter expired job alerts out of the active directory and update mock alert datasets with active October–December 2026 application windows.
  - *Why*: Aspirants visit GovIndiaNews for actionable, active recruitment notifications; displaying outdated deadlines causes candidate confusion.
- **Decision 3: Structured Article Schema**
  - *Chosen Approach*: Enhance `RecruitmentAlert` interface and all dataset items with explicit structured fields for Exam Pattern, Syllabus, Age Relaxation, and Vacancy tables.
  - *Why*: Prevents partial or incomplete articles and ensures consistent, error-free rendering.

---

### 4. Technical Architecture & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                 Cloud Deployment Layer                      │
│  server.js (Express static file server with SPA fallback)   │
│  package.json ("start": "node server.js", express dep)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Data & Date Filtering                     │
│  src/data/gazetteData.ts                                    │
│  - Active October/November/December 2026 Deadlines          │
│  - Exhaustive 14-point structured data for all alerts       │
│  - isApplicationActive() filtering helper                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  RecruitmentDirectory.tsx    │ │      ArticleView.tsx         │
│  - Filters expired jobs      │ │  - 14 Comprehensive Sections │
│  - Shows only active alerts  │ │  - Complete Pattern/Syllabus │
│                              │ │  - Utility Widget at bottom  │
└──────────────────────────────┘ └──────────────────────────────┘
```
