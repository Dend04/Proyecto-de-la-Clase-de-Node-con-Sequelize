// plugins/supabase.js
import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const supabaseUrl = runtimeConfig.public.NUXT_SUPABASE_URL; // Accede a la URL de Supabase
  const supabaseKey = runtimeConfig.public.NUXT_SUPABASE_KEY; // Accede a la clave de Supabase

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase,
    },
  };
});