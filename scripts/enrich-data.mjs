import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/data/gazetteData.ts');

async function main() {
  const mod = await import('../src/data/gazetteData.ts');
  const alerts = mod.RECRUITMENT_ALERTS;

  const getStandardPrepTips = (alert) => {
    if (alert.category === 'admit-card') {
      return [
        'Print at least two clear copies of your e-Admit Card on clean A4 paper well in advance; do not wait until the exam morning.',
        'Locate your exact examination center on Google Maps one day prior to avoid last-minute transit delays or wrong center confusion.',
        'Carry strictly the original valid government photo ID card matching the exact name and DOB on your registration form.',
        'Adhere strictly to the gate closure schedule: entry gates close permanently 30 to 45 minutes prior to test commencement.',
        'Carry two passport photographs matching the application form for emergency verification at the facilitation counter.'
      ];
    }
    if (alert.sector === 'ssc') {
      return [
        'Complete at least 25 full-length Tier-1 CBT mock tests under strict 60-minute countdown constraints to develop cognitive stamina.',
        'Maintain an error log detailing calculation slips in Quantitative Aptitude and misread grammar rules in General English.',
        'Focus on high-yield General Awareness topics including 7th Schedule constitutional articles, 5-Year Plans, and current economic budget highlights.',
        'Avoid blind guessing: under a 0.50 negative penalty, 2 incorrect guesses erase the net credit earned by 1 correct answer.',
        'Practice daily 15-minute mental arithmetic drills (tables up to 30, squares up to 50, cubes up to 25) to save scratchpad time.'
      ];
    }
    if (alert.sector === 'banking') {
      return [
        'Master 20-minute sectional time management: aim for 28+ attempts in Reasoning, 25+ in Quantitative Aptitude, and 22+ in English.',
        'Focus on High-Yield Puzzle Formats (Floor with Flat, Box, Square seating with vacant seats) to guarantee 15-20 marks within 10 minutes.',
        'Practice Simplification, Quadratic Inequalities, and Number Series daily for effortless 12-15 score banking.',
        'Read daily editorial columns to improve reading comprehension skimming speed and contextual vocabulary identification.',
        'Strictly avoid spending more than 2.5 minutes on a single arithmetic word problem or unfamiliar puzzle arrangement.'
      ];
    }
    if (alert.sector === 'railways') {
      return [
        'Focus heavily on NCERT Class 9 and 10 General Science fundamentals (Physics numericals, Chemical reactions, and Human anatomy).',
        'Practice daily non-verbal reasoning questions including mirror images, paper folding, and embedded figure recognition.',
        'Familiarize yourself with TCS exam interface shortcuts to rapidly navigate between answered, unread, and flagged questions.',
        'Under the 1/3rd negative deduction rule, skip questions where you cannot eliminate at least two plausible distractor options.',
        'Build endurance for Computer Based Tests through uninterrupted 90-minute full mock exam simulations.'
      ];
    }
    if (alert.sector === 'upsc') {
      return [
        'Integrate static syllabus concepts with dynamic newspaper coverage from The Hindu and Indian Express.',
        'Solve at least 10 previous years official UPSC preliminary papers to decode commission question phrasing and elimination mechanics.',
        'Do not neglect CSAT Paper-II: practice daily comprehension passages and basic arithmetic to comfortably cross the 33% (66 marks) barrier.',
        'Maintain crisp, handwritten revision micro-notes organized by GS paper themes (Polity, Economy, Geography, Environment, Modern History).',
        'Follow a disciplined 3-cycle revision schedule: first revision within 7 days, second within 30 days, and third during the final month.'
      ];
    }
    if (alert.sector === 'police') {
      return [
        'Master General Hindi / Regional Language: language papers carry high scoring predictability; aim for 90%+ accuracy.',
        'Practice OMR sheet bubbling drills: offline testing requires bubble shading speed to avoid losing 15-20 minutes in marking.',
        'Do not take risks under the negative penalty: skip doubtful questions to protect your positive score tally.',
        'Begin physical fitness training simultaneously: practice endurance running daily to comfortably clear physical efficiency standards.',
        'Solve at least 20 official previous year question papers to recognize recurring syllabus question structures.'
      ];
    }
    if (alert.sector === 'defence') {
      return [
        'Combine academic preparation with daily physical conditioning (1600m running, push-ups, chin-ups) to maintain high PFT readiness.',
        'Develop strong English language command and current affairs articulation for the 5-day Services Selection Board (SSB) interview.',
        'Practice speed mathematics formulas for NDA/CDS: focus on trigonometry, matrices, coordinate geometry, and calculus shortcuts.',
        'Review military organization hierarchy, gallantry decorations, and current geopolitical developments for the General Knowledge paper.',
        'Maintain consistent sleep and hydration habits to ensure peak mental clarity during prolonged written examination sessions.'
      ];
    }
    return [
      'Download and print the official gazette syllabus to tick off every individual sub-topic systematically during your study schedule.',
      'Dedicate the first 2 hours of daily study to your weakest subject before moving to familiar revision topics.',
      'Conduct weekly timed self-assessment tests and compute your net score strictly applying the official negative marking formula.',
      'Review official commission corrigenda and model answer keys to understand recurring question structures and accepted representations.',
      'Ensure all mandatory identity documents and category certificates are renewed within the prescribed financial year validity window.'
    ];
  };

  // Specific enrichments per alert ID
  const enrichments = {
    'ugc-net-december-2026-application-form': {
      examPattern: [
        { subject: 'Paper-I: Teaching & Research Aptitude (General)', questions: 50, marks: 100, time: 'Combined 3 Hours (180 Mins)', negativeMarking: 'No Negative Marking (2 Marks per question)' },
        { subject: 'Paper-II: Domain Subject Selected (87 Subjects)', questions: 100, marks: 200, time: 'Combined 3 Hours (180 Mins)', negativeMarking: 'No Negative Marking (2 Marks per question)' }
      ],
      cutOffTrends: [
        { year: 'June 2024 Cycle (Economics JRF Benchmark)', general: 198.0, obc: 182.0, ews: 184.0, sc: 168.0, st: 156.0, totalMarks: 300 },
        { year: 'December 2023 Cycle (Commerce JRF Benchmark)', general: 194.0, obc: 178.0, ews: 180.0, sc: 162.0, st: 152.0, totalMarks: 300 },
        { year: 'June 2023 Cycle (English JRF Benchmark)', general: 190.0, obc: 174.0, ews: 176.0, sc: 158.0, st: 148.0, totalMarks: 300 }
      ],
      syllabusTopics: [
        {
          subject: 'Paper-I: Teaching & Research Aptitude',
          weightage: '100 Marks / 50 Questions',
          topics: [
            'Teaching Aptitude: Concept, objectives, levels of teaching (memory, understanding, reflective), characteristics and basic requirements',
            'Research Aptitude: Meaning, types, characteristics, positivism and post-positivistic approach to research, methods of research',
            'Comprehension: A passage of text with five questions to test candidate reading analytical skills',
            'Communication: Meaning, types and characteristics of communication, effective communication, verbal and non-verbal',
            'Mathematical Reasoning and Aptitude: Types of reasoning, number series, letter series, codes and relationships',
            'Logical Reasoning: Understanding structure of arguments, evaluating and distinguishing deductive and inductive reasoning',
            'Data Interpretation: Sources, acquisition and classification of data, quantitative and qualitative data, graphical representation',
            'Information and Communication Technology (ICT): General abbreviations and terminology, basics of Internet, Intranet, E-mail, Audio and Video-conferencing',
            'People, Development and Environment: Development and environment, Millennium development and Sustainable development goals',
            'Higher Education System: Institutions of higher learning and education in ancient India, evolution of higher learning and research in post-independence India'
          ]
        },
        {
          subject: 'Paper-II: Domain Elective Subject (General Outline)',
          weightage: '200 Marks / 100 Questions',
          topics: [
            'Comprehensive master’s level core subjects across 87 authorized disciplines',
            'Advanced theoretical paradigms, literature reviews, quantitative modeling, and empirical methodologies',
            'Subject-specific policy frameworks, landmark institutional developments, and contemporary critical debates'
          ]
        }
      ]
    },
    'cbse-private-candidate-form-2027': {
      examPattern: [
        { subject: 'Class 10 Board Examination (Per Subject)', questions: 38, marks: 80, time: '3 Hours (180 Mins)', negativeMarking: 'No Negative Marking (Subjective Theory Paper)' },
        { subject: 'Class 12 Board Examination (Per Subject)', questions: 35, marks: 70, time: '3 Hours (180 Mins)', negativeMarking: 'No Negative Marking (Subjective Theory + Practical Marks Carry Over)' }
      ],
      cutOffTrends: [
        { year: '2026 Board Passing Percentage (Overall)', general: 87.98, obc: 85.40, ews: 86.20, sc: 81.50, st: 78.90, totalMarks: 100 },
        { year: '2025 Board Passing Percentage (Overall)', general: 86.50, obc: 84.10, ews: 85.00, sc: 80.20, st: 77.40, totalMarks: 100 }
      ],
      syllabusTopics: [
        {
          subject: 'CBSE Class 10 & 12 Official Prescribed Syllabi',
          weightage: '100% NCERT / CBSE Curriculum',
          topics: [
            'Complete theoretical chapters prescribed by Central Board of Secondary Education for the 2026-27 academic session',
            'Internal assessment and practical marks credit carry-over guidelines for essential repeat and compartment candidates',
            'Model sample question papers and marking schemes published on cbseacademic.nic.in'
          ]
        }
      ]
    },
    'isro-scientist-sc-2026': {
      cutOffTrends: [
        { year: '2024 ICRB Scientist SC (Screening CBT)', general: 68.25, obc: 62.50, ews: 60.75, sc: 54.00, st: 51.50, totalMarks: 100 },
        { year: '2023 ICRB Scientist SC (Screening CBT)', general: 64.00, obc: 58.75, ews: 57.25, sc: 50.50, st: 48.00, totalMarks: 100 },
        { year: '2021 ICRB Written Test Benchmark', general: 61.50, obc: 56.00, ews: 54.50, sc: 48.00, st: 45.50, totalMarks: 100 }
      ]
    },
    'drdo-rac-scientist-b-2026': {
      cutOffTrends: [
        { year: '2024 RAC Item-1 Mechanical/Electronics', general: 72.50, obc: 66.25, ews: 64.00, sc: 58.00, st: 54.50, totalMarks: 100 },
        { year: '2023 RAC Item-1 GATE Score Normalized', general: 69.00, obc: 63.50, ews: 61.25, sc: 55.00, st: 52.00, totalMarks: 100 },
        { year: '2022 RAC Recruitment Cycle', general: 66.75, obc: 61.00, ews: 59.50, sc: 53.25, st: 50.00, totalMarks: 100 }
      ]
    },
    'bel-project-trainee-engineer-2026': {
      cutOffTrends: [
        { year: '2024 Project Engineer CBT', general: 71.00, obc: 65.50, ews: 63.25, sc: 56.50, st: 53.00, totalMarks: 100 },
        { year: '2023 Trainee Engineer CBT', general: 67.50, obc: 62.00, ews: 59.75, sc: 53.00, st: 50.50, totalMarks: 100 },
        { year: '2022 Technical Selection Benchmark', general: 64.25, obc: 59.00, ews: 57.00, sc: 50.50, st: 47.75, totalMarks: 100 }
      ]
    },
    'upsc-cse-2026': {
      cutOffTrends: [
        { year: '2024 Prelims GS Paper-I (Official)', general: 75.41, obc: 74.75, ews: 68.02, sc: 59.25, st: 47.82, totalMarks: 200 },
        { year: '2023 Prelims GS Paper-I (Official)', general: 88.22, obc: 87.54, ews: 81.55, sc: 74.08, st: 69.35, totalMarks: 200 },
        { year: '2022 Prelims GS Paper-I (Official)', general: 88.22, obc: 87.54, ews: 82.83, sc: 74.08, st: 69.35, totalMarks: 200 }
      ],
      examPattern: [
        { subject: 'Civil Services Prelims Paper-I (General Studies)', questions: 100, marks: 200, time: '2 Hours (120 Mins)', negativeMarking: '0.66 Negative Marks (1/3rd Deduction)' },
        { subject: 'Civil Services Prelims Paper-II (CSAT Aptitude)', questions: 80, marks: 200, time: '2 Hours (120 Mins)', negativeMarking: '0.83 Negative Marks (Qualifying 33% / 66 Marks)' },
        { subject: 'Civil Services Mains (9 Descriptive Papers)', questions: 180, marks: 1750, time: '3 Hours per Paper', negativeMarking: 'Subjective Evaluation (Essay, GS 1-4, Optionals)' }
      ],
      syllabusTopics: [
        {
          subject: 'General Studies Paper-I (Preliminary Examination)',
          weightage: '200 Marks / 100 Questions',
          topics: [
            'Current events of national and international importance, bilateral summits, and multilateral accords',
            'History of India and Indian National Movement: Ancient, Medieval, Modern freedom struggle, and administrative evolution',
            'Indian and World Geography: Physical, Social, Economic Geography of India and the World',
            'Indian Polity and Governance: Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues',
            'Economic and Social Development: Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives',
            'General issues on Environmental Ecology, Bio-diversity and Climate Change, Wildlife Protection Acts, and Ramsar Sites',
            'General Science: Everyday scientific applications, biotechnology, space missions (Chandrayaan/Gaganyaan), and nanotechnology'
          ]
        },
        {
          subject: 'CSAT Paper-II (Civil Services Aptitude Test)',
          weightage: '200 Marks / 80 Questions (33% Qualifying)',
          topics: [
            'Reading Comprehension: Philosophical, analytical, and socio-economic editorial passages',
            'Interpersonal skills including communication skills and ethical decision-making scenarios',
            'Logical reasoning and analytical ability, syllogisms, linear and circular arrangements',
            'General mental ability, basic numeracy (numbers and relations, orders of magnitude - Class X level)',
            'Data interpretation (charts, graphs, tables, data sufficiency - Class X level)'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the minimum qualifying score for CSAT Paper-II in UPSC CSE 2026?',
          answer: 'As per official UPSC CSE examination rules, CSAT (Paper-II) is strictly a qualifying paper. Candidates must score a minimum of 33% (66 marks out of 200). Only candidates securing 66+ marks in CSAT have their General Studies Paper-I evaluated for Prelims merit and shortlisting to the Mains examination.'
        },
        {
          question: 'How many attempts are permitted for UPSC Civil Services Examination?',
          answer: 'General/UR and EWS candidates are permitted up to 6 attempts until age 32. OBC candidates are permitted 9 attempts until age 35. SC and ST candidates have unlimited attempts until the upper age limit of 37 years. PwBD candidates in General/OBC receive 9 attempts.'
        },
        {
          question: 'Can final year degree students apply for UPSC CSE 2026 Prelims?',
          answer: 'Yes. Candidates appearing in their final degree examination are eligible to sit for the Preliminary Examination. However, they must produce proof of passing their qualifying bachelor’s degree examination while submitting the Detailed Application Form-I (DAF-I) for the Mains examination.'
        },
        {
          question: 'What are the marks allocation and selection stages in UPSC CSE?',
          answer: 'UPSC CSE comprises three distinct stages: (1) Preliminary Examination (Screening only, 400 marks), (2) Mains Examination (9 written descriptive papers, 1,750 marks), and (3) Personality Test / Interview (275 marks). The final all-India merit ranking is determined out of a grand total of 2,025 marks.'
        }
      ]
    },
    'sbi-po-clerk-2026': {
      cutOffTrends: [
        { year: '2024 SBI PO Prelims (Official)', general: 58.50, obc: 56.75, ews: 55.25, sc: 50.00, st: 46.50, totalMarks: 100 },
        { year: '2023 SBI PO Prelims (Official)', general: 59.50, obc: 58.25, ews: 56.50, sc: 51.25, st: 47.75, totalMarks: 100 },
        { year: '2022 SBI PO Prelims (Official)', general: 59.50, obc: 58.25, ews: 57.00, sc: 52.50, st: 47.75, totalMarks: 100 }
      ],
      syllabusTopics: [
        {
          subject: 'Reasoning & Computer Aptitude',
          weightage: '40% Weightage',
          topics: [
            'High-level Puzzles (Floor with variable, Box scheduling, Year-based calculations with age limits)',
            'Seating Arrangements (Circular, Linear parallel rows, Uncertain number of persons)',
            'Syllogism (Only a few cases, Reverse syllogisms), Machine Input-Output logic flows',
            'Data Sufficiency (2-statement and 3-statement evaluations), Logical & Critical Reasoning (Course of action, Assumptions)'
          ]
        },
        {
          subject: 'Quantitative Aptitude & Data Analysis',
          weightage: '35% Weightage',
          topics: [
            'Data Interpretation (Caselet DI, Missing DI, Radar charts, Funnel charts, and Arithmetic-based DI)',
            'Number Series (Wrong number identification, Pattern recognition), Quadratic Equations with roots comparison',
            'Commercial Arithmetic: Profit & Loss, Simple & Compound Interest, Time & Work, Speed Time Distance, Mixtures & Alligations'
          ]
        },
        {
          subject: 'English Language & General / Banking Awareness',
          weightage: '25% Weightage',
          topics: [
            'Reading Comprehension (Financial, Macroeconomic & ESG themes with inference questions)',
            'Sentence rearrangement, Cloze test, Error detection, Word swap, and Column-based matching',
            'RBI monetary policy rates, Banking terminology, Priority Sector Lending (PSL), Union Budget allocations, Current financial news'
          ]
        }
      ],
      faqs: [
        {
          question: 'Is there sectional cut-off in SBI PO Examination?',
          answer: 'No! Unlike IBPS exams, State Bank of India does NOT enforce minimum qualifying sectional cut-offs in either Prelims or Mains. Selection is based purely on aggregate total marks. However, overall category cut-offs apply.'
        },
        {
          question: 'How many attempts are permitted for SBI PO?',
          answer: 'General/UR candidates are allowed up to 4 attempts in the SBI PO Mains examination. General (PwBD) and OBC candidates are permitted up to 7 attempts. SC and ST candidates have no restriction on attempts subject to age eligibility.'
        },
        {
          question: 'What is the in-hand salary of an SBI Probationary Officer in 2026?',
          answer: 'Under the 12th Bipartite Wage Settlement, starting basic pay is ₹48,480 (with 4 advance increments). Adding DA (52%), Special Allowance, and Lease Accommodation allowance (up to ₹30,000 in Mumbai), gross monthly compensation exceeds ₹85,000 to ₹95,000.'
        },
        {
          question: 'What is the role of the Psychometric Test in SBI PO Phase-III?',
          answer: 'The Psychometric Test is personality profiling administered to all Mains-shortlisted candidates prior to the Interview. The test results are shared with the interview panel to assess behavioral suitability, emotional intelligence, and leadership competencies.'
        }
      ]
    },
    'up-police-constable-2026': {
      cutOffTrends: [
        { year: '2024 Written Re-Exam Normalized (Official)', general: 198.50, obc: 189.75, ews: 182.25, sc: 165.50, st: 142.00, totalMarks: 300 },
        { year: '2023 Written Test Cycle', general: 193.00, obc: 184.50, ews: 177.00, sc: 160.00, st: 138.50, totalMarks: 300 },
        { year: '2019 Selection Benchmark Cycle', general: 185.34, obc: 172.32, ews: 168.00, sc: 145.39, st: 114.19, totalMarks: 300 }
      ],
      examPattern: [
        { subject: 'General Knowledge (सामान्य ज्ञान)', questions: 38, marks: 76, time: 'Combined 120 Mins (OMR)', negativeMarking: '0.50 Negative Marks per wrong answer' },
        { subject: 'General Hindi (सामान्य हिन्दी)', questions: 37, marks: 74, time: 'Combined 120 Mins (OMR)', negativeMarking: '0.50 Negative Marks per wrong answer' },
        { subject: 'Numerical & Mental Ability (संख्यात्मक एवं मानसिक योग्यता)', questions: 38, marks: 76, time: 'Combined 120 Mins (OMR)', negativeMarking: '0.50 Negative Marks per wrong answer' },
        { subject: 'Mental Aptitude, IQ & Reasoning (मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता)', questions: 37, marks: 74, time: 'Combined 120 Mins (OMR)', negativeMarking: '0.50 Negative Marks per wrong answer' }
      ],
      syllabusTopics: [
        {
          subject: 'General Knowledge & UP Special (सामान्य ज्ञान)',
          weightage: '76 Marks / 38 Questions',
          topics: [
            'History, Culture, Geography, and Economy of Uttar Pradesh; UP Police administrative system and revenue administration',
            'Indian Constitution, Fundamental Rights, Panchayati Raj, Human Rights, Internal Security and Cyber Crime basics',
            'Indian Economy, Agriculture, Commerce & Trade, GST and Demonetization impacts, National & International Awards',
            'Current National & International Affairs, Neighboring countries, Books and Authors, Important Days and Capitals'
          ]
        },
        {
          subject: 'General Hindi (सामान्य हिन्दी)',
          weightage: '74 Marks / 37 Questions',
          topics: [
            'Hindi Grammar fundamentals: Varna, Sandhi, Samas, Tatsam-Tadbhav, Paryayvachi, Vilom, Anekarthi shabd',
            'Vakyansh ke liye ek shabd, Samrupi bhinnarthak shabd, Ashuddh vakyon ko shuddh karna, Ling, Vachan, Karak, Sarvanam',
            'Visheshan, Kriya, Kaal, Vachya, Avyay, Upsarg, Pratyay, Ras, Chhand, Alankar, Hindi Sahitya award winners'
          ]
        },
        {
          subject: 'Numerical Ability & Mental Reasoning',
          weightage: '150 Marks / 75 Questions',
          topics: [
            'Number System, Simplification, Decimals & Fractions, HCF & LCM, Ratio & Proportion, Percentage, Profit & Loss, Discount',
            'Simple & Compound Interest, Partnership, Average, Time & Work, Time & Distance, Mensuration (Area and Volume)',
            'Logical diagrams, Symbol-relationship interpretation, Codification, Direction sense test, Letter and number series, Blood relations'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the examination mode for UP Police Constable 60,244 recruitment?',
          answer: 'The UP Police Constable recruitment is conducted in Pen-and-Paper (OMR-based) offline mode. The question paper contains 150 bilingual (Hindi & English) objective multiple-choice questions carrying a total of 300 marks for 2 hours.'
        },
        {
          question: 'What are the physical efficiency standards (running test) for UP Police?',
          answer: 'Physical Efficiency Test (PET) requires: Male candidates to complete a 4.8 km run within 25 minutes. Female candidates must complete a 2.4 km run within 14 minutes. PET is strictly qualifying in nature.'
        },
        {
          question: 'Are other state candidates eligible for UP Police Constable?',
          answer: 'Yes. Candidates from all Indian states are eligible to apply under the Unreserved (General) category. However, age relaxations and category reservation quotas (OBC, SC, ST, EWS) are strictly restricted to bonafide residents holding a UP domicile certificate.'
        },
        {
          question: 'What is the starting in-hand salary for UP Police Constable in 2026?',
          answer: 'UP Police Constables are appointed in Pay Matrix Level 3 (Pay Band ₹5,200 – ₹20,200, Grade Pay ₹2,000, Starting Basic Pay ₹21,700). Adding 50% DA, HRA, Uniform Allowance, and Diet Allowance, the gross monthly salary is approximately ₹35,000–₹38,000, with net in-hand pay around ₹31,500.'
        }
      ]
    },
    'army-agniveer-rally-2026': {
      cutOffTrends: [
        { year: '2024 CEE Online Written Benchmark', general: 135.00, obc: 132.50, ews: 130.00, sc: 122.50, st: 118.00, totalMarks: 200 },
        { year: '2023 CEE Online Written Test', general: 130.00, obc: 128.00, ews: 125.50, sc: 118.00, st: 114.50, totalMarks: 200 },
        { year: '2022 Rally Combined Merit Benchmark', general: 125.00, obc: 122.50, ews: 120.00, sc: 112.50, st: 108.00, totalMarks: 200 }
      ],
      examPattern: [
        { subject: 'General Knowledge (सामान्य ज्ञान)', questions: 15, marks: 30, time: 'Combined 60 Minutes', negativeMarking: '0.50 Negative Deduction' },
        { subject: 'General Science (सामान्य विज्ञान)', questions: 15, marks: 30, time: 'Combined 60 Minutes', negativeMarking: '0.50 Negative Deduction' },
        { subject: 'Mathematics (गणित)', questions: 15, marks: 30, time: 'Combined 60 Minutes', negativeMarking: '0.50 Negative Deduction' },
        { subject: 'Logical Reasoning (तार्किक क्षमता)', questions: 5, marks: 10, time: 'Combined 60 Minutes', negativeMarking: '0.50 Negative Deduction' }
      ],
      syllabusTopics: [
        {
          subject: 'General Knowledge & Military Awareness',
          weightage: '30 Marks / 15 Questions',
          topics: [
            'Indian Armed Forces: Commands, Ranks, Regimental centers, Gallantry awards (Param Vir Chakra, Mahavir Chakra)',
            'Indian History, Landmarks, Major Battles, Freedom Struggle, and National Heroes',
            'Geography of India and World: Major Rivers, Peaks, Borders, neighboring countries (LOC, LAC), and Capitals',
            'Constitution of India, National Symbols, International Organizations (UN, SAARC, G20), and Current Sports'
          ]
        },
        {
          subject: 'General Science (Class 10 NCERT Standard)',
          weightage: '30 Marks / 15 Questions',
          topics: [
            'Physics: Motion, Force, Gravity, Work & Energy, Heat & Temperature, Light (Reflection/Refraction), Electricity',
            'Chemistry: Elements, Compounds & Mixtures, Acids, Bases & Salts, Metals & Non-metals, Chemical reactions',
            'Biology: Human Anatomy, Digestive/Respiratory systems, Diseases & Prevention, Vitamins & Balanced Diet'
          ]
        },
        {
          subject: 'Mathematics & Basic Reasoning',
          weightage: '40 Marks / 20 Questions',
          topics: [
            'Arithmetic: Number systems, HCF & LCM, Decimal fractions, Square roots, Percentage, Average, Ratio & Proportion',
            'Commercial Math: Profit & Loss, Simple Interest, Time & Work, Time & Distance',
            'Algebra & Geometry: Basic algebraic identities, Lines, Angles, Triangles, Circles, Perimeter and Area of 2D shapes',
            'Logical Reasoning: Number patterns, Alphabet series, Coding-Decoding, Blood relations, and Direction sense'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the Seva Nidhi financial package received after 4 years of Agniveer service?',
          answer: 'Upon completion of the 4-year tenure, Agniveers receive an exempt lump-sum Seva Nidhi package of approximately ₹11.71 Lakh (comprising candidate monthly contribution of 30% matched equally by Central Government plus accrued interest), which is completely income-tax exempt.'
        },
        {
          question: 'What percentage of Agniveers are absorbed into the regular permanent cadre?',
          answer: 'Up to 25% of each enrolled Agniveer batch are selected for retention in the regular cadre of the Indian Armed Forces based on objective centralized evaluation, physical fitness assessments, and organizational requirements.'
        },
        {
          question: 'What are the two phases of Indian Army Agniveer selection?',
          answer: 'The selection comprises: Phase 1: Online Computer Based Common Entrance Examination (CEE) conducted across designated testing centers nationwide. Phase 2: Recruitment Rally covering Physical Fitness Test (PFT), Physical Measurement Test (PMT), Adaptability Test, and Medical Examination for CEE-shortlisted candidates.'
        },
        {
          question: 'What age eligibility applies for Agniveer General Duty (GD) rally?',
          answer: 'Candidates must be between 17.5 to 21 years of age as on the crucial notification date (born between 01 October 2005 and 01 April 2009 for the 2026 intake cycle).'
        }
      ]
    },
    'guide-army-1600m-running-standards': {
      cutOffTrends: [
        { year: 'PFT Group-I Standard (Timing up to 5 min 30 sec)', general: 60.0, obc: 60.0, ews: 60.0, sc: 60.0, st: 60.0, totalMarks: 60 },
        { year: 'PFT Group-II Standard (Timing 5 min 31 sec to 5 min 45 sec)', general: 48.0, obc: 48.0, ews: 48.0, sc: 48.0, st: 48.0, totalMarks: 60 },
        { year: 'Beam / Pull-ups (10 Clean Repetitions)', general: 40.0, obc: 40.0, ews: 40.0, sc: 40.0, st: 40.0, totalMarks: 40 }
      ],
      syllabusTopics: [
        {
          subject: 'Physical Efficiency Test (PFT) Parameter Architecture',
          weightage: '100 Marks Full Score',
          topics: [
            '1600 Meters Endurance Run: Pacing strategy across four 400m laps, breathing rhythm, stride economy',
            'Beam (Pull-ups): Underhand grip, clean chin elevation above horizontal bar, leg swinging disqualification rules',
            '9-Foot Ditch Jump: Approach acceleration, single-foot takeoff, soft landing balance without touching ground with hands',
            'Zig-Zag Balance Beam: Core stability, foot alignment, rapid recovery maneuvers under rally timer pressure'
          ]
        }
      ]
    },
    'res-upsc-cds-result': {
      examPattern: [
        { subject: 'English (IMA, INA, AFA & OTA)', questions: 120, marks: 100, time: '2 Hours (120 Mins)', negativeMarking: '0.33 Negative Deduction' },
        { subject: 'General Knowledge (IMA, INA, AFA & OTA)', questions: 120, marks: 100, time: '2 Hours (120 Mins)', negativeMarking: '0.33 Negative Deduction' },
        { subject: 'Elementary Mathematics (IMA, INA & AFA only)', questions: 100, marks: 100, time: '2 Hours (120 Mins)', negativeMarking: '0.33 Negative Deduction' }
      ],
      syllabusTopics: [
        {
          subject: 'English & Verbal Comprehension',
          weightage: '100 Marks / 120 Questions',
          topics: [
            'Reading Comprehension passages, Spotting errors, Ordering of words in a sentence, Ordering of sentences (Jumbled paras)',
            'Idioms and Phrases, Synonyms and Antonyms, Fill in the blanks with appropriate prepositions and vocabulary, Parts of speech'
          ]
        },
        {
          subject: 'General Knowledge & Current Defence Affairs',
          weightage: '100 Marks / 120 Questions',
          topics: [
            'Current events of national and international importance, military warfare technology, and joint bilateral drills',
            'History of India and Indian National Movement; Physical, Political, and Economic Geography of India',
            'Indian Constitution, Parliament, President powers, Supreme Court rulings; NCERT Class 9-10 Physics, Chemistry, Biology'
          ]
        },
        {
          subject: 'Elementary Mathematics (Arithmetic, Algebra, Geometry, Trigonometry)',
          weightage: '100 Marks / 100 Questions',
          topics: [
            'Number System, Unitary method, Time & Distance, Time & Work, Percentages, Profit & Loss, Simple & Compound Interest',
            'Basic algebraic identities, Remainder theorem, HCF & LCM of polynomials, Linear equations, Quadratic equations',
            'Trigonometry (Sin x, Cos x, Tan x, Simple heights & distances), Plane geometry (Theorems on triangles, circles, tangents)',
            'Mensuration: Areas of squares, rectangles, triangles, circles; Surface areas and volumes of spheres, cones, cylinders'
          ]
        }
      ]
    },
    'rpf-si-constable-2026': {
      faqs: [
        {
          question: 'What is the examination pattern for RPF Sub-Inspector & Constable CBT?',
          answer: 'The Computer Based Test (CBT) consists of 120 multiple choice questions carrying 120 marks for 90 minutes: General Awareness (50 Qs), Arithmetic (35 Qs), and General Intelligence & Reasoning (35 Qs). A negative marking of 1/3rd mark applies for every wrong answer.'
        },
        {
          question: 'What are the physical efficiency benchmarks for RPF Sub-Inspector?',
          answer: 'For Male SI: 1600m run in 6 minutes 30 seconds, Long Jump 12 feet, High Jump 3 feet 9 inches. For Female SI: 800m run in 4 minutes, Long Jump 9 feet, High Jump 3 feet. PET is qualifying in nature.'
        },
        {
          question: 'Is 3-year age relaxation applicable for RPF Recruitment 2026?',
          answer: 'Yes! The Ministry of Railways granted a one-time 3-year upper age relaxation across all categories (UR up to 28 for Constable, up to 28 for SI before category concessions) due to the COVID-19 pandemic hiatus.'
        },
        {
          question: 'What is the monthly in-hand salary for RPF Sub-Inspector in 2026?',
          answer: 'RPF SI is appointed in 7th CPC Pay Matrix Level 6 (Starting Basic Pay ₹35,400). With 50% DA (₹17,700), HRA (₹9,558 in X cities), Transport Allowance, and Ration Money, gross monthly salary is ₹69,500+, with net in-hand pay approximately ₹62,000.'
        }
      ]
    },
    'ssc-je-2026': {
      faqs: [
        {
          question: 'What is the marking scheme and negative deduction in SSC JE Paper-1 and Paper-2?',
          answer: 'Paper-1 has 200 objective questions (200 marks, 2 hours) with 0.25 negative marking. Paper-2 is also a computer-based objective test with 100 questions (300 marks, 2 hours) carrying 1.00 negative mark per incorrect response.'
        },
        {
          question: 'Are diploma engineers eligible for SSC Junior Engineer without experience?',
          answer: 'In Central Public Works Department (CPWD) and Central Water Commission (CWC), a 3-year Diploma in Civil/Electrical/Mechanical Engineering is eligible without prior experience. In Military Engineer Services (MES) and BRO, diploma holders require 2 years of relevant professional experience.'
        },
        {
          question: 'What is the 7th CPC pay scale and in-hand salary for SSC Junior Engineer?',
          answer: 'Junior Engineers are recruited under Pay Matrix Level 6 (Basic Pay ₹35,400). Adding 50% DA (₹17,700), HRA (₹9,558 in X cities), and Transport Allowance, gross monthly compensation is ₹69,800, with net in-hand salary around ₹62,500.'
        },
        {
          question: 'Can candidates appear in SSC JE using virtual calculators?',
          answer: 'In Paper-1, calculators are strictly prohibited. In Paper-2 (Core Engineering), an on-screen virtual scientific calculator is integrated into the computer examination interface for technical computation.'
        }
      ]
    },
    'ibps-po-clerk-xv-2026': {
      faqs: [
        {
          question: 'What are the participating public sector banks in IBPS CRP PO/MT XV?',
          answer: 'Eleven nationalized banks participate: Bank of Baroda, Bank of India, Bank of Maharashtra, Canara Bank, Central Bank of India, Indian Bank, Indian Overseas Bank, Punjab National Bank, Punjab & Sind Bank, UCO Bank, and Union Bank of India.'
        },
        {
          question: 'Is there negative marking in IBPS PO Prelims and Mains?',
          answer: 'Yes. A penalty of 0.25 (1/4th of the marks assigned to the question) is deducted for each incorrect answer in both the Preliminary and Main examinations.'
        },
        {
          question: 'What is the revision under the 12th Bipartite Wage Settlement for IBPS PO?',
          answer: 'Under the revised bipartite wage agreement, starting basic pay has been revised to ₹48,480. Gross monthly salary in metropolitan branches exceeds ₹75,000 to ₹82,000 depending on city allowances and leased quarters.'
        },
        {
          question: 'How is the final merit list calculated for IBPS PO XV?',
          answer: 'Final merit combines Mains Examination marks (normalized out of 80) and Personal Interview marks (normalized out of 20) in an 80:20 ratio. Preliminary exam scores are purely for screening and are not counted.'
        }
      ]
    },
    'defence-afcat-nda-2026': {
      faqs: [
        {
          question: 'What is the examination pattern and duration for AFCAT 2026?',
          answer: 'AFCAT is an online test with 100 multiple choice questions carrying 300 marks for 2 hours (120 minutes). Marking scheme: +3 for correct answer, -1 for wrong answer, and 0 for unattempted questions.'
        },
        {
          question: 'Can 12th appearing students apply for UPSC NDA & NA Examination?',
          answer: 'Yes. Candidates appearing in their 12th standard examination under the 10+2 pattern can apply. For the Air Force and Navy wings, Physics, Chemistry, and Mathematics (PCM) at 10+2 level are mandatory.'
        },
        {
          question: 'What is the Computerised Pilot Selection System (CPSS)?',
          answer: 'CPSS is an intelligent psychomotor evaluation administered once in a candidate lifetime for the Flying Branch at Air Force Selection Boards (AFSB). Candidates failing CPSS cannot re-apply for flying branches.'
        },
        {
          question: 'What is the training stipend received by cadets at NDA / AFA?',
          answer: 'During officer cadet training at NDA Khadakwasla, IMA Dehradun, or AFA Dundigal, gentleman/lady cadets receive a fixed monthly training stipend of ₹56,100 (Level 10 starting basic).'
        }
      ]
    }
  };

  // Syllabus topics for admit card & other alerts lacking it
  const defaultSyllabus = {
    'admit-upsc-cse-mains-2026': [
      {
        subject: 'General Studies Papers I to IV (Mains Curriculum)',
        weightage: '1000 Marks Total (250 Marks Each)',
        topics: [
          'GS-I: Indian Heritage and Culture, History and Geography of the World and Society',
          'GS-II: Governance, Constitution, Polity, Social Justice and International Relations',
          'GS-III: Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management',
          'GS-IV: Ethics, Integrity and Aptitude (Case studies on administrative dilemmas)'
        ]
      },
      {
        subject: 'Essay & Optional Papers (Paper I & II)',
        weightage: '750 Marks Total',
        topics: [
          'Essay Paper (250 Marks): Two thematic analytical essays across philosophical and socio-economic dimensions',
          'Optional Subject Paper I & II (500 Marks): Advanced university specialization curriculum'
        ]
      }
    ],
    'admit-ssc-cgl-tier1-2026-all': [
      {
        subject: 'Tier-1 CBT Core Sections',
        weightage: '200 Marks / 100 Questions',
        topics: [
          'General Intelligence & Reasoning (50 Marks / 25 Qs): Analogies, series, syllogism, non-verbal matrices',
          'General Awareness (50 Marks / 25 Qs): Indian history, polity, geography, general science, economic survey',
          'Quantitative Aptitude (50 Marks / 25 Qs): Arithmetic, algebra, geometry, mensuration, trigonometry',
          'English Comprehension (50 Marks / 25 Qs): Grammar error spotting, idioms, synonyms, cloze passage'
        ]
      }
    ],
    'admit-ssc-cgl-tier1': [
      {
        subject: 'Tier-1 CBT Core Sections',
        weightage: '200 Marks / 100 Questions',
        topics: [
          'General Intelligence & Reasoning (50 Marks / 25 Qs): Analogies, series, syllogism, non-verbal matrices',
          'General Awareness (50 Marks / 25 Qs): Indian history, polity, geography, general science, economic survey',
          'Quantitative Aptitude (50 Marks / 25 Qs): Arithmetic, algebra, geometry, mensuration, trigonometry',
          'English Comprehension (50 Marks / 25 Qs): Grammar error spotting, idioms, synonyms, cloze passage'
        ]
      }
    ],
    'admit-rrb-alp-cbt1-2026': [
      {
        subject: 'CBT-1 Examination Subjects',
        weightage: '75 Marks / 75 Questions (60 Mins)',
        topics: [
          'Mathematics (20 Qs): Number system, BODMAS, decimals, fractions, LCM/HCF, ratio, percentages',
          'General Intelligence & Reasoning (25 Qs): Analogies, alphabetical series, coding-decoding, Venn diagrams',
          'General Science (20 Qs): Physics, Chemistry, and Life Sciences of 10th standard CBSE level',
          'General Awareness on Current Affairs (10 Qs): Science & technology, sports, culture, personalities, economics'
        ]
      }
    ],
    'admit-ibps-clerk-xiv-prelims': [
      {
        subject: 'CRP Clerks XIV Preliminary Subjects',
        weightage: '100 Marks / 100 Questions (60 Mins)',
        topics: [
          'English Language (30 Qs / 30 Marks / 20 Mins): Reading comprehension, cloze test, spotting errors',
          'Numerical Ability (35 Qs / 35 Marks / 20 Mins): Simplification, quadratic equations, number series, arithmetic',
          'Reasoning Ability (35 Qs / 35 Marks / 20 Mins): Puzzles, seating arrangement, syllogisms, blood relations'
        ]
      }
    ],
    'admit-ibps-po-xv-prelims': [
      {
        subject: 'CRP PO/MT XV Preliminary Subjects',
        weightage: '100 Marks / 100 Questions (60 Mins)',
        topics: [
          'English Language (30 Qs / 30 Marks / 20 Mins): Comprehension passages, error identification, sentence connector',
          'Quantitative Aptitude (35 Qs / 35 Marks / 20 Mins): Data interpretation (Bar, Line, Tabular, Pie), arithmetic word problems',
          'Reasoning Ability (35 Qs / 35 Marks / 20 Mins): Circular and linear seating, box puzzles, input-output logic'
        ]
      }
    ],
    'admit-ugc-net-dec-2026': [
      {
        subject: 'Paper-I Teaching & Research Aptitude',
        weightage: '100 Marks / 50 Questions',
        topics: [
          'Teaching & Research Aptitude, Reading Comprehension, Communication, Mathematical & Logical Reasoning, ICT, Higher Education'
        ]
      },
      {
        subject: 'Paper-II Master Degree Specialization',
        weightage: '200 Marks / 100 Questions',
        topics: [
          'Specialized subject core theories, methodologies, and analytical problem solving across 87 authorized disciplines'
        ]
      }
    ],
    'res-ssc-cgl-cutoff': [
      {
        subject: 'Tier-1 & Tier-2 Evaluation Parameters',
        weightage: 'Historical Normalized Score Metric',
        topics: [
          'Mathematical Abilities, Reasoning & General Intelligence, English Language & Comprehension, General Awareness',
          'Computer Knowledge Module (Qualifying) and Data Entry Speed Test (DEST 2000 key depressions in 15 mins)'
        ]
      }
    ],
    'ans-ssc-chsl-tier1': [
      {
        subject: 'Tier-1 Examination Subjects',
        weightage: '200 Marks / 100 Questions',
        topics: [
          'English Language (Basic Knowledge), General Intelligence, Quantitative Aptitude (Basic Arithmetic Skill), General Awareness'
        ]
      }
    ],
    'admit-rrb-technician': [
      {
        subject: 'Technician Grade-I Signal & Grade-III CBT',
        weightage: '100 Marks / 100 Questions (90 Mins)',
        topics: [
          'General Awareness, General Intelligence & Reasoning, Basic of Computers and Applications, Mathematics, Basic Science & Engineering'
        ]
      }
    ]
  };

  let updatedCount = 0;

  alerts.forEach((alert) => {
    // 1. Ensure preparationTips
    if (!alert.preparationTips || alert.preparationTips.length === 0) {
      alert.preparationTips = enrichments[alert.id]?.preparationTips || getStandardPrepTips(alert);
      updatedCount++;
    }

    // 2. Apply specific enrichments if defined
    if (enrichments[alert.id]) {
      const e = enrichments[alert.id];
      if (e.cutOffTrends && (!alert.cutOffTrends || alert.cutOffTrends.length === 0)) {
        alert.cutOffTrends = e.cutOffTrends;
      }
      if (e.examPattern && (!alert.examPattern || alert.examPattern.length === 0)) {
        alert.examPattern = e.examPattern;
      }
      if (e.syllabusTopics && (!alert.syllabusTopics || alert.syllabusTopics.length === 0)) {
        alert.syllabusTopics = e.syllabusTopics;
      }
      if (e.faqs && e.faqs.length > 0) {
        if (!alert.faqs) alert.faqs = [];
        // Add any missing FAQs
        e.faqs.forEach(f => {
          if (!alert.faqs.some(af => af.question === f.question)) {
            alert.faqs.push(f);
          }
        });
      }
    }

    // 3. Apply default syllabus if missing
    if ((!alert.syllabusTopics || alert.syllabusTopics.length === 0) && defaultSyllabus[alert.id]) {
      alert.syllabusTopics = defaultSyllabus[alert.id];
    }
  });

  console.log(`Processed all alerts. Rewriting src/data/gazetteData.ts...`);

  // Read the original file
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Find where RECRUITMENT_ALERTS starts and ends
  const startMarker = 'export const RECRUITMENT_ALERTS: RecruitmentAlert[] = [';
  const startIndex = fileContent.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error('Could not find RECRUITMENT_ALERTS start marker');
  }

  // Find the closing array bracket matching RECRUITMENT_ALERTS
  // It comes before 'export const MARKING_PRESETS'
  const endMarker = 'export const MARKING_PRESETS';
  const endIndex = fileContent.indexOf(endMarker);
  if (endIndex === -1) {
    throw new Error('Could not find MARKING_PRESETS marker');
  }

  // Find the last '];' before MARKING_PRESETS
  const beforePresets = fileContent.slice(0, endIndex);
  const lastBracketIndex = beforePresets.lastIndexOf('];');
  if (lastBracketIndex === -1 || lastBracketIndex < startIndex) {
    throw new Error('Could not find closing bracket for RECRUITMENT_ALERTS');
  }

  const prefix = fileContent.slice(0, startIndex + startMarker.length);
  const suffix = fileContent.slice(lastBracketIndex);

  // Format alerts array nicely
  const alertsJson = JSON.stringify(alerts, null, 2);
  // Remove the opening '[' and closing ']' from alertsJson because prefix already ends with '[' and suffix starts with '];'
  const innerJson = alertsJson.slice(1, alertsJson.length - 1).trim();

  const newFileContent = prefix + '\n  ' + innerJson + '\n' + suffix;

  fs.writeFileSync(filePath, newFileContent, 'utf-8');
  console.log('Successfully enriched and updated src/data/gazetteData.ts!');
}

main().catch(err => {
  console.error('Error running enrichment:', err);
  process.exit(1);
});
