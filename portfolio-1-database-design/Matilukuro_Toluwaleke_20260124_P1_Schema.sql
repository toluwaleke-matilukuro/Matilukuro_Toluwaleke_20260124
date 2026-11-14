-- Smart Meter Management and Electricity Consumption Monitoring System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."customer" (
  "customer_id" bigint NOT NULL,
  "customer_name" text NOT NULL,
  "service_address" text NOT NULL,
  CONSTRAINT "pk_customer" PRIMARY KEY ("customer_id")
);
CREATE TABLE portfolio."meter" (
  "meter_id" bigint NOT NULL,
  "customer_id" bigint NOT NULL,
  "serial_number" text NOT NULL,
  "install_date" date NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_meter" PRIMARY KEY ("meter_id"),
  CONSTRAINT "uq_meter_0" UNIQUE ("serial_number")
);
CREATE TABLE portfolio."meter_reading" (
  "reading_id" bigint NOT NULL,
  "meter_id" bigint NOT NULL,
  "reading_time" timestamptz NOT NULL,
  "consumption_kwh" numeric(18,2) NOT NULL,
  "quality_flag" text NOT NULL,
  CONSTRAINT "pk_meter_reading" PRIMARY KEY ("reading_id"),
  CONSTRAINT "uq_meter_reading_0" UNIQUE ("meter_id", "reading_time")
);
ALTER TABLE portfolio."meter" ADD CONSTRAINT "fk_meter_0" FOREIGN KEY ("customer_id") REFERENCES portfolio."customer" ("customer_id");
ALTER TABLE portfolio."meter_reading" ADD CONSTRAINT "fk_meter_reading_0" FOREIGN KEY ("meter_id") REFERENCES portfolio."meter" ("meter_id");
ALTER TABLE portfolio."meter_reading" ADD CONSTRAINT "nonnegative_consumption" CHECK ("consumption_kwh" >= 0);
COMMIT;
