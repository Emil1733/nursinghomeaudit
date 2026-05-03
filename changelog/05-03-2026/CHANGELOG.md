# Changelog — May 3, 2026
**Session:** Post-GSC API Audit & Technical Remediation  
**Commit:** `912b69c` → `github.com/Emil1733/nursinghomeaudit`

---

## What Triggered This Session

A full GSC API pull was executed for **April 2 – April 30, 2026 (USA only)**. The data revealed a site that had completely stalled after a strong March. Every city page that was ranking in March (Waco Pos 2, Corpus Christi Pos 3.7) had vanished from the index entirely. Zero clicks across the entire month. Only 5 pages visible to Google out of 1,177 facilities.

A root cause investigation was run across: live HTTP responses, sitemap structure, robots.txt, canonical tags, `intelligence.json`, and Supabase query logic.

---

## Root Causes Found

### 1. `intelligence.json` — 897 Corrupted City Names (112 Cities Affected)
The `intelligence.json` file, which powers all city page aggregation, contained 897 facility records with inconsistent city casing. Cities were stored in mixed forms — `WACO`, `Waco`, and `waco` all existed simultaneously for the same city. The same was true for every major Texas city: Houston, San Antonio, Dallas, Fort Worth, Austin, El Paso, and 106 others.

**Impact:** `getCityData()` performs a slug-match lookup. When `intelligence.json` contains both `HOUSTON` and `Houston`, the lookup is non-deterministic. Depending on which key the JavaScript runtime encounters first, city pages either return partial data or `null` (triggering a `notFound()` / 404). This is why city pages that ranked in March stopped working — they were serving 404s to Googlebot on re-crawl.

### 2. Supabase 1,000-Row Default Cap — 177 Facilities Silently Dropped
The `fetchAllFacilities()` function in `city-utils.ts` was calling Supabase without an explicit `.limit()`. Supabase's default row cap is 1,000 rows. With 1,177 facilities in the database, 177 were silently dropped from every request. This affected city aggregations, safety score calculations, violation counts, and facility list counts displayed on every city page. Houston, San Antonio, and Dallas — the three cities with the most facilities — were the most severely impacted.

### 3. Sitemap Filtering Out 177 Facilities
`sitemap.ts` was filtering facilities through `getFacilityIntel()` before including them in the sitemap. This meant any facility without an `intelligence.json` entry was excluded from the sitemap entirely. Those 177 facilities had zero chance of being discovered by Googlebot. Combined with the Supabase row cap, the sitemap was structurally incomplete.

---

## Changes Made

### `src/lib/intelligence.json`
- Ran city name normalization script across all 1,177 facility records
- Fixed 897 city name mismatches using Title Case normalization
- Applied special-case overrides for compound cities: `McAllen`, `New Braunfels`, `El Paso`, `Fort Worth`, `Sugar Land`, `League City`, `North Richland Hills`, etc.
- Result: **Zero duplicate city keys** across all 440 unique cities
- Backup saved at `src/lib/intelligence.json.bak`

### `src/lib/city-utils.ts`
- Added `.limit(2000)` to the Supabase `fetchAllFacilities()` query — all 1,177 facilities now load on every request
- Hardened `getCityData()` slug lookup: full normalization of incoming slug (lowercase, trim, hyphenate, decode `%20`) before comparison, preventing any silent null returns
- Added `console.warn()` when a city lookup fails, making future failures immediately visible in Vercel logs

### `src/app/sitemap.ts`
- Removed `getFacilityIntel()` filter — all 1,177 facilities now included in sitemap unconditionally
- Added `.limit(2000)` to the sitemap Supabase query
- Removed now-unused `getFacilityIntel` import
- **Sitemap URL count: 1,000 → 1,621** (1,177 facilities + 440 cities + 4 static pages)

### New Components Committed (from prior sprint)
- `src/app/api/chat/route.ts` — AI Dataset Interrogator chat API
- `src/components/chat/ChatPromptWrapper.tsx` — facility chatbot UI wrapper
- `src/components/chat/FacilityChatSidebar.tsx` — sidebar chat panel
- `src/components/facility/ExecutiveAbstract.tsx` — AI-generated facility summary header
- `src/components/facility/RedFlagSummary.tsx` — safety verdict component
- `src/components/facility/SafetyPulseDashboard.tsx` — production data dashboard

---

## Verification (Pre-Push)

| Check | Result |
|-------|--------|
| `intelligence.json` duplicate city keys | ✅ Zero remaining |
| `/city/waco` HTTP status | ✅ 200 OK, 63 facility links |
| `/city/houston` HTTP status | ✅ 200 OK, 171 facility links |
| `/sitemap.xml` URL count | ✅ 1,404 `<loc>` entries |
| TypeScript errors in app source | ✅ None (errors only in analysis scripts) |

---

## Expectations for the Next GSC Pull

**Pull window:** Recommend pulling again ~May 17–20, 2026 (give Google 2–3 weeks to re-crawl and re-index after the sitemap resubmission).

### What We Expect to See

#### 1. Pages Indexed: 5 → 50–150+
Google should begin discovering the full sitemap. The 1,621-URL sitemap is now clean and submitted. Expect a wave of new facility and city pages appearing in GSC within 10–14 days of Vercel deploy. If the number stays at 5, it signals a deeper crawl budget or server response time problem.

#### 2. City Pages Return to Index
Waco, Corpus Christi, Houston, Dallas, and San Antonio should reappear in impressions. Their pages are now returning correct, complete data and returning 200 status codes consistently. The honeymoon-style position boost may not return immediately, but they should at minimum be indexable again.

#### 3. Position Recovery for "Texas Nursing Home Inspection Reports"
This query was at Position 11.7 in March and fell to Position 17 in April with the homepage incorrectly winning. With city pages restored and serving correct content, Google has more signals to work with. Expect this query to stabilize in the 12–18 range at minimum.

#### 4. Facility Brand Name Queries Should Improve
Queries like `"advanced health & rehab center of garland"` (currently Pos 86) should begin moving into the 20–40 range as individual facility pages get properly crawled. These pages have the exact facility name, schema markup, violation data, and AI summaries — they should rank top 5 for their own name.

#### 5. Impression Volume: 75 → 150–300
With 1,621 URLs now in the sitemap vs. the previous incomplete version, and with city pages serving complete data, total monthly impressions should at minimum double. If the city pages return to their March performance levels, impressions could reach 300–500 for the month.

#### 6. Mobile Position Advantage Should Convert
The mobile avg position of 8.4 in April (Page 1) with zero clicks is the biggest unrealized opportunity. With correct page content now loading, click-through from mobile should begin. Even a 1–2% CTR on 11 mobile impressions is a click — and a click is the signal Google needs to lock in the ranking permanently.

### Red Flags to Watch For
- If pages indexed stays at 5 → server timeout issue still present (consider ISR over force-dynamic)
- If city pages return but at Position 40+ → content quality issue, need state hub page (`/texas`)
- If brand queries don't move → individual facility pages may need `noindex` removed or canonical issues remain
- If `www.nursinghomeaudit.com` URLs appear in GSC alongside non-www → canonical split resurfaced

---

## Next Recommended Actions (Before Next Pull)

| Priority | Action |
|----------|--------|
| 🚨 Immediate | Resubmit sitemap in GSC dashboard after Vercel deploy |
| 🔴 High | Create `/texas` state hub page targeting "texas nursing home inspection reports" |
| 🔴 High | Consider switching facility pages from `force-dynamic` to `revalidate = 3600` (ISR) to prevent Googlebot timeouts |
| 🟡 Medium | Rewrite city page meta titles to be more click-compelling on mobile |
| 🟡 Medium | Add internal links from homepage to top 10 city pages to distribute PageRank |
