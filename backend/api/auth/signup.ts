import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../lib/supabase";
import {
  successResponse,
  badRequest,
  internalError,
} from "../../lib/responses";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().optional(),
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
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return badRequest(res, "Invalid request body");
    }

    const { email, password, username } = validation.data;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Auth signup error:", authError);
      return badRequest(res, authError.message);
    }

    if (!authData.user) {
      return internalError(res, "Failed to create user");
    }

    // Create user profile in custom users table
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email!,
      username: username || null,
      streak_days: 0,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Don't fail the request if profile creation fails
    }

    // Return user and token
    return successResponse(
      res,
      {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          username: username || null,
        },
        token: authData.session?.access_token || "",
      },
      201
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return internalError(res);
  }
}
