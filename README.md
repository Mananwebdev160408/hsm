# BillBazaar — Interactive Frontend Prototype

BillBazaar is an Indian fintech platform prototype designed to bridge the gap between valuable personal assets and informed insurance choices. It unites a **digital asset locker** (for invoices, warranties, and service reminders) with a **context-aware insurance discovery and comparison engine** (for Health, Life, Motor, and Travel insurance).

> **Prototype Notice:** This is a simulated frontend demonstration built for venture viability review, user testing, and stakeholder demonstration. It features realistic mock data, functional forms, comparisons, and document management with zero backend or external API dependencies.

---

## Key Features

1. **Insurance Discovery & Multi-Category Search**
   - Health, Life, Motor, and Travel insurance categories.
   - Dynamic filtering by sum insured, premium cap, cashless network count, and specific policy riders.
   - Multi-parameter sorting (Lowest Premium, Highest Coverage, Claim Settlement Ratio).

2. **Side-by-Side Policy Comparison Matrix**
   - Compare up to 3 plans concurrently across structured comparison rows.
   - Analyzes premiums, deductibles, waiting periods, room rent caps, claim settlement speed, inclusions, and exclusions.
   - Dynamic comparison bar accessible from any page.

3. **Plan Detail View & Demo Selection**
   - Comprehensive breakdown of base premium, GST (18%), and optional riders.
   - Interactive policy selection modal with simulated demo confirmation.

4. **Digital Asset Locker (Differentiating Feature)**
   - Unified catalog for consumer gadgets, appliances, and motor vehicles.
   - Automated warranty status tracking: **Active**, **Expiring Soon** (< 30 days), and **Expired**.
   - Metric dashboard summarizing total registered value, active warranties, and stored documents.

5. **Simulated Document & Service Reminder Engine**
   - Attach invoices and warranty cards with simulated metadata extraction.
   - Create, track, and dismiss vehicle servicing, battery diagnostics, and warranty extension reminders.
   - Interactive CRUD operations: Add new assets, edit existing details, and delete entries.

---

## Design System & Anti-Slop Discipline

- **Primary Brand Color:** BillBazaar Crimson (`#C82026`)
- **Secondary Accent:** BillBazaar Warm Amber (`#F47721`)
- **Background:** Warm Off-White (`#F8F9FB`)
- **Card Surfaces:** Crisp White (`#FFFFFF`)
- **Typography & Layout:** Minimalist fintech aesthetic with tabular numbers, accessible contrast, and zero neon gradients or decorative AI slop.
- **Iconography:** Monochromatic Lucide Icons with consistent 1.75px stroke width.

---

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict typing, zero `any`)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **State:** React Context with SSR-safe `localStorage` synchronization

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser
http://localhost:3000
```
