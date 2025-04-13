import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Получаем токен из заголовка
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid token');
    }

    const { action, ...params } = await req.json();

    if (action === 'send_email') {
      const { to, subject, html } = params;
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      const { data, error } = await resend.emails.send({
        from: 'Axtixti <onboarding@resend.dev>',
        to,
        subject: subject || 'Welcome to Axtixti',
        html: html || '<p>Welcome to Axtixti!</p>'
      });

      if (error) {
        return new Response(JSON.stringify({
          error: error.message
        }), {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    if (action === 'get_profile') {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    if (action === 'update_profile') {
      const { username, avatar_url } = params;

      const { data, error } = await supabaseClient
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          avatar_url,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}); 