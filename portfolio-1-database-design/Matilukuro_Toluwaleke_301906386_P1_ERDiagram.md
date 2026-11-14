# Smart Meter Management and Electricity Consumption Monitoring System — ER diagram

```mermaid
erDiagram
    direction LR
    customer {
        bigint customer_id PK
        text customer_name
        text service_address
    }
    meter {
        bigint meter_id PK
        bigint customer_id FK
        text serial_number UK
        date install_date
        text status
    }
    meter_reading {
        bigint reading_id PK
        bigint meter_id FK
        timestamptz reading_time
        numeric consumption_kwh
        text quality_flag
    }
    customer ||--o{ meter : "customer_id"
    meter ||--o{ meter_reading : "meter_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Matilukuro_Toluwaleke_301906386_ERDiagram.png)
