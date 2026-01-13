
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, MessageRole } from "../types.ts";

export const SYSTEM_INSTRUCTION = `You are the Areva Automation Senior AI Consultant. 
Areva Automation is a world leader in 4-Way Pallet Shuttle (Taxi™) technology.

Technical Specs:
- Areva Taxi™: Autonomous 4-way navigation.
- VTU: High-speed Z-axis lifts.
- Reach: Ambient to -30°C.
- Benefit: Up to 80% more density.

Role: Provide technical, professional advice. Use Google Search to find recent news about Areva or industry trends. 
Always cite sources if Google Search grounding is used. Keep answers professional and data-driven.`;

export const getWarehouseAdvice = async (history: ChatMessage[], message: string): Promise<string> => {
// Replace the process.env line with this:
const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY || "");  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }] },
        ...history.map(msg => ({
          role: msg.role === MessageRole.MODEL ? 'model' as const : 'user' as const,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    let output = response.text || "Analyzing system data...";
    
    // Process grounding chunks if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const urls = Array.from(new Set(
        chunks.map((c: any) => c.web?.uri).filter((u: any) => u)
      ));
      if (urls.length > 0) {
        output += "\n\nSources & References:\n" + urls.map(u => `- ${u}`).join('\n');
      }
    }

    return output;
  } catch (error) {
    console.error("Gemini Consulting Fault:", error);
    return "The Areva Expert Core is currently recalibrating. Please contact our support team for urgent technical inquiries.";
  }
};
