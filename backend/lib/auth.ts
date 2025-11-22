import { VercelRequest } from "@vercel/node";
import { supabase } from "./supabase";

export interface AuthenticatedRequest extends VercelRequest {
  userId?: string;
}

/**
 * Validates JWT token from Authorization header and extracts user ID
 * Returns userId if valid, null otherwise
 */
export async function validateAuth(req: VercelRequest): Promise<string | null> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return null;
    }

    return data.user.id;
  } catch (error) {
    console.error("Auth validation error:", error);
    return null;
  }
}

/**
 * Middleware to require authentication
 * Adds userId to request object if authenticated
 */
export async function requireAuth(
  req: AuthenticatedRequest
): Promise<string | null> {
  const userId = await validateAuth(req);

  if (userId) {
    req.userId = userId;
  }

  return userId;
}
