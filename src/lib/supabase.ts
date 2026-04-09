import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pzjhtwubibcgvxzejomb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6amh0d3ViaWJjZ3Z4emVqb21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2ODMwODYsImV4cCI6MjA5MTI1OTA4Nn0.2oQ-ZnVcGEDkY7sJqf8e6RUd12ieP2CbYZ0P3ac5NRI';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
