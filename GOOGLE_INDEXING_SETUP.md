# Google Search Console Setup & Indexing Guide

**Website:** medpobedagroup.uz

This guide explains how to set up Google Search Console for MedPobeda Group website and submit it for indexing.

---

## Step 1: Prepare Your Domain

Before starting in Google Search Console, ensure:

✅ **Domain Setup:**
- [ ] Domain is registered and active: `medpobedagroup.uz`
- [ ] Website is live and accessible globally
- [ ] SSL certificate is installed (HTTPS)
- [ ] Website robots.txt is in place: `https://medpobedagroup.uz/robots.txt`
- [ ] Sitemap is generated: `https://medpobedagroup.uz/sitemap.xml`

✅ **Verification Meta Tag:**
- [ ] Google Site Verification meta tag is added to the website head:
  ```
  google-site-verification=cnane2mjoJ062ZlXCGD8KaB7Y6tLzdutA92GvMVR1es
  ```
  This should be in `/app/layout.tsx` in the metadata object's `verification` field.

---

## Step 2: Add Property in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add property"** in the top left
3. Choose property type:
   - **Domain property** (recommended for larger coverage):
     - Enter: `medpobedagroup.uz`
     - This covers all subdomains and protocols
   - **URL prefix** (alternative if domain verification fails):
     - Enter: `https://medpobedagroup.uz/`

---

## Step 3: Verify Domain Ownership

### Method 1: DNS TXT Record (Recommended for Domain Property)

1. Google will provide a DNS TXT record like:
   ```
   v=spf1 include:_domainkey.medpobedagroup.uz ~all
   ```

2. Log into your domain registrar (where medpobedagroup.uz is registered)

3. Go to DNS settings/Records section

4. Add a new TXT record:
   - **Name:** `@` or `medpobedagroup.uz` (depends on registrar)
   - **Value:** Copy the exact TXT record Google provided
   - **TTL:** 3600 (or default)

5. Wait for DNS propagation (5-30 minutes typically)

6. Return to Google Search Console and click **"Verify"**

### Method 2: Meta Tag (Already Implemented)

If DNS verification fails, use the meta tag method:

1. Google Search Console will show a meta tag
2. This is already added to your website at `/app/layout.tsx`
3. Click **"Verify"** in Google Search Console
4. Google will check if the meta tag appears on your home page

### Method 3: HTML File Upload

If neither above works:

1. Download the HTML file provided by Google Search Console
2. Upload to your website root: `https://medpobedagroup.uz/google[hash].html`
3. Click **"Verify"** in Google Search Console

---

## Step 4: Submit Sitemap

After verification is complete:

1. In Google Search Console, go to **"Sitemaps"** section (left sidebar)
2. Enter your sitemap URL:
   ```
   https://medpobedagroup.uz/sitemap.xml
   ```
3. Click **"Submit"**

**What the sitemap includes:**
- Home page for all 7 locales: `/en`, `/uz`, `/ky`, `/kk`, `/tg`, `/tk`, `/ru`
- All public pages repeated for each locale
- Medical tourism and treatment pages
- Legal pages: Privacy Policy, Terms, Medical Disclaimer, Cookie Policy
- Company pages: About, Company Profile, Press
- Blog posts (if published)
- All specialty referral pages

**Sitemap does NOT include:**
- `/admin` routes
- `/api` routes
- Private pages
- Unpublished content

---

## Step 5: Inspect Core URLs

1. Go to **"URL Inspection"** tool in Google Search Console (top search bar)
2. Test these key URLs:

**Home pages (each locale):**
- [ ] `https://medpobedagroup.uz/en`
- [ ] `https://medpobedagroup.uz/uz`
- [ ] `https://medpobedagroup.uz/ru`

**Core service pages:**
- [ ] `https://medpobedagroup.uz/en/medical-tourism`
- [ ] `https://medpobedagroup.uz/en/hospital-partnerships`
- [ ] `https://medpobedagroup.uz/en/international-patients`
- [ ] `https://medpobedagroup.uz/en/student-mobility`

**Legal pages:**
- [ ] `https://medpobedagroup.uz/en/privacy-policy`
- [ ] `https://medpobedagroup.uz/en/terms`
- [ ] `https://medpobedagroup.uz/en/medical-disclaimer`
- [ ] `https://medpobedagroup.uz/en/cookie-policy`

**Action:** For each URL, click **"Inspect"** and verify:
- ✅ URL is indexable
- ✅ No blocked resources
- ✅ No robots.txt blocking
- ✅ Canonical URL is correct
- ✅ Mobile-friendly
- ✅ Structured data is present

---

## Step 6: Request Indexing

For each important URL:

1. Use the **"URL Inspection"** tool
2. Copy the URL you want to index
3. Paste it in the search bar
4. Click **"Test live URL"** to verify it's accessible
5. If status is "URL not on Google," click **"Request indexing"**

**Prioritize indexing:**
1. Home pages (all locales)
2. Medical tourism pages
3. Hospital partnerships page
4. International patients page
5. Legal pages

---

## Step 7: Monitor Coverage & Errors

1. Go to **"Coverage"** section in Google Search Console
2. Check for:
   - **Valid pages:** Should include all public routes
   - **Errors:** Fix any blocked or excluded pages
   - **Warnings:** Address excluded pages if they should be indexed
   - **Excluded:** Verify admin/api routes are excluded

**What you should see:**
- ✅ All 7 locales indexed
- ✅ All service pages indexed
- ✅ All legal pages indexed
- ✅ No errors or warnings
- ✅ Admin/API routes excluded

---

## Step 8: Monitor Search Performance

1. Go to **"Performance"** section
2. Monitor:
   - **Clicks:** How many users click from Google to your site
   - **Impressions:** How many times your site appears in search
   - **Average CTR:** Click-through rate
   - **Average Position:** Average ranking position

**Initial expectations:**
- First 4 weeks: Limited data
- Month 2-3: Increased impressions as Google crawls
- Month 3+: Increased clicks as ranking improves

---

## Step 9: Monitor Indexing Status

1. Go to **"Index Coverage"** report
2. Verify status over time:
   - Week 1: Some pages may not be indexed
   - Week 2: Most pages should be indexed
   - Week 4: All public pages should be indexed

**If pages not indexed after 4 weeks:**
- Check robots.txt blocking: `https://medpobedagroup.uz/robots.txt`
- Check for meta robots noindex tags
- Submit sitemap again
- Use URL Inspection to manually request indexing

---

## Step 10: Verify robots.txt

1. In Google Search Console, go to **"Settings"** > **"Crawl"** > **"robots.txt tester"**
2. Verify that:
   - ✅ Public pages are **Allow**ed
   - ✅ Admin routes are **Disallow**ed:
     - `/admin`
     - `/api`
     - `/dashboard`
   - ✅ Sitemap is referenced

Current robots.txt location:
```
https://medpobedagroup.uz/robots.txt
```

---

## Step 11: Set Preferred Domain

1. Go to **"Settings"**
2. Under "Your sites," verify the preferred version:
   - Choose: `https://medpobedagroup.uz/` (not `www` variant)
   - All canonical URLs should match this preference

---

## Step 12: Fix Common Issues

### Issue: "URL marked as 'noindex'"
- **Cause:** Meta tag or header blocking indexing
- **Fix:** Remove `noindex` from `/app/layout.tsx` or individual pages

### Issue: "Blocked by robots.txt"
- **Cause:** Route is in robots.txt disallow list
- **Fix:** Update `/app/robots.ts` to allow the route

### Issue: "Blocked by robots.txt, but allowed in Search Console"
- **Cause:** robots.txt file is blocking but you want to allow
- **Fix:** Update robots.txt rules and resubmit

### Issue: "Duplicate without user-selected canonical"
- **Cause:** Multiple versions of same page
- **Fix:** Verify canonical URLs are set in metadata

### Issue: "Soft 404 error"
- **Cause:** Page returns 200 status but is actually empty
- **Fix:** Verify all public pages have content

---

## Step 13: Ongoing Maintenance

**Weekly:**
- [ ] Check Google Search Console for new errors
- [ ] Review coverage report
- [ ] Check for crawl rate issues

**Monthly:**
- [ ] Review search performance trends
- [ ] Identify high-value keywords
- [ ] Check for new indexing issues
- [ ] Review competitor rankings

**Quarterly:**
- [ ] Audit all indexed URLs
- [ ] Refresh high-traffic pages
- [ ] Update metadata for better CTR
- [ ] Analyze search intent for new pages

---

## Important Notes

### Multilingual Seo:

Your website supports 7 locales:
- English (`/en`)
- Uzbek (`/uz`)
- Kyrgyz (`/ky`)
- Kazakh (`/kk`)
- Tajik (`/tg`)
- Turkmen (`/tk`)
- Russian (`/ru`)

**Each language version:**
- Has complete metadata and Open Graph tags
- Has canonical URLs pointing to itself
- Has hreflang links to alternate language versions
- Is included in the sitemap
- Should be indexed independently

### Verification Status:

Your website was verified on: **May 18, 2026**

Verification method: **Meta tag (in HTML head)**

Meta tag value:
```
google-site-verification=cnane2mjoJ062ZlXCGD8KaB7Y6tLzdutA92GvMVR1es
```

### Robots.txt Configuration:

Your robots.txt file at `https://medpobedagroup.uz/robots.txt`:
- Allows public website pages
- Blocks admin routes: `/admin`, `/api`, `/dashboard`
- References sitemap: `https://medpobedagroup.uz/sitemap.xml`
- Provides rules for all search engines

---

## Troubleshooting Checklist

Before contacting support:

- [ ] Website is live and accessible globally
- [ ] HTTPS is enabled
- [ ] No robots.txt blocking public pages
- [ ] No meta robots noindex tags on public pages
- [ ] Sitemap is valid at `/sitemap.xml`
- [ ] robots.txt is valid at `/robots.txt`
- [ ] Meta tag is present in HTML head
- [ ] At least 24 hours have passed since submission

---

## Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Search Central Blog](https://developers.google.com/search/blog)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [URL Inspection API](https://developers.google.com/search/apis/indexing-api/v3)

---

## Summary

✅ **What's Been Set Up:**
1. Google Site Verification meta tag added
2. Dynamic sitemap.xml created with all public pages
3. robots.txt configured for public pages
4. 7 language versions supported
5. Structured data (JSON-LD) added
6. Legal pages created (Privacy, Terms, Disclaimer, Cookies)
7. 404 page created
8. Footer updated with legal links

✅ **What You Need to Do:**
1. Add property in Google Search Console
2. Verify domain ownership (DNS or meta tag)
3. Submit sitemap
4. Inspect core URLs
5. Request indexing for important pages
6. Monitor coverage and performance reports
7. Fix any reported issues
8. Track search performance over time

**Expected Timeline:**
- Days 1-7: Initial crawling and indexing begins
- Days 7-30: Most pages should be indexed
- Days 30-90: Meaningful search impressions and clicks
- Days 90+: Ranking improvement as authority builds

---

*Last Updated: May 18, 2026*
*Website: https://medpobedagroup.uz*
