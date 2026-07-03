# Logical Architecture Diagram

**Type:** Layered logical architecture · **Ref:** [TechnicalArchitecture.md](../TechnicalArchitecture.md) §4

```mermaid
graph TD
    subgraph Presentation["Presentation Layer (Next.js/React)"]
        P1["Pages / Route Groups per role area"]
        P2["Feature Components (shadcn/ui)"]
        P3["Forms (RHF + Zod)"]
    end
    subgraph Application["Application Layer"]
        A1["Feature Hooks (TanStack Query)"]
        A2["Client Services / API clients"]
        A3["Zod schemas (shared)"]
        A4["Auth & Route Guards"]
    end
    subgraph Domain["Domain Layer"]
        D1["Business rules: closing math, maker-checker, variance"]
        D2["Entities & value objects (types)"]
        D3["Workflow / state machines"]
    end
    subgraph Data["Data Access Layer"]
        DA1["Supabase client (REST)"]
        DA2["Edge Function endpoints"]
        DA3["Realtime channels"]
        DA4["Storage adapter"]
    end
    subgraph Infra["Infrastructure (Supabase)"]
        I1["PostgreSQL + RLS + Views/Functions"]
        I2["Auth / JWT"]
        I3["pg_cron scheduled jobs"]
    end
    Presentation --> Application --> Domain --> Data --> Infra
```
