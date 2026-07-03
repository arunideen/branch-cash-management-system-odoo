# Branch Cash Management System (BCMS)

**Client:** Prabal Motors Private Limited (PMPL)
**Status:** Analysis & documentation phase (no application code yet)

A digital, auditable workflow system that standardises branch cash operations across Sales & Service — from **collection request → cashier verification → official receipt → cash closing → maker-checker approval → bank deposit → Tally accounting** — with role-based access, a complete audit trail, dashboards, and reports.

## Repository contents

| Path | What it is |
|------|-----------|
| [`docs/`](./docs) | Complete business, technical & architectural documentation set (18 documents) |
| [`docs/diagrams/`](./docs/diagrams) | 30 Mermaid diagrams (flowcharts, sequence, state, ER, swimlane, DFD, journeys, architecture) |
| [`docs/README.md`](./docs/README.md) | **Start here** — documentation index with role-based reading paths |
| `BRD_v1.0.docx` | Source Business Requirements Document (v1.0) |

## Quick links

- **Requirements:** [`docs/Requirements.md`](./docs/Requirements.md)
- **Product Requirements (PRD):** [`docs/PRD.md`](./docs/PRD.md)
- **Statement of Work (SOW):** [`docs/SOW.md`](./docs/SOW.md)
- **Technical Architecture:** [`docs/TechnicalArchitecture.md`](./docs/TechnicalArchitecture.md)
- **Database Design:** [`docs/DatabaseDesign.md`](./docs/DatabaseDesign.md)
- **Traceability Matrix:** [`docs/TraceabilityMatrix.md`](./docs/TraceabilityMatrix.md)
- **Open questions for the client:** [`docs/ClientQuestionnaire.md`](./docs/ClientQuestionnaire.md)

## Proposed stack (under review)

Frontend **Next.js + React + TypeScript + Tailwind + shadcn/ui**; backend **Supabase (PostgreSQL, Auth, RLS, Edge Functions, Realtime, Storage)**. An **Odoo Community (framework-only)** alternative is under evaluation — see the architecture discussion.

---

*Documentation is a living artifact; update affected documents as client clarifications (CLR-01–12) are answered.*
