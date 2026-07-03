# Escalation Flow

**Type:** Flowchart (escalation) · **Module:** Governance · **Ref:** [Workflows.md](../Workflows.md) §13.2 · R-02 (recommended)

```mermaid
flowchart LR
    L1["Works Manager (branch)"] -->|"amount/variance > branch limit"| L2["Cluster Finance"]
    L2 -->|"> cluster limit"| L3["Corporate Finance"]
    L3 -->|"> corporate limit / policy exception"| L4["CFO / Admin"]
    L4 --> DONE["Decision recorded + audited"]
```

> Thresholds are configurable (recommended feature R-02). All escalations are logged to the audit trail with actor, level, and reason.
