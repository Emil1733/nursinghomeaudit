
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Use Service Role Key if on server, otherwise use Anon Key
const supabaseKey = (typeof window === 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : null) || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
