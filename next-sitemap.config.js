/**
 * Next.js Sitemap Configuration
 * Generates sitemap.xml and robots.txt for SEO.
 */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://medpobeda-group.vercel.app",
  generateRobotsTxt: true,
  // Change the default changefreq and priority if needed
  // changefreq: "daily",
  // priority: 0.7,
  sitemapSize: 7000,
  // Exclude specific routes if necessary
  // exclude: ["/admin/*"],
};
