import "server-only";

import { allFAQs, faqCategories } from "@/lib/data/faqs";
import { costGuideCategories, costGuideData } from "@/lib/data/cost-guide";
import { medicalSpecialties } from "@/lib/medical-specialties";

export type PublicSearchItemType =
  | "page"
  | "treatment"
  | "cost"
  | "faq"
  | "specialty";

export type PublicSearchItem = {
  id: string;
  type: PublicSearchItemType;
  title: string;
  description: string;
  href: string;
  category?: string;
  keywords: string[];
  badge?: string;
};

const STATIC_PAGES: PublicSearchItem[] = [
  {
    id: "page-home",
    type: "page",
    title: "Home",
    description: "MedPobeda Group — international patient coordination and hospital partnerships.",
    href: "/",
    keywords: ["home", "main", "index", "medpobeda", "start"],
  },
  {
    id: "page-about",
    type: "page",
    title: "About MedPobeda",
    description: "Our story, principles, and the team behind every patient journey.",
    href: "/about",
    keywords: ["about", "company", "mission", "team", "values"],
  },
  {
    id: "page-treatments",
    type: "page",
    title: "Treatments",
    description: "Browse the full catalogue of treatments we coordinate across our partner hospitals.",
    href: "/treatments",
    keywords: ["treatments", "procedures", "catalog", "services"],
  },
  {
    id: "page-cost-guide",
    type: "page",
    title: "Cost Guide",
    description: "Transparent starting prices for 40+ medical procedures in India.",
    href: "/cost-guide",
    keywords: ["cost", "price", "pricing", "fees", "estimate", "guide"],
  },
  {
    id: "page-hospitals",
    type: "page",
    title: "Partner Hospitals",
    description: "JCI and NABH-accredited hospitals we coordinate with in India.",
    href: "/hospitals",
    keywords: ["hospitals", "partners", "jci", "nabh", "accredited"],
  },
  {
    id: "page-doctors",
    type: "page",
    title: "Doctors",
    description: "Specialists and surgeons available through MedPobeda coordination.",
    href: "/doctors",
    keywords: ["doctors", "physicians", "surgeons", "specialists"],
  },
  {
    id: "page-blog",
    type: "page",
    title: "Blog & Insights",
    description: "Treatment guides, patient stories, and healthcare coordination insights.",
    href: "/blog",
    keywords: ["blog", "articles", "insights", "guides", "news"],
  },
  {
    id: "page-faq",
    type: "page",
    title: "Frequently Asked Questions",
    description: "Answers to common questions about medical visas, costs, hospitals, and travel.",
    href: "/faq",
    keywords: ["faq", "questions", "answers", "help"],
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contact",
    description: "Get in touch with our patient coordination team.",
    href: "/contact",
    keywords: ["contact", "support", "reach", "message"],
  },
  {
    id: "page-success-stories",
    type: "page",
    title: "Patient Success Stories",
    description: "Real outcomes from patients we have supported.",
    href: "/success-stories",
    keywords: ["success", "stories", "testimonials", "patients", "reviews"],
  },
  {
    id: "page-why-india",
    type: "page",
    title: "Why India for Medical Treatment",
    description: "Why patients from Central Asia choose India for treatment.",
    href: "/why-india",
    keywords: ["why", "india", "reason", "benefit", "compare"],
  },
  {
    id: "page-medical-tourism",
    type: "page",
    title: "Medical Tourism to India",
    description: "End-to-end medical tourism coordination from Central Asia to India.",
    href: "/international-patient-care",
    keywords: ["medical tourism", "international", "treatment abroad"],
  },
  {
    id: "page-hospital-partnerships",
    type: "page",
    title: "Hospital Partnerships",
    description: "Partnership programme for Indian hospitals seeking Central Asian patient flow.",
    href: "/hospital-partnerships",
    keywords: ["partnership", "hospitals", "collaboration", "b2b"],
  },
  {
    id: "page-student-mobility",
    type: "page",
    title: "Student Mobility",
    description: "Clinical exposure and training programmes for medical students.",
    href: "/student-mobility",
    keywords: ["students", "mobility", "training", "clinical", "exchange"],
  },
  {
    id: "page-second-opinion",
    type: "page",
    title: "Second Medical Opinion",
    description: "Get a second opinion from a specialist before committing to treatment.",
    href: "/second-medical-opinion",
    keywords: ["second opinion", "review", "specialist", "consultation"],
  },
  {
    id: "page-air-ambulance",
    type: "page",
    title: "Air Ambulance Coordination",
    description: "Emergency medical evacuation and air ambulance services.",
    href: "/air-ambulance-coordination",
    keywords: ["air ambulance", "evacuation", "emergency", "medevac"],
  },
  {
    id: "page-visa",
    type: "page",
    title: "Medical Visa Support",
    description: "Medical visa invitation letters and document support.",
    href: "/medical-visa-support",
    keywords: ["visa", "documents", "invitation", "medical visa"],
  },
  {
    id: "page-uzbekistan",
    type: "page",
    title: "Medical Tourism from Uzbekistan",
    description: "Treatment coordination for patients travelling from Uzbekistan.",
    href: "/treatment-in-india-from-uzbekistan",
    keywords: ["uzbekistan", "tashkent", "central asia"],
  },
  {
    id: "page-kazakhstan",
    type: "page",
    title: "Medical Tourism from Kazakhstan",
    description: "Treatment coordination for patients travelling from Kazakhstan.",
    href: "/treatment-in-india-from-kazakhstan",
    keywords: ["kazakhstan", "almaty", "astana"],
  },
  {
    id: "page-kyrgyzstan",
    type: "page",
    title: "Medical Tourism from Kyrgyzstan",
    description: "Treatment coordination for patients travelling from Kyrgyzstan.",
    href: "/treatment-in-india-from-kyrgyzstan",
    keywords: ["kyrgyzstan", "bishkek"],
  },
  {
    id: "page-tajikistan",
    type: "page",
    title: "Medical Tourism from Tajikistan",
    description: "Treatment coordination for patients travelling from Tajikistan.",
    href: "/treatment-in-india-from-tajikistan",
    keywords: ["tajikistan", "dushanbe"],
  },
];

function buildCostItems(): PublicSearchItem[] {
  return costGuideData.map((item) => ({
    id: `cost-${item.treatment.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    type: "cost",
    title: item.treatment,
    description: item.description,
    href: `/cost-guide#${item.treatment.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    category: item.category,
    keywords: [
      item.category.toLowerCase(),
      "cost",
      "price",
      item.treatment.toLowerCase(),
      ...item.includes.map((i) => i.toLowerCase()),
    ],
    badge: `From $${item.startingFromUSD.toLocaleString("en-US")}`,
  }));
}

function buildFaqItems(): PublicSearchItem[] {
  return allFAQs.map((item) => ({
    id: `faq-${item.id}`,
    type: "faq",
    title: item.question,
    description: item.answer.slice(0, 180).replace(/\s+\S*$/, "") + (item.answer.length > 180 ? "…" : ""),
    href: `/faq#${item.id}`,
    category: item.category,
    keywords: [item.category.toLowerCase(), "faq", "question", "answer", item.question.toLowerCase()],
    badge: item.category,
  }));
}

function buildSpecialtyItems(): PublicSearchItem[] {
  return medicalSpecialties.map((item) => ({
    id: `specialty-${item.id}`,
    type: "specialty",
    title: item.title,
    description: item.summary,
    href: `/treatments#${item.id}`,
    category: item.title,
    keywords: [item.title.toLowerCase(), "treatment", "specialty", ...item.support.map((s) => s.toLowerCase())],
    badge: "Specialty",
  }));
}

const ALL_ITEMS: PublicSearchItem[] = [
  ...STATIC_PAGES,
  ...buildCostItems(),
  ...buildFaqItems(),
  ...buildSpecialtyItems(),
];

function getSearchScore(query: string, values: Array<string | undefined | null>) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return 0;
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = values.filter(Boolean).join(" ").toLowerCase();
  if (!haystack) return 0;

  let score = 0;
  if (haystack === normalizedQuery) score += 200;
  if (haystack.startsWith(normalizedQuery)) score += 120;
  if (haystack.includes(normalizedQuery)) score += 80;

  for (const token of tokens) {
    if (haystack.startsWith(token)) score += 20;
    if (haystack.includes(token)) score += 12;
  }

  return score;
}

export function searchPublicContent(input: {
  query?: string;
  limit?: number;
  type?: PublicSearchItemType | "all";
}) {
  const query = (input.query ?? "").trim();
  const limit = input.limit ?? 12;
  const type = input.type ?? "all";

  if (query.length < 2) {
    // Empty query: return curated quick links.
    const quick: PublicSearchItem[] = [
      STATIC_PAGES.find((p) => p.id === "page-cost-guide")!,
      STATIC_PAGES.find((p) => p.id === "page-hospitals")!,
      STATIC_PAGES.find((p) => p.id === "page-faq")!,
      STATIC_PAGES.find((p) => p.id === "page-contact")!,
      STATIC_PAGES.find((p) => p.id === "page-why-india")!,
      STATIC_PAGES.find((p) => p.id === "page-second-opinion")!,
    ].filter(Boolean);
    return { items: quick, total: quick.length, query };
  }

  const filtered = type === "all" ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.type === type);

  const scored = filtered
    .map((item) => ({
      item,
      score: getSearchScore(query, [
        item.title,
        item.description,
        item.category,
        ...item.keywords,
      ]),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.title.localeCompare(b.item.title);
    })
    .slice(0, limit);

  return {
    items: scored.map((s) => s.item),
    total: scored.length,
    query,
  };
}

export const PUBLIC_SEARCH_STATS = {
  totalItems: ALL_ITEMS.length,
  staticPages: STATIC_PAGES.length,
  costItems: costGuideData.length,
  faqItems: allFAQs.length,
  specialtyItems: medicalSpecialties.length,
  faqCategories: faqCategories.length,
  costCategories: costGuideCategories.length,
};
