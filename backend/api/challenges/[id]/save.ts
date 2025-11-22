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

  // Get saved status from body
  const { saved } = req.body;
  if (typeof saved !== "boolean") {
    return badRequest(res, "Invalid request body. Expected { saved: boolean }");
  }

  try {
    if (saved) {
      // Save the challenge
      const { error } = await supabase.from("user_saved_challenges").insert({
        user_id: userId,
        challenge_id: id,
      });

      if (error) {
        // Ignore duplicate key errors (already saved)
        if (error.code !== "23505") {
          console.error("Error saving challenge:", error);
          return internalError(res, "Failed to save challenge");
        }
      }
    } else {
      // Unsave the challenge
      const { error } = await supabase
        .from("user_saved_challenges")
        .delete()
        .eq("user_id", userId)
        .eq("challenge_id", id);

      if (error) {
        console.error("Error unsaving challenge:", error);
        return internalError(res, "Failed to unsave challenge");
      }
    }

    return successResponse(res, { saved });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
