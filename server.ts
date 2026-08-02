import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for GoogleGenAI to ensure server startup never crashes if key is initially empty
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'KINETIC STRENGTH API', time: new Date().toISOString() });
});

// 1. AI Workout Plan Generator
app.post('/api/ai/workout-plan', async (req, res) => {
  try {
    const { goal, level, split, daysPerWeek, equipment, focusAreas, injuries } = req.body;
    const ai = getGeminiClient();

    const prompt = `You are the Head Strength & Conditioning Director at KINETIC STRENGTH, an ultra-premium high-performance gym.
Create an elite, ultra-detailed weekly training program.
Client Profile:
- Goal: ${goal || 'Muscle Hypertrophy'}
- Experience Level: ${level || 'Intermediate'}
- Program Split: ${split || 'Push/Pull/Legs'}
- Training Days per Week: ${daysPerWeek || 4}
- Equipment Available: ${equipment || 'Full Commercial Gym'}
- Special Focus Areas: ${focusAreas || 'Chest & Arms'}
- Injuries/Constraints: ${injuries || 'None'}

Return a structured JSON program following the schema with precise sets, reps, rest periods (in seconds), tempo cues, and target muscle guidance.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite master strength coach who creates science-backed, high-yield hypertrophy and conditioning programs.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            goal: { type: Type.STRING },
            level: { type: Type.STRING },
            split: { type: Type.STRING },
            weeklyOverview: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayName: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  exercises: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        sets: { type: Type.NUMBER },
                        reps: { type: Type.STRING },
                        restSeconds: { type: Type.NUMBER },
                        tempo: { type: Type.STRING },
                        formNotes: { type: Type.STRING },
                        targetMuscle: { type: Type.STRING },
                      },
                      required: ['name', 'sets', 'reps', 'restSeconds', 'formNotes', 'targetMuscle'],
                    },
                  },
                  cardioFinisher: { type: Type.STRING },
                },
                required: ['dayName', 'focus', 'exercises'],
              },
            },
            recoveryTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['title', 'goal', 'level', 'split', 'weeklyOverview', 'days', 'recoveryTips'],
        },
      },
    });

    const jsonText = response.text ? response.text.trim() : '{}';
    const plan = JSON.parse(jsonText);
    res.json({ success: true, plan });
  } catch (err: any) {
    console.error('Workout Plan AI Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate AI workout plan' });
  }
});

// 2. AI Diet & Macro Plan Generator
app.post('/api/ai/diet-plan', async (req, res) => {
  try {
    const { goal, weightKg, heightCm, age, gender, dietType, allergies } = req.body;
    const ai = getGeminiClient();

    const prompt = `You are Chief Sports Clinical Nutritionist at KINETIC STRENGTH.
Create a hyper-personalized daily macro and meal blueprint.
Client Info:
- Primary Goal: ${goal || 'Lean Muscle Gain & Fat Loss'}
- Weight: ${weightKg || 80} kg
- Height: ${heightCm || 180} cm
- Age: ${age || 28}
- Gender: ${gender || 'Male'}
- Dietary Preference: ${dietType || 'High Protein Clean Eating'}
- Allergies/Restrictions: ${allergies || 'None'}

Return a precise JSON meal plan with calculated daily calories, exact macro split (protein, carbs, fats in grams), 4 structured meals, hydration requirements, and a targeted Kinetic supplement stack.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            dailyCalories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              },
              required: ['protein', 'carbs', 'fats'],
            },
            hydrationLiters: { type: Type.NUMBER },
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mealName: { type: Type.STRING },
                  time: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  proteinGrams: { type: Type.NUMBER },
                  carbsGrams: { type: Type.NUMBER },
                  fatsGrams: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['mealName', 'time', 'calories', 'proteinGrams', 'carbsGrams', 'fatsGrams', 'description', 'ingredients'],
              },
            },
            supplementStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['title', 'dailyCalories', 'macros', 'hydrationLiters', 'meals', 'supplementStack'],
        },
      },
    });

    const jsonText = response.text ? response.text.trim() : '{}';
    const plan = JSON.parse(jsonText);
    res.json({ success: true, plan });
  } catch (err: any) {
    console.error('Diet Plan AI Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate AI diet plan' });
  }
});

// 3. AI Pose & Form Analyzer
app.post('/api/ai/form-analyzer', async (req, res) => {
  try {
    const { exercise, description, imageDataBase64 } = req.body;
    const ai = getGeminiClient();

    let parts: any[] = [];
    if (imageDataBase64) {
      // Remove header if present
      const cleanBase64 = imageDataBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    parts.push({
      text: `Analyze this lift execution and biomechanics for exercise: ${exercise}.
User Notes / Observations: ${description || 'Checking squat depth, spinal alignment, knees tracking over toes, bar path.'}

Perform a biometric biomechanics assessment. Score the form from 0 to 100, assign status ('OPTIMAL', 'GOOD', 'NEEDS_CORRECTION', 'INJURY_RISK'), outline key critiques, joint alignment notes, and corrective accessory drills.`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            exercise: { type: Type.STRING },
            overallScore: { type: Type.NUMBER },
            status: { type: Type.STRING },
            keyCritiques: { type: Type.ARRAY, items: { type: Type.STRING } },
            jointAlignmentNotes: { type: Type.STRING },
            correctiveDrills: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['exercise', 'overallScore', 'status', 'keyCritiques', 'jointAlignmentNotes', 'correctiveDrills'],
        },
      },
    });

    const jsonText = response.text ? response.text.trim() : '{}';
    const analysis = JSON.parse(jsonText);
    res.json({ success: true, analysis });
  } catch (err: any) {
    console.error('Form Analyzer Error:', err);
    res.status(500).json({ error: err.message || 'Failed to analyze exercise form' });
  }
});

// 4. Interactive Master Trainer Chat
app.post('/api/ai/trainer-chat', async (req, res) => {
  try {
    const { messages } = req.body; // Array of { role: 'user' | 'model', text: string }
    const ai = getGeminiClient();

    const formattedHistory = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const lastMessage = formattedHistory.pop()?.parts[0]?.text || 'Hello coach!';

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction: `You are Coach Vance, Master Head Trainer at KINETIC STRENGTH.
You speak with authoritative, motivating, elite sports-science expertise.
Your advice is high-yield, precise, encouraging, and focused on progressive overload, recovery, intra-workout fueling, and posture biomechanics. Keep responses structured, punchy, and ultra-professional.`,
      },
      history: formattedHistory,
    });

    const result = await chat.sendMessage({ message: lastMessage });
    res.json({ success: true, reply: result.text });
  } catch (err: any) {
    console.error('Trainer Chat AI Error:', err);
    res.status(500).json({ error: err.message || 'Trainer Chat endpoint failed' });
  }
});

// ----------------------------------------------------
// SERVER STARTUP & VITE MIDDLEWARE
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, 'localhost', () => {
    console.log(`⚡ KINETIC STRENGTH Server running at http://localhost:${PORT}`);
  });
}

startServer();
