---
name: seo-audit
description: >
  Full website SEO audit with parallel subagent delegation. Crawls up to 500
  pages, detects business type, delegates to 6 specialists, generates health
  score. Use when user says "audit", "full SEO check", "analyze my site",
  or "website health check".
---

# Full Website SEO Audit

## Process

1. **Fetch homepage** — retrieve HTML of the main page
2. **Detect business type** — analyze homepage signals to categorize
3. **Analyze site** — follow internal links to crawl pages
4. **Delegate to subagents** (if available, otherwise run inline sequentially):
   - `seo-technical` — robots.txt, sitemaps, canonicals, Core Web Vitals, security headers
   - `seo-content` — E-E-A-T, readability, thin content, AI citation readiness
   - `seo-schema` — detection, validation, generation recommendations
   - `seo-sitemap` — structure analysis, quality gates, missing pages
   - `seo-performance` — LCP, INP, CLS measurements
   - `seo-visual` — screenshots, mobile testing, above-fold analysis
5. **Score** — aggregate into SEO Health Score (0-100)
6. **Report** — generate prioritized action plan

## Scoring Weights

| Category | Weight |
|----------|--------|
| Technical SEO | 25% |
| Content Quality | 25% |
| On-Page SEO | 20% |
| Schema / Structured Data | 10% |
| Performance (CWV) | 10% |
| Images | 5% |
| AI Search Readiness | 5% |

## Report Structure

### Executive Summary
- Overall SEO Health Score (0-100)
- Business type detected
- Top critical issues
- Top quick wins

### Technical SEO
- Crawlability issues
- Indexability problems
- Security concerns
- Core Web Vitals status

### Content Quality
- E-E-A-T assessment
- Thin content pages
- Duplicate content issues
- Readability scores

### On-Page SEO
- Title tag issues
- Meta description problems
- Heading structure
- Internal linking gaps

### Schema & Structured Data
- Current implementation
- Validation errors
- Missing opportunities

### AI Search Readiness
- Citability score
- Structural improvements
- Authority signals

## Priority Definitions

- **Critical**: Blocks indexing or causes penalties (fix immediately)
- **High**: Significantly impacts rankings (fix within 1 week)
- **Medium**: Optimization opportunity (fix within 1 month)
- **Low**: Nice to have (backlog)
