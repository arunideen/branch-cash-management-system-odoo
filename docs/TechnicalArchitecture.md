# Technical Architecture

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Source:** `BRD_v1.0.docx` v1.0 · Stack directive (Phase 3)
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

> Phases 3 & 4 deliverable: technology stack, system/logical/physical architecture, component & module views, integration and deployment architecture. Database detail is in [DatabaseDesign.md](./DatabaseDesign.md); APIs in [APIDesign.md](./APIDesign.md); security in [SecurityArchitecture.md](./SecurityArchitecture.md). Rendered diagrams also live in [docs/diagrams/](./diagrams/).

---

## 1. Architectural Principles

| # | Principle | Application in BCMS |
|---|-----------|---------------------|
| 1 | **Clean / layered architecture** | UI → application (hooks/services) → domain → data access; dependencies point inward. |
| 2 | **Feature-based modularity** | Code organised by business feature (collections, cashier, closing, deposits…), not by technical type. |
| 3 | **SOLID** | Single-responsibility services, interface-driven data access, dependency inversion via provider/DI at module boundaries. |
| 4 | **Security by default** | RLS on every table; deny-by-default; least privilege; maker-checker enforced server-side. |
| 5 | **Server-authoritative** | The client never holds authority; RLS + Edge Functions enforce all rules regardless of UI. |
| 6 | **Auditable & immutable** | Append-only audit log; soft delete; document versioning. |
| 7 | **Progressive enhancement** | Realtime where valuable; graceful fallback to refetch; responsive/mobile-first. |
| 8 | **Idempotency & consistency** | Financial mutations use idempotency keys and DB transactions/constraints. |

---

## 2. Technology Stack

### 2.1 Frontend

| Concern | Technology | Notes |
|---------|-----------|-------|
| Framework | **Next.js (App Router)** | SSR/RSC for fast, secure pages; route groups per role area. |
| UI library | **React + TypeScript** | Strict TS; typed end-to-end. |
| Styling | **Tailwind CSS** | Design tokens map to the design system ([UIUX.md](./UIUX.md)). |
| Components | **shadcn/ui** (Radix) | Accessible primitives; consistent components. |
| Forms | **React Hook Form** | Performant, controlled forms. |
| Validation | **Zod** | Single schema reused for client + server (Edge Functions) validation. |
| Server state | **TanStack Query** | Caching, background refetch, optimistic updates. |
| Client state | React context / Zustand (light) | UI-only state; server state stays in TanStack Query. |
| Tables | TanStack Table | Sorting/filtering/pagination for registers & queues. |
| Charts | Recharts / visx | Dashboard KPIs & trends. |
| Auth client | `@supabase/ssr` | Cookie-based sessions in Next.js (SSR-safe). |

### 2.2 Backend (Supabase)

| Capability | Supabase Feature | Usage |
|-----------|------------------|-------|
| Database | **PostgreSQL** | System of record; all business entities. |
| AuthN | **Supabase Auth (GoTrue)** | Email/password (+ optional MFA/SSO); JWT issuance. |
| AuthZ | **Row Level Security** + custom JWT claims | Per-row scoping by role/branch/cluster/state. |
| Business logic | **Edge Functions (Deno/TypeScript)** | Server-authoritative operations: receipt issuance, closing finalise, deposit verify, accounting post, notification fan-out. |
| Realtime | **Realtime** | Live queues, dashboards, notifications. |
| Files | **Storage** | Documents, deposit slips, acknowledgements, expense bills (versioned). |
| Scheduling | **Scheduled Jobs (pg_cron / Edge Function cron)** | Overdue-deposit checks, daily digests, opening-cash carry-forward. |
| DB extensions | `pgcrypto`, `pg_cron`, `uuid-ossp`, `pg_trgm` | UUIDs, crypto, cron, fuzzy search. |

### 2.3 Cross-cutting

| Concern | Choice |
|---------|--------|
| Language | TypeScript everywhere (app + Edge Functions). |
| Package/monorepo | Single Next.js app + `supabase/` project; optional pnpm workspace. |
| API style | Supabase auto REST (PostgREST) for CRUD **within RLS**; **Edge Functions** for privileged/complex operations; Realtime subscriptions for live data. |
| Testing | Vitest/Jest (unit), Testing Library (component), Playwright (E2E), pgTAP (RLS/DB). See [Testing](#) in project docs. |
| CI/CD | GitHub Actions → Vercel (frontend) + Supabase CLI migrations. |
| Observability | Supabase logs + Sentry (frontend/functions) + uptime monitor. |

---

## 3. System Architecture (Context)

```mermaid
graph TB
    subgraph Clients["Client Devices"]
        Web["Web Browser (Desktop)"]
        Mobile["Mobile Browser / PWA"]
    end

    subgraph Edge["Vercel Edge / CDN"]
        Next["Next.js App Router<br/>(RSC + Route Handlers)"]
    end

    subgraph Supabase["Supabase (Managed Cloud)"]
        Auth["Auth (GoTrue)<br/>JWT + Claims Hook"]
        REST["PostgREST<br/>Auto REST API"]
        RT["Realtime Server"]
        EF["Edge Functions<br/>(Deno / TS)"]
        ST["Storage<br/>(S3-compatible)"]
        PG[("PostgreSQL<br/>+ RLS + pg_cron")]
    end

    subgraph External["External Systems"]
        Tally["Tally (Future API)"]
        BankAPI["Bank / CIT (Future API)"]
        Notify["WhatsApp/Email (Future)"]
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
    EF -.->|"Phase 4"| Tally
    EF -.->|"Phase 4"| BankAPI
    EF -.->|"Phase 4"| Notify
    ST --> PG
```

**Narrative.** The Next.js app is the only client-facing tier. It authenticates users via Supabase Auth and thereafter talks to Postgres through PostgREST **under RLS** for standard reads/writes, subscribes to Realtime for live queues/dashboards, invokes Edge Functions for privileged operations (which run with elevated rights but re-validate every business rule), and uses Storage (via signed URLs) for documents. External integrations (Tally, bank, messaging) are **Phase-4** and isolated behind Edge Functions.

---

## 4. Logical Architecture (Layers)

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
        D3["Workflow/state machines"]
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

**Layer rules:** Presentation depends on Application; Application depends on Domain; Domain is pure (no framework/IO); Data implements Domain-defined interfaces. Business-critical logic (closing arithmetic, maker-checker, receipt numbering) exists in **both** shared domain code (for UX) and is **authoritatively enforced** in the Data/Infra tier (Edge Functions + DB constraints/triggers).

---

## 5. Module Architecture

```mermaid
graph LR
    subgraph Core["Core / Shared"]
        Auth["auth & session"]
        RBAC["rbac / authz"]
        Audit["audit logging"]
        Notify["notifications"]
        Files["file storage"]
        UI["ui-kit / design system"]
    end
    subgraph Features["Feature Modules"]
        M1["masters"]
        M2["collections"]
        M3["cashier"]
        M4["receipts"]
        M5["closing"]
        M6["expenses"]
        M7["deposits"]
        M8["accounting"]
        M9["reports"]
        M10["dashboards"]
    end

    M2 --> M3 --> M4 --> M5
    M6 --> M5
    M7 --> M5
    M5 --> M8
    M8 --> M9
    M9 --> M10
    Features --> Core
```

Each feature module owns its routes, components, hooks, Zod schemas, and Edge Functions, and consumes cross-cutting **Core** services (auth, rbac, audit, notifications, files, ui-kit). Inter-module dependencies flow along the business workflow (collections → cashier → receipts → closing → accounting → reports → dashboards).

---

## 6. Component Diagram (Runtime Components)

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

**Why Edge Functions for money operations?** Receipt issuance, closing finalisation, deposit verification, and accounting posting must be **atomic, idempotent, and rule-checked** beyond what RLS alone expresses (e.g., maker ≠ checker across rows, sequential receipt numbers, cash-balance recomputation). These run as Edge Functions inside a DB transaction, using `SECURITY DEFINER` functions where appropriate, and re-validate the caller's claims.

---

## 7. Physical Architecture

```mermaid
graph TB
    User["Branch Staff Devices<br/>(Desktop / Mobile browsers)"]
    subgraph CDN["Vercel Global Edge Network"]
        V["Next.js (SSR/RSC, static assets)"]
    end
    subgraph Region["Supabase Region (ap-south-1 / ap-southeast-1)"]
        LB["API Gateway (Kong)"]
        AUTHN["GoTrue"]
        PGREST["PostgREST"]
        RTS["Realtime"]
        FUNC["Edge Functions runtime"]
        OBJ["Storage (object store)"]
        DBP[("Postgres primary")]
        DBR[("Read replica (scale-out, optional)")]
        BKP["Automated Backups / PITR"]
    end
    User -->|HTTPS/TLS| V
    V -->|HTTPS| LB
    LB --> AUTHN & PGREST & RTS & FUNC & OBJ
    PGREST --> DBP
    RTS --> DBP
    FUNC --> DBP
    DBP --> DBR
    DBP --> BKP
```

- **Hosting region:** choose the Supabase region closest to India (e.g., `ap-south-1` Mumbai or `ap-southeast-1` Singapore) for latency & data residency (confirm data-residency requirement, CLR-09).
- **Scaling:** Postgres vertical scaling + optional read replicas for reporting; PostgREST/Realtime/Edge Functions scale within the managed platform; Vercel scales the frontend globally.
- **Backups:** automated daily backups + point-in-time recovery; RPO ≤ 24h, RTO ≤ 4h (NFR-BACKUP-01).

---

## 8. Data Flow — Collection to Accounting (high level)

```mermaid
flowchart LR
    A["Advisor: create request + docs"] --> B["Storage: upload (versioned)"]
    A --> C[("collection_requests")]
    D["Cashier: verify + accept"] --> C
    D --> E["EF: issue-receipt (atomic, seq no.)"]
    E --> F[("receipts")]
    G["Cashier: expenses / deposits"] --> H[("expenses / deposits")]
    I["Cashier: closing"] --> J["EF: compute expected + variance"]
    J --> K[("cash_closings")]
    K --> L["WM approve → Accountant verify"]
    L --> M["EF: finalise-closing (lock day)"]
    M --> N[("accounting_status")]
    N --> O["Reports / Dashboards (views + Realtime)"]
    C --> P["Triggers: audit_log"]
    F --> P
    H --> P
    K --> P
```

Detailed per-process data-flow diagrams are in [Workflows.md](./Workflows.md) and [docs/diagrams/](./diagrams/).

---

## 9. Integration Architecture

```mermaid
graph LR
    subgraph BCMS
        EF["Edge Functions<br/>(integration adapters)"]
        Q[("integration_outbox<br/>(events)")]
    end
    subgraph Phase4["Phase 4 Integrations"]
        Tally["Tally XML/HTTP API"]
        Bank["Bank / CIT Statement API"]
        Msg["WhatsApp/SMS/Email"]
        BI["Power BI / Zoho Analytics"]
    end
    EF --> Q
    Q -.->|"outbound voucher post"| Tally
    Bank -.->|"inbound statement match"| EF
    EF -.->|"messages"| Msg
    DB[("Postgres (views)")] -.->|"read-only BI export"| BI
```

**Integration principles.**
- **Isolation & adapter pattern:** every external system is behind a dedicated Edge Function adapter; no external calls from the client.
- **Outbox pattern:** state changes that must reach Tally/bank are written to an `integration_outbox` table and dispatched asynchronously (retry, dead-letter) — resilient to downstream outages.
- **v1 reality (CON-02/03):** Tally is **manual entry**; bank acknowledgements are **uploaded files**; notifications are **in-app**. The adapters and outbox are stubbed/optional in v1 and activated in Phase 4 without schema redesign.
- **Idempotency:** outbound posts carry idempotency keys so retries never double-post to Tally.

---

## 10. Deployment Architecture & Environments

```mermaid
graph TB
    Dev["Developer"] -->|push PR| GH["GitHub"]
    GH -->|CI: lint, test, typecheck| CI["GitHub Actions"]
    CI -->|preview deploy| VPrev["Vercel Preview"]
    CI -->|"migrations (staging)"| SBstg["Supabase Staging"]
    GH -->|merge main| CD["GitHub Actions (CD)"]
    CD -->|deploy| VProd["Vercel Production"]
    CD -->|db migrate + functions deploy| SBprod["Supabase Production"]
    SBprod --> Mon["Sentry + Uptime + Supabase Logs"]
```

| Environment | Frontend | Backend | Purpose |
|-------------|----------|---------|---------|
| **Development** | Local Next.js | Local Supabase (Docker) / dev project | Feature work |
| **Staging** | Vercel preview | Supabase staging project | UAT, integration testing |
| **Production** | Vercel prod | Supabase prod project | Live |

- **DB migrations** are versioned SQL under `supabase/migrations/` and applied via Supabase CLI in CI/CD.
- **Edge Functions** deployed via Supabase CLI.
- **Secrets** in Vercel/Supabase env stores (never in repo) — see [SecurityArchitecture.md](./SecurityArchitecture.md) §Secrets.
- **Rollback:** Vercel instant rollback; DB migrations are forward-only with tested down-paths for reversible changes; PITR for data.

---

## 11. Non-Functional Design Decisions

| NFR | Design response |
|-----|-----------------|
| Availability ≥ 99.5% (NFR-AVAIL-01) | Managed Supabase + Vercel SLAs; health checks; PITR; graceful degradation (Realtime → polling fallback). |
| Fast search ≤ 2s (NFR-PERF-01) | Indexed columns, `pg_trgm` for fuzzy text, server-side pagination, TanStack Query caching. |
| Performance ≤ 3s P95 (NFR-PERF-02) | RSC streaming, cursor pagination, denormalised reporting views/materialised views. |
| Scalability (NFR-SCAL) | Multi-tenant-by-branch data model, indexed RLS predicates, read replicas for reporting. |
| Responsive/mobile (NFR-USE) | Mobile-first Tailwind, touch-friendly cashier flows. |
| Auditability (NFR-AUDIT) | Trigger-based append-only audit log + Edge Function context. |
| Maintainability (NFR-MAINT) | Feature modules, SOLID, shared Zod schemas, typed DB (generated types). |

---

## 12. Recommended Project / Folder Structure (Phase 14)

```
branch-cash-management/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # login, mfa
│   ├── (advisor)/                # collection requests, my-requests
│   ├── (cashier)/                # queue, receipt, closing, expenses, deposits
│   ├── (finance)/                # accounting, reports
│   ├── (admin)/                  # masters, users, config
│   ├── (dashboard)/              # branch/state/corporate dashboards
│   └── api/                      # route handlers (thin; delegate to Edge Fns)
├── src/
│   ├── features/
│   │   ├── masters/              # components, hooks, schemas, services
│   │   ├── collections/
│   │   ├── cashier/
│   │   ├── receipts/
│   │   ├── closing/
│   │   ├── expenses/
│   │   ├── deposits/
│   │   ├── accounting/
│   │   ├── reports/
│   │   └── dashboards/
│   ├── core/
│   │   ├── auth/                 # session, guards
│   │   ├── authz/                # rbac helpers, can()
│   │   ├── audit/
│   │   ├── notifications/
│   │   ├── storage/
│   │   └── supabase/             # clients (server/browser)
│   ├── domain/                   # pure business logic (closing math, state machines)
│   ├── ui/                       # shadcn components, design tokens
│   └── lib/                      # utils, formatting (INR, dates)
├── supabase/
│   ├── migrations/               # versioned SQL
│   ├── functions/                # edge functions (issue-receipt, ...)
│   ├── seed/                     # seed data
│   └── config.toml
├── tests/                        # unit, integration, e2e (playwright), db (pgTAP)
├── docs/                         # this documentation set
│   └── diagrams/
├── public/                       # assets
└── package.json
```

See also the [DatabaseDesign.md](./DatabaseDesign.md), [APIDesign.md](./APIDesign.md), and [SecurityArchitecture.md](./SecurityArchitecture.md) for the corresponding backend detail.

---

*End of TechnicalArchitecture.md*
