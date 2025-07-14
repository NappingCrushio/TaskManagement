
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where the key might not be set.
  // In a real deployed application, this should not happen.
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestSubtasks = async (title: string, description: string): Promise<string[]> => {
  if (!API_KEY) return Promise.resolve([]);
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following task, break it down into smaller, actionable sub-tasks. Task Title: "${title}", Task Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A single, actionable sub-task.'
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.subtasks || [];
  } catch (error) {
    console.error("Error suggesting subtasks:", error);
    return [];
  }
};
