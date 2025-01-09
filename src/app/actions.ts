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

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode chunk data
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Proses setiap baris
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Simpan baris yang belum selesai

        for (const line of lines) {
          if (line.trim() === "") continue;

          try {
            // Parse JSON dari baris yang dimulai dengan "data:"
            if (line.startsWith("data:")) {
              const data = JSON.parse(line.slice(5).trim());

              // Jika event adalah "message" dan ada field "answer"
              if (data.event === "message" && data.answer) {
                // Kirim hanya delta (konten baru) ke frontend
                stream.update(data.answer);
              }
            }
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
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