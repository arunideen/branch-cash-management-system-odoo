# Branch Cash Management System (BCMS) — Project Documentation

**Client:** Prabal Motors Private Limited (PMPL)
**Source:** `BRD_v1.0.docx` — Comprehensive Business Requirements Document, v1.0
**Documentation Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review / Sign-off

---

## 1. What this is

This `docs/` folder is the complete **business, technical, and architectural analysis** of the BCMS BRD, produced as production-ready project documentation. It follows an **Explore → Research → Analyze → Design → Document** workflow and covers requirements, research, architecture, database, APIs, security, workflows/diagrams, UI/UX, roles, user stories, risk, PRD, SOW, project plan, and a full traceability matrix.

> **This is documentation only — no application code has been written.** Recommendations beyond the BRD are clearly marked as *Recommended (R-*)* or *(derived)* and are **not** binding scope.

## 2. The product in one paragraph

BCMS digitises PMPL's branch cash lifecycle — **collection request → cashier verification → official receipt → cash expense → end-of-day closing → maker-checker approval → bank deposit → Tally accounting** — across a multi-branch Sales & Service network, under **role-based access, complete immutable audit trail, and no-physical-delete** controls, surfaced through **branch/state/corporate dashboards** and operational reports. It is a responsive **web/mobile** app on **Next.js + Supabase**. Tally/bank/WhatsApp/BI/OCR integrations are **future** enhancements.

---

## 3. Document Index

### 3.1 Business & Requirements
| Document | Purpose |
|----------|---------|
| [Requirements.md](./Requirements.md) | **Start here.** Full requirement extraction with unique IDs (BO/BP/FR/NFR/BR/CON/SC/CLR). |
| [BusinessAnalysis.md](./BusinessAnalysis.md) | Market/competitor research, best practices, **Required vs Recommended** features, SWOT. |
| [Assumptions.md](./Assumptions.md) | 30 assumptions + 12 clarifications + decision log. |
| [ClientQuestionnaire.md](./ClientQuestionnaire.md) | Fillable client form for the 12 open clarifications (CLR-01–12). |
| [UserRoles.md](./UserRoles.md) | 9 roles: responsibilities, permissions, approval rights, restrictions, permission matrix. |
| [UserStories.md](./UserStories.md) | User stories per module with Given/When/Then acceptance criteria. |

### 3.2 Product & Delivery
| Document | Purpose |
|----------|---------|
| [PRD.md](./PRD.md) | Product Requirements Document (sign-off ready). |
| [SOW.md](./SOW.md) | Statement of Work (sign-off ready). |
| [ProjectPlan.md](./ProjectPlan.md) | Phases, schedule, milestones, resources, RACI. |
| [RiskAssessment.md](./RiskAssessment.md) | 20-item risk register + heatmap. |
| [TraceabilityMatrix.md](./TraceabilityMatrix.md) | RTM: BRD → requirement → design → API → DB → test. |

### 3.3 Architecture & Design
| Document | Purpose |
|----------|---------|
| [TechnicalArchitecture.md](./TechnicalArchitecture.md) | Stack, system/logical/physical/component/module/deployment/integration architecture. |
| [DatabaseDesign.md](./DatabaseDesign.md) | Supabase schema: tables, RLS, triggers, views, functions, soft-delete. |
| [APIDesign.md](./APIDesign.md) | REST + Edge Functions: endpoints, validation, errors, rate limits, pagination. |
| [SecurityArchitecture.md](./SecurityArchitecture.md) | AuthN/Z, JWT/RLS, OWASP Top 10, encryption, audit, monitoring. |
| [UIUX.md](./UIUX.md) | Sitemap, screens, wireframes, dashboards, responsive, a11y, design system. |

### 3.4 Workflows & Diagrams
| Document | Purpose |
|----------|---------|
| [Workflows.md](./Workflows.md) | Every business process, narrated with embedded Mermaid diagrams. |
| [MermaidDiagrams.md](./MermaidDiagrams.md) | Master index of all 30 diagrams by type/module. |
| [diagrams/](./diagrams/) | 30 canonical single-diagram files (flowcharts, sequence, state, ER, swimlane, DFD, journeys, architecture). |

---

## 4. How to read it (by audience)

| You are… | Read in this order |
|----------|--------------------|
| **Executive / Sponsor** | README → [PRD.md](./PRD.md) §1–§7, §17 → [SOW.md](./SOW.md) → [RiskAssessment.md](./RiskAssessment.md) §3 |
| **Business Analyst / PO** | [Requirements.md](./Requirements.md) → [Assumptions.md](./Assumptions.md) → [UserStories.md](./UserStories.md) → [TraceabilityMatrix.md](./TraceabilityMatrix.md) |
| **Architect / Tech Lead** | [TechnicalArchitecture.md](./TechnicalArchitecture.md) → [DatabaseDesign.md](./DatabaseDesign.md) → [APIDesign.md](./APIDesign.md) → [SecurityArchitecture.md](./SecurityArchitecture.md) |
| **Designer** | [UIUX.md](./UIUX.md) → [Workflows.md](./Workflows.md) → [UserRoles.md](./UserRoles.md) |
| **Project Manager** | [ProjectPlan.md](./ProjectPlan.md) → [SOW.md](./SOW.md) → [RiskAssessment.md](./RiskAssessment.md) |
| **QA** | [UserStories.md](./UserStories.md) → [TraceabilityMatrix.md](./TraceabilityMatrix.md) §4 |

---

## 5. Requirement ID scheme (quick reference)

`BO`=objective · `BP`=problem · `SH`=stakeholder · `FR-<MOD>`=functional · `NFR-<CAT>`=non-functional · `BR`=business rule · `CON`=constraint · `AS`=assumption · `RSK`=risk · `SC`=success criterion · `CLR`=clarification · `R-`=recommended (non-BRD). Modules: `MDM, CR, CV, RCPT, CLS, EXP, DEP, ACC, DASH, RPT, NOTIF, AUTH`. Full definitions in [Requirements.md](./Requirements.md).

---

## 6. Viewing the diagrams

Mermaid diagrams render automatically on **GitHub/GitLab**, **VS Code** (Markdown Preview Mermaid Support extension), **Obsidian**, and any Mermaid-aware viewer. To export images: `npm i -g @mermaid-js/mermaid-cli` then `mmdc -i <file>.md -o <file>.svg`.

---

## 7. Open items before build (must resolve)

The four **High-priority** clarifications gate confident scoping ([Assumptions.md](./Assumptions.md) §5). Send them to the client via the ready-to-fill **[ClientQuestionnaire.md](./ClientQuestionnaire.md)**:
1. **CLR-01** — Online collection: payment gateway vs. reference capture?
2. **CLR-02** — Tally: manual entry vs. live API in v1?
3. **CLR-03** — Volumes: branches / users / transactions per day?
4. **CLR-04** — Official receipt format & GST/statutory rules?

---

## 8. Quality Check (self-verification)

| ✓ | Check | Evidence |
|---|-------|----------|
| ✅ | Every BRD requirement addressed | [TraceabilityMatrix.md](./TraceabilityMatrix.md) §1 maps §1–§22 + Appendices |
| ✅ | No missing workflows | [Workflows.md](./Workflows.md) covers all 12 modules; [MermaidDiagrams.md](./MermaidDiagrams.md) §7 |
| ✅ | Every module has user stories | [UserStories.md](./UserStories.md) coverage table |
| ✅ | Every module has acceptance criteria | [UserStories.md](./UserStories.md) Given/When/Then per story |
| ✅ | Every workflow has a diagram | 30 diagrams in [diagrams/](./diagrams/) |
| ✅ | PRD & SOW sign-off ready | [PRD.md](./PRD.md), [SOW.md](./SOW.md) with sign-off blocks |
| ✅ | Enterprise architecture | Clean/modular/SOLID, RLS, maker-checker, audit — [TechnicalArchitecture.md](./TechnicalArchitecture.md), [SecurityArchitecture.md](./SecurityArchitecture.md) |
| ✅ | Recommendations marked separately | *Recommended (R-*)* / *(derived)* throughout, esp. [BusinessAnalysis.md](./BusinessAnalysis.md) §6 |

**Deliverables:** 18 documents + 30 diagram files = 48 files.

---

## 9. Document control

| Field | Value |
|-------|-------|
| Version | 1.0 (Draft) |
| Based on | BRD_v1.0.docx |
| Prepared by | Product / BA / Architecture (analysis) |
| Next review | On receipt of CLR-01…12 answers |
| Change control | Updates tracked via [Assumptions.md](./Assumptions.md) decision log |

---

*This documentation set is a living artifact. As clarifications are answered, update the affected requirement, assumption, and dependent design documents, and bump the version.*
