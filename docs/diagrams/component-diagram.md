# Component Diagram

**Type:** Runtime component diagram · **Ref:** [TechnicalArchitecture.md](../TechnicalArchitecture.md) §6

```mermaid
graph TB
    subgraph FE["Next.js Frontend"]
        RG["Route Guards / Middleware"]
        QC["TanStack Query Cache"]
        SC["Supabase Client (ssr)"]
        RTC["Realtime Client"]
    end
    subgraph BE["Supabase Backend"]
        GT["GoTrue Auth"]
        HOOK["Custom Access Token Hook"]
        PR["PostgREST"]
        subgraph EFG["Edge Functions"]
            EF1["issue-receipt"]
            EF2["finalise-closing"]
            EF3["verify-deposit"]
            EF4["post-accounting"]
            EF5["notify-dispatch"]
            EF6["cron-overdue"]
        end
        DB[("PostgreSQL")]
        RLS["RLS Policies"]
        TRG["Triggers (audit, cash-balance)"]
        VW["Reporting Views"]
    end
    RG --> SC --> GT --> HOOK
    SC --> PR --> RLS --> DB
    RTC --> DB
    SC --> EF1 & EF2 & EF3 & EF4
    EF1 & EF2 & EF3 & EF4 --> DB
    DB --> TRG
    DB --> VW
    EF5 --> DB
    EF6 --> DB
```
