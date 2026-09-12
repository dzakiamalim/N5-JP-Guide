import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// Japanese Text-to-Speech audio stream endpoint
app.get('/api/tts', async (req, res) => {
  try {
    const rawText = (req.query.text as string) || '';
    const cleanText = rawText
      .replace(/[\(\[\{][^()]*[\)\]\}]/g, '') // remove bracketed furigana/romaji
      .trim();

    if (!cleanText) {
      res.status(400).send('Text parameter is required');
      return;
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/'
      }
    });

    if (!response.ok) {
      res.status(response.status).send('TTS upstream failure');
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error('TTS Proxy error:', err);
    res.status(500).send('Failed to fetch audio speech');
  }
});

// AI Sensei Q&A & Sentence Breakdown endpoint
app.post('/api/sensei', async (req, res) => {
  try {
    const { message, type = 'ask' } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'A message prompt is required.' });
      return;
    }

    const ai = getAI();
    if (!ai) {
      // Fallback offline responses for common questions so user gets immediate help even without API key
      const lower = message.toLowerCase();
      let fallbackAnswer =
        'Hello! I am your Japanese Sensei. To unlock custom real-time AI responses, ensure your GEMINI_API_KEY is connected in Settings > Secrets. In the meantime, remember the fundamental rule: Japanese verbs always sit at the end of the sentence (SOV)!';

      if (lower.includes('wa') && lower.includes('ga') || lower.includes('は') && lower.includes('が')) {
        fallbackAnswer =
          '**は vs が Quick Breakdown:**\n- **は (wa)** is the **Topic Marker** ("As for X...", setting the stage for what we are already talking about).\n- **が (ga)** is the **Subject Marker** ("X and none other", presenting new information or emphasizing WHO/WHAT did it).\nExample: 私は猫が好きです (As for me [topic は], cats are liked [subject が]).';
      } else if (lower.includes('masu') || lower.includes('ます')) {
        fallbackAnswer =
          '**The 4 Masu Quadrants:**\n- ~ます (Affirmative Present/Future): たべます (I eat / will eat)\n- ~ません (Negative Present): たべません (I do not eat)\n- ~ました (Affirmative Past): たべました (I ate)\n- ~ませんでした (Negative Past): たべませんでした (I did not eat)';
      } else if (lower.includes('n5') || lower.includes('roadmap') || lower.includes('pass')) {
        fallbackAnswer =
          '**To pass JLPT N5 in 60-90 days:**\n1. Master Hiragana & Katakana in Week 1-2.\n2. Learn ~100 core Kanji (numbers, days, people, directions).\n3. Learn ~800 core vocabulary words using our flashcard decks.\n4. Master particles (は, が, を, に, で, へ, と) and the Masu + Te forms!';
      }

      res.json({
        reply: fallbackAnswer,
        modelUsed: 'offline-fallback'
      });
      return;
    }

    const systemInstruction = `You are a supportive, friendly Japanese Sensei (tutor) for absolute beginners aiming to pass the JLPT N5 exam.
Guidelines:
1. Explain grammatical rules with utmost clarity, using simple analogies.
2. Provide Japanese text accompanied by Furigana (in parentheses or ruby format) and Romaji so complete beginners can read every character.
3. Break down sentences into color-like visual tokens: [Topic/Subject] [Particle] [Object] [Verb].
4. Always highlight common beginner pitfalls (e.g., confusing は and が, or で and に).
5. Keep explanations encouraging, concise, and practically oriented toward real communication and the N5 test format.`;

    const prompt = type === 'breakdown'
      ? `Please break down this Japanese sentence for an absolute beginner studying for JLPT N5. Provide word-by-word analysis, particle explanations, furigana, romaji, natural English translation, and key grammar notes:\n"${message}"`
      : message;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text || 'I could not generate an explanation at this moment. Please try again!';
    res.json({ reply, modelUsed: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Sensei API Error:', error);
    res.status(500).json({
      error: 'Sensei is temporarily resting. Please try again in a moment.',
      details: error?.message
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sensei Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
