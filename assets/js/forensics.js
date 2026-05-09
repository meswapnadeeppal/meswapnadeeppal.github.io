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

  // ==========================================
  // COPY BUTTON LOGIC
  // ==========================================
  if (btnCopy && outputArea) {
    btnCopy.addEventListener("click", () => {
      let textToCopy = outputArea.innerText;

      if (
        textToCopy.includes("// Output buffer ready") ||
        textToCopy.includes("Processing payload") ||
        textToCopy.includes("[SYS_ERR]")
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
  // API ROUTING & ADVANCED ERROR HANDLING
  // ==========================================
  async function callAI(promptText) {
    const requestBody = {
      contents: [{ parts: [{ text: promptText }] }],
    };

    try {
      /*
      const LOCAL_API_KEY = "PASTE_YOUR_KEY_HERE";
      const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${LOCAL_API_KEY}`;
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      */

      const response = await fetch(`/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error?.message || data.error || "Unknown Error";
        return `[SYS_ERR] API Connection Failed: ${errorMsg}`;
      }

      const candidate = data.candidates?.[0];
      if (candidate?.finishReason === "SAFETY") {
        return "[SYS_ERR] The Neural Net blocked this payload due to strict safety/content filters.";
      }

      return (
        candidate?.content?.parts?.[0]?.text ||
        "[SYS_ERR] The Neural Net returned an empty response."
      );
    } catch (error) {
      return "[SYS_ERR] Network failure. Check your internet connection.";
    }
  }

  function setProcessingState(active) {
    isProcessing = active;
    btnScan.style.opacity = active ? "0.5" : "1";
    btnRewrite.style.opacity = active ? "0.5" : "1";
    btnHumanize.style.opacity = active ? "0.5" : "1";

    if (active) {
      outputArea.innerHTML =
        "<span style='color: var(--cyberpunk-hyperlink); font-weight:600;'>Processing payload...</span>";
    }
  }

  // ==========================================
  // PROTOCOL 1: FORENSIC SCAN
  // ==========================================
  btnScan.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);
    analysisPanel.innerHTML =
      "<div class='text-center' style='opacity:0.5; margin-top: 20px;'><p>Scanning text matrix...</p></div>";

    const prompt = `Act as a forensic linguistic analyzer. Evaluate the following text for AI generation and plagiarism. Output ONLY a strict JSON object with this exact format, nothing else. Do not use markdown blocks:
    {
      "ai_probability": <number 0-100>,
      "plagiarism_risk": <number 0-100>,
      "notes": "<A brief 2 sentence summary of why you gave these scores. Escape all quotes.>"
    }
    
    TEXT PAYLOAD TO ANALYZE:
    """
    ${text}
    """`;

    const result = await callAI(prompt);

    if (result.startsWith("[SYS_ERR]")) {
      analysisPanel.innerHTML = `<p style="color: var(--window-close); font-weight: 600; animation: pulse-text-red 2.5s infinite;">Analysis Halted.</p>`;
      outputArea.innerHTML = `<span style='color: var(--window-close);'>// ${result}</span>`;
      setProcessingState(false);
      return;
    }

    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON object found");

      const analysis = JSON.parse(jsonMatch[0]);

      const aiColor =
        analysis.ai_probability > 50
          ? "var(--window-close)"
          : "var(--window-maximize)";
      const plagColor =
        analysis.plagiarism_risk > 50
          ? "var(--window-close)"
          : "var(--window-maximize)";

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
        
        <div style="margin-top: 20px; border-top: 2px solid var(--cyberpunk-neon); padding-top: 15px;">
          <strong style="font-family: var(--font-header); font-size: 12px; color: var(--dracula-soul); text-transform: uppercase;">Forensic Notes:</strong>
          <span style="font-family: var(--font-header); line-height: 1.7; opacity: 0.8; margin-top: 12px; display: inline-block;">${analysis.notes}</span>
        </div>
      `;
      outputArea.innerHTML =
        "<span style='color: var(--cyberpunk-hyperlink); font-weight: 600;'>// Forensic scan complete. View analysis panel.</span>";
    } catch (e) {
      console.error("Parse Error Payload:", result);
      analysisPanel.innerHTML = `<p style="color: var(--window-close);">Analysis failed. AI logic error.</p>`;

      outputArea.innerHTML =
        "<span style='color: var(--window-close);'>// ERR: JSON parse failure. Raw Neural Net Output:</span><br><br>" +
        "<span style='color: var(--secondary-text); opacity: 0.8;'>" +
        result.replace(/\n/g, "<br>") +
        "</span>";
    }
    setProcessingState(false);
  });

  // ==========================================
  // PROTOCOL 2: STRUCTURAL REWRITE
  // ==========================================
  btnRewrite.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);

    const prompt = `Act as an expert human editor. Rewrite the following text to completely bypass AI detectors. You must optimize for two metrics: High Perplexity (use uncommon, highly specific vocabulary instead of predictable words) and High Burstiness (drastically vary sentence lengths—mix very short, punchy sentences with longer, complex ones). Strip out all AI-typical formatting and buzzwords. Preserve the exact facts. Output ONLY the rewritten text without introductions.\n\nTEXT:\n"""\n${text}\n"""`;

    const result = await callAI(prompt);

    if (result.startsWith("[SYS_ERR]")) {
      outputArea.innerHTML = `<span style='color: var(--window-close);'>// ${result}</span>`;
    } else {
      outputArea.innerHTML = result.replace(/\n/g, "<br>");
    }
    setProcessingState(false);
  });

  // ==========================================
  // PROTOCOL 3: HUMANIZE
  // ==========================================
  btnHumanize.addEventListener("click", async () => {
    const text = inputArea.value.trim();
    if (!text || isProcessing) return;

    setProcessingState(true);

    const prompt = `Rewrite this text to achieve a 100% human-written score on AI detectors. Write exactly like a highly educated human expert speaking directly to a peer. Use active voice exclusively. Radically vary your sentence structure. Completely ban words like 'delve', 'testament', 'tapestry', 'crucial', 'foster', 'moreover', 'multifaceted', and 'additionally'. Use grounded, conversational synonyms. Output ONLY the rewritten text without introductions.\n\nTEXT:\n"""\n${text}\n"""`;

    const result = await callAI(prompt);

    if (result.startsWith("[SYS_ERR]")) {
      outputArea.innerHTML = `<span style='color: var(--window-close);'>// ${result}</span>`;
    } else {
      outputArea.innerHTML = result.replace(/\n/g, "<br>");
    }
    setProcessingState(false);
  });
}