import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStudySummary(content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize the following study notes for a student. Use bullet points and clear headings:
    
    ${content}`,
    config: {
      systemInstruction: "You are a helpful AI study assistant. Your goal is to help students learn faster and more effectively.",
    }
  });
  return response.text;
}

export async function explainTopic(topic: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain "${topic}" in simple terms for a student. Include key concepts and real-world examples.`,
    config: {
      systemInstruction: "You are a helpful AI study assistant. Your goal is to help students learn faster and more effectively.",
    }
  });
  return response.text;
}

export async function generateTasksFromTranscript(transcript: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract potential assignments or tasks from the following text and return them in a clear list:
    
    ${transcript}`,
  });
  return response.text;
}
