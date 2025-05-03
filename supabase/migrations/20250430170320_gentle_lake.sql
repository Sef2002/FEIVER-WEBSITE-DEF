/*
  # Update appointments table to use separate date and time columns

  1. Changes
    - Add new columns:
      - appointment_date (date)
      - appointment_time (time)
    - Migrate existing data from start_time
    - Remove start_time column

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns
ALTER TABLE appointments 
ADD COLUMN appointment_date date,
ADD COLUMN appointment_time time;

-- Update new columns with data from start_time
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'appointments' 
    AND column_name = 'start_time'
  ) THEN
    UPDATE appointments 
    SET 
      appointment_date = start_time::date,
      appointment_time = start_time::time;
  END IF;
END $$;

-- Make new columns required
ALTER TABLE appointments 
ALTER COLUMN appointment_date SET NOT NULL,
ALTER COLUMN appointment_time SET NOT NULL;

-- Remove old column
ALTER TABLE appointments DROP COLUMN IF EXISTS start_time;