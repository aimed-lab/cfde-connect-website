# CFDEConnect — Development Plan

## Overview

Rebuild the existing cfdeconnect WordPress site into a unified React/TypeScript application that serves two audiences:

1. **Public Website** — Static-style pages accessible to anyone (no login required)
2. **Community Portal** — Authenticated member space for the CFDE community

The new version code (Base44-generated) already has the portal foundation. This plan integrates the public website with it.

---

## Current State

### WordPress Site (public website)
- Built with Bluehost Website Builder (PHP theme, visual editor)
- Pages: Home, Administrative Core, Evaluation Core, Privacy, Terms of Use
- Key people: Jake Chen, Swathi Thaker, Zhandos Sembay, Casey Greene, Sean Davis
- Assets: logos, staff photos, background images, one hero video
- Plugins: WPForms, Yoast SEO, MonsterInsights, Stripe (integration)

### React Portal (new version — Base44)
- Stack: React 18, Vite, Tailwind CSS, Shadcn/ui, React Router v6, TanStack React Query
- Backend: Base44 SDK (auth + entities + serverless functions)
- Pages built: Dashboard, Directory, MemberProfile, MyProfile, Events, Messages (stub), MeetingNotes (admin), DataFlow
- Auth: OAuth token flow via Base44, three states (auth_required / user_not_registered / authenticated)
- Language: JavaScript (JSX) — needs TypeScript migration

---

## Target Architecture

```
cfde-connect/
├── src/
│   ├── public/                  # Public-facing pages (no auth)
│   │   ├── layout/
│   │   │   ├── PublicHeader.tsx
│   │   │   └── PublicFooter.tsx
│   │   └── pages/
│   │       ├── Home.tsx
│   │       ├── About.tsx
│   │       ├── Programs.tsx
│   │       ├── Centers.tsx
│   │       ├── Team.tsx
│   │       ├── Events.tsx       # Public read-only event listing
│   │       ├── Contact.tsx
│   │       ├── Privacy.tsx
│   │       └── Terms.tsx
│   │
│   ├── portal/                  # Authenticated portal
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── pages/
│   │       ├── Dashboard.tsx
│   │       ├── Directory.tsx
│   │       ├── MemberProfile.tsx
│   │       ├── MyProfile.tsx
│   │       ├── Events.tsx       # Full CRUD + RSVP
│   │       ├── Messages.tsx
│   │       ├── MeetingNotes.tsx
│   │       └── DataFlow.tsx
│   │
│   ├── components/
│   │   ├── ui/                  # Shadcn/ui primitives (keep as-is)
│   │   ├── shared/              # Used by both public and portal
│   │   │   ├── EventCard.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   └── SeoHead.tsx
│   │   └── portal/              # Portal-only components
│   │       ├── dashboard/
│   │       ├── events/
│   │       └── directory/
│   │
│   ├── api/
│   │   └── base44Client.ts
│   │
│   ├── lib/
│   │   ├── AuthContext.tsx
│   │   ├── cfdeData.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   └── use-mobile.ts
│   │
│   ├── types/
│   │   ├── profile.ts
│   │   ├── event.ts
│   │   └── auth.ts
│   │
│   ├── assets/                  # Migrated from WordPress uploads
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## Routing Design

```
/                        → Home (public)
/about                   → About CFDE (public)
/programs                → CFDE Programs (public)
/centers                 → CFDE Centers (public)
/team                    → Team & Leadership (public)
/events                  → Public events list (public)
/contact                 → Contact form (public)
/privacy                 → Privacy Policy (public)
/terms                   → Terms of Use (public)

/portal                  → Dashboard (auth required)
/portal/directory        → Member Directory
/portal/member/:id       → Member Profile
/portal/profile          → My Profile (edit)
/portal/messages         → Messages
/portal/events           → Events (CRUD + RSVP)
/portal/meeting-notes    → Meeting Notes (admin only)
/portal/data-flow        → Data Flow Visualization

*                        → 404 Page
```

Public routes render `PublicLayout` (header + footer).
Portal routes are wrapped in `AuthProvider` + `AppLayout` (sidebar).

---

## Development Phases

---

### Phase 1 — Foundation & TypeScript Migration (Week 1–2)

**Goal:** Get the project compiling in TypeScript with the same functionality as the current JSX codebase.

**Tasks:**
1. Configure `tsconfig.json` with strict mode
2. Rename all `.jsx` → `.tsx` and `.js` → `.ts`
3. Add type definitions for:
   - `Profile` entity (name, title, institution, department, consortium, center, bio, etc.)
   - `Event` entity (title, date, type, description, rsvp list, etc.)
   - Auth context types (user, roles, error states)
   - Base44 client types
4. Resolve all TypeScript errors
5. Migrate `cfdeData.js` → `cfdeData.ts` with `as const` enums
6. Update `base44Client.js` → `base44Client.ts`
7. Verify `npm run build` passes with no type errors

**Deliverable:** Identical app, now in TypeScript.

---

### Phase 2 — Public Website (Week 2–4)

**Goal:** Replace the WordPress public site with React pages inside the same app.

#### 2a. Public Layout Components

**PublicHeader.tsx**
- Logo (cfdeconnect / NIH CFDE branding)
- Navigation links: Home, About, Programs, Centers, Team, Events, Contact
- "Sign In" button → redirects to portal login
- Responsive hamburger menu for mobile

**PublicFooter.tsx**
- CFDE logo + brief description
- Links: Privacy, Terms, GitHub, Contact
- Copyright

#### 2b. Public Pages

**Home.tsx**
- Hero section: headline, sub-headline, CTA buttons (Learn More / Sign In to Portal)
- Background: hero image or video (migrated from WordPress)
- Brief "What is CFDE" description
- Highlights: programs count, centers, working groups
- Featured upcoming events (public, read-only)
- Call-to-action: Join the community / Log in

**About.tsx**
- Mission and vision of CFDE
- Integration and Coordination Center overview
- Key work areas (operations, communications, team science)

**Programs.tsx**
- Grid of the 19 CFDE programs (from `cfdeData.ts`)
- Each card: name, short description, external link
- Filter/search by keyword

**Centers.tsx**
- The 5 CFDE centers with descriptions and links
- Working Groups section (9 groups)

**Team.tsx**
- Administrative Core: Jake Chen, Swathi Thaker, Zhandos Sembay (with photos + bios)
- Evaluation Core: Casey Greene, Sean Davis
- Headshot images migrated from WordPress uploads

**Events.tsx (public)**
- Read-only listing of upcoming CFDE events
- Sourced from the same Base44 events entity (public endpoint or unauthenticated query)
- "Log in to RSVP" prompt

**Contact.tsx**
- Contact form (name, email, message)
- Replace WPForms with React Hook Form + email service (or Base44 function)

**Privacy.tsx / Terms.tsx**
- Migrate static text from WordPress pages

#### 2c. SEO
- Install `react-helmet-async`
- `SeoHead.tsx` component wrapping `Helmet` for per-page title, description, OG tags
- Add sitemap generation to Vite build

**Deliverable:** Full public website live, replacing WordPress.

---

### Phase 3 — Portal Improvements (Week 4–6)

**Goal:** Improve and complete the existing portal features.

#### 3a. Auth & Routing Refactor

- Separate `PublicRouter` and `PortalRouter` components in `App.tsx`
- `PortalGuard.tsx` — wraps all `/portal/*` routes, checks auth, redirects to login if not authenticated
- Handle `user_not_registered` with an onboarding / registration request page
- Add redirect-after-login: if user hits `/portal/directory` unauthenticated, redirect back after login

#### 3b. Dashboard Improvements

- Fix TypeScript types for all data queries
- Add loading skeletons instead of spinners
- Improve "Suggested Members" logic (match by consortium + center, then just consortium)
- Add empty states for events/members

#### 3c. Directory Improvements

- Server-side pagination (don't load all 500 profiles client-side)
- Virtual scrolling for large lists
- Improved filter UX: chips for active filters, clear all button
- Export to CSV (for admins)

#### 3d. Events

- Unified view: public events visible to all, portal events with RSVP
- Create/edit event form with full validation
- Event detail page (`/portal/events/:id`)
- Calendar view toggle (list vs. month calendar)
- Email notification on RSVP (Base44 function)

#### 3e. Profile

- Photo upload support
- ORCID link validation
- Profile completeness indicator
- Preview mode (see your profile as others see it)

#### 3f. Messages

- Currently a stub — implement basic messaging:
  - Inbox / conversation list
  - Message thread view
  - Compose new message (search member by name)
  - Unread count badge in sidebar

#### 3g. Meeting Notes (Admin)

- Keep existing Box integration
- Add folder creation
- Improve UI: breadcrumb navigation within folders
- Restrict to admin role check server-side

**Deliverable:** Fully functional portal, all stubs completed.

---

### Phase 4 — Design System & Polish (Week 6–7)

**Goal:** Consistent visual design across public site and portal.

**Tasks:**
1. Define design tokens in `index.css`:
   - Primary blue: `hsl(217, 71%, 45%)`
   - Accent teal: `hsl(168, 55%, 42%)`
   - Sidebar dark: `hsl(215, 25%, 12%)`
   - Typography: Inter (body), Source Serif 4 (headings)
2. Create `PublicHeader` with same brand colors as portal
3. Smooth transition animation when navigating from public → portal
4. Responsive audit: test all pages on mobile (375px), tablet (768px), desktop (1280px)
5. Dark mode: already configured via next-themes, audit public pages
6. Accessibility audit: keyboard nav, ARIA labels, color contrast

---

### Phase 5 — Infrastructure & Deployment (Week 7–8)

**Goal:** Production-ready deployment.

**Tasks:**
1. Environment configuration:
   - `.env.production` for Base44 prod credentials
   - Separate staging environment
2. Vite build optimization:
   - Code splitting by route
   - Image optimization (import via Vite asset pipeline)
   - Bundle analysis (`rollup-plugin-visualizer`)
3. Hosting setup:
   - Deploy to Vercel or Netlify (recommended — Vite-native support)
   - Configure custom domain `cfdeconnect.org`
   - Set up redirects from old WordPress URLs to new React routes
4. SEO migration:
   - `_redirects` file for Netlify / `vercel.json` rewrites
   - Submit new sitemap to Google Search Console
5. Analytics:
   - Replace MonsterInsights (WordPress) with Google Analytics 4 via gtag
   - Or: Plausible Analytics (privacy-friendly alternative)
6. CI/CD:
   - GitHub Actions: lint + typecheck + build on every PR
   - Auto-deploy to staging on merge to `main`

---

## Open Decisions (Needs Discussion)

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | Keep Base44 backend long-term? | Keep Base44 / Migrate to Supabase or custom API | Start with Base44, evaluate at 6 months |
| 2 | Contact form backend | Base44 function / EmailJS / Resend | Base44 serverless function |
| 3 | Public events source | Same Base44 entity (unauth) / Separate data | Same entity with public query flag |
| 4 | Analytics | GA4 / Plausible / PostHog | GA4 (matches existing MonsterInsights data) |
| 5 | Staff photos | Migrate from WordPress / New photos | Migrate from WordPress uploads |
| 6 | Portal auth provider | Keep Base44 auth / Add Clerk or Auth0 | Keep Base44 for now |
| 7 | Messages feature scope | Full async messaging / Simple email contact | Simple contact first, async in Phase 3 |

---

## Asset Migration Checklist

- [ ] `alphamind-logo.png` → `/src/assets/images/logo.png`
- [ ] `home_background_main.png` → `/src/assets/images/hero-bg.png`
- [ ] `AdobeStock_431193067.mp4` → `/src/assets/video/hero.mp4` (check license)
- [ ] Staff headshots (Jake Chen, Swathi Thaker, Zhandos Sembay, Casey Greene, Sean Davis)
- [ ] Any program/center logos used on WordPress pages

---

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Routing | React Router v6 |
| Styling | Tailwind CSS + Shadcn/ui |
| State | TanStack React Query (server), React Context (auth) |
| Backend | Base44 SDK |
| Forms | React Hook Form + Zod |
| SEO | react-helmet-async |
| Icons | Lucide React |
| Charts | Recharts |
| Maps | React Leaflet |
| Auth | Base44 OAuth flow |
| Storage | Base44 entities + Box (meeting notes) |
| Payments | Stripe (ready, not yet wired) |
| Deployment | Vercel or Netlify |
| CI | GitHub Actions |

---

## Priority Order for First Sprint

1. TypeScript migration (Phase 1) — unblocks everything
2. Public layout + Home page (Phase 2a + Home.tsx) — visible progress
3. Team page with staff photos (Phase 2b) — replaces WordPress immediately
4. Programs + Centers pages (Phase 2b) — high-value static content
5. Portal auth/routing refactor (Phase 3a) — clean foundation for portal work
6. Events integration (Phase 3d) — bridges public and portal
