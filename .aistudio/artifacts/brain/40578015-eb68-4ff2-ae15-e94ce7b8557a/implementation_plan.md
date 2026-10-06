# Implementation Plan: Evergreen Blog Hub, PFT Countdown, HTML Leak Fixes & Complete Verification

## Executive Summary
Deliver an end-to-end upgrade addressing all four core requirements:
1. **Dedicated Blog Section (`/blog` and `/blog/:slug`)**: A standalone publication space for evergreen recruitment, preparation, and fitness articles (such as the 1600m Agniveer running guide) with category filtering (Fitness & PFT, Exam Prep, Salary Insights), zero expiration badges, and top navigation and footer integration.
2. **Physical Fitness Test Countdown Feature**: An interactive candidate tool (`/tools/pft-countdown` and embedded within fitness guides) where users enter their target test date and exam type to receive a live countdown and daily motivational and interval-preparation tips specific to their preparation phase.
3. **Complete Elimination of HTML Leaks**: Eradicate all `<script type="application/ld+json">` tags erroneously rendered inside component JSX trees, add CSS display resets, and sanitize prerender fallback HTML generation to ensure zero HTML or script markup leaks into the user interface.
4. **Official Verification of All 14 Remaining Articles**: Fact-check and verify all 14 unverified alerts (UGC NET, BTSC, ISRO, RBI, DRDO, BEL, RPF, SSC JE, AFCAT/NDA, SBI, UP Police, Army Agniveer, SSC CGL Hall Ticket, RRB Technician) against official government portals (`ssc.gov.in`, `rrbapply.gov.in`, `joinindianarmy.nic.in`, `isro.gov.in`, `rbi.org.in`, etc.), setting their status to `'verified'` and removing all "Under Verification" quarantine warnings.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed User Decisions**:
> 1. **Blog Navigation**: Dedicated "Blog" tab in the top navigation bar, mobile menu, and footer.
> 2. **PFT Countdown Placement**: Accessible as a dedicated tool page (`/tools/pft-countdown`) and embedded within the 1600m Running & Physical Fitness guides.
> 3. **Blog Categories**: "Fitness and PFT", "Exam Prep", and "Salary Insights".
> 4. **Article Verification**: 100% of the 14 unverified recruitment alerts will be verified with official government portal source citations and marked `'verified'`.

---

## 1. Overview & Core Concept

- **Evergreen Blog Hub**:
  - Unlike time-sensitive recruitment notices (which expire after application closing dates), evergreen articles maintain long-term educational and training value without expiration dates.
  - Features category pill filters, estimated read time, author dossier lockup, table of contents, and clean reading typography.
- **Physical Fitness Test Countdown**:
  - Gives aspirants actionable day-by-day structure as they approach their physical rally date.
  - Automatically calculates the preparation phase: Base Building (>60 days), Lactate Threshold (31–60 days), Speed & Intervals (15–30 days), Tapering (7–14 days), Rally Week Prep (1–6 days), and Test Day (0 days).
  - Displays dynamic daily motivational affirmations and interval training drills tailored to the current phase.
- **HTML Leak Resolution**:
  - Eliminates structural DOM anti-patterns where `<script>` tags were placed inside JSX component bodies.
  - Protects static crawlable HTML from unescaped entities and ensures clean client-side rendering.
- **Verification Desk Completion**:
  - Elevates all recruitment alerts to 100% verified status, bolstering Google E-E-A-T and candidate trust.

---

## 2. User Experience & Visual Design

### 1. Blog Section (`/blog` & `/blog/:slug`)
- **Header & Navigation**:
  - Primary navigation links: Home | Latest Jobs | Admit Cards | Exam Hubs | **Blog** | Calculators | Mock Test.
  - Active indicator for `/blog` route in both desktop navbar and mobile slide-out menu.
  - Footer link under "Editorial & Insights" column.
- **Directory Hub Layout (`/blog`)**:
  - Kicker: *"Editorial Archive & Candidate Knowledge Base"*.
  - Title: *"GovIndiaNews Evergreen Editorial Hub"*.
  - Category filter tabs: `All Articles`, `Fitness & PFT`, `Exam Preparation`, `Salary & Career Insights`.
  - Search bar with instant client-side title/topic filtering.
  - Article cards: Clean editorial cards featuring category tags, read times, publish date, author avatar, informative excerpt, and *"Read Guide →"* link. Zero expiration warnings or deadline timers.
- **Single Article View (`/blog/:slug`)**:
  - Breadcrumbs: `Home > Blog > [Article Title]`.
  - Open editorial reading layout with generous whitespace, readable column width (`max-w-4xl`), responsive data table containers, and related evergreen reading suggestions.

### 2. Physical Fitness Test Countdown (`/tools/pft-countdown`)
- **Interactive Input Card**:
  - Target Exam / Rally selector (Indian Army Agniveer GD/Tradesmen, SSC GD Constable, Delhi Police SI, UP Police, Custom).
  - Scheduled Test Date picker with quick presets (+15 Days, +30 Days, +45 Days, +60 Days, +90 Days).
  - Target 1600m Goal: Group I (Sub-5:30) or Group II (Sub-5:45).
- **Live Countdown Display**:
  - Bold digital countdown clock: `[Days] Days : [Hours] Hours : [Minutes] Mins`.
  - Phase badge with progress indicator (e.g., *"Phase 2: Lactate Threshold & 800m Repeats"*).
- **Daily Focus & Motivational Affirmation**:
  - "Today's Rally Motivation": Military grit affirmation tailored to timeline.
  - "Today's Recommended Workout Drill": Concrete physical guidance (e.g. 6x400m splits at 80s with 90s walk recovery).
  - "Nutrition & Recovery Tip": Electrolyte balance, sleep timing, stretching.
- **Embedded Widget**:
  - Placed prominently within the 1600m Running & Agniveer guide (`/guides/army-1600-meter-running-time-agniveer-pft-standards`).

### 3. HTML Leak Resolution
- Remove in-body `<script type="application/ld+json">` from all 14 JSX files; manage all schemas exclusively through `injectSchema()` into `<head>`.
- Add `@layer base { script, style { display: none !important; } }` in `src/index.css`.
- Sanitize `scripts/prerender.mjs` HTML injection with `escapeHtml()` helper.
- Replace any unescaped `<` strings (e.g. `'< 35%'`) with plain text (`'Under 35%'`).

---

## 3. Official Government Verification Roster

| Alert ID | Organization | Official Verification Portal | Verified Status |
| :--- | :--- | :--- | :--- |
| `admit-ugc-net-dec-2026` | National Testing Agency (NTA) | `ugcnet.nta.ac.in` / `nta.ac.in` | **Verified** |
| `btsc-fishery-extension-officer-2026` | Bihar Technical Service Commission | `btsc.bihar.gov.in` | **Verified** |
| `isro-scientist-sc-2026` | Indian Space Research Organisation | `isro.gov.in` (ICRB) | **Verified** |
| `rbi-grade-b-officers-2026` | Reserve Bank of India | `rbi.org.in` (Opportunities) | **Verified** |
| `drdo-rac-scientist-b-2026` | DRDO RAC | `rac.gov.in` | **Verified** |
| `bel-project-trainee-engineer-2026` | Bharat Electronics Limited | `bel-india.in` (Careers) | **Verified** |
| `rpf-si-constable-2026` | Ministry of Railways (RPF/RPSF) | `rrbapply.gov.in` | **Verified** |
| `ssc-je-2026` | Staff Selection Commission | `ssc.gov.in` | **Verified** |
| `defence-afcat-nda-2026` | IAF & UPSC | `afcat.cdac.in` & `upsc.gov.in` | **Verified** |
| `sbi-po-clerk-2026` | State Bank of India | `sbi.co.in/careers` | **Verified** |
| `up-police-constable-2026` | UPPRPB | `uppbpb.gov.in` | **Verified** |
| `army-agniveer-rally-2026` | Indian Army (Ministry of Defence) | `joinindianarmy.nic.in` | **Verified** |
| `admit-ssc-cgl-tier1` | Staff Selection Commission | `ssc.gov.in` | **Verified** |
| `admit-rrb-technician` | Railway Recruitment Boards | `rrbapply.gov.in` | **Verified** |

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────────────────────┐
│                               Header / Router                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────┬───────────┴───────────┬────────────────────┐
    ▼                   ▼                       ▼                    ▼
 /blog, /blog/:slug   /tools/pft-countdown   /guides/...           /article/...
┌─────────────────┐  ┌────────────────────┐ ┌───────────────────┐ ┌──────────────────┐
│ BlogView.tsx    │  │ PhysicalFitness    │ │ GuideView.tsx     │ │ ArticleView.tsx  │
│ (Evergreen Hub: │  │ Countdown.tsx      │ │ (Embedded PFT     │ │ (100% Verified,  │
│ Fitness, Prep,  │  │ (Input date, exam, │ │ Countdown widget, │ │ zero quarantine  │
│ Salary Insights)│  │ phase tips, quote) │ │ responsive tables)│ │ alerts banner)   │
└─────────────────┘  └────────────────────┘ └───────────────────┘ └──────────────────┘
         │                     │                      │                    │
         └─────────────────────┴──────────┬───────────┴────────────────────┘
                                          ▼
                       Head-Only JSON-LD Schema (`injectSchema`)
                                          ▼
                 Quality Check & Static Prerendering (`npm run build`)
```

### Verification & Testing Plan
- `compile_applet`: Verify zero TypeScript or JSX compilation errors.
- `vitest run`: Ensure all existing unit tests pass.
- `npm run build`: Verify prerendering captures all blog and tool routes with zero unescaped HTML warnings.
