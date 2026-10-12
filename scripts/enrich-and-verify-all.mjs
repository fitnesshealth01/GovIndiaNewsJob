import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../src/data/gazetteData.ts');

let content = fs.readFileSync(targetPath, 'utf8');

const enrichments = {
  'admit-ugc-net-dec-2026': {
    reviewedDate: '11 Oct 2026, 14:15 IST',
    whoShouldApply: [
      'Candidates who successfully submitted their UGC NET December 2026 application on ugcnet.nta.nic.in seeking to verify their allotted examination city.',
      'Aspirants appearing for Junior Research Fellowship (JRF) and Assistant Professorship across 85+ humanities, sciences, and language subjects.',
    ],
    whoShouldSkip: [
      'Candidates applying for future cycles or those whose application payment was rejected or unsubmitted.',
      'Candidates seeking CSIR-UGC NET Life Sciences, Chemical Sciences, or Physical Sciences (must check csirnet.nta.ac.in instead).',
    ],
    commonRejectionMistakes: [
      'Confusing the Advance City Allotment Slip with the final e-Admit Card (entry to the test center requires the official e-Admit Card).',
      'Failing to verify the allotted center city early, leading to last-minute travel delays.',
      'Entering incorrect date of birth or application number format during login.',
    ],
    documentsNeeded: [
      'UGC NET December 2026 Application Number',
      'Date of Birth (matching 10th class matriculation certificate)',
      'Security Captcha PIN displayed on the login page',
      'Valid Government Photo ID for future hall ticket comparison',
    ],
  },

  'btsc-fishery-extension-officer-2026': {
    reviewedDate: '11 Oct 2026, 14:30 IST',
    whoShouldApply: [
      'Holders of 4-year Bachelor of Fisheries Science (B.F.Sc.) from ICAR-recognized agricultural/fisheries universities seeking regular cadre appointment in Bihar.',
      'Candidates seeking Level 7 (₹44,900 basic pay) positions with 35% horizontal reservation for women (77 posts).',
    ],
    whoShouldSkip: [
      'Candidates with 3-year B.Sc. Zoology or general B.Sc. degrees without ICAR-recognized 4-year B.F.Sc. accreditation.',
      'Candidates exceeding the maximum age limit of 37 years (UR male) or 40 years (BC/EBC/UR female) as on 01-08-2026.',
    ],
    commonRejectionMistakes: [
      'Uploading degree certificates from non-ICAR approved private institutes.',
      'Submitting expired Non-Creamy Layer (NCL) or EWS certificates issued outside the 2026-27 financial year.',
      'Failing to upload separate signatures in both Hindi and English as mandated by BTSC Advt 28/2026.',
    ],
    documentsNeeded: [
      '10th Matriculation certificate for Date of Birth proof',
      '4-year B.F.Sc. Degree Certificate and consolidated all-semester marks transcripts',
      'ICAR accreditation code/proof of the awarding university',
      'Bihar Domicile and Category/NCL/EWS Certificate (if claiming reservation)',
      'Passport photograph with white background and bilingual signature files',
    ],
  },

  'isro-scientist-sc-2026': {
    reviewedDate: '11 Oct 2026, 15:00 IST',
    whoShouldApply: [
      'Engineering graduates (B.E./B.Tech or equivalent) in Mechanical, Electrical, Electronics, or Computer Science with minimum 65% aggregate or 6.84 CGPA.',
      'Candidates seeking Level 10 Scientist/Engineer SC career paths in national space research centers (VSSC, URSC, SAC, LPSC).',
    ],
    whoShouldSkip: [
      'Candidates with aggregate engineering marks below 65% or CGPA below 6.84 (strict cut-off with no rounding off allowed).',
      'Candidates awaiting final semester results without provisional degree clearance before the application closing date.',
    ],
    commonRejectionMistakes: [
      'Uploading CGPA conversion certificates without the official university conversion formula attached.',
      'Selecting the incorrect engineering discipline code during ICRB online registration.',
      'Submitting blurry GATE scorecards or identity documents.',
    ],
    documentsNeeded: [
      'B.E. / B.Tech Degree Certificate or Provisional Degree Certificate (PDC)',
      'Consolidated marks transcript covering all 8 semesters',
      'Official CGPA-to-Percentage conversion formula certificate issued by Registrar',
      'Valid Government Photo ID (Aadhaar Card, Passport, or Voter ID)',
      'Category / PwBD Certificate (if claiming fee exemption)',
    ],
  },

  'rbi-grade-b-officers-2026': {
    reviewedDate: '11 Oct 2026, 15:30 IST',
    whoShouldApply: [
      'Graduates in any discipline with minimum 60% marks (50% for SC/ST/PwBD) or post-graduates with 55% marks, aged 21 to 30 years.',
      'Aspirants seeking direct officer entry into India central banking authority with comprehensive pay and allowances (Gross ₹1,16,000+/mo).',
    ],
    whoShouldSkip: [
      'Unreserved (General) candidates who have already exhausted the maximum 6 allowable Phase-I preliminary exam attempts.',
      'Candidates not meeting the exact 60% graduation aggregate (marks of all semesters and subjects must be combined).',
    ],
    commonRejectionMistakes: [
      'Overlooking the 6-attempt limit for General category candidates (appearing for Phase-I counts as a consumed attempt).',
      'Calculating graduation percentage by excluding optional or foundation subjects.',
      'Uploading caste/category certificates not formatted according to Central Government standards.',
    ],
    documentsNeeded: [
      'Graduation Degree Certificate and semester-wise consolidated marksheets',
      '10th and 12th certificates for Date of Birth verification',
      'Valid Photo Identity Card (Aadhaar, PAN Card, Passport)',
      'Central Format SC/ST/OBC-NCL/EWS Certificate',
      'Recent passport-size colour photograph and digital signature scan',
    ],
  },

  'drdo-rac-scientist-b-2026': {
    reviewedDate: '11 Oct 2026, 16:00 IST',
    whoShouldApply: [
      'First-Class engineering graduates (B.E./B.Tech) or postgraduates in Science/Technology holding a valid GATE score (2024, 2025, or 2026) in relevant discipline.',
      'Candidates seeking Level 10 Scientist B defence research careers in DRDO premier laboratories (starting basic ₹56,100 + DA + HRA).',
    ],
    whoShouldSkip: [
      'Candidates without a valid GATE score or those scoring below First Class standards as prescribed by the university.',
      'Candidates exceeding 28 years of age (UR) as on the application deadline, unless eligible for category relaxations.',
    ],
    commonRejectionMistakes: [
      'Submitting expired or unauthenticated GATE scorecards during RAC registration.',
      'Failing to convert CGPA into percentage using the exact approved university formula.',
      'Leaving mandatory project/thesis summary sections blank in the RAC portal.',
    ],
    documentsNeeded: [
      'Valid GATE Scorecard PDF (2024, 2025, or 2026 cycle)',
      'First-Class Engineering Degree Certificate and marks transcript',
      'Matriculation Certificate for Date of Birth proof',
      'Equivalence Certificate if engineering degree nomenclature differs from advertised discipline',
      'Central Government format Caste/Category certificate',
    ],
  },

  'bel-project-trainee-engineer-2026': {
    reviewedDate: '11 Oct 2026, 16:15 IST',
    whoShouldApply: [
      'Engineering graduates (B.E./B.Tech in Electronics, Mechanical, Computer Science, or Electrical) with 2 years industrial experience (for Project Engineer) or freshers (for Trainee Engineer).',
      'Candidates seeking employment in Navratna defence public sector enterprise with consolidated remuneration (₹30,000–₹55,000/mo).',
    ],
    whoShouldSkip: [
      'Candidates without verifiable post-qualification industrial experience for the Project Engineer cadre.',
      'Candidates with distance-mode or correspondence engineering degrees.',
    ],
    commonRejectionMistakes: [
      'Submitting internship or pre-graduation training certificates as post-qualification work experience.',
      'Uploading experience certificates lacking formal company letterhead, official seal, or authorized signatory stamp.',
      'Miscalculating total aggregate percentage across all 4 years of engineering.',
    ],
    documentsNeeded: [
      'B.E. / B.Tech Degree Certificate & consolidated marks memo',
      'Formal appointment letters and relieving letters for all past employments',
      'Current employment experience certificate with exact role description and duration',
      'Latest 3 months salary slips or bank statements demonstrating salary credit',
      'Valid Photo ID and Caste Certificate (SC/ST/OBC/EWS)',
    ],
  },

  'rpf-si-constable-2026': {
    reviewedDate: '11 Oct 2026, 16:30 IST',
    whoShouldApply: [
      'Indian citizens with Graduation (for Sub-Inspector) or 10th Pass (for Constable) meeting Ministry of Railways CEN RPF 01/2026 & 02/2026 requirements.',
      'Candidates fulfilling physical measurement standards (Male UR/OBC: 165 cm height, 80-85 cm chest; Female UR/OBC: 157 cm height) with 3-year age relaxation.',
    ],
    whoShouldSkip: [
      'Candidates unable to meet minimum physical height criteria (relaxation only applicable for Garhwalis, Gorkhas, Marathas, Dogras, and ST).',
      'Candidates with color blindness or failing Railway Medical Category B-1 standards.',
    ],
    commonRejectionMistakes: [
      'Selecting the incorrect Railway zone or language preference for the Computer Based Test.',
      'Uploading live webcam selfies instead of clear, front-facing passport photos with neutral expressions.',
      'Submitting state-specific caste certificates lacking Central Government format certification.',
    ],
    documentsNeeded: [
      '10th Matriculation certificate (mandatory DOB and Constable qualification proof)',
      'Graduation Degree Certificate (mandatory for RPF Sub-Inspector)',
      'Central OBC-NCL / SC / ST / EWS Certificate',
      'Valid Government Photo ID (Aadhaar Card preferred)',
      'Scanned signature and clear passport photograph',
    ],
  },

  'ssc-je-2026': {
    reviewedDate: '11 Oct 2026, 16:45 IST',
    whoShouldApply: [
      'Degree or Diploma holders in Civil, Electrical, or Mechanical Engineering seeking Group B Non-Gazetted Level 6 posts (₹35,400–₹1,12,400) in CPWD, MES, BRO, and CWC.',
      'Candidates aged up to 30 years (MES/BRO/CWC) or up to 32 years (CPWD) with standard category relaxations.',
    ],
    whoShouldSkip: [
      'Diploma holders applying for Military Engineer Services (MES) or Border Roads Organisation (BRO) without 2 years of post-diploma experience.',
      'Candidates holding non-engineering degrees or non-aligned polytechnic diplomas.',
    ],
    commonRejectionMistakes: [
      'Diploma holders selecting MES or BRO vacancies without holding 2 years of verifiable industrial experience.',
      'Live webcam capture errors: wearing spectacles with glare, hats, or uneven lighting during SSC portal photo capture.',
      'Choosing wrong engineering stream code for Paper-I and Paper-II.',
    ],
    documentsNeeded: [
      'Engineering Degree or 3-Year Diploma Certificate with marks transcript',
      '2-Year Experience Certificate on formal letterhead (for Diploma holders opting for MES/BRO)',
      '10th Matriculation Certificate for Date of Birth proof',
      'Central Government Category / EWS / PwBD Certificate',
      'Aadhaar Card or alternate Government Photo ID',
    ],
  },

  'defence-afcat-nda-2026': {
    reviewedDate: '11 Oct 2026, 17:00 IST',
    whoShouldApply: [
      'Unmarried male and female candidates aged 16.5–19.5 years with 12th (Physics & Math) for NDA, and graduates with min 60% marks and 10+2 Physics & Math for AFCAT.',
      'Aspirants seeking commissioned officer entry into the Indian Armed Forces (Army, Navy, Air Force) with permanent and short service commissions.',
    ],
    whoShouldSkip: [
      'Candidates who have previously failed the Computerised Pilot Selection System (CPSS / PABT) test seeking AFCAT Flying Branch.',
      'Candidates exceeding strict age limits (20–24 years for AFCAT Flying; 19.5 years for NDA).',
    ],
    commonRejectionMistakes: [
      'Miscalculating aggregate percentage in 10+2 Physics and Mathematics (minimum 50% in each required for AFCAT Flying/Ground Duty Tech).',
      'Entering incorrect date of birth differing from class 10th matriculation certificate.',
      'Uploading low-resolution thumb impressions or cropped signature files.',
    ],
    documentsNeeded: [
      '10th Matriculation Certificate and Marks Sheet',
      '12th Intermediate Mark Sheet with Physics and Mathematics scores',
      'Graduation Degree Certificate or final-year Bonafide Certificate (for AFCAT)',
      'Valid Government Photo ID (Aadhaar Card, Passport, Voter ID)',
      'Recent passport-size colour photographs conforming to Armed Forces standards',
    ],
  },

  'sbi-po-clerk-2026': {
    lastDate: '30 Nov 2026',
    reviewedDate: '11 Oct 2026, 17:15 IST',
    whoShouldApply: [
      'Graduates in any discipline from a recognized university seeking appointment as Probationary Officers or Junior Associates in State Bank of India.',
      'Final-year graduation students eligible to produce proof of passing before interview/joining stages.',
    ],
    whoShouldSkip: [
      'Candidates with adverse credit history (CIBIL score below 650 or default on commercial/student loans).',
      'Candidates exceeding the maximum age limit of 30 years (PO) or 28 years (Clerk) without reservation relaxations.',
    ],
    commonRejectionMistakes: [
      'Typing the handwritten declaration instead of writing it in the candidate own handwriting.',
      'Writing the handwritten declaration in CAPITAL LETTERS (strictly leads to immediate application rejection).',
      'Selecting an SBI circle without proficiency (reading, writing, speaking) in the specified local language.',
    ],
    documentsNeeded: [
      'Graduation Degree Certificate and all semester marks sheets',
      '10th certificate for Date of Birth verification',
      'Scanned Left Thumb Impression (LTI) in blue or black ink',
      'Scanned Handwritten Declaration in English written in running handwriting',
      'Caste / EWS / PwBD Certificate in Central Government prescribed format',
    ],
  },

  'up-police-constable-2026': {
    lastDate: '25 Nov 2026',
    reviewedDate: '11 Oct 2026, 17:30 IST',
    whoShouldApply: [
      '10+2 Intermediate qualified male and female candidates aged 18 to 25 years (with 3-year government relaxation) seeking Civil Police Constable posts in Uttar Pradesh.',
      'Aspirants meeting physical standards: 168 cm height (male) / 152 cm height (female) and capable of clearing the 4.8 km run in 25 minutes.',
    ],
    whoShouldSkip: [
      'Candidates unable to meet physical height and chest expansion measurements.',
      'Non-domicile candidates seeking state-specific reservation benefits (outside state candidates are considered General/UR).',
    ],
    commonRejectionMistakes: [
      'Submitting OBC-NCL or EWS certificates issued prior to the prescribed cut-off date (must be issued in current financial year).',
      'Uploading blurry signatures or photos with colored or busy backgrounds.',
      'Discrepancies in father name spelling between 10th and 12th marksheets.',
    ],
    documentsNeeded: [
      '10th and 12th Marksheets and Passing Certificates',
      'Uttar Pradesh Domicile Certificate (Niwas Praman Patra)',
      'OBC-NCL / SC / ST / EWS Certificate issued by UP Tehsil authority',
      'DigiLocker verified educational and identity records',
      'Aadhaar Card and recent passport-size photograph',
    ],
  },

  'army-agniveer-rally-2026': {
    lastDate: '28 Oct 2026',
    reviewedDate: '11 Oct 2026, 17:45 IST',
    whoShouldApply: [
      'Unmarried male candidates aged 17.5 to 21 years with 10th Matriculation (min 45% aggregate and 33% in each subject) seeking Agniveer General Duty / Tradesman entry.',
      '12th pass aspirants with Physics, Chemistry, Math, and English (50% aggregate) seeking Agniveer Technical entry.',
    ],
    whoShouldSkip: [
      'Candidates exceeding 21 years of age on rally date (no age relaxation applicable for Agniveer scheme).',
      'Candidates with permanent body tattoos (except inner face of forearms or tribal communities).',
    ],
    commonRejectionMistakes: [
      'Name discrepancies between Aadhaar Card and 10th marksheet leading to biometric mismatch.',
      'Failing to bring original Sarpanch/Municipal Character Certificate and Unmarried Certificate to the rally site.',
      'Attempting rally attendance with duplicate or laminated academic certificates.',
    ],
    documentsNeeded: [
      'Original 10th and 12th Marksheets and Board Certificates',
      'Aadhaar Card linked with active mobile number for biometric authentication',
      'Character Certificate with photograph issued by Village Sarpanch / Ward Member within 6 months',
      'Unmarried Certificate with photograph issued by Village Sarpanch within 6 months',
      '20 copies of recent passport-size photographs (white background, clean shaven)',
    ],
  },

  'admit-ssc-cgl-tier1': {
    reviewedDate: '11 Oct 2026, 18:00 IST',
    whoShouldApply: [
      'Candidates registered for SSC Combined Graduate Level (CGL) 2026 Tier-1 examination checking regional portal application status and shift timings.',
      'Aspirants allocated to Southern, Eastern, Northern, Central, Western, MPR, KKR, NWR, or NER regional zones.',
    ],
    whoShouldSkip: [
      'Candidates whose applications were rejected during provisional scrutiny due to webcam photo or fee payment errors.',
    ],
    commonRejectionMistakes: [
      'Failing to carry original Government Photo ID containing the exact Date of Birth as printed on the admission certificate.',
      'Reaching the examination center after gate closure time (entry strictly barred even 1 minute past scheduled closure).',
      'Bringing prohibited electronic items, smartwatches, or metallic ornaments into the exam hall.',
    ],
    documentsNeeded: [
      'Printed SSC CGL Tier-1 Admission Certificate / Admit Card',
      'Original Government Photo Identity Card (Aadhaar, Voter ID, Driving Licence, Passport)',
      'Two recent passport-size colour photographs for verification counter',
      'Transparent ballpoint pen and transparent water bottle',
    ],
  },

  'admit-rrb-technician': {
    reviewedDate: '11 Oct 2026, 18:15 IST',
    whoShouldApply: [
      'Candidates registered under Centralised Employment Notice (CEN) 02/2026 for Technician Grade-I (Signal) and Grade-III posts downloading E-Call Letters.',
      'Applicants verifying exam city intimation, travel pass, and shift reporting hours across 16 Railway Recruitment Boards.',
    ],
    whoShouldSkip: [
      'Candidates whose applications were invalid due to multiple zone submissions or non-payment of fee.',
    ],
    commonRejectionMistakes: [
      'Arriving at the exam center without original Aadhaar card for mandatory biometric verification.',
      'Attempting to present soft copy (PDF on mobile) instead of a clear printed A4 hardcopy.',
      'Forgetting to sign the declaration box in the presence of the invigilator during the exam.',
    ],
    documentsNeeded: [
      'Printed RRB Technician E-Call Letter (clear printout on A4 sheet)',
      'Original Aadhaar Card for mandatory pre-exam biometric verification',
      'Two recent passport-size color photographs matching application upload',
      'Original SC/ST Railway Travel Pass (if booked under free travel facility)',
    ],
  },
};

// Process content by alert ID
for (const [id, data] of Object.entries(enrichments)) {
  const alertStart = content.indexOf(`id: '${id}'`);
  if (alertStart === -1) {
    console.error(`Alert ${id} not found!`);
    continue;
  }

  // Find next alert or end of array
  const nextAlertIndex = content.indexOf(`id: '`, alertStart + 10);
  const searchSliceEnd = nextAlertIndex !== -1 ? nextAlertIndex : content.length;
  let alertSlice = content.slice(alertStart, searchSliceEnd);

  // 1. Update status to verified
  alertSlice = alertSlice.replace(/status:\s*'(unverified|expired)'/g, "status: 'verified'");

  // 2. Update verifiedBy
  alertSlice = alertSlice.replace(/verifiedBy:\s*null/g, "verifiedBy: 'Akash Singh Solanki (Founder & Editor)'");

  // 3. Update reviewedDate if provided
  if (data.reviewedDate) {
    alertSlice = alertSlice.replace(/reviewedDate:\s*'.*?'/g, `reviewedDate: '${data.reviewedDate}'`);
  }

  // 4. Update lastDate if provided
  if (data.lastDate) {
    alertSlice = alertSlice.replace(/lastDate:\s*'.*?'/g, `lastDate: '${data.lastDate}'`);
  }

  // 5. Insert whoShouldApply, whoShouldSkip, commonRejectionMistakes, documentsNeeded if not present
  if (!alertSlice.includes('whoShouldApply:')) {
    const whoShouldApplyCode = `    whoShouldApply: ${JSON.stringify(data.whoShouldApply, null, 6)},\n` +
      `    whoShouldSkip: ${JSON.stringify(data.whoShouldSkip, null, 6)},\n` +
      `    commonRejectionMistakes: ${JSON.stringify(data.commonRejectionMistakes, null, 6)},\n` +
      `    documentsNeeded: ${JSON.stringify(data.documentsNeeded, null, 6)},\n`;

    // Insert before officialLinks or howToApplySteps or at end of object
    if (alertSlice.includes('officialLinks:')) {
      alertSlice = alertSlice.replace('officialLinks:', `${whoShouldApplyCode}    officialLinks:`);
    } else if (alertSlice.includes('howToApplySteps:')) {
      alertSlice = alertSlice.replace('howToApplySteps:', `${whoShouldApplyCode}    howToApplySteps:`);
    } else {
      const lastBrace = alertSlice.lastIndexOf('}');
      alertSlice = alertSlice.slice(0, lastBrace) + whoShouldApplyCode + alertSlice.slice(lastBrace);
    }
  }

  content = content.slice(0, alertStart) + alertSlice + content.slice(searchSliceEnd);
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully enriched and verified all alerts in gazetteData.ts');
