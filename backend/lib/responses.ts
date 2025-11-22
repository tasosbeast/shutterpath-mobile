import { VercelRequest, VercelResponse } from "@vercel/node";

export interface ApiError {
  code:
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "NOT_FOUND"
    | "RATE_LIMITED"
    | "INTERNAL_ERROR";
  message: string;
}

export function successResponse(
  res: VercelResponse,
  data: any,
  status: number = 200
) {
  return res.status(status).json(data);
}

export function errorResponse(
  res: VercelResponse,
  code: ApiError["code"],
  message: string,
  status: number = 400
) {
  return res.status(status).json({
    error: {
      code,
      message,
    },
  });
}

export function badRequest(
  res: VercelResponse,
  message: string = "Bad request"
) {
  return errorResponse(res, "BAD_REQUEST", message, 400);
}

export function unauthorized(
  res: VercelResponse,
  message: string = "Unauthorized"
) {
  return errorResponse(res, "UNAUTHORIZED", message, 401);
}

export function notFound(res: VercelResponse, message: string = "Not found") {
  return errorResponse(res, "NOT_FOUND", message, 404);
}

export function rateLimited(
  res: VercelResponse,
  message: string = "Rate limit exceeded"
) {
  return errorResponse(res, "RATE_LIMITED", message, 429);
}

export function internalError(
  res: VercelResponse,
  message: string = "Internal server error"
) {
  return errorResponse(res, "INTERNAL_ERROR", message, 500);
}
