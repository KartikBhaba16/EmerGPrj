
// This file represents the database schema that would be implemented in Supabase

/*
Table: patients
- id: string (primary key)
- acuity_level: number
- requires_oxygen: boolean
- requires_telemetry: boolean
- requires_isolation: boolean
- mobility_status: string
- diagnosis_stage: string
- current_location: string
- notes: string
- created_at: timestamp with time zone
- updated_at: timestamp with time zone

Table: beds
- id: string (primary key)
- zone: string
- status: string (empty, occupied, cleaning)
- patient_id: string (foreign key to patients.id)
- occupied_since: timestamp with time zone
- last_cleaned: timestamp with time zone
- created_at: timestamp with time zone
- updated_at: timestamp with time zone

Table: tasks
- id: string (primary key)
- title: string
- description: string
- assigned_to: string
- role: string (nurse, housekeeping)
- status: string (pending, completed, failed)
- priority: string (high, medium, low)
- related_patient_id: string (foreign key to patients.id, nullable)
- related_bed_id: string (foreign key to beds.id, nullable)
- created_at: timestamp with time zone
- updated_at: timestamp with time zone
- completed_at: timestamp with time zone (nullable)

Table: ambulances
- id: string (primary key)
- status: string (en_route, arrived, departed)
- patient_count: number
- priority: string (high, medium, low)
- estimated_arrival: timestamp with time zone
- arrival_time: timestamp with time zone (nullable)
- departure_time: timestamp with time zone (nullable)
- created_at: timestamp with time zone
- updated_at: timestamp with time zone

Table: users
- id: string (primary key)
- name: string
- email: string
- role: string (nurse, coordinator, housekeeping, admin)
- created_at: timestamp with time zone
- updated_at: timestamp with time zone
*/
