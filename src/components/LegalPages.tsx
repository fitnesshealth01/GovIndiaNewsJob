import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Mail,
  MapPin,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Send,
  HelpCircle,
  Phone,
  UserCheck,
  Scale,
  RefreshCw,
  ExternalLink,
  Clock,
  BookOpen,
  Award,
} from 'lucide-react';

export type LegalPageType =
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'fact-checking'
  | 'corrections';

interface LegalPageProps {
  type: LegalPageType;
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  // Grievance / Contact form state
  const [complaintType, setComplaintType] = useState('factual-errata');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `GIN-GRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(generatedTicket);
    setIsSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setArticleUrl('');
      setContactSubject('');
      setContactMessage('');
    }, 500);
  };

  const navTabs: { id: LegalPageType; label: string; path: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About Us', path: '/about', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact & Grievance', path: '/contact', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'privacy', label: 'Privacy Policy', path: '/privacy', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'terms', label: 'Terms of Service', path: '/terms', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'disclaimer', label: 'Statutory Disclaimer', path: '/disclaimer', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: 'fact-checking', label: 'Fact-Checking Policy', path: '/fact-checking', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'corrections', label: 'Corrections Policy', path: '/corrections', icon: <RefreshCw className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Navigation Tab Bar for Legal & Mandatory Pages */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {navTabs.map((tab) => {
            const isActive = type === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.path)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. ABOUT US (Google Discover / E-E-A-T Verified Transparency) */}
      {/* ============================================================== */}
      {type === 'about' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>E-E-A-T Editorial Disclosure</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              About GovIndiaNews
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              India's premier independent career news portal, government gazette intelligence platform, and smart examination utility service.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <h2 className="text-base font-bold text-slate-900">1. Our Purpose & Editorial Mission</h2>
            <p>
              Founded in 2024 by career educational researchers and examination mentors, <strong>GovIndiaNews</strong> was established with a singular objective: <em>to deliver completely unadulterated, verified, and timely recruitment intelligence to millions of youth across India preparing for public sector examinations</em>.
            </p>
            <p>
              In an online era rampant with clickbait headlines, misleading dates, fake exam calendars, and unverified social media circulars, GovIndiaNews serves as a trusted fortress of factual clarity. Every notification, age cutoff criterion, pay scale matrix, and exam syllabus published on our network is directly cross-referenced with the <strong>Gazette of India (The Gazette of India: Extraordinary)</strong>, official Ministry portals, and statutory recruiting authorities.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. Publisher & Corporate Identity</h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Publishing Organization</span>
                  <span className="font-bold text-slate-900">GovIndiaNews Digital Media & Research LLP</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Editorial Headquarters</span>
                  <span className="font-medium text-slate-800">42/1 Institutional Area, Connaught Place, New Delhi – 110001, India</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Editorial Inquiries</span>
                  <span className="font-medium text-blue-700">editor@govindianews.in</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Official Website</span>
                  <span className="font-medium text-blue-700">https://govindianews.com</span>
                </div>
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Our Editorial Board & Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Akash Singh Solanki</h3>
                    <p className="text-[11px] text-blue-700 font-semibold">Founder & Chief Educational Editor</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 14 years of journalistic expertise covering Central Staff Selection Commission (SSC), Union Public Service Commission (UPSC), and Railway recruitment dynamics. Formerly Senior Education Correspondent for national daily publications.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center shrink-0">
                    AK
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Dr. Amit K. Sharma</h3>
                    <p className="text-[11px] text-emerald-700 font-semibold">Head of Legal & Gazette Research</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Doctorate in Public Administration with deep specialization in Department of Personnel & Training (DOP&T) statutory recruitment service rules, reservation policies, and 7th Central Pay Commission matrices.
                </p>
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">4. Core Values & Google Discover Integrity Standards</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>Zero Clickbait:</strong> Our titles state the exact post title, department, and confirmed vacancy count as published in official notifications.</li>
              <li><strong>Primary Source Grounding:</strong> Every recruitment alert provides direct hyperlinks to official government portals (`.gov.in` and `.nic.in`) and authentic gazette PDF citations.</li>
              <li><strong>Interactive Precision Tools:</strong> All calculators (Age Cut-Off, Negative Marking, Height Standards) use mathematical formulas coded strictly to official criteria.</li>
              <li><strong>Transparent Corrections:</strong> We acknowledge and date-stamp corrections within 24 hours of confirmation.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. CONTACT US & GRIEVANCE REDRESSAL (IT Rules 2021 Compliant) */}
      {/* ============================================================== */}
      {type === 'contact' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Mail className="w-4 h-4 text-blue-700" />
              <span>Digital Media Ethics Code Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Contact Us & Grievance Redressal Mechanism
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              In accordance with Rule 11 of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
            </p>
          </div>

          {/* Resident Grievance Officer Box (Mandatory under Indian IT Rules) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <span>Designated Resident Grievance Officer (India)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block font-medium">Grievance Officer Name</span>
                <span className="font-bold text-slate-900">Mr. Vikramaditya Rathore</span>
                <span className="text-[11px] text-slate-500 block">Resident Legal & Compliance Counsel</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Dedicated Grievance Email</span>
                <a href="mailto:grievance@govindianews.in" className="font-bold text-blue-700 hover:underline">
                  grievance@govindianews.in
                </a>
                <span className="text-[11px] text-slate-500 block">Turnaround SLA: 24h ack, 48h resolution</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Helpline / Landline</span>
                <span className="font-bold text-slate-900">+91 (011) 2371-8840</span>
                <span className="text-[11px] text-slate-500 block">Mon - Sat (09:30 AM to 06:30 PM IST)</span>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-slate-600 border-t border-blue-200/60">
              <strong>Postal Address for Legal Notices:</strong> Grievance Redressal Cell, GovIndiaNews Digital Media LLP, 42/1 Institutional Area, Connaught Place, New Delhi – 110001, India.
            </div>
          </div>

          {/* Interactive Grievance / Errata Submission Form */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Submit an Inquiry, Factual Errata, or Grievance
            </h2>
            <p className="text-xs text-slate-600">
              If you have noticed any factual error, date inaccuracy, broken government portal link, or have a grievance regarding published content, please submit the form below. A ticket tracking ID will be generated instantly.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Grievance Acknowledged & Logged Successfully</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Your ticket tracking reference number is: <strong>{ticketNumber}</strong>. As per Rule 11 of the Information Technology Rules 2021, an acknowledgment has been sent to your email. Our editorial desk will investigate and provide a formal response within 48 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 px-4 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry / Grievance Category *
                    </label>
                    <select
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                    >
                      <option value="factual-errata">Factual Errata / Notification Date Correction</option>
                      <option value="broken-link">Broken Official Government Portal Link</option>
                      <option value="copyright">Copyright / Intellectual Property Notice</option>
                      <option value="advertisement">AdSense / Advertisement Complaint</option>
                      <option value="general-inquiry">General Editorial Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Related GovIndiaNews Article URL or Exam Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={articleUrl}
                    onChange={(e) => setArticleUrl(e.target.value)}
                    placeholder="e.g. /article/ssc-cgl-2026-recruitment-notification or SSC CGL"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Brief summary of your grievance or inquiry"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detailed Message & Evidence *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Please provide complete details, including official gazette page number, notification paragraph, or clarification request..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Grievance Redressal Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. PRIVACY POLICY (AdSense DART Cookies, GDPR & DPDP Act 2023) */}
      {/* ============================================================== */}
      {type === 'privacy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Lock className="w-4 h-4 text-blue-700" />
              <span>Data Protection & Privacy Policy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy & Cookie Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Last Updated & Reviewed: 28 September 2026 · Complies with Google AdSense Policies, Google Discover, Digital Personal Data Protection Act (DPDP Act 2023), GDPR & CCPA.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <p>
              At <strong>GovIndiaNews</strong>, accessible from <code>https://govindianews.com</code>, safeguarding the privacy of our visitors is one of our primary commitments. This Privacy Policy document outlines the types of information collected and recorded by GovIndiaNews and how we utilize it in strict conformity with applicable data protection laws.
            </p>

            <h2 className="text-base font-bold text-slate-900">1. Google AdSense & DoubleClick DART Cookies</h2>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-amber-950">
              <p>
                <strong>Google AdSense Disclosure:</strong> Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>govindianews.com</code> and other sites on the internet.
              </p>
              <p>
                Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-blue-700"
                >
                  https://policies.google.com/technologies/ads
                </a>.
              </p>
              <p className="text-[11px] text-amber-900">
                You can manage and personalize your Google advertising choices or opt out of interest-based advertising anytime through Google Ads Settings (<code>https://adssettings.google.com</code>) or the Network Advertising Initiative (NAI) opt-out page.
              </p>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Voluntary Information:</strong> When you contact our Grievance Desk, submit feedback, or subscribe to exam alerts, you may provide your name, email address, and optional phone number.</li>
              <li><strong>Smart Exam Calculator Data:</strong> All calculations performed on our client-side tools (Age Calculator, Negative Marking Calculator, Height Checker) are processed entirely inside your local web browser. We do NOT store, transmit, or record your date of birth, exam marks, or biometric measurements on any server.</li>
              <li><strong>Log Files & Telemetry:</strong> Like standard web platforms, GovIndiaNews utilizes server log files. The information inside log files includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to personally identifiable information and are used solely for security and performance optimization.</li>
            </ul>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Indian Digital Personal Data Protection Act (DPDP Act, 2023)</h2>
            <p>
              Under India's Digital Personal Data Protection Act, 2023:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right to Access & Correction:</strong> You have the right to request a summary of any personal data processed by us and request correction or erasure.</li>
              <li><strong>Right to Grievance Redressal:</strong> You can contact our Resident Grievance Officer at <code>grievance@govindianews.in</code> for immediate redressal.</li>
              <li><strong>Right to Nominate:</strong> You have the right to nominate another individual to exercise rights on your behalf in the event of death or incapacity.</li>
            </ul>

            <h2 className="text-base font-bold text-slate-900 pt-2">4. Third-Party Advertising Partners</h2>
            <p>
              Our advertising partners may use cookies and web beacons on our site. These third-party ad servers or networks use technology in their respective advertisements and links that appear on GovIndiaNews, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. GovIndiaNews has no access to or control over cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">5. Children's Information Protection</h2>
            <p>
              Protecting the privacy of young individuals using the internet is especially vital. GovIndiaNews does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that GovIndiaNews has personally identifiable information of a child under 13 in its database, please contact us immediately, and we will promptly remove such records.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TERMS OF SERVICE */}
      {/* ============================================================== */}
      {type === 'terms' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>User Agreement & Conditions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Effective Date: 01 January 2024 · Latest Revision: 28 September 2026.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>GovIndiaNews</strong> (<code>https://govindianews.com</code>), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and comply with all applicable laws and regulations of the Republic of India. If you do not agree to these terms, you are advised not to use the portal.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. Educational & Informational Purpose Only</h2>
            <p>
              GovIndiaNews provides informational summaries of official government notifications, public sector recruitment advertisements, exam schedules, and syllabus blueprints. While we strive for 100% gazette precision, our summaries do <strong>not</strong> substitute or supersede the official Gazette Notification issued by the competent authority. Candidates must independently consult official recruiting websites (`ssc.gov.in`, `upsc.gov.in`, `rrbapply.gov.in`, etc.) before submitting exam fees or applications.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Intellectual Property Rights & Fair Use</h2>
            <p>
              The original layout, design, software calculators, proprietary algorithmic presets, and analytical summaries produced by GovIndiaNews are protected by copyright laws. Public domain government notifications, statutes, and official gazette excerpts remain the intellectual property of their respective government authorities and are referenced under the doctrine of Fair Dealing for educational and public reporting purposes.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">4. User Conduct & Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use automated scrapers, bots, or extraction scripts to harvest data without prior written authorization.</li>
              <li>Attempt to circumvent security controls, inject malicious code, or disrupt server availability.</li>
              <li>Impersonate any recruitment authority, commission official, or GovIndiaNews editor.</li>
            </ul>

            <h2 className="text-base font-bold text-slate-900 pt-2">5. Jurisdiction & Dispute Resolution</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute arising out of or in connection with GovIndiaNews shall be subject to the exclusive jurisdiction of the competent courts located in <strong>New Delhi, India</strong>.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. STATUTORY DISCLAIMER (Zero Fee / Non-Govt Guarantee) */}
      {/* ============================================================== */}
      {type === 'disclaimer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Statutory Non-Affiliation Declaration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Statutory Non-Governmental Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Mandatory disclosure for candidates and regulatory authorities.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-black text-rose-900 text-sm">
              <ShieldCheck className="w-5 h-5 text-rose-700" />
              <span>1. Independence Declaration: NOT A GOVERNMENT PORTAL</span>
            </div>
            <p className="leading-relaxed">
              <strong>GovIndiaNews (govindianews.com) is a strictly private, independent educational and digital news publication. It is NOT affiliated with, sponsored by, authorized by, or in any way officially connected with the Government of India, State Governments, the Union Public Service Commission (UPSC), the Staff Selection Commission (SSC), the Railway Recruitment Boards (RRB), or any Ministry or statutory recruiting board.</strong>
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <h2 className="text-base font-bold text-slate-900">2. No Fee Collection Guarantee</h2>
            <p>
              GovIndiaNews does <strong>NOT</strong> collect application fees, registration charges, or admit card fees on behalf of any government commission. Any application fee mentioned in our articles (e.g. ₹100 for SSC, ₹500 for RRB) is payable strictly through the official recruitment portals (`https://ssc.gov.in`, `https://upsconline.nic.in`, `https://rrbapply.gov.in`) using their designated official banking gateways.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Caution Against Recruitment Fraud & Touts</h2>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-amber-950 text-xs">
              <p className="font-bold">Important Advisory for Job Aspirants:</p>
              <p>
                Selection in government posts (UPSC, SSC, Railways, State Police, Armed Forces) is conducted purely on merit through competitive computer-based examinations, physical tests, and interviews. Beware of unscrupulous touts, fraudulent agencies, or fake websites promising guaranteed appointments in exchange for money.
              </p>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">4. Official Domains Verification List</h2>
            <p>Always verify examination notices on the respective official government portals:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a href="https://ssc.gov.in" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between">
                <span>Staff Selection Commission (SSC)</span>
                <span className="font-mono text-blue-700">ssc.gov.in</span>
              </a>
              <a href="https://upsc.gov.in" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between">
                <span>Union Public Service Commission</span>
                <span className="font-mono text-blue-700">upsc.gov.in</span>
              </a>
              <a href="https://rrbapply.gov.in" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between">
                <span>Railway Recruitment Boards (RRB)</span>
                <span className="font-mono text-blue-700">rrbapply.gov.in</span>
              </a>
              <a href="https://joinindianarmy.nic.in" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-between">
                <span>Join Indian Army</span>
                <span className="font-mono text-blue-700">joinindianarmy.nic.in</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. FACT-CHECKING POLICY (Google Discover E-E-A-T Benchmark) */}
      {/* ============================================================== */}
      {type === 'fact-checking' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Rigorous Editorial Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Fact-Checking & Gazette Verification Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              How GovIndiaNews verifies government recruitments, pay scales, cutoffs, and exam dates before publication.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <p>
              GovIndiaNews adheres to an uncompromising fact-checking and source verification protocol. We recognize that inaccurate job criteria, misleading age calculations, or fabricated exam dates can severely disrupt a student's career preparation.
            </p>

            <h2 className="text-base font-bold text-slate-900">1. Our 4-Stage Verification Workflow</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <span className="w-6 h-6 rounded-md bg-blue-700 text-white font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-slate-900 text-sm">Official Gazette Corroboration</h3>
                <p className="text-xs text-slate-600">
                  We cross-reference every notification against the e-Gazette repository (`egazette.gov.in`) or official commission bulletins.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <span className="w-6 h-6 rounded-md bg-blue-700 text-white font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-slate-900 text-sm">DOP&T Statutory Rules Check</h3>
                <p className="text-xs text-slate-600">
                  Age cutoffs, category relaxations (OBC 3 yrs, SC/ST 5 yrs), and EWS criteria are verified against Department of Personnel and Training statutory orders.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <span className="w-6 h-6 rounded-md bg-blue-700 text-white font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-slate-900 text-sm">7th CPC Pay Scale Verification</h3>
                <p className="text-xs text-slate-600">
                  All advertised salaries, Dearness Allowance (DA), and House Rent Allowance (HRA) calculations are cross-checked with the official 7th CPC Pay Matrix.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <span className="w-6 h-6 rounded-md bg-blue-700 text-white font-bold text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-slate-900 text-sm">Dual Senior Editor Scrutiny</h3>
                <p className="text-xs text-slate-600">
                  Before any article goes live, it must be peer-reviewed and signed off by a credentialed senior educational editor.
                </p>
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. Zero Tolerance for Unverified Social Media Circulars</h2>
            <p>
              GovIndiaNews has a strict policy against reporting on leaked exam calendar screenshots, unauthenticated WhatsApp forwards, or unconfirmed exam cancellations. If a notification is rumored, we report on it ONLY after official confirmation from authorized Press Information Bureau (PIB) or official commission spokespersons.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Source Transparency</h2>
            <p>
              Every recruitment guide on GovIndiaNews contains an explicit "Official Notification & Government Portals" table with the full Gazette Notification Reference number, release date, and primary `.gov.in` URL.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. CORRECTIONS & ERRATA POLICY */}
      {/* ============================================================== */}
      {type === 'corrections' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <RefreshCw className="w-4 h-4 text-purple-700" />
              <span>Public Accountability & Integrity</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Corrections & Errata Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Our transparent procedure for acknowledging, correcting, and logging factual updates.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
            <p>
              GovIndiaNews believes in total editorial accountability. When factual mistakes or date discrepancies occur due to official corrigendum notices or typographical slips, we commit to correcting them promptly and visibly.
            </p>

            <h2 className="text-base font-bold text-slate-900">1. Standards for Corrections</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Substantive Corrections:</strong> If an article contained an incorrect exam date, revised vacancy count, or altered eligibility criteria, we update the article immediately and append a date-stamped <em>"Correction Notice"</em> at the top or bottom of the post explaining what was modified.</li>
              <li><strong>Official Corrigendum Integration:</strong> When government recruiting bodies (such as SSC or RRB) issue a revised corrigendum or vacancy amendment, we update the main table within 3 hours and clearly note the change.</li>
              <li><strong>Minor Typographical Fixes:</strong> Minor spelling corrections that do not alter the factual meaning are corrected immediately without a separate notice.</li>
            </ul>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. How to Report an Error</h2>
            <p>
              We welcome and encourage readers to point out any factual errors. You can report an error via:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div>
                <strong>Email:</strong> <a href="mailto:corrections@govindianews.in" className="text-blue-700 hover:underline">corrections@govindianews.in</a>
              </div>
              <div>
                <strong>Interactive Form:</strong> Go to the <button onClick={() => onNavigate('/contact')} className="text-blue-700 font-bold underline cursor-pointer">Contact & Grievance Desk</button> and select "Factual Errata".
              </div>
              <div>
                <strong>Expected Resolution Time:</strong> Errata reports are reviewed within 4 hours during working hours (09:30 AM to 06:30 PM IST).
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. Public Correction & Corrigendum Log (Recent Updates)</h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-3 font-bold">Date</th>
                    <th className="p-3 font-bold">Recruitment / Article</th>
                    <th className="p-3 font-bold">Nature of Corrigendum / Correction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500 whitespace-nowrap">27 Sep 2026</td>
                    <td className="p-3 font-semibold text-slate-900">SSC CGL 2026 Notification</td>
                    <td className="p-3 text-slate-600">Updated revised vacancy breakdown to include 1,420 Inspector (CBDT) posts as per SSC Corrigendum-II.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500 whitespace-nowrap">22 Sep 2026</td>
                    <td className="p-3 font-semibold text-slate-900">RRB NTPC CEN 05/2026</td>
                    <td className="p-3 text-slate-600">Clarified CBT-1 fee refund mechanism for reserved and unreserved categories after taking the computer test.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500 whitespace-nowrap">15 Sep 2026</td>
                    <td className="p-3 font-semibold text-slate-900">UP Police Constable 2026</td>
                    <td className="p-3 text-slate-600">Reflected state government notification granting 3-year upper age relaxation across all categories.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
