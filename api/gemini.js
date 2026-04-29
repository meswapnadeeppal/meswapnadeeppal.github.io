/**
 * @file api/gemini.js
 * @description Secure serverless backend to handle Gemini API requests.
 * This hides the API key from the public frontend.
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Retrieve the secure key from Vercel's hidden environment variables
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "Server configuration error: API key missing." });
  }

  const API_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

  try {
    // Make the secure request to Google
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body), // Pass the exact payload from the frontend
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to communicate with Neural Net." });
  }
}