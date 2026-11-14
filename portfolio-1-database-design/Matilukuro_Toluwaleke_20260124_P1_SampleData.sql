-- Fictional sample records for Smart Meter Management and Electricity Consumption Monitoring System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customer" ("customer_id", "customer_name", "service_address") VALUES (1, 'Avery Chen', '10 Cedar Lane');
INSERT INTO portfolio."customer" ("customer_id", "customer_name", "service_address") VALUES (2, 'Morgan Lee', '25 Birch Street');
INSERT INTO portfolio."meter" ("meter_id", "customer_id", "serial_number", "install_date", "status") VALUES (101, 1, 'SM-1001', '2025-03-01', 'active');
INSERT INTO portfolio."meter" ("meter_id", "customer_id", "serial_number", "install_date", "status") VALUES (102, 2, 'SM-1002', '2025-04-15', 'active');
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag") VALUES (201, 101, '2025-05-01T10:00:00Z', 1.25, 'good');
INSERT INTO portfolio."meter_reading" ("reading_id", "meter_id", "reading_time", "consumption_kwh", "quality_flag") VALUES (202, 102, '2025-05-01T10:15:00Z', 0.8, 'good');
COMMIT;
