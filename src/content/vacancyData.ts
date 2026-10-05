export interface VacancyRecord {
  id: string;
  examName: string;
  conductingBody: string;
  year: number;
  vacancies: number;
  sourceTitle: string;
  sourceUrl: string;
  categoryBreakdown?: {
    ur?: number;
    obc?: number;
    sc?: number;
    st?: number;
    ews?: number;
  };
  notes: string;
}

export const VACANCY_HISTORY: VacancyRecord[] = [
  // SSC CGL
  { id: 'cgl-2026', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2026, vacancies: 14582, sourceTitle: 'SSC CGL 2026 Official Gazette Notification', sourceUrl: 'https://ssc.gov.in', notes: 'Tentative vacancies across Group B and C cadres' },
  { id: 'cgl-2025', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2025, vacancies: 17727, sourceTitle: 'SSC Annual Report 2024-25', sourceUrl: 'https://ssc.gov.in', notes: 'Final allocated vacancies post-departmental requisition' },
  { id: 'cgl-2024', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2024, vacancies: 8415, sourceTitle: 'SSC Final Vacancies Notice', sourceUrl: 'https://ssc.gov.in', notes: 'Revised vacancies published by SSC' },
  { id: 'cgl-2023', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2023, vacancies: 8440, sourceTitle: 'SSC CGL 2023 Final Result Notification', sourceUrl: 'https://ssc.gov.in', notes: 'Final appointment count' },
  { id: 'cgl-2022', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2022, vacancies: 36001, sourceTitle: 'SSC Mega Recruitment Drive Notification', sourceUrl: 'https://ssc.gov.in', notes: 'Special recruitment drive including Postal Assistants' },
  { id: 'cgl-2021', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2021, vacancies: 7686, sourceTitle: 'SSC Annual Report 2021', sourceUrl: 'https://ssc.gov.in', notes: 'Regular annual recruitment cycle' },
  { id: 'cgl-2020', examName: 'SSC CGL', conductingBody: 'Staff Selection Commission', year: 2020, vacancies: 7035, sourceTitle: 'SSC CGL 2020 Official Notice', sourceUrl: 'https://ssc.gov.in', notes: 'Standard Group B & C vacancies' },

  // SSC CHSL
  { id: 'chsl-2026', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2026, vacancies: 3712, sourceTitle: 'SSC CHSL 2026 Notification', sourceUrl: 'https://ssc.gov.in', notes: 'LDC, JSA and DEO posts' },
  { id: 'chsl-2025', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2025, vacancies: 4500, sourceTitle: 'SSC CHSL 2024-25 Tentative Vacancy Chart', sourceUrl: 'https://ssc.gov.in', notes: 'Clerical vacancies across ministries' },
  { id: 'chsl-2024', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2024, vacancies: 3712, sourceTitle: 'SSC Final Vacancy Notice', sourceUrl: 'https://ssc.gov.in', notes: 'Allocated clerical vacancies' },
  { id: 'chsl-2023', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2023, vacancies: 1600, sourceTitle: 'SSC Annual Report 2023', sourceUrl: 'https://ssc.gov.in', notes: 'Standard ministerial intake' },
  { id: 'chsl-2022', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2022, vacancies: 4522, sourceTitle: 'SSC CHSL 2022 Notice', sourceUrl: 'https://ssc.gov.in', notes: 'Postings in central ministries' },
  { id: 'chsl-2021', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2021, vacancies: 6013, sourceTitle: 'SSC Annual Report 2021-22', sourceUrl: 'https://ssc.gov.in', notes: 'Final vacancies certified' },
  { id: 'chsl-2020', examName: 'SSC CHSL', conductingBody: 'Staff Selection Commission', year: 2020, vacancies: 4726, sourceTitle: 'SSC CHSL 2020 Final Allocation', sourceUrl: 'https://ssc.gov.in', notes: 'Pre-bifurcation cycle' },

  // UPSC CSE
  { id: 'cse-2026', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2026, vacancies: 1056, sourceTitle: 'UPSC CSE 2026 Notification', sourceUrl: 'https://upsc.gov.in', notes: 'IAS (180), IPS (200), IFS (55), Central Services Group A' },
  { id: 'cse-2025', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2025, vacancies: 1206, sourceTitle: 'UPSC CSE 2024-25 Notification', sourceUrl: 'https://upsc.gov.in', notes: 'Highest UPSC intake in recent decade' },
  { id: 'cse-2024', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2024, vacancies: 1105, sourceTitle: 'UPSC Annual Report 2023-24', sourceUrl: 'https://upsc.gov.in', notes: 'Civil Services Examination final intake' },
  { id: 'cse-2023', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2023, vacancies: 1022, sourceTitle: 'UPSC CSE 2023 Official Gazette', sourceUrl: 'https://upsc.gov.in', notes: 'All India & Central Services' },
  { id: 'cse-2022', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2022, vacancies: 1011, sourceTitle: 'UPSC CSE 2022 Notice', sourceUrl: 'https://upsc.gov.in', notes: 'Includes IRMS cadre allocation' },
  { id: 'cse-2021', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2021, vacancies: 712, sourceTitle: 'UPSC Annual Report 2021', sourceUrl: 'https://upsc.gov.in', notes: 'Pandemic adjustment cycle' },
  { id: 'cse-2020', examName: 'UPSC CSE', conductingBody: 'Union Public Service Commission', year: 2020, vacancies: 796, sourceTitle: 'UPSC CSE 2020 Final Report', sourceUrl: 'https://upsc.gov.in', notes: 'Final recommended candidates' },

  // IBPS PO
  { id: 'ibps-po-2026', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2026, vacancies: 3955, sourceTitle: 'IBPS CRP PO/MT XIV Notification', sourceUrl: 'https://www.ibps.in', notes: 'Initial participating bank requisitions' },
  { id: 'ibps-po-2025', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2025, vacancies: 4458, sourceTitle: 'IBPS PO XIII Final Allotment', sourceUrl: 'https://www.ibps.in', notes: 'Combined allotment across 11 nationalized banks' },
  { id: 'ibps-po-2024', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2024, vacancies: 5314, sourceTitle: 'IBPS Final Vacancy Chart', sourceUrl: 'https://www.ibps.in', notes: 'Revised vacancies post-Canara Bank additions' },
  { id: 'ibps-po-2023', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2023, vacancies: 7402, sourceTitle: 'IBPS PO XII Allotment Notice', sourceUrl: 'https://www.ibps.in', notes: 'Expansion of credit officers' },
  { id: 'ibps-po-2022', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2022, vacancies: 6432, sourceTitle: 'IBPS PO XI Notification', sourceUrl: 'https://www.ibps.in', notes: 'Nationalized bank branch requirements' },
  { id: 'ibps-po-2021', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2021, vacancies: 4135, sourceTitle: 'IBPS Annual Report 2021', sourceUrl: 'https://www.ibps.in', notes: 'Probationary Officer intake' },
  { id: 'ibps-po-2020', examName: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', year: 2020, vacancies: 1417, sourceTitle: 'IBPS PO IX Final Result', sourceUrl: 'https://www.ibps.in', notes: 'Bank merger consolidation year' },

  // SBI PO
  { id: 'sbi-po-2026', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2026, vacancies: 2000, sourceTitle: 'SBI PO 2026 Recruitment Notice', sourceUrl: 'https://sbi.co.in/careers', notes: 'Regular annual officer cadre intake' },
  { id: 'sbi-po-2025', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2025, vacancies: 2000, sourceTitle: 'SBI Annual Report 2024-25', sourceUrl: 'https://sbi.co.in/careers', notes: 'JMGS-I Management Trainee cohort' },
  { id: 'sbi-po-2024', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2024, vacancies: 2000, sourceTitle: 'SBI Recruitment Advertisement', sourceUrl: 'https://sbi.co.in/careers', notes: 'Probationary Officers selected' },
  { id: 'sbi-po-2023', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2023, vacancies: 1673, sourceTitle: 'SBI PO 2023 Final Allotment', sourceUrl: 'https://sbi.co.in/careers', notes: 'Pan-India branch allocation' },
  { id: 'sbi-po-2022', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2022, vacancies: 2056, sourceTitle: 'SBI Career Portal Archives', sourceUrl: 'https://sbi.co.in/careers', notes: 'Officer recruitment' },
  { id: 'sbi-po-2021', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2021, vacancies: 2000, sourceTitle: 'SBI Annual Report 2021', sourceUrl: 'https://sbi.co.in/careers', notes: 'Annual PO batch' },
  { id: 'sbi-po-2020', examName: 'SBI PO', conductingBody: 'State Bank of India', year: 2020, vacancies: 2000, sourceTitle: 'SBI PO 2020 Notice', sourceUrl: 'https://sbi.co.in/careers', notes: 'Probationary Officer cohort' },

  // Railway NTPC & ALP
  { id: 'rrb-ntpc-2026', examName: 'RRB NTPC', conductingBody: 'Railway Recruitment Boards', year: 2026, vacancies: 11558, sourceTitle: 'RRB CEN 05/2026 & CEN 06/2026 Notices', sourceUrl: 'https://indianrailways.gov.in', notes: 'Graduate (8,113) and Undergraduate (3,445) posts' },
  { id: 'rrb-alp-2026', examName: 'RRB ALP', conductingBody: 'Railway Recruitment Boards', year: 2026, vacancies: 18799, sourceTitle: 'RRB CEN 01/2026 Enhanced Vacancy Notice', sourceUrl: 'https://indianrailways.gov.in', notes: 'Tripled from initial 5,696 to 18,799 by Railway Board' },
  { id: 'rrb-ntpc-2019', examName: 'RRB NTPC', conductingBody: 'Railway Recruitment Boards', year: 2022, vacancies: 35281, sourceTitle: 'RRB CEN 01/2019 Final Empanelment', sourceUrl: 'https://indianrailways.gov.in', notes: 'Concluded mega-drive appointment' },
];
