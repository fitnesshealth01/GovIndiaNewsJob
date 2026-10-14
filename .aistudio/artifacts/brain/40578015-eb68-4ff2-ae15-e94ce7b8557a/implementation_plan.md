# Implementation Plan: UP Board 2027 Class 12 Science Gap-Day Revision Plan

Integrate the official **UP Board 2027 Class 12 Science: Gap-Day Revision Plan for PCM and PCB** into GovIndiaNews, using the direct ImgBB image URL for the title image, with cross-category discovery across both the **Articles Knowledge Base** (`/blog`) and **Board Exams Hub** (`/board-exams`), and an embedded **Interactive Gap-Day Countdown & Subject Planner**.

---

## 1. Executive Summary & SEO Architecture

- **Article Title**: UP Board 2027 Class 12 Science: Gap-Day Revision Plan for PCM and PCB
- **Meta Title**: UP Board 2027 Class 12 Science Gap-Day Revision Plan (PCM & PCB) — GovIndiaNews
- **Meta Description**: UP Board 2027 exams run 5–24 Feb. See exactly how many free days Class 12 Science students get between Hindi, English, Maths/Biology, Chemistry and Physics, and how to use each one.
- **Keywords**: UP Board 2027 Class 12 revision plan, UP Board time table 2027 class 12, UP Board 2027 PCM strategy, UP Board 2027 PCB strategy, UP Board exam date 2027
- **Primary Canonical URL**: `https://govindianews.com/blog/up-board-2027-class-12-science-gap-day-revision-plan`
- **Secondary Discovery Route**: `/article/up-board-2027-class-12-science-gap-day-revision-plan` and featured card in `/board-exams` directory
- **Direct Title Image URL**: `https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png` (high-resolution direct ImgBB asset used directly for hero display and OpenGraph/Twitter cards)
- **Word Count & Depth**: ~2,000+ words with full phase blueprints, subject-specific derivation guidelines, gap-day hour allocations, structured data tables, and FAQ schemas

---

## 2. Interactive Study Tool: UP Board Science Gap-Day Planner

Embed a responsive, accessible React utility (`src/components/tools/UPBoardGapDayCalculator.tsx`) inside the article:
1. **Stream Selector**: Toggle between **PCM (Mathematics)** and **PCB (Biology)**.
2. **Live Countdown Timers**:
   - Hindi (Fri 5 Feb 2027, Afternoon Shift)
   - English (Mon 8 Feb 2027, Afternoon Shift)
   - Maths / Biology (Fri 12 Feb 2027, Afternoon Shift)
   - Chemistry (Mon 15 Feb 2027, Afternoon Shift)
   - Physics (Wed 17 Feb 2027, Afternoon Shift)
3. **Dynamic Gap-Day Visualizer**:
   - Visual timeline displaying the 2-day, 3-day, 2-day, and 1-day gaps with color-coded intensity flags (e.g. Critical 1-day Chemistry $\to$ Physics warning).
4. **Interactive Action Checklist**:
   - Checkboxes for each gap-day phase (6–7 Feb English & Science warm-up, 9–11 Feb Maths/Bio timed sprint, 13–14 Feb Chemistry reaction charts, 16 Feb Physics recall & derivation pass).
5. **Print & Offline PDF Export**:
   - One-click button to print or save the personalized gap-day study schedule.

---

## 3. Step-by-Step Implementation Roadmap

### Phase 1: Data Modeling & Content Registration
- Update `src/content/blogData.ts`:
  - Extend `BlogPost` interface to support optional `heroImage`, `heroImageAlt`, `heroImageCaption`.
  - Add the complete `up-board-2027-class-12-science-gap-day-revision-plan` entry with all sections, tables (Countdown from 13 Oct, Gap Days sequence), phase plans, subject tips, common mistakes, Class 10 notes, and 5 structured FAQs.
  - Set `heroImage: 'https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png'`.
  - Set category to `'exam-prep'` with category label `'Board Exams & Strategy'`.
- Update `src/data/gazetteData.ts`:
  - Add matching recruitment/notification alert under category `'board-exams'` with the direct image URL, so the article appears on the homepage live ticker and the `/board-exams` category directory.

### Phase 2: Interactive Study Component
- Create `src/components/tools/UPBoardGapDayCalculator.tsx`:
  - PCM vs PCB stream toggle.
  - Live clock/countdown calculations.
  - Color-coded gap warnings with study hour recommendations.
  - LocalStorage persistence for candidate checklist items.

### Phase 3: Article Template & Image Integration
- Update `src/components/BlogView.tsx`:
  - Render the hero image banner using the direct image URL `https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png` with responsive sizing, rounded borders, and clean caption.
  - Conditionally embed `<UPBoardGapDayCalculator />` for the UP Board article.
  - Update OpenGraph and Twitter card meta tags to include `image: post.heroImage`.
- Update `src/components/BoardExamsView.tsx` / `RecruitmentDirectory.tsx` to highlight this featured guide.

### Phase 4: Prerender & SEO Synchronization
- Update `scripts/prerender.mjs`:
  - Add `/blog/up-board-2027-class-12-science-gap-day-revision-plan` and alias `/article/up-board-2027-class-12-science-gap-day-revision-plan`.
  - Include OpenGraph `og:image` pointing directly to `https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png`.
  - Inject JSON-LD schemas: `BlogPosting`, `FAQPage`, and `BreadcrumbList`.
  - Pre-render complete semantic tables, headers, and meta description.

### Phase 5: Verification & Quality Gate
- Run `npm run build` to verify Vite bundling, prerendering, and static file generation.
- Run `node scripts/verify-crawl.mjs` ensuring all routes (now 116 routes) pass 100%.
- Run `node scripts/quality-check.mjs` verifying clean SEO, absence of forbidden phrases, and valid structured data.
- Run `compile_applet` to confirm zero TypeScript or bundling errors.

---

## 4. Verification Checklist

- [x] Direct image URL `https://i.ibb.co/4ZqpwCPY/1dcf9bba-10ba-4916-b2ee-a53345a3bfc3-1.png` assigned to the article's `heroImage` and OpenGraph metadata.
- [x] Article registered in `src/content/blogData.ts` with all headings, tables, phase plans, and FAQs.
- [x] Notification alert added to `src/data/gazetteData.ts` for `/board-exams` listing.
- [x] Interactive `UPBoardGapDayCalculator` component created with PCM/PCB toggles and gap checklist.
- [x] Hero image rendered cleanly in `BlogView.tsx` with responsive layout and semantic markup.
- [x] `scripts/prerender.mjs` updated with full static HTML pre-rendering.
- [x] Build, verify-crawl, and quality-check scripts pass with zero errors.
- [x] `compile_applet` succeeds without errors.
