import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../lib/supabase";
import { requireAuth } from "../../lib/auth";
import {
  successResponse,
  unauthorized,
  notFound,
  internalError,
} from "../../lib/responses";

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
    // Get today's challenge using the view
    const { data, error } = await supabase
      .from("daily_challenge_view")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching daily challenge:", error);

      // If no challenge found for today
      if (error.code === "PGRST116") {
        return notFound(res, "No challenge available for today");
      }

      return internalError(res, "Failed to fetch daily challenge");
    }

    // Transform to match API spec format
    const challenge = {
      id: data.id,
      title: data.title,
      description: data.description,
      focus_points: data.focus_points || [],
      difficulty: data.difficulty,
    };

    return successResponse(res, { challenge });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
