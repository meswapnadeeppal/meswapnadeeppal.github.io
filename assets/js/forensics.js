/**
 * @file forensics.js
 * @description Application logic for the Forensics Plagiarism and AI tool.
 */

export function initForensics() {
  const inputArea = document.getElementById("forge-input");
  const outputArea = document.getElementById("forge-output");
  const analysisPanel = document.getElementById("forge-analysis");

  const btnScan = document.getElementById("btn-forge-scan");
  const btnRewrite = document.getElementById("btn-forge-rewrite");
  const btnHumanize = document.getElementById("btn-forge-humanize");
  const btnCopy = document.getElementById("btn-forge-copy");

  if (!inputArea || !btnScan) return;

  let isProcessing = false;

  // --- COPY TO CLIPBOARD LOGIC ---
  if (btnCopy && outputArea) {
    btnCopy.addEventListener("click", () => {
      let textToCopy = outputArea.innerText;

      if (
        textToCopy.includes("// Output buffer ready") ||
        textToCopy.includes("Processing payload")
      ) {
        return;
      }

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const originalHTML = btnCopy.innerHTML;
          btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
          btnCopy.style.color = "var(--cyberpunk-success)";
          btnCopy.style.borderColor = "var(--cyberpunk-success)";

          setTimeout(() => {
            btnCopy.innerHTML = originalHTML;
            btnCopy.style.color = "";
            btnCopy.style.borderColor = "";
          }, 2000);
        })
        .catch((err) => {
          console.error("Clipboard access denied: ", err);
        });
    });
  }

  // ==========================================
  // API ROUTING (LOCAL VS PRODUCTION)
  // ==========================================
  async function callAI(promptText) {
    const requestBody = {
      contents: [{ parts: [{ text: promptText }] }],
    };

    try {
      /* // --- 🔴 LOCALHOST MODE ---
      // (Remember to scramble the key before committing!)
      const LOCAL_API_KEY = "PASTE_YOUR_KEY_HERE";
      const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${LOCAL_API_KEY}`;
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      */

      // --- 🟢 PRODUCTION MODE (Vercel) ---
      const response = await fetch(`/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Error processing payload."
      );
    } catch (error) {
      return "Network failure. Check connection.";
    }
  }

  function setProcessingState(active) {
    isProcessing = active;
    btnScan.style.opacity = active ? "0.5" : "1";
    btnRewrite.style.opacity = active ? "0.5" : "1";
    btnHumanize.style.opacity = active ? "0.5" : "1";

    if (active) {
      outputArea.innerHTML =
        "<span style='color: #666;'>Processing payload...</span>";
    }
  }

  // --- PROTOCOL 1: FORENSIC SCAN ---
  btnScan.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);
    analysisPanel.innerHTML =
      "<div class='text-center' style='opacity:0.5; margin-top: 20px;'><p>Scanning text matrix...</p></div>";

    const prompt = `Act as a forensic linguistic analyzer. Evaluate the following text for AI generation and plagiarism. Output ONLY a strict JSON object with this exact format, nothing else:
    {
      "ai_probability": <number 0-100>,
      "plagiarism_risk": <number 0-100>,
      "notes": "<A brief 2 sentence summary of why you gave these scores>"
    }
    Text to analyze: "${text}"`;

    const result = await callAI(prompt);

    try {
      const cleanJson = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const analysis = JSON.parse(cleanJson);

      const aiColor = analysis.ai_probability > 50 ? "#ef4444" : "#10b981";
      const plagColor = analysis.plagiarism_risk > 50 ? "#ef4444" : "#10b981";

      analysisPanel.innerHTML = `
        <div class="forge-metric">
          <div class="forge-metric-header">
            <span>AI Generation Probability</span>
            <span style="color: ${aiColor};">${analysis.ai_probability}%</span>
          </div>
          <div class="forge-bar-bg">
            <div class="forge-bar-fill" style="width: ${analysis.ai_probability}%; background: ${aiColor};"></div>
          </div>
        </div>
        
        <div class="forge-metric">
          <div class="forge-metric-header">
            <span>Plagiarism Risk</span>
            <span style="color: ${plagColor};">${analysis.plagiarism_risk}%</span>
          </div>
          <div class="forge-bar-bg">
            <div class="forge-bar-fill" style="width: ${analysis.plagiarism_risk}%; background: ${plagColor};"></div>
          </div>
        </div>
        
        <div style="margin-top: 20px; border-top: 1px solid #1e293b; padding-top: 15px;">
          <strong style="color: #94a3b8; text-transform: uppercase; font-size: 11px;">Forensic Notes:</strong><br>
          <span style="opacity: 0.9;">${analysis.notes}</span>
        </div>
      `;
      outputArea.innerHTML =
        "<span style='color: #10b981;'>// Forensic scan complete. View analysis panel.</span>";
    } catch (e) {
      analysisPanel.innerHTML = `<p style="color: #ef4444;">Analysis failed. Unparsable data received.</p>`;
      outputArea.innerHTML =
        "<span style='color: #ef4444;'>// ERR: JSON parse failure.</span>";
    }
    setProcessingState(false);
  });

  // --- PROTOCOL 2: REWRITE ---
  btnRewrite.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);
    const prompt = `Rewrite the following text completely to bypass plagiarism checkers. Change the sentence structure, vocabulary, and pacing, but ensure the core factual information and original meaning remain intact. Do not add any introductory text. Text: "${text}"`;

    const result = await callAI(prompt);
    outputArea.innerHTML = result.replace(/\n/g, "<br>");
    setProcessingState(false);
  });

  // --- PROTOCOL 3: HUMANIZE ---
  btnHumanize.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);
    const prompt = `Rewrite the following text so it sounds like a real human wrote it. Remove common AI buzzwords (like 'delve', 'testament', 'tapestry', 'crucial', 'furthermore'). Introduce slight, natural variations in sentence length and use a conversational, highly authentic tone. Do not add any introductory text. Text: "${text}"`;

    const result = await callAI(prompt);
    outputArea.innerHTML = result.replace(/\n/g, "<br>");
    setProcessingState(false);
  });
}