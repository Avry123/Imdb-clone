
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//console.log(supabaseKey);
// const supabase = createClient(supabaseUrl, supabaseKey);

export default createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      realtime: true, // Enable real-time capabilities
    }
  )