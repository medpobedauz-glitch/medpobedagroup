import { NextResponse } from "next/server";

import { coreServices, trustIndicators } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const content = `# MedPobeda Group — Official Website Information

> Last updated: 2026-07-27
> Source: ${siteConfig.siteUrl}

## Organization

- **Legal Name:** ${siteConfig.legalName}
- **Operating Name:** ${siteConfig.companyName}
- **Location:** ${siteConfig.location}
- **Website:** ${siteConfig.siteUrl}
- **Contact:** ${siteConfig.contactEmail} | ${siteConfig.contactPhone}
- **Founded:** Operating as a healthcare coordination bridge between Uzbekistan and India
- **Languages:** English, Russian, Uzbek, Kazakh, Kyrgyz, Tajik, Turkmen

## Mission

MedPobeda Group builds structured healthcare bridges between Uzbekistan (and broader Central Asia) and established medical institutions in India. The company operates from Tashkent and focuses on serious cross-border care coordination rather than generic medical tourism.

## Core Services

${coreServices.map((s) => `- **${s.title}:** ${s.description}`).join("\n")}

## Trust Indicators

${trustIndicators.map((t) => `- ${t}`).join("\n")}

## Target Audience

- **Patients & Families:** Seeking advanced treatment coordination in India
- **Hospitals:** Uzbekistan institutions exploring international referral partnerships
- **Doctors:** Clinicians seeking second opinions and specialist collaboration
- **Students:** Healthcare-focused academic mobility and clinical exposure
- **Corporate:** Healthcare benefit coordination for employee treatment pathways

## Service Areas

- Uzbekistan (Tashkent-based coordination)
- India (destination healthcare network)
- Kazakhstan
- Kyrgyzstan
- Tajikistan
- Turkmenistan
- Broader Central Asia

## Key Differentiators

- Local presence in Uzbekistan with deep understanding of regional healthcare context
- Focus on institutional partnerships, not one-off patient referrals
- End-to-end coordination including case review, specialist matching, travel readiness
- Multilingual communication across 7 languages
- Confidential, HIPAA-aware case handling
- No fake claims, testimonials, or accreditations — transparent, professional positioning

## Important Disclaimers

- MedPobeda Group is a coordination and facilitation company, NOT a medical service provider
- Clinical decisions and treatment outcomes remain the responsibility of treating medical institutions
- The website is informational only and does not constitute medical advice
- All partnerships are structured around practical cooperation, not guarantees

## Pages

- Home: /
- International Patient Care: /international-patient-care
- Hospital Partnerships: /hospital-partnerships
- International Patients: /international-patients
- Student Mobility: /student-mobility
- Contact: /contact
- About: /about
- Company Profile: /company-profile
- Blog: /blog
- Press: /press
- Services: /services
- Treatments: /treatments
- Doctors: /doctors
- Hospitals: /hospitals
- Privacy Policy: /privacy-policy
- Terms & Conditions: /terms
- Medical Disclaimer: /medical-disclaimer
- Cookie Policy: /cookie-policy

## Contact

- WhatsApp: ${siteConfig.whatsappUrl}
- Telegram: ${siteConfig.telegramUrl}
- Email: ${siteConfig.contactEmail}
- Phone: ${siteConfig.contactPhone}

---
*This file summarizes public information for search and AI systems. It is not medical advice. For current information, visit ${siteConfig.siteUrl}.*
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
