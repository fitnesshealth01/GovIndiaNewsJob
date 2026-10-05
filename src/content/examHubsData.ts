export interface ExamStage {
  stage: string;
  name: string;
  mode: string;
  details: string;
}

export interface ExamPatternRow {
  section: string;
  questions: number;
  marks: number;
  duration: string;
  negativeMarking: string;
}

export interface ExamHub {
  slug: string;
  title: string;
  examName: string;
  conductingBody: string;
  officialUrl: string;
  lastReviewed: string;
  overview: string;
  eligibility: {
    ageLimit: string;
    educationalQualification: string;
    nationality: string;
    attempts: string;
  };
  selectionStages: ExamStage[];
  syllabusAndPattern: {
    overview: string;
    patternTable: ExamPatternRow[];
    syllabusHighlights: string[];
  };
  payAndCareerGrowth: {
    payLevel: string;
    startingBasic: string;
    inHandRange: string;
    hierarchy: string[];
    pensionAndPerks: string;
  };
  preparationStrategy: string[];
  commonMistakes: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const EXAM_HUBS: ExamHub[] = [
  {
    slug: 'ssc-cgl',
    title: 'SSC CGL Examination Comprehensive Blueprint (2026)',
    examName: 'Combined Graduate Level (CGL)',
    conductingBody: 'Staff Selection Commission (SSC)',
    officialUrl: 'https://ssc.gov.in',
    lastReviewed: '01 October 2026',
    overview: `The Staff Selection Commission Combined Graduate Level (SSC CGL) examination serves as the premier gateway for recruiting Group 'B' Gazetted, Non-Gazetted, and Group 'C' executive personnel across ministries, departments, and constitutional bodies of the Government of India. As one of the most competitive public examinations in India attracting over 2.5 to 3 million applicants annually, SSC CGL allocates officers into critical revenue, enforcement, investigative, and secretarial cadres including Assistant Section Officers (CSS, MEA, IB, Railway Board), Inspectors of Central Excise/GST, Income Tax Inspectors, Sub-Inspectors in CBI and NIA, and Divisional Accountants under the Comptroller and Auditor General (CAG) of India. The examination operates under a centralized computerized testing framework adhering to strict 7th Central Pay Commission (7th CPC) pay structures spanning Levels 4 through Level 8.`,
    eligibility: {
      ageLimit: '18 to 32 Years as on crucial date (01 August 2026). Post-specific brackets apply: 18-27 years for Auditor/Tax Assistant; 20-30 years for ASO/Inspector; up to 32 years for Junior Statistical Officer (JSO). Statutory relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 to +15 yrs.',
      educationalQualification: 'Bachelor’s Degree in any discipline from a recognized University or equivalent. For Junior Statistical Officer (JSO): Bachelor’s Degree with at least 60% Marks in Mathematics at 10+2 level or Bachelor’s Degree with Statistics as one of the subjects at degree level. Final-year students must possess the provisional degree prior to the specified closing date.',
      nationality: 'Citizen of India, subject of Nepal, subject of Bhutan, or Tibetan refugee settled in India prior to 01-01-1962.',
      attempts: 'No restriction on the number of attempts within the prescribed age limit.',
    },
    selectionStages: [
      {
        stage: 'Tier-1',
        name: 'Preliminary Computer-Based Examination',
        mode: 'Online Objective MCQ (Computer-Based Test)',
        details: 'Screening examination consisting of 100 questions (200 marks) across 4 sections: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Tier-1 score is qualifying in nature for shortlisting candidates for Tier-2.',
      },
      {
        stage: 'Tier-2',
        name: 'Mains Examination & Skill Test',
        mode: 'Online Objective & Data Entry Speed Test',
        details: 'Mandatory Paper-I conducted in two sessions on the same day: Section-I (Mathematical Abilities + Reasoning, 180 marks), Section-II (English Language + General Awareness, 210 marks), Section-III (Computer Knowledge Module, qualifying, 60 marks), and Section-IV (Data Entry Speed Test / DEST: 2000 key depressions in 15 minutes, qualifying). Separate Paper-II applies for JSO candidates.',
      },
      {
        stage: 'Document Verification',
        name: 'User Department Verification',
        mode: 'Physical Verification by Indenting Ministry',
        details: 'Conducted directly by the appointing Ministry / Department upon final merit recommendation by the Commission based on aggregate Tier-2 Paper-I scores.',
      },
    ],
    syllabusAndPattern: {
      overview: 'Tier-1 features 100 questions of 2 marks each with a 60-minute composite duration. Tier-2 Paper-I is divided into mathematical, reasoning, verbal, general awareness, and computer applications modules.',
      patternTable: [
        { section: 'Tier-1: General Intelligence & Reasoning', questions: 25, marks: 50, duration: 'Composite 60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: General Awareness', questions: 25, marks: 50, duration: 'Composite 60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: Quantitative Aptitude', questions: 25, marks: 50, duration: 'Composite 60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: English Comprehension', questions: 25, marks: 50, duration: 'Composite 60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-2 Paper-I Sec-I: Math + Reasoning', questions: 60, marks: 180, duration: '60 Mins', negativeMarking: '1.00 mark (1/3rd)' },
        { section: 'Tier-2 Paper-I Sec-II: English + GA', questions: 70, marks: 210, duration: '60 Mins', negativeMarking: '1.00 mark (1/3rd)' },
        { section: 'Tier-2 Paper-I Sec-III: Computer Module', questions: 20, marks: 60, duration: '15 Mins', negativeMarking: '1.00 mark (Qualifying)' },
      ],
      syllabusHighlights: [
        'Quantitative Aptitude: Number Systems, Algebra, Geometry, Mensuration, Trigonometry, Statistical Charts, and Elementary Calculus basics.',
        'General Intelligence: Analogies, Venn diagrams, Syllogisms, Figural series, Coding-Decoding, Critical reasoning, and Matrix logic.',
        'English Language: Vocabulary, Idioms & Phrases, Reading Comprehension passages, Spotting errors, Active/Passive voice, and Direct/Indirect speech.',
        'General Awareness: Indian Polity, Modern History, Geography, Macroeconomics, General Science (Physics, Chemistry, Biology), and Current Affairs.',
        'Computer Knowledge: CPU Architecture, Windows OS navigation, MS Office suite (Word, Excel, PowerPoint), Networking fundamentals, Cyber Security, and Internet protocols.',
      ],
    },
    payAndCareerGrowth: {
      payLevel: 'Pay Level 4 (₹25,500) to Pay Level 8 (₹47,600) under the 7th CPC Matrix',
      startingBasic: '₹25,500 (Tax Assistant/LDC) to ₹47,600 (Assistant Audit Officer)',
      inHandRange: '₹38,000 to ₹86,000 per month depending on Pay Level and City Classification (X/Y/Z)',
      hierarchy: [
        'Entry: Assistant Section Officer / Inspector of Central Tax (Level 7, Basic ₹44,900)',
        'First Promotion (5-8 Yrs): Section Officer / Superintendent of Central Tax (Level 8 / 9)',
        'Second Promotion (12-15 Yrs): Under Secretary / Assistant Commissioner (Level 11)',
        'Senior Cadre: Deputy Secretary / Joint Commissioner (Level 12 / 13)',
      ],
      pensionAndPerks: 'Governed under National Pension System (NPS) with 14% Government contribution, Central Government Health Scheme (CGHS) medical cover for family, Leave Travel Concession (LTC) every 2 years, Government Quarter (GPRA) allotment, and Children Education Allowance (CEA).',
    },
    preparationStrategy: [
      'Master Fundamental Arithmetic & Geometry: Complete NCERT mathematics from class 8 to 10 followed by standard quantitative references (Advance Maths + Arithmetic), ensuring speed in mental calculations.',
      'Daily English Reading Habit: Read editorial sections of standard national dailies to improve vocabulary, cloze test intuition, and reading comprehension speed.',
      'Targeted Previous Year Paper Drills: Solve at least 50 full-length previous year CBT shift papers under exact 60-minute countdown constraints to master time allocation.',
      'Rigorous Computer Literacy Preparation: Do not neglect Tier-2 Section-III Computer Knowledge; failure to score minimum qualifying marks in computers eliminates candidates even if their aggregate score is high.',
      'Keyboard Typing Practice: Dedicate 20 minutes daily to touch-typing on QWERTY keyboards to comfortably exceed the 27 words per minute (2000 depressions in 15 mins) DEST requirement.',
    ],
    commonMistakes: [
      'Over-Attempting with Blind Guesswork: Tier-2 carries a heavy 1.00 mark penalty per wrong answer (33.3% deduction). Guessing 10 questions randomly can wipe out 13.3 marks.',
      'Failing the Computer Knowledge Cutoff: Annually, thousands of top-scoring candidates are disqualified solely because they failed the 18/60 mark threshold in the qualifying Computer module.',
      'Ignoring English Comprehension Weightage: Tier-2 Paper-I English carries 45 questions (135 marks) — the single highest weighted subject in determining final rank.',
      'Belated Category Documentation: Obtaining OBC-NCL or EWS certificates after the application closing deadline causes administrative rejection during department verification.',
    ],
    faqs: [
      {
        question: 'Is Tier-1 marks counted in the final merit list of SSC CGL?',
        answer: 'No. As per the revised examination scheme introduced by the Staff Selection Commission, Tier-1 is purely qualifying in nature. Final merit ranking and post allocation are based strictly on aggregate performance in Paper-I of Tier-2 examination.',
      },
      {
        question: 'Is there sectional timing in SSC CGL Tier-1?',
        answer: 'No. Tier-1 provides a composite duration of 60 minutes (80 minutes for eligible PwBD scribe candidates) during which the candidate can freely switch between Reasoning, Quantitative Aptitude, English, and General Awareness.',
      },
      {
        question: 'Is typing (DEST) compulsory for all posts in SSC CGL?',
        answer: 'Yes. The Data Entry Speed Test (DEST) is mandatory for all posts in SSC CGL under Tier-2 Paper-I. Candidates must achieve approximately 27 words per minute (2000 key depressions in 15 minutes) with error percentages within permissible category thresholds.',
      },
      {
        question: 'What is the in-hand salary of an Assistant Section Officer (ASO) in Delhi?',
        answer: 'An ASO in Level 7 (Basic ₹44,900) posted in New Delhi (Class X city) receives an approximate in-hand monthly salary of ₹76,500 to ₹78,800 post 10% NPS deduction, assuming 50% Dearness Allowance and 30% HRA.',
      },
      {
        question: 'Can final-year graduation students apply for SSC CGL?',
        answer: 'Candidates appearing in their final year can apply provided they acquire the essential educational qualification (degree result declared) on or before the crucial closing date specified in the official notification.',
      },
    ],
  },
  {
    slug: 'ssc-chsl',
    title: 'SSC CHSL 10+2 Examination Comprehensive Guide (2026)',
    examName: 'Combined Higher Secondary Level (10+2)',
    conductingBody: 'Staff Selection Commission (SSC)',
    officialUrl: 'https://ssc.gov.in',
    lastReviewed: '01 October 2026',
    overview: `The Staff Selection Commission Combined Higher Secondary Level (SSC CHSL) examination is the most prominent national competitive examination for 10+2 (Higher Secondary) qualified aspirants in India. It recruits clerical, secretarial, and data handling professionals into ministries, attached departments, armed forces headquarters, and statutory tribunals across the Union Government. Major posts include Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO). Featuring a modern two-tier computerized testing model with integrated skill testing, CHSL offers stable central civil employment with clear promotion avenues into executive ranks.`,
    eligibility: {
      ageLimit: '18 to 27 Years as on crucial date. Standard category relaxations: +3 yrs for OBC-NCL, +5 yrs for SC/ST, +10 yrs for PwBD.',
      educationalQualification: 'Must have passed 12th Standard or equivalent examination from a recognized Board or University. For DEO Grade A in the Office of Comptroller and Auditor General of India (CAG): 12th Standard pass in Science stream with Mathematics as a subject.',
      nationality: 'Citizen of India, subject of Nepal/Bhutan.',
      attempts: 'Unlimited attempts within the prescribed age ceiling.',
    },
    selectionStages: [
      {
        stage: 'Tier-1',
        name: 'Computer-Based Examination',
        mode: 'Online Objective MCQ',
        details: '100 questions (200 marks) across 4 sections: Reasoning, Quantitative Aptitude, English, and General Awareness. 60-minute duration. Qualifying for Tier-2.',
      },
      {
        stage: 'Tier-2',
        name: 'Mains CBT & Skill / Typing Test',
        mode: 'Online Objective CBT + Typing Test',
        details: 'Section-I (Math + Reasoning, 180 marks), Section-II (English + GA, 180 marks), Section-III (Computer Knowledge, qualifying), Section-IV (Skill Test / Typing Test, qualifying).',
      },
    ],
    syllabusAndPattern: {
      overview: 'Pattern mirrors the 2-tier structure with 10+2 standard syllabus difficulty.',
      patternTable: [
        { section: 'Tier-1: English Language (Basic Knowledge)', questions: 25, marks: 50, duration: '60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: General Intelligence', questions: 25, marks: 50, duration: '60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: Quantitative Aptitude (Basic Arithmetic)', questions: 25, marks: 50, duration: '60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-1: General Awareness', questions: 25, marks: 50, duration: '60 Mins', negativeMarking: '0.50 marks' },
        { section: 'Tier-2 Paper-I Sec-I: Math + Reasoning', questions: 60, marks: 180, duration: '60 Mins', negativeMarking: '1.00 mark' },
        { section: 'Tier-2 Paper-I Sec-II: English + GA', questions: 60, marks: 180, duration: '60 Mins', negativeMarking: '1.00 mark' },
      ],
      syllabusHighlights: [
        'Arithmetic: Percentages, Ratios, Averages, Simple & Compound Interest, Profit & Loss, Time & Work.',
        'Algebra & Mensuration: Basic algebraic identities, Triangles, Quadrilaterals, Circles, Surface area and volume.',
        'English: Spot the error, Fill in the blanks, Synonyms/Antonyms, Idioms, Active/Passive voice.',
        'General Awareness: History, Culture, Geography, Economic Scene, General Policy and Scientific Research.',
      ],
    },
    payAndCareerGrowth: {
      payLevel: 'Pay Level 2 (₹19,900–₹63,200) for LDC/JSA; Pay Level 4 (₹25,500–₹81,100) and Level 5 (₹29,200–₹92,300) for DEO.',
      startingBasic: '₹19,900 (LDC) / ₹25,500 (DEO)',
      inHandRange: '₹31,000 to ₹45,000 per month depending on post level and posting city classification.',
      hierarchy: [
        'Entry: Lower Division Clerk / JSA (Pay Level 2)',
        'Promotion 1 (5-8 Yrs): Upper Division Clerk / Senior Secretariat Assistant (Pay Level 4)',
        'Promotion 2 (10-14 Yrs): Assistant Section Officer (Pay Level 7 through LDCE or seniority)',
        'Promotion 3: Section Officer (Pay Level 8)',
      ],
      pensionAndPerks: 'NPS pension scheme, CGHS medical cover, LTC, and subsidized government housing accommodation.',
    },
    preparationStrategy: [
      'Focus on Speed & Accuracy: Tier-1 requires solving 100 questions in 60 minutes (36 seconds per question). Develop fast calculation techniques.',
      'Daily 30-Minute Typing Practice: The skill test requires 35 WPM in English or 30 WPM in Hindi. Consistent daily keyboard drills prevent panic during the test.',
      'Review High-Frequency Grammar Rules: Master subject-verb agreement, prepositional phrases, and tense sequences to score full marks in English.',
    ],
    commonMistakes: [
      'Neglecting Typing Speed Early: Candidates often score high in written stages but fail the mandatory 35 WPM typing test.',
      'Weak Time Management in Quantitative Aptitude: Spending over 2 minutes on complex geometry questions leaves candidates insufficient time for easy general awareness questions.',
    ],
    faqs: [
      {
        question: 'What is the minimum typing speed required for LDC in SSC CHSL?',
        answer: 'For Lower Division Clerk (LDC) / JSA, the typing test speed requirement is 35 words per minute in English (10,500 key depressions per hour) or 30 words per minute in Hindi (9,000 key depressions per hour).',
      },
      {
        question: 'Is descriptive paper (Tier-2 essay/letter writing) still conducted in SSC CHSL?',
        answer: 'No. The offline pen-and-paper descriptive paper (Essay and Letter writing) has been completely discontinued and replaced with the online Tier-2 objective computer-based test.',
      },
      {
        question: 'Can arts and commerce students apply for Data Entry Operator (DEO)?',
        answer: 'Arts and Commerce stream students can apply for DEO in various ministries. However, for DEO Grade A in CAG, 12th standard pass in Science stream with Mathematics is mandatory.',
      },
      {
        question: 'Is negative marking present in SSC CHSL Tier-1?',
        answer: 'Yes. Tier-1 carries a negative marking penalty of 0.50 marks for each incorrect response (1/4th penalty on 2-mark questions).',
      },
      {
        question: 'What is the in-hand salary of an LDC in a metropolitan city like Delhi?',
        answer: 'An LDC at Pay Level 2 (Basic ₹19,900) in a Class X city (like Delhi) receives an approximate in-hand monthly salary of ₹33,000 to ₹35,200 post NPS deductions.',
      },
    ],
  },
  {
    slug: 'ssc-mts',
    title: 'SSC MTS & Havaldar Examination Blueprint (2026)',
    examName: 'Multi-Tasking (Non-Technical) Staff & Havaldar',
    conductingBody: 'Staff Selection Commission (SSC)',
    officialUrl: 'https://ssc.gov.in',
    lastReviewed: '01 October 2026',
    overview: `The Staff Selection Commission Multi-Tasking (Non-Technical) Staff and Havaldar Examination (SSC MTS) is the nation’s largest recruitment conduit for Matriculation (10th Pass) youth. It recruits General Central Service Group 'C' Non-Gazetted, Non-Ministerial personnel across Central Government Ministries, attached offices, Central Board of Indirect Taxes and Customs (CBIC), and Central Bureau of Narcotics (CBN). The recruitment operates under a modern single-stage computerized examination with zero negative marking in Session-I, paired with a Physical Efficiency Test (PET) strictly for Havaldar posts.`,
    eligibility: {
      ageLimit: '18 to 25 Years (MTS posts) and 18 to 27 Years (Havaldar and select MTS cadres) as on crucial date. Relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.',
      educationalQualification: 'Must have passed Matriculation (10th Standard) examination or equivalent from a recognized Board prior to the cutoff date.',
      nationality: 'Citizen of India.',
      attempts: 'Unlimited within permissible age bracket.',
    },
    selectionStages: [
      {
        stage: 'Session-I CBT',
        name: 'Numerical & Mathematical Ability + Reasoning',
        mode: 'Online Objective (Qualifying Only)',
        details: '40 questions (120 marks), 45-minute duration. Purely qualifying in nature with NO negative marking.',
      },
      {
        stage: 'Session-II CBT',
        name: 'General Awareness + English Language',
        mode: 'Online Objective (Merit Determining)',
        details: '50 questions (150 marks), 45-minute duration. Negative marking of 1 mark per wrong response. Merit is decided strictly on Session-II score.',
      },
      {
        stage: 'PET / PST',
        name: 'Physical Test (Havaldar Posts Only)',
        mode: 'Walking & Physical Measurement',
        details: 'Walking: 1600m in 15 mins (Male), 1 km in 20 mins (Female). Height: 157.5 cm (Male), 152 cm (Female).',
      },
    ],
    syllabusAndPattern: {
      overview: 'Conducted in 13 regional languages in addition to Hindi and English.',
      patternTable: [
        { section: 'Session-I: Numerical & Mathematical Ability', questions: 20, marks: 60, duration: '45 Mins', negativeMarking: 'Nil (No negative marking)' },
        { section: 'Session-I: Reasoning Ability & Problem Solving', questions: 20, marks: 60, duration: '45 Mins', negativeMarking: 'Nil (No negative marking)' },
        { section: 'Session-II: General Awareness', questions: 25, marks: 75, duration: '45 Mins', negativeMarking: '1.00 mark' },
        { section: 'Session-II: English Language & Comprehension', questions: 25, marks: 75, duration: '45 Mins', negativeMarking: '1.00 mark' },
      ],
      syllabusHighlights: [
        'Math: LCM/HCF, Decimals, Fractions, Percentage, Ratio, Averages, Simple Interest, Profit & Loss.',
        'Reasoning: Alpha-numeric series, Coding, Analogies, Directions, Similarities and Differences.',
        'General Awareness: History, Art & Culture, Geography, Civics, Economics, Environmental Studies.',
        'English: Basic grammar, Vocabulary, Sentence structure, Synonyms/Antonyms, Simple comprehension passage.',
      ],
    },
    payAndCareerGrowth: {
      payLevel: 'Pay Level 1 (₹18,000–₹56,900) under 7th CPC Matrix',
      startingBasic: '₹18,000',
      inHandRange: '₹27,500 to ₹32,000 per month depending on posting location (Class X/Y/Z)',
      hierarchy: [
        'Entry: Multi-Tasking Staff (Pay Level 1)',
        'First Promotion: Lower Division Clerk / JSA (Pay Level 2 through departmental examination)',
        'Second Promotion: Upper Division Clerk (Pay Level 4)',
        'Executive Track: Assistant Section Officer (Pay Level 7 via Seniority/LDCE)',
      ],
      pensionAndPerks: 'National Pension System (NPS), CGHS medical facilities, annual increments, and uniform allowance (for Havaldar).',
    },
    preparationStrategy: [
      'Focus 80% Energy on Session-II: Because Session-I is merely qualifying with no negative marking, your final rank depends entirely on General Awareness and English.',
      'NCERT General Science and Social Studies: Thoroughly read class 6 to 10 NCERT textbooks for static General Awareness.',
      'Daily Vocabulary & Idiom Flashcards: Master previous 5 years of SSC English vocabulary to guarantee high accuracy in Session-II.',
    ],
    commonMistakes: [
      'Wasting Excessive Time on Session-I Mathematics: Since Session-I marks do NOT count towards merit, spending months on advanced math is counterproductive.',
      'Negative Marking Carelessness in Session-II: In Session-II, each wrong answer deducts 1 full mark out of 3 (33.3% penalty). Avoid random guessing.',
    ],
    faqs: [
      {
        question: 'Are Session-I marks counted in the final merit list of SSC MTS?',
        answer: 'No. Session-I (Math and Reasoning) is purely qualifying. Final selection and state allocation are determined exclusively by candidate marks in Session-II (General Awareness and English).',
      },
      {
        question: 'Is there negative marking in Session-I of SSC MTS?',
        answer: 'No. There is zero negative marking in Session-I. However, in Session-II, there is a penalty of 1 mark for each incorrect response.',
      },
      {
        question: 'Is the Physical Efficiency Test (PET) conducted for MTS posts?',
        answer: 'No. The Physical Efficiency Test (walking) and Physical Standard Test (height/chest) are mandatory ONLY for Havaldar posts in CBIC and CBN. MTS posts require no physical test.',
      },
      {
        question: 'Can candidates take SSC MTS in regional languages?',
        answer: 'Yes. The Computer-Based Test is administered in 13 regional languages (including Bengali, Gujarati, Kannada, Malayalam, Marathi, Tamil, Telugu, Urdu, etc.) in addition to English and Hindi.',
      },
      {
        question: 'What is the starting in-hand salary of SSC MTS in a Class X city?',
        answer: 'An MTS employee with Basic Pay ₹18,000 posted in a Class X city (like Delhi) receives an approximate in-hand monthly salary of ₹30,000 to ₹31,900 post NPS deductions.',
      },
    ],
  },
  {
    slug: 'rrb-ntpc',
    title: 'RRB NTPC Examination Comprehensive Blueprint (2026)',
    examName: 'Non-Technical Popular Categories (NTPC)',
    conductingBody: 'Railway Recruitment Boards (RRB)',
    officialUrl: 'https://indianrailways.gov.in',
    lastReviewed: '01 October 2026',
    overview: `The Railway Recruitment Boards Non-Technical Popular Categories (RRB NTPC) examination is the flagship recruitment drive for Indian Railways. Operating across 21 zonal RRBs, this mega-drive selects operations, commercial, operational traffic, and administrative personnel spanning Pay Levels 2, 3, 5, and 6. Prominent posts include Station Master, Goods Train Manager (Goods Guard), Commercial Apprentice, Senior Clerk cum Typist, and Junior Clerk cum Typist. The examination features a two-stage Computer-Based Test (CBT-1 and CBT-2) followed by Computer-Based Aptitude Tests (CBAT) or Typing Skill Tests.`,
    eligibility: {
      ageLimit: 'Undergraduate Posts (Levels 2 & 3): 18 to 33 Years. Graduate Posts (Levels 5 & 6): 18 to 36 Years (including temporary 3-year age concession). Standard relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs.',
      educationalQualification: 'Undergraduate posts require 12th (+2 Stage) with at least 50% marks. Graduate posts require a Bachelor’s Degree in any discipline from a recognized University.',
      nationality: 'Citizen of India.',
      attempts: 'No restriction within the age limit.',
    },
    selectionStages: [
      {
        stage: 'CBT-1',
        name: 'First Stage Computer-Based Test',
        mode: 'Online Objective (100 Qs, 100 Marks)',
        details: 'Screening test common for all posts. 40 General Awareness, 30 Math, 30 Reasoning. Duration: 90 Minutes. 1/3rd negative marking.',
      },
      {
        stage: 'CBT-2',
        name: 'Second Stage Computer-Based Test',
        mode: 'Separate CBT per Pay Level (120 Qs, 120 Marks)',
        details: '50 General Awareness, 35 Math, 35 Reasoning. Duration: 90 Minutes. Merit-determining stage.',
      },
      {
        stage: 'CBAT / Typing',
        name: 'Skill Test / Psycho Test',
        mode: 'Computer-Based Aptitude Test / Typing Test',
        details: 'CBAT strictly for Station Master (Score weightage: 70% CBT-2 + 30% CBAT). Typing test (30 WPM Eng / 25 WPM Hindi) for clerical posts.',
      },
    ],
    syllabusAndPattern: {
      overview: 'Features 1/3rd negative marking penalty across both stages.',
      patternTable: [
        { section: 'CBT-1: General Awareness', questions: 40, marks: 40, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
        { section: 'CBT-1: Mathematics', questions: 30, marks: 30, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
        { section: 'CBT-1: General Intelligence & Reasoning', questions: 30, marks: 30, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
        { section: 'CBT-2: General Awareness', questions: 50, marks: 50, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
        { section: 'CBT-2: Mathematics', questions: 35, marks: 35, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
        { section: 'CBT-2: General Intelligence & Reasoning', questions: 35, marks: 35, duration: '90 Mins (Composite)', negativeMarking: '1/3rd mark' },
      ],
      syllabusHighlights: [
        'General Awareness: Indian Railways history, Science and Technology, Sports, Current Events of National/International Importance, Indian Freedom Struggle.',
        'Mathematics: Number Systems, Decimals, Fractions, LCM/HCF, Ratio and Proportions, Mensuration, Time and Distance, Elementary Statistics.',
        'Reasoning: Analogies, Puzzles, Coding-Decoding, Mathematical Operations, Blood Relations, Syllogism, Venn Diagrams.',
      ],
    },
    payAndCareerGrowth: {
      payLevel: 'Level 2 (₹19,900) to Level 6 (₹35,400) under the 7th CPC Matrix',
      startingBasic: '₹19,900 (Junior Clerk) to ₹35,400 (Station Master / Commercial Apprentice)',
      inHandRange: '₹33,000 to ₹68,000 per month (Station Masters also receive Night Duty Allowance and Running Allowances).',
      hierarchy: [
        'Station Master (Level 6) -> Station Superintendent (Level 7) -> Assistant Operations Manager (Group B Gazetted)',
        'Goods Guard (Level 5) -> Passenger Guard (Level 6) -> Mail/Express Guard (Level 6)',
      ],
      pensionAndPerks: 'Railway Passes (Free travel for family), Railway Health Scheme, Running Allowances, Overtime Allowances, and Quarters.',
    },
    preparationStrategy: [
      'Master General Science Concepts: RRB General Awareness heavily emphasizes Class 9-10 Physics, Chemistry, and Life Sciences.',
      'Practice 90-Minute 120-Question CBT-2 Simulation: Time pressure is extreme in CBT-2 (less than 45 seconds per question).',
      'CBAT Intelligence Battery: For Station Master aspirants, practice spatial orientation, odd-man-out, and memory battery tests months in advance.',
    ],
    commonMistakes: [
      'High Negative Marking Casualties: The 1/3rd penalty is unforgiving. Making 15 incorrect guesses wipes out 5 full marks.',
      'Medical Ineligibility (A-2 Eye Standard): Failing the strict A-2 medical standard (6/9, 6/9 without glasses, zero color blindness) disqualifies candidates from Station Master and Goods Guard posts.',
    ],
    faqs: [
      {
        question: 'What is the medical standard for Station Master in RRB NTPC?',
        answer: 'The medical standard for Station Master is Aye-Two (A-2): Distance Vision must be 6/9, 6/9 without glasses (no fogging test). Must pass tests for Color Vision, Binocular Vision, Field of Vision, and Night Vision. No spectacles are permitted for A-2 entry.',
      },
      {
        question: 'What is the score weightage for final Station Master merit?',
        answer: 'The final merit list for Station Master is prepared giving 70% weightage to marks obtained in CBT-2 and 30% weightage to marks scored in the Computer-Based Aptitude Test (CBAT).',
      },
      {
        question: 'Are CBT-1 marks included in the final merit list?',
        answer: 'No. CBT-1 is purely a screening test to shortlist candidates for CBT-2 at the ratio of 1:20 (20 times the number of vacancies per level).',
      },
      {
        question: 'What is the in-hand salary of a Railway Station Master in a Class X city?',
        answer: 'A Station Master at Level 6 (Basic ₹35,400) posted in a Class X city receives an approximate in-hand monthly salary of ₹58,000 to ₹64,000, excluding night duty and national holiday allowances.',
      },
      {
        question: 'Is there negative marking in RRB NTPC examinations?',
        answer: 'Yes. There is a penalty of 1/3rd (0.333) marks for every incorrect answer in both CBT-1 and CBT-2.',
      },
    ],
  },
  {
    slug: 'upsc-cse',
    title: 'UPSC Civil Services Examination (CSE) Blueprint (2026)',
    examName: 'Civil Services Examination (IAS / IPS / IFS)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    officialUrl: 'https://upsc.gov.in',
    lastReviewed: '01 October 2026',
    overview: `The Union Public Service Commission Civil Services Examination (UPSC CSE) is the constitutional flagship examination of the Republic of India. Governed under Article 320 of the Constitution, it recruits candidates into the premier All India Services (Indian Administrative Service - IAS, Indian Police Service - IPS) and Central Group 'A' & 'B' civil services (Indian Foreign Service - IFS, Indian Revenue Service - IRS, Indian Audit and Accounts Service). The examination is celebrated globally for its intellectual breadth, demanding a three-stage marathon comprising the Preliminary Objective Examination, the 9-Paper Written Mains Examination, and the Personality Test (Interview).`,
    eligibility: {
      ageLimit: '21 to 32 Years as on 01 August 2026. Age relaxations: OBC-NCL +3 yrs (up to 35), SC/ST +5 yrs (up to 37), PwBD +10 yrs (up to 42).',
      educationalQualification: 'Must hold a Bachelor’s Degree from any university incorporated by an Act of the Central or State Legislature in India or recognized educational institution. Candidates appearing in the final year of degree can apply for Prelims.',
      nationality: 'For IAS and IPS: Must be a citizen of India. For other services: Citizen of India, subject of Nepal/Bhutan.',
      attempts: 'General / EWS: 6 Attempts. OBC: 9 Attempts. SC / ST: Unlimited attempts up to maximum age ceiling. PwBD: 9 attempts for Gen/OBC.',
    },
    selectionStages: [
      {
        stage: 'Preliminary',
        name: 'CSAT Prelims Examination',
        mode: 'Offline Pen-and-Paper OMR (Two Papers)',
        details: 'Paper-I (General Studies, 100 Qs, 200 Marks) determines cutoff for Mains. Paper-II (CSAT, 80 Qs, 200 Marks) requires mandatory 33% qualifying score (66 marks). 1/3rd negative marking.',
      },
      {
        stage: 'Mains',
        name: 'Written Examination',
        mode: 'Subjective Descriptive (9 Papers, 1750 Marks)',
        details: 'Two qualifying language papers (300 marks each, 25% qualifying). 7 Merit-determining papers: Essay (250), GS-1 (250), GS-2 (250), GS-3 (250), GS-4 Ethics (250), and Optional Subject Paper-I & II (500 marks).',
      },
      {
        stage: 'Interview',
        name: 'Personality Test',
        mode: 'Oral Board Interview in Dholpur House (275 Marks)',
        details: 'Conducted by a board of competent unbiased observers to assess intellectual caliber, mental alertness, balance of judgment, and leadership potential. Total Merit: 2025 Marks.',
      },
    ],
    syllabusAndPattern: {
      overview: 'Comprehensive curriculum spanning constitution, governance, history, international relations, economy, ecology, science, ethics, and specialized optional discipline.',
      patternTable: [
        { section: 'Prelims Paper-I (GS)', questions: 100, marks: 200, duration: '2 Hours', negativeMarking: '0.66 marks (1/3rd)' },
        { section: 'Prelims Paper-II (CSAT)', questions: 80, marks: 200, duration: '2 Hours', negativeMarking: '0.83 marks (Qualifying @ 33%)' },
        { section: 'Mains: Paper-I (Essay)', questions: 2, marks: 250, duration: '3 Hours', negativeMarking: 'Descriptive' },
        { section: 'Mains: GS-I (Heritage, History, Geography, Society)', questions: 20, marks: 250, duration: '3 Hours', negativeMarking: 'Descriptive' },
        { section: 'Mains: GS-II (Governance, Constitution, Polity, IR)', questions: 20, marks: 250, duration: '3 Hours', negativeMarking: 'Descriptive' },
        { section: 'Mains: GS-III (Technology, Economic Dev, Biodiversity, Security)', questions: 20, marks: 250, duration: '3 Hours', negativeMarking: 'Descriptive' },
        { section: 'Mains: GS-IV (Ethics, Integrity and Aptitude)', questions: 19, marks: 250, duration: '3 Hours', negativeMarking: 'Descriptive' },
        { section: 'Mains: Optional Subject (Paper 1 & 2)', questions: 10, marks: 500, duration: '3 Hours each', negativeMarking: 'Descriptive' },
      ],
      syllabusHighlights: [
        'Prelims GS: Indian Polity & Governance, History of India & Indian National Movement, Indian & World Geography, Economic & Social Development, Environmental Ecology, General Science.',
        'CSAT: Comprehension, Interpersonal skills including communication, Logical reasoning & analytical ability, Decision making, General mental ability, Basic numeracy (Class 10 level).',
        'GS-IV Ethics: Ethics and Human Interface, Attitude, Aptitude and Foundational Values for Civil Service, Emotional Intelligence, Contributions of moral thinkers, Probity in Governance, Case Studies.',
      ],
    },
    payAndCareerGrowth: {
      payLevel: 'Junior Time Scale (Pay Level 10, Basic ₹56,100) up to Cabinet Secretary (Pay Level 18, Basic ₹2,50,000)',
      startingBasic: '₹56,100 per month (Junior Time Scale)',
      inHandRange: '₹88,000 to ₹95,000 per month starting in-hand pay (plus official accommodation, staff car, and security protocol).',
      hierarchy: [
        'Sub-Divisional Magistrate (SDM) / Assistant Collector (Level 10, Basic ₹56,100)',
        'Additional District Magistrate / Senior Time Scale (Level 11, Basic ₹67,700)',
        'District Magistrate (DM) / Collector / Junior Administrative Grade (Level 12, Basic ₹78,800)',
        'Divisional Commissioner / Joint Secretary (Level 14, Basic ₹1,44,200)',
        'Chief Secretary of State / Union Secretary (Level 17, Basic ₹2,25,000)',
        'Cabinet Secretary of India (Level 18, Basic ₹2,50,000 - Apex Civil Service Post)',
      ],
      pensionAndPerks: 'Designated Government Bungalow, Chauffeur-driven official vehicle with beacon protocol, Security guard detail, Medical benefits, Study Leave abroad (up to 2 years), and NPS pension.',
    },
    preparationStrategy: [
      'Comprehensive Static Grounding through NCERTs: Read Class 6 to 12 NCERT textbooks across History, Geography, Polity, and Economics to build conceptual clarity.',
      'Daily Analytical Newspaper Reading: Study The Hindu or The Indian Express editorial analysis, focusing on policy intent, constitutional implications, and multidimensional solutions.',
      'Answer Writing Practice: Write at least 2 mains answers daily with structured introductions, body points with diagrams/data, and constitutional forward-looking conclusions.',
      'CSAT Prioritization: Practice reading comprehension and quantitative aptitude to consistently score above 80 marks in Paper-II to avoid fatal disqualification.',
    ],
    commonMistakes: [
      'Underestimating Prelims CSAT Paper-II: Hundreds of candidates scoring 110+ in GS Paper-I fail to qualify for Mains due to scoring below 66 marks in CSAT.',
      'Endless Note-Making Without Revision: Compiling thousands of pages of notes without periodic 3-cycle revision leads to memory failure in the 3-hour descriptive examination.',
      'Neglecting the Optional Subject: The optional subject accounts for 500 marks in Mains. A score below 260 in Optional severely diminishes chances of securing an IAS/IPS rank.',
    ],
    faqs: [
      {
        question: 'Are marks in Prelims counted for the final IAS merit ranking?',
        answer: 'No. The Civil Services Preliminary Examination is purely an elimination screening test to qualify candidates for Mains. The final rank list is calculated from 2025 marks (1750 marks from Mains written papers + 275 marks from the Personality Test).',
      },
      {
        question: 'What is the qualifying criteria for CSAT Paper-II in Prelims?',
        answer: 'Under UPSC rules, CSAT Paper-II is qualifying in nature with minimum qualifying marks fixed at exactly 33% (66 marks out of 200). If a candidate fails to score 66 marks in CSAT, their GS Paper-I is not even evaluated.',
      },
      {
        question: 'What constitutes an attempt in UPSC Civil Services?',
        answer: 'An attempt is counted if a candidate actually appears in any one paper of the Preliminary Examination (Paper-I or Paper-II). Simply filling the application form without sitting in the examination hall does not consume an attempt.',
      },
      {
        question: 'What is the starting salary of an IAS officer during training at LBSNAA?',
        answer: 'During foundational and professional training at the Lal Bahadur Shastri National Academy of Administration (LBSNAA) in Mussoorie, officer trainees receive Level 10 basic pay of ₹56,100 plus DA, yielding approximately ₹65,000/month after deductions for mess and accommodation.',
      },
      {
        question: 'Can candidates write the UPSC Mains examination in Hindi or regional languages?',
        answer: 'Yes. Candidates have the constitutional option to write the Mains examination in English, Hindi, or any of the 22 languages mentioned in the Eighth Schedule to the Constitution of India.',
      },
    ],
  },
{
  "slug": "rrb-group-d",
  "title": "RRB Group D (Level-1) Examination Blueprint (2026)",
  "examName": "Railway Level-1 Posts (Track Maintainer, Pointsman)",
  "conductingBody": "Railway Recruitment Cell (RRC) & RRB",
  "officialUrl": "https://indianrailways.gov.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Railway Recruitment Cell Level-1 (RRB Group D) recruitment is one of the highest-volume public employment drives globally, selecting essential frontline operational, engineering, electrical, and mechanical track staff for the Indian Railway network. Operating across 16 Zonal Railway jurisdictions, it recruits Track Maintainers Grade-IV, Pointsmen, Assistant Workshop personnel, and Hospital Attendants. Featuring a single-stage Computer-Based Test (CBT) followed by a mandatory Physical Efficiency Test (PET), this recruitment provides Level-1 starting employment with comprehensive railway welfare allowances.",
  "eligibility": {
    "ageLimit": "18 to 33 Years as on crucial date. Standard category relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "10th pass from recognized Board, OR National Apprenticeship Certificate (NAC) granted by NCVT, OR 10th pass plus ITI from recognized institutions.",
    "nationality": "Citizen of India.",
    "attempts": "Unlimited within age bracket."
  },
  "selectionStages": [
    {
      "stage": "CBT",
      "name": "Computer-Based Test",
      "mode": "Online Objective (100 Qs, 100 Marks)",
      "details": "General Science (25), Mathematics (25), General Intelligence & Reasoning (30), General Awareness & Current Affairs (20). Duration: 90 Minutes. 1/3rd negative marking."
    },
    {
      "stage": "PET",
      "name": "Physical Efficiency Test",
      "mode": "Physical Athletic Events",
      "details": "Male: Lift & carry 35 kg weight for 100m in 2 minutes + Run 1000m in 4 mins 15 secs. Female: Lift & carry 20 kg weight for 100m in 2 minutes + Run 1000m in 5 mins 40 secs."
    },
    {
      "stage": "DV / Medical",
      "name": "Document Verification & Medical Exam",
      "mode": "Verification & Detailed Medical Test",
      "details": "Must meet B-1 / C-1 railway medical fitness standards depending on trade post."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Focuses heavily on Class 10 NCERT General Science and basic arithmetic.",
    "patternTable": [
      {
        "section": "General Science (Physics, Chemistry, Biology)",
        "questions": 25,
        "marks": 25,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "Mathematics",
        "questions": 25,
        "marks": 25,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "General Intelligence and Reasoning",
        "questions": 30,
        "marks": 30,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "General Awareness and Current Affairs",
        "questions": 20,
        "marks": 20,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      }
    ],
    "syllabusHighlights": [
      "General Science: 10th standard CBSE Physics (Electricity, Optics, Mechanics), Chemistry (Acids/Bases, Periodic Table), and Life Sciences.",
      "Mathematics: Number system, BODMAS, Decimals, Fractions, LCM/HCF, Ratio, Percentages, Mensuration, Time & Distance.",
      "Reasoning: Analogies, Alphabetical and Number Series, Coding and Decoding, Syllogism, Jumbling, Venn Diagram."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Pay Level 1 (₹18,000–₹56,900) under 7th CPC Matrix",
    "startingBasic": "₹18,000",
    "inHandRange": "₹27,500 to ₹33,000 per month (plus Risk & Hardship allowance of ₹2,700/month for Track Maintainers).",
    "hierarchy": [
      "Entry: Track Maintainer Grade IV / Pointsman (Level 1, Basic ₹18,000)",
      "Seniority Track: Track Maintainer Grade III & II (Level 2 & 4)",
      "Departmental Promotion (LDCE): Technician Grade III / Assistant Loco Pilot (Level 2)",
      "Supervisory Track: Junior Engineer (P-Way / Works, Level 6 via 20% LDCE quota)"
    ],
    "pensionAndPerks": "Railway Passes (Free travel for employee and family), Overtime allowance, Night duty allowance, and Railway Quarters."
  },
  "preparationStrategy": [
    "Master Class 9 and 10 NCERT Science: General Science carries 25 questions and forms the decisive merit divider.",
    "Daily 1000m Endurance Running: Train for the 1000-meter run weeks in advance to ensure comfortable qualification in the single-chance PET.",
    "Solve Previous Shift Papers: Practice with 1/3rd negative marking to avoid score depletion."
  ],
  "commonMistakes": [
    "Underestimating Weight-Lifting Event in PET: Dropping the 35 kg sandbag before completing the 100m distance causes immediate elimination.",
    "Blind Guesswork under 1/3rd Penalty: Guessing across 20 unverified science questions can deduct over 6 full marks."
  ],
  "faqs": [
    {
      "question": "Is ITI mandatory for all posts in RRB Group D?",
      "answer": "For general Level-1 recruitments, 10th pass or ITI/NAC is the prescribed standard. Specific technical cadres require National Apprenticeship Certificates (NAC) or ITI."
    },
    {
      "question": "What is the physical efficiency test standard for male candidates in RRB Group D?",
      "answer": "Male candidates must carry 35 kg weight for 100 meters in 2 minutes without putting down the bag, and complete a 1000-meter run in 4 minutes 15 seconds in a single chance."
    },
    {
      "question": "What is the in-hand salary of a Track Maintainer in Indian Railways?",
      "answer": "A Track Maintainer at Level 1 receives approximately ₹30,000 to ₹33,500 per month, which includes Basic Pay (₹18,000), 50% DA, HRA, Transport Allowance, and a monthly Risk and Hardship Allowance of ₹2,700."
    },
    {
      "question": "Is there an interview stage in RRB Group D?",
      "answer": "No. There is zero interview. Final selection is based 100% on the normalized CBT score followed by qualifying PET and Document Verification."
    },
    {
      "question": "How much is deducted for each wrong answer in RRB Group D?",
      "answer": "One-third (1/3rd) of the marks allocated to each question is deducted for every incorrect response."
    }
  ]
},
{
  "slug": "rrb-alp",
  "title": "RRB Assistant Loco Pilot (ALP) Examination Guide (2026)",
  "examName": "Assistant Loco Pilot (ALP) & Technicians",
  "conductingBody": "Railway Recruitment Boards (RRB)",
  "officialUrl": "https://indianrailways.gov.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Railway Recruitment Boards Assistant Loco Pilot (RRB ALP) recruitment selects train drivers and motive power operators for the vast Indian Railway network. Operating under strict technical and psychometric safety standards, ALPs co-pilot electric and diesel locomotives, assist in signal compliance, track vigilance, and train braking systems. The recruitment involves CBT-1, CBT-2 (comprising Part A General and Part B Technical Trade), and the mandatory Computer-Based Aptitude Test (CBAT Psycho Test).",
  "eligibility": {
    "ageLimit": "18 to 33 Years as on crucial date. Standard category relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs.",
    "educationalQualification": "Matriculation / 10th Pass PLUS ITI in designated trades (Fitter, Electrician, Instrument Mechanic, Millwright, Wireman, Tractor Mechanic, etc.) OR 3-year Diploma in Mechanical / Electrical / Electronics / Automobile Engineering OR B.E. / B.Tech in Engineering.",
    "nationality": "Citizen of India.",
    "attempts": "Unlimited within age bracket."
  },
  "selectionStages": [
    {
      "stage": "CBT-1",
      "name": "First Stage CBT",
      "mode": "Online Objective (75 Qs, 75 Marks, 60 Mins)",
      "details": "Math (20), General Intelligence (25), General Science (20), General Awareness (10). Qualifying in nature."
    },
    {
      "stage": "CBT-2 Part A",
      "name": "Second Stage CBT (Part A)",
      "mode": "Online Objective (100 Qs, 100 Marks, 90 Mins)",
      "details": "Math (25), Reasoning (25), Basic Science & Engineering (40), General Awareness (10). Merit-determining."
    },
    {
      "stage": "CBT-2 Part B",
      "name": "Second Stage CBT (Part B - Trade Test)",
      "mode": "Online Objective (75 Qs, 75 Marks, 60 Mins)",
      "details": "Technical trade syllabus as prescribed by DGT. Qualifying at strictly 35% marks."
    },
    {
      "stage": "CBAT",
      "name": "Computer-Based Aptitude Test (Psycho)",
      "mode": "Online Aptitude Battery (5 Test Batteries)",
      "details": "Qualifying score of minimum 42 T-score in each battery. Final merit = 70% CBT-2 Part A + 30% CBAT."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Rigorous technical curriculum emphasizing Basic Science & Engineering and trade theory.",
    "patternTable": [
      {
        "section": "CBT-1: Math + Science + Reasoning + GA",
        "questions": 75,
        "marks": 75,
        "duration": "60 Mins",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "CBT-2 Part A: Math, Reasoning, Basic Sci & Engg",
        "questions": 100,
        "marks": 100,
        "duration": "90 Mins",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "CBT-2 Part B: Relevant Technical Trade Test",
        "questions": 75,
        "marks": 75,
        "duration": "60 Mins",
        "negativeMarking": "1/3rd mark (35% pass)"
      },
      {
        "section": "CBAT: 5 Psychometric Battery Tests",
        "questions": 100,
        "marks": 100,
        "duration": "71 Mins",
        "negativeMarking": "Nil"
      }
    ],
    "syllabusHighlights": [
      "Basic Science & Engineering: Engineering Drawing, Units & Measurements, Mass Weight & Density, Work Power & Energy, Speed & Velocity, Heat & Temperature, Basic Electricity, Levers & Simple Machines, Occupational Safety.",
      "Technical Trades: Electrical (Electrician/Wireman), Mechanical (Fitter/Turner/Machinist), Automobile & Electronics."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Pay Level 2 (₹19,900–₹63,200) under 7th CPC Matrix",
    "startingBasic": "₹19,900",
    "inHandRange": "₹35,000 to ₹55,000 per month (includes generous Running Kilometrage Allowance of ₹3.75 to ₹5.50 per km operated).",
    "hierarchy": [
      "Entry: Assistant Loco Pilot (Level 2)",
      "Seniority Promotion: Senior Assistant Loco Pilot (Level 4)",
      "Driver Promotion: Loco Pilot (Goods) (Level 6)",
      "Passenger Train: Loco Pilot (Passenger) -> Loco Pilot (Mail/Express) (Level 6)",
      "Supervisory: Chief Loco Inspector (CLI)"
    ],
    "pensionAndPerks": "Running Allowances (Kilometrage allowance), Outstation Rest House accommodations, Free Railway Medical Facilities, and Free Rail Travel Passes."
  },
  "preparationStrategy": [
    "Master Basic Science & Engineering: The 40 questions in CBT-2 Part A decide the cutoff; thoroughly prepare engineering drawing conventions and thermodynamics.",
    "Ensure 35% in Trade Theory: Over 10,000 candidates fail CBT-2 Part B annually; do not neglect DGT vocational trade theory.",
    "Daily Psycho Test Drills: Practice memory test grids, brick test speed, and concentration batteries for the CBAT."
  ],
  "commonMistakes": [
    "Medical Disqualification (A-1 Eye Standard): ALP requires 6/6 distance vision without glasses, no Lasik surgery, and zero color blindness. Undergoing refractive surgery leads to permanent disqualification.",
    "Failing in a Single Psycho Battery: Scoring less than 42 T-score in any one of the five batteries eliminates the candidate regardless of total score."
  ],
  "faqs": [
    {
      "question": "Can engineering degree (B.Tech) holders apply for RRB ALP?",
      "answer": "Yes. Candidates with B.E. / B.Tech or 3-year Polytechnic Diplomas in Mechanical, Electrical, Electronics, or Automobile Engineering are fully eligible."
    },
    {
      "question": "What is the medical visual acuity standard for ALP?",
      "answer": "The medical standard is strictly Aye-One (A-1): Distance vision must be 6/6, 6/6 without glasses (no fogging test permitted). Candidates who have undergone Lasik surgery are strictly ineligible."
    },
    {
      "question": "What is Running Allowance for Assistant Loco Pilots?",
      "answer": "Running allowance is a performance mileage allowance paid per kilometer of train operated (typically between ₹3.75 and ₹5.50 per km). It frequently adds ₹15,000 to ₹30,000 monthly to an ALP’s basic earnings."
    },
    {
      "question": "Is trade test Part B marks counted in final ALP merit?",
      "answer": "No. Part B is purely qualifying at 35% marks. Final merit is derived giving 70% weightage to CBT-2 Part A and 30% weightage to the Computer-Based Aptitude Test (CBAT)."
    },
    {
      "question": "What is the starting salary of an RRB ALP?",
      "answer": "An ALP receives a starting basic of ₹19,900. With 50% DA, HRA, Transport Allowance, and Running Allowance, starting monthly in-hand compensation ranges from ₹38,000 to ₹52,000."
    }
  ]
},
{
  "slug": "sbi-clerk",
  "title": "SBI Clerk (Junior Associates) Examination Blueprint (2026)",
  "examName": "SBI Junior Associates (Customer Support & Sales)",
  "conductingBody": "State Bank of India (SBI)",
  "officialUrl": "https://sbi.co.in/careers",
  "lastReviewed": "01 October 2026",
  "overview": "The State Bank of India Junior Associates (SBI Clerk) recruitment is the premier clerical recruitment drive in the Indian public banking sector. SBI, as the nation’s largest commercial bank, recruits thousands of customer support, teller operations, loan processing, and digital banking personnel across all states and union territories. The examination features a fast-paced two-phase online testing model (Preliminary and Mains) followed by a mandatory Local Language Proficiency Test. Clerical personnel at SBI enjoy wage revisions under the Indian Banks' Association (IBA) Bipartite Wage Settlements with significant clerical career progression into Scale-I Officer cadres.",
  "eligibility": {
    "ageLimit": "20 to 28 Years as on crucial date. Category relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "Graduation in any discipline from a recognized University or any equivalent qualification recognized by the Central Government.",
    "nationality": "Citizen of India.",
    "attempts": "No restriction within the age limit."
  },
  "selectionStages": [
    {
      "stage": "Prelims",
      "name": "Preliminary Examination",
      "mode": "Online Objective CBT (100 Qs, 100 Marks, 60 Mins)",
      "details": "English (30), Numerical Ability (35), Reasoning Ability (35). Sectional timing of 20 minutes each. Qualifying for Mains."
    },
    {
      "stage": "Mains",
      "name": "Mains Examination",
      "mode": "Online Objective CBT (190 Qs, 200 Marks, 2 Hrs 40 Mins)",
      "details": "General/Financial Awareness (50), General English (40), Quantitative Aptitude (50), Reasoning & Computer Aptitude (50). Merit-determining."
    },
    {
      "stage": "LPT",
      "name": "Language Proficiency Test",
      "mode": "Local Language Assessment",
      "details": "Conducted before joining for candidates who did not study the specified local language in 10th or 12th standard."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Strict sectional timing of 20 minutes in Prelims and varying sectional timers in Mains with 1/4th negative marking.",
    "patternTable": [
      {
        "section": "Prelims: English Language",
        "questions": 30,
        "marks": 30,
        "duration": "20 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Prelims: Numerical Ability",
        "questions": 35,
        "marks": 35,
        "duration": "20 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Prelims: Reasoning Ability",
        "questions": 35,
        "marks": 35,
        "duration": "20 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: General / Financial Awareness",
        "questions": 50,
        "marks": 50,
        "duration": "35 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: General English",
        "questions": 40,
        "marks": 40,
        "duration": "35 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Quantitative Aptitude",
        "questions": 50,
        "marks": 50,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Reasoning & Computer Aptitude",
        "questions": 50,
        "marks": 60,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      }
    ],
    "syllabusHighlights": [
      "Financial Awareness: Banking terminologies, RBI monetary policies, Financial inclusion schemes, Current economic developments, Union Budget.",
      "Quantitative Aptitude: Data Interpretation (Bar/Pie/Caselet), Quadratic Equations, Number Series, Simplification/Approximation, Arithmetic Word Problems.",
      "Reasoning: Floor/Box/Circular Puzzles, Seating Arrangements, Coding-Decoding, Syllogisms, Inequalities, Machine Input-Output."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Starting Basic Pay of ₹24,050 (under revised 12th Bipartite Settlement scale of ₹24,050–₹64,480)",
    "startingBasic": "₹24,050 (with 2 advance increments for graduates)",
    "inHandRange": "₹37,000 to ₹42,000 per month depending on city classification.",
    "hierarchy": [
      "Junior Associate (Clerk) -> Senior Associate -> Special Associate -> Chief Associate",
      "Officer Promotion Track (Fast Track in 3 Years): Trainee Officer (TO) / Junior Management Grade Scale-I (JMGS-I)",
      "Middle Management: Middle Management Grade Scale-II & III"
    ],
    "pensionAndPerks": "Contributory Pension Fund, Defined Health Care benefits, Newspaper allowance, Cleansing allowance, and Concessional staff home loans."
  },
  "preparationStrategy": [
    "Master High-Speed Simplification and Approximations: In Prelims, 10 to 15 questions in Numerical Ability test rapid mental arithmetic.",
    "Daily 4-Month Banking Current Affairs: Financial Awareness in Mains carries 50 marks; revise daily banking updates and RBI notifications.",
    "Solve 2 High-Level Puzzles Daily: Mains reasoning requires solving multi-variable seating arrangements and box puzzles under time constraints."
  ],
  "commonMistakes": [
    "Lacking Speed Under 20-Minute Sectional Timers: Candidates get stuck on difficult puzzles, running out of time before attempting easier questions.",
    "Ignoring Banking and RBI Terminology: General Awareness in bank exams requires specialized knowledge of monetary policy, repo rates, and banking regulations."
  ],
  "faqs": [
    {
      "question": "Is there sectional cut-off in SBI Clerk Prelims and Mains?",
      "answer": "No. Unlike IBPS exams, State Bank of India does NOT enforce minimum qualifying marks for individual sections. Selection is based purely on the aggregate score in each phase."
    },
    {
      "question": "Is there an interview in SBI Clerk?",
      "answer": "No. As per Government of India guidelines for clerical recruitments, there is zero interview. Final selection is based 100% on marks scored in the Mains Examination."
    },
    {
      "question": "What is the starting in-hand salary of an SBI Clerk under the 12th Bipartite Settlement?",
      "answer": "With starting basic pay of ₹24,050 (which includes two advance increments for graduates), DA, and allowances, starting in-hand monthly salary is approximately ₹37,500 to ₹41,000 depending on location."
    },
    {
      "question": "Can an SBI Clerk be promoted to an Officer (Scale-I)?",
      "answer": "Yes. SBI offers one of the fastest internal promotion tracks: Junior Associates can appear for internal promotions to Trainee Officer (Scale-I) after 3 years of service."
    },
    {
      "question": "Is the Language Proficiency Test (LPT) mandatory?",
      "answer": "Yes, if you did not study the specified official language of the state you applied for in Class 10 or 12, passing the local language test before joining is mandatory."
    }
  ]
},
{
  "slug": "sbi-po",
  "title": "SBI PO (Probationary Officer) Examination Blueprint (2026)",
  "examName": "State Bank of India Probationary Officer",
  "conductingBody": "State Bank of India (SBI)",
  "officialUrl": "https://sbi.co.in/careers",
  "lastReviewed": "01 October 2026",
  "overview": "The State Bank of India Probationary Officer (SBI PO) examination is widely acknowledged as the gold standard of public sector banking recruitments in India. Selecting leadership trainees for Junior Management Grade Scale-I (JMGS-I), this prestigious drive fast-tracks young graduates into branch management, treasury operations, international banking, and corporate credit desks. Renowned for its challenging question standards, SBI PO features a three-phase evaluation: Prelims, Mains (Objective + Online Descriptive English), and the Phase-III Psychometric, Group Discussion, and Personal Interview.",
  "eligibility": {
    "ageLimit": "21 to 30 Years as on crucial date. Standard category relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "Graduation in any discipline from a recognized University or any equivalent qualification recognized by the Central Government. Final year students can apply provisionally.",
    "nationality": "Citizen of India.",
    "attempts": "General / EWS: 4 Attempts (in Mains). OBC: 7 Attempts. SC / ST: No restriction. PwBD: 7 Attempts."
  },
  "selectionStages": [
    {
      "stage": "Phase-I",
      "name": "Preliminary Examination",
      "mode": "Online Objective (100 Qs, 100 Marks, 60 Mins)",
      "details": "English (30), Quantitative Aptitude (35), Reasoning (35). Sectional timers of 20 mins. Qualifying for Phase-II."
    },
    {
      "stage": "Phase-II",
      "name": "Mains Exam (Objective + Descriptive)",
      "mode": "Online CBT (200 Marks) + Descriptive (50 Marks)",
      "details": "Objective: 155 Qs in 3 Hours. Descriptive: 30 Mins (Essay & Letter Writing on keyboard, 50 marks). Total 250 Marks."
    },
    {
      "stage": "Phase-III",
      "name": "Psychometric, GD & Interview",
      "mode": "Group Exercises (20 Marks) + Interview (30 Marks)",
      "details": "Total 50 Marks. Final merit combines normalized Phase-II (75 marks) and Phase-III (25 marks) for 100 total points."
    }
  ],
  "syllabusAndPattern": {
    "overview": "High-difficulty conceptual problems in Data Analysis & Interpretation and advanced reasoning puzzles.",
    "patternTable": [
      {
        "section": "Phase-I Prelims: English, Math, Reasoning",
        "questions": 100,
        "marks": 100,
        "duration": "60 Mins (20 Mins each)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Mains: Reasoning & Computer",
        "questions": 40,
        "marks": 50,
        "duration": "50 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Mains: Data Analysis & Interpretation",
        "questions": 30,
        "marks": 50,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Mains: General / Economy / Banking",
        "questions": 50,
        "marks": 60,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Mains: English Language",
        "questions": 35,
        "marks": 40,
        "duration": "40 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Mains: Descriptive (Letter & Essay)",
        "questions": 2,
        "marks": 50,
        "duration": "30 Mins",
        "negativeMarking": "Subjective"
      }
    ],
    "syllabusHighlights": [
      "Data Analysis: Radar Charts, Missing DI, Funnel DI, Probability based DI, Time and Work DI, Permutations and Combinations.",
      "Reasoning: High-level parallel seating arrangements, Circular puzzles with blood relations, Critical reasoning, Statement & assumptions.",
      "Descriptive: Essay writing on economic trends, digital currency, financial inclusion; Formal and informal letter writing."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Scale-I Starting Basic Pay of ₹48,480 (with 4 advance increments on the scale of ₹48,480–₹85,920 under 12th Bipartite Settlement)",
    "startingBasic": "₹48,480 (includes 4 advance increments)",
    "inHandRange": "₹68,000 to ₹76,000 per month (plus leased accommodation worth ₹12,000 to ₹35,000/month in metropolises).",
    "hierarchy": [
      "Entry: Assistant Manager / Probationary Officer (Scale-I)",
      "Promotion 1 (3-4 Yrs): Deputy Manager (Scale-II)",
      "Promotion 2 (6-8 Yrs): Manager / Branch Manager (Scale-III)",
      "Middle Management: Chief Manager (Scale-IV) -> Assistant General Manager (Scale-V)",
      "Executive Leadership: Deputy General Manager (Scale-VI) -> General Manager (Scale-VII) -> Chairman"
    ],
    "pensionAndPerks": "100% Leased Accommodation (Bank lease), Petrol allowance (50-60 liters/mo), Medical benefit cover for entire family, and concessional staff loans."
  },
  "preparationStrategy": [
    "Focus on Data Interpretation: SBI PO Mains does not feature standalone arithmetic questions; 100% of the math section consists of advanced Data Interpretation.",
    "Practice Keyboard Typing for Descriptive English: The 30-minute descriptive test requires typing a 250-word essay and 150-word letter on a desktop keyboard.",
    "Deep Critical Reasoning Preparation: Strengthen assumption, inference, and argument evaluation for high scoring in Mains Reasoning."
  ],
  "commonMistakes": [
    "Failing to Prepare for Group Discussion: Many candidates clear written stages but score low in Group Exercises due to lack of speaking confidence.",
    "Exceeding Attempt Limits: General category candidates are restricted to 4 attempts in Phase-II Mains. Appearing unprepared wastes an attempt."
  ],
  "faqs": [
    {
      "question": "What counts as an attempt in SBI PO?",
      "answer": "Appearing in the Preliminary Examination does NOT count as an attempt. An attempt is counted only if a candidate appears in the Phase-II Mains Examination."
    },
    {
      "question": "What are the 4 advance increments in SBI PO?",
      "answer": "Unlike other nationalized banks where probationary officers start at the base scale, SBI awards 4 advance increments at entry, starting basic pay at ₹48,480 instead of ₹36,000."
    },
    {
      "question": "Is leased accommodation provided to SBI POs?",
      "answer": "Yes. In metropolitan cities like Mumbai and Delhi, SBI provides leased residential accommodation up to ₹30,000 to ₹35,000 per month directly paid to the landlord."
    },
    {
      "question": "Are there sectional cutoffs in SBI PO?",
      "answer": "No. State Bank of India does not apply sectional cutoff marks in either Prelims or Mains. Shortlisting is based purely on the aggregate score."
    },
    {
      "question": "What is the in-hand salary of an SBI PO?",
      "answer": "A newly appointed SBI Probationary Officer receives an in-hand monthly salary of approximately ₹68,000 to ₹74,000 post deductions, excluding perks and leased housing."
    }
  ]
},
{
  "slug": "ibps-po",
  "title": "IBPS PO (CRP PO/MT) Examination Comprehensive Blueprint (2026)",
  "examName": "IBPS Probationary Officer / Management Trainee",
  "conductingBody": "Institute of Banking Personnel Selection (IBPS)",
  "officialUrl": "https://www.ibps.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Institute of Banking Personnel Selection Common Recruitment Process for Probationary Officers (IBPS PO) is the unified entrance examination for Scale-I officers across 11 Public Sector Banks (including Punjab National Bank, Bank of Baroda, Canara Bank, Union Bank of India, and Indian Bank). Operating under the Ministry of Finance guidelines, this annual examination tests banking leadership aptitude across Prelims, Mains (with Online Descriptive English), and Common Personal Interviews conducted by participating banks.",
  "eligibility": {
    "ageLimit": "20 to 30 Years as on crucial date. Standard relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "A Degree (Graduation) in any discipline from a University recognized by the Government of India.",
    "nationality": "Citizen of India.",
    "attempts": "No restriction within the age limit."
  },
  "selectionStages": [
    {
      "stage": "Prelims",
      "name": "Preliminary Examination",
      "mode": "Online Objective (100 Qs, 100 Marks, 60 Mins)",
      "details": "English (30), Quantitative Aptitude (35), Reasoning (35). Sectional cutoff and sectional timer of 20 mins."
    },
    {
      "stage": "Mains",
      "name": "Mains Exam & Descriptive",
      "mode": "Online CBT (200 Marks) + Descriptive (25 Marks)",
      "details": "Objective: 155 Qs (3 Hours). Descriptive: 30 Mins (1 Essay, 1 Letter, 25 Marks). Total 225 Marks."
    },
    {
      "stage": "Interview",
      "name": "Common Personal Interview",
      "mode": "Face-to-Face Board Interview (100 Marks)",
      "details": "Conducted by participating banks. Minimum qualifying score: 40% (35% for SC/ST/OBC/PwBD). Weightage: 80% Mains + 20% Interview."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Sectional cutoffs applied across all subjects in both Prelims and Mains with 1/4th negative marking.",
    "patternTable": [
      {
        "section": "Prelims: English, Math, Reasoning",
        "questions": 100,
        "marks": 100,
        "duration": "60 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Reasoning & Computer Aptitude",
        "questions": 45,
        "marks": 60,
        "duration": "60 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: General / Economy / Banking",
        "questions": 40,
        "marks": 40,
        "duration": "35 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: English Language",
        "questions": 35,
        "marks": 40,
        "duration": "40 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Data Analysis & Interpretation",
        "questions": 35,
        "marks": 60,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: English Descriptive (Letter & Essay)",
        "questions": 2,
        "marks": 25,
        "duration": "30 Mins",
        "negativeMarking": "Descriptive"
      }
    ],
    "syllabusHighlights": [
      "Banking Awareness: RBI circulars, Priority Sector Lending (PSL), Monetary Policy, Basel-III norms, NPA resolution frameworks.",
      "Data Analysis: Tabular, Line, Bar, Pie charts, Radar graphs, Caselets, Probability and Permutations.",
      "Reasoning: Complex multi-tier puzzles, Input-output, Syllogisms, Direction and Blood relation logic."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Scale-I Starting Basic Pay of ₹48,480 under the revised 12th Bipartite Settlement",
    "startingBasic": "₹48,480",
    "inHandRange": "₹62,000 to ₹68,000 per month depending on posting location and HRA.",
    "hierarchy": [
      "Junior Management Grade Scale-I (Assistant Manager / PO)",
      "Middle Management Grade Scale-II (Manager)",
      "Middle Management Grade Scale-III (Senior Manager)",
      "Senior Management Grade Scale-IV (Chief Manager)",
      "Executive Track: Scale-V (AGM) -> Scale-VI (DGM) -> Scale-VII (GM) -> Executive Director (ED)"
    ],
    "pensionAndPerks": "NPS Pension, Bank Leased Accommodation / HRA, Medical reimbursement, Newspaper and Fuel allowances."
  },
  "preparationStrategy": [
    "Clear Sectional Cutoffs First: Because IBPS enforces both sectional and aggregate cutoffs, balancing preparation across English, Math, and Reasoning is mandatory.",
    "Daily Practice of High-Level Caselet DI: Caselets form 40% of the Data Interpretation section in Mains.",
    "Typing Practice for Descriptive Paper: Type essays on trending financial topics to achieve 30 WPM keyboard speed."
  ],
  "commonMistakes": [
    "Neglecting Weak Subjects: Scoring 40/60 in Reasoning but missing the Quantitative Aptitude sectional cutoff by 0.5 marks leads to immediate disqualification.",
    "Poor Interview Preparation: Failing to secure the minimum 40% interview cutoff disqualifies candidates irrespective of their high Mains score."
  ],
  "faqs": [
    {
      "question": "Is there sectional cutoff in IBPS PO?",
      "answer": "Yes. IBPS strictly enforces sectional cutoffs in both Prelims and Mains examinations. Candidates must qualify in each individual section as well as achieve the overall aggregate cutoff."
    },
    {
      "question": "What is the score ratio for final IBPS PO merit listing?",
      "answer": "The final merit score is calculated out of 100 with an 80:20 ratio: 80% weightage given to marks scored in Mains (out of 225) and 20% weightage given to marks scored in the Personal Interview (out of 100)."
    },
    {
      "question": "What is the starting in-hand salary of an IBPS PO?",
      "answer": "Under the 12th Bipartite wage structure, an IBPS PO receives an initial in-hand monthly salary of approximately ₹62,000 to ₹67,000 post deductions."
    },
    {
      "question": "Can final-year students apply for IBPS PO?",
      "answer": "Candidates must possess the final degree mark sheet/certificate on or before the online application closing date. Appearing students whose results are pending cannot apply."
    },
    {
      "question": "Which public sector banks participate in IBPS PO?",
      "answer": "11 public sector banks participate, including PNB, Bank of Baroda, Canara Bank, Union Bank of India, Indian Bank, Bank of India, Central Bank of India, Indian Overseas Bank, UCO Bank, Bank of Maharashtra, and Punjab & Sind Bank."
    }
  ]
},
{
  "slug": "ibps-clerk",
  "title": "IBPS Clerk (CRP Clerical Cadre) Examination Guide (2026)",
  "examName": "IBPS Clerical Cadre (Customer Service Associates)",
  "conductingBody": "Institute of Banking Personnel Selection (IBPS)",
  "officialUrl": "https://www.ibps.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Institute of Banking Personnel Selection Clerk (IBPS CRP Clerical Cadre) recruitment serves as the premier annual gateway for staffing clerical, teller, deposit operations, single-window customer service, and branch front-desk cadres across 11 nationalized Public Sector Banks in India (including Punjab National Bank, Bank of Baroda, Canara Bank, Union Bank of India, and Indian Bank). Vacancies are state and union territory specific, meaning candidates apply for vacancies in a particular state and must demonstrate proficiency in the official local regional language of that state or union territory. Conducted in regional languages alongside Hindi and English, the examination structure comprises a two-stage computer-based screening framework (Preliminary and Mains examinations) with no interview stage, offering direct merit-based appointment.",
  "eligibility": {
    "ageLimit": "20 to 28 Years as on crucial date. Standard category relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "A Degree (Graduation) in any discipline from a recognized University. Operating and working knowledge in computer systems is mandatory.",
    "nationality": "Citizen of India.",
    "attempts": "No restriction within the age limit."
  },
  "selectionStages": [
    {
      "stage": "Prelims",
      "name": "Preliminary Examination",
      "mode": "Online CBT (100 Qs, 100 Marks, 60 Mins)",
      "details": "English (30), Numerical Ability (35), Reasoning (35). Sectional timers of 20 mins. Qualifying for Mains."
    },
    {
      "stage": "Mains",
      "name": "Mains Examination",
      "mode": "Online CBT (190 Qs, 200 Marks, 160 Mins)",
      "details": "General/Financial Awareness (50), General English (40), Quantitative Aptitude (50), Reasoning & Computer Aptitude (50). Decides final merit."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Sectional timers in both phases with 1/4th negative marking penalty.",
    "patternTable": [
      {
        "section": "Prelims: English, Math, Reasoning",
        "questions": 100,
        "marks": 100,
        "duration": "60 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: General / Financial Awareness",
        "questions": 50,
        "marks": 50,
        "duration": "35 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: General English",
        "questions": 40,
        "marks": 40,
        "duration": "35 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Quantitative Aptitude",
        "questions": 50,
        "marks": 50,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Mains: Reasoning & Computer",
        "questions": 50,
        "marks": 60,
        "duration": "45 Mins",
        "negativeMarking": "0.25 marks"
      }
    ],
    "syllabusHighlights": [
      "Numerical Ability: Simplification, Approximations, Arithmetic word problems, Quadratic equations, Data Interpretation.",
      "Reasoning Ability: Puzzles, Seating arrangements, Syllogisms, Inequalities, Alphanumeric series.",
      "Financial Awareness: Current banking developments, Government schemes, Financial inclusion, RBI guidelines."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Starting Basic Pay of ₹24,050 under the revised 12th Bipartite Wage Settlement",
    "startingBasic": "₹24,050",
    "inHandRange": "₹35,000 to ₹40,000 per month depending on posting city classification.",
    "hierarchy": [
      "Customer Service Associate (Clerk) -> Senior Associate -> Special Associate",
      "Officer Track: Scale-I Officer (Assistant Manager via internal promotion exam after 3 years)",
      "Management Track: Scale-II (Manager) -> Scale-III (Senior Manager)"
    ],
    "pensionAndPerks": "NPS Pension, Medical reimbursement, Staff welfare loans, and localized branch postings."
  },
  "preparationStrategy": [
    "Speed-Drill Simplification Questions: Aim to solve 10-15 simplification questions in under 4 minutes in Prelims.",
    "Daily Banking News Notes: Build concise weekly notes covering RBI repo rates, GDP projections, and banking appointments.",
    "Regional Language Proficiency: Apply for states where you are completely fluent in reading, writing, and speaking the local language."
  ],
  "commonMistakes": [
    "Applying for Other States Without Language Fluency: Candidates failing the local language verification during document scrutiny are rejected.",
    "Missing Sectional Cutoffs: Ensure consistent minimum attempts across each section under the 20-minute timer."
  ],
  "faqs": [
    {
      "question": "Is there an interview in IBPS Clerk?",
      "answer": "No. There is zero interview. Final selection is based 100% on the normalized score in the online Mains Examination."
    },
    {
      "question": "Is IBPS Clerk conducted in regional languages?",
      "answer": "Yes. The examination is conducted in 13 regional languages in addition to English and Hindi, allowing candidates to read questions in their state language."
    },
    {
      "question": "What is the starting salary of an IBPS Clerk?",
      "answer": "An IBPS Clerk receives an initial in-hand monthly salary of approximately ₹35,000 to ₹39,000 post deductions."
    },
    {
      "question": "Can an IBPS Clerk become a Branch Manager?",
      "answer": "Yes. Through internal promotional examinations (TRA / OJM), clerks can be promoted to Scale-I Officer in 3 years and subsequently rise to Branch Manager (Scale-III)."
    },
    {
      "question": "Is negative marking applicable in IBPS Clerk?",
      "answer": "Yes. A negative marking penalty of 0.25 marks (1/4th) is deducted for each incorrect answer in both Prelims and Mains."
    }
  ]
},
{
  "slug": "rbi-grade-b",
  "title": "RBI Grade B Officer Examination Blueprint (2026)",
  "examName": "Reserve Bank of India Officers in Grade 'B' (General)",
  "conductingBody": "Reserve Bank of India Services Board (RBISB)",
  "officialUrl": "https://rbi.org.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Reserve Bank of India Grade 'B' (General) examination is the most intellectually rigorous and prestigious central banking recruitment in Asia. Directly inducting officers into the nation’s monetary authority and banking regulator, Grade 'B' officers contribute to monetary policy formulation, inflation targeting, financial market regulation, currency management, and foreign exchange reserves oversight. The examination involves a high-speed Phase-I objective test, an advanced Phase-II examination (featuring Economics & Social Issues, Descriptive English, and Finance & Management), and a rigorous Personal Interview.",
  "eligibility": {
    "ageLimit": "21 to 30 Years as on crucial date (extended to 32 for candidates possessing M.Phil. and Ph.D.). Relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs, PwBD +10 yrs.",
    "educationalQualification": "Graduation in any discipline / Equivalent technical qualification with minimum 60% marks (50% for SC/ST/PwBD) or Post-Graduation with minimum 55% marks in aggregate.",
    "nationality": "Citizen of India.",
    "attempts": "General / EWS: Maximum 6 Attempts in Phase-I. SC / ST / OBC / PwBD: Unlimited attempts within age limit."
  },
  "selectionStages": [
    {
      "stage": "Phase-I",
      "name": "Preliminary Online Examination",
      "mode": "Online Objective (200 Qs, 200 Marks, 120 Mins)",
      "details": "General Awareness (80), Reasoning (60), English (30), Quantitative Aptitude (30). High sectional cutoffs."
    },
    {
      "stage": "Phase-II",
      "name": "Mains Examination (3 Papers)",
      "mode": "Online Objective + Keyboard Descriptive (300 Marks)",
      "details": "Paper-I: Economic & Social Issues (ESI, 100 Marks). Paper-II: English Writing Skills (100 Marks). Paper-III: Finance & Management (FM, 100 Marks)."
    },
    {
      "stage": "Interview",
      "name": "Personal Interview",
      "mode": "Face-to-Face Board Interview (75 Marks)",
      "details": "Conducted at RBI regional offices. Final merit: Phase-II (300) + Interview (75) = 375 Marks."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Rigorous macroeconomics, corporate finance, organizational behavior, and descriptive typing.",
    "patternTable": [
      {
        "section": "Phase-I: General Awareness",
        "questions": 80,
        "marks": 80,
        "duration": "25 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-I: Reasoning",
        "questions": 60,
        "marks": 60,
        "duration": "45 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-I: English Language",
        "questions": 30,
        "marks": 30,
        "duration": "25 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-I: Quantitative Aptitude",
        "questions": 30,
        "marks": 30,
        "duration": "25 Mins (Sectional)",
        "negativeMarking": "0.25 marks"
      },
      {
        "section": "Phase-II Paper-I: Economic & Social Issues",
        "questions": 30,
        "marks": 100,
        "duration": "120 Mins (50 Obj + 50 Des)",
        "negativeMarking": "0.25 on Obj"
      },
      {
        "section": "Phase-II Paper-II: English Descriptive",
        "questions": 3,
        "marks": 100,
        "duration": "90 Mins (Keyboard Typing)",
        "negativeMarking": "Descriptive"
      },
      {
        "section": "Phase-II Paper-III: Finance & Management",
        "questions": 30,
        "marks": 100,
        "duration": "120 Mins (50 Obj + 50 Des)",
        "negativeMarking": "0.25 on Obj"
      }
    ],
    "syllabusHighlights": [
      "Economic & Social Issues (ESI): Growth and Development, Poverty Alleviation, Macroeconomic Policy, Balance of Payments, Sustainable Development, Social Structure in India.",
      "Finance: Financial System, Regulators (RBI, SEBI, IRDAI), Financial Markets (Forex, Money, Debt), Derivative instruments, Financial Inclusion, Corporate Governance.",
      "Management: Principles of Management, Motivation theories, Leadership styles, Communication, Corporate Governance and Ethics."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Starting Basic Pay of ₹55,200 on the scale of ₹55,200–₹99,750 (Grade B)",
    "startingBasic": "₹55,200 per month",
    "inHandRange": "₹1,15,000 to ₹1,30,000 per month starting in-hand pay (plus luxury leased housing up to ₹45,000–₹55,000/month in Mumbai/Delhi).",
    "hierarchy": [
      "Entry: Manager / Officer in Grade 'B' (Basic ₹55,200)",
      "Promotion 1 (5-7 Yrs): Assistant General Manager (Grade 'C')",
      "Promotion 2: Deputy General Manager (Grade 'D')",
      "Senior Cadre: General Manager (Grade 'E') -> Chief General Manager (Grade 'F')",
      "Top Leadership: Executive Director (ED) -> Deputy Governor (DG)"
    ],
    "pensionAndPerks": "Luxury 2BHK/3BHK RBI Quarters, Book grant, Briefcase grant, Spectacles allowance, Furnishing allowances, Sodexo meal coupons, and World-class medical cover."
  },
  "preparationStrategy": [
    "Master RBI Bulletins and Annual Reports: Study the RBI Annual Report and Report on Currency & Finance directly from rbi.org.in.",
    "Practice Descriptive Typing on Standard Keyboards: 50% of ESI and FM papers plus the entire English paper require fast, structured typing.",
    "Daily Macroeconomic Coverage: Read Mint or Business Standard daily, focusing on fiscal policy, global inflation, and central banking tools."
  ],
  "commonMistakes": [
    "Failing Phase-I GA Cutoff: The 80 questions in Phase-I General Awareness test deep monetary and financial statistics; neglecting this leads to Phase-I elimination.",
    "Superficial Understanding of Finance Concepts: Treating Finance like simple banking awareness causes failure in the analytical Phase-II descriptive questions."
  ],
  "faqs": [
    {
      "question": "What is the starting in-hand salary of an RBI Grade B Officer?",
      "answer": "An RBI Grade B officer receives a starting monthly gross of over ₹1,35,000, translating to an in-hand take-home salary of approximately ₹1,15,000 to ₹1,25,000, excluding luxury accommodation and extensive perks."
    },
    {
      "question": "Is 60% in graduation strictly mandatory for RBI Grade B?",
      "answer": "Yes. Candidates must have scored at least 60% marks (50% for SC/ST/PwBD) in Graduation or 55% in Post-Graduation. Applications with even 59.9% are administratively rejected."
    },
    {
      "question": "What counts as an attempt in RBI Grade B?",
      "answer": "For the General category, appearing in the Phase-I examination counts as an attempt. A maximum of 6 attempts is permitted for General / EWS candidates."
    },
    {
      "question": "Are Phase-I marks counted in the final merit list?",
      "answer": "No. Phase-I is purely a qualifying screening test. Final selection is based on aggregate marks in Phase-II (300 marks) and the Personal Interview (75 marks)."
    },
    {
      "question": "Can an RBI Grade B officer rise to Deputy Governor?",
      "answer": "Yes. Several Deputy Governors of the Reserve Bank of India joined as direct recruit Grade 'B' officers and rose through merit promotions to the central bank’s top leadership."
    }
  ]
},
{
  "slug": "defence-nda-cds",
  "title": "UPSC Defence (NDA & CDS) Comprehensive Blueprint (2026)",
  "examName": "National Defence Academy (NDA) & Combined Defence Services (CDS)",
  "conductingBody": "Union Public Service Commission (UPSC)",
  "officialUrl": "https://upsc.gov.in",
  "lastReviewed": "01 October 2026",
  "overview": "The UPSC National Defence Academy (NDA) and Combined Defence Services (CDS) examinations are the premier entry channels for commissioned officer ranks in the Indian Armed Forces (Indian Army, Indian Navy, and Indian Air Force). NDA recruits 10+2 cadets for joint training at Khadakwasla, Pune, while CDS recruits graduates for the Indian Military Academy (IMA), Indian Naval Academy (INA), Air Force Academy (AFA), and Officers Training Academy (OTA). Candidates passing the written test undergo the rigorous 5-day Services Selection Board (SSB) interview evaluating psychological suitability and officer qualities.",
  "eligibility": {
    "ageLimit": "NDA: 16.5 to 19.5 Years (Unmarried male/female candidates). CDS: 19 to 24 Years (IMA/INA/AFA) and 19 to 25 Years (OTA). Zero category age relaxation under defence service rules.",
    "educationalQualification": "NDA Army: 12th pass. NDA Navy/Air Force: 12th pass with Physics and Mathematics. CDS IMA/OTA: Degree in any discipline. CDS INA: Degree in Engineering. CDS AFA: Degree with Physics & Math at 10+2 OR Bachelor of Engineering.",
    "nationality": "Citizen of India.",
    "attempts": "Unlimited within permissible age brackets."
  },
  "selectionStages": [
    {
      "stage": "Written Exam",
      "name": "UPSC Written Test",
      "mode": "Offline Pen-and-Paper OMR",
      "details": "NDA: Mathematics (300 Marks) + General Ability Test (600 Marks). CDS: English (100), GK (100), Elementary Math (100) [Math omitted for OTA]."
    },
    {
      "stage": "SSB Interview",
      "name": "Services Selection Board",
      "mode": "5-Day Psychological & Outdoor Evaluation",
      "details": "Stage-I: Screening (OIR + PPDT). Stage-II: Psychology Tests (TAT, WAT, SRT), GTO Outdoor Tasks, and Personal Interview. Total: 900 Marks (NDA) / 300 Marks (CDS)."
    },
    {
      "stage": "Medical Exam",
      "name": "Special Medical Board (SMB)",
      "mode": "Military Hospital Examination",
      "details": "Comprehensive medical testing including spinal X-rays, anthropometric measurements, and surgical fitness."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Focuses on higher mathematics, English comprehension, and general science.",
    "patternTable": [
      {
        "section": "NDA: Mathematics (10+2 Standard)",
        "questions": 120,
        "marks": 300,
        "duration": "2.5 Hours",
        "negativeMarking": "0.83 marks"
      },
      {
        "section": "NDA: General Ability Test (GAT)",
        "questions": 150,
        "marks": 600,
        "duration": "2.5 Hours",
        "negativeMarking": "1.33 marks"
      },
      {
        "section": "CDS: English",
        "questions": 120,
        "marks": 100,
        "duration": "2 Hours",
        "negativeMarking": "0.33 marks"
      },
      {
        "section": "CDS: General Knowledge",
        "questions": 120,
        "marks": 100,
        "duration": "2 Hours",
        "negativeMarking": "0.33 marks"
      },
      {
        "section": "CDS: Elementary Mathematics",
        "questions": 100,
        "marks": 100,
        "duration": "2 Hours",
        "negativeMarking": "0.33 marks"
      }
    ],
    "syllabusHighlights": [
      "NDA Mathematics: Algebra, Matrices & Determinants, Trigonometry, Analytical Geometry, Differential & Integral Calculus, Vector Algebra, Probability & Statistics.",
      "GAT / GK: Physics, Chemistry, General Science, History & Freedom Movement, Geography, Current Events, English Grammar & Comprehension."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Commissioned as Lieutenant / Sub-Lieutenant / Flying Officer at Pay Level 10 (₹56,100–₹1,77,500) plus Military Service Pay (MSP)",
    "startingBasic": "₹56,100 + ₹15,500 MSP = ₹71,600 Starting Pay Element",
    "inHandRange": "₹95,000 to ₹1,20,000 per month (plus Flying Allowance, Field Area Allowance, or High Altitude Allowance where deployed).",
    "hierarchy": [
      "Lieutenant / Sub-Lieutenant / Flying Officer (Level 10)",
      "Captain / Lieutenant (Navy) / Flight Lieutenant (Level 10B)",
      "Major / Lt Commander / Squadron Leader (Level 11)",
      "Lt Colonel / Commander / Wing Commander (Level 12A)",
      "Colonel / Captain / Group Captain (Level 13) -> Brigadier -> Major General -> General"
    ],
    "pensionAndPerks": "Officer Mess accommodation, CSD Canteen facilities, Free military medical cover for family (ECHS), Defence travel concessions, and Defined Defence Pension."
  },
  "preparationStrategy": [
    "Master 11th and 12th Mathematics for NDA: Solve NCERT and previous 10 years NDA papers; calculus, vectors, and trigonometry carry over 60% weightage.",
    "Daily Physical Conditioning: Run 2.4 km daily, practice pull-ups, push-ups, and obstacle navigation to prepare for GTO outdoor tasks.",
    "Develop Officer Like Qualities (OLQs): Cultivate effective intelligence, initiative, social adaptability, cooperation, and courage."
  ],
  "commonMistakes": [
    "Failing NDA Mathematics Sectional Cutoff: Even if you score 400+ in GAT, failing the 25% minimum qualifying cutoff in Mathematics results in total disqualification.",
    "Memorizing Coached Responses for SSB Psychology: The SSB psychologist detects rehearsed stories in TAT and sentence completion tests, leading to non-recommendation."
  ],
  "faqs": [
    {
      "question": "Can female candidates apply for NDA and CDS?",
      "answer": "Yes. Following landmark Supreme Court directives, female candidates are fully eligible to apply for both NDA and CDS entries across the Army, Navy, and Air Force."
    },
    {
      "question": "Are there reservations or age relaxations for SC/ST candidates in NDA/CDS?",
      "answer": "No. The Indian Armed Forces do not provide caste-based reservations or age concessions for commissioned officer ranks. All candidates compete on identical merit and physical standards."
    },
    {
      "question": "What is Military Service Pay (MSP)?",
      "answer": "Military Service Pay is a specialized statutory monthly allowance of ₹15,500 granted to commissioned officers in recognition of the arduous nature and hazards of military life. It counts for DA and pension calculations."
    },
    {
      "question": "What is the duration of training at NDA Khadakwasla?",
      "answer": "Cadets undergo a 3-year joint training curriculum at the National Defence Academy, earning a B.A., B.Sc., or B.Tech degree from JNU, followed by 1 year of specialized pre-commission training at IMA, INA, or AFA."
    },
    {
      "question": "What is the passing score in the 5-day SSB Interview?",
      "answer": "Candidates must achieve a minimum qualifying score across Psychology, GTO, and Interview assessments. The recommendation is finalized during the Day-5 Board Conference."
    }
  ]
},
{
  "slug": "rpf-si-constable",
  "title": "RPF SI & Constable Recruitment Guide (2026)",
  "examName": "Railway Protection Force (SI & Constable)",
  "conductingBody": "Railway Recruitment Boards (RRB) & Ministry of Railways",
  "officialUrl": "https://rpf.indianrailways.gov.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Railway Protection Force (RPF) and Railway Protection Special Force (RPSF) recruitment serves as the premier uniformed armed enforcement recruitment under the Ministry of Railways, Government of India. Operating with statutory police powers under the Railway Protection Force Act, 1957, personnel are tasked with securing millions of railway passengers daily, protecting vital national railway infrastructure, escorting sensitive passenger trains, and preventing crimes across tracks and stations. The recruitment selects Sub-Inspectors (Executive) at 7th CPC Pay Level 6 and Constables (Executive) at 7th CPC Pay Level 3, combining an intensive Computer-Based Examination with demanding athletic Physical Efficiency Tests (1600-meter run, high jump, and long jump).",
  "eligibility": {
    "ageLimit": "Constable: 18 to 28 Years. Sub-Inspector: 20 to 28 Years (including 3-year age concession). Standard relaxations: OBC-NCL +3 yrs, SC/ST +5 yrs.",
    "educationalQualification": "Constable: 10th pass (Matriculation) from a recognized Board. Sub-Inspector: Bachelor’s Degree in any discipline from a recognized University.",
    "nationality": "Citizen of India.",
    "attempts": "Unlimited within age bracket."
  },
  "selectionStages": [
    {
      "stage": "CBT",
      "name": "Computer-Based Test",
      "mode": "Online Objective (120 Qs, 120 Marks, 90 Mins)",
      "details": "General Awareness (50), Arithmetic (35), General Intelligence & Reasoning (35). 1/3rd negative marking."
    },
    {
      "stage": "PET / PST",
      "name": "Physical Efficiency & Measurement Test",
      "mode": "Qualifying Athletic Test",
      "details": "Constable: 1600m run in 5 mins 45 secs (Male) + 14 ft Long Jump + 4 ft High Jump. SI: 1600m in 6 mins 30 secs + 12 ft Long Jump + 3 ft 9 in High Jump."
    },
    {
      "stage": "DV / Medical",
      "name": "Document Verification & Medical Exam",
      "mode": "Verification & B-1 Medical Fitness",
      "details": "Rigorous medical examination ensuring B-1 physical fitness and color vision."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Focuses on Indian Constitution, railways, general science, and rapid arithmetic.",
    "patternTable": [
      {
        "section": "General Awareness",
        "questions": 50,
        "marks": 50,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "Arithmetic",
        "questions": 35,
        "marks": 35,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      },
      {
        "section": "General Intelligence & Reasoning",
        "questions": 35,
        "marks": 35,
        "duration": "90 Mins (Composite)",
        "negativeMarking": "1/3rd mark"
      }
    ],
    "syllabusHighlights": [
      "General Awareness: Indian Constitution, History, Geography, Railways GK, General Science, Current Events.",
      "Arithmetic: Number Systems, Percentages, Ratio, Averages, Profit & Loss, Simple/Compound Interest, Mensuration.",
      "Reasoning: Analogies, Spatial visualization, Problem solving, Analysis, Judgment, Decision making, Visual memory."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Sub-Inspector: Pay Level 6 (₹35,400–₹1,12,400); Constable: Pay Level 3 (₹21,700–₹69,100)",
    "startingBasic": "SI: ₹35,400 / Constable: ₹21,700",
    "inHandRange": "Constable: ₹36,000 to ₹42,000/mo. Sub-Inspector: ₹58,000 to ₹66,000/mo (plus uniform allowance, ration money, and railway passes).",
    "hierarchy": [
      "Constable -> Head Constable -> Assistant Sub-Inspector (ASI) -> Sub-Inspector (SI)",
      "SI -> Inspector -> Assistant Security Commissioner (ASC - Group A) -> Divisional Security Commissioner (DSC)"
    ],
    "pensionAndPerks": "Ration Money Allowance, Uniform Allowance, Railway Free Travel Passes, Overtime Allowance, and NPS pension."
  },
  "preparationStrategy": [
    "Intensive Running Drills for PET: The Constable 1600m time of 5 minutes 45 seconds is one of the toughest physical standards in India; begin daily sprint training months ahead.",
    "General Awareness Breadth: GA carries 50 marks out of 120; focus on Indian Constitution and Modern History.",
    "High-Speed Math Practice: Solve 35 arithmetic questions in under 25 minutes to leave ample time for reasoning."
  ],
  "commonMistakes": [
    "Failing the 1600m Run in PET: Over 60% of candidates who pass the written CBT fail the strict 5:45 minute running threshold.",
    "Ignoring Long Jump Fouls: Jumping before or over the takeoff line disqualifies candidates in the field events."
  ],
  "faqs": [
    {
      "question": "What is the PET running standard for RPF Constable male candidates?",
      "answer": "Male candidates for Constable must run 1600 meters within 5 minutes and 45 seconds in a single attempt, followed by a 14-foot Long Jump and a 4-foot High Jump."
    },
    {
      "question": "What is the height requirement for RPF Sub-Inspector?",
      "answer": "For male candidates (UR/OBC), the minimum height is 165 cm (chest 80-85 cm). For SC/ST males, it is 160 cm. For female candidates (UR/OBC), minimum height is 157 cm (152 cm for SC/ST)."
    },
    {
      "question": "Is there an interview in RPF SI or Constable recruitment?",
      "answer": "No. Selection is determined entirely by the CBT score, subject to qualifying the Physical Efficiency Test (PET), Physical Measurement Test (PMT), and Document Verification."
    },
    {
      "question": "What is the in-hand salary of an RPF Sub-Inspector?",
      "answer": "An RPF Sub-Inspector at Level 6 receives an initial in-hand monthly salary of approximately ₹58,000 to ₹64,000, including Basic Pay (₹35,400), DA, HRA, Transport Allowance, and Ration Money."
    },
    {
      "question": "Are women candidates eligible for RPF recruitment?",
      "answer": "Yes. 15% of vacancies in both RPF Sub-Inspector and Constable recruitments are statutorily reserved for women candidates."
    }
  ]
},
{
  "slug": "drdo-rac",
  "title": "DRDO RAC Scientist 'B' Recruitment Blueprint (2026)",
  "examName": "DRDO Recruitment & Assessment Centre Scientist 'B'",
  "conductingBody": "Recruitment & Assessment Centre (RAC), DRDO",
  "officialUrl": "https://rac.gov.in",
  "lastReviewed": "01 October 2026",
  "overview": "The Defence Research and Development Organisation Recruitment and Assessment Centre (DRDO RAC) Scientist 'B' recruitment inducts premier research scientists and engineers into India's military technology laboratories. Developing cutting-edge missile systems, fighter aircraft avionics, radar electronics, combat vehicles, and naval sonars, Scientist 'B' officers hold Central Civil Service Group 'A' Gazetted status. Selection is primarily executed through Graduate Aptitude Test in Engineering (GATE) scores followed by a rigorous technical Personal Interview conducted by senior defence scientists.",
  "eligibility": {
    "ageLimit": "Up to 28 Years for Unreserved / EWS candidates as on crucial closing date. Relaxations: OBC-NCL +3 yrs (up to 31), SC/ST +5 yrs (up to 33), PwBD +10 yrs.",
    "educationalQualification": "At least First Class Bachelor’s Degree in Engineering or Technology in Electronics & Comm., Mechanical, Computer Science, Electrical, Aeronautical, Chemical, or Metallurgy from a recognized university, with a valid GATE score.",
    "nationality": "Citizen of India.",
    "attempts": "No restriction within age ceiling."
  },
  "selectionStages": [
    {
      "stage": "Screening",
      "name": "GATE Score Shortlisting",
      "mode": "Based on Valid GATE Score",
      "details": "Candidates are shortlisted for Personal Interview in the ratio of 1:10 based strictly on their valid GATE score in the respective engineering discipline."
    },
    {
      "stage": "Interview",
      "name": "Personal Technical Interview",
      "mode": "Face-to-Face Technical Board Interview (100 Marks)",
      "details": "Conducted at RAC Delhi. Evaluates fundamental engineering knowledge, final year project work, research aptitude, and problem-solving. Minimum qualifying score: 70% for UR, 60% for OBC/SC/ST."
    },
    {
      "stage": "Final Merit",
      "name": "Combined Merit Listing",
      "mode": "GATE (80%) + Interview (20%)",
      "details": "Final appointment merit is computed giving 80% weightage to the GATE score and 20% weightage to the personal interview score."
    }
  ],
  "syllabusAndPattern": {
    "overview": "Evaluation is based on the official GATE syllabus of the respective engineering branch.",
    "patternTable": [
      {
        "section": "GATE Examination (Core Engineering)",
        "questions": 65,
        "marks": 100,
        "duration": "3 Hours",
        "negativeMarking": "1/3rd on MCQs"
      },
      {
        "section": "Technical Personal Interview",
        "questions": 20,
        "marks": 100,
        "duration": "45–60 Mins",
        "negativeMarking": "Subjective Board Assessment"
      }
    ],
    "syllabusHighlights": [
      "Mechanical: Engineering Mechanics, Strength of Materials, Theory of Machines, Vibrations, Fluid Mechanics, Heat Transfer, Thermodynamics, Manufacturing Engineering.",
      "Electronics: Network Theory, Signals & Systems, Electronic Devices, Analog Circuits, Digital Circuits, Control Systems, Communications, Electromagnetics.",
      "Computer Science: Algorithms, Data Structures, Operating Systems, DBMS, Computer Networks, Theory of Computation, Compiler Design, Computer Architecture."
    ]
  },
  "payAndCareerGrowth": {
    "payLevel": "Group 'A' Gazetted, Pay Level 10 (₹56,100–₹1,77,500) under the 7th CPC Matrix",
    "startingBasic": "₹56,100",
    "inHandRange": "₹88,000 to ₹96,000 per month (plus Professional Update Allowance of ₹22,500 annually and PRIS incentives).",
    "hierarchy": [
      "Entry: Scientist 'B' (Pay Level 10, Basic ₹56,100)",
      "Promotion 1 (3-4 Yrs): Scientist 'C' (Pay Level 11, Basic ₹67,700)",
      "Promotion 2: Scientist 'D' (Pay Level 12, Basic ₹78,800)",
      "Senior Research: Scientist 'E' (Level 13) -> Scientist 'F' (Level 13A) -> Scientist 'G' (Level 14)",
      "Top Leadership: Scientist 'H' (Outstanding Scientist, Level 15) -> Distinguished Scientist -> Secretary DD R&D and Chairman DRDO"
    ],
    "pensionAndPerks": "Flexible Complementing Scheme (FCS - merit-based promotions independent of vacancy vacancy availability), Official Quarters in DRDO residential complexes, Professional Update Allowance, and Sponsored Post-Graduate / Ph.D. programs at IITs/IISc."
  },
  "preparationStrategy": [
    "Target a 750+ GATE Score: Shortlisting cutoffs in Mechanical and Computer Science branches consistently hover above the 720-780 GATE score bracket.",
    "Master Engineering Fundamentals: The interview panel questions core principles (e.g. Navier-Stokes equations, Fourier transforms, semiconductor physics) from first principles.",
    "Thorough Defense Application Review: Align your final-year research project or thesis with potential defence applications (radar, robotics, composite materials)."
  ],
  "commonMistakes": [
    "Failing the 70% Interview Threshold: Unlike other exams where scoring low in interview can be compensated by written marks, DRDO mandates minimum 70% marks in the interview for UR candidates.",
    "Inability to Explain B.Tech Project Work: Stumbling when asked about your experimental methodology or simulation models creates a poor impression before the scientist board."
  ],
  "faqs": [
    {
      "question": "Is GATE mandatory for DRDO Scientist 'B' recruitment?",
      "answer": "Yes. For almost all engineering disciplines, a valid GATE score in the corresponding paper is the mandatory screening criterion to be shortlisted for the personal interview."
    },
    {
      "question": "What is the Flexible Complementing Scheme (FCS) in DRDO?",
      "answer": "FCS is a fast-track, time-bound scientific promotion system where scientists are evaluated on merit and research publications for promotion to higher grades (from Scientist B to C, D, E, F, G) without being restricted by vacancy ceilings."
    },
    {
      "question": "What is the starting salary of a DRDO Scientist 'B'?",
      "answer": "Scientist 'B' starts at Pay Level 10 (Basic ₹56,100). In a Class X city like New Delhi or Bengaluru, the starting monthly take-home salary is approximately ₹88,000 to ₹95,000 post deductions."
    },
    {
      "question": "What is the minimum qualifying score in the DRDO personal interview?",
      "answer": "Candidates must score at least 70% marks (70 out of 100) in the personal interview for Unreserved/EWS categories and 60% marks for OBC/SC/ST categories to be considered for final appointment."
    },
    {
      "question": "Can final-year engineering students apply for DRDO RAC?",
      "answer": "Final-year students who possess a valid GATE score can apply provided they submit their final degree / provisional certificate during document verification before appointment."
    }
  ]
}
];
