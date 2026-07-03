# Receipt Generation Sequence Diagram

**Type:** Sequence diagram · **Module:** Receipt · **Ref:** [Workflows.md](../Workflows.md) §4 · BR-08 · FR-RCPT-01…03

```mermaid
sequenceDiagram
    participant C as Cashier
    participant W as Odoo Web Client
    participant M as action_issue_receipt (model method)
    participant DB as PostgreSQL (via ORM)
    C->>W: click "Issue Receipt" (on accepted request)
    W->>M: call method (request record)
    M->>M: guard: state == accepted, maker rules
    M->>DB: ir.sequence next_by_code('bcms.receipt') → name
    M->>DB: create bcms.receipt + payment lines (same txn)
    M->>DB: request.state = 'receipted'
    M->>DB: bcms.audit.log entry
    Note over M,DB: all within one request transaction (atomic)
    M-->>W: open receipt form (act_window)
    W-->>C: view / print QWeb PDF
```
