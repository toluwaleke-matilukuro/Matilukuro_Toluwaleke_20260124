# Smart Meter Management and Electricity Consumption Monitoring System — SQL queries

## 1. Find meter_reading records where reading_time matches "2025-05-01T10:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."meter_reading"
WHERE "reading_time" IS NOT DISTINCT FROM '2025-05-01T10:00:00Z'
ORDER BY "reading_id"
LIMIT 20;
```

| reading_id | meter_id | reading_time | consumption_kwh | quality_flag |
| --- | --- | --- | --- | --- |
| 201 | 101 | 2025-05-01T10:00:00+00:00 | 1.25 | good |

## 2. Show related meter_reading, meter, customer records (up to 20).

```sql
SELECT t0."reading_id" AS "meter_reading_reading_id",
       t0."reading_time" AS "meter_reading_reading_time",
       t1."meter_id" AS "meter_meter_id",
       t1."serial_number" AS "meter_serial_number",
       t2."customer_id" AS "customer_customer_id",
       t2."customer_name" AS "customer_customer_name"
FROM portfolio."meter_reading" t0
JOIN portfolio."meter" t1 ON t0."meter_id" = t1."meter_id"
JOIN portfolio."customer" t2 ON t1."customer_id" = t2."customer_id"
ORDER BY t0."reading_id", t1."meter_id", t2."customer_id"
LIMIT 20;
```

| meter_reading_reading_id | meter_reading_reading_time | meter_meter_id | meter_serial_number | customer_customer_id | customer_customer_name |
| --- | --- | --- | --- | --- | --- |
| 201 | 2025-05-01T10:00:00+00:00 | 101 | SM-1001 | 1 | Avery Chen |
| 202 | 2025-05-01T10:15:00+00:00 | 102 | SM-1002 | 2 | Morgan Lee |

## 3. Count meter_reading records for each meter_id (up to 20 groups).

```sql
SELECT "meter_id", count(*) AS record_count
FROM portfolio."meter_reading"
GROUP BY "meter_id"
ORDER BY record_count DESC, "meter_id" NULLS LAST
LIMIT 20;
```

| meter_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.412 | 2.412, 2.35, 2.684 | Sort → Seq Scan | 274 |
| After index | 0.311 | 0.311, 0.305, 0.417 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.412 ms to 0.311 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.38..2.383 rows=50 loops=1)
  Seq Scan on meter_reading (actual time=0.017..2.343 rows=50 loops=1)
Planning Time: 0.353 ms
Execution Time: 2.412 ms
```

### Before index, run 2

```text
Sort (actual time=2.321..2.324 rows=50 loops=1)
  Seq Scan on meter_reading (actual time=0.019..2.267 rows=50 loops=1)
Planning Time: 0.351 ms
Execution Time: 2.35 ms
```

### Before index, run 3

```text
Sort (actual time=2.647..2.651 rows=50 loops=1)
  Seq Scan on meter_reading (actual time=0.015..2.609 rows=50 loops=1)
Planning Time: 0.362 ms
Execution Time: 2.684 ms
```

### After index, run 1

```text
Sort (actual time=0.25..0.253 rows=50 loops=1)
  Bitmap Heap Scan on meter_reading (actual time=0.032..0.211 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.016 rows=50 loops=1)
Planning Time: 0.554 ms
Execution Time: 0.311 ms
```

### After index, run 2

```text
Sort (actual time=0.246..0.249 rows=50 loops=1)
  Bitmap Heap Scan on meter_reading (actual time=0.033..0.208 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.016..0.017 rows=50 loops=1)
Planning Time: 0.553 ms
Execution Time: 0.305 ms
```

### After index, run 3

```text
Sort (actual time=0.332..0.336 rows=50 loops=1)
  Bitmap Heap Scan on meter_reading (actual time=0.042..0.276 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.021..0.021 rows=50 loops=1)
Planning Time: 0.677 ms
Execution Time: 0.417 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Matilukuro_Toluwaleke_301906386_P2_Queries.sql, then Matilukuro_Toluwaleke_301906386_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Matilukuro_Toluwaleke_301906386_P2_QueryResults.png) · [Index comparison](screenshots/Matilukuro_Toluwaleke_301906386_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

