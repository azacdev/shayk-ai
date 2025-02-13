"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon } from "lucide-react";
import { motion } from "framer-motion";

import { StopIcon } from "./icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const promptSuggestions = [
  {
    title: "What are the",
    label: "pillars of Islam?",
    action: "What are the five pillars of Islam?",
  },
  {
    title: "Explain the",
    label: "significance of Ramadan",
    action: "Explain the significance of Ramadan in Islam",
  },
  {
    title: "What does Islam say about",
    label: "charity (Zakat)?",
    action: "What does Islam say about charity (Zakat)?",
  },
  {
    title: "Who are the",
    label: "major prophets in Islam?",
    action: "Who are the major prophets in Islam?",
  },
];

const Chat = () => {
  const {
    messages,
    handleSubmit,
    input,
    append,
    setInput,
    isLoading,
    stop,
    error,
  } = useChat({
    api: "/api/gemini",
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  );

  console.log("Input", input);

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    console.log("Submit");
    append({
      role: "user",
      content: suggestion,
    });
  };

  const submitForm = () => {
    if (!isLoading) {
      handleSubmit({
        preventDefault: () => {},
        target: { message: { value: input } },
      } as any);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl w-full mx-auto space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error.message}
        </div>
      )}
      <ScrollArea className="flex-grow border rounded-md p-4">
        {messages.length !== 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "assistant"
                  ? "pl-4 border-l-2 border-black dark:border-white"
                  : ""
              }`}
            >
              <span className="font-bold">
                {message.role === "user" ? "You: " : "AI: "}
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {message.content}
              </span>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            Send a message to start a conversation about Formula 1
          </div>
        )}
        {isLoading && (
          <div className="text-gray-500 animate-pulse pl-4 border-l-2 border-black dark:border-white rounded-full size-5" />
        )}
      </ScrollArea>

      {messages.length === 0 && (
        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {promptSuggestions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={`suggested-action-${suggestedAction.title}-${index}`}
              className={index > 1 ? "hidden sm:block" : "block"}
            >
              <Button
                variant="outline"
                onClick={() => handleSuggestionClick(suggestedAction.action)}
                size="sm"
                className={`text-sm text-left border rounded-xl px-4 py-3.5 flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start ${
                  selectedSuggestion === suggestedAction.action
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-muted-foreground">
                  {suggestedAction.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="relative flex space-x-2"
      >
        <Textarea
          placeholder="Send a message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedSuggestion(null);
          }}
          className={cn(
            "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
          )}
          rows={2}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              if (isLoading) {
                toast.error(
                  "Please wait for the model to finish its response!"
                );
              } else {
                submitForm();
              }
            }
          }}
        />

        <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
          {isLoading ? (
            <Button
              className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault();
                stop();
              }}
            >
              <StopIcon size={14} />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading || input.trim() === ""}
              className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
            >
              <ArrowUpIcon size={14} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Chat;
