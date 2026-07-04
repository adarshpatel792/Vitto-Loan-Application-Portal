CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  mobile VARCHAR(10) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  purpose TEXT NOT NULL,
  language VARCHAR(20) NOT NULL CHECK (language IN ('Hindi', 'Tamil', 'Telugu', 'Marathi', 'English')),
  status application_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_name_trgm ON applications (LOWER(name));
CREATE INDEX IF NOT EXISTS idx_applications_mobile ON applications (mobile);
