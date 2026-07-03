# User Roles, Permissions & Access Control

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` §5, §11, §16, §18
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

> Phase 5 deliverable. Defines every user role, its responsibilities, permissions, accessible modules, approval rights, restrictions, and the data scope it operates within. The role model drives RBAC and Row Level Security ([SecurityArchitecture.md](./SecurityArchitecture.md), [DatabaseDesign.md](./DatabaseDesign.md)).

---

## 1. Role Catalogue

The BRD (§5) names nine roles. Each is defined below with a machine `role_key` used in the database `role` enum and JWT claim.

| # | Role | `role_key` | Data Scope | Type |
|---|------|-----------|------------|------|
| 1 | Sales Advisor | `sales_advisor` | Own branch (own requests) | Operational (Maker) |
| 2 | Service Advisor | `service_advisor` | Own branch (own requests) | Operational (Maker) |
| 3 | Cashier | `cashier` | Own branch (own drawer) | Operational (Maker) |
| 4 | Works Manager | `works_manager` | Own branch | Approver (Checker L1) |
| 5 | Branch Accountant | `branch_accountant` | Own branch | Approver (Checker L2) / Finance |
| 6 | Cluster Finance | `cluster_finance` | Cluster (many branches) | Oversight / Finance |
| 7 | Corporate Finance | `corporate_finance` | All branches | Oversight / Finance |
| 8 | Internal Audit | `internal_audit` | All branches | Oversight (Read-only) |
| 9 | CFO / Admin | `cfo_admin` | All branches | Super-administrator |

**Data scope model** *(AS-04, AS-22)*: `Branch → Cluster → State → Corporate`. A user's JWT carries `role`, `branch_id`, `cluster_id`, `state_id`. RLS restricts row visibility to the user's scope. Corporate-level roles see all.

---

## 2. Role Definitions

### 2.1 Sales Advisor (`sales_advisor`)
- **Responsibilities:** Raise collection requests for vehicle sales (against Invoice), attach mandatory documents, track status, correct rejected requests.
- **Permissions:** Create/edit **own** collection requests (until accepted by cashier); upload documents; view own request status; view own receipts.
- **Accessible modules:** Collection Request, My Requests, Receipt (view), Notifications, Personal dashboard widgets.
- **Approval rights:** None.
- **Restrictions:** Cannot verify/accept payments, cannot generate receipts, cannot see other advisors' requests, cannot access finance/admin modules. **Branch-scoped.**

### 2.2 Service Advisor (`service_advisor`)
- **Responsibilities:** Same as Sales Advisor but for **Service** collections (against Job Card).
- **Permissions / Modules / Restrictions:** Identical to Sales Advisor, differing only in the vertical (`service`) and reference type (Job Card). **Branch-scoped.**

### 2.3 Cashier (`cashier`)
- **Responsibilities:** Search & verify requests; reject with remarks or accept; collect cash/online payment; capture denomination/online reference; generate receipts; record cash expenses (subject to approver); perform **end-of-day cash closing**; initiate bank deposits.
- **Permissions:** Read branch requests in the cashier queue; verify/reject/accept; create receipts; create expenses; create closing; create deposits; view own closing history.
- **Accessible modules:** Cashier Queue, Receipt, Cash Expense (entry), Bank Deposit (entry), Cash Closing (create/submit), Notifications, Branch dashboard (own drawer).
- **Approval rights:** None (is the **Maker** of closings/expenses/deposits).
- **Restrictions:** Cannot approve own closing/expense (**maker ≠ checker**, BR-03); cannot edit receipts once issued; cannot access masters/user admin; cannot see other branches. **Branch-scoped.**

### 2.4 Works Manager (`works_manager`)
- **Responsibilities:** First-level (**Checker L1**) approval of cash closings; approve/reject expenses within limits; monitor branch operations and exceptions.
- **Permissions:** Read all branch transactions; **approve/reject cash closing** (FR-CLS-13); approve/reject expenses; view branch reports & dashboard.
- **Accessible modules:** Approvals (closing/expense), Branch Dashboard, Reports (branch), Notifications, Collection/Receipt (read).
- **Approval rights:** ✅ Cash Closing (L1), ✅ Expense (within threshold — R-02).
- **Restrictions:** Cannot perform Branch Accountant's physical-cash verification/finalisation; cannot approve a closing they created; **branch-scoped**.

### 2.5 Branch Accountant (`branch_accountant`)
- **Responsibilities:** **Checker L2** — verify physical cash & transactions and finalise closing; verify bank deposits; record accounting (Tally voucher, ledger, status); own branch reconciliation.
- **Permissions:** Read all branch transactions; **verify & finalise closing** (FR-CLS-14); **verify deposits** (FR-DEP-04); **record accounting** (FR-ACC-*); run branch reports.
- **Accessible modules:** Approvals (closing finalisation), Deposits (verify), Accounting, Reports (branch), Branch Dashboard, Notifications.
- **Approval rights:** ✅ Cash Closing (L2 finalise), ✅ Deposit verification, ✅ Accounting posting.
- **Restrictions:** Cannot approve a closing they initiated; cannot manage users/masters (unless also granted admin); **branch-scoped**.

### 2.6 Cluster Finance (`cluster_finance`)
- **Responsibilities:** Oversight across all branches in a cluster; monitor exceptions, pending deposits/closings/accounting; drive reconciliation; escalate.
- **Permissions:** **Read** all data within cluster; run all reports (cluster-scoped); view state/cluster dashboards; add review comments; (optionally) act as escalation approver for high-value items (R-02).
- **Accessible modules:** Dashboards (cluster/state), Reports (cluster), Exception dashboard, Notifications; read access to all transaction modules.
- **Approval rights:** Optional high-value/escalation approvals (config, R-02); otherwise none.
- **Restrictions:** No master/user admin; **cluster-scoped** (cannot see other clusters).

### 2.7 Corporate Finance (`corporate_finance`)
- **Responsibilities:** Network-wide financial oversight, consolidated reporting, policy monitoring, accounting completeness, Tally reconciliation governance.
- **Permissions:** **Read** all data across all branches; all reports & dashboards (corporate); export; escalation approvals (config).
- **Accessible modules:** Corporate Dashboard, all Reports, Exception dashboard, read access to all transaction modules, Notifications.
- **Approval rights:** Optional top-tier escalation approvals; otherwise oversight only.
- **Restrictions:** No user/master admin unless also `cfo_admin`; **corporate-scoped read**.

### 2.8 Internal Audit (`internal_audit`)
- **Responsibilities:** Independent verification of controls, audit-trail review, compliance testing.
- **Permissions:** **Read-only** across all data **including audit logs and document version history**; run compliance report; export audit bundles.
- **Accessible modules:** Audit views, Compliance report, all Reports (read), all dashboards (read), audit log viewer.
- **Approval rights:** None.
- **Restrictions:** **Strictly read-only** — cannot create, edit, approve, or delete anything. Corporate-scoped read.

### 2.9 CFO / Admin (`cfo_admin`)
- **Responsibilities:** System ownership & governance; manage masters (branches, employees, users, expense heads, banks, ledgers); manage roles & access; corporate oversight; configure thresholds/policies.
- **Permissions:** Full administrative access — **master data CRUD (soft-delete)**, **user/role management**, configuration; read all transactions & dashboards; corporate reporting.
- **Accessible modules:** Admin Masters, User Management, Configuration, Corporate Dashboard, all Reports & dashboards.
- **Approval rights:** Highest-tier escalation approvals (config); can act as override approver where policy permits (logged).
- **Restrictions:** Even the admin **cannot physically delete** records (BR-05) and **cannot bypass maker-checker** for their own transactions (BR-03). All admin actions are audited.

---

## 3. Role × Module Permission Matrix

Legend: **C**=Create · **R**=Read · **U**=Update · **A**=Approve/Verify · **X**=Export/Admin · `—`=No access. Scope in parentheses applies to R.

| Module | Sales/Service Advisor | Cashier | Works Manager | Branch Accountant | Cluster Finance | Corporate Finance | Internal Audit | CFO/Admin |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Admin Masters | — | — | — | — | — | — | R | C R U X |
| User/Role Mgmt | — | — | — | — | — | — | R | C R U X |
| Collection Request | C R U *(own)* | R U(verify) *(branch)* | R *(branch)* | R *(branch)* | R *(cluster)* | R *(all)* | R *(all)* | R *(all)* |
| Cashier Verification | — | C R U | R | R | R | R | R | R |
| Receipt | R *(own)* | C R | R | R | R | R | R | R |
| Cash Closing | — | C R U(submit) | **A** (L1) | **A** (L2 finalise) | R | R | R | R (A override) |
| Cash Expense | — | C R | **A** | A/R | R | R | R | R (A override) |
| Bank Deposit | — | C R | R | **A** (verify) | R | R | R | R |
| Accounting Update | — | — | R | **C R U A** | R | R | R | R |
| Dashboards | R *(own)* | R *(branch)* | R *(branch)* | R *(branch)* | R *(cluster)* | R *(corp)* | R *(all)* | R *(all)* |
| Reports | R *(own)* | R *(branch)* | R X *(branch)* | R X *(branch)* | R X *(cluster)* | R X *(corp)* | R X *(all)* | R X *(all)* |
| Notifications | R *(own)* | R *(own)* | R *(own)* | R *(own)* | R *(own)* | R *(own)* | R *(own)* | R *(own)* |
| Audit Log | — | — | R *(branch)* | R *(branch)* | R *(cluster)* | R *(corp)* | **R (full)** | R *(all)* |

> The matrix is the source for RLS policy design. See [SecurityArchitecture.md](./SecurityArchitecture.md) §Authorization and the `authz.can(action, resource)` helper.

---

## 4. Approval Rights Summary (Maker-Checker)

| Transaction | Maker (creates) | Checker L1 (approve) | Checker L2 (finalise/verify) | Rule |
|-------------|-----------------|----------------------|------------------------------|------|
| Collection Request | Advisor | Cashier (accept/reject) | — | Reject → back to advisor (BR-09) |
| Cash Closing | Cashier | Works Manager | Branch Accountant (physical verify) | Fixed chain (BR-02) |
| Cash Expense | Cashier | Works Manager (approver) | — | Auto-reduce cash on approval (BR-06) |
| Bank Deposit | Cashier | Branch Accountant (verify) | — | Needs slip + acknowledgement (BR-07) |
| Accounting | Branch Accountant | — | — | Status transitions logged (BR-11) |

**Universal rule (BR-03):** the maker of a transaction can never be its checker. Enforced in the application layer and re-validated server-side (Edge Function / DB check).

---

## 5. Escalation & Delegation (Recommended — R-02, R-12)

> Not a BRD requirement; provided for governance completeness.

- **Amount-based escalation:** expenses/variances above configurable thresholds escalate from Works Manager → Cluster Finance → Corporate Finance → CFO. See [Workflows.md](./Workflows.md) §Escalation Flow.
- **Delegation:** a role holder may be temporarily delegated (e.g., Accountant on leave) via time-boxed grants, fully audited.
- **Segregation guardrails:** delegation can never place the same person as both maker and checker on one transaction.

---

## 6. Role-to-Requirement Traceability

| Role | Primary Requirement IDs |
|------|------------------------|
| Sales/Service Advisor | FR-CR-01…08, FR-RCPT-* (view), FR-NOTIF-01 |
| Cashier | FR-CV-*, FR-RCPT-*, FR-EXP-01…05, FR-DEP-01…03, FR-CLS-01…11 |
| Works Manager | FR-CLS-13, FR-EXP-07, FR-DASH-01/05, FR-RPT-* |
| Branch Accountant | FR-CLS-14, FR-DEP-04, FR-ACC-*, FR-RPT-* |
| Cluster Finance | FR-DASH-02, FR-RPT-*, FR-AUTH-03 |
| Corporate Finance | FR-DASH-03, FR-RPT-09, FR-ACC-06 |
| Internal Audit | FR-AUTH-04/06, FR-RPT-09 |
| CFO/Admin | FR-MDM-*, FR-AUTH-01…07, FR-DASH-03 |

---

*End of UserRoles.md*
