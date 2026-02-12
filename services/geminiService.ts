import { GoogleGenAI } from "@google/genai";
import { ToneType } from "../types";

let ai: any = new GoogleGenAI({ apiKey: process.env.API_KEY });
// Only instantiate the server-side client when not running in a browser.
// Creating the client in the browser will throw if an API key isn't present
// (and exposing an API key in frontend code is insecure). Keep `ai` null
// in the browser so functions can return safe fallbacks instead of crashing.
if (typeof window === "undefined" && process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateLixiWish = async (
  recipient: string,
  tone: ToneType,
  senderName: string
): Promise<string> => {
  try {
    const prompt = `
      Bạn là một chuyên gia tạo lời chúc Tết Nguyên Đán (Lì xì) cực kỳ sáng tạo và thú vị.
      Hãy viết một lời chúc Tết ngắn gọn (dưới 50 từ) dành cho: "${recipient}".
      Người gửi là: "${senderName}".
      Phong cách/Giọng điệu: "${tone}".
      
      Yêu cầu:
      - Nếu là giọng hài hước, hãy dùng từ ngữ gen Z, trend, vui vẻ.
      - Nếu là thơ, hãy gieo vần cho hay.
      - Có chứa emoji phù hợp.
      - Output chỉ là nội dung lời chúc, không cần dẫn dắt.
    `;

    if (!ai) {
      console.warn("AI client unavailable in browser — returning fallback wish.");
      return "Chúc mừng năm mới! Vạn sự như ý!";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Chúc mừng năm mới! Vạn sự như ý!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return `Năm mới tưng bừng, chúc ${recipient} vạn sự như ý!`;
  }
};

export const generateRandomFortune = async (): Promise<string> => {
  try {
    const prompt = `
      Hãy đưa ra một dự đoán vui (bói vui) về vận mệnh năm mới cho người dùng. 
      Ngắn gọn, hài hước, tích cực. Dưới 30 từ.
      Ví dụ: "Năm nay tình tiền đều đỏ, cẩn thận chó rượt."
    `;

    if (!ai) {
      console.warn("AI client unavailable in browser — returning fallback fortune.");
      return "Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.";
  } catch (error) {
    console.error("Error generating fortune:", error);
    return "Năm nay chắc chắn sẽ là một năm tuyệt vời!";
  }
};
