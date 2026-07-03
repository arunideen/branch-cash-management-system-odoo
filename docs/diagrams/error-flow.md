# Error Handling Flow

**Type:** Flowchart (technical error handling) · **Module:** Platform · **Ref:** [Workflows.md](../Workflows.md) §13.3 · [APIDesign.md](../APIDesign.md) §6

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
