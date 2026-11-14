# Smart Meter Management and Electricity Consumption Monitoring System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| meter_id | meter_reading records (list) |
| --- | --- |
| 101 | [201] |
| 102 | [202] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| meter_reading.reading_id | meter_reading.meter_id | meter_reading.quality_flag | meter.meter_id | meter.customer_id | meter.serial_number | customer.customer_id | customer.customer_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 201 | 101 | good | 101 | 1 | SM-1001 | 1 | Avery Chen |
| 202 | 102 | good | 102 | 2 | SM-1002 | 2 | Morgan Lee |

Key: reading_id.

## 2NF: depend on the whole key

meter_reading: meter_id is a proper part of candidate key (meter_id, reading_time), and determines meter details.

## meter_example

| meter.meter_id | meter.customer_id | meter.serial_number | customer.customer_id | customer.customer_name |
| --- | --- | --- | --- | --- |
| 101 | 1 | SM-1001 | 1 | Avery Chen |
| 102 | 2 | SM-1002 | 2 | Morgan Lee |

## meter_reading_example

| meter_reading.reading_id | meter_reading.meter_id | meter_reading.quality_flag |
| --- | --- | --- |
| 201 | 101 | good |
| 202 | 102 | good |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customer

| customer_id | customer_name | service_address |
| --- | --- | --- |
| 1 | Avery Chen | 10 Cedar Lane |
| 2 | Morgan Lee | 25 Birch Street |

## meter

| meter_id | customer_id | serial_number | install_date | status |
| --- | --- | --- | --- | --- |
| 101 | 1 | SM-1001 | 2025-03-01 | active |
| 102 | 2 | SM-1002 | 2025-04-15 | active |

## meter_reading

| reading_id | meter_id | reading_time | consumption_kwh | quality_flag |
| --- | --- | --- | --- | --- |
| 201 | 101 | 2025-05-01T10:00:00+00:00 | 1.25 | good |
| 202 | 102 | 2025-05-01T10:15:00+00:00 | 0.8 | good |

## Dependencies

- customer: (customer_id) → customer_name, service_address
- meter: (meter_id) → customer_id, serial_number, install_date, status
- meter_reading: (reading_id) → meter_id, reading_time, consumption_kwh, quality_flag

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
