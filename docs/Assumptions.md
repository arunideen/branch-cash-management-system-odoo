# Assumptions & Clarifications Register

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` v1.0
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

---

## Purpose

The BRD is deliberately concise and leaves several operational and technical details unspecified. Rather than silently deciding, this register makes every interpretation **explicit and reversible**. Each assumption states what we assumed, why, its impact if wrong, and the confidence level. Assumptions marked **⚠ Needs confirmation** should be validated before or during the discovery/kick-off phase.

**Legend — Confidence:** `High` (standard industry default, low risk) · `Medium` (reasonable but material) · `Low` (guess; must confirm).
**Legend — Impact if wrong:** effort/scope consequence of the assumption being incorrect.

---

## 1. Scope & Business Assumptions

| ID | Assumption | Rationale | Confidence | Impact if wrong |
|----|------------|-----------|------------|-----------------|
| AS-01 | **"Online collections"** means card / UPI / net-banking / cheque payments captured with a **transaction reference number**, entered manually by the Cashier — not a live payment-gateway integration in v1. | BRD §9 says "capture … online reference"; payment gateway not mentioned. Gateway is a natural future enhancement. | Medium | Medium — adds a gateway integration if wrong (CR/CV/RCPT). ⚠ Needs confirmation (CLR-01). |
| AS-02 | The system covers **cash and online receipts against Invoices (Sales) and Job Cards (Service)** only; it is **not** a full billing/DMS/POS system. Invoice/Job Card numbers are entered as references. | BRD scope §4 lists collections, not invoicing. | High | Medium — expands scope significantly if wrong. |
| AS-03 | **Tally integration in v1 is manual**: users key in Tally voucher number/date/ledger/status. A live Tally XML/HTTP API is a **Phase-4 future enhancement**. | BRD §3 "Integrate with Tally in **future**"; §21 lists "Tally API" under Future Enhancements. | High | High — live API is significant effort (CLR-02). |
| AS-04 | The organisational hierarchy is **Branch → Cluster → State → Corporate**. Dashboards and data scoping follow this hierarchy. | BRD §16 lists Branch/State/Corporate dashboards; §5 lists Cluster Finance. | Medium | Medium — RLS/scoping model changes (CLR-06). |
| AS-05 | Each branch is typed as **Sales**, **Service**, or **Both**; a single cash workflow serves both verticals with a vertical flag on the request. | BRD §2 "across Sales and Service"; §4 lists both. | High | Low. |
| AS-06 | **Customers are not system users.** They interact physically at the branch/cashier. No customer-facing portal in v1. | No customer login mentioned; §6 "Customer approaches cashier." | High | Medium — a portal is a large addition. |
| AS-07 | The **currency is INR (₹)** and all operations are within **India** (timezone IST, DD-MM-YYYY dates). | Prabal Motors is an Indian dealership; Tally usage. | High | Low. |
| AS-08 | **Cheques**, if accepted, are treated as a payment mode with a reference and are reconciled like online (do not enter physical cash count until cleared). | Common dealership practice; BRD silent. | Low | Medium ⚠. |

## 2. Cash Operations Assumptions

| ID | Assumption | Rationale | Confidence | Impact if wrong |
|----|------------|-----------|------------|-----------------|
| AS-09 | A **"cash point"** maps to **one Cashier per branch**. Multi-cashier branches are supported (each cashier closes their own drawer), but the base case is one closing per cashier per business day. | BRD §10 describes a single closing flow. | Medium | Medium — multi-drawer reconciliation adds complexity (CLR-07). |
| AS-10 | **Cash closing is performed once per business day** (end-of-day). Mid-day/shift closings are not required in v1 but the model does not preclude them. | BRD §6 "end-of-day cash closing." | Medium | Low. |
| AS-11 | **Denomination capture** is required for cash payments and for physical cash count at closing (₹500, ₹200, ₹100, ₹50, ₹20, ₹10, coins). | BRD §9 "Capture denomination"; §10 "Physical cash." | Medium | Low ⚠ (CLR — denomination rules). |
| AS-12 | **Expected closing cash = Opening + Cash Collections − Expenses − Deposits.** Online collections are tracked separately and **do not** affect the physical cash count. | BRD §10 line items; standard cash arithmetic. | High | Medium — formula correctness is core (BR-10). |
| AS-13 | **Variance tolerance is zero by default**; any non-zero variance requires a reason. A configurable tolerance threshold is a recommended enhancement. | BRD §10 "Variance reason." | Medium | Low. |
| AS-14 | **Opening cash** for a day equals the **verified closing physical cash** of the previous business day (carry-forward). | Standard cash-book behaviour; BRD lists "Opening cash." | High | Medium. |
| AS-15 | An **approved expense** immediately reduces the running cash balance and appears in that day's closing. | BRD §12 "Auto reduce cash balance." | High | Low. |

## 3. Approval, Roles & Security Assumptions

| ID | Assumption | Rationale | Confidence | Impact if wrong |
|----|------------|-----------|------------|-----------------|
| AS-16 | The **closing approval chain is fixed** (Cashier → Works Manager → Branch Accountant → Closed) and is **not** configurable in v1. | BRD §11 states the exact chain. | High | Low. |
| AS-17 | **Maker ≠ Checker** is enforced system-wide: a user cannot approve a transaction they created. | BRD §18 "Maker-checker." | High | Low. |
| AS-18 | **Expense approval** uses a single approver (the named "Approver"); approval thresholds by amount are **not** defined in v1 but are a recommended enhancement. | BRD §12 lists "Approver" only. | Medium | Medium ⚠ (CLR-05). |
| AS-19 | **Cluster Finance, Corporate Finance, Internal Audit, and CFO/Admin** are primarily **read/oversight** roles (dashboards, reports, audit) with limited or no transaction entry rights. Internal Audit is **read-only**. | BRD role names + §16 dashboard hierarchy. | Medium | Low. |
| AS-20 | **CFO/Admin** is the super-administrator with master-data and user-management rights. | "Admin" in role name; §Appendix A "Admin Masters." | High | Low. |
| AS-21 | Authentication is **email/password via Supabase Auth** with strong password policy and optional MFA (recommended). No corporate SSO in v1 unless requested. | BRD §18 "Role-based access"; stack directive uses Supabase. | Medium | Medium ⚠ (CLR-12). |
| AS-22 | **Row Level Security (RLS)** enforces branch/cluster/state data scoping using JWT app-metadata claims (role, branch_id, cluster_id, state_id). | Supabase best practice; BRD data-scoping intent. | High | Low. |

## 4. Technical & Data Assumptions

| ID | Assumption | Rationale | Confidence | Impact if wrong |
|----|------------|-----------|------------|-----------------|
| AS-23 | **Document uploads** (mandatory docs, deposit slips, acknowledgements, expense bills) are **images/PDF**, stored in **Supabase Storage** with **version history** (BR-13). Max size ~10 MB/file (configurable). | BRD §8, §13, §18; stack directive. | High | Low. |
| AS-24 | **Soft delete** is implemented via `deleted_at` / status columns; RLS hides soft-deleted rows from normal reads while retaining them for audit. | BRD §18 "No physical delete." | High | Low. |
| AS-25 | **Notifications in v1 are in-app** (Supabase Realtime + a notifications table). Email is a low-effort optional add; **WhatsApp is deferred** to Phase 4. | BRD §17 vs §21 (WhatsApp under Future). | High | Low. |
| AS-26 | **Reporting is operational** (transactional reports from Postgres). Advanced BI (Power BI / Zoho) is **deferred** to Phase 4. | BRD §21. | High | Low. |
| AS-27 | The application is **online-first** (SaaS). **Offline capability is not required** in v1; branches are assumed to have reliable connectivity. | BRD does not mention offline. | Low | High ⚠ — offline is a major architectural change (CLR-10). |
| AS-28 | **Data volumes** are moderate (assume ≤ a few hundred branches, low-thousands of transactions/day network-wide). Architecture scales well beyond this. | No figures in BRD. | Low | Medium ⚠ (CLR-03). |
| AS-29 | **Deployment**: frontend on **Vercel**, backend on **Supabase (managed, India/Singapore region)**. Single production environment plus staging/dev. | Stack directive. | Medium | Low. |
| AS-30 | **Receipt numbering** is unique & sequential **per branch and financial year** (e.g., `BR001/2026-27/000123`), non-editable once issued. GST/tax fields excluded unless the receipt is a tax document (to confirm). | Indian statutory practice; BRD silent. | Low | Medium ⚠ (CLR-04). |

---

## 5. Clarifications Required (Client Questions)

These mirror Requirements.md §12. Ordered by priority; each references the assumption(s) it would confirm or override.

### High Priority (block confident scoping)

1. **CLR-01 — Online collections scope.** Do you require a live **payment-gateway** integration (e.g., Razorpay/PayU) for online collections, or is capturing a **transaction reference** sufficient for v1? *(Confirms AS-01)*
2. **CLR-02 — Tally integration depth.** For v1, is **manual entry** of Tally voucher details acceptable, or is a **live Tally XML/HTTP API** required at launch? *(Confirms AS-03)*
3. **CLR-03 — Volumes & scale.** How many **branches, users, and daily transactions** should we design for (now and 3-year horizon)? *(Confirms AS-28)*
4. **CLR-04 — Receipt & compliance.** What is the required **official receipt format**? Is it a **GST tax document**? Any statutory numbering rules? *(Confirms AS-30)*

### Medium Priority

5. **CLR-05 — Approval thresholds.** Are there **amount-based approval limits** (e.g., expenses above ₹X need higher approval) or **variance escalation thresholds**? *(Refines AS-13, AS-18)*
6. **CLR-06 — Org hierarchy & scoping.** Confirm the hierarchy **Branch → Cluster → State → Corporate** and the exact **data-visibility rules per role**. *(Confirms AS-04, AS-22)*
7. **CLR-07 — Multi-cashier / shifts.** Do branches run **multiple cashiers or shifts** per day, and should closing be per-drawer, per-shift, or per-branch? *(Confirms AS-09, AS-10)*
8. **CLR-09 — Retention & period locking.** What are the **data-retention** requirements and should **closed accounting periods be locked**? *(Refines AS-24)*
9. **CLR-10 — Offline operation.** Do any branches need to operate **offline / with intermittent connectivity**? *(Confirms AS-27)*
10. **CLR-11 — SLA & environments.** Confirm target **SLA, support model, environments (dev/staging/prod)**, and go-live acceptance. *(For SOW)*

### Low Priority

11. **CLR-08 — Notification channels.** Is **in-app only** acceptable for v1, or is **email** required at launch? *(Confirms AS-25)*
12. **CLR-12 — SSO / IdP.** Do you require **corporate SSO / single sign-on** (e.g., Google Workspace, Azure AD), or is email/password sufficient? *(Confirms AS-21)*

---

## 6. Decision Log (to be maintained)

| Date | Clarification | Decision | Decided By | Updates Assumption |
|------|---------------|----------|------------|--------------------|
| _pending_ | CLR-01 | _awaiting client_ | | AS-01 |
| _pending_ | CLR-02 | _awaiting client_ | | AS-03 |
| … | … | … | | |

> As clarifications are answered, record the decision here and update the affected assumption and any dependent requirement/design document.

---

*End of Assumptions.md*
