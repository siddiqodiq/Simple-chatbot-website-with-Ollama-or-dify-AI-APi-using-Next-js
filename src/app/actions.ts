"use server";

import { createStreamableValue } from "ai/rsc";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    try {
      // Konversi history ke format yang diharapkan oleh Dify AI
      const userMessage = history[history.length - 1].content;

      // Kirim permintaan ke API Dify AI
      const response = await fetch("http://localhost/v1/chat-messages", {
        method: "POST",
        headers: {
          "Authorization": "Bearer app-70fiCwaJ2cSrWJMsOwy28GA9", // Ganti dengan API key Anda
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {}, // Input tambahan (jika ada)
          query: userMessage, // Pesan pengguna
          response_mode: "streaming", // Mode streaming
          conversation_id: "", // ID percakapan (opsional)
          user: "abc-123", // ID pengguna (opsional)
          files: [], // File (opsional)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Baca respons streaming
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Kirim chunk data mentah ke stream
        const chunk = new TextDecoder().decode(value);
        stream.update(chunk); // Update stream dengan chunk mentah
      }

      stream.done();
    } catch (error) {
      console.error("Error in continueConversation:", error);
      stream.update("Sorry, I encountered an error.");
      stream.done();
    }
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}