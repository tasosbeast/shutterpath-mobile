import { useState, useEffect } from "react";
import { DailyPrompt } from "../types/prompt";

interface UseDailyPromptResult {
  prompt: DailyPrompt | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Mock data - will be replaced with real API call later
const MOCK_PROMPT: DailyPrompt = {
  id: "1",
  title: "Golden Hour Light",
  description:
    "Capture the warm, soft light during the first hour after sunrise or the last hour before sunset. Pay attention to how the light creates long shadows and gives everything a golden glow.",
  availableFrom: new Date().toISOString(),
};

export const useDailyPrompt = (): UseDailyPromptResult => {
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompt = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // TODO: Replace with actual API call
      // const response = await fetch('/prompts/today');
      // const data = await response.json();
      // setPrompt(data);

      setPrompt(MOCK_PROMPT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prompt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompt();
  }, []);

  return {
    prompt,
    loading,
    error,
    refetch: fetchPrompt,
  };
};
