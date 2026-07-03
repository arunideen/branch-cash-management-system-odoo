# Risk Assessment & Register

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

> Identifies, rates, and plans mitigations for project, technical, security, operational, and business risks. Scoring: **Likelihood (L)** and **Impact (I)** each 1–5; **Score = L × I**; Severity: 1–6 Low, 8–12 Medium, 15–25 High.

---

## 1. Risk Matrix (heatmap)

```
Impact →      1(Low)   2      3      4      5(Critical)
Likelihood
5 (Very High)   5      10     15     20     25
4 (High)        4       8     12     16     20
3 (Medium)      3       6      9     12     15
2 (Low)         2       4      6      8     10
1 (Very Low)    1       2      3      4      5
```
Severity bands: **Low** ≤6 · **Medium** 8–12 · **High** ≥15.

---

## 2. Risk Register

### 2.1 Requirements & Scope

| ID | Risk | L | I | Score | Sev | Mitigation | Owner |
|----|------|---|---|-------|-----|-----------|-------|
| RSK-01 | BRD is high-level; ambiguity drives **scope creep**. | 4 | 4 | 16 | High | Assumptions register + clarifications (CLR-01…12) signed off before build; change control; MoSCoW scope baseline. | BA / PM |
| RSK-02 | **Tally reconciliation** expectation exceeds manual-entry capability in v1. | 3 | 4 | 12 | Med | Confirm CLR-02; deliver reconciliation report + clear manual process; plan Tally API for Phase 4. | BA / Tech Lead |
| RSK-06 | Unstated requirements (receipt/GST format, thresholds) surface late. | 3 | 3 | 9 | Med | Early discovery workshop; freeze receipt & approval rules in Phase 1. | BA |
| RSK-14 | **Online collection** scope misread (gateway vs. reference). | 3 | 3 | 9 | Med | Resolve CLR-01 up front; design so gateway can be added without rework. | BA / Tech Lead |

### 2.2 Technical & Architecture

| ID | Risk | L | I | Score | Sev | Mitigation | Owner |
|----|------|---|---|-------|-----|-----------|-------|
| RSK-03 | **RLS misconfiguration** leaks cross-branch data. | 3 | 5 | 15 | High | Deny-by-default policies; pgTAP + client-SDK RLS test suite; security review; index RLS columns. | Tech Lead |
| RSK-07 | **Maker-checker** bypass via API or admin. | 2 | 5 | 10 | Med | Enforce in 3 layers (app, Edge Function, DB trigger); negative tests; audit alerts. | Tech Lead |
| RSK-08 | **Money bugs** (rounding, duplicate receipts, wrong variance). | 3 | 5 | 15 | High | `numeric` money type, generated columns, idempotency keys, unit tests on financial math, reconciliation checks. | Tech Lead / QA |
| RSK-09 | **Performance** degrades at scale (search, dashboards). | 3 | 3 | 9 | Med | Indexes + `pg_trgm`, cursor pagination, materialised views, read replica, load testing. | Tech Lead |
| RSK-15 | Vendor lock-in / Supabase limits. | 2 | 3 | 6 | Low | Standard Postgres; portable schema; abstractions at data layer. | Architect |

### 2.3 Security & Compliance

| ID | Risk | L | I | Score | Sev | Mitigation | Owner |
|----|------|---|---|-------|-----|-----------|-------|
| RSK-04 | **Fraud / cash theft** if controls circumvented operationally. | 3 | 5 | 15 | High | Four-eyes enforcement, deposit tracking, variance escalation, immutable audit, anomaly review (R-23), access reviews. | CFO / Internal Audit |
| RSK-10 | Credential compromise / weak auth. | 2 | 5 | 10 | Med | MFA for finance/admin, rate-limiting, short token TTL, session hardening. | Tech Lead |
| RSK-11 | Data breach / privacy (DPDP). | 2 | 5 | 10 | Med | Encryption in transit/rest, least-data, signed URLs, India region, pen-test before go-live. | Security |
| RSK-16 | Audit-trail tampering. | 1 | 5 | 5 | Low | Append-only log, revoked delete grants, hash-chaining option. | Tech Lead |

### 2.4 Operational & Adoption

| ID | Risk | L | I | Score | Sev | Mitigation | Owner |
|----|------|---|---|-------|-----|-----------|-------|
| RSK-05 | **Low adoption** — staff revert to manual registers. | 3 | 4 | 12 | Med | Simple UX, mobile-first, training, phased rollout, management mandate, register retirement date. | PM / Change Mgmt |
| RSK-12 | **Connectivity** issues at remote branches (online-first). | 3 | 4 | 12 | Med | Confirm CLR-10; resilient UX, autosave/retry; PWA offline in Phase 4 (R-22) if needed. | Architect |
| RSK-13 | Data migration from legacy registers is messy/incomplete. | 3 | 3 | 9 | Med | Define opening balances cut-over; minimal migration; parallel run period. | BA / PM |
| RSK-17 | Insufficient training / support post go-live. | 2 | 3 | 6 | Low | Training plan, quick-reference guides, hypercare support window. | PM |

### 2.5 Project Delivery

| ID | Risk | L | I | Score | Sev | Mitigation | Owner |
|----|------|---|---|-------|-----|-----------|-------|
| RSK-18 | Timeline slip due to unclear requirements/dependencies. | 3 | 3 | 9 | Med | Phased delivery (Appendix B), buffers, weekly demos, early clarifications. | PM |
| RSK-19 | Key-person dependency. | 2 | 3 | 6 | Low | Documentation (this set), pairing, code review. | PM / Tech Lead |
| RSK-20 | Third-party (Phase 4 Tally/bank) integration uncertainty. | 3 | 3 | 9 | Med | Isolate behind adapters + outbox; defer to Phase 4; spike early. | Tech Lead |

---

## 3. Top Risks Summary (act first)

| Rank | ID | Risk | Score |
|------|----|------|-------|
| 1 | RSK-01 | Scope creep from BRD ambiguity | 16 |
| 2 | RSK-03 | RLS data-isolation failure | 15 |
| 2 | RSK-04 | Fraud / cash theft | 15 |
| 2 | RSK-08 | Financial calculation bugs | 15 |
| 5 | RSK-02 | Tally reconciliation gap | 12 |
| 5 | RSK-05 | Low adoption | 12 |
| 5 | RSK-12 | Branch connectivity | 12 |

---

## 4. Assumptions-Linked Risks

Each open clarification ([Assumptions.md](./Assumptions.md)) is itself a risk until resolved. Highest-leverage: **CLR-01** (online scope → RSK-14), **CLR-02** (Tally → RSK-02), **CLR-03** (volumes → RSK-09), **CLR-10** (offline → RSK-12).

---

## 5. Monitoring & Review

- Risks reviewed at each sprint/phase gate; scores updated; new risks logged.
- Security risks re-tested each release (RLS suite, negative authz tests, pen-test pre-go-live).
- Operational risks tracked via the Exception dashboard (variances, overdue deposits/closings) once live.

---

*End of RiskAssessment.md*
