import { GoogleGenAI, Type } from "@google/genai";
import { Article, QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: "The multiple-choice question."
            },
            options: {
                type: Type.ARRAY,
                description: "An array of 4 possible answers.",
                items: { type: Type.STRING }
            },
            correctAnswer: {
                type: Type.STRING,
                description: "The correct answer from the options array."
            }
        },
        required: ["question", "options", "correctAnswer"]
    }
};

export const simplifyArticle = async (originalText: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Simplify the following news article: "${originalText}"`,
            config: {
                systemInstruction: `You are an assistant that simplifies news articles. 
Your primary rule: **Never change the meaning, facts, or intent of the article.**
Only simplify the language, sentence structure, and vocabulary so that:
- A 5-year-old child or a non-native speaker can understand.
- The story remains accurate, faithful, and unbiased.
- No key details are omitted, distorted, or exaggerated.
- Tone stays neutral and educational, never sensationalized.

Always output clear, short sentences with simple words, while keeping the information correct.`
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error simplifying article:", error);
        throw new Error("Failed to simplify article.");
    }
};

export const generateQuiz = async (simplifiedText: string): Promise<QuizQuestion[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on this simplified text, create exactly 3 easy multiple-choice questions for a 5-year-old. Each question must have 4 options. The text: "${simplifiedText}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            }
        });
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);

        // Basic validation
        if (!Array.isArray(quizData) || quizData.length !== 3) {
            throw new Error("Invalid quiz format received from API.");
        }
        return quizData as QuizQuestion[];

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz.");
    }
};

export const translateText = async (text: string, languageName: string): Promise<string> => {
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following text into ${languageName}. Keep the language simple and easy to understand for a child. Text: "${text}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error translating text:", error);
        throw new Error("Failed to translate text.");
    }
};

export const generateImagePrompt = async (originalText: string, simplifiedText: string): Promise<string> => {
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the original news article and its simplified version to understand the main subject and key event. Based on this, create a single, short, descriptive prompt for an AI image generator. The prompt should result in one child-friendly, colorful, and cute cartoon-style illustration that captures the essence of the entire story.

Original Article: "${originalText}"

Simplified Text: "${simplifiedText}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating image prompt:", error);
        throw new Error("Failed to generate image prompt.");
    }
};

export const generateIllustration = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating illustration:", error);
        throw new Error("Failed to generate illustration.");
    }
};


export const processArticleWithAI = async (originalText: string, title: string, category: Article['category']): Promise<Omit<Article, 'id'>> => {
    const simplifiedText = await simplifyArticle(originalText);
    const [quiz, illustrationPrompt] = await Promise.all([
        generateQuiz(simplifiedText),
        generateImagePrompt(originalText, simplifiedText)
    ]);
    const imageUrl = await generateIllustration(illustrationPrompt);

    return {
        title,
        originalText,
        simplifiedText,
        category,
        quiz,
        illustrationPrompt,
        imageUrl,
    };
};