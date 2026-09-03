import { createClient } from '@supabase/supabase-js'

// Admin Client with Service Role / Secret Key for Server-Only Administrative Operations
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!secretKey) {
    throw new Error('SUPABASE_SECRET_KEY missing in environment variables.')
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
