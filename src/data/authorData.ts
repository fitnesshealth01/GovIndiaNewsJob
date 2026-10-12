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
    id: 'editorial-desk',
    name: 'GovIndiaNews Editorial Desk & Central Verification Board',
    designation: 'Institutional Editorial Board',
    role: 'Central Research & Verification Desk',
    beat: 'Primary Gazette Analysis, Statutory DoPT Quotas & Commission Audits',
    serviceBackground: 'Institutional Research & Public Verification Desk',
    initials: 'GN',
    avatarBg: 'bg-slate-900',
    avatarBorder: 'border-blue-600',
    biography:
      'The GovIndiaNews Editorial Desk & Central Verification Board is a collective editorial and research division dedicated to auditing public sector notices, gazette circulars, and recruitment brochures across UPSC, SSC, NTA, RRB, and State PSCs. All published dossiers undergo multi-step verification against authoritative .gov.in and .nic.in portals, gazette notifications, and official corrigenda to protect candidates from misinformation.',
    detailedExperience: [
      'Multi-analyst scrutiny of Gazette of India extraordinary releases, DoPT reservations, and statutory commission notifications.',
      'Manual verification of official application URLs, application fee exemption clauses, and photo/signature dimensional standards.',
      'Algorithmic and editorial fact-checking against official corrigenda, exam calendar shifts, and court ruling implementations.',
      'Direct maintenance of candidate utilities: 7th CPC salary calculator matrices, DoPT cut-off age analyzers, and negative marking models.',
    ],
    links: {
      website: 'https://govindianews.com/about',
    },
    contactEmail: 'desk@govindianews.com',
  },
  {
    id: 'akash-singh-solanki',
    name: 'Akash Singh Solanki',
    designation: 'Founder & Lead Editor',
    role: 'Founder & Lead Editor',
    beat: 'Government Recruitment Analysis & Candidate Utilities',
    // TODO (Akash Singh Solanki): Confirm and fill in your verified educational background and professional qualifications below.
    serviceBackground: 'Founder & Lead Editor',
    initials: 'AS',
    avatarBg: 'bg-stone-900',
    avatarBorder: 'border-stone-700',
    biography:
      'Founder and Lead Editor of GovIndiaNews, dedicated to providing authentic, gazette-referenced government recruitment notifications, transparent examination date tracking, and candidate-first calculation utilities for aspirants across India. Focuses on factual clarity and zero-clickbait reporting.',
    detailedExperience: [
      'Founded GovIndiaNews to eliminate recruitment rumors and sensationalized vacancy claims by cross-referencing Central Government Gazettes, UPSC, SSC, RRB, and State PSC releases.',
      'Developed interactive candidate calculation tools including statutory DoPT cut-off age calculators, negative marking scorecards, and 7th CPC take-home pay models.',
      'Audits official recruitment brochures and corrigenda from government commission portals (.gov.in / .nic.in).',
      'TODO (Owner): Add specific verified degrees, institutions, and professional editorial background.',
    ],
    links: {
      website: 'https://govindianews.com/about',
    },
    contactEmail: 'contact@govindianews.com',
  },
];

export const getAuthorById = (id?: string): AuthorProfile => {
  if (id) {
    const found = EDITORIAL_AUTHORS.find(
      (a) => a.id === id || (id.includes('akash') && a.id.includes('akash')) || (id.includes('desk') && a.id.includes('desk'))
    );
    if (found) return found;
  }
  return EDITORIAL_AUTHORS[0];
};

export const getAuthorByAlertId = (_alertId?: string): AuthorProfile => {
  return EDITORIAL_AUTHORS[0];
};
