-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. customer pk duplicate. Expected: pk_customer, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "customer_name", "service_address")
VALUES (1, 'Taylor Park', '30 Elm Road');

-- 2. customer not null address. Expected: service_address, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "customer_name", "service_address")
VALUES (9001, 'Taylor Park', NULL);

-- 3. meter pk duplicate. Expected: pk_meter, SQLSTATE 23505.
INSERT INTO portfolio."meter" ("meter_id", "customer_id", "serial_number", "install_date", "status")
VALUES (101, 1, 'SM-9001', '2025-06-01', 'active');

-- 4. meter unique serial. Expected: uq_meter_0, SQLSTATE 23505.
INSERT INTO portfolio."meter" ("meter_id", "customer_id", "serial_number", "install_date", "status")
VALUES (9002, 1, 'SM-1001', '2025-06-02', 'active');

-- 5. meter fk missing customer. Expected: fk_meter_0, SQLSTATE 23503.
INSERT INTO portfolio."meter" ("meter_id", "customer_id", "serial_number", "install_date", "status")
VALUES (9003, 9004, 'SM-9003', '2025-06-03', 'active');

-- 6. reading pk duplicate. Expected: pk_meter_reading, SQLSTATE 23505.
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag")
VALUES (201, 101, '2025-05-02T10:00:00Z', 1.1, 'good');

-- 7. reading unique meter time. Expected: uq_meter_reading_0, SQLSTATE 23505.
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag")
VALUES (9005, 101, '2025-05-01T10:00:00Z', 1.1, 'good');

-- 8. reading fk missing meter. Expected: fk_meter_reading_0, SQLSTATE 23503.
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag")
VALUES (9006, 9007, '2025-05-02T10:00:00Z', 1.1, 'good');

-- 9. reading negative consumption. Expected: nonnegative_consumption, SQLSTATE 23514.
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag")
VALUES (9008, 101, '2025-05-03T10:00:00Z', -0.5, 'good');
