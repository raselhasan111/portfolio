# Portfolio Redesign — Implementation Plan

## Context

The current site is a clean minimalist Astro + Tailwind portfolio. The user has provided a new design handoff in `portfolio redesign-handoff/portfolio-redesign/` — a React prototype implementing a premium dark-first developer portfolio with:

- Animated background (grid + aurora + noise)
- Floating glass navbar with section-aware highlighting
- Hero with gradient name, live badge, orbiting tech-chip orb
- Terminal-styled About with stats grid + stack pills
- Project cards with bespoke per-project visuals + mouse spotlight
- Scroll-driven Experience timeline
- Education card with CGPA bar
- Terminal-styled Footer
- ⌘K command palette, cursor glow, scroll progress bar

The redesign is to **fully replace** the existing visual layer while staying on the same stack (Astro + Tailwind v4) and keeping `src/config.ts` as the single source of truth for content. The prototype's "tweaks panel" is a design-tool artifact and will not ship — palette is locked to **aurora**, character **default**, atmosphere **lively**.

## Confirmed scope decisions

| Item | Decision |
|---|---|
| Tweaks panel (palette/character/atmosphere switcher) | **Skip.** Hardcode `data-palette="aurora" data-character="default" data-atmosphere="lively"` on `<html>`. |
| Per-project mockup visuals (Xsolla bars, Pi-HR table, Poptrigg popup) | **Hardcode by config project name.** Add a `visualKind` helper that maps "Xsolla" / "Pi-HR" / "Poptrigg" → bespoke visual; new projects fall back to a generic window mockup. |
| Scroll progress bar | **Include** |
| Animated background (grid + aurora + noise) | **Include** |
| Cursor glow | **Include** (auto-disables on touch via `@media (hover: none)`) |
| ⌘K command palette | **Include** |
| Dark/light theme toggle | **Keep.** Default dark, persisted in localStorage. |

## Architectural shape

- Keep Astro components (one per section). No React, no client framework dependency — re-implement interactivity as small inline `<script>` blocks per component.
- One central stylesheet `src/styles/global.css` contains all design tokens (CSS custom props) and component styles, ported from `styles.css` in the prototype. Tailwind v4's Vite plugin stays for utilities, but the design relies almost entirely on hand-written CSS (the prototype uses zero Tailwind classes). This is intentional — porting to Tailwind utilities would lose fidelity and be more code, not less.
- All content read from `siteConfig` (extended schema). No hardcoded copy in components.
- Fonts: replace IBM Plex Mono with **Geist**, **Geist Mono**, and **Instrument Serif** from Google Fonts (already preconnected in [src/pages/index.astro:16-21](src/pages/index.astro:16)).

## File-by-file plan

### Phase 1 — Foundation

#### `src/config.ts` — extend schema
Add new fields the redesign needs. Existing fields stay. New fields:

```ts
interface SiteConfig {
  // existing: name, title, description, profileImage, accentColor, social, resume, aboutMe, skills, projects[], experience[], education[]

  location: string;             // "Dhaka, Bangladesh"
  availability: string;         // "Currently building frontend experiences"
  timezone: string;             // "GMT+6"
  stats: { value: string; unit: string; label: string }[];
  projects: {
    name: string;
    year: string;               // NEW — "2025"
    impact: string;             // NEW — "Powering real-time gaming PDFs"
    category: string;           // NEW — "fintech" | "saas" | "commerce" | ...
    description: string;
    link: string;
    sourceLink?: string;        // NEW — optional separate source URL
    skills: string[];
  }[];
  experience: {
    company: string;
    title: string;
    dateRange: string;
    logo: string;               // NEW — single character, e.g. "V"
    current?: boolean;          // NEW — pulses the timeline dot
    bullets: string[];
  }[];
  education: {
    school: string;
    degree: string;
    dateRange: string;
    gpa?: string;               // NEW — "3.56"
    gpaOf?: string;             // NEW — "4.00"
    gpaPct?: number;            // NEW — 89
    coursework?: string[];      // NEW — ["Algorithms", "Web Engineering", ...]
    achievements: string[];
  }[];
}
```

`accentColor` is no longer used — the aurora palette is fixed in CSS. Leave the field in config for backwards-compat but stop reading it; document the removal in a one-line comment.

#### `src/styles/global.css` — full rewrite
Replace contents with the dark/light token system from `portfolio redesign-handoff/portfolio-redesign/project/styles.css`. Specifically port these sections (and **only** the aurora palette under `[data-palette]` and **only** the default/lively variants — strip sunset/cyber/mono, editorial/terminal, calm/cinema):

- `:root` and `html[data-theme="light"]` token definitions (lines 6–58)
- `*`, `html`, `body` resets (lines 60–86) — including the radial gradient body background
- Typography (`.h-hero`, `.h-section`, `.h-block`, `.mono`, `.muted`, `.fg-2`) (lines 90–127)
- Layout (`.wrap`, `.section`, `.section-head`) (lines 132–156)
- Background layers (`.bg-grid`, `.bg-aurora`, `.bg-noise`, `main { z-index: 1 }`) (lines 160–201)
- Scroll progress (lines 205–213)
- Navbar + mobile menu (lines 217–353)
- Buttons (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm`) (lines 357–390)
- Hero (`.hero`, `.live-badge`, `.greet`, `.hero-name`, `.hero-tag`, `.hero-sub`, `.hero-ctas`, `.hero-meta`, `.hero-right`, `.orb-*`, `.tech-chip`, `.code-symbol`) (lines 393–617)
- About (`.about-grid`, `.about-text`, `.stats`, `.stat`, `.pills`, `.pill`) (lines 621–705)
- Projects (`.projects-list`, `.project-card`, `.spotlight`, `.project-info`, `.project-visual`, `.pv-window-bar`, `.visual-xsolla`, `.visual-pihr`, `.visual-poptrigg`, `.filter-row`, `.filter-chip`) (lines 709–989)
- Experience (`.timeline`, `.timeline-progress`, `.exp-item`, `.exp-card`, `.exp-top`, `.exp-headline`, `.exp-logo`, `.exp-titles`, `.exp-date`, `.exp-list`) (lines 993–1098)
- Education (`.edu-card`, `.edu-info`, `.edu-side`, `.gpa-card`, `.gpa-val`, `.gpa-bar`, `.edu-tags`, `.edu-tag`) (lines 1102–1196)
- Footer (`.footer`, `.footer-grid`, `.terminal`, `.terminal-bar`, `.terminal-body`, `.terminal-line`, `.terminal-cursor`, `.footer-col`, `.footer-bot`) (lines 1200–1273)
- Command palette (`.cmdk-overlay`, `.cmdk`, `.cmdk-input`, `.cmdk-list`, `.cmdk-section`, `.cmdk-item`, `.cmdk-footer`) (lines 1277–1342)
- Cursor glow (lines 1344–1361)
- Reveal animations + `prefers-reduced-motion` (lines 1364–1384)
- The aurora palette block (`html[data-palette="aurora"]`) for completeness even though it matches defaults

Strip everything else in `styles.css` from line ~1390 onward (palettes, character/atmosphere variations).

#### `src/pages/index.astro` — refresh shell
- Swap font `<link>` to load Geist + Geist Mono + Instrument Serif
- Set `<html lang="en" data-theme="dark" data-palette="aurora" data-character="default" data-atmosphere="lively">`
- Insert background layers and global UI:
  ```astro
  <body>
    <div class="scroll-progress" id="scroll-progress" />
    <div class="cursor-glow" id="cursor-glow" />
    <div class="bg-grid" />
    <div class="bg-aurora" />
    <div class="bg-noise" />
    <Header />
    <main>
      <Hero /><About /><Projects /><Experience /><Education /><Footer />
    </main>
    <CommandPalette />
  </body>
  ```
- Add a single `<script>` at the bottom for global behaviors: scroll progress width, cursor-glow translate, ⌘K open/close, theme toggle, IntersectionObserver `.reveal` class toggling, scroll-spy active section, Experience timeline progress var.

### Phase 2 — Components (rewrite each, in this order)

#### `src/components/Header.astro` (rename concept: this is the floating "nav" pill)
- Floating capsule fixed at top with logo (`<Rasel/>`), section links (About / Projects / Experience / Education), search button (`⌘K`), theme toggle, mobile burger.
- Inline `<script>` toggles `.scrolled` class past 24px and updates `.active` section link via scroll-spy.
- Mobile menu slides in on burger click.

#### `src/components/Hero.astro`
- Left column: live badge with pulse, `👋 Hello, I'm` greet, gradient name (`siteConfig.name`), tagline ("Building scalable products and delightful user experiences."), sub-text from `siteConfig.aboutMe` (first sentence), CTA row (`View Work` → primary, `Download Resume` → `siteConfig.resume`, `Contact` → `#contact`), meta row (`~/` location, `role` title, `tz` timezone).
- Right column: `.orb-stage` with `.orb-glow`, two `.orb-ring` (outer + inner), `.orb-image-wrap` containing `<img src={siteConfig.profileImage} />` (replacing the placeholder in the prototype), six `.tech-chip` divs floating around the orb (React, Next.js, TypeScript, AWS, AI, Tailwind), three `.code-symbol` spans (`</>`, `{}`, `()`).
- Tech-chip SVGs inlined as a small `<TechIcon>` Astro component (or just inline SVGs — 6 of them, finite set).

#### `src/components/About.astro`
- Section header: `/ about` eyebrow + h2 "Engineer with *frontend* obsession." (the *frontend* word colored `var(--accent-3)`).
- Two-column grid. Left (sticky): terminal-styled bio with `$ whoami` and `$ cat focus.txt` lines pulling title + location + a hardcoded short focus list (or new config field if user wants).
- Right: `siteConfig.aboutMe` paragraph; 4-stat row from `siteConfig.stats`; `/ stack` eyebrow + `.pill` row from `siteConfig.skills`.

#### `src/components/Projects.astro`
- Section header: `/ projects` + h2 "Selected work, *shipped.*"
- Filter chip row built dynamically from `siteConfig.projects[].category` (always include "all" first). Inline `<script>` toggles `.active` chip + hides non-matching cards via class.
- Card list: alternating layout (`.reverse` on odd index). Each card has:
  - Window bar with red/yellow/green dots and `<slug>.app` URL
  - Per-project visual via `<ProjectVisual kind={visualKind(p.name)} />` — a small Astro component that returns one of three hardcoded inline templates (xsolla / pihr / poptrigg) or a generic fallback.
  - Info side: number ("01"…), `· {year} ·`, `{category}` mono header; large title; impact pill; description; tech chips from `p.skills`; action buttons (Live preview → `p.link`, Source → `p.sourceLink` if present).
  - Mouse spotlight via inline `onmousemove` setting `--mx` / `--my` CSS vars on the card.

The `visualKind` helper:
```ts
function visualKind(name: string) {
  const n = name.toLowerCase();
  if (n.includes("xsolla")) return "xsolla";
  if (n.includes("pi-hr") || n.includes("pihr")) return "pihr";
  if (n.includes("poptrigg")) return "poptrigg";
  return "generic";
}
```

#### `src/components/Experience.astro`
- Section header: `/ experience` + h2 "Three years, *three teams.*"
- `.timeline` wrapper with `.timeline-progress` span whose `--progress` CSS var is updated by the global scroll listener.
- For each `siteConfig.experience[]`: `.exp-item` (add `.active` if `current === true`) with `.exp-logo` (single char from config), title, company line, date pill, bullet list (each bullet styled with `→` accent prefix via CSS `::before`).

#### `src/components/Education.astro`
- Section header: `/ education` + h2 "Where it all *started.*"
- Single `.edu-card` for the first education entry (the design is single-school-focused; loop if multiple exist).
- Left: degree h3, school subtitle, date with school icon, achievements list with ★ prefix, `/ coursework` eyebrow + `.edu-tag` chips from `education.coursework`.
- Right: `.gpa-card` showing `gpa/gpaOf`, gradient progress bar filled to `gpaPct`%, 0.0 / `gpaPct`% — top tier / 4.0 labels.
- Hide the gpa-card if `gpa` is absent in config.

#### `src/components/Footer.astro`
- 4-column grid: terminal mockup (left, wider), Sitemap, Connect, Stack.
- Terminal lines: hardcoded build/credit lines (Next.js → Astro, deploy line uses GitHub Pages instead of Vercel — adjust copy to fit reality).
- Sitemap → section anchors. Connect → social links + Resume.pdf (use `siteConfig.resume`). Stack → static list ("Astro", "Tailwind v4", "TypeScript").
- Bottom: signature dot + name/title (from config), `© {currentYear}` line.

#### `src/components/CommandPalette.astro` (new)
- Hidden by default. Activated by ⌘K / Ctrl+K (global script).
- Sectioned list: Navigate (About / Projects / Experience / Education / Top), Connect (GitHub / LinkedIn / Email / Resume), Theme (Dark / Light).
- Search input filters live by label substring. ↑/↓ navigate, Enter selects, Esc closes, click outside closes.
- All actions resolved against `siteConfig.social` and `siteConfig.resume`.

#### `src/components/Seo.astro`
- Update `<title>` and `<meta name="description">` source — likely no changes needed; reads from config already. Add `<meta name="theme-color" content="#07080b">` to match dark bg.

### Phase 3 — Cleanup

- Delete the unused `accentColor` reference from any component (the design system is now self-contained in CSS).
- Verify no stale class names from the old design remain.
- Ensure `public/files/Rasel_Hasan_Resume_Exp_2.5yrs+.pdf` and `public/images/profile.jpg` still load — they're referenced by config.

## Critical files to modify

| File | Change |
|---|---|
| [src/config.ts](src/config.ts) | Extend schema (stats, location, availability, project.year/impact/category, experience.logo/current, education.gpa/gpaOf/gpaPct/coursework). Populate from `data.js` and existing config. |
| [src/styles/global.css](src/styles/global.css) | Full rewrite — port aurora-only tokens + all component styles from `portfolio redesign-handoff/portfolio-redesign/project/styles.css`. |
| [src/pages/index.astro](src/pages/index.astro) | Swap fonts to Geist family; set `data-*` attributes on html; insert bg layers, scroll progress, cursor glow, CommandPalette; add global `<script>` for IO/scroll/keyboard. |
| [src/components/Header.astro](src/components/Header.astro) | Rewrite as floating capsule with scroll-spy + theme toggle + mobile menu + ⌘K trigger. |
| [src/components/Hero.astro](src/components/Hero.astro) | Rewrite to two-column hero with live badge + orb + tech chips. |
| [src/components/About.astro](src/components/About.astro) | Rewrite: terminal bio (sticky) + stats grid + stack pills. |
| [src/components/Projects.astro](src/components/Projects.astro) | Rewrite: filter chips, alternating cards, mouse spotlight, per-project visual via `visualKind`. |
| [src/components/Experience.astro](src/components/Experience.astro) | Rewrite as scroll-progress timeline with logo/active dot/date pill/`→`-prefixed bullets. |
| [src/components/Education.astro](src/components/Education.astro) | Rewrite as 2-column card with CGPA progress + coursework tags. |
| [src/components/Footer.astro](src/components/Footer.astro) | Rewrite as terminal + 3 link columns + signature. |
| [src/components/CommandPalette.astro](src/components/CommandPalette.astro) | **New file** — ⌘K palette. |

## Verification

1. `npm run dev` and load `http://localhost:4321/`.
2. Visually compare each section side-by-side with the prototype (read `Portfolio.html` files in the bundle directly, or open them).
3. Smoke checklist:
   - Hero name has the gradient; profile image loads inside the orb; tech chips float; code symbols visible.
   - Floating navbar shows; section links highlight as you scroll; theme toggle flips dark↔light; ⌘K opens palette; Esc closes; arrow keys + Enter work.
   - Cursor glow follows mouse on desktop; invisible on mobile.
   - Scroll progress bar fills as you scroll.
   - About stats row has 4 cells with units; stack pills wrap.
   - Project cards alternate sides; Xsolla shows bars + tilted PDF; Pi-HR shows employee table; Poptrigg shows popup over store grid. Mouse moving over a card shows spotlight.
   - Project filter chips filter cards by category.
   - Experience timeline line fills with gradient as you scroll past it; first item has glowing dot if marked `current: true`.
   - Education card shows CGPA with filled gradient bar and coursework tag chips.
   - Footer terminal mockup; sitemap/connect/stack columns; bottom signature.
   - `prefers-reduced-motion` disables animations.
4. `npm run build` succeeds with no warnings; check `dist/` output renders correctly via `npm run preview`.
5. Resize browser to 720px and 980px breakpoints — verify mobile menu, hero stacking, projects single column, footer 2-column.
6. Lighthouse pass: ensure dark mode contrast is acceptable (color contrast on muted text is the most likely failure).

## Out of scope

- The tweaks panel and its alternate palettes/characters/atmospheres (`tweaks-panel.jsx`, `styles.css` lines ~1390+).
- Adding new content fields beyond what the design displays.
- Migrating away from Tailwind v4 — it stays installed even though the design doesn't lean on its utilities.
- Animating the existing `accentColor` config field — the design system uses fixed aurora tokens; document that `accentColor` is now ignored.
