# Notification Flow

**Type:** Flowchart · **Module:** Notifications · **Ref:** [Workflows.md](../Workflows.md) §11 · BRD §17 · FR-NOTIF-01…06

```mermaid
flowchart LR
    T["Workflow transition (reject / submit / pending / accounting pending)"] --> M["Model method: activity_schedule / message_post"]
    M --> RES["Resolve recipient(s) by group + record-rule scope"]
    RES --> ACT[("mail.activity (to-do) + mail.message")]
    ACT --> UI["Systray: activity clock + unread badge (bus)"]
    ACT -.->|optional / Phase 4| EXT["Email (mail.template) / WhatsApp / SMS"]
```
