export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const payload = req.body;

  payload.access_key = process.env.WEB3FORMS_KEY;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json(result);
    } else {
      return res.status(response.status).json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal System Error" });
  }
}
