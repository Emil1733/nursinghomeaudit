# Changelog - March 9, 2026

## SEO & AI Optimization Sprint

### 1. Google Search Console (GSC) API Integration

- **New Feature**: Automated GSC data retrieval via official API.
- **Files Created**:
  - `web/gscanalyses/fetch_gsc_data.ts`: Main fetcher script for Queries, Pages, Countries, and Devices.
  - `web/gscanalyses/debug_sites.ts`: Utility for verifying property permissions.
- **Security**: Updated `.gitignore` to prevent leakage of `gsc-credentials.json`.
- **Property**: Configured to target `sc-domain:nursinghomeaudit.com`.

### 2. AI Citation Optimization (AIO)

Implemented technical markers to transform pages into "primary sources" for LLMs (Bing Copilot, ChatGPT).

- **JSON-LD Schema**: Injected `NursingHome` structured data into facility pages, including safety scores and citation counts.
- **Facility FAQ**: Created `web/src/components/facility/FacilityFAQ.tsx`.
  - Generates dynamic, high-intent safety questions and answers.
  - Implements `FAQPage` schema to capture AI overviews.
- **Semantic Enhancement**: Modified `SafetyPulse.tsx` to include `itemProp` descriptors (`description`, `reviewAspect`), making AI Pulse summaries "quotable" by search bots.

### 3. Data Synthesis

- **GSC Analysis**: Verified 181 pages indexed + 1,000+ discovered. Identified Page 1 rankings for Waco, Corpus Christi, and Marshall.
- **Bing AI Audit**: Confirmed the site is a Citation Source for Copilot, specifically the Resident Rights page (16 citations).

### 4. Technical Validation

- Clean production build (`npm run build`) passed with zero errors.
- Verified schema and semantic tag integration via local audit.
