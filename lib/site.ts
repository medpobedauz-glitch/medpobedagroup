import enMessages from "@/messages/en.json";
import { siteConfig as baseSiteConfig } from "@/lib/site-config";

const siteUrl = baseSiteConfig.website.startsWith("http")
  ? baseSiteConfig.website
  : `https://${baseSiteConfig.website}`;

export const siteConfig = {
  ...baseSiteConfig,
  name: enMessages.site.name,
  legalName: baseSiteConfig.legalName,
  shortName: enMessages.site.shortName,
  tagline: enMessages.site.tagline,
  description: enMessages.site.description,
  socialPreviewAlt: enMessages.site.socialPreviewAlt,
  editorialTeam: enMessages.site.editorialTeam,
  defaultImageAlt: enMessages.site.defaultImageAlt,
  location: baseSiteConfig.location,
  siteUrl,
  whatsappNumber: baseSiteConfig.whatsapp,
  telegramHandle: baseSiteConfig.telegramPhone,
  contactEmail: baseSiteConfig.email,
  contactPhone: baseSiteConfig.phone,
} as const;

export function getWhatsAppUrl(message?: string) {
  if (siteConfig.whatsappUrl) {
    if (!message) {
      return siteConfig.whatsappUrl;
    }

    const separator = siteConfig.whatsappUrl.includes("?") ? "&" : "?";
    return `${siteConfig.whatsappUrl}${separator}text=${encodeURIComponent(message)}`;
  }

  if (!siteConfig.whatsappNumber) {
    return "";
  }

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${query}`;
}

export function getTelegramUrl(message?: string) {
  if (siteConfig.telegramUrl) {
    return siteConfig.telegramUrl;
  }

  if (!siteConfig.telegramHandle) {
    return "";
  }

  const encodedHandle = siteConfig.telegramHandle.replace(/^@/, "");
  if (!message) {
    return `https://t.me/${encodedHandle}`;
  }

  return `https://t.me/${encodedHandle}?text=${encodeURIComponent(message)}`;
}

export const publicRoutes = [
  "/",
  "/about",
  "/company-profile",
  "/hospitals",
  "/treatments",
  "/tremor",
  "/diseases",
  "/medical-tourism",
  "/medical-tourism-uzbekistan",
  "/treatment-in-india-from-uzbekistan",
  "/medical-tourism-tashkent",
  "/treatment-in-india-from-kazakhstan",
  "/treatment-in-india-from-kyrgyzstan",
  "/treatment-in-india-from-tajikistan",
  "/treatment-in-india",
  "/oncology-treatment-india",
  "/cardiology-treatment-india",
  "/organ-transplant-india",
  "/neurosurgery-treatment-india",
  "/orthopedic-treatment-india",
  "/second-medical-opinion-india",
  "/kims-hospitals-india",
  "/medical-visa-support",
  "/second-medical-opinion",
  "/oncology-referrals",
  "/cardiology-referrals",
  "/organ-transplant-coordination",
  "/air-ambulance-coordination",
  "/hospital-partnerships",
  "/international-patients",
  "/student-mobility",
  "/contact",
  "/blog",
  "/press",
  "/privacy-policy",
  "/terms",
  "/medical-disclaimer",
  "/cookie-policy",
  "/success-stories",
  "/faq",
  "/cost-guide",
  "/cost-calculator",
  "/team",
  "/why-india",
] as const;
