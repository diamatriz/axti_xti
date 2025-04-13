-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS auth.send_test_email;
DROP FUNCTION IF EXISTS auth.send_confirmation_email;

-- Create the send_test_email function
CREATE OR REPLACE FUNCTION auth.send_test_email(email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  template_id uuid;
  template_content text;
  response jsonb;
BEGIN
  -- Get the test email template
  SELECT id, content INTO template_id, template_content
  FROM auth.email_templates
  WHERE template_id = 'confirm'
  LIMIT 1;

  -- Call the Edge Function
  SELECT content::jsonb INTO response
  FROM http_post(
    'https://pgaypklckjbiozsgboil.supabase.co/functions/v1/smart-function',
    jsonb_build_object(
      'action', 'send_email',
      'from', 'Axtixti <onboarding@resend.dev>',
      'to', email,
      'subject', 'Test Email',
      'html', template_content
    )::text,
    'application/json',
    ARRAY[
      ('Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'))::http_header
    ]
  );

  -- Log the response
  RAISE NOTICE 'Email sent: %', response;
END;
$$;

-- Create the send_confirmation_email function
CREATE OR REPLACE FUNCTION auth.send_confirmation_email(user_id uuid, email text, token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  template_id uuid;
  template_content text;
  response jsonb;
BEGIN
  -- Get the confirmation email template
  SELECT id, content INTO template_id, template_content
  FROM auth.email_templates
  WHERE template_id = 'confirm'
  LIMIT 1;

  -- Replace placeholders in the template
  template_content := replace(template_content, '{{ .Token }}', token);

  -- Call the Edge Function
  SELECT content::jsonb INTO response
  FROM http_post(
    'https://pgaypklckjbiozsgboil.supabase.co/functions/v1/smart-function',
    jsonb_build_object(
      'action', 'send_email',
      'from', 'Axtixti <onboarding@resend.dev>',
      'to', email,
      'subject', 'Подтверждение регистрации на Axtixti',
      'html', template_content
    )::text,
    'application/json',
    ARRAY[
      ('Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'))::http_header
    ]
  );

  -- Log the response
  RAISE NOTICE 'Confirmation email sent: %', response;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION auth.send_test_email TO service_role;
GRANT EXECUTE ON FUNCTION auth.send_confirmation_email TO service_role; 