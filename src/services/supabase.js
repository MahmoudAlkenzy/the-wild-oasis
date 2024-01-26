import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vadtmfindvlbojimhdks.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZHRtZmluZHZsYm9qaW1oZGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyNzM5ODAsImV4cCI6MjAyMTg0OTk4MH0.hKC0VEPXgG30uLtkUbQrhHs9o7s_Xkr-moByPQGXHfU';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
