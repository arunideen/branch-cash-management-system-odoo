# Mermaid Diagrams — Master Index

**Project:** Branch Cash Management System (BCMS) — Prabal Motors Private Limited
**Version:** 1.0 · **Date:** 2026-07-01 · **Status:** Draft for Client Review

> Every Mermaid diagram in this documentation set is stored as its own file in [docs/diagrams/](./diagrams/). This index catalogues them by category, diagram type, and the module/requirement they cover. Diagrams also appear inline (for readability) in [Workflows.md](./Workflows.md), [TechnicalArchitecture.md](./TechnicalArchitecture.md), [DatabaseDesign.md](./DatabaseDesign.md), and [SecurityArchitecture.md](./SecurityArchitecture.md).

**How to view:** these render automatically on GitHub/GitLab, in VS Code (with the *Markdown Preview Mermaid* extension), Obsidian, and any Mermaid-aware Markdown viewer. To export to PNG/SVG use the [Mermaid Live Editor](https://mermaid.live) or the `@mermaid-js/mermaid-cli` (`mmdc`) tool.

---

## 1. Architecture Diagrams

| # | Diagram | Type | File | Source doc |
|---|---------|------|------|------------|
| 1 | System Architecture (context) | Graph | [diagrams/system-architecture.md](./diagrams/system-architecture.md) | TechnicalArchitecture §3 |
| 2 | Logical Architecture (layers) | Graph | [diagrams/logical-architecture.md](./diagrams/logical-architecture.md) | TechnicalArchitecture §4 |
| 3 | Module Diagram | Graph | [diagrams/module-diagram.md](./diagrams/module-diagram.md) | TechnicalArchitecture §5 |
| 4 | Component Diagram | Graph | [diagrams/component-diagram.md](./diagrams/component-diagram.md) | TechnicalArchitecture §6 |
| 5 | Deployment & Physical Architecture | Graph | [diagrams/deployment-architecture.md](./diagrams/deployment-architecture.md) | TechnicalArchitecture §7, §10 |

## 2. Database Diagrams

| # | Diagram | Type | File | Source doc |
|---|---------|------|------|------------|
| 6 | Entity-Relationship Diagram | ER | [diagrams/er-diagram.md](./diagrams/er-diagram.md) | DatabaseDesign §2 |

## 3. Process / Workflow Diagrams

| # | Diagram | Type | Module | File |
|---|---------|------|--------|------|
| 7 | End-to-End Process | Flowchart | All | [diagrams/e2e-flowchart.md](./diagrams/e2e-flowchart.md) |
| 8 | End-to-End Swimlane | Swimlane | All | [diagrams/e2e-swimlane.md](./diagrams/e2e-swimlane.md) |
| 9 | Collection Request | Flowchart | Collection Request | [diagrams/collection-request-flow.md](./diagrams/collection-request-flow.md) |
| 10 | Collection Request States | State | Collection Request | [diagrams/request-state-diagram.md](./diagrams/request-state-diagram.md) |
| 11 | Cashier Verification | Flowchart | Cashier Verification | [diagrams/cashier-verification-flow.md](./diagrams/cashier-verification-flow.md) |
| 12 | Payment Mode Decision | Decision tree | Cashier Verification | [diagrams/payment-decision-tree.md](./diagrams/payment-decision-tree.md) |
| 13 | Receipt Generation | Sequence | Receipt | [diagrams/receipt-sequence.md](./diagrams/receipt-sequence.md) |
| 14 | Cash Closing | Activity | Cash Closing | [diagrams/cash-closing-activity.md](./diagrams/cash-closing-activity.md) |
| 15 | Cash Closing States | State | Cash Closing | [diagrams/closing-state-diagram.md](./diagrams/closing-state-diagram.md) |
| 16 | Closing Approval | Sequence/Approval | Approval | [diagrams/approval-workflow.md](./diagrams/approval-workflow.md) |
| 17 | Cash Expense | Flowchart | Expense | [diagrams/expense-flow.md](./diagrams/expense-flow.md) |
| 18 | Bank Deposit | Flowchart | Deposit | [diagrams/deposit-flow.md](./diagrams/deposit-flow.md) |
| 19 | Bank Deposit States | State | Deposit | [diagrams/deposit-state-diagram.md](./diagrams/deposit-state-diagram.md) |
| 20 | Accounting Update | State + DFD | Accounting | [diagrams/accounting-flow.md](./diagrams/accounting-flow.md) |

## 4. Security & Access Diagrams

| # | Diagram | Type | File | Source doc |
|---|---------|------|------|------------|
| 21 | Authentication Flow | Sequence | [diagrams/auth-flow.md](./diagrams/auth-flow.md) | SecurityArchitecture §2 |
| 22 | Authorization Flow (RLS + maker-checker) | Flowchart | [diagrams/authorization-flow.md](./diagrams/authorization-flow.md) | SecurityArchitecture §3 |

## 5. Cross-cutting Flows

| # | Diagram | Type | File | Source doc |
|---|---------|------|------|------------|
| 23 | Notification Flow | Flowchart | [diagrams/notification-flow.md](./diagrams/notification-flow.md) | Workflows §11 |
| 24 | File Storage Flow | Sequence | [diagrams/file-storage-flow.md](./diagrams/file-storage-flow.md) | Workflows §12 |
| 25 | Escalation Flow | Flowchart | [diagrams/escalation-flow.md](./diagrams/escalation-flow.md) | Workflows §13.2 |
| 26 | Exception Handling Flow | Flowchart | [diagrams/exception-handling-flow.md](./diagrams/exception-handling-flow.md) | Workflows §13.1 |
| 27 | Error Handling Flow | Flowchart | [diagrams/error-flow.md](./diagrams/error-flow.md) | Workflows §13.3 |
| 28 | System Data Flow (DFD) | DFD | [diagrams/data-flow-diagram.md](./diagrams/data-flow-diagram.md) | Workflows §14 |

## 6. User Journey Maps

| # | Diagram | Type | File | Source doc |
|---|---------|------|------|------------|
| 29 | Cashier Journey | Journey | [diagrams/user-journey-cashier.md](./diagrams/user-journey-cashier.md) | Workflows §15.1 |
| 30 | Advisor Journey | Journey | [diagrams/user-journey-advisor.md](./diagrams/user-journey-advisor.md) | Workflows §15.2 |

---

## 7. Diagram Type Coverage (per Phase 6 requirements)

| Requested type | Provided by |
|----------------|-------------|
| Flowcharts | #7, #9, #11, #17, #18, #22, #25, #26, #27 |
| Sequence diagrams | #13, #16, #21, #24 |
| Activity diagrams | #14 |
| State diagrams | #10, #15, #19, #20 |
| Decision trees | #12 |
| Approval workflows | #16 (+ #8 swimlane) |
| Exception handling flows | #26 |
| Escalation flows | #25 |
| Error flows | #27 |
| Data flow diagrams | #20, #28 |
| Swimlane diagrams | #8 |
| User journey maps | #29, #30 |
| Architecture (system/logical/component/module/deployment) | #1–#5 |
| ER diagram | #6 |

**All requested diagram types are covered, and every BRD module has at least one diagram.**

---

## 8. Rendering / Export (optional tooling)

```bash
# Install Mermaid CLI
npm i -g @mermaid-js/mermaid-cli

# Export one diagram file's Mermaid block to SVG/PNG
mmdc -i docs/diagrams/e2e-flowchart.md -o docs/diagrams/e2e-flowchart.svg
```

---

*End of MermaidDiagrams.md*
