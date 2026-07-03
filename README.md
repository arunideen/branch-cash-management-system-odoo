# Branch Cash Management System (BCMS)

**Client:** Prabal Motors Private Limited (PMPL)
**Platform:** Odoo 19 Community Edition — one fully custom module (`branch_cash_management`)
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

## Platform & stack

Built as **one fully custom Odoo 19 Community Edition module** (`branch_cash_management`), depending only on Odoo core **`base`, `mail`, `web`** (LGPL-3, no Enterprise features). Business logic lives in **ORM models** with **security groups + record rules** for branch/cluster/state scoping; the UI is the **Odoo backend** (list/form/kanban/pivot/graph views + OWL dashboards); documents use **`ir.attachment`**, numbering uses **`ir.sequence`**, notifications/audit use **chatter + activities**, and PDF outputs use **QWeb**. **Tally remains the accounting ledger** (manual in v1, API later) — the module does **not** depend on Odoo `account`. Deployed **self-hosted** (Odoo + PostgreSQL in Docker behind nginx). See [`docs/TechnicalArchitecture.md`](./docs/TechnicalArchitecture.md).

---

*Documentation is a living artifact; update affected documents as client clarifications (CLR-01–12) are answered.*
