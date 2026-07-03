# File Storage Flow

**Type:** Sequence diagram · **Module:** Documents · **Ref:** [Workflows.md](../Workflows.md) §12 · BR-13 · SecurityArchitecture §9

```mermaid
sequenceDiagram
    participant U as User
    participant N as Next.js
    participant ST as Supabase Storage (private)
    participant DB as Postgres (document)
    U->>N: choose file (PDF/JPG/PNG ≤10MB)
    N->>N: validate type/size (magic bytes)
    N->>ST: upload to private bucket (branch/entity/uuid)
    ST-->>N: object path
    N->>DB: insert document (version+1, is_current=true)
    DB->>DB: set prior version is_current=false
    U->>N: view file
    N->>ST: request short-lived signed URL (scoped)
    ST-->>U: file via signed URL
```
