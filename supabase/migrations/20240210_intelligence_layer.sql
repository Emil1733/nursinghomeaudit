-- Migration: Add Intelligence Layer Fields

-- 1. Update facilities with AI and Score fields
ALTER TABLE facilities 
ADD COLUMN IF NOT EXISTS ai_summary JSONB,
ADD COLUMN IF NOT EXISTS safety_score FLOAT DEFAULT 75.0;

-- 2. Create benchmarks table for comparative analysis
CREATE TABLE IF NOT EXISTS city_benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_name TEXT NOT NULL,
    state_code TEXT NOT NULL DEFAULT 'TX',
    avg_violations FLOAT DEFAULT 0,
    facility_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(city_name, state_code)
);

-- 3. Index for performance
CREATE INDEX IF NOT EXISTS idx_facilities_city ON facilities(city);
CREATE INDEX IF NOT EXISTS idx_city_benchmarks_name ON city_benchmarks(city_name);
