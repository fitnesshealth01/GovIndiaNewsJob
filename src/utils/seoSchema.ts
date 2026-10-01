import { RecruitmentAlert } from '../data/gazetteData';
import { getAuthorByAlertId, AuthorProfile } from '../data/authorData';

/**
 * Generates Google-compliant Schema.org JSON-LD structured data
 * for JobPosting, NewsArticle, ProfilePage, and BreadcrumbList.
 */

export function buildJobPostingSchema(item: RecruitmentAlert): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://govindianews.org';
  const url = `${origin}/article/${item.slug}`;
  const author = getAuthorByAlertId(item.id);

  // Parse salary if available
  let minValue = 21700;
  let maxValue = 69100;
  if (item.salaryStructure?.basicPay) {
    const numbers = item.salaryStructure.basicPay.match(/\d[0-9,]*/g);
    if (numbers && numbers.length > 0) {
      minValue = parseInt(numbers[0].replace(/,/g, ''), 10) || 21700;
      maxValue = numbers.length > 1 ? parseInt(numbers[1].replace(/,/g, ''), 10) || minValue * 3 : minValue * 3;
    }
  }

  // Parse ISO date
  let validThrough = '2026-11-30T23:59:59+05:30';
  if (item.lastDate) {
    const clean = item.lastDate.replace(/\(.*?\)/g, '').trim();
    const d = new Date(clean);
    if (!isNaN(d.getTime())) {
      validThrough = d.toISOString();
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: item.title,
    description: `${item.summary} Official Gazette Notification: ${item.officialGazetteRef}. Minimum qualification: ${item.qualification}. Age limit: ${item.ageLimit || 'As per official rules'}.`,
    identifier: {
      '@type': 'PropertyValue',
      name: item.organization,
      value: item.id,
    },
    datePosted: '2026-09-30T09:00:00+05:30',
    validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'GovernmentOrganization',
      name: item.organization,
      sameAs: item.officialLinks?.[0]?.url || 'https://india.gov.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'All India',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue,
        maxValue,
        unitText: 'MONTH',
      },
    },
    qualifications: item.qualification,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.designation,
      url: `${origin}/trust/authors?author=${author.id}`,
      alumniOf: author.education.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.institution,
      })),
      knowsAbout: author.statutoryFocusAreas,
    },
    url,
  };
}

export function buildNewsArticleSchema(item: RecruitmentAlert): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://govindianews.org';
  const url = `${origin}/article/${item.slug}`;
  const author = getAuthorByAlertId(item.id);

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.summary,
    image: [`${origin}/og-image.png`],
    datePublished: '2026-09-30T09:00:00+05:30',
    dateModified: '2026-09-30T17:30:00+05:30',
    author: [
      {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.designation,
        url: `${origin}/trust/authors?author=${author.id}`,
        alumniOf: author.education.map((e) => ({
          '@type': 'EducationalOrganization',
          name: e.institution,
        })),
        knowsAbout: author.statutoryFocusAreas,
      },
    ],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'GovIndiaNews',
      url: origin,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function buildAuthorProfilePageSchema(author: AuthorProfile): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://govindianews.org';
  const url = `${origin}/trust/authors?author=${author.id}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.designation,
      description: author.executiveSummary,
      url,
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: 'GovIndiaNews',
        url: origin,
      },
      alumniOf: author.education.map((edu) => ({
        '@type': 'EducationalOrganization',
        name: edu.institution,
      })),
      knowsAbout: author.statutoryFocusAreas,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: author.accreditationBadge,
          recognizedBy: {
            '@type': 'Organization',
            name: author.accreditationBadge,
          },
        },
      ],
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://govindianews.org';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`,
    })),
  };
}

/**
 * Injects or updates Schema.org JSON-LD tag in document head
 */
export function injectSchema(schemas: Record<string, unknown>[]): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'govindianews-seo-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
}
