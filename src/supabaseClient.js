// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pgaypklckjbiozsgboil.supabase.co'; // Замените на ваш URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXlwa2xja2piaW96c2dib2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzQ4ODksImV4cCI6MjA1OTM1MDg4OX0.t87SHdkWm9sot2L-fFi-WUULKRvx9S-GhoIHDquj-4o'; // Замените на ваш Public API Key

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Необходимо указать SUPABASE_URL и SUPABASE_KEY');
  }
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;