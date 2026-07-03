# Deployment Architecture Diagram

**Type:** Deployment / CI-CD diagram · **Ref:** [TechnicalArchitecture.md](../TechnicalArchitecture.md) §10

```mermaid
graph TB
    Dev["Developer"] -->|push PR| GH["GitHub"]
    GH -->|CI: lint, test, typecheck| CI["GitHub Actions"]
    CI -->|preview deploy| VPrev["Vercel Preview"]
    CI -->|migrations| SBstg["Supabase Staging"]
    GH -->|merge main| CD["GitHub Actions (CD)"]
    CD -->|deploy| VProd["Vercel Production"]
    CD -->|db migrate + functions| SBprod["Supabase Production"]
    SBprod --> Mon["Sentry + Uptime + Supabase Logs"]
    VProd --> Users["Branch Staff (Web/Mobile)"]
    Users --> VProd
```

## Physical topology

```mermaid
graph TB
    User["Branch Staff Devices"]
    subgraph CDN["Vercel Global Edge"]
        V["Next.js SSR/RSC + static"]
    end
    subgraph Region["Supabase Region (ap-south-1 / ap-southeast-1)"]
        LB["API Gateway (Kong)"]
        AUTHN["GoTrue"]
        PGREST["PostgREST"]
        RTS["Realtime"]
        FUNC["Edge Functions"]
        OBJ["Storage"]
        DBP[("Postgres primary")]
        DBR[("Read replica (optional)")]
        BKP["Backups / PITR"]
    end
    User -->|HTTPS/TLS| V --> LB
    LB --> AUTHN & PGREST & RTS & FUNC & OBJ
    PGREST --> DBP
    FUNC --> DBP
    RTS --> DBP
    DBP --> DBR
    DBP --> BKP
```
