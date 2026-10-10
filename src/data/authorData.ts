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
    beat: 'Government Recruitment Analysis & Candidate Utilities',
    // TODO (Akash Singh Solanki): Confirm and fill in your verified educational background and professional qualifications below.
    serviceBackground: 'Founder & Primary Editor',
    initials: 'AS',
    avatarBg: 'bg-stone-900',
    avatarBorder: 'border-stone-700',
    biography:
      'Founder and Editor of GovIndiaNews, dedicated to providing authentic, gazette-referenced government recruitment notifications, transparent examination date tracking, and candidate-first calculation utilities for aspirants across India. Focuses on factual clarity and zero-clickbait reporting.',
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
      (a) => a.id === id || (id.includes('akash') && a.id.includes('akash'))
    );
    if (found) return found;
  }
  return EDITORIAL_AUTHORS[0];
};

export const getAuthorByAlertId = (_alertId?: string): AuthorProfile => {
  return EDITORIAL_AUTHORS[0];
};
