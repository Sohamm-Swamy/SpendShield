// SpendShield edge function: analyze
// Phase 1 placeholder. The Gemini call lands in Phase 2.
//
// Deploy:
//   supabase functions deploy analyze --no-verify-jwt
// Secrets:
//   supabase secrets set GEMINI_API_KEY=...

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

  if (!geminiApiKey) {
    return json(
      {
        error: 'GEMINI_API_KEY is not set on this function.',
        hint: 'Run: supabase secrets set GEMINI_API_KEY=<key>',
      },
      500
    );
  }

  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Request body must be JSON.' }, 400);
  }

  return json({
    status: 'placeholder',
    message:
      'Phase 1 placeholder. Gemini wiring arrives in Phase 2.',
    received: payload,
    geminiConfigured: true,
  });
});