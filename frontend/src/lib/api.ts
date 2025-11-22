import { supabase } from "./supabase";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

// Helper to get auth token
async function getAuthToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
}

// Helper for authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Request failed");
  }

  return response.json();
}

// Authentication
export const auth = {
  async signup(email: string, password: string, username?: string) {
    return fetchWithAuth("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    });
  },

  async login(email: string, password: string) {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async getMe() {
    return fetchWithAuth("/me");
  },
};

// Daily Content
export const prompts = {
  async getToday() {
    return fetchWithAuth("/prompts/today");
  },

  async save(id: string, saved: boolean) {
    return fetchWithAuth(`/prompts/${id}/save`, {
      method: "POST",
      body: JSON.stringify({ saved }),
    });
  },
};

export const challenges = {
  async getToday() {
    return fetchWithAuth("/challenges/today");
  },

  async save(id: string, saved: boolean) {
    return fetchWithAuth(`/challenges/${id}/save`, {
      method: "POST",
      body: JSON.stringify({ saved }),
    });
  },

  async complete(id: string, notes?: string) {
    return fetchWithAuth(`/challenges/${id}/complete`, {
      method: "POST",
      body: JSON.stringify({ notes }),
    });
  },
};

// Profile
export const profile = {
  async get() {
    return fetchWithAuth("/profile");
  },
};

// AI Critique
export const critique = {
  async submit(imageUrl: string) {
    return fetchWithAuth("/critique", {
      method: "POST",
      body: JSON.stringify({ image_url: imageUrl }),
    });
  },

  async submitBase64(imageBase64: string) {
    return fetchWithAuth("/critique", {
      method: "POST",
      body: JSON.stringify({ image_base64: imageBase64 }),
    });
  },
};

// Analytics
export const analytics = {
  async recordEvent(
    eventType: "prompt_view" | "challenge_complete" | "critique_used",
    entityType?: string,
    entityId?: string,
    metadata?: Record<string, any>
  ) {
    return fetchWithAuth("/events", {
      method: "POST",
      body: JSON.stringify({
        event_type: eventType,
        entity_type: entityType,
        entity_id: entityId,
        metadata,
      }),
    });
  },
};

// Export all as api object
export const api = {
  auth,
  prompts,
  challenges,
  profile,
  critique,
  analytics,
};
