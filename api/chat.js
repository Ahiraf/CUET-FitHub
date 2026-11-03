const DEFAULT_GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai';
const DEFAULT_MODEL = 'gemini-2.5-flash';

function getProviders() {
  const geminiBaseUrl = (process.env.AI_BASE_URL || DEFAULT_GEMINI_BASE_URL).replace(/\/+$/, '');
  const model = process.env.AI_MODEL || DEFAULT_MODEL;
  const providers = ['GEMINI_API_KEY_1', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3']
    .map((keyName) => ({ keyName, key: process.env[keyName], baseUrl: geminiBaseUrl, model }))
    .filter((provider) => provider.key);

  if (process.env.OPENAI_API_KEY) {
    providers.push({
      keyName: 'OPENAI_API_KEY',
      key: process.env.OPENAI_API_KEY,
      baseUrl: 'https://api.openai.com/v1',
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    });
  }
  return providers;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = request.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: 'A messages array is required.' });
  }

  const providers = getProviders();
  if (!providers.length) {
    return response.status(503).json({ error: 'No AI provider keys are configured.' });
  }

  let lastError = 'All AI providers failed.';
  for (const provider of providers) {
    try {
      const result = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${provider.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.7,
          max_tokens: 700,
        }),
      });

      if (!result.ok) {
        lastError = `${provider.keyName} returned ${result.status}`;
        continue;
      }

      const data = await result.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) {
        lastError = `${provider.keyName} returned an empty response`;
        continue;
      }

      return response.status(200).json({ content, provider: provider.keyName });
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown provider error';
    }
  }

  return response.status(502).json({ error: lastError });
}
