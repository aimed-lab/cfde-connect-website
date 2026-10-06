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

## Branches and deployment

Hosted on Vercel; each branch deploys to its own address.

| Branch | Address | Purpose |
| --- | --- | --- |
| `main` | <https://cfdeconnect.org> | Production — the public site |
| `dev` | <https://dev.cfdeconnect.org> | Staging — review changes here before they go live |

Workflow: all changes are committed to `dev`. Check them on dev.cfdeconnect.org, then open a
pull request from `dev` into `main`. Merging it publishes to cfdeconnect.org. Don't commit
directly to `main`, and keep `dev` up to date with `main` after each merge.

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
| Portal (nav button) | <https://portal.cfdeconnect.org/> |

### Chat widget

A Copilot.live chat widget is embedded via a loader snippet at the bottom of
`index.html`. It sits outside `#root`, so it mounts once and survives
client-side route changes — do not move it into a React component. The token in
the script URL is the public widget key. To change or remove the chatbot, edit
that one snippet; nothing else in the app references it.

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
ring of 19 Common Fund DCC programs, each linking to its page under `cfde.cloud/info/dcc/`
(petals link to `cfde.cloud/info/centers/`). The program list follows the live wheel on
info.cfde.cloud — the WordPress plugin was missing KOMP2, which uses the IMPC logo. Note that the
older `info.cfde.cloud/dcc/…` and `/centers/…` URLs now return 404. The
geometry — 280px ring radius, per-petal offsets and rotations — mirrors the original plugin.
The wheel is a fixed 700×700 frame that scales down on narrow viewports.

It also appears site-wide behind a floating button (`WheelFab.jsx`, mounted in the layout),
stacked directly above the Copilot chat bubble, as on info.cfde.cloud. Clicking it opens the
wheel in a dialog that fits it to the viewport; Escape, the close button, or a click on empty
space dismisses it. The button's position (`right:20px; bottom:90px`) is derived from the chat
bubble's — fixed 56×56 at 20px from the corner — so if the Copilot widget's placement changes,
update `.wheelfab` in `index.css` to match.

## Notes

- The Sustainability Core is co-led by UCLA and the University of Arizona, so four institution
  marks appear in the homepage partner strip. The Arizona asset is the College of Medicine –
  Phoenix lockup (Peipei Ping's unit), taken from that college's own site. Its paths use
  `currentColor`, which would fall back to black when the file is used standalone in an `<img>`,
  so the root element carries `color="#012043"` (Arizona blue) to resolve it to the brand colour.
- Deployment target is any static host; `npm run build` output in `dist/` is all that is needed.
  Configure the host to rewrite unknown paths to `index.html` so client-side routes resolve.
- cfdeconnect.org used to be a WordPress site. `vercel.json` permanently (308) redirects its old
  page addresses — e.g. `/administrative-core/` → `/cores/administrative` — so existing links,
  bookmarks and search results land on the matching new page. Each is listed with and without the
  trailing slash. `/news/` and `/calendar/` need no redirect: the paths are unchanged. Old media
  links (`/wp-content/uploads/…`) have no equivalent and will 404.
- The portal/member area is not part of this project and will be added separately.

Supported by the NIH Common Fund CFDE program (Grant # U54OD036472).
