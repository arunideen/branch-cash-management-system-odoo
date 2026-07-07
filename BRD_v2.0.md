# Business Requirements Document (BRD)

**Branch Cash Management System (BCMS)**

*Prepared for Prabal Motors Private Limited (PMPL)  ·  Version 2.0  ·  07 July 2026  ·  Draft for Client Review & Sign-off*

---

### Document Control

| Field | Detail |
|-------|--------|
| Document title | Business Requirements Document — Branch Cash Management System (BCMS) |
| Client | Prabal Motors Private Limited (PMPL) |
| Prepared by | Business Analysis Team |
| Version | 2.0 |
| Date | 07 July 2026 |
| Status | Draft for Client Review & Sign-off |
| Confidentiality | Confidential — for PMPL and the implementation partner only |

### Revision History

| Version | Date | Author | Summary of changes |
|---------|------|--------|--------------------|
| 1.0 | 01 July 2026 | Business Analysis | Initial BRD capturing scope, roles, modules and acceptance criteria. |
| 2.0 | 07 July 2026 | Business Analysis | Consolidated, expanded, and structured BRD with uniquely identified, testable requirements; confirmed solution platform and phased delivery approach. |

### Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| CFO / Admin (PMPL) | | | |
| Corporate Finance (PMPL) | | | |
| Project Sponsor (PMPL) | | | |
| Implementation Lead | | | |

---

<div class="pagebreak"></div>

## Table of Contents

1. Introduction
2. Business Background & Context
3. Business Objectives
4. Current-State Problems
5. Project Scope
6. Stakeholders
7. User Roles & Responsibilities
8. End-to-End Business Workflow
9. Functional Requirements
10. Business Rules
11. Non-Functional Requirements
12. Reports & Dashboards
13. Data Entities (High-Level)
14. Assumptions
15. Constraints
16. Risks
17. Success & Acceptance Criteria
18. Solution Approach & Delivery Phases
19. Open Points / Clarifications Required
20. Glossary
- Appendix A — Screen List
- Appendix B — Requirement Coverage Summary

---

## 1. Introduction

### 1.1 Purpose
This document defines the business and functional requirements for the **Branch Cash Management System (BCMS)** for Prabal Motors Private Limited (PMPL). It is the agreed reference against which the solution will be designed, built, tested, and accepted. Every requirement is uniquely identified so it can be traced through design, development, and user acceptance.

### 1.2 Intended Audience
PMPL management and finance leadership, the internal audit function, branch operations teams, and the implementation partner (business analysis, development, QA, and deployment).

### 1.3 Overview
PMPL operates a multi-branch automobile **Sales and Service** business. Branch cash is currently managed through **manual registers and physical paperwork**, which is error-prone, slow to reconcile, hard to audit, and offers no real-time visibility to management. BCMS digitises the complete branch cash lifecycle — **collection request → cashier verification → official receipt → cash expense → end-of-day closing → maker-checker approval → bank deposit → Tally accounting** — under strict role-based access, a complete audit trail, and no-physical-delete controls, surfaced through dashboards and a suite of operational reports.

---

## 2. Business Background & Context

PMPL's branches take **cash and online payments** daily from vehicle **sales** (against invoices) and **service/repairs** (against job cards). Physical cash passes through advisors, cashiers, works managers, and branch accountants before being deposited at the bank and accounted for in **Tally**.

This is a classic **segregation-of-duties** domain: sound cash control requires that no single person collects, counts, and banks cash; that drawers are reconciled daily with dual sign-off; and that deposits and audit records are tracked immutably. BCMS is intended to enforce these controls consistently across the network while giving management end-to-end visibility.

---

## 3. Business Objectives

| ID | Business Objective | Priority |
|----|--------------------|----------|
| BO-01 | Digitise the end-to-end branch cash collection workflow, replacing manual cash registers. | Must |
| BO-02 | Standardise branch cash operations across both Sales and Service verticals. | Must |
| BO-03 | Provide end-to-end visibility of every rupee from collection through to accounting. | Must |
| BO-04 | Implement maker-checker (four-eyes) approvals across cash workflows. | Must |
| BO-05 | Enable real-time operational and financial dashboards at branch, state, and corporate levels. | Must |
| BO-06 | Improve audit compliance and reduce reconciliation and audit effort. | Must |
| BO-07 | Establish a foundation for future integration with Tally and other systems. | Should |
| BO-08 | Scale the solution across all branches of the dealership network. | Must |

---

## 4. Current-State Problems

| ID | Problem |
|----|---------|
| BP-01 | Cash operations recorded in manual registers cause errors, delays, and weak auditability. |
| BP-02 | No standard process — Sales and Service branches handle cash inconsistently. |
| BP-03 | No end-to-end visibility from collection to accounting; management cannot see status in real time. |
| BP-04 | Weak segregation of duties / approval controls increase the risk of error and fraud. |
| BP-05 | Reconciliation between branch cash, deposits, and Tally accounting is manual and error-prone. |
| BP-06 | Delayed or unverified bank deposits create cash-in-hand exposure. |
| BP-07 | No consolidated view of exceptions (cash differences, pending closings/deposits) across the network. |

---

## 5. Project Scope

### 5.1 In Scope (this release)

1. **Master Data Management** — branches, employees/users, customers, expense heads, banks, pickup agencies, ledgers.
2. **Collection Request** — advisor-initiated, mandatory documents, unique ID, status tracking.
3. **Cashier Verification** — search, verify, reject/accept, denomination or online-reference capture.
4. **Receipt Generation** — official, unique, immutable receipts (print / PDF).
5. **Cash Expense** — voucher, head, amount, approver, attachment, automatic cash reduction on approval.
6. **Cash Closing** — opening, collections, expenses, deposits, expected vs physical, variance and reason.
7. **Approval Workflow** — Cashier → Works Manager → Branch Accountant → Closed (maker-checker).
8. **Bank Deposit** — direct or pickup agency, slip and acknowledgement, verification.
9. **Accounting Update** — Tally voucher, dates, ledger, accounting status (manual entry in this release).
10. **Dashboards** — branch, state/cluster, corporate, trend, and exception views.
11. **Reports** — nine operational reports with filtering and export.
12. **Notifications** — in-app alerts for the defined triggers.
13. **Security & Audit** — role-based access, data scoping, complete audit trail, no physical delete, document versioning.

### 5.2 Out of Scope (future enhancements)

The following are explicitly **deferred** to later phases and are **not** part of this release:

- Live **Tally API** auto-posting and reconciliation (manual voucher entry in this release).
- **Bank statement API** integration.
- **WhatsApp / SMS / email** notifications (in-app only in this release).
- **Power BI / Zoho Analytics** business-intelligence reporting.
- **OCR** for deposit slips and bills.
- **Payment-gateway** integration for online collections (transaction-reference capture only in this release).
- **Offline / PWA** operation.
- **Customer-facing portal.**
- Creation of invoices, job cards, or inventory (BCMS **references** these documents; it does not create them).

---

## 6. Stakeholders

### 6.1 Business / Governance Stakeholders

| ID | Stakeholder | Interest |
|----|-------------|----------|
| SH-01 | CFO / Admin | Financial control, compliance, corporate-wide visibility, system ownership. |
| SH-02 | Corporate Finance | Consolidated reporting, accounting completeness, policy enforcement. |
| SH-03 | Cluster / State Finance | Multi-branch oversight within a cluster/state, exception follow-up. |
| SH-04 | Internal Audit | Audit-trail integrity, compliance reporting, control testing. |
| SH-05 | Branch Management (Works Manager) | Branch-level approvals, closing sign-off, operational throughput. |
| SH-06 | IT / Implementation Team | Delivery, deployment, integration, support. |

### 6.2 Operational Users
Sales Advisor, Service Advisor, Cashier, Works Manager, Branch Accountant, Cluster Finance, Corporate Finance, Internal Audit, CFO / Admin.

### 6.3 External Stakeholders

| ID | Stakeholder | Interest |
|----|-------------|----------|
| SH-17 | Customer | Pays cash/online; receives an official receipt. |
| SH-18 | Bank | Receives deposits; provides acknowledgements. |
| SH-19 | Cash Pickup Agency | Collects cash from the branch for deposit. |
| SH-20 | Tally / Accounting System | Downstream system of record for accounting. |

---

## 7. User Roles & Responsibilities

Each user is scoped to their **branch, cluster, or the whole network** and sees only the data their role permits.

| Role | Primary responsibilities | Data scope |
|------|--------------------------|------------|
| **Sales Advisor** | Raise collection requests for sales (against invoice); attach documents; track and correct own requests. | Own branch (own requests) |
| **Service Advisor** | Same as Sales Advisor, for service collections (against job card). | Own branch (own requests) |
| **Cashier** | Verify requests; accept/reject; collect payment; issue receipts; record expenses & deposits; perform end-of-day closing. | Own branch (own drawer) |
| **Works Manager** | First-level (L1) approval of cash closings; approve/reject expenses within limits; monitor branch operations. | Own branch |
| **Branch Accountant** | Second-level (L2) verification of physical cash & finalisation of closing; verify deposits; record accounting to Tally. | Own branch |
| **Cluster Finance** | Oversight across branches in a cluster; monitor exceptions; drive reconciliation. | Cluster (many branches) |
| **Corporate Finance** | Network-wide oversight, consolidated reporting, policy monitoring, accounting completeness. | All branches |
| **Internal Audit** | Independent, read-only review of controls, audit trail, and compliance. | All branches (read-only) |
| **CFO / Admin** | System ownership; manage masters, users, roles, and configuration; corporate oversight. | All branches |

**Universal control (maker-checker):** the user who creates or initiates a transaction can **never** approve their own transaction.

### 7.1 Role × Module Permission Overview

Legend: **C** Create · **R** Read · **U** Update · **A** Approve/Verify · **X** Export/Admin · `—` No access.

| Module | Advisor | Cashier | Works Manager | Branch Accountant | Cluster / Corporate Finance | Internal Audit | CFO / Admin |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Master Data & Users | — | — | — | — | — | R | C R U X |
| Collection Request | C R U (own) | R U (verify) | R | R | R | R | R |
| Receipt | R (own) | C R | R | R | R | R | R |
| Cash Closing | — | C R U | **A** (L1) | **A** (L2) | R | R | R |
| Cash Expense | — | C R | **A** | A / R | R | R | R |
| Bank Deposit | — | C R | R | **A** (verify) | R | R | R |
| Accounting | — | — | R | **C R U A** | R | R | R |
| Dashboards & Reports | R (own) | R (branch) | R X (branch) | R X (branch) | R X (cluster/corp) | R X (all) | R X (all) |
| Audit Log | — | — | R (branch) | R (branch) | R (cluster/corp) | **R (full)** | R (all) |

---

## 8. End-to-End Business Workflow

The complete cash lifecycle, from the customer's payment to Tally accounting:

1. **Advisor** initiates a collection request with the customer's details, the reference document (invoice for sales, job card for service), the amount, the expected payment mode, and **mandatory supporting documents**.
2. The customer approaches the **cashier**, who **verifies** the request and documents.
3. If details are incorrect, the cashier **rejects with remarks** and the request returns to the advisor for correction; otherwise the cashier **accepts**.
4. Payment is **collected and verified** — cash (with denomination breakdown), online (with transaction reference), or a mix (which must total the amount).
5. The system generates an **official, uniquely numbered receipt** (printable / PDF), which cannot be edited afterwards.
6. During the day, **cash expenses** and **bank deposits** are recorded (each with the required approvals and documents).
7. At day-end, the **cashier performs cash closing** — the system computes expected cash and the cashier enters the physical count; any variance requires a mandatory reason.
8. The **Works Manager approves** the closing (or rejects it back for correction).
9. The **Branch Accountant verifies physical cash and transactions** and finalises the closing; the day is then **locked** and becomes the next day's opening balance.
10. Cash is **deposited** at the bank or handed to a **pickup agency**, with the slip and acknowledgement uploaded and verified.
11. **Accounting** is completed by recording the **Tally voucher** details and marking the record **reconciled**.

> Every step notifies the relevant user in-app and is recorded in an immutable audit trail.

---

## 9. Functional Requirements

Requirements are grouped by functional module. Each is atomic and testable. Priority uses MoSCoW: **Must**, **Should**, **Could**.

### 9.1 Master Data Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-MDM-01 | Maintain a **Branch** master (code, name, cluster, state, type: Sales/Service/Both, status). | Must |
| FR-MDM-02 | Maintain an **Employee/User** master with role assignment and branch mapping. | Must |
| FR-MDM-03 | Maintain a **Customer** master (name, contact, identifiers), reusable across requests. | Must |
| FR-MDM-04 | Maintain an **Expense Head** master for expense categorisation. | Should |
| FR-MDM-05 | Maintain **Bank Account / deposit destination** and **Pickup Agency** masters. | Should |
| FR-MDM-06 | Maintain a **Ledger** master for accounting mapping to Tally. | Should |
| FR-MDM-07 | Manage master data via an **Admin Masters** screen restricted to authorised roles. | Must |
| FR-MDM-08 | Support activate/deactivate for master records (no physical delete — see BR-05). | Must |

### 9.2 Collection Request

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CR-01 | An Advisor (Sales/Service) shall initiate a **collection request** capturing customer details. | Must |
| FR-CR-02 | Capture the reference document: **invoice number (Sales)** or **job card number (Service)**. | Must |
| FR-CR-03 | Capture the **amount** to be collected. | Must |
| FR-CR-04 | Capture the **expected payment mode** (cash / online / mixed). | Must |
| FR-CR-05 | Require **mandatory document upload** before submission. | Must |
| FR-CR-06 | Generate a **unique Request ID** for every request. | Must |
| FR-CR-07 | Provide **status tracking** through the request lifecycle. | Must |
| FR-CR-08 | Allow an advisor to view the status/queue of their own requests. | Should |

### 9.3 Cashier Verification

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CV-01 | **Search** for a request (by Request ID, customer, invoice/job card). | Must |
| FR-CV-02 | **Verify** submitted documents against the request. | Must |
| FR-CV-03 | **Reject** a request with mandatory remarks, returning it to the advisor. | Must |
| FR-CV-04 | **Accept** a request and proceed to collect payment. | Must |
| FR-CV-05 | For cash payments, **capture denomination** details. | Must |
| FR-CV-06 | For online payments, **capture the transaction reference**. | Must |
| FR-CV-07 | **Verify** the collected payment total before receipt generation. | Must |
| FR-CV-08 | A rejected request shall be **editable and resubmittable** by the advisor. | Must |

### 9.4 Receipt Generation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-RCPT-01 | **Generate an official receipt** upon accepted and verified payment. | Must |
| FR-RCPT-02 | Each receipt shall have a **unique, sequential, non-editable number** (see BR-08). | Must |
| FR-RCPT-03 | Record amount, mode, reference, customer, cashier, branch, and date/time. | Must |
| FR-RCPT-04 | The receipt shall be **printable / downloadable (PDF)**. | Should |
| FR-RCPT-05 | A generated receipt shall be **immutable**; corrections require a controlled cancellation/reversal. | Should |

### 9.5 Cash Closing & Approval

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CLS-01 | The Cashier shall perform **end-of-day cash closing** for their cash point. | Must |
| FR-CLS-02 | Record **opening cash**. | Must |
| FR-CLS-03 | Aggregate **cash collections** for the period. | Must |
| FR-CLS-04 | Aggregate **online collections** for the period. | Must |
| FR-CLS-05 | Subtract **expenses** for the period. | Must |
| FR-CLS-06 | Subtract **deposits** for the period. | Must |
| FR-CLS-07 | Compute **expected closing cash** = opening + cash collections − expenses − deposits. | Must |
| FR-CLS-08 | Capture the **physical (actual) cash** counted. | Must |
| FR-CLS-09 | Compute **variance** = physical − expected. | Must |
| FR-CLS-10 | Where variance ≠ 0, require a **mandatory variance reason**. | Must |
| FR-CLS-11 | Submitting a closing shall route it into the approval workflow. | Must |
| FR-CLS-12 | The closing approval chain shall be **Cashier → Works Manager → Branch Accountant → Closed**. | Must |
| FR-CLS-13 | The **Works Manager** shall approve/reject the closing (with remarks). | Must |
| FR-CLS-14 | The **Branch Accountant** shall verify physical cash & transactions and finalise the closing. | Must |

### 9.6 Cash Expense

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-EXP-01 | Record a **cash expense** with a **voucher number**. | Must |
| FR-EXP-02 | Capture the **expense head** (category). | Must |
| FR-EXP-03 | Capture the **amount**. | Must |
| FR-EXP-04 | Capture the **approver**. | Must |
| FR-EXP-05 | Support an **attachment** (bill/voucher image). | Must |
| FR-EXP-06 | An **approved** expense shall **automatically reduce the cash balance**. | Must |
| FR-EXP-07 | Expenses shall be **subject to approval** before affecting the cash balance. | Must |

### 9.7 Bank Deposit

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DEP-01 | Record a **bank deposit** as a **direct deposit** or via a **pickup agency**. | Must |
| FR-DEP-02 | **Upload the deposit slip.** | Must |
| FR-DEP-03 | **Upload the bank/agency acknowledgement.** | Must |
| FR-DEP-04 | Support **deposit verification** by an authorised role. | Must |
| FR-DEP-05 | Record amount, date, bank/agency, and reference. | Must |
| FR-DEP-06 | A verified deposit shall reduce cash-in-hand and feed the cash closing. | Must |

### 9.8 Accounting Update

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ACC-01 | Record the **Tally voucher number**. | Must |
| FR-ACC-02 | Capture the **voucher date**. | Must |
| FR-ACC-03 | Capture the **posting date**. | Must |
| FR-ACC-04 | Capture the **ledger** used for the entry. | Must |
| FR-ACC-05 | Maintain an **accounting status** (Pending / Posted / Reconciled). | Must |
| FR-ACC-06 | Support reconciliation of records against Tally (manual now; API in future). | Should |

### 9.9 Dashboards

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DASH-01 | Provide a **Branch dashboard** (branch-scoped KPIs). | Must |
| FR-DASH-02 | Provide a **State/Cluster dashboard** (aggregated across branches). | Must |
| FR-DASH-03 | Provide a **Corporate dashboard** (network-wide KPIs). | Must |
| FR-DASH-04 | Provide **trend analysis** views. | Should |
| FR-DASH-05 | Provide an **Exception dashboard** (variances, pending items, overdue deposits). | Must |
| FR-DASH-06 | Dashboards shall reflect **near real-time** data. | Should |

### 9.10 Reports
See **Section 12** for the report catalogue. Requirements `FR-RPT-01 … FR-RPT-10`.

### 9.11 Notifications

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NOTIF-01 | Notify relevant users of **rejected requests**. | Must |
| FR-NOTIF-02 | Notify approvers of **pending approvals**. | Must |
| FR-NOTIF-03 | Notify relevant users of **pending closings**. | Must |
| FR-NOTIF-04 | Notify relevant users of **pending deposits**. | Must |
| FR-NOTIF-05 | Notify relevant users of **accounting pending**. | Must |
| FR-NOTIF-06 | Notifications shall be delivered **in-app** at minimum (email/WhatsApp are future). | Should |

### 9.12 Security, Access Control & Audit

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AUTH-01 | Authenticate users via secure **login**. | Must |
| FR-AUTH-02 | Enforce **role-based access control (RBAC)**. | Must |
| FR-AUTH-03 | Enforce **branch/cluster/state data scoping** so users see only permitted data. | Must |
| FR-AUTH-04 | Maintain a complete, immutable **audit trail** of all significant actions. | Must |
| FR-AUTH-05 | Enforce **maker-checker** separation of duties on approvals. | Must |
| FR-AUTH-06 | Maintain **document version history** for uploaded documents. | Must |
| FR-AUTH-07 | Support **soft delete only** (no physical delete) for business records. | Must |

---

## 10. Business Rules

| ID | Business Rule |
|----|---------------|
| BR-01 | A collection request cannot proceed to payment without all **mandatory documents** uploaded. |
| BR-02 | The **closing approval chain is fixed**: Cashier → Works Manager → Branch Accountant → Closed. No step may be skipped. |
| BR-03 | **Maker ≠ Checker** — the user who creates a transaction cannot approve their own transaction. |
| BR-04 | A cash closing with a **non-zero variance requires a mandatory reason** before submission. |
| BR-05 | **No physical deletion** of business records; records are archived/cancelled with a reason and retained. |
| BR-06 | An **approved expense automatically reduces the cash balance**. |
| BR-07 | A **deposit** must have both a **slip and an acknowledgement** to be marked verified. |
| BR-08 | **Receipt numbers** are unique, sequential per branch/series, and non-editable once issued. |
| BR-09 | A **rejected request** returns to the advisor with mandatory remarks and re-enters the workflow on correction. |
| BR-10 | Expected closing cash = **Opening + Cash Collections − Expenses − Deposits** (online collections do not affect physical cash). |
| BR-11 | A record's **accounting status** must reach a terminal state (Posted/Reconciled) for the transaction to be complete. |
| BR-12 | Users may only act on data **within their assigned branch/cluster/state scope**. |
| BR-13 | Every uploaded document change is **versioned**; prior versions are retained. |
| BR-14 | **Online collections** are reconciled against the online reference and do not enter the physical cash count. |

---

## 11. Non-Functional Requirements

| ID | Category | Requirement | Priority |
|----|----------|-------------|----------|
| NFR-AVAIL-01 | Availability | Provide **≥ 99.5% availability**. | Must |
| NFR-USE-01 | Usability | UI shall be **responsive** and usable on web and mobile browsers. | Must |
| NFR-USE-02 | Usability | Core workflows completable on a mobile device. | Should |
| NFR-SEC-01 | Security | Enforce **role-based security** and least-privilege access. | Must |
| NFR-SEC-02 | Security | Data in transit over **TLS 1.2+**; sensitive data at rest encrypted. | Must |
| NFR-PERF-01 | Performance | Search results within **≤ 2 seconds** for typical datasets. | Must |
| NFR-PERF-02 | Performance | Standard list/read screens load within **≤ 3 seconds** (P95). | Should |
| NFR-SCAL-01 | Scalability | **Scale to all branches** (multi-branch, multi-cluster, multi-state). | Must |
| NFR-AUDIT-01 | Auditability | Log all state-changing actions with actor, timestamp, before/after values. | Must |
| NFR-COMPAT-01 | Compatibility | Support current versions of Chrome, Edge, Safari, Firefox. | Should |
| NFR-MAINT-01 | Maintainability | Modular, maintainable architecture. | Must |
| NFR-LOCAL-01 | Localisation | Currency in **INR (₹)**; dates **DD-MM-YYYY**; timezone **IST**. | Should |
| NFR-BACKUP-01 | Recoverability | Automated daily backups; **RPO ≤ 24h, RTO ≤ 4h**. | Should |
| NFR-RETAIN-01 | Data Retention | Financial & audit records retained **≥ 8 years** (subject to confirmation). | Should |

---

## 12. Reports & Dashboards

### 12.1 Reports
All reports support **filtering** (branch, date range, status) and **export** (PDF / Excel) — `FR-RPT-10`.

| ID | Report | Purpose (business question answered) |
|----|--------|--------------------------------------|
| FR-RPT-01 | **Daily Cash Book** | What happened to cash at this branch today? |
| FR-RPT-02 | **Collection Register** | What did we collect, from whom, and how? |
| FR-RPT-03 | **Expense Register** | What was spent, under which head, approved by whom? |
| FR-RPT-04 | **Deposit Register** | What has been deposited to the bank? |
| FR-RPT-05 | **Pending Deposits** | What cash is still to be deposited or acknowledged? |
| FR-RPT-06 | **Pending Closings** | Which branches have not closed their day? |
| FR-RPT-07 | **Cash Difference** | Where are the variances, and why? |
| FR-RPT-08 | **Accounting Pending** | What still needs to be posted to Tally? |
| FR-RPT-09 | **Compliance** | Is the audit trail complete and are controls being followed? |

### 12.2 Dashboards

| Dashboard | Scope |
|-----------|-------|
| Branch dashboard | Cash status and KPIs for a single branch. |
| State / Cluster dashboard | Rolled up across a group of branches. |
| Corporate dashboard | The whole network at a glance. |
| Exception dashboard | Variances, pending items, and overdue deposits in one place. |
| Trend views | Collections and cash movement over time. |

---

## 13. Data Entities (High-Level)

The system maintains, at minimum, the following business entities (detailed data design is produced during solution design):

Branch · Employee/User · Customer · Collection Request · Receipt · Cash Expense · Bank Deposit · Cash Closing (with Approval trail) · Accounting Status · Master data (Expense Head, Bank, Pickup Agency, Ledger) · Document Attachment (versioned) · Audit Log.

---

## 14. Assumptions

| ID | Assumption |
|----|------------|
| AS-01 | "Online collections" means card/UPI/net-banking captured with a transaction reference — **not** a payment-gateway integration in this release. |
| AS-02 | One "cash point" ≈ one cashier per branch per day; multi-cashier branches are supported by design, with a single closing per cashier per day as the base case. |
| AS-03 | Tally integration in this release is **manual entry** of voucher details (no live API). |
| AS-04 | Notifications in this release are **in-app**; email/WhatsApp are deferred. |
| AS-05 | The organisational hierarchy is **Branch → Cluster → State → Corporate**. |
| AS-06 | Document uploads are images/PDFs, stored securely and **versioned**. |
| AS-07 | BCMS references invoices and job cards from existing systems; it does not generate them. |

---

## 15. Constraints

| ID | Constraint |
|----|------------|
| CON-01 | Delivered as a **responsive web application** accessed through the browser. |
| CON-02 | **Tally** remains the accounting system of record; reports must reconcile to Tally. A direct Tally API is a **future** enhancement. |
| CON-03 | Bank API, WhatsApp notifications, BI analytics, and OCR are **out of scope** for this release. |
| CON-04 | The solution is built on **Odoo 19 Community Edition** (open-source; no per-user licence fees) as a single custom application, **self-hosted** by/for PMPL. No Odoo Enterprise licensing is required. |
| CON-05 | Currency is **INR**; operations are **India-based** (statutory, timezone, language). |
| CON-06 | The system must operate across a **multi-branch, multi-cluster, multi-state** hierarchy. |
| CON-07 | **Maker-checker** and **no-physical-delete** compliance postures apply throughout. |

---

## 16. Risks

| ID | Risk | Mitigation |
|----|------|-----------|
| RSK-01 | Requirement ambiguity leads to scope creep during build. | Sign-off on this BRD; resolve open points (Section 19) before build. |
| RSK-02 | Tally reconciliation expectations exceed manual-entry capability in this release. | Confirm manual-entry scope; plan Tally API for a later phase. |
| RSK-03 | Insufficient fraud control if maker-checker is not rigorously enforced. | Enforce maker-checker and no-delete in the system; audit trail on all actions. |
| RSK-04 | Low-connectivity branches may struggle with an online-only application. | Confirm connectivity; consider mitigations if offline operation is required. |
| RSK-05 | Adoption risk — staff reverting to manual registers. | Training, change management, and management reporting on adoption. |

---

## 17. Success & Acceptance Criteria

| ID | Criterion | Measure |
|----|-----------|---------|
| SC-01 | End-to-end workflow operates **without any manual register**. | 100% of in-scope cash transactions captured in BCMS. |
| SC-02 | **All approvals captured** digitally with maker-checker. | 100% of closings/expenses have a complete, auditable approval chain. |
| SC-03 | **Reports reconcile with Tally.** | Daily cash book and registers reconcile with zero unexplained differences. |
| SC-04 | **Complete audit trail** available. | Every state-changing action is traceable to actor + timestamp + before/after. |
| SC-05 | **Real-time dashboards** operational at branch/state/corporate levels. | Dashboards reflect data within the agreed freshness window. |
| SC-06 | System **adopted across all targeted branches**. | Rollout completion across the planned branches. |

---

## 18. Solution Approach & Delivery Phases

### 18.1 Approach
BCMS will be delivered as a **single custom application built on Odoo 19 Community Edition** — an established open-source business platform. This provides secure authentication, role-based access, document management, reporting, and a responsive web interface out of the box, keeping the build focused on PMPL's cash-management workflows. **Tally remains the accounting book of record.** The system is **self-hosted** for PMPL, with no Odoo Enterprise or per-user licence fees.

### 18.2 Recommended Delivery Phases

| Phase | Scope |
|-------|-------|
| Phase 1 | Master data & the collection workflow (request → verification → receipt). |
| Phase 2 | Cash closing, expenses, and deposits, with the maker-checker approval chain. |
| Phase 3 | Accounting status and the report suite. |
| Phase 4 | Dashboards and future integrations (Tally API, notifications channels, etc.). |

*Phasing is a delivery recommendation; sequencing and grouping will be confirmed during planning.*

---

## 19. Open Points / Clarifications Required

The following require confirmation from PMPL. None block a first-pass design, but each affects detailed scope.

| ID | Clarification | Priority |
|----|---------------|----------|
| CLR-01 | Scope of "online collections" — payment-gateway integration, or transaction-reference capture only? | High |
| CLR-02 | Tally integration for this release — manual voucher entry vs. live API. | High |
| CLR-03 | Expected data volumes — number of branches, users, and transactions/day. | High |
| CLR-04 | Receipt format and any statutory / GST requirements for official receipts. | High |
| CLR-05 | Approval thresholds/limits (e.g., expense approval by amount, variance escalation limits). | Medium |
| CLR-06 | Confirmation of the organisational hierarchy and data-scoping rules per role. | Medium |
| CLR-07 | Multi-cashier / multi-shift model per branch and closing granularity. | Medium |
| CLR-08 | Notification channels for this release (in-app only vs. email). | Low |
| CLR-09 | Data-retention and period-locking policies. | Medium |
| CLR-10 | Whether offline / low-connectivity operation is required for any branches. | Medium |
| CLR-11 | SLA, environments, and go-live acceptance. | Medium |
| CLR-12 | Whether single sign-on (corporate identity provider) is required. | Low |

---

## 20. Glossary

| Term | Meaning |
|------|---------|
| **BCMS** | Branch Cash Management System — the product described in this document. |
| **Maker-checker** | A control where the person who creates a transaction is not the person who approves it (four-eyes). |
| **Cash closing** | The end-of-day reconciliation of a cashier's drawer (expected vs physical cash). |
| **Variance** | The difference between physical cash counted and the expected cash. |
| **Collection request** | An advisor-raised request to collect a payment from a customer. |
| **Pickup agency** | A cash-in-transit agency that collects cash from a branch for deposit. |
| **Cluster** | A group of branches; part of the Branch → Cluster → State → Corporate hierarchy. |
| **Tally** | PMPL's accounting system and book of record. |
| **RBAC** | Role-Based Access Control. |
| **Audit trail** | An immutable log of who did what and when. |

---

## Appendix A — Screen List

Login · Dashboard · Collection Request · Cashier Queue · Receipt · Cash Closing · Approvals · Expenses · Deposits · Accounting · Reports · Admin Masters.

---

## Appendix B — Requirement Coverage Summary

| Category | Count |
|----------|-------|
| Business Objectives (BO) | 8 |
| Current-State Problems (BP) | 7 |
| Functional Requirements (FR) | 78 |
| Non-Functional Requirements (NFR) | 14 |
| Business Rules (BR) | 14 |
| Constraints (CON) | 7 |
| Assumptions (AS) | 7 (summary) |
| Risks (RSK) | 5 |
| Success Criteria (SC) | 6 |
| Clarifications (CLR) | 12 |

---

*End of Business Requirements Document — BCMS v2.0.*
