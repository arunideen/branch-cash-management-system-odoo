# System Data Flow Diagram

**Type:** Data flow diagram (DFD) · **Module:** All · **Ref:** [Workflows.md](../Workflows.md) §14

```mermaid
flowchart LR
    subgraph Inputs
        ADV[Advisor] --> CR[(collection_request)]
        CASH[Cashier] --> RCPT[(receipt)]
        CASH --> EXP[(cash_expense)]
        CASH --> DEP[(bank_deposit)]
        CASH --> CLS[(cash_closing)]
        BA[Accountant] --> ACC[(accounting_status)]
    end
    CR --> RCPT
    RCPT --> CLS
    EXP --> CLS
    DEP --> CLS
    CLS --> ACC
    subgraph Outputs
        VIEWS[[Reporting Views]] --> RPT[Reports]
        VIEWS --> DASH[Dashboards]
        AUDIT[(audit_log)] --> COMP[Compliance/Audit]
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
