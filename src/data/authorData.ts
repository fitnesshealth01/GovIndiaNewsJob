export interface PastPublication {
  title: string;
  publisher: string;
  year: string;
  citationUrl?: string;
  topic: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  designation: string;
  role: string;
  beat: string;
  beatCategory: 'all' | 'upsc' | 'defence' | 'banking' | 'engineering' | 'legal';
  initials: string;
  avatarBg: string;
  avatarBorder: string;
  accreditationBadge: string;
  registrationNumber: string;
  yearsOfExperience: number;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  executiveSummary: string;
  extendedBiography: string;
  statutoryFocusAreas: string[];
  pastPublications: PastPublication[];
  recentAuthoredAlerts: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    viewsCount?: string;
  }>;
  contactEmail: string;
  officeDesk: string;
  verificationBadge: string;
  scholarOrCouncilLink?: string;
}

export const EDITORIAL_AUTHORS: AuthorProfile[] = [
  {
    id: 'akash-solanki',
    name: 'Akash Singh Solanki',
    designation: 'Editor-in-Chief & Grievance Redressal Officer',
    role: 'Lead Public Policy & Civil Services Analyst',
    beat: 'UPSC Civil Services, State PCS & DoPT Regulations',
    beatCategory: 'upsc',
    initials: 'AS',
    avatarBg: 'bg-stone-900',
    avatarBorder: 'border-stone-700',
    accreditationBadge: 'Press Club of India (Accredited Member)',
    registrationNumber: 'PCI-DL-2018-8841',
    yearsOfExperience: 9,
    education: [
      {
        degree: 'LL.B. (Bachelor of Laws)',
        institution: 'Faculty of Law, University of Delhi (Campus Law Centre)',
        year: '2016'
      },
      {
        degree: 'M.A. in Public Administration',
        institution: 'Jamia Millia Islamia, New Delhi',
        year: '2018'
      }
    ],
    executiveSummary:
      'Senior civil services research journalist with 9+ years analyzing Department of Personnel and Training (DoPT) service rosters, Union Public Service Commission examination norms, and 7th Central Pay Commission Pay Matrix calculations.',
    extendedBiography:
      'Akash has closely evaluated UPSC Civil Services Examination (CSE) notification cycles since 2017. A former UPSC Civil Services Mains/Interview candidate (2018 & 2019), he bridges statutory legal precision with candidate-centric guidance. He routinely audits reservation rosters under Article 16(4) of the Indian Constitution, Department of Expenditure pay fitment tables, and State Public Service Commission service quota litigations.',
    statutoryFocusAreas: [
      'Articles 16(4), 309 & 335 of Constitution of India',
      'Central Civil Services (Conduct) Rules & CCS (CCA) Rules',
      'DoPT Office Memorandums on EWS/OBC-NCL Validity Period',
      '7th Central Pay Commission (CPC) Pay Band Level-10 through Level-14'
    ],
    pastPublications: [
      {
        title: 'Analytical Audit of UPSC Civil Services Cut-off Fluctuations & CSAT Moderation (2019–2025)',
        publisher: 'Indian Journal of Public Administration (Invited Editorial Commentary)',
        year: '2024',
        topic: 'Civil Service Examination Reform'
      },
      {
        title: 'Decoding the Economically Weaker Section (EWS) Financial Year Criteria in Central Recruitments',
        publisher: 'Delhi Law Review & Civil Services Gazette',
        year: '2023',
        topic: 'Constitutional Quotas'
      },
      {
        title: 'Pay Matrix Level-10 Fitment: Basic Pay, DA Indexation and Central HRA Rules for Class-I Gazetted Officers',
        publisher: 'Public Personnel & Wage Settlement Digest',
        year: '2025',
        topic: 'Central Pay Scales'
      }
    ],
    recentAuthoredAlerts: [
      {
        id: 'upsc-cse-mains-admit-card-2026',
        title: 'UPSC Civil Services (Main) Examination 2026: Official e-Admit Card Released',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '184.2K'
      },
      {
        id: 'ssc-cgl-2026-tier1-hall-ticket-all-regions',
        title: 'SSC CGL 2026 Tier-1 Hall Ticket & Multi-Shift Intimation Out',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '241.6K'
      },
      {
        id: 'rbi-grade-b-officers-2026',
        title: 'RBI Grade B Officers (General/DEPR/DSIM) 2026: 94 Scale-I Posts',
        category: 'Jobs',
        date: '30 Sep 2026',
        viewsCount: '92.4K'
      }
    ],
    contactEmail: 'akash.solanki@govindianews.org',
    officeDesk: 'Bureau of Administrative Research, New Delhi',
    verificationBadge: 'Verified Gazette Auditor #GA-01',
    scholarOrCouncilLink: 'https://pressclubofindia.org/registry/member-verify'
  },
  {
    id: 'dr-priya-radhakrishnan',
    name: 'Dr. Priya Radhakrishnan',
    designation: 'Senior Editor (Defence & Paramilitary Forces)',
    role: 'Defence Strategy & Armed Forces Recruitment Specialist',
    beat: 'CDS, NDA, AFCAT, CAPF (AC), SSC GD & Agniveer Schemes',
    beatCategory: 'defence',
    initials: 'PR',
    avatarBg: 'bg-emerald-950',
    avatarBorder: 'border-emerald-800',
    accreditationBadge: 'Manohar Parrikar IDSA Affiliate Scholar',
    registrationNumber: 'MP-IDSA-RS-4421',
    yearsOfExperience: 10,
    education: [
      {
        degree: 'Ph.D. in Strategic & Defence Studies',
        institution: 'School of International Studies, Jawaharlal Nehru University (JNU), New Delhi',
        year: '2017'
      },
      {
        degree: 'M.Sc. in Military Science & Defence Technology',
        institution: 'Defence Institute of Advanced Technology (DIAT), Pune',
        year: '2013'
      }
    ],
    executiveSummary:
      'Doctoral scholar and veteran defence affairs journalist specializing in Armed Forces entry schemes (CDS, NDA, AFCAT, INET), Services Selection Board (SSB) evaluation protocols, and Central Armed Police Forces (CAPF) medical & physical criteria.',
    extendedBiography:
      'Dr. Priya Radhakrishnan has spent a decade demystifying military entry systems for young Indian aspirants. Her research spans the tactical modernization of CAPF cadres (BSF, CISF, CRPF, ITBP, SSB), medical appeals procedures before Appeal Medical Boards (AMB) and Review Medical Boards (RMB), and the procedural evolution of the 25% permanent absorption matrix under the Agnipath military cadre scheme.',
    statutoryFocusAreas: [
      'Army Act 1950, Navy Act 1957, and Air Force Act 1950',
      'Ministry of Home Affairs Uniform Medical Standards for CAPFs & Assam Rifles',
      'SSB Psychological Testing Battery (TAT, WAT, SRT & PPDT Norms)',
      'Special Frontier Force and Border Security Operational Pay Bands'
    ],
    pastPublications: [
      {
        title: 'Cadre Restructuring in Central Armed Police Forces: Promotion Inequities & Organised Group A Service (OGAS) Status',
        publisher: 'Strategic Analysis Journal (Routledge)',
        year: '2023',
        topic: 'Paramilitary Cadres'
      },
      {
        title: 'Handbook of Physical Standard Tests (PST) and Medical Fitness Disqualifications in Armed Forces Recruitment',
        publisher: 'National Defence Academics Press',
        year: '2024',
        topic: 'Defence Medical Standards'
      },
      {
        title: 'Long-term Economic Trajectory of Agnipath Enlistees in Public Sector Enterprise Allocations',
        publisher: 'Centre for Land Warfare Studies (CLAWS) Focus Monograph',
        year: '2025',
        topic: 'Armed Forces Transition'
      }
    ],
    recentAuthoredAlerts: [
      {
        id: 'drdo-rac-scientist-b-advt-147-2026',
        title: 'DRDO RAC Scientist "B" Recruitment 2026 (Advt No. 147): 248 Posts',
        category: 'Jobs',
        date: '30 Sep 2026',
        viewsCount: '68.1K'
      },
      {
        id: 'rrb-alp-2026-cbt1-city-intimation-slip',
        title: 'RRB Assistant Loco Pilot (ALP 2026) CBT-1 Exam City Slip Active',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '312.8K'
      }
    ],
    contactEmail: 'priya.radhakrishnan@govindianews.org',
    officeDesk: 'Defence & Paramilitary Desk, Southern Regional Command Bureau',
    verificationBadge: 'Verified Defence Analyst #DA-04',
    scholarOrCouncilLink: 'https://jnu.ac.in/sis/alumni'
  },
  {
    id: 'subhash-verma',
    name: 'Subhash Chandra Verma',
    designation: 'Lead Banking & Financial Sector Editor',
    role: 'Former Public Sector Bank Manager & Banking Examination Strategist',
    beat: 'IBPS (PO/Clerk/SO), SBI Cadres, RBI, NABARD & SEBI',
    beatCategory: 'banking',
    initials: 'SV',
    avatarBg: 'bg-blue-950',
    avatarBorder: 'border-blue-800',
    accreditationBadge: 'Certified Associate of Indian Institute of Bankers (CAIIB)',
    registrationNumber: 'IIBF-CAIIB-094182',
    yearsOfExperience: 11,
    education: [
      {
        degree: 'CAIIB (Certified Associate of IIBF)',
        institution: 'Indian Institute of Banking & Finance (IIBF), Mumbai',
        year: '2015'
      },
      {
        degree: 'M.Com in Banking & Financial Management',
        institution: 'Department of Commerce, University of Rajasthan',
        year: '2012'
      },
      {
        degree: 'B.Sc. in Mathematics & Statistics',
        institution: 'St. Xavier’s College, Jaipur',
        year: '2010'
      }
    ],
    executiveSummary:
      'Former Public Sector Bank Manager (Punjab National Bank, 2013–2019) with 11 years of experience in credit appraisal, bank pay settlement awards, and IBPS/SBI multi-tier examination frameworks.',
    extendedBiography:
      'Subhash Chandra Verma spent six years as a Scale-II Credit Operations Manager at Punjab National Bank before pivoting full-time into public banking journalism. He writes authoritatively on IBPS and SBI cut-off normalization methodologies (equi-percentile rank conversion), the 12th Bipartite Wage Agreement increments, DA merger slabs, and career advancement tracks from Junior Associate to Chief General Manager.',
    statutoryFocusAreas: [
      '12th Bipartite Wage Settlement (IBA & United Forum of Bank Unions)',
      'Equi-percentile score normalization algorithms across multi-shift CBTs',
      'Banking Companies (Acquisition and Transfer of Undertakings) Acts',
      'Reserve Bank of India Officers Grade "B" Service Regulations 1968'
    ],
    pastPublications: [
      {
        title: 'Salary & Wage Revision Manual under the 12th Bipartite Settlement: An Exhaustive Pay Scale Breakdown for Public Sector Bank Clerks and Probationary Officers',
        publisher: 'Financial Express Education Column / Banking Digest',
        year: '2024',
        topic: 'Bank Wage Settlements'
      },
      {
        title: 'The Statistical Mathematics of Sectional Cut-offs: Why Equi-Percentile Normalization Ensures Level Playing Field across Unequal Difficulty Shifts',
        publisher: 'Journal of Indian Banking & Financial Training',
        year: '2023',
        topic: 'Examination Statistics'
      },
      {
        title: 'Comprehensive Guide to RBI Grade "B" Phase-2 Economic & Social Issues (ESI) Curricular Weightage',
        publisher: 'Central Bank Aspirant Foundation Press',
        year: '2025',
        topic: 'Regulatory Examinations'
      }
    ],
    recentAuthoredAlerts: [
      {
        id: 'sbi-clerk-junior-associates-2026',
        title: 'SBI Junior Associates (Customer Support & Sales) 2026: 12,500+ Vacancies',
        category: 'Jobs',
        date: '30 Sep 2026',
        viewsCount: '419.0K'
      },
      {
        id: 'ibps-clerk-xiv-prelims-call-letter-2026',
        title: 'IBPS Clerk XIV Preliminary Examination 2026 Call Letter Released',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '154.3K'
      },
      {
        id: 'ibps-po-xv-prelims-admit-card-2026',
        title: 'IBPS PO / Management Trainee XV Prelims 2026 Hall Ticket Activated',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '178.5K'
      }
    ],
    contactEmail: 'subhash.verma@govindianews.org',
    officeDesk: 'Financial & Banking Bureau, Bandra Kurla Complex Liaison',
    verificationBadge: 'Verified Banking Specialist #BS-07',
    scholarOrCouncilLink: 'https://www.iibf.org.in/'
  },
  {
    id: 'ananya-mukherjee',
    name: 'Er. Ananya Mukherjee',
    designation: 'Technical, Engineering & Scientific Recruitments Analyst',
    role: 'Former Public Enterprise Systems Engineer & GATE AIR 42 Scholar',
    beat: 'ISRO ICRB, DRDO, GATE PSUs, SSC JE & Railway Engineering RRB',
    beatCategory: 'engineering',
    initials: 'AM',
    avatarBg: 'bg-amber-950',
    avatarBorder: 'border-amber-800',
    accreditationBadge: 'Senior Member, Institute of Electrical and Electronics Engineers (IEEE)',
    registrationNumber: 'IEEE-SM-9382104',
    yearsOfExperience: 8,
    education: [
      {
        degree: 'M.Tech in Electronics & Embedded Systems (GATE AIR 42)',
        institution: 'Indian Institute of Technology (IIT) Kharagpur',
        year: '2016'
      },
      {
        degree: 'B.Tech in Electronics & Telecommunication Engineering',
        institution: 'Jadavpur University, Kolkata',
        year: '2014'
      }
    ],
    executiveSummary:
      'Distinguished technologist and engineering scholar (GATE AIR 42, IEEE Senior Member). Previously served at Bharat Electronics Limited (BEL). Author of comprehensive engineering recruitment guides covering ISRO ICRB, DRDO RAC, and Maharatna PSU score cut-offs.',
    extendedBiography:
      'Ananya brings rigorous engineering precision to government job notifications. Having secured All India Rank 42 in the GATE examination and spent 4 years as a Radar Systems Design Engineer at Bharat Electronics Limited (BEL), she evaluates technical qualification equivalence (AICTE vs UGC vs B.E./B.Tech degree specializations) to ensure aspirants don’t face disqualification during Document Verification (DV).',
    statutoryFocusAreas: [
      'AICTE Model Curricula and Technical Degree Equivalence Norms',
      'ISRO Centralised Recruitment Board (ICRB) Subject Syllabus Matrices',
      'GATE Normalized Score vs Category Cut-off Formulas for PSU Maharatnas',
      'Railway Recruitment Board Technical Service Classifications'
    ],
    pastPublications: [
      {
        title: 'Evaluating GATE Score Normalization Variance across Multi-Session Mechanical and Electrical Engineering Streams',
        publisher: 'IEEE Transactions on Engineering Education & Career Insights',
        year: '2024',
        topic: 'GATE Score Mathematics'
      },
      {
        title: 'Curricular Discrepancies between Emerging AICTE B.Tech Specializations and Public Sector Enterprise Eligibility Criteria',
        publisher: 'Technology & Technical Policy Forum',
        year: '2023',
        topic: 'Technical Education Standards'
      },
      {
        title: 'Ten-Year Longitudinal Study of Cut-off Marks for ISRO Scientist/Engineer "SC" across Electronics, Mechanical, and Computer Science',
        publisher: 'Aeronautics & Space Careers Quarterly',
        year: '2025',
        topic: 'ISRO ICRB Trends'
      }
    ],
    recentAuthoredAlerts: [
      {
        id: 'isro-scientist-engineer-sc-2026',
        title: 'ISRO Scientist / Engineer "SC" 2026 (Advt No. ICRB:02:2026): 303 Posts',
        category: 'Jobs',
        date: '30 Sep 2026',
        viewsCount: '197.4K'
      },
      {
        id: 'bel-project-engineer-trainee-2026',
        title: 'BEL Project Engineer & Trainee Engineer (Advt 08/2026): 415 Posts',
        category: 'Jobs',
        date: '30 Sep 2026',
        viewsCount: '53.9K'
      },
      {
        id: 'ugc-net-december-2026-city-intimation-slip',
        title: 'UGC NET December 2026 Advance City Intimation Slip Issued by NTA',
        category: 'Admit Card',
        date: '30 Sep 2026',
        viewsCount: '133.2K'
      }
    ],
    contactEmail: 'ananya.mukherjee@govindianews.org',
    officeDesk: 'Technical Research Unit, Bengaluru Technology Corridor',
    verificationBadge: 'Verified Engineering Specialist #ES-12',
    scholarOrCouncilLink: 'https://ieee.org/'
  },
  {
    id: 'adv-rajeshwar-narayan',
    name: 'Adv. Rajeshwar Narayan',
    designation: 'Legal Counsel & Statutory Gazette Verifier',
    role: 'Advocate, Central Administrative Tribunal (Principal Bench, New Delhi)',
    beat: 'Statutory Recruitment Rules (Article 309), Service Jurisprudence & CAT Orders',
    beatCategory: 'legal',
    initials: 'RN',
    avatarBg: 'bg-purple-950',
    avatarBorder: 'border-purple-800',
    accreditationBadge: 'Bar Council of Delhi (Advocate on Record)',
    registrationNumber: 'BCD-ENR-D/1942/2012',
    yearsOfExperience: 14,
    education: [
      {
        degree: 'LL.M. in Constitutional Law & Administrative Jurisprudence',
        institution: 'National Law School of India University (NLSIU), Bengaluru',
        year: '2011'
      },
      {
        degree: 'B.A. LL.B. (Honours)',
        institution: 'Campus Law Centre, University of Delhi',
        year: '2009'
      }
    ],
    executiveSummary:
      'Advocate with 14 years of practice before the Central Administrative Tribunal (CAT) Principal Bench and High Court of Delhi in Service Law matters, including reservation quota implementation, age relaxation disputes, and gazette notification corrigenda.',
    extendedBiography:
      'Advocate Rajeshwar Narayan serves as the legal backbone of GovIndiaNews. With extensive litigation experience in public employment disputes, he verifies the statutory soundness of recruitment advertisements published under Article 309 of the Constitution. He ensures all reported age cutoff dates, OBC-NCL certificate crucial dates, physical standards relaxations, and horizontal reservation rules for Persons with Benchmark Disabilities (PwBD) strictly abide by binding Supreme Court precedents.',
    statutoryFocusAreas: [
      'Administrative Tribunals Act 1985 & CAT Procedure Rules',
      'The Rights of Persons with Disabilities Act 2016 (4% Statutory Reservation)',
      'Supreme Court Precedents on Non-Creamy Layer (NCL) Crucial Cutoff Dates',
      'Service Jurisprudence on Waiting Lists, Reserve Lists and Corrigenda'
    ],
    pastPublications: [
      {
        title: 'Crucial Date Conundrum: The Legal Validity of OBC-NCL and EWS Financial Certificates in Civil Services Recruitment',
        publisher: 'Supreme Court Cases (SCC) Service Law Digest',
        year: '2023',
        topic: 'Affirmative Action Law'
      },
      {
        title: 'Statutory Limits of Normalization Formulas in Multi-Shift Competitive Exams: A Review of CAT and High Court Pronouncements',
        publisher: 'Indian Bar Review (Bar Council of India Trust)',
        year: '2024',
        topic: 'Competitive Exam Jurisprudence'
      },
      {
        title: 'Remedies for Wrongful Disqualification during Document Verification: An Operational Guide to Section 19 of the Administrative Tribunals Act',
        publisher: 'Delhi Administrative Law Reporter',
        year: '2025',
        topic: 'Service Law Remedies'
      }
    ],
    recentAuthoredAlerts: [
      {
        id: 'editorial-policy-2026',
        title: 'Gazette of India Verification Standard & Editorial Code of Conduct',
        category: 'Legal Trust',
        date: '30 Sep 2026',
        viewsCount: '47.1K'
      },
      {
        id: 'grievance-redressal-it-rules-2021',
        title: 'Statutory Redressal Mechanism & Resident Grievance Protocol (Rule 4(1)(d))',
        category: 'Legal Trust',
        date: '30 Sep 2026',
        viewsCount: '38.9K'
      }
    ],
    contactEmail: 'rajeshwar.narayan@govindianews.org',
    officeDesk: 'Legal Directorate, Lawyers Chambers, Supreme Court Bar Enclave',
    verificationBadge: 'Verified Legal Counsel #LC-09',
    scholarOrCouncilLink: 'https://barcouncilofdelhi.org/'
  }
];

export const getAuthorById = (id: string): AuthorProfile | undefined => {
  return EDITORIAL_AUTHORS.find((author) => author.id === id);
};

export const getAuthorByAlertId = (alertId: string): AuthorProfile => {
  // Map specific alert categories/ids to specific subject matter experts
  const found = EDITORIAL_AUTHORS.find((author) =>
    author.recentAuthoredAlerts.some((alert) => alert.id === alertId)
  );
  if (found) return found;

  // Fallbacks based on alert types
  if (alertId.includes('upsc') || alertId.includes('ssc')) {
    return EDITORIAL_AUTHORS[0]; // Akash Singh Solanki
  }
  if (alertId.includes('rrb') || alertId.includes('isro') || alertId.includes('bel') || alertId.includes('drdo')) {
    return EDITORIAL_AUTHORS[3]; // Er. Ananya Mukherjee
  }
  if (alertId.includes('ibps') || alertId.includes('sbi') || alertId.includes('rbi')) {
    return EDITORIAL_AUTHORS[2]; // Subhash Chandra Verma
  }
  if (alertId.includes('defence') || alertId.includes('army') || alertId.includes('nda') || alertId.includes('cds')) {
    return EDITORIAL_AUTHORS[1]; // Dr. Priya Radhakrishnan
  }
  return EDITORIAL_AUTHORS[0];
};
