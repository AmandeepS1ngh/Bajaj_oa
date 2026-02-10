const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function askGemini(question) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const sanitized = question.replace(/<[^>]*>/g, '').trim().substring(0, 500);
    if (!sanitized) {
        throw new Error('AI question must not be empty');
    }

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Answer the following question in exactly one word. Do not include any punctuation, explanation, or extra text. Only reply with a single word.\n\nQuestion: ${sanitized}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0,
                    maxOutputTokens: 256,
                    thinkingConfig: {
                        thinkingBudget: 128
                    }
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000
            }
        );

        const parts = response.data?.candidates?.[0]?.content?.parts || [];
        const textPart = parts.find(p => p.text && !p.thought);
        const text = textPart?.text;
        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        return text.trim().replace(/[.,!?;:'"]+$/g, '').trim();
    } catch (error) {
        if (error.response) {
            throw new Error(`Gemini API error: ${error.response.status} — ${error.response.data?.error?.message || 'Unknown error'}`);
        }
        if (error.code === 'ECONNABORTED') {
            throw new Error('Gemini API request timed out');
        }
        throw error;
    }
}

module.exports = { askGemini };
