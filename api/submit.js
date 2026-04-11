export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const bodyData =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const payload = {
      ...bodyData,
      access_key: process.env.WEB3FORMS_KEY,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch (parseError) {
      console.error("WEB3FORMS ERROR: Returned HTML instead of JSON.");
      console.error("RAW HTML RESPONSE:", rawText);

      return res.status(502).json({
        message: "External API connection failed",
        error: "Received HTML instead of JSON",
      });
    }

    if (response.ok) {
      return res.status(200).json(result);
    } else {
      return res.status(response.status).json(result);
    }
  } catch (error) {
    console.error("CRITICAL API ERROR:", error);

    return res.status(500).json({
      message: "Internal System Error",
      error: error.message,
    });
  }
}
