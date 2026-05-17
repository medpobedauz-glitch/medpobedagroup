import { getLegacyImageSrc } from "@/lib/images";

export type HomepageEvent = {
  id: string;
  title: string;
  summary: string;
  location: string;
  dateLabel: string;
  href: string;
  ctaLabel: string;
  image: string;
};

export type HomepageEditorialBlog = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  href: string;
  image: string;
  category: string;
};

export const homepageEvents: HomepageEvent[] = [
  {
    id: "tashkent-oncology-roundtable",
    title: "Tashkent Oncology Collaboration Roundtable",
    summary:
      "A focused dialogue on cross-border oncology coordination, specialist access, and hospital collaboration opportunities.",
    location: "Tashkent, Uzbekistan",
    dateLabel: "June 18-19, 2026",
    href: "/contact",
    ctaLabel: "Request event details",
    image: getLegacyImageSrc("/images/home/healthcare-conference.jpg"),
  },
  {
    id: "india-specialist-visit-program",
    title: "India Specialist Visit Program",
    summary:
      "A doctor engagement program designed to support hospital collaboration, second-opinion pathways, and patient referral readiness.",
    location: "New Delhi, India",
    dateLabel: "July 04-07, 2026",
    href: "/hospital-partnerships",
    ctaLabel: "Discuss collaboration",
    image: getLegacyImageSrc("/images/home/hospital-partnership-meeting.jpg"),
  },
  {
    id: "transplant-awareness-camp",
    title: "Transplant Awareness and Family Support Camp",
    summary:
      "Patient awareness programming focused on transplant education, treatment readiness, and cross-border care navigation.",
    location: "Samarkand, Uzbekistan",
    dateLabel: "August 12, 2026",
    href: "/medical-tourism",
    ctaLabel: "Open patient inquiry",
    image: getLegacyImageSrc("/images/home/surgery-treatment-support.jpg"),
  },
  {
    id: "medical-camp-and-screening-day",
    title: "Medical Camp and Screening Day",
    summary:
      "A healthcare outreach event centered on patient awareness, diagnostics, and early coordination pathways into specialist care.",
    location: "Bukhara, Uzbekistan",
    dateLabel: "September 05, 2026",
    href: "/contact",
    ctaLabel: "Get updates",
    image: getLegacyImageSrc("/images/home/global-patient-assistance.jpg"),
  },
];

export const fallbackHomepageBlogs: HomepageEditorialBlog[] = [
  {
    id: "medical-tourism-updates",
    title: "Medical tourism updates shaping international patient expectations",
    excerpt:
      "How stronger communication, pre-arrival planning, and cleaner case routing improve confidence for cross-border care journeys.",
    publishedAt: "May 12, 2026",
    href: "/blog",
    image: getLegacyImageSrc("/images/blog/healthcare-news-02.jpg"),
    category: "Medical Tourism",
  },
  {
    id: "cancer-treatment-breakthroughs",
    title: "Cancer treatment breakthroughs and what they mean for patient coordination",
    excerpt:
      "A clearer view of why oncology pathways now require better specialist access, faster review cycles, and stronger international support.",
    publishedAt: "May 08, 2026",
    href: "/blog",
    image: getLegacyImageSrc("/images/blog/cancer-breakthrough.jpg"),
    category: "Oncology",
  },
  {
    id: "transplant-innovations",
    title: "Transplant innovations improving complex care planning",
    excerpt:
      "What modern transplant workflows demand from international hospital communication, family preparation, and treatment logistics.",
    publishedAt: "May 02, 2026",
    href: "/blog",
    image: getLegacyImageSrc("/images/blog/transplant-innovation.jpg"),
    category: "Transplants",
  },
  {
    id: "hospital-partnership-news",
    title: "Hospital partnership news across international patient services",
    excerpt:
      "Why hospital collaboration models increasingly depend on premium patient handling, referral structure, and coordination quality.",
    publishedAt: "April 26, 2026",
    href: "/blog",
    image: getLegacyImageSrc("/images/blog/hospital-partnership-news.jpg"),
    category: "Partnerships",
  },
];
