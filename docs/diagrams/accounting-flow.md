# Accounting Update State Diagram

**Type:** State diagram · **Module:** Accounting · **Ref:** [Workflows.md](../Workflows.md) §9 · BRD §14 · BR-11

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Posted: enter Tally voucher, dates, ledger
    Posted --> Reconciled: matched with Tally
    Posted --> Discrepancy: mismatch found
    Discrepancy --> Posted: corrected
    Reconciled --> [*]
```

## Reconciliation data flow (v1 manual, Phase 4 API)

```mermaid
flowchart LR
    TX["Receipts / Expenses / Deposits"] --> ACC["bcms.accounting.status (Pending)"]
    ACC --> MAN["Accountant enters Tally voucher no + status"]
    MAN --> REC{"Matches Tally?"}
    REC -->|Yes| DONE["Reconciled"]
    REC -->|No| DISC["Discrepancy → investigate"]
    MAN -.->|Phase 4| API["Tally XML/HTTP API auto-post + match"]
```
