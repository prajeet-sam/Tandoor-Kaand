# The Tandoor Case

An interactive, scroll-driven case file on the 1995 murder of Naina Sahni — the shooting at the Mandir Marg flat, the failed incineration in the Bagiya tandoor, and the forensic chain that convicted Sushil Sharma.

Built as a fully static Next.js export with a handwritten, dossier-inspired aesthetic.

**Live at:** <https://the-tandoor-case.vercel.app>

---

## Content

The case is told across ten scroll sections:

1. **Hero** — cold-open with classification jacket (FILE NO. EXH-CR/95-04 · REG 04 JUL 1995 · JURIS DELHI · RESTRICTED)
2. **Summary** — opening brief
3. **Background** — the Mandir Marg flat, the marriage, the People's Party, the affair
4. **Timeline** — scroll-linked chronology, curated from trial records and reporting
5. **Crime Scene** — the Burari murder scene and its forensic documentation
6. **Staging** — the car trunk and the Bagiya tandoor
7. **Autopsy** — medico-legal findings and their disputed readings
8. **Verdict Ladder** — the trial court to the Delhi High Court
9. **Legacy** — the case's afterlives in law and memory
10. **Sources** — cited sources, methodology, and closing credit

## Tech stack

- **Next.js 16** (`output: "export"` — fully static) + **React 19** + TypeScript
- **Tailwind CSS v4** with a custom dossier palette on a paper-grain background
- **Framer Motion** for scroll-driven reveals and transitions
- **Caveat / Patrick Hand** (self-hosted via `next/font`) for the handwritten look
- **JSON-LD** structured data (WebSite / Person / Article) + Open Graph card

## Project structure

```
app/
  layout.tsx        # Fonts, SEO metadata, canonical, OG/Twitter image
  page.tsx          # Page shell + JSON-LD graph
  globals.css       # Dossier palette, utilities, grain overlay
  sitemap.ts        # Static sitemap.xml
  robots.ts         # Static robots.txt
  icon.svg          # Favicon monogram
components/
  ScrollProgress.tsx  # Scroll-progress ticker with collision-aware section labels
  JumpNav.tsx         # In-page act navigation
  Section.tsx         # Numbered SHEET framing
  Reveal.tsx          # Scroll reveal wrapper
  MotionProvider.tsx  # Framer Motion providers
  sections/           # One component per content section
data/               # All content as typed static modules
public/
  og-cover.png      # Social sharing card (1200x630)
scripts/
  clean-export.mjs  # Post-build cleanup of Next static-export artifacts
vercel.json         # Build command, security headers, path redirects
```

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # static export to /out (runs post-build cleanup)
npm run lint       # ESLint
```

## Deployment (Vercel)

This project deploys as a static export:

```bash
npm run build
vercel deploy --prod --yes
vercel alias set <deployment-url> the-tandoor-case.vercel.app
```

`vercel.json` pins the build command to `npm run build` (so the post-build cleanup always runs) and applies security headers and path redirects at the edge. HTTP is redirected to HTTPS by Vercel (308).

## Security posture

- **Headers via `vercel.json`:** strict Content-Security-Policy (same-origin + inline hydration only), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. HSTS is enforced by Vercel.
- **No backend surface:** zero API routes, zero server actions, no cookies, no forms, no user input — all content ships from static data modules.
- **Artifact hygiene:** `.vercelignore` excludes build output and local caches from uploads; `scripts/clean-export.mjs` (via `postbuild`) strips Next's static-export debug dumps so they never reach the CDN.
- `npm audit` clean.

## Credits

- **Author:** Anushka Vinay Chitnis — <https://www.linkedin.com/in/anushka-vinay-chitnis-697b0540b/>
- **Website:** Prajeet Sam — <https://www.linkedin.com/in/prajeet-sam-025117419/>