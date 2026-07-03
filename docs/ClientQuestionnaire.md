# Client Clarification Questionnaire (CLR-01 – CLR-12)

**Project:** Branch Cash Management System (BCMS)
**Client:** Prabal Motors Private Limited (PMPL)
**Source:** `BRD_v1.0.docx` v1.0 · Open items from [Assumptions.md](./Assumptions.md) §5 and [Requirements.md](./Requirements.md) §12
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Awaiting Client Response

---

## How to use this form

The BRD is clear on *what* PMPL wants but leaves some operational and technical details open. To finalise scope, effort, and timeline, please answer the questions below. For each item:

- **✅ Tick one option** (or write under *Other*). Where a fill-in is needed, write on the dotted line.
- If you are unsure, leave it blank — we will proceed with the **"Our assumption if blank"** default and revisit later. Note that some defaults materially affect scope/cost (flagged **⚠ High-impact**).
- Questions are grouped **High → Medium → Low** priority. The **four High-priority answers gate the build**; please prioritise those.

**Respondent details**

| Field | Value |
|-------|-------|
| Name / Role | ............................................................ |
| Date | ............................ |
| Additional contributors | ............................................................ |

**Legend:** `☐` = choose · *Our assumption if blank* = what we build if unanswered · *Affects* = requirement/assumption impacted.

---

# Part A — High Priority (gate the build) 🔴

## CLR-01 — Online collections: gateway or reference capture? ⚠ High-impact
**Why we ask:** The BRD says "capture online reference" but does not say whether the system must *process* online payments. This decides whether we integrate a payment gateway.

**Q1.1 — In v1, how should the system handle online/non-cash collections?**
- ☐ **Capture a transaction reference only** — cashier keys in the UPI/card/net-banking reference; no gateway *(recommended for v1)*
- ☐ **Integrate a payment gateway** to initiate/verify online payments in-app (e.g., Razorpay / PayU / Paytm / Cashfree)
- ☐ **Reference now, gateway later** (phased)
- ☐ Other: ......................................................................

**Q1.2 — Which payment methods are in scope?** (tick all)
- ☐ Cash ☐ UPI ☐ Debit/Credit card (POS) ☐ Net-banking ☐ Cheque / DD ☐ Wallet ☐ Other: ...............

**Q1.3 — If gateway: preferred provider(s):** ......................................................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| Reference capture only, no gateway (AS-01) | FR-CV-06, FR-RCPT, scope, cost |

---

## CLR-02 — Tally integration depth in v1 ⚠ High-impact
**Why we ask:** BRD §3/§21 place "Tally API" under *future* enhancements, but §22 requires reports to reconcile with Tally. We need to confirm the v1 method.

**Q2.1 — For the initial release, how should accounting connect to Tally?**
- ☐ **Manual entry** in BCMS (voucher no/date/ledger/status) + reconciliation report *(recommended for v1)*
- ☐ **Live Tally integration** (XML/HTTP API) to auto-post vouchers / reconcile at launch
- ☐ Manual in v1, **live API in a later phase**
- ☐ Other: ......................................................................

**Q2.2 — Which Tally product & deployment?**
- ☐ TallyPrime ☐ Tally ERP 9 ☐ Other: ............... · Hosted: ☐ On-premise ☐ Cloud/TSS
**Q2.3 — Who owns Tally configuration/access for integration?** ...........................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| Manual entry in v1; live API is Phase 4 (AS-03) | FR-ACC, effort, timeline, cost |

---

## CLR-03 — Volumes & scale
**Why we ask:** No figures are in the BRD. These size the database, performance targets, and hosting.

Please provide best estimates (now / 12-month / 3-year):

| Metric | Current | 12 months | 3 years |
|--------|---------|-----------|---------|
| Branches | ......... | ......... | ......... |
| Clusters / States | ......... | ......... | ......... |
| Total users (all roles) | ......... | ......... | ......... |
| Collections per branch per **day** (avg / peak) | ......... | ......... | ......... |
| Cash expenses per branch per day | ......... | ......... | ......... |
| Bank deposits per branch per day | ......... | ......... | ......... |
| Documents per transaction (avg) & typical size | ......... | ......... | ......... |
| Peak concurrent users | ......... | ......... | ......... |

| Our assumption if blank | Affects |
|--------------------------|---------|
| ≤ a few hundred branches; low-thousands txns/day network-wide (AS-28) | Sizing, NFR-PERF/SCAL, cost |

---

## CLR-04 — Official receipt format & statutory rules ⚠ High-impact
**Why we ask:** Receipts are legal/financial documents; format and numbering rules must be exact.

**Q4.1 — The official receipt is:**
- ☐ A **GST tax document / tax invoice** ☐ A **payment acknowledgement receipt** ☐ **Depends on transaction type** (specify): ...............

**Q4.2 — Required numbering scheme:**
- ☐ Per branch + financial year (e.g., `BR001/2026-27/000123`) *(our default)* ☐ Other: ......................................................................

**Q4.3 — Statutory fields required on the receipt** (tick all that apply)
- ☐ GSTIN ☐ HSN/SAC ☐ Tax breakup (CGST/SGST/IGST) ☐ Place of supply ☐ Customer GSTIN ☐ Other: ...............

**Q4.4 — Print format & branding:**
- Size: ☐ A4 ☐ A5 ☐ Thermal · Language(s): ............... · Logo/letterhead to provide: ☐ Yes ☐ No

**Q4.5 — Allow controlled cancellation/reversal of a receipt (with reason, audited)?** ☐ Yes *(recommended)* ☐ No

| Our assumption if blank | Affects |
|--------------------------|---------|
| Acknowledgement receipt; per branch+FY numbering; no GST tax fields (AS-30) | FR-RCPT, compliance |

---

# Part B — Medium Priority 🟠

## CLR-05 — Approval thresholds & variance tolerance
**Why we ask:** The BRD names an "Approver" but no monetary limits; realistic governance usually has tiers.

**Q5.1 — Amount-based approval limits for cash expenses?**
- ☐ No — single approver regardless of amount *(BRD as-is)*
- ☐ Yes — tiers: Works Manager up to ₹............ · Cluster Finance up to ₹............ · Corporate/CFO above ₹............

**Q5.2 — Cash closing variance tolerance:**
- Allowed variance without escalation: ₹............ or ............% · Escalate variances above ₹............ to: ...............

**Q5.3 — Do deposits above a threshold need extra approval?** ☐ No ☐ Yes, above ₹............

| Our assumption if blank | Affects |
|--------------------------|---------|
| Single approver; zero variance tolerance; no deposit threshold (AS-13, AS-18) | Workflow rules, R-02 |

---

## CLR-06 — Organisation hierarchy & data visibility
**Q6.1 — Confirm the hierarchy:**
- ☐ **Branch → Cluster → State → Corporate** *(our assumption)* ☐ Other: ......................................................................

**Q6.2 — Can one user be attached to more than one branch/cluster?** ☐ No ☐ Yes (describe): ...............

**Q6.3 — Confirm default data visibility per role** (edit any exceptions):
- Advisors & Cashiers → own branch · Works Manager & Branch Accountant → own branch · Cluster Finance → their cluster · Corporate Finance / Internal Audit / CFO → all branches.
- Exceptions/changes: ......................................................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| Branch→Cluster→State→Corporate; scoping as above (AS-04, AS-22) | AUTH, RLS design |

---

## CLR-07 — Multiple cashiers / shifts per branch
**Q7.1 — Do branches operate more than one cashier per day?** ☐ No (one) ☐ Yes — typically ............ cashiers
**Q7.2 — Multiple shifts per day?** ☐ No ☐ Yes — ............ shifts
**Q7.3 — Cash closing should be done:**
- ☐ Per cashier/drawer per day *(our assumption)* ☐ Per shift ☐ One consolidated closing per branch per day ☐ Other: ...............
**Q7.4 — Who counts/verifies physical cash when there are multiple drawers?** ...........................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| One cashier & one closing per branch/day (AS-09, AS-10) | CLS module design |

---

## CLR-09 — Data retention, period locking & residency
**Q9.1 — Retention period for financial & audit records:** ☐ 8 years *(our default)* ☐ Other: ............ years
**Q9.2 — Lock closed accounting periods against backdated edits?** ☐ Yes *(recommended)* ☐ No
**Q9.3 — Archive old data to cold storage after a period?** ☐ Yes, after ............ ☐ No
**Q9.4 — Must data remain hosted in India?** ☐ Yes ☐ No preference ☐ Other: ...............

| Our assumption if blank | Affects |
|--------------------------|---------|
| 8-yr retention; period locking recommended; India region (AS-24, NFR-RETAIN-01) | Compliance, hosting |

---

## CLR-10 — Offline / low-connectivity operation ⚠ High-impact if "Yes"
**Q10.1 — Do any branches have unreliable or intermittent internet?** ☐ No — all reliably online *(our assumption)* ☐ Yes — approx ............ branches
**Q10.2 — Is offline capture with later sync required for v1?** ☐ No ☐ Yes (this is a Phase-4 PWA effort)
**Q10.3 — Primary devices used by staff:** ☐ Desktop ☐ Tablet ☐ Mobile (tick all)

| Our assumption if blank | Affects |
|--------------------------|---------|
| Online-first; no offline mode in v1 (AS-27) | Architecture (major if wrong) |

---

## CLR-11 — SLA, environments & go-live
**Q11.1 — Target availability:** ☐ 99.5% *(BRD)* ☐ Higher: ............%
**Q11.2 — Post-go-live support hours & response expectations:** ...........................................
**Q11.3 — Environments required:** ☐ Dev + Staging + Production *(our assumption)* ☐ Other: ...............
**Q11.4 — Who signs off go-live, and how will UAT be run (which pilot branches)?** ...........................................
**Q11.5 — Preferred hosting region:** ☐ India (Mumbai) ☐ Singapore ☐ No preference

| Our assumption if blank | Affects |
|--------------------------|---------|
| 99.5%; Dev/Staging/Prod; India-region; pilot-then-rollout (AS-29) | SOW, ProjectPlan |

---

# Part C — Lower Priority 🟢

## CLR-08 — Notification channels for v1
**Q8.1 — At launch, notifications should be:**
- ☐ **In-app only** *(our assumption)* ☐ In-app + **Email** ☐ In-app + Email + SMS/WhatsApp *(WhatsApp = future)*
**Q8.2 — Any events that must go by email at launch?** (e.g., rejected requests, pending approvals): ...........................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| In-app only in v1; WhatsApp/email later (AS-25) | NOTIF module |

---

## CLR-12 — Login method (SSO) & MFA
**Q12.1 — How should users log in?**
- ☐ **Email + password** (managed in-app) *(our assumption)*
- ☐ **Corporate SSO** → provider: ☐ Google Workspace ☐ Microsoft Entra ID (Azure AD) ☐ Other: ...............
**Q12.2 — Enforce multi-factor authentication (MFA) for finance/admin roles?** ☐ Yes *(recommended)* ☐ No
**Q12.3 — Any IT password-policy constraints we must follow?** ...........................................

| Our assumption if blank | Affects |
|--------------------------|---------|
| Email/password + MFA for finance/admin; no SSO (AS-21) | AUTH design |

---

# Summary Decision Sheet (for quick internal sign-off)

| CLR | Topic | Priority | Decision (short) | Owner | Date |
|-----|-------|----------|------------------|-------|------|
| 01 | Online collections | 🔴 High | ................................ | ......... | ......... |
| 02 | Tally integration | 🔴 High | ................................ | ......... | ......... |
| 03 | Volumes & scale | 🔴 High | ................................ | ......... | ......... |
| 04 | Receipt & compliance | 🔴 High | ................................ | ......... | ......... |
| 05 | Approval thresholds | 🟠 Med | ................................ | ......... | ......... |
| 06 | Org hierarchy & scoping | 🟠 Med | ................................ | ......... | ......... |
| 07 | Multi-cashier / shifts | 🟠 Med | ................................ | ......... | ......... |
| 08 | Notification channels | 🟢 Low | ................................ | ......... | ......... |
| 09 | Retention & residency | 🟠 Med | ................................ | ......... | ......... |
| 10 | Offline operation | 🟠 Med | ................................ | ......... | ......... |
| 11 | SLA & environments | 🟠 Med | ................................ | ......... | ......... |
| 12 | SSO & MFA | 🟢 Low | ................................ | ......... | ......... |

---

## Next steps

1. Please return this form (or the four High-priority answers first) to the delivery team.
2. Answers will be recorded in the **Decision Log** ([Assumptions.md](./Assumptions.md) §6), and any affected requirements/design docs updated.
3. Resolving CLR-01 to CLR-04 unblocks the finalised scope, effort estimate, and timeline in [SOW.md](./SOW.md) and [ProjectPlan.md](./ProjectPlan.md).

**Sign-off**

| Party | Name | Signature | Date |
|-------|------|-----------|------|
| PMPL (Product Owner) | ..................... | ..................... | ............ |
| Delivery Partner | ..................... | ..................... | ............ |

---

*End of ClientQuestionnaire.md*
