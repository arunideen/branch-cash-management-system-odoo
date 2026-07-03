# Authentication Flow

**Type:** Sequence diagram · **Module:** Auth · **Ref:** [SecurityArchitecture.md](../SecurityArchitecture.md) §2 · FR-AUTH-01

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Next.js (@supabase/ssr)
    participant GT as GoTrue
    participant HK as Access-Token Hook
    U->>FE: email + password (+ TOTP if enabled)
    FE->>GT: POST /token?grant_type=password
    GT->>GT: verify credentials, MFA, rate-limit
    GT->>HK: enrich token (role, branch_id, cluster_id, state_id)
    HK-->>GT: custom app_metadata claims
    GT-->>FE: access JWT (~1h) + refresh token (httpOnly cookie)
    FE-->>U: authenticated session (role-scoped UI)
```
