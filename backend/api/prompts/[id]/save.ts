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

  // Get prompt ID from URL
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return badRequest(res, "Invalid prompt ID");
  }

  // Get saved status from body
  const { saved } = req.body;
  if (typeof saved !== "boolean") {
    return badRequest(res, "Invalid request body. Expected { saved: boolean }");
  }

  try {
    if (saved) {
      // Save the prompt
      const { error } = await supabase.from("user_saved_prompts").insert({
        user_id: userId,
        prompt_id: id,
      });

      if (error) {
        // Ignore duplicate key errors (already saved)
        if (error.code !== "23505") {
          console.error("Error saving prompt:", error);
          return internalError(res, "Failed to save prompt");
        }
      }
    } else {
      // Unsave the prompt
      const { error } = await supabase
        .from("user_saved_prompts")
        .delete()
        .eq("user_id", userId)
        .eq("prompt_id", id);

      if (error) {
        console.error("Error unsaving prompt:", error);
        return internalError(res, "Failed to unsave prompt");
      }
    }

    return successResponse(res, { saved });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
