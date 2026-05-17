export const siteConfig = {
  name: "MedPobeda Group",
  shortName: "MedPobeda",
  tagline: "Medical Tourism • International Patient Support • Healthcare Partnerships",
  description:
    "MedPobeda Group facilitates international healthcare collaboration, medical tourism, hospital partnerships, patient coordination, student mobility, and clinical collaboration across Uzbekistan, India, and partner institutions.",
  location: "Tashkent, Uzbekistan",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "",
  telegramHandle: process.env.NEXT_PUBLIC_TELEGRAM_HANDLE ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/medical-tourism", label: "Medical Tourism" },
    { href: "/hospitals", label: "Hospitals" },
    {
      href: "/international-patients",
      label: "International Patients",
    },
    { href: "/hospital-partnerships", label: "Partnerships" },
    { href: "/student-mobility", label: "Student Mobility" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footerNavigation: [
    { href: "/", label: "Home" },
    { href: "/medical-tourism", label: "Medical Tourism" },
    { href: "/hospitals", label: "Hospitals" },
    { href: "/hospital-partnerships", label: "Partnerships" },
    { href: "/international-patients", label: "International Patients" },
    { href: "/student-mobility", label: "Student Mobility" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legalNavigation: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
  ],
  socialPlaceholders: ["LinkedIn", "X", "YouTube"],
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
  "/hospitals",
  "/medical-tourism",
  "/hospital-partnerships",
  "/international-patients",
  "/student-mobility",
  "/contact",
  "/privacy-policy",
  "/terms",
] as const;
