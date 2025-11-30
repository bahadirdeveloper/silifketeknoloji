-- Add age column to applications with validation
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS age INTEGER;

-- Populate existing records with minimum valid age to satisfy NOT NULL constraint
UPDATE applications
SET age = 18
WHERE age IS NULL;

-- Enforce constraints on age column
ALTER TABLE applications
ALTER COLUMN age SET NOT NULL;

ALTER TABLE applications
ADD CONSTRAINT IF NOT EXISTS applications_age_check
CHECK (age BETWEEN 18 AND 38);
