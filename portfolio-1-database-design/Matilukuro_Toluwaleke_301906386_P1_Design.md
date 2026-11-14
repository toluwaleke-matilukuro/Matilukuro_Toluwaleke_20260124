# Smart Meter Management and Electricity Consumption Monitoring System — database design

My case study records customer, meter, meter_reading.

## Users

- Utility operations staff
- Energy analysts
- Database students

## Main operations

- Register a customer and associate meters with that customer.
- Record meter readings with timestamps, consumption, and a quality flag.
- Review readings for a meter over a selected time range.
- Benchmark a time-range reading query on 50000 synthetic readings by comparing plans and elapsed time before and after the proposed B-tree index on reading_time; record observations without assuming a performance result.

## Entities

| Entity | Information stored |
| --- | --- |
| customer | A utility customer associated with one or more smart meters. |
| meter | A registered smart meter assigned to one customer. |
| meter_reading | A timestamped electricity consumption reading from a meter. |

## customer

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| customer_name | TEXT |  | Yes |
| service_address | TEXT |  | Yes |


## meter

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| meter_id | BIGINT | PK | Yes |
| customer_id | BIGINT | FK | Yes |
| serial_number | TEXT | Unique | Yes |
| install_date | DATE |  | Yes |
| status | TEXT |  | Yes |
- customer_id → customer.customer_id
- Unique key: (serial_number).

## meter_reading

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| reading_id | BIGINT | PK | Yes |
| meter_id | BIGINT | FK | Yes |
| reading_time | TIMESTAMPTZ |  | Yes |
| consumption_kwh | NUMERIC(18,2) |  | Yes |
| quality_flag | TEXT |  | Yes |
- meter_id → meter.meter_id
- Unique key: (meter_id, reading_time).

## Relationships and business rules

- Every meter must reference an existing customer.
- Each registered meter serial number must be unique.
- Every reading must reference an existing meter.
- Recorded consumption in kWh must be greater than or equal to zero.
- A meter can have at most one reading at a given timestamp.

## Assumptions

- Each meter belongs to exactly one customer, and a customer may have multiple meters.
- Each reading belongs to exactly one meter; reading timestamps are UTC.
- Consumption is measured in kWh and cannot be negative.
- A meter has one reading per timestamp; corrections are represented as events in the document model.
- All identifiers and example records are synthetic.

