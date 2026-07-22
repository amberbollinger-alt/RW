import { rootOneDistricts } from '../src/root-one-data.js';

const MAX_MESSAGE_LENGTH = 700;
const MAX_HISTORY_ITEMS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const OPENAI_TIMEOUT_MS = 18_000;
const requestWindows = new Map();

const DISTRICTS = new Map(rootOneDistricts.map((district) => [district.key, district]));

function cleanText(value, maxLength = MAX_MESSAGE_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function parseBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body && typeof body === 'object' ? body : {};
}

function extractOutputText(response) {
  if (!Array.isArray(response?.output)) return '';

  return response.output
    .filter((item) => item?.type === 'message' && Array.isArray(item.content))
    .flatMap((item) => item.content)
    .filter((content) => content?.type === 'output_text' && typeof content.text === 'string')
    .map((content) => content.text.trim())
    .filter(Boolean)
    .join('\n\n');
}

function buildInstructions(districtKey) {
  const district = DISTRICTS.get(districtKey) || rootOneDistricts[0];
  const concepts = district.concepts
    .map((concept) => `${concept.title}: ${concept.body} In real life: ${concept.recognize}`)
    .join('\n');
  const choices = district.scenario.options
    .map((option) => `${option.label} — consequence: ${option.consequence} Course correction: ${option.correction}`)
    .join('\n');
  const story = Array.isArray(district.journey.story)
    ? district.journey.story.map((block) => `${block.type === 'sage' ? 'Sage: ' : block.speaker ? `${block.speaker}: ` : ''}${block.text}`).join('\n')
    : `${district.journey.arrival} ${district.journey.event}`;

  return `You are Sage, RootWise's trusted financial-learning companion. You are walking beside a learner in Root One: The City of Foundations.

Current chapter: ${district.title}
Theme: ${district.theme}
Chapter promise: ${district.promise}
Story setting: ${district.districtNote}
Ongoing Ivy and Eli story:
${story}
Financial parallel: ${district.rootRevealed.title}. ${district.rootRevealed.body}
The learner is considering: ${district.scenario.prompt}

Approved concept breakdowns:
${concepts}

Approved choices and recovery paths:
${choices}

Speak like a thoughtful friend, not a textbook or customer-service bot. Use direct, natural language at about a high-school reading level. Be thorough without repeating yourself. Keep financial terms accurate, then explain them in everyday words. Be warm, curious, concise, and lightly witty when it fits. Connect answers to the current chapter, Ivy and Eli's story, and a realistic everyday choice. Use the city only as a simple analogy when it makes the financial idea clearer. Do not stack city, root, and tree metaphors.

Never shame, diagnose, label, or presume the learner's income, debt, family, knowledge, or goals. Ask one clarifying question when personal facts would materially change the answer. Explain financial terms immediately in everyday words. When the learner is confused, change the explanation or analogy instead of repeating yourself.

RootWise provides education, not individualized financial, legal, tax, investment, or credit-repair advice. For high-stakes personal decisions, explain the general principle and encourage the learner to verify details with an appropriate qualified professional. Do not request account numbers, passwords, Social Security numbers, or other sensitive information.

Keep most replies between 80 and 180 words. End with either one useful question or one small action—not a list of generic follow-ups.`;
}

function clientKey(request) {
  const forwarded = request.headers?.['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return cleanText(raw?.split(',')[0], 80) || cleanText(request.socket?.remoteAddress, 80) || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  const current = requestWindows.get(key);

  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(clientKey(request))) {
    response.setHeader('Retry-After', '60');
    return response.status(429).json({ error: 'Sage needs a brief pause before answering again.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'Sage is not configured in this environment.' });
  }

  const body = parseBody(request.body);
  const message = cleanText(body.message);
  if (!message) {
    return response.status(400).json({ error: 'A question is required.' });
  }

  const history = Array.isArray(body.history)
    ? body.history
      .slice(-MAX_HISTORY_ITEMS)
      .map((item) => ({
        role: item?.role === 'assistant' ? 'assistant' : 'user',
        content: cleanText(item?.content),
      }))
      .filter((item) => item.content)
    : [];

  const input = [...history, { role: 'user', content: message }];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        instructions: buildInstructions(cleanText(body.district?.key, 40)),
        input,
        reasoning: { effort: 'low' },
        text: { verbosity: 'low' },
        max_output_tokens: 500,
        store: false,
      }),
      signal: controller.signal,
    });

    const payload = await openAIResponse.json().catch(() => ({}));
    if (!openAIResponse.ok) {
      console.error('OpenAI Responses API request failed', {
        status: openAIResponse.status,
        requestId: openAIResponse.headers.get('x-request-id'),
      });
      return response.status(502).json({ error: 'Sage could not answer right now.' });
    }

    const reply = extractOutputText(payload);
    if (!reply) {
      return response.status(502).json({ error: 'Sage returned an empty response.' });
    }

    return response.status(200).json({ reply });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return response.status(504).json({ error: 'Sage took too long to answer.' });
    }
    console.error('Sage request failed before completion', {
      name: error instanceof Error ? error.name : 'UnknownError',
    });
    return response.status(502).json({ error: 'Sage could not answer right now.' });
  } finally {
    clearTimeout(timeout);
  }
}
