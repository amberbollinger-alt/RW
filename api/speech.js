const MAX_TEXT_LENGTH = 3000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const OPENAI_TIMEOUT_MS = 25_000;
const requestWindows = new Map();

function cleanText(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH) : '';
}

function parseBody(body) {
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return body && typeof body === 'object' ? body : {};
}

function clientKey(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function isRateLimited(req) {
  const key = clientKey(req);
  const now = Date.now();
  const recent = (requestWindows.get(key) || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestWindows.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (isRateLimited(req)) return res.status(429).json({ error: 'Sage needs a brief pause before speaking again.' });

  const text = cleanText(parseBody(req.body).text);
  if (!text) return res.status(400).json({ error: 'No narration text was provided.' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Sage voice is not configured yet.' });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
        voice: process.env.OPENAI_TTS_VOICE || 'coral',
        input: text,
        instructions: 'Speak as Sage: a warm, grounded adult woman and trusted financial-learning guide. Sound natural and human, never robotic. Use calm confidence, conversational pacing, gentle emphasis, and brief natural pauses. Avoid theatrical performance, sales energy, or judgment.',
        response_format: 'mp3',
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('OpenAI speech error', response.status, detail.slice(0, 300));
      return res.status(response.status === 429 ? 429 : 502).json({ error: 'Sage voice is temporarily unavailable.' });
    }
    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'private, no-store');
    return res.status(200).send(audio);
  } catch (error) {
    console.error('Sage speech request failed', error?.name || error);
    return res.status(error?.name === 'AbortError' ? 504 : 502).json({ error: 'Sage voice is temporarily unavailable.' });
  } finally {
    clearTimeout(timeout);
  }
}
