# Module Diagram

**Type:** Module dependency diagram · **Ref:** [TechnicalArchitecture.md](../TechnicalArchitecture.md) §5

```mermaid
graph LR
    subgraph Core["Odoo Core (dependencies)"]
        BASE["base"]
        MAIL["mail (chatter, activities)"]
        WEBM["web (client, assets)"]
    end
    subgraph BCMS["branch_cash_management (single module) — functional areas"]
        M1["masters (org + reference data)"]
        M2["collections"]
        M3["cashier / verification"]
        M4["receipts"]
        M5["closing"]
        M6["expenses"]
        M7["deposits"]
        M8["accounting (→ Tally)"]
        M9["reporting"]
        M10["dashboards (OWL)"]
        X["cross-cutting: security (groups/rules/ACL), audit log, sequences, attachments"]
    end
    M2 --> M3 --> M4 --> M5
    M6 --> M5
    M7 --> M5
    M5 --> M8
    M8 --> M9
    M9 --> M10
    BCMS --> Core
    X -.-> BCMS
```

*All areas above are packaged in one addon; cross-cutting concerns reuse Odoo core (auth/session, chatter/activities for audit & notifications, `ir.attachment` for files) rather than bespoke shared modules.*
