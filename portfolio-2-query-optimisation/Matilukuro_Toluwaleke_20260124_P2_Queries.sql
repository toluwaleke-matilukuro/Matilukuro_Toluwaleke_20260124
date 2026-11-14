-- Find meter_reading records where reading_time matches "2025-05-01T10:00:00Z" (up to 20).
SELECT * FROM portfolio."meter_reading"
WHERE "reading_time" IS NOT DISTINCT FROM '2025-05-01T10:00:00Z'
ORDER BY "reading_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."meter_reading"
WHERE "reading_time" IS NOT DISTINCT FROM '2025-05-01T10:00:00Z'
ORDER BY "reading_id"
LIMIT 20;

-- Show related meter_reading, meter, customer records (up to 20).
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

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
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

-- Count meter_reading records for each meter_id (up to 20 groups).
SELECT "meter_id", count(*) AS record_count
FROM portfolio."meter_reading"
GROUP BY "meter_id"
ORDER BY record_count DESC, "meter_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "meter_id", count(*) AS record_count
FROM portfolio."meter_reading"
GROUP BY "meter_id"
ORDER BY record_count DESC, "meter_id" NULLS LAST
LIMIT 20;
