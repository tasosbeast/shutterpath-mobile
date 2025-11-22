import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase";
import { requireAuth } from "../lib/auth";
import {
  successResponse,
  unauthorized,
  badRequest,
  internalError,
} from "../lib/responses";
import { z } from "zod";

const eventSchema = z.object({
  event_type: z.enum(["prompt_view", "challenge_complete", "critique_used"]),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
  metadata: z.record(z.any()).optional(),
});

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

  try {
    // Validate request body
    const validation = eventSchema.safeParse(req.body);
    if (!validation.success) {
      return badRequest(res, "Invalid event data");
    }

    const { event_type, entity_type, entity_id, metadata } = validation.data;

    // Record event
    const { error } = await supabase.from("analytics_events").insert({
      user_id: userId,
      event_type,
      entity_type: entity_type || null,
      entity_id: entity_id || null,
      metadata: metadata || {},
    });

    if (error) {
      console.error("Error recording event:", error);
      return internalError(res, "Failed to record event");
    }

    return successResponse(res, { status: "recorded" }, 202);
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
