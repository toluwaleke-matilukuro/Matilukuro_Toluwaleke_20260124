// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("meter_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("meter_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "reading_recorded",
                    "reading_corrected"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "meter_reading"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "reading_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("meter_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reading_recorded",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "meter_reading",
            "key": {
                "reading_id": 201
            },
            "snapshot": {
                "reading_id": 201,
                "meter_id": 101,
                "reading_time": "2025-05-01T10:00:00Z",
                "consumption_kwh": 1.25,
                "quality_flag": "good"
            }
        },
        "embedded": {
            "meter": [
                {
                    "key": {
                        "meter_id": 101
                    },
                    "snapshot": {
                        "meter_id": 101,
                        "customer_id": 1,
                        "serial_number": "SM-1001",
                        "install_date": "2025-03-01",
                        "status": "active"
                    },
                    "via": [
                        "meter_reading.meter_id → meter"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "customer_name": "Avery Chen",
                        "service_address": "10 Cedar Lane"
                    },
                    "via": [
                        "meter_reading.meter_id → meter.customer_id → customer"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reading_corrected",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "meter_reading",
            "key": {
                "reading_id": 201
            },
            "snapshot": {
                "reading_id": 201,
                "meter_id": 101,
                "reading_time": "2025-05-01T10:00:00Z",
                "consumption_kwh": 1.25,
                "quality_flag": "good"
            }
        },
        "embedded": {
            "meter": [
                {
                    "key": {
                        "meter_id": 101
                    },
                    "snapshot": {
                        "meter_id": 101,
                        "customer_id": 1,
                        "serial_number": "SM-1001",
                        "install_date": "2025-03-01",
                        "status": "active"
                    },
                    "via": [
                        "meter_reading.meter_id → meter"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "customer_name": "Avery Chen",
                        "service_address": "10 Cedar Lane"
                    },
                    "via": [
                        "meter_reading.meter_id → meter.customer_id → customer"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "correction_reason": "illustrative correction_reason",
                "device_voltage": "illustrative device_voltage",
                "signal_strength": "illustrative signal_strength"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reading_recorded",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "meter_reading",
            "key": {
                "reading_id": 202
            },
            "snapshot": {
                "reading_id": 202,
                "meter_id": 102,
                "reading_time": "2025-05-01T10:15:00Z",
                "consumption_kwh": 0.8,
                "quality_flag": "good"
            }
        },
        "embedded": {
            "meter": [
                {
                    "key": {
                        "meter_id": 102
                    },
                    "snapshot": {
                        "meter_id": 102,
                        "customer_id": 2,
                        "serial_number": "SM-1002",
                        "install_date": "2025-04-15",
                        "status": "active"
                    },
                    "via": [
                        "meter_reading.meter_id → meter"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 2
                    },
                    "snapshot": {
                        "customer_id": 2,
                        "customer_name": "Morgan Lee",
                        "service_address": "25 Birch Street"
                    },
                    "via": [
                        "meter_reading.meter_id → meter.customer_id → customer"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reading_corrected",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "meter_reading",
            "key": {
                "reading_id": 202
            },
            "snapshot": {
                "reading_id": 202,
                "meter_id": 102,
                "reading_time": "2025-05-01T10:15:00Z",
                "consumption_kwh": 0.8,
                "quality_flag": "good"
            }
        },
        "embedded": {
            "meter": [
                {
                    "key": {
                        "meter_id": 102
                    },
                    "snapshot": {
                        "meter_id": 102,
                        "customer_id": 2,
                        "serial_number": "SM-1002",
                        "install_date": "2025-04-15",
                        "status": "active"
                    },
                    "via": [
                        "meter_reading.meter_id → meter"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 2
                    },
                    "snapshot": {
                        "customer_id": 2,
                        "customer_name": "Morgan Lee",
                        "service_address": "25 Birch Street"
                    },
                    "via": [
                        "meter_reading.meter_id → meter.customer_id → customer"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "correction_reason": "illustrative correction_reason",
                "device_voltage": "illustrative device_voltage",
                "signal_strength": "illustrative signal_strength"
            }
        }
    }
]));
  await db.getCollection("meter_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("meter_events").find({"eventType":"reading_recorded"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("meter_events").find({"source.key.reading_id":201}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("meter_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("meter_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("meter_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reading_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "meter_reading",
        "key": {
            "reading_id": 201
        },
        "snapshot": {
            "reading_id": 201,
            "meter_id": 101,
            "reading_time": "2025-05-01T10:00:00Z",
            "consumption_kwh": 1.25,
            "quality_flag": "good"
        }
    },
    "embedded": {
        "meter": [
            {
                "key": {
                    "meter_id": 101
                },
                "snapshot": {
                    "meter_id": 101,
                    "customer_id": 1,
                    "serial_number": "SM-1001",
                    "install_date": "2025-03-01",
                    "status": "active"
                },
                "via": [
                    "meter_reading.meter_id → meter"
                ]
            }
        ],
        "customer": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "customer_name": "Avery Chen",
                    "service_address": "10 Cedar Lane"
                },
                "via": [
                    "meter_reading.meter_id → meter.customer_id → customer"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("meter_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reading_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "meter_reading",
        "key": {
            "reading_id": 201
        },
        "snapshot": {
            "reading_id": 201,
            "meter_id": 101,
            "reading_time": "2025-05-01T10:00:00Z",
            "consumption_kwh": 1.25,
            "quality_flag": "good"
        }
    },
    "embedded": {
        "meter": [
            {
                "key": {
                    "meter_id": 101
                },
                "snapshot": {
                    "meter_id": 101,
                    "customer_id": 1,
                    "serial_number": "SM-1001",
                    "install_date": "2025-03-01",
                    "status": "active"
                },
                "via": [
                    "meter_reading.meter_id → meter"
                ]
            }
        ],
        "customer": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "customer_name": "Avery Chen",
                    "service_address": "10 Cedar Lane"
                },
                "via": [
                    "meter_reading.meter_id → meter.customer_id → customer"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("meter_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
