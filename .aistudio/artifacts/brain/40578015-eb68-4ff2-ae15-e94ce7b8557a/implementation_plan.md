# Implementation Plan: Advanced Visitor Utilities for Job & Admit Card Articles

### Status: COMPLETED & VERIFIED

All planned features for job notification and admit card visitor enhancement have been built, integrated into `ArticleView.tsx`, compiled, and verified.

---

## 1. Candidate Utility Tools for Job & Admit Card Articles

- [x] **One-Click Google Calendar & Apple/Outlook (.ics) Deadline Sync (`CalendarSyncButton.tsx`)**:
  - Direct URL builder for Google Calendar prepopulated with event title, official link, deadline, and 24-hr reminder.
  - Native `.ics` file generator for offline iOS/Android/Outlook calendar import.
  - Mounted directly in the top action bar of every article.
- [x] **Client-Side Photo & Signature Resizer & Dimension Compressor (`PhotoSignatureResizerModal.tsx`)**:
  - 100% private, runs in-browser with HTML5 Canvas (zero images uploaded to any server).
  - Presets for SSC (Photo: 20–50 KB, 350×450 px; Sign: 10–20 KB, 400×200 px), UPSC / OTR (20–300 KB), and IBPS (20–50 KB, thumb impression).
  - Accessible via the top action bar and embedded within the Step-by-Step Application Guide.
- [x] **Multi-Cadre Post Preference, Promotion & Career Matrix (`PostPreferenceMatrix.tsx`)**:
  - Detailed comparison for ASO in CSS (Delhi Only), ASO in MEA (Foreign Postings), Income Tax Inspector (CBDT), Preventive Officer (CBIC Maritime), Sub-Inspector in CBI, and Assistant Audit Officer (CAG).
  - Side-by-side analysis of posting zones, desk vs. field duty, 7th CPC pay levels, uniform status, and promotion timelines.
  - Rendered automatically on all job notification articles.

---

## 2. Exam Day Super-Features for Admit Card Articles

- [x] **Permitted vs. Barred Items & Strict Dress Code Matrix (`ExamDayChecklist.tsx`)**:
  - Interactive tap-to-verify preparation checklist for mandatory items (Original Aadhaar/PAN, 2 passport photos, admit card printout, transparent pen).
  - List of confiscated items (Smartwatches, Bluetooth earbuds, large buckles, digital keys).
  - Official commission dress code rules (half sleeves, light buttons, flat sandals/slippers).
- [x] **Exam Center Locator & TCS iON Transit Navigator (`CenterTransitGuide.tsx`)**:
  - Searchable directory of major TCS iON examination hubs (Delhi-NCR Noida/Mundka, Patna Patliputra, Lucknow Chinhat, Kolkata Salt Lake, Mumbai Pawane, Jaipur Kukas).
  - Direct 1-tap Google Maps directions button for each test center.
  - Essential transit guidance: Nearest metro/rail station, luggage locker availability warning, and early arrival advice.
- [x] **Live Shift-Wise Candidate Feedback & Good Attempts Benchmark (`ShiftFeedbackBriefing.tsx`)**:
  - Tabbed analysis for Shift 1 (Morning), Shift 2 (Noon), Shift 3 (Afternoon), and Shift 4 (Evening).
  - Overall difficulty rating, consensus good attempts range, and safe raw score target.
  - Section-by-section breakdown (Reasoning, General Awareness, Quant, English) with high-frequency reported topics.
- [x] **Printable Emergency Candidate Undertaking & Misprint Declaration (`EmergencyUndertakingModal.tsx`)**:
  - Ready-to-print 1-page standard government undertaking form for candidates with blurred photos, missing signatures, or surname spelling errors.
  - Includes candidate bio-data blanks, attested photo affixation box, candidate legal declaration, and Center Superintendent verification stamp area.
- [x] **WhatsApp & Telegram Instant Gazette Broadcast Banners (`SocialAlertBanner.tsx`)**:
  - High-conversion banner positioned above candidate discussions for real-time exam alerts.
