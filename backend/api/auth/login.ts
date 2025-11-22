import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../lib/supabase";
import {
  successResponse,
  badRequest,
  unauthorized,
  internalError,
} from "../../lib/responses";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: { code: "BAD_REQUEST", message: "Method not allowed" } });
  }

  try {
    // Validate request body
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return badRequest(res, "Invalid request body");
    }

    const { email, password } = validation.data;

    // Sign in with Supabase
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Auth login error:", authError);
      return unauthorized(res, "Invalid email or password");
    }

    if (!authData.user || !authData.session) {
      return unauthorized(res, "Invalid email or password");
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("users")
      .select("username")
      .eq("id", authData.user.id)
      .single();

    // Return user and token
    return successResponse(res, {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: profile?.username || null,
      },
      token: authData.session.access_token,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
