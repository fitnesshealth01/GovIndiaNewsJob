export interface AuthorProfile {
  id: string;
  name: string;
  designation: string;
  role: string;
  beat: string;
  initials: string;
  avatarBg: string;
  avatarBorder: string;
  biography: string;
  links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  contactEmail: string;
}

export const EDITORIAL_AUTHORS: AuthorProfile[] = [
  {
    id: 'akash-solanki',
    name: 'Akash Singh Solanki',
    designation: 'Founder and Editor',
    role: 'Founder and Editor',
    beat: 'Government Recruitment Notifications, Exam Guidelines & Candidate Utilities',
    initials: 'AS',
    avatarBg: 'bg-stone-900',
    avatarBorder: 'border-stone-700',
    biography: '[PLACEHOLDER: real bio, photo, social/LinkedIn links]',
    links: {
      linkedin: '[PLACEHOLDER: LinkedIn profile URL]',
      twitter: '[PLACEHOLDER: Twitter/X profile URL]',
      website: 'https://govindianews.com/about',
    },
    contactEmail: 'contact@govindianews.com',
  },
];

export const getAuthorById = (_id?: string): AuthorProfile => {
  return EDITORIAL_AUTHORS[0];
};

export const getAuthorByAlertId = (_alertId?: string): AuthorProfile => {
  return EDITORIAL_AUTHORS[0];
};
