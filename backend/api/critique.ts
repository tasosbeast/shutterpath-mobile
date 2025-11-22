import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase";
import { requireAuth } from "../lib/auth";
import {
  checkCritiqueRateLimit,
  recordCritiqueRequest,
} from "../lib/rate-limit";
import {
  successResponse,
  unauthorized,
  badRequest,
  rateLimited,
  internalError,
} from "../lib/responses";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    // Check rate limit (1 per 24 hours)
    const canRequest = await checkCritiqueRateLimit(userId);
    if (!canRequest) {
      return rateLimited(res, "You can only request one critique per 24 hours");
    }

    // Get image from request body
    // In a real implementation, you'd handle multipart/form-data
    // For now, we'll accept a base64 image or URL
    const { image_url, image_base64 } = req.body;

    if (!image_url && !image_base64) {
      return badRequest(
        res,
        "Missing image. Provide either image_url or image_base64"
      );
    }

    // Prepare image for OpenAI
    let imageContent: string;
    if (image_base64) {
      imageContent = `data:image/jpeg;base64,${image_base64}`;
    } else {
      imageContent = image_url;
    }

    // Call OpenAI Vision API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert photography critic. Analyze the provided image and give constructive feedback.
          
Your response MUST be in this exact JSON format:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tip": "one actionable tip"
}

Focus on:
- Composition and framing
- Lighting and exposure
- Subject placement and focus
- Color and contrast
- Technical execution

Be specific, constructive, and encouraging.`,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageContent,
              },
            },
            {
              type: "text",
              text: "Please analyze this photograph and provide structured feedback.",
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return internalError(res, "Failed to generate critique");
    }

    // Parse the JSON response
    let critique;
    try {
      critique = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", responseText);
      // Fallback: create a basic critique
      critique = {
        strengths: ["Good composition", "Interesting subject", "Clear focus"],
        improvements: [
          "Could improve lighting",
          "Consider different angle",
          "Adjust exposure",
        ],
        tip: "Keep practicing and experimenting with different techniques",
      };
    }

    // Validate critique structure
    if (
      !Array.isArray(critique.strengths) ||
      critique.strengths.length !== 3 ||
      !Array.isArray(critique.improvements) ||
      critique.improvements.length !== 3 ||
      typeof critique.tip !== "string"
    ) {
      console.error("Invalid critique structure:", critique);
      critique = {
        strengths: critique.strengths?.slice(0, 3) || [
          "Good attempt",
          "Shows potential",
          "Keep learning",
        ],
        improvements: critique.improvements?.slice(0, 3) || [
          "Practice more",
          "Study composition",
          "Experiment with settings",
        ],
        tip: critique.tip || "Continue practicing photography daily",
      };
    }

    // Store image URL (in production, upload to Supabase Storage first)
    const storedImageUrl = image_url || "base64_image";

    // Record the critique
    const recordResult = await recordCritiqueRequest(
      userId,
      storedImageUrl,
      critique.strengths,
      critique.improvements,
      critique.tip
    );

    if (!recordResult.success) {
      console.error("Failed to record critique:", recordResult.error);
      // Don't fail the request, just log the error
    }

    return successResponse(res, {
      critique: {
        strengths: critique.strengths,
        improvements: critique.improvements,
        tip: critique.tip,
      },
    });
  } catch (error: any) {
    console.error("Critique error:", error);

    // Handle OpenAI API errors
    if (error.status === 429) {
      return rateLimited(
        res,
        "OpenAI API rate limit exceeded. Please try again later."
      );
    }

    return internalError(res, "Failed to generate critique");
  }
}
