# Product Requirements Document (PRD)

**Product:** Branch Cash Management System (BCMS)
**Client:** Prabal Motors Private Limited (PMPL)
**Source BRD:** `BRD_v1.0.docx` v1.0
**Document Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Sign-off
**Owner:** Product Management · **Approvers:** CFO/Admin, Corporate Finance, IT

| Rev | Date | Author | Summary |
|-----|------|--------|---------|
| 1.0 | 2026-07-01 | Product/BA | Initial PRD derived from BRD v1.0 |

---

## 1. Executive Summary

Prabal Motors Private Limited operates a multi-branch automobile **Sales and Service** business where branch cash is managed through **manual registers** — a process that is error-prone, slow to reconcile, hard to audit, and invisible to management in real time. The **Branch Cash Management System (BCMS)** digitises the entire branch cash lifecycle — **collection request → cashier verification → official receipt → cash expense → end-of-day closing → maker-checker approval → bank deposit → Tally accounting** — under strict **role-based access, a complete immutable audit trail, and no-physical-delete controls**, surfaced through **branch, state, and corporate dashboards** and a suite of operational reports.

BCMS is a responsive **web/mobile application** built on **Next.js + Supabase**. The initial release standardises and controls cash operations across the network; **Tally, bank, WhatsApp, BI, and OCR integrations are planned future enhancements**. Success is measured by the elimination of manual registers, complete digital approvals, reports that reconcile with Tally, and an end-to-end audit trail.

---

## 2. Vision

> *Every rupee collected at any PMPL branch is captured, controlled, and accounted for in one auditable digital workflow — from the customer's payment to the Tally ledger — visible to management in real time.*

BCMS becomes PMPL's single source of truth for branch cash, replacing registers, enforcing segregation of duties, and providing a clean data foundation for future automation (Tally/bank APIs, analytics).

---

## 3. Goals

| # | Goal | Linked BRD Objective |
|---|------|----------------------|
| G1 | Digitise the cash collection workflow end-to-end. | BO-01 |
| G2 | Standardise operations across Sales and Service. | BO-02 |
| G3 | Provide end-to-end visibility from collection to accounting. | BO-03 |
| G4 | Enforce maker-checker (four-eyes) approvals. | BO-04 |
| G5 | Deliver real-time branch/state/corporate dashboards. | BO-05 |
| G6 | Strengthen audit compliance; reduce reconciliation effort. | BO-06 |
| G7 | Lay the foundation for Tally & other integrations. | BO-07 |
| G8 | Scale across the whole branch network. | BO-08 |

---

## 4. Business Context

PMPL's branches take cash and online payments daily from vehicle sales (against **invoices**) and service/repairs (against **job cards**). Physical cash passes through advisors, cashiers, managers, and accountants before being deposited and accounted in **Tally**. This is a classic **segregation-of-duties** domain: best practice dictates that no single person collects, counts, and banks cash, that drawers are reconciled daily with dual sign-off, and that deposits and audit records are tracked immutably. See [BusinessAnalysis.md](./BusinessAnalysis.md) for market and best-practice research.

---

## 5. Problem Statement

- Manual registers cause **errors, delays, and weak auditability** (BP-01).
- **Inconsistent** cash processes across Sales and Service branches (BP-02).
- **No real-time visibility** of cash status from collection to accounting (BP-03).
- **Weak approval controls** increase error and fraud exposure (BP-04).
- **Manual, error-prone reconciliation** with deposits and Tally (BP-05).
- **Cash-in-hand risk** from delayed/unverified deposits (BP-06).
- **No consolidated exception view** across the network (BP-07).

---

## 6. Project Scope (In Scope — v1)

Traceable to BRD §4 and the functional modules:

1. **Master Data Management** — branches, employees/users, customers, expense heads, banks, pickup agencies, ledgers.
2. **Collection Request** — advisor-initiated, mandatory documents, unique ID, status tracking.
3. **Cashier Verification** — search, verify, reject/accept, denomination/online reference capture.
4. **Receipt Generation** — official, unique, immutable receipts (print/PDF).
5. **Cash Expense** — voucher, head, amount, approver, attachment, auto cash reduction.
6. **Cash Closing** — opening/collections/expenses/deposits, expected vs physical, variance + reason.
7. **Approval Workflow** — Cashier → Works Manager → Branch Accountant → Closed (maker-checker).
8. **Bank Deposit** — direct/pickup, slip + acknowledgement, verification.
9. **Accounting Update** — Tally voucher, dates, ledger, accounting status (manual entry in v1).
10. **Dashboards** — branch, state, corporate, trend, exception.
11. **Reports** — nine named reports with filter & export.
12. **Notifications** — in-app for the five named triggers.
13. **Security & Audit** — RBAC, data scoping, audit trail, no-delete, document versioning.

---

## 7. Out of Scope (v1)

Deferred to future phases (BRD §21) or pending confirmation:

- **Live Tally API** auto-posting/reconciliation (manual entry in v1) — CON-02.
- **Bank statement API** integration — CON-03.
- **WhatsApp/SMS** notifications (in-app only in v1) — CON-03.
- **Power BI / Zoho Analytics** BI — CON-03.
- **OCR** for deposit slips/bills — CON-03.
- **Payment-gateway** integration for online collection (reference capture only in v1) — AS-01, R-21.
- **Offline/PWA** operation — AS-27, R-22 (unless CLR-10 requires).
- **Customer-facing portal** — AS-06.
- Full DMS/billing/inventory (BCMS references invoices/job cards, does not create them) — AS-02.

---

## 8. Personas

| Persona | Role | Goals | Pain today | Key screens |
|---------|------|-------|-----------|-------------|
| **Anil — Sales Advisor** | `sales_advisor` | Raise correct requests fast, get customers to the cashier | Register entries, lost paperwork | Collection Request, My Requests |
| **Rekha — Service Advisor** | `service_advisor` | Same, for service/job cards | Manual matching to job cards | Collection Request |
| **Suresh — Cashier** | `cashier` | Verify, collect, receipt, close drawer accurately | Manual counting/register, variance disputes | Cashier Queue, Receipt, Closing |
| **Manoj — Works Manager** | `works_manager` | Approve closings, keep branch moving | No systematic approval record | Approvals, Branch Dashboard |
| **Priya — Branch Accountant** | `branch_accountant` | Verify cash, record deposits & accounting | Reconciliation by hand | Deposits, Accounting, Reports |
| **Deepa — Cluster/Corporate Finance** | `cluster_finance`/`corporate_finance` | Oversight & reconciliation across branches | No consolidated view | Dashboards, Reports |
| **Ravi — Internal Audit** | `internal_audit` | Verify controls & trail | Registers hard to audit | Audit Log, Compliance report |
| **Ms. Nair — CFO/Admin** | `cfo_admin` | Govern system, masters, users, policy | No single control point | Admin, Corporate Dashboard |

---

## 9. User Stories & Acceptance Criteria

The complete set of user stories with Given/When/Then acceptance criteria for **every module** is maintained in **[UserStories.md](./UserStories.md)** (36+ stories across 12 modules). Each story maps to Requirement IDs and is traced in [TraceabilityMatrix.md](./TraceabilityMatrix.md). Representative examples:

- **US-CR-01/02** Advisor raises a request with mandatory documents → unique ID, blocked without docs.
- **US-CV-04** Cashier captures denomination/online reference; totals must equal amount.
- **US-RCPT-01** System issues a unique, sequential, immutable receipt.
- **US-CLS-01/02/03** Closing computes expected vs physical + variance reason; WM approves; Accountant verifies (maker ≠ checker).
- **US-DEP-02** Deposit verified only with slip **and** acknowledgement.
- **US-AUTH-03** Every action is audit-logged and immutable.

---

## 10. Functional Requirements

The authoritative, uniquely-identified functional requirements (FR-*, 78 items across 12 modules) are specified in **[Requirements.md](./Requirements.md) §4**. Summary by module:

| Module | Requirement range | Count |
|--------|-------------------|------|
| Master Data | FR-MDM-01…08 | 8 |
| Collection Request | FR-CR-01…08 | 8 |
| Cashier Verification | FR-CV-01…08 | 8 |
| Receipt | FR-RCPT-01…05 | 5 |
| Cash Closing | FR-CLS-01…14 | 14 |
| Expense | FR-EXP-01…07 | 7 |
| Deposit | FR-DEP-01…06 | 6 |
| Accounting | FR-ACC-01…06 | 6 |
| Dashboards | FR-DASH-01…06 | 6 |
| Reports | FR-RPT-01…10 | 10 |
| Notifications | FR-NOTIF-01…06 | 6 |
| Auth/Access/Audit | FR-AUTH-01…07 | 7 |

---

## 11. Non-Functional Requirements

Full list in [Requirements.md](./Requirements.md) §5. Highlights below with the product commitment.

### 11.1 Security
RBAC + Row Level Security, JWT `app_metadata` claims, maker-checker enforced server-side, OWASP Top 10 alignment, TLS + encryption at rest, MFA for finance/admin. See [SecurityArchitecture.md](./SecurityArchitecture.md). *(NFR-SEC-01/02)*

### 11.2 Accessibility
WCAG 2.1 AA target — keyboard operability, contrast, semantic components, status not by color alone. See [UIUX.md](./UIUX.md) §8. *(NFR-A11Y-01)*

### 11.3 Performance
Search ≤ 2s; standard screens ≤ 3s P95; indexed queries, `pg_trgm`, cursor pagination, materialised views. *(NFR-PERF-01/02)*

### 11.4 Scalability
Multi-branch/cluster/state data model; indexed RLS; read replica & materialised views for reporting; scales to the whole network and millions of transactions/year. *(NFR-SCAL-01/02)*

### 11.5 Availability
Target **≥ 99.5%**; managed Supabase + Vercel; backups + PITR (RPO ≤ 24h, RTO ≤ 4h); graceful degradation. *(NFR-AVAIL-01, NFR-BACKUP-01)*

### 11.6 Audit Logging
Append-only, immutable audit of all state-changing actions with actor/timestamp/before-after; document version history; full read for Internal Audit. *(NFR-AUDIT-01, FR-AUTH-04/06)*

### 11.7 Notifications
In-app real-time notifications for the five BRD triggers, role/scope-targeted; WhatsApp/email future. *(FR-NOTIF-*)*

### 11.8 Search
Global ⌘K search and fast per-module search across requests/receipts/customers within scope. *(NFR-PERF-01, R-05)*

### 11.9 Reports
Nine operational reports with filtering and PDF/Excel export; Daily Cash Book reconciles to receipts − expenses − deposits and to Tally. *(FR-RPT-*, SC-03)*

### 11.10 Dashboard & Analytics
Branch/state/corporate/exception dashboards with KPIs, trends, and drill-down; near real-time. Advanced BI (Power BI/Zoho) is a future enhancement. *(FR-DASH-*, R-19)*

---

## 12. Dependencies

| # | Dependency | Type | Notes |
|---|-----------|------|-------|
| D1 | Client clarifications (CLR-01…12) | Business | Resolve before/at kick-off ([Assumptions.md](./Assumptions.md)). |
| D2 | Supabase (Auth, DB, RLS, Edge, Realtime, Storage) | Platform | Core backend. |
| D3 | Vercel hosting | Platform | Frontend delivery. |
| D4 | PMPL org data (branches, clusters, users, opening balances) | Data | Needed for masters & cut-over. |
| D5 | Receipt/GST format & numbering rules | Business | Blocks receipt module (CLR-04). |
| D6 | Tally (Phase 4), Bank/CIT APIs (Phase 4) | External | Future integrations. |
| D7 | Branch connectivity & devices | Infra | Online-first assumption (CLR-10). |

---

## 13. Constraints

See [Requirements.md](./Requirements.md) §7 (CON-01…07): web/mobile app; Tally reconciliation with manual v1; directed tech stack; INR/India; multi-branch hierarchy; maker-checker & no-delete throughout.

---

## 14. Risk Analysis

Full register in [RiskAssessment.md](./RiskAssessment.md). Top risks: scope creep (RSK-01), RLS data isolation (RSK-03), fraud (RSK-04), financial-calculation bugs (RSK-08), Tally gap (RSK-02), adoption (RSK-05), connectivity (RSK-12).

---

## 15. Future Enhancements (Roadmap)

Phase 4+ (BRD §21 + recommendations): Live **Tally API**, **Bank statement API**, **WhatsApp/SMS**, **Power BI/Zoho** BI, **OCR** for slips, **payment-gateway** online collection (R-21), **PWA offline** (R-22), **cash-variance anomaly detection** (R-23). Recommended earlier items (variance tolerance, approval thresholds, period locking, exports, MFA) are called out in [BusinessAnalysis.md](./BusinessAnalysis.md) §6.

---

## 16. Release Plan & Milestones

Aligned to BRD Appendix B. Detailed plan in [ProjectPlan.md](./ProjectPlan.md).

| Release | Scope | Modules | Milestone |
|---------|-------|---------|-----------|
| **R1 — Foundation** | Masters & Collection Workflow | MDM, CR, CV, RCPT, Auth/RBAC | M1: Collection-to-receipt live |
| **R2 — Cash Ops** | Closing, Expenses & Deposits | CLS, EXP, DEP, Approvals | M2: End-of-day closing & deposits live |
| **R3 — Accounting & Reporting** | Accounting & Reports | ACC, RPT, Notifications | M3: Reports reconcile with Tally |
| **R4 — Insight & Integrations** | Dashboards & Integrations | DASH + Phase-4 integrations | M4: Corporate dashboards; Tally/Bank API |

---

## 17. Success Metrics

Traceable to BRD §22 (SC-01…06 in [Requirements.md](./Requirements.md) §10):

| Metric | Target |
|--------|--------|
| Cash transactions captured digitally | 100% (no manual register) |
| Closings with complete maker-checker approval | 100% |
| Daily Cash Book ↔ Tally reconciliation | 0 unexplained differences |
| Actions with full audit trail | 100% |
| Deposit turnaround (collection → verified deposit) | within policy (1–3 days) |
| Dashboard data freshness | within agreed window (near real-time) |
| Branch rollout | 100% of targeted branches |
| Search response time | ≤ 2s |
| Availability | ≥ 99.5% |

---

## 18. Requirement Traceability Matrix

The full RTM (requirement → module → user story → design → API → DB → test) is in **[TraceabilityMatrix.md](./TraceabilityMatrix.md)**. Every BRD section §1–§22 and Appendices A–B is mapped.

---

## 19. Open Questions

Tracked in [Assumptions.md](./Assumptions.md) §5 (CLR-01…12). PRD sign-off is contingent on resolving the four High-priority clarifications (online scope, Tally depth, volumes, receipt/GST format).

---

*End of PRD.md*
