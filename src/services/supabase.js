
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://twiniatxeorqfgcwoqvm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3aW5pYXR4ZW9ycWZnY3dvcXZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzM5MDM5MiwiZXhwIjoyMDY4OTY2MzkyfQ.ltRnRxl269Mco5e6Ccr1Iob0t9G-GyGmzC181ZEaeho"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase