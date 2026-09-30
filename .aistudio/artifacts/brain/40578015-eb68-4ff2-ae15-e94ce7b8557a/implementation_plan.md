# Implementation Plan: 30 Sept 2026 Admit Cards, Q4 2026 Mega Drives, Countdown Labels & AdSense/SEO Dominance

This plan implements fresh 30 September 2026 admit cards, high-profile recruitment notifications with application deadlines between October and December 2026, dynamic "Days Left" countdown badges on recruitment directory cards, and comprehensive upgrades for Google AdSense approval and SERP ranking dominance.

---

## 1. Proposed Changes

### A. Admit Cards Released on 30 September 2026 (`src/data/gazetteData.ts`)
Add 6 detailed, authentic admit card notifications dated 30 September 2026 with exam dates, shift schedules, direct download steps, required ID proofs, and official portal links:
1. **UPSC Civil Services (Main) Examination 2026 e-Admit Card**
   - Release Date: 30 September 2026 | Mains Exam Dates: 16–20 October 2026
   - Shift timings, roll number / registration ID retrieval guide, and exam hall instructions.
2. **SSC CGL 2026 Tier-1 Hall Ticket & Application Status (All 9 Regions)**
   - Release Date: 30 September 2026 | Tier-1 CBT Dates: 14–26 October 2026
   - Region-wise direct portal links (NR, CR, WR, ER, SR, KKR, NER, NWR, MPR).
3. **RRB Assistant Loco Pilot (ALP) 2026 CBT-1 City Intimation Slip & Admit Card (CEN 01/2026)**
   - Release Date: 30 September 2026 | CBT-1 Dates: 22–29 October 2026
   - Travel pass for SC/ST, biometric Aadhaar authentication protocol, mock test links.
4. **IBPS Clerk XIV Prelims Call Letter 2026**
   - Release Date: 30 September 2026 | Prelims Dates: 10, 11 & 12 October 2026
   - Sectional timings, call letter declaration checklist, biometric photo rules.
5. **IBPS Probationary Officer (PO/MT XV) Prelims Exam Hall Ticket 2026**
   - Release Date: 30 September 2026 | Prelims Dates: 17 & 18 October 2026
   - Roll number login, reporting shift details, self-declaration form.
6. **UGC NET December 2026 Advance City Intimation Slip**
   - Release Date: 30 September 2026 | Exam Dates: 02–14 December 2026
   - 83 subjects, NTA portal verification, test centre allotment.

---

### B. Latest Central Mega-Drives with Deadlines in Oct–Dec 2026 (`src/data/gazetteData.ts`)
Add detailed recruitment gazette notifications not yet on the site:
1. **SBI Junior Associates (Clerical Cadre) 2026–27 (12,500+ Posts)**
   - Deadline: 18 November 2026 | Level: Junior Associate (Starting basic ₹26,730 post-12th BPS)
   - Eligibility: Graduation in any stream, age 20–28 years (relaxations applicable)
   - Circle-wise vacancy breakdown, local language test requirements.
2. **SSC GD Constable 2027 Mega Recruitment (39,481 Posts)**
   - Notice No. 3/1/2026-P&P-I | Deadline: 14 October 2026
   - BSF (15,654), CISF (13,632), CRPF (9,410), SSB, ITBP, Assam Rifles, SSF
   - Pay Level 3 (₹21,700–₹69,100), 10th pass qualification, full PET/PST criteria.
3. **ISRO Scientist / Engineer 'SC' 2026 (Advt No. ICRB:02:2026 - 303 Posts)**
   - Deadline: 04 November 2026 | Level 10 (Basic ₹56,100 + DA + HRA)
   - Disciplines: Electronics, Mechanical, Computer Science; B.E./B.Tech with minimum 65% marks.
4. **Reserve Bank of India (RBI) Grade B Officers 2026 (94 Posts)**
   - Deadline: 25 October 2026 | Gross Salary: ₹1,16,000+ per month
   - Streams: General, DEPR, DSIM; Phase-I, Phase-II, and Interview stages.
5. **DRDO RAC Scientist 'B' Recruitment 2026 (248 Posts)**
   - Deadline: 15 December 2026 | Level 10 Defence R&D Pay
   - Valid GATE score in EE, ME, CS, Metallurgy, Chemistry, Physics.

---

### C. Real-Time 'Days Left' Countdown Label on RecruitmentDirectory Cards (`src/components/RecruitmentDirectory.tsx`)
- Compute the active difference between current date (`2026-09-30`) and `item.applicationEnd`:
  - **> 10 days**: Green badge `[Clock Icon] X Days Left`
  - **4 – 10 days**: Amber badge `[Alert Icon] X Days Left · Closing Soon`
  - **1 – 3 days**: High-urgency pulse badge `[Zap Icon] Only X Days Left · Apply Today`
  - **Closing today**: Red badge `[Flame Icon] Ends Today!`
  - **Expired**: Neutral badge `Application Closed`
  - **Admit Cards / Results**: Specific status badges (`Exam on [Date]`, `Hall Ticket Live`, `Scorecard Active`).

---

### D. AdSense Approval & Google Ranking Dominance Upgrades
To ensure 100% compliance with Google AdSense Publisher Policies and maximize E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) for Google Search dominance:
1. **Automated Schema.org Structured Data Engine (`src/utils/seoSchema.ts`)**:
   - `JobPosting` schema for jobs (title, hiringOrganization, datePosted, validThrough, employmentType, baseSalary, educationRequirements, jobLocation).
   - `NewsArticle` / `GovernmentPermit` schema for admit cards and results (headline, datePublished, dateModified, author, publisher).
   - `BreadcrumbList` schema on all pages for rich Google SERP breadcrumb display.
2. **E-E-A-T Editorial Policy & Grievance Redressal Trust Hub (`src/components/TrustHub.tsx`)**:
   - **Editorial Policy**: Fact-checking methodology, verification against official gazette publications (e.g. *The Gazette of India*, Employment News, PIB).
   - **Statutory Grievance Redressal Officer**: Name, designation, physical office address in New Delhi, and official contact email compliant with Rule 4(1)(d) of the Information Technology Rules, 2021.
   - **Author Byline & Fact-Checker Profile**: Verified credentials of recruitment analysts and public policy researchers.
3. **Official Gazette Verification Badges & Candidate Q&A Forum**:
   - Official "Gazette of India Verified" badge on notifications.
   - Interactive Candidate Query / Discussion component on article pages allowing aspirants to post questions, report discrepancies, and read verified FAQs.
4. **Google Search Rich Snippet Preview Tool (`/tools/rich-snippet-preview`)**:
   - Interactive preview tool demonstrating how articles appear in Google Search with rich job badges, salary chips, and date snippets.

---

## 2. Verification Plan

### Automated Checks
- `lint_applet`: Run to verify clean TypeScript compilation with zero lint errors.
- `compile_applet`: Run Vite build to ensure bundle builds cleanly.

### Manual & UX Verification
1. **Admit Cards Verification**:
   - Open Admit Cards tab: Confirm UPSC Mains, SSC CGL Tier 1, RRB ALP, IBPS Clerk, IBPS PO, and UGC NET cards display "Updated: 30 Sep 2026".
   - Open individual admit card article: Check shift timings, hall ticket download steps, and official portal links.
2. **Q4 2026 Mega-Drives Verification**:
   - Filter by jobs: Check SBI Clerk (Nov 18 deadline), SSC GD (Oct 14 deadline), ISRO (Nov 4 deadline), RBI Grade B (Oct 25 deadline), DRDO (Dec 15 deadline).
   - Check that salary details, syllabus, and vacancies match official notification standards.
3. **Days Left Countdown**:
   - Verify countdown labels on each job card accurately reflect days remaining until October, November, and December deadlines.
4. **AdSense & E-E-A-T Pages**:
   - Navigate to `/editorial-policy`, `/grievance-redressal`, and `/authors` to verify publisher compliance copy, officer contact details, and Schema.org injection.
