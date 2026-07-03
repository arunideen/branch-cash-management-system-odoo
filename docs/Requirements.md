# Requirements Specification

**Project:** Branch Cash Management System (BCMS)
**Client:** Prabal Motors Private Limited (PMPL)
**Source Document:** `BRD_v1.0.docx` — Comprehensive Business Requirements Document, Version 1.0
**Platform:** Odoo 19 Community Edition — one fully custom module (`branch_cash_management`)
**Document Version:** 2.0
**Prepared By:** Product / Business Analysis
**Date:** 2026-07-03
**Status:** Draft for Client Review

---

## 0. About This Document

This document is the authoritative, structured extraction of every requirement contained in the source BRD. It normalises the BRD's bulleted, high-level statements into uniquely identified, testable requirements and organises them into the standard requirement categories.

Every requirement carries a **unique Requirement ID**. These IDs are the single source of truth referenced by:

- [PRD.md](./PRD.md) — Product Requirements Document
- [SOW.md](./SOW.md) — Statement of Work
- [UserStories.md](./UserStories.md) — user stories & acceptance criteria
- [TraceabilityMatrix.md](./TraceabilityMatrix.md) — Requirement Traceability Matrix (RTM)
- [DatabaseDesign.md](./DatabaseDesign.md), [APIDesign.md](./APIDesign.md), [SecurityArchitecture.md](./SecurityArchitecture.md)

> **Note on ambiguity.** The BRD is deliberately concise (~1,000 words). Where a requirement is implied but not fully specified, the requirement is captured here and the interpretation is recorded in [Assumptions.md](./Assumptions.md). Open questions that block a confident interpretation are listed in §12 *Clarifications Required* and mirrored in [Assumptions.md](./Assumptions.md).

### Requirement ID Scheme

| Prefix | Category | Example |
|--------|----------|---------|
| `BO-##` | Business Objective | `BO-01` |
| `BP-##` | Business Problem | `BP-01` |
| `SH-##` | Stakeholder | `SH-01` |
| `FR-<MOD>-##` | Functional Requirement (by module) | `FR-CR-01` |
| `NFR-<CAT>-##` | Non-Functional Requirement | `NFR-PERF-01` |
| `BR-##` | Business Rule | `BR-01` |
| `CON-##` | Constraint | `CON-01` |
| `AS-##` | Assumption | `AS-01` |
| `RSK-##` | Risk | `RSK-01` |
| `SC-##` | Success Criterion | `SC-01` |
| `CLR-##` | Clarification Required | `CLR-01` |

### Module Codes

| Code | Module |
|------|--------|
| `MDM` | Master Data Management |
| `CR` | Collection Request |
| `CV` | Cashier Verification |
| `RCPT` | Receipt Generation |
| `CLS` | Cash Closing |
| `EXP` | Cash Expense |
| `DEP` | Bank Deposit |
| `ACC` | Accounting Update |
| `DASH` | Dashboards |
| `RPT` | Reports |
| `NOTIF` | Notifications |
| `AUTH` | Authentication / Access & Audit |

### MoSCoW Priority Legend

`M` = Must have · `S` = Should have · `C` = Could have · `W` = Won't have this release (future). Priorities marked *(derived)* are analyst-assigned where the BRD is silent.

---

## 1. Business Objectives

Source: BRD §2 (Business Background) and §3 (Objectives).

| ID | Business Objective | BRD Ref | Priority |
|----|--------------------|---------|----------|
| BO-01 | Digitize the end-to-end branch cash collection workflow, replacing manual cash registers. | §3, §2 | M |
| BO-02 | Standardize branch cash operations across both Sales and Service verticals. | §2 | M |
| BO-03 | Provide end-to-end visibility of every rupee from collection through to accounting. | §2 | M |
| BO-04 | Implement maker-checker (four-eyes) approvals across cash workflows. | §3 | M |
| BO-05 | Enable real-time operational and financial dashboards at branch, state, and corporate levels. | §3, §16 | M |
| BO-06 | Improve audit compliance and reduce reconciliation/audit effort. | §2 | M |
| BO-07 | Establish a foundation for future integration with Tally (accounting) and other systems. | §3, §21 | S |
| BO-08 | Scale the solution across all branches of the dealership network. | §20 | M |

---

## 2. Business Problems (Current-State Pain Points)

Derived from BRD §2 (Business Background) and the overall intent of the document.

| ID | Business Problem | Evidence in BRD |
|----|------------------|-----------------|
| BP-01 | Cash operations are recorded in manual registers, causing errors, delays, and weak auditability. | "Reduce manual registers and improve audit compliance." |
| BP-02 | No standard process — Sales and Service branches handle cash inconsistently. | "Standardize branch cash operations across Sales and Service." |
| BP-03 | Lack of end-to-end visibility from collection to accounting; management cannot see status in real time. | "Provide end-to-end visibility from collection to accounting." |
| BP-04 | Weak segregation of duties / approval controls increase risk of error and fraud. | Implied by §11, §18 (maker-checker, audit trail). |
| BP-05 | Reconciliation between branch cash, deposits, and Tally accounting is manual and error-prone. | §22 "Reports reconcile with Tally." |
| BP-06 | Delayed or missing bank deposits and unverified acknowledgements create cash-in-hand exposure. | §13, §15 (Pending Deposits report). |
| BP-07 | No consolidated exception visibility (cash differences, pending closings/deposits) across the network. | §15, §16 (Exception dashboard). |

---

## 3. Stakeholders

Source: BRD §1 (Audience), §5 (User Roles). *Operational user roles are detailed in [UserRoles.md](./UserRoles.md).*

### 3.1 Business / Governance Stakeholders

| ID | Stakeholder | Interest / Concern |
|----|-------------|--------------------|
| SH-01 | CFO / Admin | Financial control, compliance, corporate-wide visibility, system ownership. |
| SH-02 | Corporate Finance | Consolidated reporting, accounting completeness, policy enforcement. |
| SH-03 | Cluster / State Finance | Multi-branch oversight within a cluster/state, exception follow-up. |
| SH-04 | Internal Audit | Audit trail integrity, compliance reporting, control testing. |
| SH-05 | Branch Management (Works Manager) | Branch-level approvals, cash closing sign-off, operational throughput. |
| SH-06 | IT / Implementation Team | Delivery, deployment, integration, support. |
| SH-07 | QA Team | Verification that the system meets acceptance criteria. |

### 3.2 Operational User Roles (also actors)

| ID | Role | BRD Ref |
|----|------|---------|
| SH-08 | Sales Advisor | §5 |
| SH-09 | Service Advisor | §5 |
| SH-10 | Cashier | §5 |
| SH-11 | Works Manager | §5 |
| SH-12 | Branch Accountant | §5 |
| SH-13 | Cluster Finance | §5 |
| SH-14 | Corporate Finance | §5 |
| SH-15 | Internal Audit | §5 |
| SH-16 | CFO / Admin | §5 |

### 3.3 External Stakeholders

| ID | Stakeholder | Interest |
|----|-------------|----------|
| SH-17 | Customer | Pays cash/online; receives official receipt. |
| SH-18 | Bank | Receives deposits; provides acknowledgements. |
| SH-19 | Cash Pickup Agency (CIT) | Collects cash from branch for deposit. |
| SH-20 | Tally / Accounting System | Downstream system of record for accounting (future API). |

---

## 4. Functional Requirements

Requirements are grouped by the ten functional modules named in BRD §7, plus Notifications (§17) and Authentication/Access (§18). Each requirement is atomic and testable.

### 4.1 Master Data Management (`MDM`) — BRD §7, §19

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-MDM-01 | The system shall maintain a **Branch** master (branch code, name, cluster, state, type: Sales/Service/Both, status). | M |
| FR-MDM-02 | The system shall maintain an **Employee/User** master with role assignment and branch mapping. | M |
| FR-MDM-03 | The system shall maintain a **Customer** master (name, contact, identifiers), supporting reuse across requests. | M |
| FR-MDM-04 | The system shall maintain an **Expense Head** master for cash expense categorisation. *(derived from §12)* | S |
| FR-MDM-05 | The system shall maintain a **Bank Account / Deposit destination** master and **Pickup Agency** master. *(derived from §13)* | S |
| FR-MDM-06 | The system shall maintain a **Ledger** master for accounting mapping to Tally. *(derived from §14)* | S |
| FR-MDM-07 | Master data shall be manageable via an **Admin Masters** screen restricted to authorised roles. | M |
| FR-MDM-08 | Master records shall support activate/deactivate (no physical delete — see BR-05). | M |

### 4.2 Collection Request (`CR`) — BRD §6, §8

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CR-01 | An Advisor (Sales/Service) shall initiate a **Collection Request** capturing customer details. | M |
| FR-CR-02 | The request shall capture the reference document: **Invoice number (Sales)** or **Job Card number (Service)**. | M |
| FR-CR-03 | The request shall capture the **amount** to be collected. | M |
| FR-CR-04 | The request shall capture the **expected payment mode** (cash / online / mixed). | M |
| FR-CR-05 | The request shall require **mandatory document upload** before submission. | M |
| FR-CR-06 | The system shall generate a **unique Request ID** for every collection request. | M |
| FR-CR-07 | The system shall provide **status tracking** for each request through its lifecycle. | M |
| FR-CR-08 | The advisor shall be able to view the status/queue of their own requests. *(derived)* | S |

### 4.3 Cashier Verification (`CV`) — BRD §6, §9

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CV-01 | The Cashier shall **search** for a collection request (by Request ID, customer, invoice/job card). | M |
| FR-CV-02 | The Cashier shall **verify submitted documents** against the request. | M |
| FR-CV-03 | The Cashier shall be able to **reject** a request with mandatory remarks, returning it to the advisor for correction. | M |
| FR-CV-04 | The Cashier shall be able to **accept** a request and proceed to collect payment. | M |
| FR-CV-05 | For cash payments, the Cashier shall **capture denomination** details. | M |
| FR-CV-06 | For online payments, the Cashier shall **capture the online/transaction reference**. | M |
| FR-CV-07 | The Cashier shall **verify** the collected payment before receipt generation. | M |
| FR-CV-08 | A rejected request shall be editable and resubmittable by the advisor (correction loop). | M |

### 4.4 Receipt Generation (`RCPT`) — BRD §6, §9

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-RCPT-01 | The system shall **generate an official receipt** upon accepted & verified payment. | M |
| FR-RCPT-02 | Each receipt shall have a **unique, sequential, non-editable receipt number**. *(derived — see BR-08)* | M |
| FR-RCPT-03 | The receipt shall record amount, mode, request/invoice reference, customer, cashier, branch, date/time. | M |
| FR-RCPT-04 | The receipt shall be **printable and/or downloadable (PDF)**. *(derived from §Appendix A "Receipt" screen)* | S |
| FR-RCPT-05 | A generated receipt shall be **immutable**; corrections require a controlled cancellation/reversal. *(derived — BR-05, BR-08)* | S |

### 4.5 Cash Closing (`CLS`) — BRD §6, §10, §11

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CLS-01 | The Cashier shall perform **end-of-day cash closing** for their cash point. | M |
| FR-CLS-02 | Closing shall record **opening cash**. | M |
| FR-CLS-03 | Closing shall aggregate **cash collections** for the period. | M |
| FR-CLS-04 | Closing shall aggregate **online collections** for the period. | M |
| FR-CLS-05 | Closing shall subtract **expenses** for the period. | M |
| FR-CLS-06 | Closing shall subtract **deposits** made for the period. | M |
| FR-CLS-07 | The system shall compute **expected closing cash** = opening + cash collections − expenses − deposits. | M |
| FR-CLS-08 | The Cashier shall enter **physical (actual) cash** counted. | M |
| FR-CLS-09 | The system shall compute **variance** = physical − expected. | M |
| FR-CLS-10 | Where variance ≠ 0, the Cashier shall enter a **mandatory variance reason**. | M |
| FR-CLS-11 | Submitting a closing shall route it into the approval workflow (see FR-CLS-12). | M |
| FR-CLS-12 | The closing approval chain shall be **Cashier → Works Manager → Branch Accountant → Closed**. | M |
| FR-CLS-13 | The **Works Manager shall approve** the closing (approve/reject with remarks). | M |
| FR-CLS-14 | The **Branch Accountant shall verify physical cash and transactions** and finalise the closing. | M |

### 4.6 Cash Expense (`EXP`) — BRD §12

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-EXP-01 | An authorised user shall record a **cash expense** with a **voucher number**. | M |
| FR-EXP-02 | The expense shall capture the **expense head** (category). | M |
| FR-EXP-03 | The expense shall capture the **amount**. | M |
| FR-EXP-04 | The expense shall capture the **approver**. | M |
| FR-EXP-05 | The expense shall support an **attachment** (bill/voucher image). | M |
| FR-EXP-06 | An approved expense shall **automatically reduce the cash balance**. | M |
| FR-EXP-07 | Expense entries shall be subject to approval before affecting cash balance. *(derived from §12 "Approver")* | M |

### 4.7 Bank Deposit (`DEP`) — BRD §6, §13

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DEP-01 | The system shall record a **bank deposit** as either a **direct branch deposit** or via a **pickup agency**. | M |
| FR-DEP-02 | The user shall **upload the deposit slip**. | M |
| FR-DEP-03 | The user shall **upload the bank acknowledgement**. | M |
| FR-DEP-04 | The system shall support **deposit verification** by an authorised role. | M |
| FR-DEP-05 | The deposit shall record amount, date, bank/agency, and reference. *(derived)* | M |
| FR-DEP-06 | A verified deposit shall reduce cash-in-hand and feed the cash closing (FR-CLS-06). *(derived)* | M |

### 4.8 Accounting Update (`ACC`) — BRD §6, §14

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ACC-01 | An authorised user (Branch Accountant/Finance) shall record the **Tally voucher number**. | M |
| FR-ACC-02 | The system shall capture the **voucher date**. | M |
| FR-ACC-03 | The system shall capture the **posting date**. | M |
| FR-ACC-04 | The system shall capture the **ledger** used for the accounting entry. | M |
| FR-ACC-05 | The system shall maintain an **accounting status** (e.g., Pending / Posted / Reconciled). | M |
| FR-ACC-06 | The system shall support reconciliation of records against Tally (manual now; API in future). | S |

### 4.9 Dashboards (`DASH`) — BRD §16

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DASH-01 | The system shall provide a **Branch dashboard** (branch-scoped KPIs). | M |
| FR-DASH-02 | The system shall provide a **State/Cluster dashboard** (aggregated across branches). | M |
| FR-DASH-03 | The system shall provide a **Corporate dashboard** (network-wide KPIs). | M |
| FR-DASH-04 | The system shall provide **trend analysis** views. | S |
| FR-DASH-05 | The system shall provide an **Exception dashboard** (variances, pending items, overdue deposits). | M |
| FR-DASH-06 | Dashboards shall reflect **near real-time** data. *(derived from BO-05 "real-time")* | S |

### 4.10 Reports (`RPT`) — BRD §15

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-RPT-01 | **Daily Cash Book** report. | M |
| FR-RPT-02 | **Collection Register** report. | M |
| FR-RPT-03 | **Expense Register** report. | M |
| FR-RPT-04 | **Deposit Register** report. | M |
| FR-RPT-05 | **Pending Deposits** report. | M |
| FR-RPT-06 | **Pending Closings** report. | M |
| FR-RPT-07 | **Cash Difference** (variance) report. | M |
| FR-RPT-08 | **Accounting Pending** report. | M |
| FR-RPT-09 | **Compliance** report. | M |
| FR-RPT-10 | All reports shall support **filtering** (branch, date range, status) and **export** (PDF/Excel). *(derived)* | S |

### 4.11 Notifications (`NOTIF`) — BRD §17

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NOTIF-01 | Notify relevant users of **rejected requests**. | M |
| FR-NOTIF-02 | Notify approvers of **pending approvals**. | M |
| FR-NOTIF-03 | Notify relevant users of **pending closing**. | M |
| FR-NOTIF-04 | Notify relevant users of **pending deposits**. | M |
| FR-NOTIF-05 | Notify relevant users of **accounting pending**. | M |
| FR-NOTIF-06 | Notifications shall be delivered **in-app** at minimum; WhatsApp/email are future enhancements. *(see §21)* | S |

### 4.12 Authentication, Access Control & Audit (`AUTH`) — BRD §18

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-01 | The system shall authenticate users via secure **login**. | M |
| FR-AUTH-02 | The system shall enforce **role-based access control (RBAC)**. | M |
| FR-AUTH-03 | The system shall enforce **branch/cluster/state data scoping** so users only see permitted data. *(derived from dashboards hierarchy)* | M |
| FR-AUTH-04 | The system shall maintain a complete, immutable **audit trail** of all significant actions. | M |
| FR-AUTH-05 | The system shall enforce **maker-checker** separation of duties on approvals. | M |
| FR-AUTH-06 | The system shall maintain **document version history** for uploaded documents. | M |
| FR-AUTH-07 | The system shall support **soft delete only** (no physical delete) for business records. | M |

---

## 5. Non-Functional Requirements

Source: BRD §20, with derived detail where the BRD is silent (marked *(derived)*).

| ID | Category | Requirement | Priority |
|----|----------|-------------|----------|
| NFR-AVAIL-01 | Availability | The system shall provide **≥ 99.5% availability** (≈ ≤ 3h39m downtime/month). | M |
| NFR-USE-01 | Usability | The UI shall be **responsive** and usable on web and mobile browsers. | M |
| NFR-USE-02 | Usability | Core workflows (create request, verify, receipt, closing) shall be completable on a mobile device. *(derived)* | S |
| NFR-SEC-01 | Security | The system shall enforce **role-based security** and least-privilege access. | M |
| NFR-SEC-02 | Security | All data in transit shall use **TLS 1.2+**; sensitive data at rest shall be encrypted. *(derived)* | M |
| NFR-PERF-01 | Performance | **Fast search** — search results shall return within **≤ 2 seconds** for typical datasets. *(derived quantification of "fast search")* | M |
| NFR-PERF-02 | Performance | Standard list/read screens shall load within **≤ 3 seconds** (P95). *(derived)* | S |
| NFR-SCAL-01 | Scalability | The system shall **scale to all branches** of the network (multi-branch, multi-cluster, multi-state). | M |
| NFR-SCAL-02 | Scalability | The data model shall support growth to millions of transactions/year without redesign. *(derived)* | S |
| NFR-AUDIT-01 | Auditability | All state-changing actions shall be logged with actor, timestamp, before/after values. *(derived from §18)* | M |
| NFR-COMPAT-01 | Compatibility | Supported on current versions of Chrome, Edge, Safari, and Firefox. *(derived)* | S |
| NFR-A11Y-01 | Accessibility | UI shall target **WCAG 2.1 AA**. *(recommended — see BusinessAnalysis)* | C |
| NFR-MAINT-01 | Maintainability | Modular, feature-based architecture following SOLID and Clean Architecture. *(from stack directive)* | M |
| NFR-LOCAL-01 | Localisation | Currency displayed in **INR (₹)**; dates in **DD-MM-YYYY**; timezone **IST (Asia/Kolkata)**. *(derived — Indian dealership)* | S |
| NFR-BACKUP-01 | Recoverability | Automated daily backups; defined **RPO ≤ 24h, RTO ≤ 4h**. *(recommended)* | S |
| NFR-RETAIN-01 | Data Retention | Financial & audit records retained for **≥ 8 years** (Indian statutory guidance). *(recommended — confirm)* | S |

---

## 6. Business Rules

Derived from BRD §11, §12, §18, §22 and cash-control best practice. These are enforceable rules the system must honour.

| ID | Business Rule | Source |
|----|---------------|--------|
| BR-01 | A collection request cannot proceed to payment without all **mandatory documents** uploaded. | §8 |
| BR-02 | The **closing approval chain is fixed**: Cashier → Works Manager → Branch Accountant → Closed. No step may be skipped. | §11 |
| BR-03 | **Maker ≠ Checker**: the user who creates/initiates a transaction cannot approve their own transaction. | §18, four-eyes principle |
| BR-04 | A cash closing with a **non-zero variance requires a mandatory reason** before submission. | §10 |
| BR-05 | **No physical deletion** of business records; records are soft-deleted / cancelled with reason and retained. | §18 |
| BR-06 | An **approved expense automatically reduces the cash balance**. | §12 |
| BR-07 | A **deposit** must have both a **deposit slip and an acknowledgement** to be marked verified. | §13 |
| BR-08 | **Receipt numbers** are unique, sequential per branch/series, and non-editable once issued. | §Appendix A, derived |
| BR-09 | A **rejected request** returns to the advisor with mandatory remarks and re-enters the workflow upon correction. | §9 |
| BR-10 | Expected closing cash is computed as **Opening + Cash Collections − Expenses − Deposits** (online collections are tracked but do not affect physical cash). | §10 |
| BR-11 | A record's **accounting status** must reach a terminal state (Posted/Reconciled) for the transaction to be considered complete. | §14, §22 |
| BR-12 | Users may only act on data **within their assigned branch/cluster/state scope**. | §16 hierarchy, derived |
| BR-13 | Every uploaded document change is **versioned**; prior versions are retained. | §18 |
| BR-14 | **Online collections** are reconciled against the online reference and do not enter physical cash count. | §9, §10 |

---

## 7. Constraints

| ID | Constraint | Source / Type |
|----|------------|---------------|
| CON-01 | Solution must be delivered as a **responsive Odoo web application** (Odoo 19 CE backend). | §1 (Project Type), Business |
| CON-02 | Accounting system of record is **Tally**; reports must reconcile to Tally. Direct Tally API is a **future** enhancement (not in initial release). The module does **not** depend on Odoo's `account` app. | §3, §21, §22 |
| CON-03 | Bank API, WhatsApp notifications, Power BI/Zoho Analytics, and OCR are **out of scope for the initial release** (future enhancements). | §21 |
| CON-04 | Technology stack is directed: **Odoo 19 Community Edition** (LGPL-3), built as **one fully custom module** (`branch_cash_management`) depending only on core `base`, `mail`, `web` — Python models, XML/OWL views, QWeb reports, PostgreSQL. No Odoo Enterprise features. | Platform decision (2026-07-03) |
| CON-05 | Currency is **INR**; operations are **India-based** (statutory, timezone, language). | Derived |
| CON-06 | System must operate across a **multi-branch, multi-cluster, multi-state** organisational hierarchy. | §16, §20 |
| CON-07 | Must support **maker-checker** and **no-physical-delete** compliance postures throughout. | §18 |

---

## 8. Assumptions (Summary)

The full, numbered assumption register with rationale and impact lives in **[Assumptions.md](./Assumptions.md)**. Key assumptions referenced by this document:

| ID | Assumption (summary) |
|----|----------------------|
| AS-01 | "Online collections" refers to card/UPI/net-banking captured with a transaction reference, not a payment-gateway integration in this release. |
| AS-02 | One "cash point" ≈ one Cashier per branch per day; multi-cashier branches are supported by design but a single closing per cashier per day is the base case. |
| AS-03 | Tally integration in the initial release is **manual data entry** of voucher details (no live API). |
| AS-04 | Notifications in the initial release are **in-app**; WhatsApp/email deferred. |
| AS-05 | The organisational hierarchy is Branch → Cluster → State → Corporate. |
| AS-06 | Document uploads are images/PDFs stored as Odoo attachments (`ir.attachment`) with versioning. |

> See [Assumptions.md](./Assumptions.md) for AS-01 … AS-36 in full (including the Odoo platform assumptions AS-31…AS-36).

---

## 9. Risks (Summary)

The full risk register with likelihood/impact/mitigation is in **[RiskAssessment.md](./RiskAssessment.md)**. Headline requirement-level risks:

| ID | Risk (summary) | Ref |
|----|----------------|-----|
| RSK-01 | BRD ambiguity leads to scope creep during build. | RiskAssessment |
| RSK-02 | Tally reconciliation expectations exceed manual-entry capability in v1. | CON-02 |
| RSK-03 | Cash variance handling / fraud controls insufficient if maker-checker not rigorously enforced. | BR-03 |
| RSK-04 | Offline/low-connectivity branches may struggle with a purely online app. | NFR-AVAIL |
| RSK-05 | Adoption risk — staff reverting to manual registers. | BO-01 |

---

## 10. Success Criteria

Source: BRD §22 (Acceptance Criteria), extended with measurable targets.

| ID | Success Criterion | Measure | Source |
|----|-------------------|---------|--------|
| SC-01 | End-to-end workflow operates **without any manual register**. | 100% of in-scope cash transactions captured in BCMS. | §22 |
| SC-02 | **All approvals captured** digitally with maker-checker. | 100% of closings/expenses have a complete, auditable approval chain. | §22 |
| SC-03 | **Reports reconcile with Tally**. | Daily cash book and registers reconcile to Tally with zero unexplained differences. | §22 |
| SC-04 | **Complete audit trail** available. | Every state-changing action is traceable to actor + timestamp + before/after. | §22 |
| SC-05 | Real-time dashboards operational at branch/state/corporate levels. | Dashboards reflect data within the agreed freshness window. | §3, §16 |
| SC-06 | System adopted across all targeted branches. | Rollout completion across planned branches. | §20 |

---

## 11. Missing Information (Gaps in the BRD)

Items the BRD implies but does not specify. These do not block a first-pass design but require confirmation. Each is captured as a clarification (§12) and/or assumption in [Assumptions.md](./Assumptions.md).

| # | Gap | Impact |
|---|-----|--------|
| G-01 | No data volumes (transactions/day, number of branches, users) provided. | Sizing, performance targets, cost. |
| G-02 | Exact "online collection" mechanism (gateway vs. manual reference) unspecified. | Scope of CV/RCPT modules, integrations. |
| G-03 | Tally integration depth for v1 not defined (manual vs. API). | Scope, effort (CON-02). |
| G-04 | Receipt numbering scheme, statutory receipt format, GST treatment unspecified. | Receipt module, compliance. |
| G-05 | Denomination handling rules (mandatory? which denominations?) not detailed. | Cashier module. |
| G-06 | Approval thresholds / limits (e.g., expense approval by amount) not defined. | Business rules, workflow. |
| G-07 | Multi-cashier / multi-shift handling per branch not specified. | Closing module. |
| G-08 | Data retention & archival policy not specified. | Compliance, storage. |
| G-09 | SSO / identity provider requirements (if any) not specified. | Auth design. |
| G-10 | Offline capability requirement for low-connectivity branches not stated. | Architecture. |
| G-11 | SLA/support model, environments, and go-live criteria not specified. | SOW. |
| G-12 | Reporting periods, financial-year handling, and locking of closed periods unspecified. | Reports, accounting. |

---

## 12. Clarifications Required

Open questions for the client, prioritised. Full list and phrasing in [Assumptions.md](./Assumptions.md) §Clarifications.

| ID | Clarification | Priority | Blocks |
|----|---------------|----------|--------|
| CLR-01 | Confirm scope of "online collections" — is a payment-gateway integration required, or is capturing a transaction reference sufficient for v1? | High | CR, CV, RCPT scope |
| CLR-02 | Confirm Tally integration for v1: manual voucher entry vs. live XML/HTTP API. | High | ACC scope, effort |
| CLR-03 | Provide expected data volumes: number of branches, users, and transactions/day. | High | Sizing, NFR targets |
| CLR-04 | Confirm receipt format & statutory/GST requirements for official receipts. | High | RCPT, compliance |
| CLR-05 | Define approval thresholds/limits (e.g., expense approval by amount, variance escalation limits). | Medium | Workflow rules |
| CLR-06 | Confirm organisational hierarchy (Branch → Cluster → State → Corporate) and data-scoping rules per role. | Medium | AUTH, record rules |
| CLR-07 | Confirm multi-cashier / multi-shift model per branch and closing granularity. | Medium | CLS |
| CLR-08 | Confirm notification channels for v1 (in-app only vs. email). | Low | NOTIF |
| CLR-09 | Confirm data-retention and period-locking policies. | Medium | Compliance, ACC |
| CLR-10 | Confirm whether offline/low-connectivity operation is required for any branches. | Medium | Architecture |
| CLR-11 | Confirm SLA, environments, and go-live acceptance for the SOW. | Medium | SOW |
| CLR-12 | Confirm whether SSO/corporate IdP integration is required. | Low | AUTH |

---

## 13. Requirement Coverage Summary

| Category | Count |
|----------|-------|
| Business Objectives (BO) | 8 |
| Business Problems (BP) | 7 |
| Stakeholders (SH) | 20 |
| Functional Requirements (FR) | 78 |
| Non-Functional Requirements (NFR) | 16 |
| Business Rules (BR) | 14 |
| Constraints (CON) | 7 |
| Assumptions (AS) | 30 (see Assumptions.md) |
| Risks (RSK) | see RiskAssessment.md |
| Success Criteria (SC) | 6 |
| Clarifications (CLR) | 12 |

Every BRD section (§1–§22 + Appendices A–B) is mapped in [TraceabilityMatrix.md](./TraceabilityMatrix.md).

---

*End of Requirements.md*
