# Authorization Flow (Record Rules + Maker-Checker)

**Type:** Flowchart · **Module:** Auth/Access · **Ref:** [SecurityArchitecture.md](../SecurityArchitecture.md) §3 · FR-AUTH-02/03/05, BR-03

```mermaid
flowchart TD
    Req["ORM/method call (authenticated session)"] --> Acc{"Model access right (ir.model.access) grants op?"}
    Acc -->|No| E401["AccessError: not allowed"]
    Acc -->|Yes| RR{"Record rule: row in user's branch/cluster/scope?"}
    RR -->|No| E403a["AccessError: FORBIDDEN_SCOPE (audited)"]
    RR -->|Yes| Grp{"Actor in the required group for the action?"}
    Grp -->|No| E403b["AccessError: FORBIDDEN"]
    Grp -->|Yes| MC{"Approval action & actor == maker (create_uid)?"}
    MC -->|Yes| E403c["ValidationError: MAKER_CHECKER_VIOLATION (audited)"]
    MC -->|No| OK["Execute + bcms.audit.log"]
```
