"use client";

import { useState } from "react";
import { continueConversation, Message } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const { messages, newMessage } = await continueConversation([
        ...conversation,
        userMessage,
      ]);

      let textContent = "";
for await (const delta of readStreamableValue(newMessage)) {
  textContent += delta; // Tambahkan delta ke konten sebelumnya
  setConversation([
    ...messages,
    { role: "assistant", content: textContent },
  ]);
}
    } catch (error) {
      console.error("Error in conversation:", error);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-4">
          <ScrollArea className="h-[60vh] pr-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "mb-4 p-4 rounded-lg animate-in fade-in-50",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                    : "bg-muted max-w-[80%]"
                )}
              >
                {message.content}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

