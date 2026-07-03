# Requirement Traceability Matrix (RTM)

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` v1.0
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

> Bidirectional traceability: **BRD section → Requirement ID → Module → User Story → Design (Workflow/UI/DB/API) → Security → Test**. This proves **100% of the BRD is addressed** and enables impact analysis for any change. IDs are defined in [Requirements.md](./Requirements.md).

**Legend for design refs:** WF=[Workflows.md](./Workflows.md) · UI=[UIUX.md](./UIUX.md) · DB=[DatabaseDesign.md](./DatabaseDesign.md) · API=[APIDesign.md](./APIDesign.md) · SEC=[SecurityArchitecture.md](./SecurityArchitecture.md) · US=[UserStories.md](./UserStories.md). Test IDs `TC-*` are defined in the Test Strategy (§4) and expanded during QA planning.

---

## 1. BRD Section → Coverage (completeness proof)

| BRD § | Topic | Requirement IDs | Where addressed |
|-------|-------|-----------------|-----------------|
| §1 | Document Control / Project Type | CON-01 | Requirements, PRD, SOW |
| §2 | Business Background | BO-02/03/06, BP-01…03 | Requirements §1–2, BusinessAnalysis |
| §3 | Objectives | BO-01/04/05/07 | Requirements §1, PRD §3 |
| §4 | Scope | Scope list → all FR modules | PRD §6, Requirements §4 |
| §5 | User Roles | SH-08…16 | UserRoles (all roles) |
| §6 | End-to-End Workflow | FR-CR/CV/RCPT/CLS/DEP/ACC | Workflows §1, WF diagrams |
| §7 | Functional Modules | FR-MDM…FR-RPT | Requirements §4, all module docs |
| §8 | Collection Request Screen | FR-CR-01…08 | Requirements 4.2, US-CR, UI §5.1 |
| §9 | Cashier Module | FR-CV-01…08, FR-RCPT | Requirements 4.3/4.4, US-CV, WF §3 |
| §10 | Cash Closing | FR-CLS-01…10 | Requirements 4.5, US-CLS, WF §5 |
| §11 | Approval Workflow | FR-CLS-12…14, BR-02/03 | UserRoles §4, WF §6 |
| §12 | Cash Expense | FR-EXP-01…07 | Requirements 4.6, US-EXP, WF §7 |
| §13 | Bank Deposit | FR-DEP-01…06 | Requirements 4.7, US-DEP, WF §8 |
| §14 | Accounting | FR-ACC-01…06 | Requirements 4.8, US-ACC, WF §9 |
| §15 | Reports | FR-RPT-01…10 | Requirements 4.10, US-RPT, DB §8 |
| §16 | Dashboards | FR-DASH-01…06 | Requirements 4.9, US-DASH, UI §6 |
| §17 | Notifications | FR-NOTIF-01…06 | Requirements 4.11, US-NOTIF, WF §11 |
| §18 | Security | FR-AUTH-01…07, BR-03/05/13 | SecurityArchitecture, DB §9 |
| §19 | Database Entities | (all entities) | DatabaseDesign §2, §4 |
| §20 | Non-Functional | NFR-* | Requirements §5, TechnicalArchitecture §11 |
| §21 | Future Enhancements | R-16…R-20 | BusinessAnalysis §6.3, PRD §15 |
| §22 | Acceptance Criteria | SC-01…06 | Requirements §10, PRD §17 |
| App. A | Screen List | UI screens 1–18 | UIUX §4 |
| App. B | Development Phases | P0–P4 | ProjectPlan §2, SOW §7 |

✅ **Every BRD section §1–§22 and Appendices A–B is mapped.**

---

## 2. Functional Requirement Traceability

| Req ID | Requirement (short) | Module | User Story | Workflow | UI | DB table | API | Test |
|--------|---------------------|--------|-----------|----------|----|----------|-----|------|
| FR-MDM-01 | Branch master | MDM | US-MDM-01 | — | Admin | `branch` | REST/admin | TC-MDM-01 |
| FR-MDM-02 | User/role master | MDM | US-MDM-02 | authz | Users | `app_user` | Auth+admin | TC-MDM-02 |
| FR-MDM-03 | Customer master | MDM | US-MDM-01 | CR | Admin | `customer` | REST | TC-MDM-03 |
| FR-MDM-04 | Expense head master | MDM | US-MDM-03 | EXP | Admin | `expense_head` | REST | TC-MDM-04 |
| FR-MDM-05 | Bank/agency master | MDM | US-MDM-03 | DEP | Admin | `bank_account`,`pickup_agency` | REST | TC-MDM-05 |
| FR-MDM-06 | Ledger master | MDM | US-MDM-03 | ACC | Admin | `ledger` | REST | TC-MDM-06 |
| FR-MDM-07 | Admin masters screen | MDM | US-MDM-01…03 | — | §4 #14 | masters | admin | TC-MDM-07 |
| FR-MDM-08 | Activate/deactivate (no delete) | MDM | US-MDM-01 | — | Admin | soft-delete | REST | TC-MDM-08 |
| FR-CR-01 | Create request | CR | US-CR-01 | WF §2 | §5 #3 | `collection_request` | POST /collection-requests | TC-CR-01 |
| FR-CR-02 | Invoice/Job Card ref | CR | US-CR-01 | WF §2 | §5 #3 | `collection_request` | " | TC-CR-02 |
| FR-CR-03 | Amount | CR | US-CR-01 | WF §2 | §5 #3 | `collection_request` | " | TC-CR-03 |
| FR-CR-04 | Expected mode | CR | US-CR-01 | WF §2 | §5 #3 | `collection_request` | " | TC-CR-04 |
| FR-CR-05 | Mandatory doc upload | CR | US-CR-02 | WF §12 | upload | `document` | Storage+link | TC-CR-05 |
| FR-CR-06 | Unique Request ID | CR | US-CR-01 | WF §4 | — | `fn_next_number` | EF | TC-CR-06 |
| FR-CR-07 | Status tracking | CR | US-CR-03 | request-state | My Requests | `collection_request.status` | REST | TC-CR-07 |
| FR-CR-08 | View own queue | CR | US-CR-03 | — | §5 #4 | RLS | REST | TC-CR-08 |
| FR-CV-01 | Search request | CV | US-CV-01 | WF §3 | §5.1 | trigram idx | REST/search | TC-CV-01 |
| FR-CV-02 | Verify documents | CV | US-CV-02 | WF §3 | §5.2 | `document` | signed URL | TC-CV-02 |
| FR-CV-03 | Reject w/ remarks | CV | US-CV-03 | WF §3 | §5.2 | status | POST …/reject | TC-CV-03 |
| FR-CV-04 | Accept payment | CV | US-CV-04 | WF §3 | §5.2 | status | POST …/accept | TC-CV-04 |
| FR-CV-05 | Capture denomination | CV | US-CV-04 | payment-tree | §5.2 | `payment_detail` | " | TC-CV-05 |
| FR-CV-06 | Capture online ref | CV | US-CV-04 | payment-tree | §5.2 | `payment_detail` | " | TC-CV-06 |
| FR-CV-07 | Verify payment | CV | US-CV-04 | WF §3 | §5.2 | — | " | TC-CV-07 |
| FR-CV-08 | Correction loop | CV | US-CR-03 | request-state | — | status | REST | TC-CV-08 |
| FR-RCPT-01 | Generate receipt | RCPT | US-RCPT-01 | WF §4 | §5 #7 | `receipt` | POST /receipts | TC-RCPT-01 |
| FR-RCPT-02 | Unique sequential no. | RCPT | US-RCPT-01 | WF §4 | — | `number_sequence` | EF | TC-RCPT-02 |
| FR-RCPT-03 | Receipt content | RCPT | US-RCPT-01 | WF §4 | §5 #7 | `receipt` | EF | TC-RCPT-03 |
| FR-RCPT-04 | Print/PDF | RCPT | US-RCPT-02 | — | §5 #7 | — | client | TC-RCPT-04 |
| FR-RCPT-05 | Immutable/cancel | RCPT | US-RCPT-01 | — | modal | `receipt.is_cancelled` | POST …/cancel | TC-RCPT-05 |
| FR-CLS-01…10 | Closing capture & math | CLS | US-CLS-01 | WF §5 | §5.3 | `cash_closing` | POST /closings | TC-CLS-01…10 |
| FR-CLS-11 | Submit → workflow | CLS | US-CLS-01 | closing-state | §5.3 | status | POST …/submit | TC-CLS-11 |
| FR-CLS-12 | Fixed chain | CLS | US-CLS-02/03 | WF §6 | — | `approval` | EF | TC-CLS-12 |
| FR-CLS-13 | WM approves | CLS | US-CLS-02 | approval-wf | §5.4 | `cash_closing` | POST …/approve | TC-CLS-13 |
| FR-CLS-14 | Accountant verifies | CLS | US-CLS-03 | approval-wf | §5.4 | `cash_closing` | POST …/finalise | TC-CLS-14 |
| FR-EXP-01…05 | Expense capture | EXP | US-EXP-01 | WF §7 | §5 #10 | `cash_expense` | POST /expenses | TC-EXP-01…05 |
| FR-EXP-06 | Auto-reduce cash | EXP | US-EXP-02 | WF §7 | — | trigger/EF | POST …/approve | TC-EXP-06 |
| FR-EXP-07 | Approval before effect | EXP | US-EXP-02 | WF §7 | §5 #9 | status | EF | TC-EXP-07 |
| FR-DEP-01…05 | Deposit capture | DEP | US-DEP-01 | WF §8 | §5 #11 | `bank_deposit` | POST /deposits | TC-DEP-01…05 |
| FR-DEP-04 | Verify deposit | DEP | US-DEP-02 | deposit-state | §5 #11 | status | POST …/verify | TC-DEP-04 |
| FR-DEP-06 | Reduce cash / feed closing | DEP | US-DEP-01 | WF §8 | — | closing agg | EF | TC-DEP-06 |
| FR-ACC-01…05 | Accounting fields/status | ACC | US-ACC-01 | WF §9 | §5 #12 | `accounting_status` | POST /accounting | TC-ACC-01…05 |
| FR-ACC-06 | Tally reconciliation | ACC | US-ACC-01 | accounting-flow | reports | views | REST | TC-ACC-06 |
| FR-DASH-01…06 | Dashboards | DASH | US-DASH-01…03 | data-flow | UI §6 | mat. views | Realtime/REST | TC-DASH-01…06 |
| FR-RPT-01…10 | Reports + export | RPT | US-RPT-01 | data-flow | §5.5 | views §8 | GET /reports | TC-RPT-01…10 |
| FR-NOTIF-01…06 | Notifications | NOTIF | US-NOTIF-01 | WF §11 | §9.9 | `notification` | Realtime/EF | TC-NOTIF-01…06 |
| FR-AUTH-01 | Login | AUTH | US-AUTH-01 | auth-flow | §5 #1 | `auth.users` | Auth | TC-AUTH-01 |
| FR-AUTH-02 | RBAC | AUTH | US-AUTH-02 | authz-flow | nav | RLS + claims | all | TC-AUTH-02 |
| FR-AUTH-03 | Data scoping | AUTH | US-AUTH-02 | authz-flow | scope switch | RLS | all | TC-AUTH-03 |
| FR-AUTH-04 | Audit trail | AUTH | US-AUTH-03 | — | §5 #16 | `audit_log` | trigger | TC-AUTH-04 |
| FR-AUTH-05 | Maker-checker | AUTH | US-CLS-02/03 | authz-flow | disabled btn | trigger/EF | EF | TC-AUTH-05 |
| FR-AUTH-06 | Doc versioning | AUTH | US-AUTH-03 | file-storage | upload | `document` | Storage | TC-AUTH-06 |
| FR-AUTH-07 | Soft delete only | AUTH | US-AUTH-03/US-MDM-01 | — | — | no DELETE grant | — | TC-AUTH-07 |

---

## 3. Non-Functional & Business-Rule Traceability

| ID | Requirement | Design ref | Test |
|----|-------------|-----------|------|
| NFR-AVAIL-01 | ≥99.5% availability | TechArch §7,§11; SOW §16 | TC-NFR-AVAIL |
| NFR-PERF-01 | Search ≤2s | DB indexes/pg_trgm; API §3.4 | TC-NFR-PERF-01 |
| NFR-PERF-02 | ≤3s P95 | TechArch §11 | TC-NFR-PERF-02 |
| NFR-SEC-01/02 | Role security, encryption | SecurityArch §3,§5 | TC-SEC-* |
| NFR-SCAL-01/02 | Scale to network | TechArch §11; DB partitioning-ready | TC-NFR-SCAL |
| NFR-USE-01/02 | Responsive/mobile | UIUX §7 | TC-NFR-USE |
| NFR-A11Y-01 | WCAG 2.1 AA | UIUX §8 | TC-NFR-A11Y |
| NFR-AUDIT-01 | Full audit | SecurityArch §10 | TC-AUTH-04 |
| BR-01 | Mandatory docs | WF §2; API MANDATORY_DOCUMENT_MISSING | TC-CR-05 |
| BR-02 | Fixed chain | WF §6 | TC-CLS-12 |
| BR-03 | Maker≠checker | SecurityArch §3.4; DB trigger | TC-AUTH-05 |
| BR-04 | Variance reason | DB trigger; WF §5 | TC-CLS-10 |
| BR-05 | No physical delete | DB §10; no DELETE grant | TC-AUTH-07 |
| BR-06 | Auto-reduce cash | WF §7; EF | TC-EXP-06 |
| BR-07 | Deposit slip+ack | WF §8; API ACKNOWLEDGEMENT_MISSING | TC-DEP-04 |
| BR-08 | Receipt numbering | DB `fn_next_number` | TC-RCPT-02 |
| BR-09 | Rejection loop | request-state | TC-CV-03 |
| BR-10 | Closing formula | DB generated column | TC-CLS-07 |
| BR-11 | Accounting completeness | accounting-flow state | TC-ACC-05 |
| BR-12 | Scope-limited access | RLS | TC-AUTH-03 |
| BR-13 | Document versioning | file-storage; `document` | TC-AUTH-06 |
| BR-14 | Online reconciliation | payment-tree | TC-CV-06 |

---

## 4. Test Strategy Summary (referenced by TC-* IDs)

Full test design is produced in QA planning; this summary satisfies the Phase 13 strategy requirement and anchors the TC-* IDs above.

| Level | Scope | Tooling | Example |
|-------|-------|---------|---------|
| **Unit** | Domain logic: closing math (BR-10), variance, numbering, validation | Vitest/Jest | expected_cash = opening+coll−exp−dep |
| **Component** | React components, forms (RHF+Zod) | Testing Library | denomination total = amount |
| **Integration** | Edge Functions + DB (txn, idempotency) | Supabase test project | receipt idempotency; expense auto-reduce |
| **DB / RLS** | Policies, triggers, constraints | pgTAP + client SDK | cross-branch read denied; maker≠checker rejected |
| **System / E2E** | Full workflows across roles | Playwright | collection→receipt→closing→approve→deposit→accounting |
| **Regression** | Re-run suite per release | CI | no reopened defects |
| **Performance** | Search ≤2s, P95 ≤3s, load | k6/Artillery | search under N rows/users |
| **Security** | Authz negatives, OWASP, pen-test | SAST/DAST + manual | 403 for wrong role/scope; injection blocked |
| **UAT** | Business acceptance per role | Manual (Client) | SC-01…06 verified |

### 4.1 Edge Cases & Negative Scenarios (samples)

- Variance ≠ 0 without reason → blocked (BR-04).
- Maker attempts to approve own closing/expense → 403 (BR-03).
- Deposit verified without acknowledgement → blocked (BR-07).
- Duplicate receipt via retry → same receipt returned (idempotency).
- Cross-branch data access attempt → no rows (RLS).
- Mixed payment where cash+online ≠ amount → blocked.
- Physical-delete attempt → not possible (no grant).
- Concurrent closings same cashier/day → unique constraint violation handled gracefully.
- Large file / wrong type upload → rejected with message.
- Session expiry mid-flow → re-auth, no data loss (autosave).

---

## 5. Coverage Assertion

| Check | Result |
|-------|--------|
| Every BRD § (1–22 + A,B) mapped | ✅ (§1) |
| Every module has requirements | ✅ (Requirements §4) |
| Every module has user stories | ✅ (UserStories) |
| Every module has acceptance criteria | ✅ (UserStories) |
| Every module has a workflow diagram | ✅ (MermaidDiagrams §7) |
| Every requirement has a test anchor | ✅ (§2–§3) |
| NFRs & business rules traced | ✅ (§3) |

**Conclusion:** the BRD is **fully traced** into requirements, design, and test coverage. No BRD item is unaddressed; analyst-added items are marked *(derived)* or *Recommended (R-*)* and are non-binding.

---

*End of TraceabilityMatrix.md*
