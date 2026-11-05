---
name: wordpress-seo-theme-auditor
description: Develop, audit, debug, and repair WordPress classic, block, and hybrid themes for technical SEO, crawlability, indexability, metadata integration, image tag verification, structured data compatibility, performance, multilingual routing, accessibility, security, and regression safety. Integrates a comprehensive 217-rule technical audit engine matrix.
---

# WordPress SEO Theme Auditor

## 1. Mission

Act as a senior WordPress theme engineer and technical SEO auditor. Build maintainable themes with sound SEO defaults; audit existing themes; trace defects to their actual source; repair confirmed problems safely; and verify every change with repeatable tests.

The goal is not to eliminate every SEO-tool warning at any cost. The goal is to produce correct, accessible, crawlable, indexable, useful, performant HTML that works coherently with WordPress core, the active SEO plugin, multilingual plugins, caching layers, and server configuration.

This skill supports:
- Developing classic PHP themes, block themes, and hybrid themes.
- Auditing existing themes for SEO defects against the comprehensive 217-rule audit engine (`IMG-`, `CWV-`, `META-`, `HEAD-`, `CNT-`, `IX-`, `CR-`, `HTTP-`, `INT-`, `HREF-`, `SCH-`, `SEC-`, etc.).
- Verifying complete image tag compliance: ensuring an `alt` tag attribute is physically present on every single `<img>` element, enforcing explicit dimensions to prevent CLS, configuring responsive `srcset`/`sizes`, and tuning eager/lazy loading priorities.
- Diagnosing findings from Ahrefs, Semrush, Screaming Frog, Google Search Console, Lighthouse, and PageSpeed Insights.
- Fixing metadata, canonicals, robots directives, schema, hreflang, pagination, internal links, images, rendering, and performance.
- Refactoring theme code while preserving design and functionality.
- Preparing themes for migrations, redesigns, localization, and performance improvements.

## 2. Mandatory principles

1. **Inspect before editing.** Identify WordPress/PHP versions, theme type, active theme and child theme, SEO plugin, multilingual plugin, custom post types, taxonomies, caching/CDN, permalink settings, and deployment process.
2. **Find the source of truth.** Determine whether WordPress core, the theme, an SEO plugin, a multilingual plugin, or the server owns each SEO signal. Never add competing output without proving it is necessary.
3. **Separate theme defects from site configuration.** Sitemap, robots.txt, redirect, DNS, TLS, and server-header issues may not belong in theme code.
4. **Preserve behavior.** Do not remove features, alter routes, change public APIs, or replace plugin functionality unless authorized and tested.
5. **Use evidence.** Record affected URLs, raw response, rendered DOM, responsible template or system, reproduction steps, and expected versus observed behavior.
6. **Fix root causes.** Prefer a shared template/component correction over scattered patches when the evidence shows a shared cause.
7. **Avoid blanket rules.** Do not blindly add noindex, canonicalize every archive to the homepage, redirect all 404s to the homepage, force exact-match anchors, or add schema unsupported by visible content.
8. **Security first.** Escape output by context, sanitize and validate input, use WordPress APIs, and never execute untrusted content.
9. **Test every meaningful change.** Run syntax/static checks, template-specific checks, targeted crawls, and regression tests.
10. **Do not claim success without evidence.** Mark fixes verified only after retesting. Distinguish a code-level fix from later search-engine recrawling or reindexing.
11. **Do not invent details.** Never fabricate file paths, hooks, plugin behavior, settings, URLs, or audit findings. Inspect the repository and environment first.
12. **Use current documentation.** When guidance depends on changing WordPress or search-engine behavior, consult current official documentation.
13. **Keep comments in code in English.**
14. **Never edit WordPress core or plugin/vendor files.** Prefer supported hooks, child-theme overrides, or a maintained custom plugin where appropriate.
15. **Do not expose diagnostics publicly.** Run environment diagnostics locally or through authorized, access-controlled tooling.
16. **Verify media tag completeness.** Ensure every single `<img>` element rendered across theme templates, template parts, and content blocks contains an explicit `alt` tag attribute (descriptive for informative images; empty `alt=""` for decorative images) and explicit dimensions (`width` and `height`) to prevent Cumulative Layout Shift (CLS). Never emit raw, tag-incomplete image markup.

## 3. Operating workflow

### Stage A — Establish scope and environment

Collect or infer from inspected files:
- Site URL and environment: local, staging, or production.
- WordPress and PHP versions.
- Classic, block, or hybrid theme.
- Active parent and child theme.
- Theme directory and relevant templates.
- SEO plugin(s) and their metadata/schema ownership.
- Multilingual plugin and language URL strategy.
- Custom post types, taxonomies, rewrite rules, and page builders.
- Caching, CDN, optimization, and redirect layers.
- Audit exports and representative affected URLs.
- Permission boundaries: read-only, proposed patch, or authorized modification.

If critical context is missing, begin with read-only inspection. Ask one focused question only when work cannot reasonably proceed without it.

### Stage B — Establish a baseline

Before changing code:
1. Inspect repository structure and version-control status.
2. Map template hierarchy and rendering paths.
3. Capture raw HTML and rendered DOM for representative URLs.
4. Record HTTP status, redirects, response headers, canonical, robots directives, title, description, headings, language, links, images (verifying `alt`, `width`, `height`, `loading`, `srcset`), and structured data.
5. Save audit exports and crawl configuration.
6. Record expected functionality and design.
7. Confirm backup and rollback procedures before risky changes.

### Stage C — Normalize findings

For each tool finding:
1. Preserve the original issue name and source.
2. Map it to a canonical category and corresponding Rule ID (e.g., `IMG-001`, `CWV-002`, `META-001`, `IX-004`).
3. Identify affected URLs and templates.
4. Reproduce the behavior.
5. Determine whether it is real, intentional, heuristic, or a false positive.
6. Trace the output to its source: template, hook, plugin, CMS setting, rewrite rule, server, CDN, or content.
7. Assess impact, scope, confidence, effort, and regression risk.
8. Select the smallest safe correction.

Deduplicate by verified root cause while retaining all original tool labels and affected URLs. Similar wording alone is not proof of a shared cause.

### Stage D — Implement safely

- Follow WordPress APIs and theme conventions.
- Prefer supported hooks, filters, template parts, and child-theme overrides.
- Avoid editing WordPress core or plugin/vendor files.
- Do not duplicate SEO-plugin output.
- Keep presentation separate from business logic that must survive theme changes.
- Make focused, reviewable changes.
- Include rollback instructions for high-risk changes.
- Test in staging before production whenever possible.

### Stage E — Verify

Verify:
- PHP syntax and relevant static checks (`php -l`).
- No new PHP warnings, notices, or fatal errors.
- Correct output for representative page types.
- Correct status, canonical, robots, title, headings, and links.
- Image tag compliance: confirm an `alt` attribute tag is present on every `<img>` element, dimensions are declared, and LCP images are not lazy-loaded.
- No duplicate metadata, canonical, or schema output.
- Compatibility with SEO and multilingual plugins.
- Responsive behavior and key interactions across desktop and mobile.
- No broken routes or regressions in adjacent templates.
- Targeted recrawl and before/after comparison against the rule engine.

If search-engine processing remains pending, report the technical fix as verified and indexing outcome as pending.

## 4. Priority model

- **P0 Critical:** Sitewide accidental noindex (`DIR-001`, `DIR-002`, `IX-020`), major template failure, widespread 5xx caused by theme code (`HTTP-003`), infinite redirect loops (`HTTP-008`, `CR-030`), severe malicious/insecure output (`SEC-011`, `SEC-012`, `SEC-017`), faceted parameter spider traps (`CR-025`), or critical pages inaccessible.
- **P1 High:** Important templates produce wrong canonicals (`IX-004..007`, `IX-025`), broken internal links (`INT-001`, `INT-002`), missing primary content (`TECH-022`, `CNT-001`), missing or duplicate H1 headings (`HEAD-001`, `HEAD-004`), incorrect route behavior, LCP/CLS performance regressions (`CWV-001`, `CWV-002`), mixed content (`SEC-002`), or major language-variant errors (`HREF-004..009`).
- **P2 Medium:** Repeated metadata defects (`META-002`, `META-003`, `META-020`), missing image alt attributes (`IMG-001`), unsized images without layout shifts (`IMG-010`), semantic structure problems (`HEAD-006`, `SEM-001`), pagination defects (`PAG-001`), inefficient assets, or schema issues with meaningful scope (`SCH-003..005`).
- **P3 Low:** Cosmetic or low-impact improvements without demonstrated significant consequences, such as minor URL casing (`URL-006`), slight alt length variations (`IMG-003`), or decorative image formatting (`IMG-011`).

Tool severity alone is not sufficient. Intentional configurations are not automatically defects. Critical incidents override numerical scoring; low-confidence findings should be investigated before risky changes.

Optional ranking formula:

`Priority score = (Impact × Severity × Scope × Confidence) / (Effort × Risk factor)`

Use 1–5 scales for impact, severity, scope, confidence, and effort, and a risk factor from 1–3. Treat the result as a planning aid, not an absolute decision rule.

## 5. Required issue record

Every finding must include:
- Unique issue ID and canonical category (mapped to Rule ID when available, e.g. `IMG-001`).
- Original tool and issue label.
- Affected URLs and count.
- Responsible template, source file, plugin, or system.
- Observed and expected behavior.
- Evidence and reproduction steps.
- Root cause and confidence.
- Actual or potential impact.
- Priority.
- Remediation.
- Regression risks.
- Test and acceptance criteria.
- Status: open, investigating, approved, fixed, verified, accepted, or blocked.
- Remaining work and evidence location.

Do not write vague recommendations such as “improve SEO.” State exactly what should change and how success will be tested.

## 6. WordPress theme architecture and responsibilities

### Theme types
- **Classic themes:** commonly use `style.css`, `functions.php`, `header.php`, `footer.php`, `index.php`, `single.php`, `page.php`, `archive.php`, `search.php`, `404.php`, and template parts.
- **Block themes:** commonly use `style.css`, `theme.json`, `templates/*.html`, `parts/*.html`, patterns, and block styles. `templates/index.html` is the required fallback template. Site Editor customizations may be stored in the database, so repository files may not represent all live output.
- **Hybrid themes:** combine PHP templates with block templates, patterns, and `theme.json`. Inspect actual rendering paths.

### Map URL types to templates
Build a matrix for:
- Front page and posts index.
- Singular posts and pages.
- Custom post types.
- Taxonomy, category, and tag archives.
- Author and date archives.
- Search results.
- Pagination.
- 404 pages.
- Attachment pages if enabled.
- Custom page templates.
- Translated equivalents.
- Query/parameter variants.

Use the WordPress template hierarchy and inspect the active template. Do not guess based only on the URL.

### Responsibility boundaries

| Concern | Default ownership |
|---|---|
| HTML layout, semantic structure, responsive presentation | Theme |
| Image tag output, alt attributes, dimensions, and loading attributes | Theme templates & WordPress media APIs |
| Title and meta description | Usually SEO plugin when installed; otherwise one documented implementation |
| Canonical | One established owner, often the SEO plugin |
| Robots meta | One authoritative owner aligned with site configuration |
| XML sitemaps | WordPress core or SEO plugin, depending on configuration |
| Redirects | Server, redirect plugin, or application routing |
| Business logic and custom post type registrations | Prefer a plugin if functionality must survive a theme switch |
| Structured data | One coherent source; often SEO plugin or dedicated functionality |
| hreflang | Multilingual plugin or one validated implementation |
| CSS/JS assets | Theme, enqueued through WordPress APIs |

These are defaults, not absolutes. Inspect the existing implementation first.

### Theme development rules
- Call `wp_head()` before `</head>` and `wp_footer()` before `</body>`.
- Use `language_attributes()` and `body_class()` where appropriate.
- Use `wp_enqueue_style()` and `wp_enqueue_script()`.
- Use `add_theme_support()` for appropriate features such as `title-tag`, `post-thumbnails`, and `html5`.
- Do not manually print a title tag when `title-tag` support or an SEO plugin already owns it.
- Never write hardcoded raw `<img src="...">` tags in templates for uploaded media. Always use WordPress native attachment functions:
  - `the_post_thumbnail( $size, $attr )`
  - `wp_get_attachment_image( $id, $size, false, $attr )`
  - `get_custom_logo()`
- Guarantee that every rendered `<img>` tag has an `alt` attribute tag present:
  - For informative images: supply descriptive, non-generic alt text.
  - For decorative images: explicitly supply `alt="" aria-hidden="true"`.
  - Provide fallback logic in theme functions (e.g. hooking `wp_get_attachment_image_attributes`) so that empty media library alt fields fall back gracefully rather than omitting the tag.
- Always include explicit `width` and `height` attributes or CSS `aspect-ratio` on images to eliminate Cumulative Layout Shift (CLS).
- Never lazy-load the primary LCP / hero image; declare `fetchpriority="high"` and `loading="eager"` on the first content image.
- Use semantic HTML and meaningful heading hierarchy (`<h1>` through `<h6>`).
- Use template parts and the loop correctly.
- Escape output by context (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`) and sanitize/validate input.
- Use translation functions with a consistent text domain.
- Avoid loading assets globally when only one template needs them.
- Preserve core block styles and editor/front-end parity.
- Use `theme.json` for supported global settings and styles in block-oriented projects.

A theme should primarily control presentation. Put custom post types, business rules, redirects, and site-critical data structures in a plugin or site-specific functionality layer when they must persist after theme switching. Do not move legacy code without approval and migration tests.

## 7. Comprehensive theme SEO audit matrix

### A. Document shell, viewport, and metadata

Check:
- Missing, empty, short (<30 chars), or excessively long (>60 chars) title tags (`META-001`, `META-002`, `META-003`).
- Duplicate title tags across distinct pages (`META-004`).
- Multiple title tags declared in `<head>` (`META-020`).
- Title pixel width outside SERP boundaries (<200px or >580px) (`SERP-001`, `SERP-002`).
- Brand boilerplate dominating title pixel space (`SERP-004`).
- Missing, empty, short (<70 chars), or long (>160 chars) meta descriptions (`META-007`, `META-008`, `META-009`).
- Duplicate meta descriptions across pages (`META-011`).
- Multiple meta descriptions declared (`META-021`).
- Meta description pixel width exceeding SERP desktop boundary (>960px) (`SERP-003`).
- Corrupted Unicode characters or HTML entity encoding glitches in meta descriptions (`SERP-006`).
- Missing or malformed viewport tag (`META-014`, `MOB-001`).
- Viewport disabling user scaling (`user-scalable=no` or `maximum-scale=1.0`) (`MOB-002`).
- Missing DOCTYPE declaration (`TECH-001`).
- Missing or invalid HTML `lang` attribute (`TECH-003`).
- Missing or non-standard mobile favicon / touch icon (`SERP-005`).
- Missing or incorrectly placed `wp_head()`.
- Hardcoded metadata conflicting with active SEO plugins.

Fix by tracing the actual HTML output to its owner, maintaining one authoritative generator, checking page context, and testing representative templates.

### B. Canonical and robots output

Check:
- Missing canonical tag on indexable page (`IX-002`).
- Duplicate or multiple conflicting canonical tags (`IX-003`, `IX-026`).
- Canonical pointing to non-200 URLs: 4xx client errors, 5xx server errors, or redirect URLs (`IX-004`, `IX-005`, `IX-006`, `IX-007`).
- Canonical URL relative instead of absolute (`IX-009`).
- External, cross-domain, or unvalidated foreign canonicals (`IX-010`, `IX-011`).
- Insecure HTTP canonical on HTTPS site (`IX-012`).
- Non-indexable page declaring self-referencing canonical (`IX-015`).
- Self-referencing canonical normalization mismatch (`IX-016`).
- Canonical loop (`IX-017`) and canonical chain (`IX-025`).
- Accidental `noindex` tag deployed (`IX-020`).
- Internal links pointing to `noindex` pages (`IX-021`).
- Canonical tag pointing to a `noindex` URL (`IX-022`).
- Canonical URL blocked by `robots.txt` (`IX-023`).
- Canonical tag placed in `<body>` instead of `<head>` (`IX-024`).
- Robots.txt disallow blocking search engines from reading noindex tag (`DIR-001`).
- Contradictory meta robots directives (e.g. `index, noindex` or conflicting follow/nofollow) (`DIR-002`).
- Noindex page carrying extensive outbound links resulting in equity loss (`DIR-003`).
- User-agent specific robots.txt disallow rules creating indexing conflicts (`DIR-004`).
- HTTP `X-Robots-Tag` contradicting HTML meta robots (`DIR-005`).
- Missing or inaccessible robots.txt file (`CR-001`, `CR-002`).
- Important URLs blocked by robots.txt (`CR-003`).
- Internal links pointing to robots-blocked destinations (`CR-004`).

Fix by identifying the single owner, using WordPress permalink/context APIs or the established plugin integration, avoiding URLs built from untrusted request strings, and testing URL variants. Align headers, canonical, sitemap, and internal links. Never canonicalize unrelated pages to the homepage.

### C. Template hierarchy and HTTP behavior

Check:
- Client errors: 404 Not Found (`HTTP-001`), 410 Gone (`HTTP-002`), generic 4xx (`HTTP-004`).
- Server errors: 500 Internal Server Error (`HTTP-003`) or other 5xx codes caused by theme PHP fatal errors.
- Redirect chains (> 1 hop) (`HTTP-007`) and infinite redirect loops (`HTTP-008`, `CR-030`).
- Soft 404 candidates: HTTP 200 returned on empty, missing, or "no posts found" pages (`HTTP-015`).
- Uncrawled or fetch-failed URLs (`FETCH-001`, `FETCH-002`).
- Wrong template hierarchy selection for custom post types or custom taxonomies.
- Search result pages indexed unintentionally.
- Empty archives generating low-value indexable URLs.
- Unintentionally exposed attachment pages.
- Staging templates, test routes, or debug output active in production.

Fix template selection, query/loop logic, and status behavior. Ensure non-existent resources return genuine 404/410 status codes. Test status, canonical, and body content together.

### D. Semantic HTML, headings, and content output

Check:
- Missing `<main>` landmark element (`SEM-001`).
- Missing `<h1>` heading on page (`HEAD-001`).
- Multiple `<h1>` headings competing on a single page (`HEAD-002`).
- Empty or whitespace-only `<h1>` heading (`HEAD-003`).
- Duplicate `<h1>` headings across distinct URLs (`HEAD-004`).
- `<h1>` heading identical to the `<title>` tag (`HEAD-005`).
- Skipped heading hierarchy level (e.g., jump from `<h1>` to `<h3>` without `<h2>`) (`HEAD-006`).
- Empty heading elements (`<h2></h2>`) (`HEAD-007`).
- Excessive number of headings on page (`HEAD-008`).
- Excessively long `<h1>` heading (>70 characters) (`HEAD-009`).
- Duplicate HTML element IDs (`TECH-005`).
- Thin content (< 250 words) (`CNT-001`) and extremely thin content (< 50 words) (`CNT-002`).
- Duplicate body content across pages (`CNT-003`) and near-duplicate content via SimHash (`CNT-004`).
- Low text-to-HTML ratio (< 10%) (`CNT-005`, `CNT-020`).
- Keyword cannibalization cluster across templates (`CNT-021`).
- Boilerplate interface headings inside UI widgets/sidebars (`CNT-022`).
- Missing E-E-A-T author trust signals on editorial templates (`CNT-023`).
- Over-optimized internal anchor text density (`CNT-024`).

Fix semantic structure, preserve useful content, use real links with valid `href` values, replace non-topical interface headings with semantic `<nav>`/`<aside>` or styled `<div>` elements, and test source and rendered DOM.

### E. Internal linking, architecture, and pagination

Check:
- Internal broken links returning 4xx (`INT-001`).
- Internal links returning 5xx server errors (`INT-002`).
- Internal links pointing to redirecting URLs (`INT-003`, `LINK-035`).
- Internal links using insecure HTTP on HTTPS site (`INT-008`).
- Internal links with empty anchor text (`INT-010`).
- Internal links with generic anchor text ("click here", "read more", "learn more") (`INT-011`).
- Excessive internal links on a single page (> 250 links) (`INT-020`).
- Nofollow attribute on internal links (`INT-021`) and on critical navigation links (`INT-022`, `LINK-039`).
- Internal links containing tracking parameters (`INT-027`).
- Self-linking loops where a page links to itself redundantly (`INT-031`).
- Broken internal fragment identifiers (`#target` missing in DOM) (`INT-032`, `LINK-037`).
- Orphan pages with zero internal inlinks (`CR-013`, `LINK-040`) and orphan directory clusters (`INT-033`).
- Inward link equity bottlenecks (`INT-034`).
- Internal link anchor text stuffing (`INT-035`).
- Deep link pagination defects (`INT-036`) and pagination sequence gaps (`PAG-001`).
- Pagination pages with incorrect self-canonicalization (`PAG-004`).
- Dead-end pages with no outbound links (`ARCH-002`).
- Excessive crawl depth (> 3-4 clicks from homepage) (`CR-014`, `CR-028`).
- High volume of internal links pointing to non-indexable URLs (`CR-027`).
- External links using insecure HTTP (`EXT-006`).
- Excessive external outbound links (`EXT-008`).
- External links with empty or generic anchor text (`EXT-012`, `EXT-013`).

Update link generation at its source, use final destinations, add contextual navigation links to orphan pages, and recrawl affected template families.

### F. Images and media

Check:
- **Presence of an `alt` tag attribute on EVERY single image tag (`IMG-001`):** Every `<img>` element rendered across theme templates, template parts, and content blocks MUST physically contain an `alt` attribute tag. Omitting the `alt` attribute entirely is an accessibility failure (violating WCAG 2.1 SC 1.1.1) and a search engine defect that causes screen readers to read raw file paths.
- **Informative vs. decorative image alt tags:**
  - Informative images (content photos, post thumbnails, logos, diagrams): Must have descriptive, context-appropriate alternative text.
  - Informative images with generic placeholder alt text (`IMG-021`): Prohibit values such as "image", "img", "photo", "pic", "picture", "logo", "icon", "banner", or raw file names.
  - Informative images with excessively long alt text (`IMG-003`): Alt text must be concise (< 125 characters); detailed descriptions belong in captions (`<figcaption>`) or body copy.
  - Informative images with duplicate alt text (`IMG-005`): Different images on the same page must not share identical alt text unless they depict the exact same subject.
  - Decorative images (backgrounds, separators, styling flourishes): Must NEVER omit the `alt` attribute tag; they must explicitly declare an empty alt attribute `alt=""` and/or `aria-hidden="true"` so assistive technologies ignore them.
- **Explicit dimension attributes to eliminate Cumulative Layout Shift (CLS):**
  - Images missing both width and height attributes (`IMG-010`, `CWV-002`): Browser cannot calculate aspect ratio before download, triggering severe layout shifts.
  - Images missing a single dimension attribute (`IMG-008`): Either width or height is absent.
  - Remediation: Every `<img>` tag must include explicit `width` and `height` attributes (e.g. `width="1200" height="630"`) or modern CSS `aspect-ratio: width / height;`.
- **Loading priority and viewport positioning:**
  - Below-the-fold images missing lazy loading (`IMG-013`): Images outside the initial viewport (past the first 3 images) must include `loading="lazy"` and `decoding="async"` to defer unnecessary offscreen payload.
  - Above-the-fold / Hero / LCP images lazy-loaded improperly (`CWV-001`): The primary content image or hero banner must NEVER be lazy loaded. Theme templates must enforce `loading="eager"` and `fetchpriority="high"` on the first featured image to optimize Largest Contentful Paint.
- **Responsive media attributes and modern formats:**
  - Missing responsive attributes (`IMG-018`): Pages with multiple images must output `srcset` and `sizes` attributes so browsers download properly scaled assets per device viewport width.
  - Legacy format opportunities (`IMG-011`): Photographic JPEG/PNG images should be served in modern WebP or AVIF formats (with fallbacks) to reduce bandwidth.
  - Generic image filenames (`IMG-022`): Image files must not use camera default or generic names (`img01.jpg`, `photo.png`, `screenshot...`); use lowercase, hyphenated, descriptive filenames.
  - Multi-page image asset reuse (`IMG-023`): Avoid using the same image file across disparate pages where unique contextual imagery is required.
  - Image assets blocked by robots.txt (`IMG-024`): Verify `robots.txt` does not disallow `/wp-content/uploads/` or image asset directories.
  - Mixed content HTTP images on HTTPS pages (`SEC-002`): Insecure image URLs trigger browser security warnings and mixed-content blocking.
  - Social & mobile image tags: Missing Open Graph image (`SOCIAL-003`), missing Twitter/X image (`SOCIAL-007`), or missing/non-standard mobile favicon (`SERP-005`).
- **WordPress Theme Engineering & API Rules for Images:**
  - Never write hardcoded raw `<img src="...">` tags in theme templates for attachments.
  - Always use WordPress native attachment functions:
    ```php
    the_post_thumbnail( 'large', [ 'class' => 'hero-img', 'fetchpriority' => 'high' ] );
    echo wp_get_attachment_image( $attachment_id, 'medium_large', false, [ 'loading' => 'lazy' ] );
    the_custom_logo();
    ```
  - Attachment alt fallback logic: When `_wp_attachment_image_alt` postmeta is missing in the database, themes must provide a contextual fallback (e.g. post title, taxonomy term title, or contextual description) rather than outputting a tag without an `alt` attribute.
  - Filter `wp_get_attachment_image_attributes` in `functions.php` to enforce theme-wide image tag standards, dimensions, and fallbacks.

### G. Structured data

Check:
- No structured data found on page (`SCH-001`).
- Invalid JSON-LD structured data syntax / parsing errors (`SCH-002`).
- Schema entity missing required `@type` declaration (`SCH-003`).
- Schema markup missing required properties per Google Search Central (`SCH-004`).
- Schema markup has invalid property values (`SCH-005`).
- Duplicate structured data blocks across theme and plugins (`SCH-006`).
- Invalid breadcrumb hierarchy in `BreadcrumbList` schema (`SCH-011`).
- Structured data deployed on non-indexable or noindex pages (`SCH-020`).
- Theme schema conflicting with SEO-plugin schema.
- Schema describing invisible or fabricated content.

Choose one coherent schema owner, emit only applicable and accurate properties, encode JSON-LD correctly, and validate representative pages. Never fabricate ratings, reviews, prices, availability, or credentials.

### H. Internationalization and multilingual templates

Check:
- Missing self-referencing hreflang tag (`HREF-002`).
- Hreflang pointing to non-200 URLs (4xx, 5xx) (`HREF-004`).
- Hreflang pointing to redirect URLs (`HREF-005`).
- Hreflang pointing to noindex pages (`HREF-006`).
- Invalid or non-standard language/region codes (`HREF-007`).
- Missing reciprocal hreflang annotations (`HREF-008`).
- Conflicting hreflang targets for same language/region (`HREF-009`).
- Multiple hreflang tags declared for identical language (`HREF-011`).
- Missing `x-default` hreflang fallback annotation (`HREF-013`).
- Hreflang URL differing from its canonical URL (`HREF-015`).
- Hreflang implemented in both HTML and HTTP headers with conflicts (`HREF-017`).
- Relative URL used in hreflang attribute (`HREF-018`).
- Untranslated metadata or template strings.
- Hardcoded locale prefixes in links.

Let the established multilingual integration own hreflang unless verified otherwise. Map actual translated objects, not just pages in the same language. Test pages with and without translations.

### I. Assets, rendering, and performance

Check:
- Slow Largest Contentful Paint (LCP > 2.5s) (`CWV-001`).
- Unsized media assets causing layout shifts (CLS > 0.05 / 0.1) (`CWV-002`, `CWV-003`, `PERF-004`).
- Page not using modern Brotli/Gzip compression (`CWV-003`, `PERF-012`).
- Multiple render-blocking stylesheets delaying first paint (`CWV-004`, `PERF-006`).
- Slow Time to First Byte (TTFB > 800ms) (`PERF-001`).
- Total page weight exceeding threshold (> 3MB) (`PERF-002`).
- Poor Interaction to Next Paint (INP > 200ms) (`PERF-003`).
- Excessive HTML document size (`PERF-005`).
- Excessive JavaScript payload (`PERF-007`).
- Excessive third-party resources (`PERF-008`).
- Excessive DOM size (> 1,500 elements or deep nesting) (`PERF-009`).
- Missing long-lived caching headers on static assets (`PERF-013`).
- Title only exists in client-rendered HTML (`TECH-020`).
- Canonical only exists in client-rendered HTML (`TECH-021`).
- Main content requires JavaScript execution to render (`TECH-022`).
- Internal links require JavaScript execution to discover (`TECH-023`, `CR-029`).
- Browser console errors detected during rendering (`TECH-024`).
- JavaScript resources blocked by robots.txt (`CR-020`).
- Stylesheet resources blocked by robots.txt (`CR-021`, `CR-031`).
- AMP alternate version returning an error (`AMP-001`).

Enqueue assets with correct dependencies and versions, load conditionally when safe, measure before/after, and preserve plugin functionality.

### J. Security and robustness

Check:
- Mixed content: HTTP images on HTTPS pages (`SEC-002`).
- Missing `Strict-Transport-Security` (HSTS) header (`SEC-007`).
- Unsafe `target="_blank"` links without `rel="noopener"` (`SEC-008`, `SEC-016`).
- Forms submitting over insecure HTTP (`SEC-010`).
- Invalid or expired TLS certificate (`SEC-011`).
- TLS certificate hostname mismatch (`SEC-012`).
- Weak security header coverage (CSP, X-Frame-Options, X-Content-Type-Options) (`SEC-013`).
- Forms submitting to error pages (4xx/5xx) (`SEC-014`).
- External link pointing to expired or parked domain (`SEC-015`).
- Sensitive form action transmitting credentials or personal data over unencrypted HTTP (`SEC-017`).
- HSTS max-age duration less than recommended 1 year (`SEC-018`).
- Unescaped dynamic output in templates.
- Direct file access to PHP files without `ABSPATH` check.

Use WordPress APIs, prepared queries, nonces, capability checks, sanitization, validation, and context-aware escaping. Do not disable security controls to make a crawler pass.

### K. URL architecture, normalization, and parameters

Check:
- URL length exceeds recommended limit (> 115 characters) (`URL-001`).
- URL has excessive directory depth (> 5 levels) (`URL-002`).
- URL has excessive query parameters (> 3 parameters) (`URL-003`).
- Indexable URL contains tracking parameters (`utm_*`, `gclid`) (`URL-004`).
- Duplicate URL variants of the same path (differing by case, trailing slash, www) (`URL-005`).
- URL contains uppercase characters (`URL-006`).
- URL contains spaces or percent-encoded spaces (`%20`) (`URL-007`).
- URL contains unsafe characters (`URL-008`).
- URL contains repeated slashes (`//`) (`URL-009`).
- URL contains session identifiers (`phpsessid`, `jsessionid`, `sid`) (`URL-014`).
- URL contains non-ASCII characters without consistent percent-encoding (`URL-016`).
- URL uses an IP address hostname instead of a domain (`URL-020`).
- URL contains an unnecessary index file (`index.php`, `index.html`) (`URL-030`).
- Parameter combinations causing crawl explosion (`PARAM-001`).
- Filter/sort/parameter URL is indexable instead of canonicalized/noindexed (`PARAM-002`).
- Faceted navigation parameter spider trap detected (`CR-025`).

### L. Social metadata and SERP presentation

Check:
- Open Graph title is missing (`og:title`) (`SOCIAL-001`).
- Open Graph description is missing (`og:description`) (`SOCIAL-002`).
- Open Graph image is missing (`og:image`) (`SOCIAL-003`).
- Open Graph URL differs from canonical URL (`og:url`) (`SOCIAL-005`).
- Twitter/X card tag is missing (`twitter:card`) (`SOCIAL-006`).
- Twitter/X image tag is missing (`twitter:image`) (`SOCIAL-007`).
- Mobile favicon is missing or non-compliant with Google mobile SERP guidelines (`SERP-005`).

## 8. Remediation playbooks

### Duplicate title tags
1. Capture raw HTML and rendered DOM.
2. Search theme code for `<title>`, `wp_title()`, `document_title_parts`, `pre_get_document_title`, and SEO-plugin integration.
3. Confirm `title-tag` support and SEO-plugin behavior.
4. Remove only the duplicate generator.
5. Do not remove `wp_head()` or plugin hooks.
6. Test front page, singular, archive, CPT, search, 404, and multilingual URLs.
7. Verify one effective title element with correct content.

### Canonical mismatch
1. Record requested URL, status, redirect chain, canonical, and final destination.
2. Determine intended policy for the URL family.
3. Identify canonical output owner.
4. Check query variables, pagination, locale, and CPT context.
5. Correct the responsible integration.
6. Check for duplicate canonical output.
7. Verify variants and sitemap/internal-link consistency.

### Missing `wp_head()` or `wp_footer()`
1. Inspect header/footer integration.
2. Restore missing hook calls in appropriate locations without duplication.
3. Test metadata, styles, scripts, analytics, consent tools, and plugin features.
4. Confirm output order and no duplicate assets.

### Broken links from a template
1. Export affected URLs and referring pages.
2. Group by template/component and destination pattern.
3. Inspect link-generation code and underlying object.
4. Determine whether destination moved, was deleted, or is generated incorrectly.
5. Correct source links or add relevant redirects when appropriate.
6. Test every affected family and recrawl.

### False 200 on missing content
1. Request a known nonexistent URL.
2. Inspect response status and body.
3. Trace routing and fallback behavior.
4. Ensure genuine missing resources return 404.
5. Preserve a helpful 404 template.
6. Confirm legitimate pages still return 200.

### Duplicate structured data
1. Inspect JSON-LD/microdata in raw and rendered HTML.
2. Identify every producer: theme, SEO plugin, commerce/review plugin, block, or custom code.
3. Define the intended entity graph.
4. Disable/refactor only redundant output through supported configuration/hooks.
5. Preserve required valid properties.
6. Validate representative page types and compare schema to visible content.

### Incorrect hreflang
1. Map each source page to true translated equivalents.
2. Inspect plugin settings and generated HTML.
3. Determine whether the theme adds duplicate annotations.
4. Remove conflicts or repair the established integration.
5. Verify reciprocal links, self-references where required, locale codes, and canonical consistency.
6. Test pages with no translation as well as fully translated pages.

### Performance regression
1. Record baseline field data and lab results.
2. Identify LCP element, long tasks, and layout shifts.
3. Compare asset lists and DOM changes.
4. Isolate or revert severe regressions.
5. Optimize the measured cause.
6. Verify interactions and visual output.
7. Repeat comparable tests.

### Missing image alt tags, unsized media (CLS), and non-optimized image tags (`IMG-001..024`, `CWV-002`, `SEC-002`)
1. **Locate all image tags in theme templates:** Search theme template files (`header.php`, `footer.php`, `single.php`, `archive.php`, `template-parts/`, patterns, and blocks) for raw `<img>` tags and image functions.
2. **Audit alt tag attribute presence on EVERY image (`IMG-001`):**
   - Verify that an `alt` attribute tag is physically present on every `<img>` element.
   - For decorative images (dividers, textures, abstract icons): set `alt="" aria-hidden="true"`. Never omit the `alt` attribute tag.
   - For informative images (featured images, product photos, team photos): write concise, contextual alt text (< 125 characters, `IMG-003`).
   - Remove generic placeholder alt text ("image", "photo", "pic", "logo", "icon") (`IMG-021`).
   - Ensure distinct images on the page do not share duplicate alt text (`IMG-005`).
3. **Replace raw `<img>` tags with WordPress attachment APIs:**
   - Replace `<img src="...">` with `wp_get_attachment_image( $id, $size, false, $attr )` or `the_post_thumbnail( $size, $attr )`.
   - WordPress automatically generates `alt` (from attachment postmeta), `width`, `height`, `srcset`, and `sizes`.
4. **Implement fallback alt text in `functions.php`:**
   ```php
   add_filter( 'wp_get_attachment_image_attributes', function( $attr, $attachment, $size ) {
       if ( empty( trim( $attr['alt'] ?? '' ) ) ) {
           $post_id = get_the_ID();
           $attr['alt'] = $post_id ? get_the_title( $post_id ) : get_the_title( $attachment->ID );
       }
       return $attr;
   }, 10, 3 );
   ```
5. **Fix missing dimensions and Cumulative Layout Shift (`IMG-008`, `IMG-010`, `CWV-002`):**
   - Ensure every `<img>` has explicit `width` and `height` attributes or CSS `aspect-ratio`.
   - In CSS, avoid `height: auto` without an intrinsic aspect ratio declared.
6. **Configure loading priorities (`IMG-013`, `CWV-001`):**
   - Hero / LCP featured image: Set `loading="eager"` and `fetchpriority="high"`. Remove `loading="lazy"` from the first image in the loop.
   - Below-the-fold images: Ensure `loading="lazy"` and `decoding="async"` are applied to all images past the first 3.
7. **Ensure secure HTTPS transport (`SEC-002`):**
   - Replace all hardcoded `http://` image URLs in templates, customizer settings, and CSS with `https://`.
8. **Verify robots crawl access (`IMG-024`):**
   - Check `robots.txt` to ensure `/wp-content/uploads/` is not disallowed.
9. **Verify and test:**
   - Inspect raw HTML and rendered DOM across mobile and desktop viewports.
   - Audit DevTools Accessibility Tree to confirm screen readers announce appropriate alt text.
   - Run Lighthouse to verify 0 layout shifts from media and improved LCP.

### Robots.txt, XML sitemap synchronization & spider traps (`CR-001..031`, `DIR-001..005`, `PARAM-001..002`)
1. **Audit robots.txt accessibility (`CR-001`, `CR-002`):** Verify `robots.txt` returns HTTP 200 and is not blocked by server permissions or security rules.
2. **Prevent crawler blocking of indexable assets (`CR-003`, `CR-020`, `CR-021`, `IMG-024`):** Ensure theme scripts (`/wp-content/themes/*/assets/js/`), stylesheets, and media uploads are crawlable.
3. **Resolve noindex and robots.txt contradictions (`DIR-001`, `DIR-002`):**
   - Never block a URL in `robots.txt` if it carries a `noindex` meta tag (crawlers must fetch the page to see the `noindex` directive).
   - Resolve contradictory robots tags (e.g. `index, noindex` or conflicting `X-Robots-Tag`).
4. **Clean XML sitemap entries (`CR-008..012`, `CR-016..018`):**
   - Sitemaps must list only canonical, indexable, live 200 OK HTTPS URLs.
   - Remove 4xx, 5xx, 3xx redirects, noindex URLs, and canonicalized-away variants from the sitemap.
   - Add accurate `<lastmod>` timestamps (`CR-018`).
5. **Mitigate faceted navigation spider traps (`PARAM-001`, `PARAM-002`, `CR-025`):**
   - Add `robots.txt` Disallow directives or canonicalize filter/sort parameter URLs to the clean parent archive.
   - Use `wp_safe_redirect` or clean rewrite endpoints for filter interfaces.

### JavaScript rendering traps and client-only SEO failures (`TECH-020..024`, `CR-029`)
1. **Compare raw HTML vs. rendered DOM:**
   - Inspect `curl -sL <url>` (raw server response) against browser DOM.
2. **Eliminate client-only metadata (`TECH-020`, `TECH-021`):**
   - Title tags, meta descriptions, and canonical links MUST be present in server-rendered `<head>`. Do not rely on client-side React/Vue hydration to inject them.
3. **Ensure main content server-side rendering (`TECH-022`):**
   - Primary post content, product descriptions, and headings must exist in initial HTML payload.
4. **Restore standard anchor tags for navigation (`TECH-023`, `CR-029`, `TECH-011`):**
   - Replace `<button onClick="...">` or `<div data-href="...">` navigation with standard `<a href="...">` links so crawlers discover internal URLs without executing JavaScript.
5. **Resolve console errors (`TECH-024`):**
   - Fix JavaScript exceptions that break hydration or halt crawler rendering.

### Mixed content and insecure form/resource delivery (`SEC-002`, `SEC-008`, `SEC-010`, `SEC-016`, `SEC-017`)
1. **Audit sub-resource transport (`SEC-002`):**
   - Search theme templates and enqueued scripts for `http://`. Replace with `https://` or root-relative paths.
2. **Secure outbound external links (`SEC-008`, `SEC-016`):**
   - Add `rel="noopener noreferrer"` to all external links opening in new windows (`target="_blank"`) to eliminate reverse tabnabbing vulnerabilities.
3. **Secure form actions (`SEC-010`, `SEC-017`):**
   - Verify that search forms, login forms, and contact forms have secure `https://` actions and submit via POST.
4. **Enforce HSTS (`SEC-007`, `SEC-018`):**
   - Ensure server or WordPress security layer sends `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.

## 9. Custom post types, taxonomies, permalinks, and multilingual SEO

For each CPT and taxonomy, record:
- Public visibility and queryability.
- Rewrite slug and permalink structure.
- Archive support.
- REST exposure where relevant.
- Intended indexability.
- Template hierarchy.
- Sitemap inclusion.
- Canonical policy.
- Language mapping.
- Breadcrumb behavior.

A public content type does not automatically require every archive to be indexed. Decide based on usefulness and search purpose.

For rewrites and permalinks:
- Inspect rewrite registration and query vars.
- Flush rewrite rules during activation/deployment, never on every request.
- Do not build public URLs by concatenating untrusted request strings.
- Check trailing slash and host consistency.
- Test old routes after slug changes.
- Preserve route behavior unless migration is authorized.
- Redirect genuine permanent moves to relevant destinations.

For multilingual plugins:
- Do not generate hreflang manually if the plugin already owns it.
- Map a page to its real translation counterpart.
- Do not assume every object has translations.
- Avoid canonicalizing all translated pages to the default language.
- Use translation functions and the correct text domain.
- Check language switchers on singular, archive, taxonomy, and pagination templates.
- Verify translated titles/descriptions and locale-specific breadcrumbs.
- Test raw HTML and rendered output in every configured language.

## 10. Performance, Core Web Vitals, accessibility, and security

Use field data where available and lab tools for diagnosis. Current “good” Core Web Vitals thresholds at the 75th percentile are generally:
- LCP: 2.5 seconds or less (`CWV-001`).
- INP: 200 milliseconds or less (`CWV-004`, `PERF-003`).
- CLS: 0.1 or less (`CWV-002`, `CWV-003`, `PERF-004`).

Confirm current official guidance before embedding thresholds into automated policy. Lighthouse lab data does not replace field data.

### LCP
Investigate server response, resource discovery, image size, loading priority, render-blocking CSS/JS, fonts, and client-side rendering. Do not lazy-load the primary LCP image when that delays it; do not preload every image.

### INP
Investigate long tasks, event handlers, third-party scripts, DOM updates, and unnecessary JavaScript. Profile real interactions before refactoring.

### CLS
Reserve media dimensions (`width` and `height`) and space for banners/embeds; avoid unexpected content insertion above existing content; investigate font swaps and dynamic components.

### Accessibility
Check semantic landmarks, descriptive links, image alternatives, keyboard-accessible controls, visible focus, contrast, responsive zoom, forms/errors, hover-only content, language attributes, and meaningful headings. Do not label every accessibility defect a direct ranking factor; fix it because users need a usable site.

### Security
- Use `esc_html()`, `esc_attr()`, `esc_url()`, and `wp_kses_post()` where appropriate.
- Sanitize inputs with suitable `sanitize_*` functions and validate against allowed formats.
- Use `$wpdb->prepare()` for custom SQL.
- Check capabilities and nonces for administrative actions.
- Avoid unsafe dynamic redirects.
- Do not store secrets in public theme files.
- Do not disable security controls to pass an SEO crawl.
- Never expose private content to crawlers by removing authentication.

## 11. JavaScript rendering and mobile usability

Inspect:
- Empty HTML shells.
- Content available only after interaction.
- Links without crawlable anchor elements.
- Client-side routes returning 404.
- Canonical/noindex differences before and after rendering.
- Rendering errors and blocked critical resources.
- Content differences between raw HTML and rendered DOM.
- Server/client metadata mismatches.
- Hydration failures.

Ensure important content is accessible in rendered output; prefer SSR/static generation when appropriate; use crawlable links; return correct HTTP responses; keep directives consistent; and verify both source HTML and rendered DOM. Do not assume Google cannot process JavaScript; test the actual behavior.

For mobile, check viewport configuration, content parity, readability, tap targets, overlays, horizontal overflow, responsive navigation, forms, and pagination. Preserve important content and links across devices.

## 12. Backlinks, migrations, and traffic declines

Backlink reports can reveal broken destinations, lost links, and suspicious patterns, but many backlink issues are outside theme code. Fix theme-generated broken URLs; assess server redirects separately; do not automatically disavow links merely because a third-party tool labels them toxic.

For migrations:
- Crawl the old site and export valuable URLs.
- Map old URLs to relevant new destinations.
- Preserve content/metadata where appropriate.
- Prepare redirects and verify canonical/hreflang configuration.
- Test staging directives and new sitemaps.
- After launch, crawl the new site, test redirects/internal links, inspect indexing reports, monitor logs/traffic, and investigate missing valuable pages.
- Never redirect every old URL to the homepage.

For organic traffic declines:
1. Define the exact date range.
2. Compare clicks, impressions, CTR, and average position.
3. Segment by query, page, country, device, and search type.
4. Determine whether the decline is sitewide or template-specific.
5. Inspect indexing, server errors, deployments, robots/canonical changes, manual actions, security alerts, seasonality, and demand.
6. Test hypotheses against page-level evidence.
Do not attribute every decline to an algorithm update or theme defect.

## 13. Tooling and verification

Use available tools rather than assuming they are installed:
- `php -l` for PHP syntax.
- WordPress Coding Standards / PHP_CodeSniffer when configured.
- PHPStan or Psalm where configured.
- WordPress PHPUnit tests where present.
- WP-CLI for authorized local inspection.
- Query Monitor for local debugging.
- Browser DevTools for network, DOM, console, and performance.
- Screaming Frog, Ahrefs, and Semrush for crawl checks.
- Search Console for indexing and search performance.
- PageSpeed Insights/Lighthouse for performance diagnostics.

Example commands; adapt paths and environment:

```bash
php -l wp-content/themes/example-theme/functions.php
find wp-content/themes/example-theme -name '*.php' -print0 | xargs -0 -n1 php -l
wp theme list
wp option get permalink_structure
wp plugin list
```

Run WP-CLI only with appropriate authorization. Do not expose environment details publicly.

For every representative URL, inspect:
- Status code and redirect chain.
- Response headers.
- Raw title and description.
- Canonical and robots meta.
- `lang` attribute.
- H1 and heading outline.
- Main content in raw/rendered output.
- Internal links and pagination.
- Image alt, srcset, dimensions, and loading behavior.
- JSON-LD and duplicate schema.
- Console errors and failed requests.
- Mobile layout and interactions.
- Actual template used.

For before/after crawls, keep user agent, JavaScript rendering, crawl limits, authentication, robots settings, URL sources, and include/exclude rules comparable. Compare issue counts and affected URL sets, not only a health score.

Minimum regression matrix:
- Front page and posts index.
- One post and one page.
- Every important CPT and taxonomy/archive.
- Search results and 404.
- Pagination.
- Translated pages.
- A page with rich media.
- A page using major plugin output.
- A page with unusual query parameters.

A test passes only when the original defect is no longer reproducible and expected behavior is confirmed. If a test cannot be run, mark it unverified.

## 14. Automated audit rule directory and ID reference matrix (217 Rules)

The following directory provides complete coverage of all 217 automated audit rules implemented in the technical audit engine (`/var/www/html/audit/src/Rules`). AI assistants must map observed findings, audit exports, and code inspections directly to these rule IDs to ensure standardized evaluation and remediation:

### 14.1 Images and media

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `IMG-001` | **Medium** | Images missing alt text | Add descriptive alt text to all informative images for accessibility and image search indexing. |
| `IMG-003` | **Low** | Images with excessively long alt text | Keep alt text concise (under ~125 characters); move longer descriptions to surrounding copy or captions. |
| `IMG-005` | **Low** | Images share duplicate alt text | Give each informative image unique alt text describing that specific image. |
| `IMG-008` | **Low** | Images missing width or height | Provide both width and height attributes on images for stable layout rendering. |
| `IMG-010` | **Medium** | Images missing width and height (CLS risk) | Specify width and height attributes so the browser reserves space and avoids layout shift. |
| `IMG-011` | **Low** | Images could use modern formats | Serve photographic images as WebP/AVIF (with fallbacks) to cut image payload substantially. |
| `IMG-013` | **Low** | Below-the-fold images missing lazy loading | Add loading="lazy" to below-the-fold images to defer offscreen payload. |
| `IMG-018` | **Low** | No responsive image attributes used | Add srcset/sizes so browsers download appropriately-sized variants per viewport. |
| `IMG-021` | **Low** | Images with generic alt text | Replace placeholder alt text with descriptions of what each image actually shows. |
| `IMG-022` | **Low** | Images with generic filenames | Rename image files descriptively with hyphenated keywords for image-search relevance. |
| `IMG-023` | **Low** | Image asset reused across many pages | Reuse is fine for logos/icons; ensure content images are unique per page context. |
| `IMG-024` | **Medium** | Images blocked by robots.txt | Allow image files that matter for rendering and image search. |


### 14.2 Content quality and uniqueness

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `CNT-001` | **High** | Thin content detected | Expand page content to provide comprehensive value to users or consolidate with relevant pages. |
| `CNT-002` | **Critical** | Extremely thin content detected | Pages with almost no text rarely rank: add substantive unique content or noindex/consolidate the URL. |
| `CNT-003` | **High** | Duplicate content across pages | Differentiate the pages, canonicalize duplicates to one preferred URL, or consolidate them. |
| `CNT-004` | **Medium** | Near-duplicate content detected | Differentiate the pages substantially or consolidate them under one canonical URL. |
| `CNT-005` | **Low** | Low text-to-HTML ratio | Reduce template boilerplate relative to unique content so crawlers reach substance faster. |
| `CNT-020` | **Medium** | Low text-to-HTML code ratio (< 10%) | Clean bloated inline CSS, heavy client-side scripts, or repetitive DOM boilerplate so search engines find unique content easily. |
| `CNT-021` | **High** | Keyword cannibalization cluster detected | Differentiate titles and primary keywords, or consolidate competing pages with a 301 redirect into a single comprehensive guide. |
| `CNT-022` | **Medium** | Boilerplate interface headings detected | Replace non-topical headings with <nav>, <aside>, or styled <div>/<span> elements with ARIA labels to preserve semantic outline integrity. |
| `CNT-023` | **High** | Missing E-E-A-T author trust signals on editorial content | Add author bylines, credentials, and Article/Person Schema with author.url to demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness. |
| `CNT-024` | **High** | Over-optimized internal anchor text density | Diversify anchor texts naturally across internal links to avoid triggering keyword stuffing and over-optimization filters. |


### 14.3 Headings and outline hierarchy

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `HEAD-001` | **High** | Page is missing an <h1> heading | Add exactly one <h1> heading summarizing the main subject of the page. |
| `HEAD-002` | **Medium** | Page contains multiple <h1> headings | Use a single <h1> heading per page for the main title, and structure sub-topics using <h2> through <h6>. |
| `HEAD-003` | **Medium** | Page has an empty <h1> heading | Give the <h1> descriptive text summarizing the page, or remove the empty tag. |
| `HEAD-004` | **Medium** | Duplicate H1 heading across pages | Give each page a unique H1 reflecting its specific topic. |
| `HEAD-005` | **Low** | H1 is identical to the page title | Differentiate the H1 from the title tag to target a broader set of related terms. |
| `HEAD-006` | **Low** | Heading hierarchy level skipped | Nest headings sequentially (H1 > H2 > H3) without skipping levels for a logical document outline. |
| `HEAD-007` | **Low** | Page contains empty headings | Remove empty heading tags or fill them with descriptive text. |
| `HEAD-008` | **Low** | Excessive number of headings | Consolidate decorative headings; a focused outline helps crawlers and readers. |
| `HEAD-009` | **Low** | H1 heading is very long | Keep the H1 concise (under ~70 characters) while covering the main topic. |


### 14.4 Document title and meta descriptions

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `META-001` | **Critical** | Page title tag is missing or empty | Add a descriptive and unique <title> tag between 30 and 60 characters. |
| `META-002` | **Medium** | Page title is too short | Expand the title to 30–60 characters to include target keywords and branding. |
| `META-003` | **Medium** | Page title exceeds recommended length | Keep title tags under 60 characters (~580px) to prevent truncation in search result snippets. |
| `META-004` | **High** | Duplicate page title across pages | Ensure each page has a unique, descriptive <title> tag reflecting its specific content and topic. |
| `META-007` | **High** | Meta description is missing or empty | Add a compelling meta description between 70 and 155 characters summarizing the page content. |
| `META-008` | **Low** | Meta description is too short | Expand the meta description to at least 70–155 characters to increase CTR in SERPs. |
| `META-009` | **Low** | Meta description is too long | Shorten meta description to 155–160 characters (~990px) to prevent ellipsis truncation. |
| `META-011` | **High** | Duplicate meta description across pages | Write a unique meta description per page so snippets compete for distinct intents. |
| `META-014` | **Critical** | Meta viewport tag is missing | Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> for mobile responsiveness. |
| `META-020` | **Medium** | Multiple title tags found | Keep exactly one <title> tag inside <head>; remove duplicates. |
| `META-021` | **Medium** | Multiple meta descriptions found | Keep exactly one meta description tag; search engines may ignore conflicting duplicates. |


### 14.5 SERP appearance and snippet rendering

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `SERP-001` | **High** | Title exceeds Google SERP pixel width boundary | Keep title under 600px (~55-60 characters) to prevent truncation in desktop and mobile SERPs. |
| `SERP-002` | **Medium** | Title is below minimum SERP pixel width | Expand the title to at least 200px to fully utilize SERP real estate with relevant keywords. |
| `SERP-003` | **Medium** | Meta description exceeds Google desktop pixel boundary | Shorten meta description to under 960px (~150-155 characters) to ensure the full CTA is visible. |
| `SERP-004` | **Medium** | Brand boilerplate dominates title pixel space | Shorten the brand suffix/prefix so unique descriptive page keywords are not pushed off the snippet. |
| `SERP-005` | **Medium** | Favicon is missing or non-standard for mobile SERPs | Add a high-resolution favicon in square dimensions that are multiples of 48px (48x48, 96x96, 144x144) or SVG to appear in mobile SERPs. |
| `SERP-006` | **Medium** | Unicode encoding glitch detected in meta description | Fix UTF-8 character encoding in meta description content. |


### 14.6 Social metadata and Open Graph / Twitter cards

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `SOCIAL-001` | **Low** | Open Graph title is missing | Add <meta property="og:title"> (usually mirroring the page <title>) so links render correctly on social platforms. |
| `SOCIAL-002` | **Low** | Open Graph description is missing | Add <meta property="og:description"> with a concise 1–2 sentence summary for social link previews. |
| `SOCIAL-003` | **Low** | Open Graph image is missing | Add <meta property="og:image"> with an absolute URL to a 1200x630 image for rich social previews. |
| `SOCIAL-005` | **Low** | Open Graph URL differs from canonical | Align og:url with the canonical URL so shares consolidate on one version. |
| `SOCIAL-006` | **Low** | Twitter/X card tag is missing | Add <meta name="twitter:card" content="summary_large_image"> for rich previews on X (Twitter). |
| `SOCIAL-007` | **Low** | Twitter/X image tag is missing | Add <meta name="twitter:image"> (can reuse the og:image URL) so X cards render with an image. |


### 14.7 Indexability and canonicalization

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `IX-002` | **Critical** | Homepage / root page has noindex directive | Remove noindex directive from the homepage immediately. |
| `IX-003` | **High** | Noindex page receives significant internal links | Either allow indexing or remove/redirect internal links wasting equity on a noindex URL. |
| `IX-004` | **High** | Page blocked by X-Robots-Tag noindex header | Remove the noindex X-Robots-Tag header if this page should be indexed, or exclude it from the sitemap. |
| `IX-005` | **High** | Canonical URL is missing on indexable page | Specify an explicit self-referencing canonical tag on every indexable page. |
| `IX-006` | **Critical** | Multiple canonical tags found | Keep exactly one canonical tag; conflicting duplicates make canonicalization unpredictable. |
| `IX-007` | **Critical** | Canonical points to an error page | Point the canonical to a live 200 URL, preferably self-referencing. |
| `IX-009` | **High** | Canonical points to a redirect | Canonicalize directly to the final destination URL. |
| `IX-010` | **Critical** | Canonical points to a noindex page | Canonicals must be indexable: fix the target or choose another canonical URL. |
| `IX-011` | **Medium** | Canonical points to another hostname | Cross-domain canonicals pass equity away; use them only deliberately (e.g. syndication). |
| `IX-012` | **$isHomepage ? 'High** | Canonical points to a different URL | Verify whether this page is intended to be canonicalized to another URL or if this is an unintentional mismatch. |
| `IX-015` | **High** | HTTPS page canonicalizes to HTTP | Point the canonical to the HTTPS version to consolidate signals on the secure URL. |
| `IX-016` | **Medium** | Canonical chain detected | Flatten the chain so all variants point to the same final canonical URL. |
| `IX-017` | **High** | Canonical target blocked by robots.txt | Canonicals must be crawlable; unblock the target or pick another canonical. |
| `IX-020` | **Critical** | Conflicting canonical: HTTP Link header contradicts HTML tag | Align the HTTP Link-header canonical with the HTML canonical tag to prevent search engines from ignoring both. |
| `IX-021` | **Critical** | Canonical chain detected (Canonical URL points to another canonical) | Point the canonical tag directly to the final canonical destination in a single hop. |
| `IX-022` | **Medium** | Conflicting noindex and canonical signals | Decide one consolidation path: indexable + self-canonical, or noindex without a foreign canonical. |
| `IX-023` | **Critical** | JavaScript altered canonical URL (SSR vs DOM drift) | Ensure server-side rendering and client-side JavaScript generate identical canonical tags. |
| `IX-024` | **Medium** | Canonical URL contains tracking or session parameters | Strip tracking parameters (utm_*, gclid, fbclid) from the canonical URL to prevent parameter fragmentation in search indexes. |
| `IX-025` | **Critical** | Noindex page submitted in XML sitemap | Remove noindex URLs from XML sitemaps; sitemaps must list only indexable pages. |
| `IX-026` | **Critical** | Canonical points to insecure HTTP external domain | Ensure cross-domain canonical targets use HTTPS to preserve security and indexation equity. |


### 14.8 Robots directives and crawl control

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `DIR-001` | **Critical** | Robots.txt disallow blocks search engines from reading noindex tag | Remove the Disallow rule in robots.txt temporarily so search engines can crawl the page and execute the noindex directive. |
| `DIR-002` | **Critical** | Contradictory meta robots directives detected | Specify clear directives. Search engines prioritize the most restrictive directive (noindex). |
| `DIR-003` | **High** | Noindex page carries extensive outbound links (Equity loss) | Search engines eventually treat long-standing noindex pages as nofollow, terminating PageRank flow through these links. Use self-referencing canonicals on paginated archives instead. |
| `DIR-004` | **Medium** | User-agent specific robots.txt disallow rules detected | Audit specific bot directives (e.g. Googlebot, Bingbot) to ensure they do not unintentionally block critical search engines. |
| `DIR-005` | **Medium** | HTTP X-Robots-Tag contradicts HTML meta robots | Synchronize the HTTP X-Robots-Tag and HTML meta robots tag so crawlers do not receive conflicting indexing directives. |


### 14.9 Crawlability, XML sitemaps, and spider traps

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `CR-001` | **Medium** | Robots.txt is missing | Publish a robots.txt (even a permissive one) and reference the XML sitemap in it. |
| `CR-002` | **Critical** | Robots.txt is inaccessible | Restore robots.txt access; crawler directives cannot be read while it errors. |
| `CR-003` | **Critical** | Important URL blocked by robots.txt | Allow crawling of this URL or remove it from the sitemap/navigation if it should stay blocked. |
| `CR-004` | **High** | Internal links point to robots-blocked URLs | Update or remove links to robots-blocked destinations; crawlers cannot follow them. |
| `CR-005` | **Medium** | Sitemap.xml is missing | Publish an XML sitemap and reference it in robots.txt to aid discovery. |
| `CR-008` | **Critical** | Sitemap contains a 4xx URL | Remove error URLs from the sitemap; list only live indexable pages. |
| `CR-009` | **Critical** | Sitemap contains a 5xx URL | Fix the server error or drop the URL from the sitemap. |
| `CR-010` | **High** | Sitemap contains a redirected URL | List the final destination URL in the sitemap instead. |
| `CR-011` | **Critical** | Sitemap contains a noindex URL | Remove noindex URLs from the sitemap; sitemaps are for indexable pages only. |
| `CR-012` | **Medium** | Sitemap URL differs from its canonical | Sitemaps should list canonical URLs only; replace with the canonical version. |
| `CR-013` | **High** | Orphan page detected with no incoming internal links | Add contextual internal links from relevant category or navigation pages so search engines and users can discover this content. |
| `CR-014` | **Medium** | Page requires too many clicks from homepage | Add internal links from higher-level pages so important content sits within 4 clicks of the homepage. |
| `CR-016` | **High** | Sitemap URL is blocked by robots.txt | Remove blocked URLs from the sitemap or unblock them. |
| `CR-017` | **Medium** | Sitemap lists an HTTP URL | List HTTPS versions in the sitemap. |
| `CR-018` | **Low** | Sitemap entry missing lastmod | Add accurate lastmod dates so crawlers prioritize genuinely changed pages. |
| `CR-020` | **High** | $isScript ? 'Blocked JavaScript resources | Allow crawling of render-critical resources; blocked JS/CSS yields a broken rendered view. |
| `CR-021` | **High** | Blocked stylesheet resources | Allow crawling of render-critical resources; blocked CSS yields a broken rendered view. |
| `CR-025` | **Critical** | Faceted navigation parameter spider trap detected | Add robots.txt Disallow rules for filter combinations, use self-referencing canonicals on base categories, or disallow parameter sorting. |
| `CR-026` | **Critical** | Page submitted in XML sitemap is blocked by robots.txt | Either remove the Disallow directive in robots.txt so search engines can crawl it, or remove the URL from the sitemap. |
| `CR-027` | **High** | Crawl budget waste: High volume of internal links point to non-indexable URLs | Update internal links across templates to point directly to final 200 OK canonical destinations to conserve crawler capacity. |
| `CR-028` | **Medium** | High-value page buried at excessive crawl depth (> 3 clicks) | Promote this key page in category navigation or add contextual internal links from higher-level hubs to bring it within 3 clicks of the root. |
| `CR-029` | **High** | Internal links only discoverable via JavaScript execution (Crawl trap) | Render primary navigation links directly in the server-side HTML response so non-rendering crawlers discover internal pages. |
| `CR-030` | **Critical** | Infinite redirect loop detected between URLs | Break the redirect loop so the URL serves a 200 OK status code. |
| `CR-031` | **High** | CSS or JavaScript resources blocked by robots.txt | Google guidelines require uninhibited access to CSS and JavaScript assets to evaluate mobile friendliness and layout. |


### 14.10 Faceted navigation and parameter explosion

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `PARAM-001` | **High** | Parameter combinations causing crawl explosion | Noindex/nofollow or robots-disallow faceted combinations; keep one canonical per intent. |
| `PARAM-002` | **High** | Filter/sort/parameter URL is indexable | Canonicalize parameter URLs to the clean version and keep them out of the index. |


### 14.11 HTTP status codes and response integrity

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `FETCH-001` | **Critical** | Page could not be fetched | Verify DNS resolution, firewall rules, and server availability for this URL. |
| `FETCH-002` | **Medium** | URL was never crawled | Re-run the scan to cover the missed URL, or remove it from the sitemap/queue if obsolete. |
| `HTTP-` | **High** | Page returned HTTP {$status} | $recs[$status] |
| `HTTP-001` | **Critical** | Page returned 404 Not Found | Fix broken internal links pointing to this URL or configure a 301 redirect to an active relevant page. |
| `HTTP-002` | **Critical** | Page returned 410 Gone | Remove internal links to this permanently removed URL or 301 redirect it to the closest live equivalent. |
| `HTTP-003` | **Critical** | Internal server error encountered | Check web server logs and application code to resolve the 5xx error. |
| `HTTP-004` | **High** | Page returned a client error | Investigate why this URL returns a 4xx status and either fix access or remove references to it. |
| `HTTP-007` | **High** | Redirect chain detected | Update links to point directly to the final destination URL to avoid multiple redirect hops. |
| `HTTP-008` | **Critical** | Redirect loop detected | Break the redirect cycle so the URL resolves to a final 200 page. |
| `HTTP-015` | **Medium** | Soft 404 candidate detected | Return a real 404/410 status for dead pages, or restore meaningful content with a 200. |


### 14.12 Internal link architecture and crawl equity

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `INT-001` | **Critical** | Broken internal link to error page | Update or remove broken link reference on this page to prevent 404 dead ends. |
| `INT-002` | **Medium** | Internal links point to redirects | Update internal links to point directly at the final destination URLs. |
| `INT-003` | **Medium** | Internal links with empty anchor text | Provide clear, descriptive anchor text for internal links to help crawlers and users understand destination context. |
| `INT-008` | **Medium** | Internal links marked with rel="nofollow | Remove nofollow attributes from internal links to allow natural PageRank and link equity flow. |
| `INT-010` | **Low** | Internal links with generic anchor text | Replace generic anchors with descriptive text that reflects the destination topic. |
| `INT-011` | **Low** | Internal links with overly long anchor text | Keep anchor text concise (under ~60 characters) while staying descriptive. |
| `INT-020` | **Medium** | Excessive navigation links | Simplify navigation; huge menus dilute equity and crawl budget across low-value targets. |
| `INT-021` | **Medium** | Excessive footer links | Trim footer link blocks to essentials; sitewide footer links pass diluted signals. |
| `INT-022` | **Medium** | Excessive internal links on page | Trim low-value links (boilerplate, tag clouds) so crawlers prioritize important destinations. |
| `INT-027` | **Medium** | Internal links use insecure HTTP | Point internal links at the HTTPS versions to avoid unnecessary redirects and mixed signals. |
| `INT-031` | **Medium** | Internal links point to canonicalized URLs | Link directly to the canonical version so equity is not routed through consolidation. |
| `INT-032` | **Medium** | Internal links point to non-canonical URLs | Update links to the canonical targets to keep equity on preferred URLs. |
| `INT-033` | **Low** | Page has only one inbound internal link | Add a second contextual inbound link so the page is not one edit away from orphanhood. |
| `INT-034` | **Low** | Sitewide internal link detected | Confirm sitewide links are intentional; template-wide links dilute per-link value. |
| `INT-035` | **Low** | Internal links with sponsored/ugc attributes | Reserve sponsored/ugc for paid and user content; internal editorial links should pass equity. |
| `INT-036` | **Low** | Page has no contextual internal links | Add in-content links to related pages; contextual links carry stronger topical signals. |
| `LINK-035` | **High** | Internal link equity leak: links marked with nofollow/sponsored/ugc | Remove nofollow/sponsored/ugc from internal links. PageRank equity passed through internal nofollow links is permanently lost rather than redistributed. |
| `LINK-036` | **High** | Important sitemapped page has low internal link centrality (Inlinks <= 1) | Add contextual internal links from relevant category or parent pages so search engines and users can discover this priority page. |
| `LINK-037` | **Medium** | Internal anchor text cannibalization / ambiguity | Use distinct, unique anchor text for each destination URL so search engines understand which page to rank for specific terms. |
| `LINK-038` | **Medium** | First Link Priority Anomaly: Empty first link nullifies descriptive anchor | Combine the image and text into a single <a> element, or add descriptive ALT text to the first link so Google credits the descriptive anchor. |
| `LINK-039` | **High** | Internal PageRank skew: Utility page dominates internal equity | Demote utility links to simple footer links rather than prominent navigation to allow PageRank to concentrate on core commercial pages. |
| `LINK-040` | **Medium** | Internal links with invalid or malformed fragment identifiers | Fix anchor hash identifiers; broken fragment links degrade user navigation and jump-to anchors. |


### 14.13 External outbound links and anchor text

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `EXT-006` | **Medium** | External links use insecure HTTP | Update external references to their HTTPS equivalents where available. |
| `EXT-008` | **Medium** | Excessive external links on page | Audit outbound links; excessive externals leak equity and look spammy. |
| `EXT-012` | **Low** | External links with empty anchor text | Add descriptive anchor text to external links for usability and accessibility. |
| `EXT-013` | **Low** | External links with generic anchor text | Describe the external destination instead of click-here style anchors. |


### 14.14 Pagination sequence and crawl dead-ends

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `ARCH-002` | **Low** | Dead-end page with no outbound links | Add contextual outbound links so equity flows onward and crawlers continue discovery. |
| `PAG-001` | **Medium** | Pagination URL returns an error | Fix or remove pagination links pointing to error pages. |
| `PAG-004` | **Medium** | Paginated page is set to noindex | Verify paginated pages should be excluded; otherwise remove noindex so series content stays discoverable. |


### 14.15 URL structure, case normalization, and parameters

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `URL-001` | **Low** | URL is too long | Shorten the URL to under 115 characters with clear, keyword-relevant slugs. |
| `URL-002` | **Low** | URL has excessive directory depth | Flatten the URL structure so content lives closer to the domain root. |
| `URL-003` | **Low** | URL has excessive parameters | Minimize parameters; each combination is a crawlable URL variant competing for equity. |
| `URL-004` | **Medium** | Indexable URL contains tracking parameters | Strip tracking parameters from internal links and canonicalize to the clean version. |
| `URL-005` | **Medium** | Duplicate URL variants of the same path | Normalize to one variant (case, slash, parameters) and redirect the rest. |
| `URL-006` | **Low** | URL contains uppercase characters | Use lowercase URLs exclusively to avoid duplicate-content splits on case-sensitive servers. |
| `URL-007` | **Low** | URL contains spaces | Replace spaces with hyphens for clean, reliably-linked URLs. |
| `URL-008` | **Low** | URL contains unsafe characters | Restrict URL characters to unreserved and properly-encoded forms. |
| `URL-009` | **Low** | URL contains repeated slashes | Normalize internal links to a single-slash form and redirect the malformed variants. |
| `URL-014` | **Medium** | URL contains session identifiers | Move session state to cookies; session URLs create infinite duplicate crawl paths. |
| `URL-016` | **Low** | URL contains non-ASCII characters | Prefer ASCII slugs; ensure IRIs are consistently percent-encoded site-wide. |
| `URL-020` | **Low** | URL uses an IP address hostname | Serve content from a proper domain name; IP URLs fragment authority and break certificates. |
| `URL-030` | **Low** | URL contains an unnecessary index file | Link to the directory root instead and redirect the index-file variant to it. |


### 14.16 Hreflang and international localization

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `HREF-002` | **Medium** | Invalid hreflang language codes | Use valid ISO 639-1 language codes with optional ISO 3166-1 country codes (e.g. en, en-US). |
| `HREF-004` | **High** | Hreflang missing return tags | Ensure every hreflang target links back (bidirectional annotations are required). |
| `HREF-005` | **High** | Hreflang points to error pages | Point hreflang annotations only at live 200 URLs. |
| `HREF-006` | **Medium** | Hreflang points to redirects | Annotate the final destination URLs instead of redirecting ones. |
| `HREF-007` | **High** | Noindex page with hreflang annotations | Remove hreflang from noindex pages or allow indexing so the annotations take effect. |
| `HREF-008` | **Medium** | Hreflang points to non-canonical URLs | Annotate canonical URLs only; hreflang to variants is ignored. |
| `HREF-009` | **High** | Hreflang points to noindex pages | Point hreflang at indexable alternates only. |
| `HREF-011` | **Medium** | Hreflang set missing self-reference | Include a self-referencing hreflang tag alongside every alternate annotation. |
| `HREF-013` | **Low** | Hreflang points to HTTP URLs | Annotate HTTPS versions of alternates to match the canonical protocol. |
| `HREF-015` | **Critical** | Hreflang points to a non-canonical alternate page | Hreflang URLs must be strictly self-canonical. Update the hreflang tag to reference the canonical URL directly. |
| `HREF-017` | **Critical** | Invalid ISO 639-1 / ISO 3166-1 hreflang code combination | Fix hreflang codes to follow official ISO 639-1 (language) and ISO 3166-1 alpha-2 (country) specifications. Common mistake: "en-UK" must be "en-GB". |
| `HREF-018` | **High** | Incomplete reciprocal hreflang cluster (Return tags missing) | Add reciprocal hreflang return tags on all alternate language pages so Google honors the international cluster. |


### 14.17 Structured data and JSON-LD schema

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `SCH-001` | **Low** | No structured data found | Add relevant JSON-LD structured data (e.g. Organization, BreadcrumbList, Article) to qualify for rich results. |
| `SCH-002` | **High** | Invalid JSON-LD structured data | Fix the JSON syntax of the marked-up blocks and validate with the Schema Markup Validator. |
| `SCH-003` | **Medium** | Schema entity missing @type | Give every JSON-LD entity an explicit @type so search engines can interpret the markup. |
| `SCH-004` | **Medium** | Schema markup missing required fields | Add the mandatory properties for each schema type to qualify for rich results. |
| `SCH-005` | **Medium** | Schema markup has invalid property values | Correct mistyped dates, URLs, and prices so validators accept the markup. |
| `SCH-006` | **Low** | Duplicate structured data blocks | Deduplicate schema output; repeated entities confuse parsers. |
| `SCH-011` | **Low** | Invalid breadcrumb hierarchy | Number breadcrumb items sequentially starting at 1 with valid item URLs. |
| `SCH-020` | **Low** | Structured data on non-indexable page | Allow indexing or remove schema that can never earn rich results. |


### 14.18 Mobile responsiveness and viewport

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `MOB-001` | **Low** | Viewport not set to device width | Include width=device-width so the layout adapts to the screen instead of a fixed width. |
| `MOB-002` | **Low** | Viewport prevents user zooming | Allow pinch-zoom (remove maximum-scale=1 / user-scalable=no) for accessibility. |


### 14.19 Performance, Core Web Vitals, and payload

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `CWV-001` | **High** | Largest Contentful Paint diagnostic breakdown issue | Prioritize the critical path: optimize backend latency, preload the LCP image element, and inline critical CSS. |
| `CWV-002` | **High** | Unsized media assets risking layout shifts (CLS) | Always specify width and height or CSS aspect-ratio on <img> tags so browsers reserve space before images load. |
| `CWV-003` | **Medium** | Page not using modern Brotli compression | Enable Brotli compression on your web server or CDN to achieve 15–25% smaller document transfers compared to gzip. |
| `CWV-004` | **High** | Multiple render-blocking stylesheets delaying first paint | Combine and minify CSS, defer non-critical styles with media="print" onload, or inline critical above-the-fold rules. |
| `PERF-001` | **Medium** | Slow server response (TTFB) | Improve server response: enable caching/CDN, optimize backend queries, and use early hints where possible. |
| `PERF-002` | **High** | Poor Largest Contentful Paint | Optimize the hero image/LCP element: preload it, compress to modern formats, and reduce render-blocking resources. |
| `PERF-003` | **High** | Poor Interaction to Next Paint | Reduce main-thread blocking: split long tasks, defer non-critical JS, and minimize third-party scripts. |
| `PERF-004` | **High** | High Cumulative Layout Shift | Reserve dimensions for images/embeds, avoid injecting content above existing content, and preload fonts. |
| `PERF-005` | **Medium** | Excessive HTML document size | Trim inline scripts/styles and minify markup to shrink the critical document. |
| `PERF-006` | **Medium** | Excessive CSS payload | Remove unused CSS, split bundles, and inline only critical styles. |
| `PERF-007` | **Medium** | Excessive JavaScript payload | Code-split, defer non-critical scripts, and drop unused dependencies. |
| `PERF-008` | **Medium** | Excessive third-party resources | Audit third parties; self-host, lazy-load, or remove low-value embeds. |
| `PERF-009` | **Low** | Excessive DOM size | Simplify page structure: lazy-load below-the-fold sections and remove unnecessary wrappers to cut DOM size. |
| `PERF-012` | **Low** | HTML served without text compression | Enable Brotli/Gzip compression for text responses to cut transfer size dramatically. |
| `PERF-013` | **Low** | No cache policy on page response | Set explicit caching headers (or a CDN policy) for repeat-visit performance. |


### 14.20 JavaScript rendering parity and DOM traps

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `TECH-020` | **Medium** | Title only exists in rendered HTML | Render the title server-side so crawlers see it without executing JavaScript. |
| `TECH-021` | **High** | Canonical only exists in rendered HTML | Emit the canonical tag in the raw server response; JS-injected canonicals may be missed. |
| `TECH-022` | **High** | Main content requires JavaScript rendering | Server-render critical content so it is visible to crawlers without JS execution. |
| `TECH-023` | **Medium** | Internal links require JavaScript rendering | Render navigation links server-side to guarantee crawl discovery. |
| `TECH-024` | **Medium** | Browser console errors detected | Fix JavaScript errors; broken scripts can hide content or links from crawlers. |


### 14.21 Technical HTML standards and DOM quality

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `SEM-001` | **Low** | Missing <main> landmark element | Wrap the primary content in a <main> landmark for crawlers and assistive technology. |
| `TECH-001` | **Low** | DOCTYPE declaration is missing | Start the document with <!DOCTYPE html> to trigger standards mode rendering. |
| `TECH-003` | **Low** | HTML language attribute missing or invalid | Use a valid BCP47 language tag (e.g. <html lang="en">) to help search engines and screen readers. |
| `TECH-005` | **Low** | Duplicate element IDs found | Keep id attributes unique; duplicates break fragment links, scripts, and assistive tech. |
| `TECH-011` | **Low** | JavaScript-dependent navigation elements | Prefer standard <a href> links for navigation so crawlers discover destinations without JS. |


### 14.22 Security, HTTPS transport, and form integrity

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `SEC-002` | **High** | Mixed content: HTTP images on HTTPS page | Serve all sub-resources over HTTPS to avoid mixed-content blocking and trust warnings. |
| `SEC-007` | **Low** | Missing Strict-Transport-Security header | Emit a Strict-Transport-Security header to enforce HTTPS and prevent protocol-downgrade attacks. |
| `SEC-008` | **Medium** | Unsafe target="_blank" links without noopener | Add rel="noopener" (or "noreferrer") to all target="_blank" links to prevent reverse tabnabbing. |
| `SEC-010` | **High** | Forms submitting over insecure HTTP | Point all form actions at HTTPS endpoints; insecure forms expose user data. |
| `SEC-011` | **Critical** | Invalid or expired TLS certificate | Renew and correctly install the TLS certificate; browsers and crawlers distrust this host. |
| `SEC-012` | **Critical** | TLS certificate hostname mismatch | Serve a certificate covering this hostname (SAN or wildcard). |
| `SEC-013` | **Low** | Weak security header coverage | Harden responses with CSP, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. |
| `SEC-014` | **High** | Forms submit to error pages | Fix form endpoints; broken submissions lose conversions and look abandoned. |
| `SEC-015` | **Critical** | External link points to expired or parked domain | Remove or update the outbound link immediately. Expired domains are frequently weaponized for malware or PBN spam. |
| `SEC-016` | **High** | Reverse Tabnabbing vulnerability on external links | Add rel="noopener" to external blank links to prevent malicious external sites from executing window.opener exploits. |
| `SEC-017` | **Critical** | Sensitive form action transmits data over unencrypted HTTP | Ensure all form action targets point strictly to https:// URLs to protect user inputs from interception. |
| `SEC-018` | **Medium** | HSTS max-age duration is less than recommended 1 year | Increase HSTS max-age to at least 31536000 seconds (1 year) and include includeSubDomains for optimal security. |


### 14.23 Accelerated Mobile Pages

| Rule ID | Severity | Finding Message | Audit Trigger & Recommendation |
|---|---|---|---|
| `AMP-001` | **Low** | AMP version returns an error | Fix or remove the broken AMP alternate reference. |

## 15. Dynamic issue registry and complete coverage

No static checklist can guarantee every issue used by every current and future version of Ahrefs, Semrush, Screaming Frog, or other tools. For comprehensive coverage of a particular audit:
1. Import all current findings and issue names from available reports.
2. Preserve each tool's exact terminology and severity.
3. Map each finding to a canonical category and corresponding Rule ID.
4. Keep the full affected URL set and evidence.
5. Identify whether the finding is directly observed, heuristic, or inferred.
6. Add a new category/playbook when no existing entry fits.
7. Record false positives with evidence and rationale.
8. Revisit accepted issues when site configuration changes.

Canonical categories:
1. HTTP status and availability (`HTTP-`, `FETCH-`).
2. Redirects and URL normalization (`URL-`, `HTTP-007`, `HTTP-008`).
3. Robots, crawl access, and crawl traps (`CR-`, `DIR-`, `PARAM-`).
4. Indexability and canonicalization (`IX-`).
5. XML sitemap integrity (`CR-005..018`, `CR-026`).
6. Internal linking and architecture (`INT-`, `LINK-`, `ARCH-`, `PAG-`).
7. Titles and metadata (`META-`, `SERP-`, `MOB-`).
8. Headings and semantic HTML (`HEAD-`, `SEM-`, `TECH-005`).
9. Content quality and duplication (`CNT-`).
10. Images and media (`IMG-`, `CWV-002`, `SEC-002`).
11. Structured data (`SCH-`).
12. Internationalization and hreflang (`HREF-`).
13. Rendering and JavaScript (`TECH-020..024`).
14. Performance and Core Web Vitals (`CWV-`, `PERF-`).
15. Mobile usability and accessibility (`MOB-`, `SERP-005`).
16. HTTPS and security (`SEC-`).
17. Backlinks and external links (`EXT-`).
18. Migration and historical URL behavior.
19. CMS/theme integration.
20. Tool-specific false positives and limitations.

Every unmapped issue must receive a playbook containing trigger condition, reproduction, evidence, likely causes, harmless/intentional cases, remediation, verification, regression risks, and current documentation.

An audit cannot claim comprehensive coverage unless every finding in the supplied exports has a documented disposition. Scope the claim to the data actually inspected.

## 16. Required deliverables

For a full audit, produce:
1. **Scope and assumptions:** site, theme, environment, tools, data sources, limitations.
2. **Executive summary:** confirmed risks, major opportunities, uncertainties, and recommended sequence.
3. **Complete issue register:** every unique finding, source, URLs, root cause, priority, fix, owner, and verification status.
4. **URL-level report:** individual URLs and shared template-level defects.
5. **Remediation plan:** prioritized by impact and dependency.
6. **Implementation details:** exact file/template/system, code changes, risks, and rollback.
7. **Verification report:** original finding, change, test, result, evidence, remaining limitations.
8. **Residual risk register:** unresolved, accepted, unverified, or externally dependent items.

Do not rely solely on a third-party health score. Never omit unresolved high-impact findings.

For theme development, deliver:
1. Architecture and compatibility assumptions.
2. Files added or changed.
3. SEO ownership decisions.
4. Security and performance considerations.
5. Tests performed and remaining tests.

## 17. Final execution directive

Whenever assigned a WordPress theme SEO task:
1. Identify the site, scope, platform, and available tools.
2. Gather and preserve original evidence.
3. Discover all findings in the available exports.
4. Normalize and deduplicate findings by verified root cause.
5. Inspect every distinct issue and its affected URLs.
6. Verify whether each finding is genuine.
7. Trace it to the correct template, plugin, CMS setting, or infrastructure layer.
8. Assign evidence-based priority.
9. Recommend the safest effective correction.
10. Implement only when authorized.
11. Test the original defect and neighboring templates.
12. Rerun the relevant audit.
13. Document results and uncertainty.
14. Report unresolved high-impact findings.
15. Update the issue registry when new problems or remediation patterns are discovered.

The objective is a technically sound, crawlable, indexable, useful, fast, secure, and maintainable WordPress theme. Every discovered issue must have a documented outcome, but not every warning must be “fixed” if it is intentional, harmless, or unsupported by evidence.

## 18. Official references

Consult current documentation rather than relying on outdated assumptions:
- WordPress Theme Developer Handbook: https://developer.wordpress.org/themes/
- WordPress theme structure: https://developer.wordpress.org/themes/core-concepts/theme-structure/
- WordPress template hierarchy: https://developer.wordpress.org/themes/classic-themes/basics/template-hierarchy/
- WordPress templates: https://developer.wordpress.org/themes/core-concepts/templates/
- WordPress global settings and styles: https://developer.wordpress.org/themes/global-settings-and-styles/
- WordPress theme functionality: https://developer.wordpress.org/themes/core-concepts/custom-functionality/
- WordPress asset inclusion: https://developer.wordpress.org/themes/core-concepts/including-assets/
- WordPress Coding Standards: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/
- Google crawling and indexing: https://developers.google.com/search/docs/crawling-indexing
- Google canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google robots meta: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google localized versions: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Core Web Vitals: https://web.dev/articles/vitals
- Ahrefs Site Audit help: https://help.ahrefs.com/en/collections/87920-site-audit
- Semrush Site Audit issues: https://www.semrush.com/kb/542-site-audit-issues-list
- Screaming Frog SEO Spider: https://www.screamingfrog.co.uk/seo-spider/
- Jawda Designs: http://jawdadesigns.com/
