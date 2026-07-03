# User Stories & Acceptance Criteria

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` v1.0
**Platform:** Odoo 19 Community Edition — module `branch_cash_management`
**Version:** 2.0 · **Date:** 2026-07-03 · **Status:** Draft for Client Review

> Every functional module from the BRD has user stories with **Given/When/Then** acceptance criteria. Story IDs (`US-<MOD>-##`) map to Requirement IDs from [Requirements.md](./Requirements.md) and are traced in [TraceabilityMatrix.md](./TraceabilityMatrix.md). Format: *As a `<role>`, I want `<capability>`, so that `<benefit>`.*

**INVEST check:** stories are Independent, Negotiable, Valuable, Estimable, Small, Testable. **DoD** (Definition of Done) applies to all: code reviewed, unit+integration tested, record rules verified, audit-logged, responsive, accessible (AA), documented.

---

## Module: Master Data Management (MDM)

### US-MDM-01 — Manage branches
**As a** CFO/Admin, **I want** to create and maintain branch master records, **so that** all cash operations are attributed to a valid branch. *(FR-MDM-01)*
- **AC1** — *Given* I am `cfo_admin`, *when* I open Admin Masters → Branches, *then* I can create a branch with code, name, cluster, state, type (Sales/Service/Both), status.
- **AC2** — *Given* a branch code already exists, *when* I try to reuse it, *then* the system rejects it with a uniqueness error.
- **AC3** — *Given* a branch is referenced by transactions, *when* I deactivate it, *then* it is soft-deactivated (no physical delete) and hidden from new-transaction pickers but retained in history. *(BR-05)*

### US-MDM-02 — Manage users & roles
**As a** CFO/Admin, **I want** to create users and assign role + branch/cluster/state, **so that** access is correctly scoped. *(FR-MDM-02, FR-AUTH-02)*
- **AC1** — *Given* I create a user, *when* I assign a role group and branch/cluster/state, *then* their access reflects that scope (groups + record rules) on next login.
- **AC2** — *Given* a non-admin user, *when* they attempt to open User Management, *then* access is denied (menu hidden + `AccessError` server-side).
- **AC3** — Deactivating a user immediately blocks login while preserving their historical actions.

### US-MDM-03 — Manage supporting masters
**As a** CFO/Admin, **I want** to maintain Expense Heads, Banks/Deposit destinations, Pickup Agencies, and Ledgers, **so that** transactions reference standardised values. *(FR-MDM-04/05/06)*
- **AC1** — Each master supports create, edit, activate/deactivate with audit.
- **AC2** — Inactive master values do not appear in new-transaction dropdowns but remain on historical records.

---

## Module: Collection Request (CR)

### US-CR-01 — Raise a collection request
**As a** Sales/Service Advisor, **I want** to raise a collection request with customer, reference, amount, and mode, **so that** the cashier can collect payment. *(FR-CR-01…04, FR-CR-06)*
- **AC1** — *Given* mandatory fields (customer, invoice/job-card, amount, expected mode), *when* I submit, *then* a unique Request ID is generated and status = `Submitted`.
- **AC2** — *Given* a missing mandatory field, *when* I save, *then* Odoo field/constraint validation blocks the save and highlights the field.
- **AC3** — Amount must be > 0 and within allowed precision (2 decimals, INR).

### US-CR-02 — Attach mandatory documents
**As an** Advisor, **I want** to upload mandatory documents, **so that** the request is complete and verifiable. *(FR-CR-05, BR-01)*
- **AC1** — *Given* no document uploaded, *when* I submit, *then* submission is blocked with "mandatory document required."
- **AC2** — Accepted types: PDF/JPG/PNG ≤ 10 MB; invalid files are rejected with a clear message.
- **AC3** — Uploaded files are stored as Odoo attachments (`ir.attachment`) and versioned; replacing a file keeps prior versions. *(BR-13)*

### US-CR-03 — Track my requests
**As an** Advisor, **I want** to see the live status of my requests, **so that** I can act on rejections. *(FR-CR-07/08)*
- **AC1** — My Requests lists only my requests (record-rule branch+owner scope) with status badges (Submitted/Accepted/Rejected/Receipted).
- **AC2** — *Given* a request is rejected, *when* I open it, *then* I see the cashier's remarks and can correct & resubmit. *(BR-09)*

---

## Module: Cashier Verification (CV)

### US-CV-01 — Search the cashier queue
**As a** Cashier, **I want** to search and view pending requests, **so that** I can process customers quickly. *(FR-CV-01)*
- **AC1** — Search by Request ID, customer name/phone, invoice/job-card returns results in ≤ 2s. *(NFR-PERF-01)*
- **AC2** — Queue shows only my branch's actionable requests, default sorted oldest-first.

### US-CV-02 — Verify documents
**As a** Cashier, **I want** to review the request's documents, **so that** I can confirm validity before collecting. *(FR-CV-02)*
- **AC1** — I can preview each uploaded document inline.
- **AC2** — Verification checklist state is recorded on the request.

### US-CV-03 — Reject with remarks
**As a** Cashier, **I want** to reject an incorrect request with remarks, **so that** the advisor can fix it. *(FR-CV-03, BR-09)*
- **AC1** — *Given* I reject, *when* remarks are empty, *then* rejection is blocked (remarks mandatory).
- **AC2** — On reject, status = `Rejected`, advisor is notified *(FR-NOTIF-01)*, and the request returns to the advisor for correction.

### US-CV-04 — Accept & capture payment
**As a** Cashier, **I want** to accept a request and capture the payment, **so that** I can issue a receipt. *(FR-CV-04…07)*
- **AC1** — *Given* mode = cash, *when* I accept, *then* I must capture denomination breakdown totalling the amount. *(AS-11)*
- **AC2** — *Given* mode = online, *when* I accept, *then* I must capture a transaction reference (non-empty, unique per day). *(AS-01)*
- **AC3** — *Given* mixed mode, *then* cash + online components must sum to the total amount.
- **AC4** — On verified acceptance, status = `Accepted` and the receipt step is enabled.

---

## Module: Receipt Generation (RCPT)

### US-RCPT-01 — Generate official receipt
**As a** Cashier, **I want** the system to generate an official receipt, **so that** the customer has proof of payment. *(FR-RCPT-01…03, BR-08)*
- **AC1** — *Given* an accepted & verified payment, *when* I generate the receipt, *then* a unique, sequential, non-editable receipt number is issued (per branch + FY).
- **AC2** — Receipt records amount, mode, reference, customer, cashier, branch, timestamp.
- **AC3** — Attempting to edit a generated receipt is not permitted; only a controlled cancellation/reversal (with reason, audited) is allowed. *(FR-RCPT-05, BR-05)*

### US-RCPT-02 — Print / download receipt
**As a** Cashier/Advisor, **I want** to print or download the receipt as PDF, **so that** I can give it to the customer. *(FR-RCPT-04)*
- **AC1** — Receipt renders as A5/A4 printable PDF with branch header and receipt number.
- **AC2** — Re-downloading the same receipt returns the identical immutable document.

---

## Module: Cash Closing (CLS)

### US-CLS-01 — Perform end-of-day closing
**As a** Cashier, **I want** to close my drawer at end of day, **so that** cash is reconciled and handed off. *(FR-CLS-01…10)*
- **AC1** — Opening cash defaults to the previous day's verified closing physical cash. *(AS-14)*
- **AC2** — System aggregates cash collections, online collections, expenses, and deposits for the period.
- **AC3** — Expected closing cash = Opening + Cash Collections − Expenses − Deposits. *(BR-10)*
- **AC4** — *Given* I enter physical cash, *then* variance = physical − expected is computed and displayed.
- **AC5** — *Given* variance ≠ 0, *when* I submit, *then* a variance reason is mandatory. *(BR-04)*
- **AC6** — On submit, status = `Pending WM Approval` and the Works Manager is notified. *(FR-NOTIF-03)*

### US-CLS-02 — Works Manager approves closing
**As a** Works Manager, **I want** to approve/reject a submitted closing, **so that** branch cash is controlled. *(FR-CLS-13, BR-02, BR-03)*
- **AC1** — I cannot approve a closing I created (maker ≠ checker). *(BR-03)*
- **AC2** — *Given* I approve, *then* status = `Pending Accountant Verification` and the Branch Accountant is notified.
- **AC3** — *Given* I reject with remarks, *then* status = `Rejected` and returns to the cashier.

### US-CLS-03 — Accountant verifies & finalises
**As a** Branch Accountant, **I want** to verify physical cash and transactions and finalise the closing, **so that** the day is closed. *(FR-CLS-14, BR-02)*
- **AC1** — I see the full closing detail and the WM approval before finalising.
- **AC2** — On finalise, status = `Closed`, the day is locked (recommended R-03), and opening for next day is set.

---

## Module: Cash Expense (EXP)

### US-EXP-01 — Record a cash expense
**As a** Cashier, **I want** to record a cash expense with voucher and attachment, **so that** petty cash is accounted. *(FR-EXP-01…05)*
- **AC1** — Fields: voucher no (unique), expense head, amount (>0), approver, attachment.
- **AC2** — Voucher number uniqueness is enforced per branch + FY.
- **AC3** — Attachment (bill) upload follows the same file rules as CR documents.

### US-EXP-02 — Approve expense & reduce cash
**As a** Works Manager, **I want** to approve an expense, **so that** it reduces the cash balance correctly. *(FR-EXP-06/07, BR-06)*
- **AC1** — *Given* I approve, *then* the cash balance is automatically reduced by the amount and the expense feeds the day's closing.
- **AC2** — *Given* the amount exceeds my approval threshold (R-02, if configured), *then* it escalates rather than completing.
- **AC3** — I cannot approve an expense I created. *(BR-03)*

---

## Module: Bank Deposit (DEP)

### US-DEP-01 — Record a deposit
**As a** Cashier, **I want** to record a bank deposit (direct or via pickup agency), **so that** cash leaves the drawer with a trail. *(FR-DEP-01/02/05)*
- **AC1** — I choose deposit type (Direct / Pickup Agency); if pickup, I select the agency master.
- **AC2** — I upload the deposit slip; amount, date, and bank/destination are captured.
- **AC3** — Deposit reduces cash-in-hand and appears in closing. *(FR-DEP-06, BR-10)*

### US-DEP-02 — Upload acknowledgement & verify
**As a** Branch Accountant, **I want** to upload the bank acknowledgement and verify the deposit, **so that** deposits are confirmed. *(FR-DEP-03/04, BR-07)*
- **AC1** — *Given* both deposit slip and acknowledgement are present, *when* I verify, *then* status = `Verified`.
- **AC2** — *Given* acknowledgement is missing, *then* the deposit cannot be marked Verified and appears in Pending Deposits. *(FR-RPT-05)*

---

## Module: Accounting Update (ACC)

### US-ACC-01 — Record Tally accounting
**As a** Branch Accountant, **I want** to record Tally voucher details and status, **so that** the transaction is reconciled with accounts. *(FR-ACC-01…05)*
- **AC1** — Fields: Tally voucher number, voucher date, posting date, ledger, accounting status.
- **AC2** — Accounting status transitions (Pending → Posted → Reconciled) are logged with actor/time. *(BR-11)*
- **AC3** — Records missing accounting appear in the Accounting Pending report/notification. *(FR-RPT-08, FR-NOTIF-05)*

---

## Module: Dashboards (DASH)

### US-DASH-01 — Branch dashboard
**As a** Works Manager/Cashier, **I want** a branch dashboard, **so that** I can monitor my branch's cash position. *(FR-DASH-01/06)*
- **AC1** — Shows cash-in-hand, today's collections (cash/online), expenses, deposits, pending approvals, variance.
- **AC2** — Data reflects the agreed freshness window (near real-time via bus/refresh).

### US-DASH-02 — State/Corporate dashboards
**As** Cluster/Corporate Finance, **I want** aggregated dashboards, **so that** I can oversee many branches. *(FR-DASH-02/03)*
- **AC1** — Cluster user sees only their cluster; corporate sees all (record-rule-scoped).
- **AC2** — Drill-down from state → branch is supported.

### US-DASH-03 — Exception dashboard
**As** Finance/Management, **I want** an exception dashboard, **so that** I can act on problems first. *(FR-DASH-05)*
- **AC1** — Surfaces variances beyond tolerance, pending closings, pending deposits (overdue), accounting-pending.
- **AC2** — Each exception links to the underlying record.

---

## Module: Reports (RPT)

### US-RPT-01 — Run and export operational reports
**As** Finance/Management, **I want** the nine named reports with filters and export, **so that** I can reconcile and comply. *(FR-RPT-01…10, SC-03)*
- **AC1** — Reports available: Daily Cash Book, Collection Register, Expense Register, Deposit Register, Pending Deposits, Pending Closings, Cash Difference, Accounting Pending, Compliance.
- **AC2** — Each report supports filter by branch (within scope), date range, and status.
- **AC3** — Each report exports to PDF and Excel/CSV. *(R-07)*
- **AC4** — Daily Cash Book totals reconcile to the sum of receipts − expenses − deposits for the period. *(SC-03)*

---

## Module: Notifications (NOTIF)

### US-NOTIF-01 — Receive workflow notifications
**As a** user, **I want** in-app notifications for events relevant to my role, **so that** I act without polling. *(FR-NOTIF-01…06)*
- **AC1** — Triggers: rejected request (advisor), pending approval (approver), pending closing, pending deposit, accounting pending.
- **AC2** — Notifications are role- and scope-targeted (record rules) and delivered in near real-time via Odoo activities/chatter (bus).
- **AC3** — Users can mark as read; a badge shows unread count.

---

## Module: Authentication, Access & Audit (AUTH)

### US-AUTH-01 — Secure login
**As a** user, **I want** to log in securely, **so that** only authorised staff access the system. *(FR-AUTH-01)*
- **AC1** — Email/password via Odoo (`res.users`); failed attempts are rate-limited; passwords meet policy.
- **AC2** — 2FA (`auth_totp`) can be enforced for finance/admin roles (R-08).
- **AC3** — Sessions expire per policy; handled securely by Odoo.

### US-AUTH-02 — Enforce role & scope
**As** the business, **I want** RBAC + data scoping, **so that** users only see/do what's permitted. *(FR-AUTH-02/03, BR-12)*
- **AC1** — Every model access is governed by access rights + record rules using the user's scope; a user in Branch A cannot read Branch B data.
- **AC2** — Server-side checks re-validate maker ≠ checker on every approval. *(BR-03)*

### US-AUTH-03 — Complete audit trail
**As** Internal Audit, **I want** a complete, immutable audit trail, **so that** every action is accountable. *(FR-AUTH-04/06/07, SC-04)*
- **AC1** — Every create/update/approve/verify writes an audit record (actor, action, entity, before/after, timestamp).
- **AC2** — Records are never physically deleted; soft-delete is captured with reason. *(BR-05)*
- **AC3** — Document changes retain full version history. *(BR-13)*

---

## Coverage Check

| Module | Stories | Requirement IDs covered |
|--------|:------:|--------------------------|
| MDM | 3 | FR-MDM-01…08, FR-AUTH-02 |
| CR | 3 | FR-CR-01…08, BR-01 |
| CV | 4 | FR-CV-01…08 |
| RCPT | 2 | FR-RCPT-01…05 |
| CLS | 3 | FR-CLS-01…14 |
| EXP | 2 | FR-EXP-01…07 |
| DEP | 2 | FR-DEP-01…06 |
| ACC | 1 | FR-ACC-01…06 |
| DASH | 3 | FR-DASH-01…06 |
| RPT | 1 | FR-RPT-01…10 |
| NOTIF | 1 | FR-NOTIF-01…06 |
| AUTH | 3 | FR-AUTH-01…07 |

**Every module has ≥1 user story and every story has acceptance criteria.** Full mapping in [TraceabilityMatrix.md](./TraceabilityMatrix.md).

---

*End of UserStories.md*
