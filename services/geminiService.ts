
import { GoogleGenAI } from "@google/genai";

export const getProposalInsights = async (userQuery: string, proposalData: string) => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class security consultant and ELV engineer. 
          The following is a proposal for The Sustainable City (TSC) in Dubai. 
          Answer questions based strictly on this proposal data.
          
          PROPOSAL DATA:
          ${proposalData}
          
          USER QUESTION:
          ${userQuery}`,
      config: {
        systemInstruction: "You are an expert in SIRA (Security Industry Regulatory Agency) Dubai standards and ELV systems. Be concise, professional, and helpful.",
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI consultant is currently unavailable. Please check the proposal details manually.";
  }
};
