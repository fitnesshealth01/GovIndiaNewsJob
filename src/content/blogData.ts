export interface GuideTable {
  title?: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideCTA {
  heading: string;
  subheading: string;
  buttonText: string;
  targetPath: string;
  badge?: string;
}

export interface GuideSection {
  heading: string;
  content: string;
  subsections?: Array<{
    subheading: string;
    body: string;
  }>;
  table?: GuideTable;
  cta?: GuideCTA;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: 'fitness' | 'exam-prep' | 'salary-insights';
  categoryLabel: string;
  readingTime: string;
  publishDate: string;
  author: string;
  summary: string;
  tags: string[];
  sections: GuideSection[];
  checklistItems?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  relatedSlugs?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'army-1600-meter-running-time-agniveer-pft-standards',
    title: 'Army 1600 Meter Running Standards & Agniveer Physical Fitness Guide',
    category: 'fitness',
    categoryLabel: 'Fitness & PFT',
    readingTime: '9 min read',
    publishDate: '03 October 2026',
    author: 'Akash Singh Solanki, Founder and Editor',
    summary: 'An authoritative reference guide on Indian Army Physical Fitness Test (PFT) 1600-meter running benchmarks, Group I vs Group II qualifying criteria, interval training protocols, age-specific Agniveer eligibility, and candidate rally day pitfalls.',
    tags: ['Agniveer 1600m time', 'Army physical test tips', 'Running stamina for recruitment', 'PFT Group 1 Marks', 'Beam Pull-Ups'],
    sections: [
      {
        heading: '1. Introduction: The Decisive 1.6 Km Indian Army Running Standard',
        content: `In the Indian Army recruitment architecture under the Agnipath Scheme, the 1600-meter (1.6 km) run is the single most critical physical gatekeeper. Conducted during Phase 2 at designated rally grounds across all Army Recruiting Offices (AROs) and Regimental Centers, this test evaluates cardiovascular capacity, anaerobic threshold, and raw grit under competitive pressure.

Unlike civilian road races, recruitment rally runs present unique environmental variables: batches of 150 to 250 aspirants are flagged off simultaneously in heats on unpaved dirt or grass tracks. Timing is recorded with absolute precision using electronic RFID bib transponders or synchronized visual finish-line barriers supervised by recruiting officers. For candidates competing for Agniveer General Duty (GD) and Tradesmen trades, running marks are not merely qualifying—they contribute directly to the 100-mark Physical Fitness Test (PFT) score that constitutes 50% of the final merit roster alongside the Common Entrance Examination (CEE).`
      },
      {
        heading: '2. Official 1600m Running Standards: Group I vs Group II Breakdown',
        content: `The Indian Army categorizes 1600m finishers into two scoring tiers, while all individuals finishing after 5 minutes 45 seconds are categorized as Failed. Understanding the distinction between Group I and Group II is crucial for tactical pacing on rally day:
- Group I (Up to 5 minutes 30 seconds): Candidates receive the maximum allotment of 60 marks in the running event. Securing Group I is virtually essential for Agniveer GD aspirants hoping to secure an unimpeachable position in the state or regimental merit list.
- Group II (5 minutes 31 seconds to 5 minutes 45 seconds): Candidates receive 48 marks (a 12-mark penalty compared to Group I). While qualifying, candidates entering Group II must compensate with perfect pull-up marks and high written CEE scores.

For Agniveer Technical and Agniveer Office Assistant / Clerk / SKT trades, the 1600m run is strictly qualifying in nature; candidates must finish within 5 minutes 45 seconds, but physical marks are not aggregated into the final academic merit list.

High-Altitude Concessions:
For recruitment rallies conducted in mountainous zones, standard timings are relaxed to compensate for reduced atmospheric oxygen:
• 5,000 ft to 9,000 ft: Add 30 seconds to all timings (Group I up to 6:00, Group II up to 6:15).
• 9,000 ft to 12,000 ft: Add 120 seconds to all timings (Group I up to 7:30, Group II up to 7:45).`,
        table: {
          title: 'Indian Army PFT 1600m Timing & Marks Comparative Matrix by Trade',
          caption: 'Standards verified against Join Indian Army official rally notifications and DG Recruiting standing orders.',
          headers: ['Recruitment Category / Trade', 'Group I Timing & Marks', 'Group II Timing & Marks', 'Beam Pull-Ups (Min. to Max)', '9-Ft Ditch & Zig-Zag', 'Final Merit Weightage'],
          rows: [
            ['Agniveer General Duty (GD) (All Arms)', 'Up to 5m 30s — 60 Marks', '5m 31s to 5m 45s — 48 Marks', '6 reps (16 M) to 10 reps (40 M)', 'Mandatory Qualifying', 'Physical (100 M) + CEE (100 M) = 200 M'],
            ['Agniveer Technical', 'Up to 5m 45s (Qualifying)', 'Up to 5m 45s (Qualifying)', 'Min. 6 Pull-Ups (Qualifying)', 'Mandatory Qualifying', 'CEE Marks Only (Physical is Qualifying)'],
            ['Agniveer Office Assistant / Clerk / SKT', 'Up to 5m 45s (Qualifying)', 'Up to 5m 45s (Qualifying)', 'Min. 6 Pull-Ups (Qualifying)', 'Mandatory Qualifying', 'CEE Marks Only (Typing + Physical Qualifying)'],
            ['Agniveer Tradesmen (10th & 8th Pass)', 'Up to 5m 30s — 60 Marks', '5m 31s to 5m 45s — 48 Marks', '6 reps (16 M) to 10 reps (40 M)', 'Mandatory Qualifying', 'Physical (100 M) + CEE (100 M) = 200 M'],
            ['Agniveer Women Military Police (WMP)', 'Up to 7m 30s — Group I', 'Up to 8m 00s — Group II', '10 ft Long Jump & 3 ft High Jump', 'Qualifying Only', 'CEE Marks + PFT Grading Standards']
          ]
        }
      },
      {
        heading: '3. Pre-Rally Screening: Physical Height, Chest & Weight Thresholds',
        content: `A critical reality of army rallies is the sequence of elimination: candidates are measured for minimum physical standards at the rally entrance gate before they ever step onto the 1600m running track. Aspirants who train relentlessly for running stamina but fail the physical stature bar by 0.5 cm are screened out immediately without refund or appeal.

Statutory Physical Standard Test (PST) parameters depend on the candidate’s recruitment trade and geographical domicile zone:
- Minimum Height: Ranges between 163 cm and 170 cm for male candidates across North, Western, Central, and Southern zones, with special relaxations down to 157 cm for Gorkhas, Dogras, and North-Eastern hill states.
- Chest Expansion: Minimum 77 cm unexpanded with a mandatory 5 cm expansion on full inhalation (reaching 82 cm).
- Body Mass Index (BMI): Weight must correspond proportionally to height and age as per official Army Medical Corps dispatch matrices.`,
        cta: {
          badge: 'Official Candidate Eligibility Tool',
          heading: 'Check Your Height & Chest Standards Before Rally Day',
          subheading: 'Avoid last-minute disqualification at the rally ground entrance bar. Verify your state domicile zone, post-specific minimum height (163–170 cm), and chest expansion criteria in seconds.',
          buttonText: 'Check Physical Height & Chest Standards →',
          targetPath: '/tools/height'
        }
      },
      {
        heading: '4. Building Running Stamina for Recruitment: 8-Week Interval Training Blueprint',
        content: `Transitioning from an average 7-minute kilometer baseline down to a competitive sub-5:30 Agniveer 1600 meter time requires targeted physiological adaptation. Many candidates make the grave error of attempting daily all-out 1600m sprints, which invariably induces shin splints, plantar fasciitis, and overtraining syndrome within three weeks.

A scientific physical regimen balances aerobic capacity (heart volume and capillary density) with anaerobic lactate tolerance through structured interval training. The following progressive 8-week cycle is designed specifically for army recruitment aspirants:

Phase 1: Weeks 1–2 (Aerobic Base Foundation)
- Objective: Build structural tendon resilience and cardiovascular endurance.
- Protocol: 4 to 5 km easy continuous running at Zone 2 conversational pace (65–70% max heart rate), 4 days per week. Conclude each session with 4x100m strides on grass to practice upright running posture.

Phase 2: Weeks 3–4 (Lactate Threshold & Stamina Escalation)
- Objective: Elevate the velocity at which lactic acid accumulates in muscle tissue.
- Protocol: Tuesday: 20-minute continuous tempo run at comfortably hard effort. Thursday: 4x800m repeats at 3:00 to 3:10 pace with 2 minutes walking recovery. Saturday: 6 km relaxed weekend endurance run.

Phase 3: Weeks 5–6 (Track Speed Intervals & 400m Target Splits)
- Objective: Master target 1600m race cadence. To achieve 5:20, each 400m lap must average 80 seconds.
- Protocol: Tuesday: 6x400m intervals on a standard 400m track targeting 78–82 seconds per lap, with 90 seconds rest. Thursday: 8x200m explosive sprints targeting 36–38 seconds. Saturday: 4 km progressive pace run.

Phase 4: Weeks 7–8 (Rally Simulation & Tapering)
- Objective: Sharpen tactical racing instincts and allow glycogen replenishment.
- Protocol: Week 7 features two full 1600m timed trial simulations with race-day footwear. Week 8 tapers volume by 50%, maintaining short, sharp 200m strides to preserve neuromuscular readiness without accumulated fatigue.`,
        table: {
          title: 'Weekly Training Regimen for Sub-5:30 1600m Run Preparation',
          caption: 'Always incorporate dynamic hip/hamstring warm-ups prior to speed sessions, and 10 minutes static stretching post-workout.',
          headers: ['Day of Week', 'Primary Workout Focus', 'Target Distance / Reps', 'Recovery / Pacing Benchmark'],
          rows: [
            ['Monday', 'Aerobic Base Run + Strides', '5 km continuous easy pace', 'Zone 2 (Able to speak full sentences) + 5x100m accelerations'],
            ['Tuesday', 'Track Interval Speed Work', '6 x 400m laps on track', 'Target: 78–82 sec per lap with 90 sec walking recovery'],
            ['Wednesday', 'Upper Body & Core (Beam Training)', '6 sets max pull-ups + core circuit', 'Strict military form pull-ups, planks, and leg raises'],
            ['Thursday', 'Lactate Threshold Intervals', '4 x 800m repeats', 'Target: 2m 50s to 3m 05s per 800m with 2 min active rest'],
            ['Friday', 'Active Recovery & Flexibility', '3 km light jog + yoga/stretching', 'Low impact mobility, foam rolling, and shin conditioning'],
            ['Saturday', 'Rally Simulation Trial / Long Run', '1600m timed trial OR 7 km endurance', 'Alternate every week: practice race-day pacing strategy'],
            ['Sunday', 'Complete Rest & Muscle Recovery', 'Zero running', 'Hydration, protein synthesis, and neuromuscular reset']
          ]
        }
      },
      {
        heading: '5. Age-Specific Agniveer Qualifying Criteria & Educational Eligibility',
        content: `Under the revised Agnipath Scheme regulations, candidate eligibility is strictly calibrated by age brackets and matriculation/intermediate academic marks. Candidates must ensure they fulfill both physical criteria and statutory age bounds before applying:

Age Limits (All Agniveer Trades):
• Minimum Age: 17½ Years (17.5 years completed on the date of application).
• Maximum Age: 21 Years (Candidate must not have attained 21 years on the crucial cutoff date).
• Crucial Birth Window for 2026 Rallies: Candidates must be born between 01 October 2005 and 01 April 2009 (both dates inclusive).

Trade-Wise Educational Marks Matrix:
1. Agniveer General Duty (GD): Class 10th / Matric pass with minimum 45% marks in aggregate and 33% marks in each individual subject.
2. Agniveer Technical: 10+2 / Intermediate Examination pass in Science with Physics, Chemistry, Maths, and English with minimum 50% marks in aggregate and 40% in each subject.
3. Agniveer Office Assistant / Clerk: 10+2 / Intermediate pass in any stream (Arts, Commerce, Science) with 60% marks in aggregate and minimum 50% in each subject. Securing 50% in English and Maths/Accounts at Class 12th is mandatory.
4. Agniveer Tradesmen (10th Pass): Class 10th simple pass with no aggregate percentage cap, but minimum 33% in each subject.
5. Agniveer Tradesmen (8th Pass): Class 8th simple pass for specific trades with minimum 33% in each subject.`
      },
      {
        heading: '6. Additional PFT Tested Events: Beam (Pull-Ups), 9-Ft Ditch & Zig-Zag',
        content: `While the 1600-meter run is the primary filter, the Physical Fitness Test is composed of three additional standardized military stations conducted immediately after candidates clear the running track:

Station 2: Pull-Ups on Beam (Underhand Grip)
• 10 Pull-Ups: 40 Marks (Maximum allotment)
• 9 Pull-Ups: 33 Marks
• 8 Pull-Ups: 27 Marks
• 7 Pull-Ups: 21 Marks
• 6 Pull-Ups: 16 Marks (Minimum qualifying threshold)
• Fewer than 6 Pull-Ups: Disqualified from recruitment

Station 3: 9-Foot Ditch Jump: Mandatory qualifying without touching ditch borders.
Station 4: Zig-Zag Balance: Mandatory balancing on elevated wooden beam without slipping.`
      },
      {
        heading: '7. Top 5 Fatal Mistakes Candidates Make on Rally Day',
        content: `1. Early 200m Sprint Burnout: Burning all glycogen reserves in the first 200 meters. Settle into an 80-second lap pace.
2. Dehydration from Extended Holding Pens: Standing or sitting in cold 2 AM holding pens for 5+ hours without light carbs or electrolytes.
3. Untried Footwear: Running in brand new shoes or barefoot on loose gravel tracks.
4. Faulty Pull-Up Posture: Bending knees or swinging body during beam pull-ups.
5. Neglecting Chest Expansion Technique: Pushing stomach out instead of expanding rib cage laterally.`
      }
    ],
    checklistItems: [
      'Confirm statutory age between 17½ and 21 years on the crucial cutoff date.',
      'Verify trade-specific minimum height (163–170 cm) and 77 cm chest with 5 cm expansion.',
      'Achieve consistent sub-5:30 1600m splits in training before rally day.',
      'Master 10 strict dead-hang pull-ups on the beam without knee swing.',
      'Pack electrolytes, ORS sachets, bananas, and light glucose for the holding area.',
      'Carry original Admit Card printed on laser paper, 20 passport photos, and valid photo ID.'
    ],
    faqs: [
      {
        question: 'Do 1600m running marks count towards the final merit list for Agniveer GD?',
        answer: 'Yes. For Agniveer General Duty and Agniveer Tradesmen, Physical Fitness Test marks (60 for Group I run + 40 for 10 pull-ups = 100 marks) are added directly to the Common Entrance Examination (CEE) score (100 marks) to generate the final 200-mark selection merit list.'
      },
      {
        question: 'What is the cutoff time for Group I in the Agniveer 1600m run?',
        answer: 'Candidates who complete the 1.6 km run in up to 5 minutes 30 seconds are categorized in Group I and awarded the full 60 marks. Candidates finishing between 5 minutes 31 seconds and 5 minutes 45 seconds are placed in Group II and receive 48 marks.'
      },
      {
        question: 'Are physical running marks considered for Agniveer Technical and Clerk trades?',
        answer: 'No. For Agniveer Technical and Agniveer Office Assistant / Clerk / Store Keeper Technical, the 1600m run and beam pull-ups are strictly qualifying. Final merit is computed solely from written exam marks.'
      }
    ],
    relatedSlugs: ['document-preparation-checklist', 'central-government-7th-cpc-salary-rules']
  },
  {
    slug: 'document-preparation-checklist',
    title: 'Central Government Job Application Document Preparation Checklist',
    category: 'exam-prep',
    categoryLabel: 'Exam Prep',
    readingTime: '8 min read',
    publishDate: '01 October 2026',
    author: 'Akash Singh Solanki, Founder and Editor',
    summary: 'A step-by-step master checklist for assembling, certifying, and digitizing all academic, identity, domicile, and reservation documents prior to filling online application forms on SSC, UPSC, IBPS, and Railway portals.',
    tags: ['Document Verification', 'Matriculation', 'OBC-NCL Certificate', 'EWS Validity', 'DoPT Annexure'],
    sections: [
      {
        heading: '1. Why Advance Document Preparation is Non-Negotiable',
        content: `Applying for central government recruitment examinations conducted by the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Railway Recruitment Boards (RRB), and the Institute of Banking Personnel Selection (IBPS) requires absolute precision in documentation. Every year, thousands of candidates successfully clear multiple competitive examination tiers only to be summarily rejected during Document Verification (DV) by user ministries due to minor discrepancies in certificate issuing dates, mismatched name spellings, non-prescribed authority signatures, or invalid financial year certificates.`
      },
      {
        heading: '2. Primary Matriculation and Academic Records',
        content: `Your Class 10 (Matriculation) Certificate is the foundational legal document in central recruitment. Under Department of Personnel and Training (DoPT) regulations, the candidate's full name, father's name, mother's name, and date of birth entered in the recruitment portal must correspond character-for-character with the matriculation certificate. No affidavits or subsequent court declarations are entertained to alter birth dates registered on matriculation certificates.`
      },
      {
        heading: '3. Community and Reservation Certificates: Formats and Authorities',
        content: `Statutory reservation for Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), and Economically Weaker Sections (EWS) requires presentation of certificates strictly formatted according to central government proformas appended to the recruitment notice. State government reservation certificates that do not state eligibility for appointment to posts under the Government of India are strictly invalid for central recruitments.`
      }
    ],
    checklistItems: [
      'Matriculation (10th) mark sheet with identical spelling of candidate, father, and mother name.',
      'Higher secondary and undergraduate degree provisional or original certificates.',
      'Central Government OBC-NCL certificate valid for the prescribed financial year.',
      'Central EWS Income & Asset Certificate issued by competent revenue authority.',
      'High-resolution digital scan of passport photo (20-50 KB) and signature (10-20 KB).'
    ],
    faqs: [
      {
        question: 'Can I submit an affidavit if my father’s name has a spelling discrepancy?',
        answer: 'While an executive magistrate affidavit may be accepted conditionally during initial document verification, user ministries mandate rectifying the matriculation board certificate before final appointment issuance.'
      },
      {
        question: 'What is the validity period of an OBC-NCL certificate for central government exams?',
        answer: 'Central OBC-NCL certificates must generally be issued within the financial year of recruitment or up to 3 years prior to the crucial date, explicitly stating the applicant does not belong to the creamy layer.'
      }
    ],
    relatedSlugs: ['how-to-read-recruitment-notification', 'army-1600-meter-running-time-agniveer-pft-standards']
  },
  {
    slug: 'how-to-read-recruitment-notification',
    title: 'How to Read a Government Recruitment Notification: Roster, Pay, and Eligibility',
    category: 'salary-insights',
    categoryLabel: 'Salary Insights',
    readingTime: '10 min read',
    publishDate: '01 October 2026',
    author: 'Akash Singh Solanki, Founder and Editor',
    summary: 'A masterclass on dissecting complex public recruitment gazettes: decoding 200-point reservation rosters, horizontal vs vertical reservation, 7th CPC pay scales versus in-hand take-home pay, and distinguishing essential from desirable criteria.',
    tags: ['Gazette Analysis', '200-Point Roster', 'Pay Matrix Levels', 'Vertical Reservation', 'DoPT Rules'],
    sections: [
      {
        heading: '1. Demystifying the Official Gazette Notification',
        content: `Official recruitment notifications published by central bodies like the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), and Railway Recruitment Boards (RRB) are dense legal-administrative instruments running between 50 and 150 pages. Framed in bureaucratic parlance, these documents codify binding statutory obligations governing eligibility, post quotas, pay matrices, examination schemes, and service liability.`
      },
      {
        heading: '2. Deciphering the Vacancy Table and Reservation Rosters',
        content: `Every recruitment notification features a detailed Vacancy Breakdown Table that categorizes appointments across Unreserved (UR), SC, ST, OBC, EWS, and PwBD/ESM sub-allocations.
- Vertical Reservation: Applies independently to SC (15%), ST (7.5%), OBC (27%), and EWS (10%). Candidates belonging to these categories who secure scores above the UR merit benchmark without availing category-specific relaxations are adjusted against the open UR quota.
- Horizontal Reservation: Cuts across vertical categories and applies to Persons with Benchmark Disabilities (PwBD) and Ex-Servicemen (ESM).`
      },
      {
        heading: '3. Understanding Pay Scale Matrices: Basic vs Gross vs Take-Home',
        content: `Recruitment notifications cite remuneration using 7th CPC Pay Matrix Levels (Level 1 to Level 18) rather than fixed monthly salaries:
- Pay Level and Starting Basic Pay: Level 1 begins at ₹18,000, Level 4 at ₹25,500, Level 7 at ₹44,900, and Level 10 at ₹56,100.
- Dearness Allowance (DA): Periodically revised biannually to offset inflation.
- House Rent Allowance (HRA): Categorized strictly by posting location into Class X (30%), Class Y (20%), and Class Z (10%).`
      }
    ],
    checklistItems: [
      'Locate the Crucial Date for age and qualifications in paragraph 1 or 2.',
      'Identify whether your post requires specific physical standards (PET/PST) or color vision tests.',
      'Check whether the post has All India Service Liability (AISL) or specific regional postings.',
      'Review the negative marking ratio (0.25, 0.33, or 0.50 marks) in the examination scheme table.'
    ],
    faqs: [
      {
        question: 'What does All India Service Liability (AISL) mean?',
        answer: 'AISL indicates that appointed officers can be transferred and posted anywhere within the sovereign territory of India, including field offices, border regions, or island territories.'
      }
    ],
    relatedSlugs: ['central-government-7th-cpc-salary-rules', 'document-preparation-checklist']
  },
  {
    slug: 'central-government-7th-cpc-salary-rules',
    title: '7th Central Pay Commission Salary Matrix: In-Hand Pay, DA & HRA Rules',
    category: 'salary-insights',
    categoryLabel: 'Salary Insights',
    readingTime: '8 min read',
    publishDate: '02 October 2026',
    author: 'Akash Singh Solanki, Founder and Editor',
    summary: 'Complete arithmetic breakdown of central government remuneration under the 7th CPC: Pay Levels 1 through 14, Dearness Allowance (DA) calculation, metropolitan HRA classification (X, Y, Z cities), NPS deductions, and net monthly take-home salary.',
    tags: ['7th CPC Pay Matrix', 'In-Hand Salary', 'DA Calculation', 'HRA Classification', 'NPS Deductions'],
    sections: [
      {
        heading: '1. The Anatomy of Central Government Compensation',
        content: `When candidates review recruitment notifications advertising posts in "Pay Level 4 (₹25,500 – ₹81,100)" or "Pay Level 7 (₹44,900 – ₹1,42,400)", confusion often arises between the starting basic pay and the actual take-home credit in their bank account.

Under the 7th Central Pay Commission (CPC) framework accepted by the Government of India, monthly remuneration is determined by a formula comprising Basic Pay, Dearness Allowance (DA), House Rent Allowance (HRA), and Transport Allowance (TA), adjusted for mandatory statutory deductions under the National Pension System (NPS).`
      },
      {
        heading: '2. Pay Matrix Levels & Starting Basic Pay Benchmarks',
        content: `The 7th CPC replaces the previous 6th CPC Pay Band and Grade Pay structure with an integrated 18-level Pay Matrix:
• Pay Level 1 (Grade Pay ₹1800): Starting Basic ₹18,000 (Multi-Tasking Staff, Railway Group D)
• Pay Level 2 (Grade Pay ₹1900): Starting Basic ₹19,900 (Lower Division Clerk, Railway Junior Clerk)
• Pay Level 4 (Grade Pay ₹2400): Starting Basic ₹25,500 (SSC CHSL Postal Assistant, Delhi Police Head Constable)
• Pay Level 6 (Grade Pay ₹4200): Starting Basic ₹35,400 (SSC CGL Sub-Inspector, Railway Station Master)
• Pay Level 7 (Grade Pay ₹4600): Starting Basic ₹44,900 (SSC CGL Inspector of Income Tax, Assistant Section Officer)
• Pay Level 8 (Grade Pay ₹4800): Starting Basic ₹47,600 (Assistant Accounts Officer)
• Pay Level 10 (Grade Pay ₹5400): Starting Basic ₹56,100 (UPSC Civil Services Group A, CAPF Assistant Commandant)`
      },
      {
        heading: '3. City Classification for House Rent Allowance (HRA)',
        content: `HRA is provided to officers not allotted official government residential quarters, categorized based on census population tiers:
- Class X Cities (Population 50 Lakh+): 30% of Basic Pay (Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Ahmedabad, Pune).
- Class Y Cities (Population 5 Lakh to 50 Lakh): 20% of Basic Pay (State capitals and major tier-2 commercial hubs).
- Class Z Cities (Population under 5 Lakh): 10% of Basic Pay (Rural and smaller district postings).`
      }
    ],
    checklistItems: [
      'Confirm the official Pay Level in paragraph 3 of the recruitment notification.',
      'Check whether the department provides government accommodation or monthly HRA.',
      'Account for 10% NPS deduction on (Basic Pay + DA).',
      'Verify whether specialized allowances (Risk, Hardship, Uniform) apply to your post.'
    ],
    faqs: [
      {
        question: 'How is the National Pension System (NPS) deduction computed?',
        answer: 'The employee contributes 10% of (Basic Pay + DA) each month, while the Central Government contributes 14% towards the employee’s Tier-I NPS retirement corpus.'
      }
    ],
    relatedSlugs: ['how-to-read-recruitment-notification', 'ssc-cgl-tier1-preparation-strategy']
  },
  {
    slug: 'ssc-cgl-tier1-preparation-strategy',
    title: '90-Day SSC CGL Tier 1 Scoring Strategy & Negative Marking Control',
    category: 'exam-prep',
    categoryLabel: 'Exam Prep',
    readingTime: '9 min read',
    publishDate: '02 October 2026',
    author: 'Akash Singh Solanki, Founder and Editor',
    summary: 'A data-driven 90-day study roadmap for clearing SSC CGL Tier 1: section-by-section time management (General Intelligence, General Awareness, Quantitative Aptitude, English Comprehension), question selection tactics, and eliminating negative marking penalties.',
    tags: ['SSC CGL Tier 1', 'Negative Marking', 'Quant Strategy', 'Mock Analysis', 'Time Management'],
    sections: [
      {
        heading: '1. Understanding the Qualifying Nature of Tier 1',
        content: `Under the revised Staff Selection Commission examination pattern, SSC CGL Tier 1 is qualifying in nature. Marks scored in Tier 1 do not count towards final post-allocation merit, which is determined exclusively by Tier 2 normalized scores. However, with cutoffs routinely settling in the 140–155 raw score bracket out of 200 marks for Unreserved candidates, qualifying Tier 1 demands disciplined preparation and zero reckless guesswork.`
      },
      {
        heading: '2. Section-Wise Allocation & 60-Minute Exam Protocol',
        content: `Tier 1 comprises 100 questions (2 marks each, negative penalty of 0.50 marks per wrong answer) to be solved within exactly 60 minutes:
1. General Intelligence & Reasoning (25 Qs): Target 12–14 minutes, aim for 22+ correct questions.
2. English Comprehension (25 Qs): Target 8–10 minutes, high-scoring section for vocabulary and grammar.
3. General Awareness (25 Qs): Target 6–8 minutes, answer known factual and current affairs questions quickly.
4. Quantitative Aptitude (25 Qs): Target 25–28 minutes, solve arithmetic and algebra without stalling on lengthy geometry questions.`
      },
      {
        heading: '3. Controlling Negative Marking & Guesswork Penalties',
        content: `With a -0.50 deduction per incorrect attempt (a 25% penalty on positive mark value), making 12 incorrect guesses wipes out 6 hard-earned positive marks—often the exact difference between qualifying and elimination. Only attempt questions where you can eliminate at least two options logically.`
      }
    ],
    checklistItems: [
      'Take at least 25 full-length computer-based mock tests in exam interface mode.',
      'Maintain an error log analyzing silly calculation mistakes in Quant and Reasoning.',
      'Revise last 6 months of national and international current affairs.',
      'Practice 1-minute question skipping: skip difficult questions on first pass and return if time permits.'
    ],
    faqs: [
      {
        question: 'Does Tier 1 score affect final post allocation in SSC CGL?',
        answer: 'No. Tier 1 is qualifying only. Final appointment and merit rank are determined strictly by performance in Tier 2 (Paper-I: Sections 1, 2, and 3).'
      }
    ],
    relatedSlugs: ['document-preparation-checklist', 'central-government-7th-cpc-salary-rules']
  }
];
