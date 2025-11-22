import { useState, useEffect } from "react";
import { DailyPrompt } from "../types/prompt";
import { api } from "../lib/api";

interface UseDailyPromptResult {
  prompt: DailyPrompt | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDailyPrompt = (): UseDailyPromptResult => {
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompt = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.prompts.getToday();

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data) {
        setPrompt(response.data.prompt);
      }
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
