# Implementation Plan: Google Reader Revenue Manager (CMS Sync Integration)

Integrate the official Google Reader Revenue Manager (Subscribe with Google SwG Basic) script across GovIndiaNews to synchronize publication credentials, verify open-access status with Google, and strengthen Google News and Discover algorithmic trust.

---

## 1. Overview & Context

In your Google Publisher Center dashboard under **Reader Revenue Manager &gt; CMS sync**, Google generated the following dedicated publication snippet:

```html
<script async type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
<script>
  (self.SWG_BASIC = self.SWG_BASIC || []).push(
    basicSubscriptions => {
      basicSubscriptions.init({
        type: "NewsArticle",
        isPartOfType: ["Product"],
        isPartOfProductId: "CAow8trHDA:openaccess",
        clientOptions: { theme: "light", lang: "en" },
      });
    });
</script>
```

### Strategic Benefits for GovIndiaNews:
1. **Direct Google News Verification Signal:** This script establishes a live handshake between `govindianews.com` and Google's Reader Revenue Manager infrastructure for Publication ID `CAow8trHDA`.
2. **Open Access Integrity (`openaccess`):** Signals to Google that all recruitment alerts and guides are 100% free and open-access, eliminating any crawler ambiguity about paywalls.
3. **Discover & Top Stories Elevation:** Verified publications in Reader Revenue Manager receive prioritized crawl schedules and enhanced publisher credibility signals.

---

## 2. Step-by-Step Technical Implementation

### Step 1: Global `<head>` Integration in `index.html`
- Inject the Google SwG Basic script and initialization code directly inside the `<head>` of `index.html`.
- Configured with `theme: "light"` and `lang: "en"`.
- Runs asynchronously without blocking page render or Core Web Vitals (FID / LCP).

### Step 2: Prerender Pipeline Synchronization in `scripts/prerender.mjs`
- Because GovIndiaNews is fully prerendered into static HTML for 118+ routes, placing the snippet in `index.html` ensures that every prerendered HTML file (`dist/article/*`, `dist/blog/*`, `dist/exams/*`, etc.) automatically includes the SwG CMS snippet.
- We will verify that the prerendered HTML files retain the exact snippet.

### Step 3: Schema.org Product Alignment (`NewsArticle` Schema)
- Google's Reader Revenue Manager documentation recommends matching the SwG snippet with the `NewsArticle` JSON-LD schema:
  ```json
  "isAccessibleForFree": true,
  "isPartOf": {
    "@type": ["CreativeWork", "Product"],
    "name": "GovIndiaNews Open Access",
    "productID": "CAow8trHDA:openaccess"
  }
  ```
- We will update the schema generator in `scripts/prerender.mjs` and `src/utils/seoSchema.ts` so that all news articles explicitly match `CAow8trHDA:openaccess`.

---

## 3. Verification & Quality Assurance Gate

1. **Compilation & Linting:**
   - Execute `compile_applet` and `lint_applet` to ensure zero syntax or script conflicts.
2. **Production Build & Crawl Verification:**
   - Run `npm run build` to prerender all routes.
   - Run verification checks confirming that `dist/index.html` and article HTML files contain `swg-basic.js` and `CAow8trHDA:openaccess`.
3. **Google Publisher Center Final Step:**
   - Once published, you can return to the Publisher Center screen shown in your screenshot and click the confirmation button or check that the CMS status turns green/active.

---

## User Confirmation Request
Please review this implementation plan. Click **Proceed** to begin integrating the Google Reader Revenue Manager snippet.
