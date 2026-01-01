import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://gtvzmjyakoyquktrxkwn.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnptanlha295cXVrdHJ4a3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTIwNTIsImV4cCI6MjA3OTU2ODA1Mn0.XAu8YRsZmWG8kVg9f9GzCL-RJuLRM-gBxo-Fm4hCkKM"

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)



