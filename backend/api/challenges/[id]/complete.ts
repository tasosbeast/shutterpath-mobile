import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../../lib/supabase";
import { requireAuth } from "../../../lib/auth";
import {
  successResponse,
  unauthorized,
  badRequest,
  internalError,
} from "../../../lib/responses";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: { code: "BAD_REQUEST", message: "Method not allowed" } });
  }

  // Require authentication
  const userId = await requireAuth(req);
  if (!userId) {
    return unauthorized(res);
  }

  // Get challenge ID from URL
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return badRequest(res, "Invalid challenge ID");
  }

  // Get optional notes from body
  const { notes } = req.body;

  try {
    // Record challenge completion
    const { error: completionError } = await supabase
      .from("challenge_completions")
      .insert({
        user_id: userId,
        challenge_id: id,
        notes: notes || null,
        completed_at: new Date().toISOString(),
      });

    if (completionError) {
      console.error("Error completing challenge:", completionError);
      return internalError(res, "Failed to complete challenge");
    }

    // Update user's streak
    // Get completion dates for this user
    const { data: completions, error: fetchError } = await supabase
      .from("challenge_completions")
      .select("completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching completions:", fetchError);
      // Don't fail the request, just return without streak update
      return successResponse(res, {
        completed_at: new Date().toISOString(),
        streak_days: 0,
      });
    }

    // Calculate streak (consecutive days)
    let streakDays = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const uniqueDates = new Set(
      completions.map((c) => new Date(c.completed_at).toDateString())
    );

    const sortedDates = Array.from(uniqueDates)
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (sortedDates[i].getTime() === expectedDate.getTime()) {
        streakDays++;
      } else {
        break;
      }
    }

    // Update user's streak in database
    await supabase
      .from("users")
      .update({
        streak_days: streakDays,
        last_activity_date: new Date().toISOString().split("T")[0],
      })
      .eq("id", userId);

    return successResponse(res, {
      completed_at: new Date().toISOString(),
      streak_days: streakDays,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
