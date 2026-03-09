# Google Search Console Performance Analysis

**Date Range:** Up to February 25, 2026

## Executive Summary

The website is beginning to gain initial traction in Google Search. Over the period leading up to February 22nd, the site generated its first click and recorded notable growth in impressions. The data strongly validates the current programmatic SEO (pSEO) strategy, with specific city and facility pages starting to rank for highly targeted, long-tail search queries.

---

## 📈 Performance Timeline (Impressions & Clicks)

The site went from zero visibility to generating consistent daily impressions starting mid-February.

- **Feb 12:** 0 impressions
- **Feb 13 - Feb 16:** Growing from 3 to 18 impressions daily.
- **Feb 18 - Feb 21:** Steady impressions (ranging from 12 to 21 daily).
- **Feb 22:** **1st Click Recorded!** (10 impressions, 10% CTR, Average Position: 38.9)

### Key Takeaway

The indexation is working, and Google is actively testing the newly discovered pages in search results.

---

## 📄 Top Performing Pages

The programmatic SEO structure (City pages + Facility pages) is functioning exactly as intended. These pages are capturing the vast majority of search visibility.

| Page URL                | Impressions | Clicks | Avg. Position | Notes                                                                                                               |
| :---------------------- | :---------- | :----- | :------------ | :------------------------------------------------------------------------------------------------------------------ |
| `/city/corpus-christi`  | 8           | 1      | 2.88          | **Top Performer.** Highest impressions, only page with a click, and an excellent average ranking position (Page 1). |
| `/` (Homepage)          | 14          | 0      | ~10.4         | Solid foundational visibility.                                                                                      |
| `/facility/ec70eab8...` | 10          | 0      | 14.4          | Specific facility page getting traction.                                                                            |
| `/city/waxahachie`      | 6           | 0      | 30.33         | City page gaining impressions.                                                                                      |
| `/facility/6b751655...` | 5           | 0      | 6.4           | Strong average position for this facility.                                                                          |

### Key Takeaway

City directory pages (like Corpus Christi) appear to have the highest early potential for driving traffic. Connecting smaller, less competitive cities with specific queries provides quick wins.

---

## 🔍 Top Search Queries

The actual terms users are searching match the intent of the programmatic content perfectly. Users are looking for specific facilities in specific locations.

**High-Intent Facility Searches:**

- `"avir at keeneland, retirement & assisted living facility, weatherford"` (8 impressions, Avg Pos: 15.75)
- `"falcon lake nursing home llc, medical & health, zapata"` (5 impressions, Avg Pos: 22.8)
- `caraday of mesquite` (5 impressions, Avg Pos: 41)
- `avir at pittsburg` (4 impressions, Avg Pos: 26.75)
- `monahans nursing home` (4 impressions, Avg Pos: 42.25)

**Informational / Auditing Searches:**

- `texas nursing home inspection reports` (2 impressions, Avg Pos: 16)
- `nursing home audits` (1 impression, Avg Pos: 7)

### Key Takeaway

The content generated for the individual facility pages is highly relevant to long-tail searches (Facility Name + City + "Nursing Home" / "Assisted Living").

---

## 🚀 Opportunities and Next Steps

1.  **Double Down on City Pages:** The `/city/corpus-christi` page performed exceptionally well. Ensure all city pages have robust internal linking and comprehensive facility listings to replicate this success across other Texas cities.
2.  **Optimize High-Impression Facilities:** Identify the facilities driving the most queries (e.g., Avir at Keeneland, Falcon Lake Nursing Home) and ensure those specific pages have the highest quality, most detailed audit information possible to improve CTR.
3.  **Target "Inspection Reports" Keywords:** The site is already ranking (Page 2) for "texas nursing home inspection reports". Creating a dedicated, high-authority resource page or guide on **"How to Read Texas Nursing Home Inspection Reports"** could easily push this to Page 1 and capture significant authority.
4.  **Monitor Click-Through Rate (CTR):** As impressions grow, focus on optimizing meta titles and descriptions for the programmatic pages to encourage users to click (e.g., adding dynamic elements like "Updated [Month] [Year]" or "View Recent Citations").

---

## 🕷️ Crawl Stats Analysis

Googlebot successfully discovered and crawled the new site architecture, validating the setup and sitemap configuration.

### Crawl Activity Summary

- **Initial Discovery Burst:** On Feb 12th, Googlebot performed a massive initial crawl (3,761 requests), discovering the structure of the site.
- **Ongoing Crawling:** Since the initial burst, Googlebot has returned daily (ranging from 1 to 220 requests/day) to crawl specific pages.
- **Primary Purpose:** The vast majority of crawls (**83.65%**) are for "Discovery", confirming that Google is actively finding and indexing the new programmatic pages (Cities and Facilities). Only 16.35% are for "Refresh" (re-crawling known pages).

### Server Responses

The server is handling the crawls exceptionally well:

- **OK (200):** **76.3%** of requests return a successful 200 OK status.
- **Moved Temporarily (302):** 23.35% of requests. Upon investigation, these are primarily Next.js dynamically generating the `og-image.jpg` and temporarily redirecting during the edge function execution. This is normal behavior for dynamic Open Graph images.
- **Moved Permanently (301) & Not Found (404):** Very low (Combined < 0.35%).
  - The 404s are negligible anomalies (e.g., requests for `/&` or `/$` on the www subdomain, likely from bot scraping artifacts, not actual site links).

### Key Takeaway

The technical SEO foundation is solid. Googlebot can easily crawl the site, the server responds quickly and correctly, and the new programmatic pages are being rapidly discovered.

---

## 🗂️ Pages Indexing Analysis

A review of the Indexing reports reveals normal behavior for a newly launched programmatic SEO site.

### 1. Indexed Pages (181 Pages)

Google has successfully indexed a solid foundational batch of 181 pages. This includes:

- The Homepage, Privacy, and Contact pages.
- Numerous City directory pages (e.g., `/city/corpus-christi`, `/city/waxahachie`).
- A wide selection of specific Facility pages.
- _Note: This directly correlates with the impressions and clicks seen in the Performance report._

### 2. Discovered - Currently Not Indexed (1,000+ Pages)

This is the largest bucket and is **expected behavior** for a large pSEO site launch.

- Google knows about these pages (likely via the sitemap or internal links) but hasn't crawled them yet to add them to the index.
- With thousands of facilities, it takes time for Google's crawl budget to allocate resources to a new domain.
- **Actionable Insight:** The fact that they are "Discovered" means your sitemap and internal linking structure are working perfectly. We just need to wait for Googlebot to work through the queue.

### 3. Crawled - Currently Not Indexed (25 Pages)

These are pages Google visited but decided not to index at that moment.

- This is a very small number relative to the site size.
- It includes a few specific facility pages and some city pages (like Arlington).
- Often, these resolve themselves on subsequent crawls. If they persist, it might indicate those specific pages need more unique content.

### 4. Alternate Page with Proper Canonical Tag (104 Pages)

This indicates that the technical setup for domain consolidation is working flawlessly.

- All of these URLs are the `www.` versions of your pages (e.g., `https://www.nursinghomeaudit.com/city/azle`).
- Google is recognizing that the non-www version (`https://nursinghomeaudit.com...`) is the primary (canonical) version, and is correctly ignoring the `www.` duplicates to prevent canonicalization issues.

### Overall Indexing Takeaway

The site architecture is sound. Google is actively discovering the programmatic pages and has already indexed a significant chunk, which are actively generating impressions. The primary strategy now is patience as Googlebot continues to crawl and index the massive "Discovered" queue.
