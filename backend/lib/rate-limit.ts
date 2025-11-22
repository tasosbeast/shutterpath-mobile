import { supabase } from "./supabase";

/**
 * Check if user has exceeded rate limit for critique endpoint
 * Returns true if user can make a request, false if rate limited
 */
export async function checkCritiqueRateLimit(userId: string): Promise<boolean> {
  const twentyFourHoursAgo = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("photo_critiques")
    .select("id")
    .eq("user_id", userId)
    .gte("requested_at", twentyFourHoursAgo)
    .limit(1);

  if (error) {
    console.error("Rate limit check error:", error);
    return false;
  }

  // If no records found in last 24h, user can make request
  return !data || data.length === 0;
}

/**
 * Record a critique request for rate limiting
 */
export async function recordCritiqueRequest(
  userId: string,
  imageUrl: string,
  strengths: string[],
  improvements: string[],
  tip: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("photo_critiques").insert({
    user_id: userId,
    image_url: imageUrl,
    strengths,
    improvements,
    tip,
    requested_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to record critique:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
