# Architectural Decision Record (ADR) - BillBazaar Prototype

## ADR 001: Technology Stack and Framework Selection
- **Status:** Accepted
- **Context:** The prompt requires an interactive, frontend-only prototype of BillBazaar demonstrating insurance discovery, side-by-side plan comparison, and a digital asset locker with simulated document storage and service reminders. The user requested Next.js with a light-mode, minimalistic Indian fintech aesthetic, without AI-slop gradients or neon glows.
- **Decision:** Next.js App Router (v15+) with TypeScript, Tailwind CSS v4, and Lucide React.
- **Consequences:** Provides fast client-side transitions, clean routing (`/`, `/insurance`, `/compare`, `/plan/[id]`, `/assets`, `/assets/[id]`, `/about`), and zero backend reliance. All workflows run deterministically in browser state with optional local persistence.

## ADR 002: State Management & Persistence Architecture
- **Status:** Accepted
- **Context:** User actions (adding plans to compare, registering assets, editing warranty dates, attaching documents, and setting reminders) must persist across pages and page reloads without requiring an external database or backend API.
- **Decision:** A centralized React Context (`AppContext`) combined with SSR-safe `localStorage` synchronization. Default mock datasets seed the initial state on first visit.
- **Consequences:** Eliminates prop drilling, guarantees predictable state across the 8 screens, avoids React hydration mismatches via client-mounted state verification, and keeps the code lightweight without heavy external state libraries.

## ADR 003: Visual Design System & Anti-Slop Discipline
- **Status:** Accepted
- **Context:** Fintech credibility requires trust, high legibility, and restraint. Generic AI gradients, neon glows, purple cards, and emoji replacements undermine professional Indian financial tools.
- **Decision:** 
  - Palette: Deep Crimson (`#C82026`), Restrained Amber-Orange (`#F47721`), Warm Off-White (`#F8F9FB`), Clean White (`#FFFFFF`), Slate Borders (`#E2E8F0`), and Charcoal Body Text (`#0F172A`).
  - Typography: Crisp sans-serif with tabular numeric alignments for currency (`₹`) and percentages.
  - Border radii: Clean 8px-12px curves with mathematical inner padding hierarchy.
  - Icons: Monochromatic Lucide icons with uniform 1.75px stroke width.
- **Consequences:** Delivers a realistic Indian fintech user experience reminiscent of high-end financial platforms.

## ADR 004: Simulated Document Processing & Demo Guardrails
- **Status:** Accepted
- **Context:** BillBazaar's core differentiator is the Digital Asset Locker. The prototype must allow uploading invoices and viewing extracted metadata without attempting network calls to non-existent OCR/AI backends.
- **Decision:** Browser-native file input captures local file metadata (name, size, type). A deterministic mock extraction engine fills invoice dates, vendor names, and warranty terms with an explicit "Simulated Extraction" badge.
- **Consequences:** Judges and stakeholders experience the exact UX flow while understanding that data processing is currently simulated.
