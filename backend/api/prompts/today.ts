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
    // Get today's prompt using the view
    const { data, error } = await supabase
      .from("daily_prompt_view")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching daily prompt:", error);

      // If no prompt found for today
      if (error.code === "PGRST116") {
        return notFound(res, "No prompt available for today");
      }

      return internalError(res, "Failed to fetch daily prompt");
    }

    // Transform to match API spec format
    const prompt = {
      id: data.id,
      title: data.title,
      description: data.description,
      constraints: data.constraints || [],
      micro_lesson: data.micro_lesson,
      reference_image_url: data.reference_image_url,
    };

    return successResponse(res, { prompt });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
