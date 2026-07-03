# System Architecture Diagram

**Type:** System context / container diagram · **Ref:** [TechnicalArchitecture.md](../TechnicalArchitecture.md) §3

```mermaid
graph TB
    subgraph Clients["Client Devices"]
        Web["Web Browser (Desktop)"]
        Mobile["Mobile Browser / PWA"]
    end
    subgraph Edge["Vercel Edge / CDN"]
        Next["Next.js App Router (RSC + Route Handlers)"]
    end
    subgraph Supabase["Supabase (Managed Cloud)"]
        Auth["Auth (GoTrue) + Claims Hook"]
        REST["PostgREST Auto REST API"]
        RT["Realtime Server"]
        EF["Edge Functions (Deno/TS)"]
        ST["Storage (S3-compatible)"]
        PG[("PostgreSQL + RLS + pg_cron")]
    end
    subgraph External["External (Phase 4)"]
        Tally["Tally API"]
        BankAPI["Bank / CIT API"]
        Notify["WhatsApp/Email"]
    end
    Web --> Next
    Mobile --> Next
    Next -->|"@supabase/ssr"| Auth
    Next -->|"REST (RLS)"| REST
    Next -->|"subscribe"| RT
    Next -->|"invoke"| EF
    Next -->|"signed URLs"| ST
    Auth --> PG
    REST --> PG
    RT --> PG
    EF --> PG
    EF -.-> Tally
    EF -.-> BankAPI
    EF -.-> Notify
    ST --> PG
```
