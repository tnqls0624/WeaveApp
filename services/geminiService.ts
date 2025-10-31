
import { GoogleGenAI, Type } from "@google/genai";

interface ParsedEvent {
    title: string;
    date: string; // YYYY-MM-DD
    startTime?: string; // HH:mm
    endTime?: string; // HH:mm
}

export async function parseEventFromPrompt(prompt: string): Promise<ParsedEvent | null> {
    // FIX: Removed check for process.env.API_KEY and mock data fallback.
    // As per guidelines, the API key is assumed to be present.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Parse the following text into a structured event object. The current date is ${new Date().toDateString()}. If the date is relative (e.g., "tomorrow"), calculate the absolute date. Text: "${prompt}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "The title of the event." },
                        date: { type: Type.STRING, description: "The date of the event in YYYY-MM-DD format." },
                        startTime: { type: Type.STRING, description: "The optional start time of the event in 24-hour HH:mm format." },
                        endTime: { type: Type.STRING, description: "The optional end time of the event in 24-hour HH:mm format." }
                    },
                    required: ["title", "date"]
                },
            },
        });

        const jsonString = response.text.trim();
        const parsedObject = JSON.parse(jsonString);
        return parsedObject as ParsedEvent;

    } catch (error) {
        console.error("Error parsing event with Gemini API:", error);
        throw new Error("Failed to parse event details.");
    }
}