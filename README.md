# CFDE CONNECT

Public website for **CFDE CONNECT**, the Integration and Coordination Center (ICC) of the
NIH Common Fund Data Ecosystem.

Built as a static React single-page app (Vite + React Router). No backend, no auth, no CMS —
content lives in the page components.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:5173>.

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — mission, interactive CFDE wheel, cores, partners |
| `/meetings/spring-2026-recap` | CFDE Spring 2026 Meeting Recap |
| `/meetings/fall-2025-recap` | CFDE Fall 2025 Meeting Recap |
| `/meetings/spring-2025` | CFDE Spring 2025 Meeting |
| `/meetings/fall-2024` | CFDE 2024 Fall Meeting |
| `/cores/administrative` | Administrative Core (UAB) |
| `/cores/evaluation` | Evaluation Core (CU Anschutz) |
| `/cores/sustainability` | Sustainability Core (UCLA) |
| `/news` | News index |
| `/news/cfde-at-ashg-2025` | CFDE at ASHG 2025 |
| `/calendar` | Community calendar (Google Calendar embed) |

### External links

These live outside this app and are linked from the nav rather than rendered here:

| Link | Destination |
| --- | --- |
| Meetings → CFDE Fall 2026 Meeting | <https://fall2026.cfdeconnect.org/> |
| Service → Join / Collaborate | Google Form |
| Service → Talent Knowledge Graph | <https://cfdegraph.vercel.app/> |
| Portal (nav button) | <https://portal.cfdeconnect.org/> |

## Structure

```
public/
  images/        logos, team photos, meeting and news photos
  images/wheel/  CFDE wheel petals, center icons, and DCC program icons
  videos/        homepage hero background
src/
  components/
    layout/PublicLayout.jsx   header with dropdown nav, footer, scroll restoration
    CfdeWheel.jsx             interactive CFDE ecosystem wheel
    shared.jsx                PageHero, Section, Stats, Session, Person, ...
  pages/                      one component per route
  index.css                   the whole design system (CSS custom properties)
```

### Design system

`src/index.css` holds every token and component class. The palette and layout primitives are
ported from the CFDE Fall 2026 meeting site, sampled from the CFDE CONNECT mark: navy
(`--navy-900`…`--navy-600`), blue (`--blue`), teal (`--teal`), plus the green and violet
hexagon accents. Typography is Inter throughout.

### CFDE wheel

`CfdeWheel.jsx` is a native React port of the `cfde-wheel` WordPress plugin used on the
original site. Five center petals (Cloud, Knowledge, Training, Data, Coordination) sit inside a
ring of 18 Common Fund DCC programs, each linking to its page on `info.cfde.cloud`. The
geometry — 280px ring radius, per-petal offsets and rotations — mirrors the original plugin.
The wheel is a fixed 700×700 frame that scales down on narrow viewports.

## Notes

- The Sustainability Core is co-led by UCLA and the University of Arizona. Arizona currently
  renders as a text wordmark in the homepage partner strip because there is no logo asset yet —
  drop an approved mark from <https://brand.arizona.edu/> into `public/images/logos/arizona.png`
  and swap the `.partners__name` link in `src/pages/Home.jsx` for an `<img>`.
- Deployment target is any static host; `npm run build` output in `dist/` is all that is needed.
  Configure the host to rewrite unknown paths to `index.html` so client-side routes resolve.
- The portal/member area is not part of this project and will be added separately.

Supported by the NIH Common Fund CFDE program (Grant # U54OD036472).
