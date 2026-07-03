# Entity-Relationship Diagram

**Type:** ER diagram (domain) · **Ref:** [DatabaseDesign.md](../DatabaseDesign.md) §2

```mermaid
erDiagram
    STATE ||--o{ CLUSTER : has
    CLUSTER ||--o{ BRANCH : has
    BRANCH ||--o{ USER : employs
    BRANCH ||--o{ COLLECTION_REQUEST : raises
    USER ||--o{ COLLECTION_REQUEST : creates
    PARTNER ||--o{ COLLECTION_REQUEST : for
    COLLECTION_REQUEST ||--o| RECEIPT : generates
    COLLECTION_REQUEST ||--o{ ATTACHMENT : has
    RECEIPT ||--o{ PAYMENT_DETAIL : includes
    BRANCH ||--o{ EXPENSE : incurs
    EXPENSE_HEAD ||--o{ EXPENSE : categorises
    EXPENSE ||--o{ ATTACHMENT : attaches
    BRANCH ||--o{ DEPOSIT : makes
    BANK_ACCOUNT ||--o{ DEPOSIT : into
    PICKUP_AGENCY ||--o{ DEPOSIT : via
    DEPOSIT ||--o{ ATTACHMENT : slip_ack
    BRANCH ||--o{ CASH_CLOSING : closes
    USER ||--o{ CASH_CLOSING : performs
    CASH_CLOSING ||--o{ APPROVAL : routed_through
    CASH_CLOSING ||--o| ACCOUNTING_STATUS : accounted
    RECEIPT ||--o| ACCOUNTING_STATUS : accounted
    EXPENSE ||--o| ACCOUNTING_STATUS : accounted
    LEDGER ||--o{ ACCOUNTING_STATUS : posted_to
    USER ||--o{ AUDIT_LOG : acts

    USER { int id PK "res.users (extended)" }
    PARTNER { int id PK "res.partner (customer)" }
    ATTACHMENT { int id PK "ir.attachment" }

    COLLECTION_REQUEST {
      int id PK
      char name "Request No (ir.sequence)"
      int branch_id FK
      int partner_id FK
      monetary amount
      selection expected_mode
      selection state
    }
    RECEIPT {
      int id PK
      char name "Receipt No (ir.sequence)"
      int request_id FK
      monetary amount
      selection mode
    }
    CASH_CLOSING {
      int id PK
      date business_date
      monetary opening_cash
      monetary expected_cash "computed/stored"
      monetary physical_cash
      monetary variance "computed/stored"
      selection state
    }
```

*Customers reuse `res.partner`; staff reuse `res.users`; documents reuse `ir.attachment`. See [DatabaseDesign.md](../DatabaseDesign.md) for the full Odoo model definitions.*
