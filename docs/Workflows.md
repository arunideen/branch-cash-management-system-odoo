# Workflows & Process Diagrams

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` §6, §9–§14, §17
**Platform:** Odoo 19 Community Edition — module `branch_cash_management`
**Version:** 2.0 · **Date:** 2026-07-03 · **Status:** Draft for Client Review

> Every business process from the BRD is documented here with narrative + Mermaid diagrams. The **canonical single-diagram files** live in [docs/diagrams/](./diagrams/) and are indexed in [MermaidDiagrams.md](./MermaidDiagrams.md). Diagram types used: flowchart, sequence, activity, state, decision tree, approval, escalation, exception/error, swimlane, data-flow, and user-journey.

**Module coverage:** Collection Request · Cashier Verification · Receipt · Cash Closing · Approval · Expense · Deposit · Accounting · Notifications · Auth/Access · Dashboards/Reports (data flow).

---

## 1. End-to-End Process (BRD §6)

The complete cash lifecycle from advisor collection request to Tally accounting.

```mermaid
flowchart TD
    Start([Customer needs to pay]) --> A["Advisor creates Collection Request<br/>+ mandatory documents"]
    A --> B{"Cashier verifies<br/>documents & details"}
    B -->|Reject with remarks| A
    B -->|Accept| C["Collect payment<br/>(cash denomination / online ref)"]
    C --> D["System verifies payment"]
    D --> E["Generate official Receipt"]
    E --> F["...during the day: Expenses & Deposits recorded..."]
    F --> G["End-of-day: Cashier Cash Closing<br/>(expected vs physical, variance reason)"]
    G --> H{"Works Manager approves?"}
    H -->|Reject| G
    H -->|Approve| I{"Branch Accountant verifies<br/>physical cash & txns?"}
    I -->|Reject| G
    I -->|Verify & finalise| J["Closing = Closed (day locked)"]
    J --> K["Bank Deposit (direct/pickup) +<br/>slip & acknowledgement + verify"]
    K --> L["Accounting: Tally voucher, ledger, status"]
    L --> M{"Reconciled with Tally?"}
    M -->|Pending| L
    M -->|Reconciled| End([Transaction complete & auditable])
```

Canonical: [diagrams/e2e-flowchart.md](./diagrams/e2e-flowchart.md) · Swimlane view: [diagrams/e2e-swimlane.md](./diagrams/e2e-swimlane.md).

**Swimlane (role responsibilities across the lifecycle):**

```mermaid
flowchart LR
    subgraph Advisor
        A1[Create request] --> A2[Upload docs] --> A3[Correct if rejected]
    end
    subgraph Cashier
        C1[Verify] --> C2[Accept/Reject] --> C3[Collect + Receipt] --> C4[Record expenses/deposits] --> C5[Cash closing]
    end
    subgraph WorksManager
        W1[Approve closing]
    end
    subgraph BranchAccountant
        B1[Verify physical cash] --> B2[Verify deposit] --> B3[Record accounting]
    end
    A3 --> C1
    C5 --> W1 --> B1 --> B2 --> B3
```

---

## 2. Collection Request (BRD §8)

**Actors:** Sales/Service Advisor (maker). **Trigger:** customer intends to pay against an invoice/job card. **Outcome:** a `submitted` request with a unique Request ID and mandatory documents.

**Business rules:** BR-01 (mandatory docs), BR-09 (rejection loop). **Requirements:** FR-CR-01…08.

```mermaid
flowchart TD
    S([Start]) --> F["Enter customer, reference (invoice/job card), amount, expected mode"]
    F --> V{"All mandatory fields valid? (constraints)"}
    V -->|No| F
    V -->|Yes| U{"Mandatory document uploaded?"}
    U -->|No| F
    U -->|Yes| G["Generate unique Request ID"]
    G --> SUB["Status = Submitted"]
    SUB --> Q["Appears in Cashier Queue"]
    Q --> E([End])
```

**Request state machine:** [diagrams/request-state-diagram.md](./diagrams/request-state-diagram.md)

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Submitted: submit (docs present)
    Submitted --> Rejected: cashier rejects (remarks)
    Rejected --> Submitted: advisor corrects & resubmits
    Submitted --> Accepted: cashier accepts + payment captured
    Accepted --> Receipted: receipt issued
    Submitted --> Cancelled: cancel (reason)
    Receipted --> [*]
    Cancelled --> [*]
```

---

## 3. Cashier Verification & Payment (BRD §9)

**Actors:** Cashier (maker). **Requirements:** FR-CV-01…08.

```mermaid
flowchart TD
    S([Cashier opens queue]) --> SR["Search request (id/customer/reference)"]
    SR --> VD["Verify documents & details"]
    VD --> D{"Valid?"}
    D -->|No| RJ["Reject with mandatory remarks"] --> N1["Notify advisor"] --> BACK([Back to advisor])
    D -->|Yes| AC["Accept request"]
    AC --> M{"Payment mode?"}
    M -->|Cash| CD["Capture denomination breakdown"]
    M -->|Online| OR["Capture transaction reference"]
    M -->|Mixed| BOTH["Capture cash denom + online ref (sum = amount)"]
    CD --> VF["Verify payment total = amount"]
    OR --> VF
    BOTH --> VF
    VF --> RCPT["Proceed to Receipt"]
    RCPT --> E([End])
```

**Payment-mode decision tree:** [diagrams/payment-decision-tree.md](./diagrams/payment-decision-tree.md)

---

## 4. Receipt Generation (BRD §9)

**Actors:** Cashier. **Rules:** BR-08 (unique sequential immutable), FR-RCPT-01…05. Issued atomically via the `action_issue_receipt` model method (state-guarded).

```mermaid
sequenceDiagram
    participant C as Cashier
    participant W as Odoo Web Client
    participant M as action_issue_receipt (method)
    participant DB as PostgreSQL (via ORM)
    C->>W: click "Issue Receipt" (requestId)
    W->>M: call method (request record)
    M->>M: guard: state == accepted, maker rules
    M->>DB: ir.sequence next_by_code('bcms.receipt') -> name
    M->>DB: create bcms.receipt + payment lines (same txn)
    M->>DB: request.state = 'receipted'
    M->>DB: bcms.audit.log entry
    Note over M,DB: one request transaction (atomic)
    M-->>W: open receipt form (act_window)
    W-->>C: view / print QWeb PDF
```

Canonical: [diagrams/receipt-sequence.md](./diagrams/receipt-sequence.md)

---

## 5. Cash Closing (BRD §10)

**Actors:** Cashier (maker). **Rules:** BR-04 (variance reason), BR-10 (formula), AS-14 (opening carry-forward). **Requirements:** FR-CLS-01…11.

**Activity diagram:**

```mermaid
flowchart TD
    S([End of day]) --> O["Opening cash = prev day verified closing"]
    O --> AGG["System aggregates: cash coll., online coll., expenses, deposits"]
    AGG --> EXP["Expected = Opening + Cash Coll − Expenses − Deposits"]
    EXP --> PC["Cashier counts & enters physical cash"]
    PC --> VAR["Variance = Physical − Expected"]
    VAR --> Z{"Variance = 0?"}
    Z -->|No| RSN["Enter mandatory variance reason"]
    Z -->|Yes| SUBMIT
    RSN --> SUBMIT["Submit closing"]
    SUBMIT --> ST["Status = Pending WM Approval"]
    ST --> N["Notify Works Manager"]
    N --> E([Enter approval workflow])
```

Canonical: [diagrams/cash-closing-activity.md](./diagrams/cash-closing-activity.md) · State: [diagrams/closing-state-diagram.md](./diagrams/closing-state-diagram.md)

---

## 6. Approval Workflow — Closing (BRD §11)

**Chain (fixed, BR-02):** Cashier → Works Manager → Branch Accountant → Closed. **Maker ≠ Checker (BR-03).**

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingWM: cashier submits
    PendingWM --> Rejected: WM rejects (remarks)
    PendingWM --> PendingAccountant: WM approves
    PendingAccountant --> Rejected: Accountant rejects
    PendingAccountant --> Closed: Accountant verifies physical cash
    Rejected --> PendingWM: cashier corrects & resubmits
    Closed --> [*]
```

```mermaid
sequenceDiagram
    participant Ca as Cashier
    participant WM as Works Manager
    participant BA as Branch Accountant
    participant EF as EF: closing
    Ca->>EF: submit(physicalCash, reason?)
    EF-->>WM: notify pending approval
    WM->>EF: approve (maker≠checker check)
    EF-->>BA: notify pending verification
    BA->>EF: finalise (verify physical cash)
    EF->>EF: lock day, set next opening
    EF-->>Ca: closing closed
```

Canonical: [diagrams/approval-workflow.md](./diagrams/approval-workflow.md)

---

## 7. Cash Expense (BRD §12)

**Actors:** Cashier (maker) → Approver (checker). **Rules:** BR-06 (auto-reduce), BR-03. **Requirements:** FR-EXP-01…07.

```mermaid
flowchart TD
    S([Record expense]) --> F["Voucher no, expense head, amount, approver, attachment"]
    F --> SUB["Status = Pending Approval"] --> N["Notify approver"]
    N --> D{"Approver decision"}
    D -->|Reject| RJ["Status = Rejected (remarks)"] --> E1([End])
    D -->|Approve| T{"Amount > approver threshold? (R-02)"}
    T -->|Yes| ESC["Escalate to higher approver"] --> D
    T -->|No| AP["Status = Approved"]
    AP --> RED["Auto-reduce cash balance (BR-06)"]
    RED --> CLS["Feeds cash closing expenses"]
    CLS --> E([End])
```

Canonical: [diagrams/expense-flow.md](./diagrams/expense-flow.md)

---

## 8. Bank Deposit (BRD §13)

**Actors:** Cashier (maker) → Branch Accountant (verify). **Rules:** BR-07 (slip + acknowledgement), FR-DEP-01…06.

```mermaid
flowchart TD
    S([Record deposit]) --> TYPE{"Direct or Pickup Agency?"}
    TYPE -->|Direct| BANK["Select bank account"]
    TYPE -->|Pickup| AG["Select pickup agency"]
    BANK --> SLIP["Upload deposit slip + amount/date"]
    AG --> SLIP
    SLIP --> REC["Status = Recorded; cash-in-hand reduced"]
    REC --> ACK{"Acknowledgement uploaded?"}
    ACK -->|No| PEND["Status = Pending Ack (Pending Deposits report)"]
    PEND --> ACK
    ACK -->|Yes| VER{"Accountant verifies?"}
    VER -->|Reject| REJ["Rejected (remarks)"] --> REC
    VER -->|Verify| OK["Status = Verified"]
    OK --> E([End])
```

Canonical: [diagrams/deposit-flow.md](./diagrams/deposit-flow.md) · State: [diagrams/deposit-state-diagram.md](./diagrams/deposit-state-diagram.md)

---

## 9. Accounting Update (BRD §14)

**Actors:** Branch Accountant / Finance. **Rules:** BR-11. **Requirements:** FR-ACC-01…06.

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Posted: enter Tally voucher, dates, ledger
    Posted --> Reconciled: matched with Tally
    Posted --> Discrepancy: mismatch found
    Discrepancy --> Posted: corrected
    Reconciled --> [*]
```

Canonical: [diagrams/accounting-flow.md](./diagrams/accounting-flow.md)

---

## 10. Authentication & Authorization (BRD §18)

**Auth flow:** [diagrams/auth-flow.md](./diagrams/auth-flow.md) · **Authorization (record rules + maker-checker):** [diagrams/authorization-flow.md](./diagrams/authorization-flow.md). Diagrams are in [SecurityArchitecture.md](./SecurityArchitecture.md) §2–§3 and the canonical files.

---

## 11. Notifications (BRD §17)

**Triggers:** rejected request, pending approval, pending closing, pending deposit, accounting pending. Delivered in-app via Odoo activities/chatter (bus); role/scope-targeted. **Requirements:** FR-NOTIF-01…06.

```mermaid
flowchart LR
    T["Workflow transition<br/>(reject/submit/pending)"] --> M["Model method:<br/>activity_schedule / message_post"]
    M --> RES["Resolve recipient(s) by group + record-rule scope"]
    RES --> ACT[("mail.activity + mail.message")]
    ACT --> UI["Systray: activity clock + unread badge (bus)"]
    ACT -.->|optional / Phase 4| EXT["Email (mail.template) / WhatsApp / SMS"]
```

Canonical: [diagrams/notification-flow.md](./diagrams/notification-flow.md)

---

## 12. File Storage (documents, slips, acknowledgements)

**Rules:** BR-13 (versioning), file-upload security (SecurityArchitecture §9).

```mermaid
sequenceDiagram
    participant U as User
    participant OD as Odoo Server
    participant FS as Filestore (private volume)
    participant DB as PostgreSQL (ir.attachment)
    U->>OD: choose file (PDF/JPG/PNG ≤10MB) on the record
    OD->>OD: validate type/size (magic bytes, max upload size)
    OD->>FS: store file bytes (checksum-addressed)
    FS-->>OD: store reference
    OD->>DB: create ir.attachment (res_model/res_id, version current)
    DB->>DB: mark prior version superseded (BR-13)
    U->>OD: view file
    OD->>OD: check parent record-rule scope + access token
    OD-->>U: stream attachment (no public URL)
```

Canonical: [diagrams/file-storage-flow.md](./diagrams/file-storage-flow.md)

---

## 13. Exception, Escalation & Error Flows

### 13.1 Exception handling (operational exceptions)

```mermaid
flowchart TD
    E([Exception detected]) --> T{"Type?"}
    T -->|Cash variance > tolerance| V["Flag on Exception dashboard;<br/>require reason; escalate if > limit"]
    T -->|Deposit overdue| D["Pending Deposits report;<br/>notify accountant/cluster"]
    T -->|Closing overdue| C["Pending Closings; notify WM/cluster"]
    T -->|Accounting pending| A["Accounting Pending; notify finance"]
    V --> ESC([Escalation flow])
    D --> ESC
    C --> ESC
    A --> ESC
```

### 13.2 Escalation flow (thresholds — R-02, recommended)

```mermaid
flowchart LR
    L1["Works Manager"] -->|"> branch limit"| L2["Cluster Finance"]
    L2 -->|"> cluster limit"| L3["Corporate Finance"]
    L3 -->|"> corporate limit / policy"| L4["CFO / Admin"]
```

### 13.3 Error flow (system/technical errors)

```mermaid
flowchart TD
    R([create / write / action_* call]) --> V{"Fields & @api.constrains valid?"}
    V -->|No| E422["ValidationError (field-level, rolled back)"]
    V -->|Yes| AZ{"Authorized (ACL + record rule + group)?"}
    AZ -->|No| E403["AccessError: FORBIDDEN_SCOPE / MAKER_CHECKER_VIOLATION (audited)"]
    AZ -->|Yes| ST{"Valid state transition?"}
    ST -->|No| E409["UserError: INVALID_STATE_TRANSITION"]
    ST -->|Yes| TX{"Transaction commits?"}
    TX -->|No| E500["Exception → rollback + Sentry alert"]
    TX -->|Yes| OK["Success + bcms.audit.log + activity"]
```

Canonical: [diagrams/exception-handling-flow.md](./diagrams/exception-handling-flow.md), [diagrams/escalation-flow.md](./diagrams/escalation-flow.md), [diagrams/error-flow.md](./diagrams/error-flow.md)

---

## 14. Data Flow Diagram (system-wide)

```mermaid
flowchart LR
    subgraph Inputs
        ADV[Advisor] --> CR[(bcms.collection.request)]
        CASH[Cashier] --> RCPT[(bcms.receipt)]
        CASH --> EXP[(bcms.expense)]
        CASH --> DEP[(bcms.deposit)]
        CASH --> CLS[(bcms.cash.closing)]
        BA[Accountant] --> ACC[(bcms.accounting.status)]
    end
    CR --> RCPT
    RCPT --> CLS
    EXP --> CLS
    DEP --> CLS
    CLS --> ACC
    subgraph Outputs
        VIEWS[[read_group / pivot / graph]] --> RPT[Reports]
        VIEWS --> DASH[Dashboards]
        AUDIT[(bcms.audit.log)] --> COMP[Compliance/Audit]
    end
    CR --> VIEWS
    RCPT --> VIEWS
    EXP --> VIEWS
    DEP --> VIEWS
    CLS --> VIEWS
    ACC --> VIEWS
    CR --> AUDIT
    RCPT --> AUDIT
    CLS --> AUDIT
```

Canonical: [diagrams/data-flow-diagram.md](./diagrams/data-flow-diagram.md)

---

## 15. User Journey Maps

### 15.1 Cashier — a working day

```mermaid
journey
    title Cashier Daily Journey
    section Morning
      Login (MFA): 4: Cashier
      Review opening cash: 4: Cashier
      Open cashier queue: 5: Cashier
    section Transactions
      Verify & accept requests: 4: Cashier
      Capture payment & issue receipts: 5: Cashier
      Record petty expenses: 3: Cashier
    section Deposits
      Prepare & record bank deposit: 4: Cashier
    section End of day
      Count physical cash: 3: Cashier
      Submit closing (variance reason): 3: Cashier
      Handoff to Works Manager: 4: Cashier
```

### 15.2 Advisor — raising a collection

```mermaid
journey
    title Advisor Collection Journey
    section Raise request
      Enter customer & reference: 4: Advisor
      Upload mandatory docs: 3: Advisor
      Submit request: 5: Advisor
    section Follow-up
      Track status: 4: Advisor
      Fix rejection if any: 2: Advisor
      Confirm receipt to customer: 5: Advisor
```

Canonical: [diagrams/user-journey-cashier.md](./diagrams/user-journey-cashier.md), [diagrams/user-journey-advisor.md](./diagrams/user-journey-advisor.md)

---

## 16. Workflow ↔ Requirement Coverage

| Workflow | Section | Requirement IDs | Diagram file |
|----------|---------|-----------------|--------------|
| End-to-end | §1 | BRD §6, all FR | e2e-flowchart, e2e-swimlane |
| Collection Request | §2 | FR-CR-01…08 | collection-request-flow, request-state-diagram |
| Cashier Verification | §3 | FR-CV-01…08 | cashier-verification-flow, payment-decision-tree |
| Receipt | §4 | FR-RCPT-01…05 | receipt-sequence |
| Cash Closing | §5 | FR-CLS-01…11 | cash-closing-activity, closing-state-diagram |
| Approval | §6 | FR-CLS-12…14, FR-AUTH-05 | approval-workflow |
| Expense | §7 | FR-EXP-01…07 | expense-flow |
| Deposit | §8 | FR-DEP-01…06 | deposit-flow, deposit-state-diagram |
| Accounting | §9 | FR-ACC-01…06 | accounting-flow |
| Auth/Authz | §10 | FR-AUTH-01…03 | auth-flow, authorization-flow |
| Notifications | §11 | FR-NOTIF-01…06 | notification-flow |
| File storage | §12 | BR-13, FR-CR-05 | file-storage-flow |
| Exception/Escalation/Error | §13 | FR-DASH-05, R-02 | exception-handling-flow, escalation-flow, error-flow |
| Data flow | §14 | all | data-flow-diagram |
| User journeys | §15 | UX | user-journey-cashier, user-journey-advisor |

**Every module in the BRD has at least one workflow diagram.**

---

*End of Workflows.md*
