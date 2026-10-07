export interface AuthorProfile {
  id: string;
  name: string;
  designation: string;
  role: string;
  beat: string;
  serviceBackground: string;
  initials: string;
  avatarBg: string;
  avatarBorder: string;
  biography: string;
  detailedExperience: string[];
  links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  contactEmail: string;
}

export const EDITORIAL_AUTHORS: AuthorProfile[] = [
  {
    id: 'akash-singh-solanki',
    name: 'Akash Singh Solanki',
    designation: 'Founder and Editor',
    role: 'Founder and Editor',
    beat: 'Government Recruitment Notifications, Defence Examinations & Candidate Welfare',
    serviceBackground: 'Indian Army Veteran (Former Soldier)',
    initials: 'AS',
    avatarBg: 'bg-stone-900',
    avatarBorder: 'border-stone-700',
    biography:
      'Former Indian Army soldier with firsthand military service experience, bringing disciplined rigor and ground-truth verification to public examination reporting. Founder and Editor of GovIndiaNews, dedicated to providing authentic, gazette-verified government job notifications, transparent pay arithmetic, and candidate-first preparation guidance for millions of aspirants across India.',
    detailedExperience: [
      'Served as a disciplined soldier in the Indian Army with direct ground operational experience in military units.',
      'Extensive expertise in defense recruitment rally mechanics, Agniveer physical efficiency standards (PFT/PET 1600m run, pull-ups), and medical board compliance.',
      'Founded GovIndiaNews to eliminate recruitment rumors and sensationalized vacancy claims by cross-referencing Central Government Gazettes, UPSC, SSC, RRB, and State PSC releases.',
      'Pioneered interactive candidate tools including statutory DoPT cut-off age calculators, negative marking scorecards, and 7th CPC take-home pay models.',
    ],
    links: {
      linkedin: 'https://linkedin.com/in/akashsinghsolanki',
      twitter: 'https://x.com/govindianews',
      website: 'https://govindianews.com/about',
    },
    contactEmail: 'contact@govindianews.com',
  },
];

export const getAuthorById = (id?: string): AuthorProfile => {
  if (id) {
    const found = EDITORIAL_AUTHORS.find(
      (a) => a.id === id || (id.includes('akash') && a.id.includes('akash'))
    );
    if (found) return found;
  }
  return EDITORIAL_AUTHORS[0];
};

export const getAuthorByAlertId = (_alertId?: string): AuthorProfile => {
  return EDITORIAL_AUTHORS[0];
};
