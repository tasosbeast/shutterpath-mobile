import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase";
import { requireAuth } from "../lib/auth";
import { successResponse, unauthorized, internalError } from "../lib/responses";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: { code: "BAD_REQUEST", message: "Method not allowed" } });
  }

  // Require authentication
  const userId = await requireAuth(req);
  if (!userId) {
    return unauthorized(res);
  }

  try {
    // Get user basic info
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, username, avatar_url, streak_days, last_activity_date")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return internalError(res, "Failed to fetch profile");
    }

    // Get saved prompts
    const { data: savedPrompts, error: promptsError } = await supabase
      .from("user_saved_prompts")
      .select(
        `
        id,
        prompt:prompts(id, title, available_from)
      `
      )
      .eq("user_id", userId)
      .order("saved_at", { ascending: false });

    if (promptsError) {
      console.error("Error fetching saved prompts:", promptsError);
    }

    // Get saved challenges
    const { data: savedChallenges, error: challengesError } = await supabase
      .from("user_saved_challenges")
      .select(
        `
        id,
        challenge:challenges(id, title, difficulty)
      `
      )
      .eq("user_id", userId)
      .order("saved_at", { ascending: false });

    if (challengesError) {
      console.error("Error fetching saved challenges:", challengesError);
    }

    // Calculate longest streak from completions
    const { data: completions } = await supabase
      .from("challenge_completions")
      .select("completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false });

    let longestStreak = 0;
    if (completions && completions.length > 0) {
      const uniqueDates = new Set(
        completions.map((c) => new Date(c.completed_at).toDateString())
      );

      const sortedDates = Array.from(uniqueDates)
        .map((d) => new Date(d))
        .sort((a, b) => b.getTime() - a.getTime());

      let currentStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const diff = Math.floor(
          (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (diff === 1) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, currentStreak);
    }

    return successResponse(res, {
      user: {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
      },
      saved_prompts: (savedPrompts || []).map((sp) => ({
        id: sp.prompt.id,
        title: sp.prompt.title,
        available_from: sp.prompt.available_from,
      })),
      saved_challenges: (savedChallenges || []).map((sc) => ({
        id: sc.challenge.id,
        title: sc.challenge.title,
        difficulty: sc.challenge.difficulty,
      })),
      streak: {
        current: user.streak_days || 0,
        longest: longestStreak,
        last_activity_date: user.last_activity_date,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
