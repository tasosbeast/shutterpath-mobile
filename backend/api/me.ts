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
    // Get user profile
    const { data: user, error } = await supabase
      .from("users")
      .select(
        "id, email, username, avatar_url, plan, streak_days, last_activity_date"
      )
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return internalError(res, "Failed to fetch user profile");
    }

    return successResponse(res, {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
      plan: user.plan,
      streak_days: user.streak_days,
      last_activity_date: user.last_activity_date,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
