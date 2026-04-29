/** * @file vision.js
 * @description Application logic for the Neural Vision (AI Image Scanner)
 * Architecture: Modular Service Pattern built on the Gemini Multimodal API.
 */

export function initNeuralVision() {
  const DOM = {
    dropZone: document.getElementById("vision-drop-zone"),
    fileInput: document.getElementById("vision-file-input"),
    terminal: document.getElementById("vision-output"),
  };

  if (!DOM.dropZone || !DOM.fileInput || !DOM.terminal) return;

  let isScannerLocked = false;

  DOM.dropZone.addEventListener("click", () => {
    if (!isScannerLocked) DOM.fileInput.click();
  });

  DOM.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!isScannerLocked) DOM.dropZone.classList.add("dragover");
  });

  DOM.dropZone.addEventListener("dragleave", () => {
    if (!isScannerLocked) DOM.dropZone.classList.remove("dragover");
  });

  DOM.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    if (isScannerLocked) return;

    DOM.dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      isScannerLocked = true;
      processImagePayload(file);
    } else {
      printToTerminal(
        "<span style='color: var(--window-close);'>[ERR] Invalid payload. Visual data (image) required.</span>",
      );
    }
  });

  DOM.fileInput.addEventListener("change", (e) => {
    if (isScannerLocked) return;
    const file = e.target.files[0];
    if (file) {
      isScannerLocked = true;
      processImagePayload(file);
    }
  });

  function processImagePayload(file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      buildScannerUI(e.target.result);

      const base64Data = e.target.result.split(",")[1];
      const mimeType = file.type;

      printToTerminal(
        `<br><span style="color: var(--dracula-soul);"><span class="fa-solid fa-terminal"></span> Uploading payload :</span> <span style="color: var(--window-maximize);">[[ ${file.name} ]]</span> ...`,
      );

      setTimeout(() => {
        typeSystemLog(
          ">_  Scanning visual matrix for compatible protocols ... ",
          20,
          "var(--cyberpunk-primary)",
          () => {
            const spinner = startTerminalSpinner("var(--cyberpunk-primary)");

            setTimeout(() => {
              stopTerminalSpinner(
                spinner,
                "[ DONE ]",
                "var(--cyberpunk-success)",
              );

              typeSystemLog(
                ">_  Awaiting protocol selection from UI panel ...",
                20,
                "var(--cyberpunk-secondary)",
                () => {
                  renderActionButtons(file, e.target.result);
                },
              );
            }, 800);
          },
        );
      }, 400);
    };

    reader.readAsDataURL(file);
  }

  async function executeAIProtocol(file, fileDataUrl, protocolType) {
    printToTerminal(
      `<br><span style="color: var(--cyberpunk-success);"><span class="fa-solid fa-terminal"></span> Establishing Neural Net connection ...</span>`,
      true,
    );

    printToTerminal(
      `<span style="color: var(--cyberpunk-primary);"><span class="fa-solid fa-terminal"></span> Processing Data Request ... </span>`,
      true,
    );
    const spinner = startTerminalSpinner("var(--cyberpunk-primary)", true);

    const base64Data = fileDataUrl.split(",")[1];
    let systemPrompt = "";

    if (protocolType === "poem") {
      systemPrompt =
        "Analyze this image and write a highly detailed, original sonnet (14 lines, ABAB CDCD EFEF GG rhyme scheme) about exactly what you see. The tone should be evocative and poetic. End the response with '> Analysis Complete.'";
    } else if (protocolType === "recipe") {
      systemPrompt =
        "Analyze this image. If the image does NOT clearly contain edible human food, you must ONLY output the exact error message: '[NON-EDIBLE MATERIAL DETECTED]'. If it DOES contain food, write an original, highly detailed recipe for the dish shown. Include a creative name, precise measurements, and step-by-step instructions. End the response with '> Culinary Analysis Complete.'";
    } else if (protocolType === "description") {
      systemPrompt =
        "Analyze this image and provide a highly detailed, comprehensive description of everything visible. Describe the subjects, the background, the lighting, and the overall atmosphere. End the response with '> Visual Matrix Scan Complete.'";
    } else if (protocolType === "text") {
      systemPrompt =
        "Analyze this image and extract all readable text exactly as it appears. If there is absolutely no legible text in the image, you must ONLY output the exact error message: '[NO VISIBLE TEXT DETECTED]'. End the response with '> OCR Extraction Complete.'";
    } else if (protocolType === "json") {
      systemPrompt =
        "Analyze this image and output a raw JSON data structure listing all identified 'entities', 'dominant_colors', 'estimated_location', and a fictional 'threat_level' (assign a level 1-10 based on how dangerous or gritty the scene looks). Output ONLY valid JSON, do not use markdown blocks. End the response with '> Deep Scan Complete.'";
    } else if (protocolType === "memory") {
      systemPrompt =
        "Treat this visual data as a corrupted memory file recovered from a destroyed android. Write a short, gritty, 2-paragraph cyberpunk flash fiction story explaining what was happening the exact moment this image was captured. End the response with '> Memory Recovery Complete.'";
    } else if (protocolType === "ui") {
      systemPrompt =
        "Analyze this image. If it contains a user interface, website, or app design, generate the basic HTML and inline CSS structure needed to replicate its layout. If the image is NOT a user interface, output ONLY the exact text: '[NO INTERFACE DETECTED]'. End the response with '> UI Wireframe Extracted.'";
    } else if (protocolType === "decrypt") {
      systemPrompt =
        "Scan this image for any foreign languages, complex symbols, or technical charts. Translate any text into English and briefly explain the context of what is being shown. If there is nothing to decrypt, output ONLY the exact text: '[NO ENCRYPTED DATA DETECTED]'. End the response with '> Decryption Complete.'";
    }

    const data = await callNeuralNet(systemPrompt, base64Data, file.type);

    if (!data || data.error) {
      stopTerminalSpinner(spinner, "[ FAILED ]", "var(--window-close)");
      const errMsg =
        data?.error?.message || "Neural link severed. Network failure.";
      typewriterEffect(`[ERR] API Error: ${errMsg}`, 40, "var(--window-close)");
      return;
    }

    stopTerminalSpinner(spinner, "[ SUCCESS ]", "var(--cyberpunk-success)");
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "[ERR] Corrupted data packet received.";

    setTimeout(() => {
      if (
        aiResponse.includes("[NON-EDIBLE MATERIAL DETECTED]") ||
        aiResponse.includes("[NO VISIBLE TEXT DETECTED]") ||
        aiResponse.includes("[NO INTERFACE DETECTED]") ||
        aiResponse.includes("[NO ENCRYPTED DATA DETECTED]")
      ) {
        typewriterEffect(aiResponse, 40, "var(--window-close)");
      } else {
        typewriterEffect(aiResponse, 40);
      }
    }, 400);
  }

  // ==========================================
  // API ROUTING (LOCAL VS PRODUCTION)
  // ==========================================
  async function callNeuralNet(promptText, base64Data, mimeType) {
    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            { inline_data: { mime_type: mimeType, data: base64Data } },
          ],
        },
      ],
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

      return await response.json();
    } catch (error) {
      console.error("API Request Failed:", error);
      return null;
    }
  }

  function buildScannerUI(imageSrc) {
    Array.from(DOM.dropZone.children).forEach((child) => {
      if (child.id !== "vision-file-input") child.style.display = "none";
    });

    DOM.dropZone.style.cssText =
      "cursor: default; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    const imgPreview = document.createElement("img");
    imgPreview.id = "vision-image-preview";
    imgPreview.style.cssText =
      "box-sizing: border-box; object-fit: contain; width: 90%; max-height: 55%; border: 4px solid var(--container-border); border-radius: 3px; margin: 10px 0px; filter: drop-shadow(0 0 15px var(--cyberpunk-primary)); animation: windowPopIn 0.3s ease forwards;";
    imgPreview.src = imageSrc;
    DOM.dropZone.appendChild(imgPreview);

    const controlsContainer = document.createElement("div");
    controlsContainer.id = "vision-controls";
    controlsContainer.style.display = "none";
    DOM.dropZone.appendChild(controlsContainer);
  }

  function renderActionButtons(file, fileDataUrl) {
    const container = document.getElementById("vision-controls");
    if (!container) return;

    container.style.cssText =
      "width: 90%; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 5px; animation: windowPopIn 0.5s ease forwards;";

    const btnStyle =
      "font-family: var(--font-header); font-weight: bold; font-size: 12px; text-transform: uppercase; border-radius: 3px; cursor: pointer; padding: 12px; width: 100%; transition: 0.2s;";

    const html = `
      <button id="btn-protocol-poem" style="background: rgba(255, 215, 0, 0.05); border: 2px solid var(--cyberpunk-hyperlink); color: var(--cyberpunk-hyperlink); ${btnStyle}">Generate Poem</button>
      <button id="btn-protocol-recipe" style="background: rgba(255, 140, 0, 0.05); border: 2px solid var(--dracula-soul); color: var(--dracula-soul); ${btnStyle}">Extract Recipe</button>
      <button id="btn-protocol-desc" style="background: rgba(0, 255, 0, 0.05); border: 2px solid var(--window-maximize); color: var(--window-maximize); ${btnStyle}">Describe Image</button>
      <button id="btn-protocol-text" style="background: rgba(176, 38, 255, 0.05); border: 2px solid var(--cyberpunk-primary); color: var(--cyberpunk-primary); ${btnStyle}">Extract Text</button>
      <button id="btn-protocol-json" style="background: rgba(0, 128, 255, 0.05); border: 2px solid var(--cyberpunk-neon); color: var(--cyberpunk-neon); ${btnStyle}">Extract Raw Data</button>
      <button id="btn-protocol-memory" style="background: rgba(150, 255, 0, 0.05); border: 2px solid var(--cyberpunk-circuit); color: var(--cyberpunk-circuit); ${btnStyle}">Write a Story</button>
      <button id="btn-protocol-ui" style="background: rgba(255, 0, 128, 0.05); border: 2px solid var(--cyberpunk-secondary); color: var(--cyberpunk-secondary); ${btnStyle}">Get Website Code</button>
      <button id="btn-protocol-decrypt" style="background: rgba(255, 130, 0, 0.05); border: 2px solid var(--system-spice); color: var(--system-spice); ${btnStyle}">Translate & Explain</button>
      
      <button id="btn-vision-reset" style="grid-column: 1 / -1; font-family: var(--font-header); font-weight: bold; font-size: 13px; color: var(--window-close); background: rgba(255, 0, 60, 0.05); border: 2px solid var(--window-close); border-radius: 4px; cursor: pointer; padding: 12px; margin-top: 4px; margin-bottom: 10px; width: 100%; transition: 0.2s;">
        ABORT & RESET SCANNER
      </button>`;

    container.innerHTML = html;
    container.style.display = "grid";

    attachButtonBehaviors(file, fileDataUrl);
  }

  function attachButtonBehaviors(file, fileDataUrl) {
    const buttons = [
      { id: "btn-protocol-poem", color: "255, 215, 0", protocol: "poem" },
      { id: "btn-protocol-recipe", color: "255, 140, 0", protocol: "recipe" },
      { id: "btn-protocol-desc", color: "0, 255, 0", protocol: "description" },
      { id: "btn-protocol-text", color: "176, 38, 255", protocol: "text" },
      { id: "btn-protocol-json", color: "0, 128, 255", protocol: "json" },
      { id: "btn-protocol-memory", color: "150, 255, 0", protocol: "memory" },
      { id: "btn-protocol-ui", color: "255, 0, 128", protocol: "ui" },
      { id: "btn-protocol-decrypt", color: "255, 130, 0", protocol: "decrypt" },
    ];

    buttons.forEach((btnInfo) => {
      const btn = document.getElementById(btnInfo.id);
      if (btn) {
        btn.addEventListener(
          "mouseover",
          () => (btn.style.background = `rgba(${btnInfo.color}, 0.2)`),
        );
        btn.addEventListener(
          "mouseout",
          () => (btn.style.background = `rgba(${btnInfo.color}, 0.05)`),
        );

        btn.addEventListener("click", () => {
          btn.style.background = `rgba(${btnInfo.color}, 0.4)`;
          btn.innerText = "[ PROCESSING... ]";
          btn.style.pointerEvents = "none";

          Array.from(
            document.getElementById("vision-controls").children,
          ).forEach((child) => {
            if (child !== btn) child.style.display = "none";
          });
          btn.style.gridColumn = "1 / -1";

          executeAIProtocol(file, fileDataUrl, btnInfo.protocol);
        });
      }
    });

    const resetBtn = document.getElementById("btn-vision-reset");
    if (resetBtn) {
      resetBtn.addEventListener(
        "mouseover",
        () => (resetBtn.style.background = "rgba(255, 0, 60, 0.2)"),
      );
      resetBtn.addEventListener(
        "mouseout",
        () => (resetBtn.style.background = "rgba(255, 0, 60, 0.05)"),
      );
      resetBtn.addEventListener("click", resetScannerUI);
    }
  }

  function resetScannerUI() {
    isScannerLocked = false;
    DOM.fileInput.value = "";

    ["vision-image-preview", "vision-controls"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    Array.from(DOM.dropZone.children).forEach(
      (child) => (child.style.display = ""),
    );
    DOM.dropZone.style.cssText = "cursor: pointer;";
    DOM.terminal.innerHTML =
      '<span class="vision-muted-text">Awaiting visual data ...</span><span class="term-cursor"> _</span>';
  }

  function startTerminalSpinner(color, appendToLastLine = false) {
    const span = document.createElement("span");
    span.style.cssText = `color: ${color}; font-weight: bold;`;

    if (appendToLastLine) {
      DOM.terminal.appendChild(span);
    } else {
      DOM.terminal.innerHTML += span.outerHTML;
    }

    const activeSpan = DOM.terminal.lastElementChild;
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;

    const interval = setInterval(() => {
      if (activeSpan) activeSpan.innerText = frames[i];
      i = (i + 1) % frames.length;
    }, 80);

    return { element: activeSpan, interval: interval };
  }

  function stopTerminalSpinner(spinnerObj, text, color) {
    clearInterval(spinnerObj.interval);
    if (spinnerObj.element) {
      spinnerObj.element.innerText = text;
      spinnerObj.element.style.color = color;
    }
  }

  function printToTerminal(text, append = false) {
    const cursor = DOM.terminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    const formattedText = append ? `<br>${text}` : text;
    DOM.terminal.innerHTML += `${formattedText}<span class="term-cursor"> _</span>`;
    DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
  }

  function typeSystemLog(text, speed, textColor, callback) {
    const cursor = DOM.terminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    const spanId = `typing-${Date.now()}`;
    DOM.terminal.innerHTML += `<br><span style="color: ${textColor};" id="${spanId}"></span><span class="term-cursor"> _</span>`;
    const targetSpan = document.getElementById(spanId);

    let i = 0;
    function type() {
      if (i < text.length) {
        targetSpan.innerHTML += text.charAt(i);
        i++;
        DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
        setTimeout(type, speed);
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  function typewriterEffect(
    text,
    speed,
    textColor = "var(--cyberpunk-primary)",
  ) {
    const cursor = DOM.terminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    const spanId = `typing-result-${Date.now()}`;
    DOM.terminal.innerHTML += `<br><br><span style="color: ${textColor};" id="${spanId}"></span><span class="term-cursor"> _</span>`;
    const targetSpan = document.getElementById(spanId);

    let i = 0;
    function type() {
      if (i < text.length) {
        targetSpan.innerHTML +=
          text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        i++;
        DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          printToTerminal(
            "<br><span class='fa-solid fa-terminal'></span> Awaiting next visual data ... <span id='vision-reset-btn' style='color: var(--window-close); cursor: pointer; letter-spacing: 1px;'>[RESET SCANNER]</span>",
            true,
          );
          document
            .getElementById("vision-reset-btn")
            .addEventListener("click", resetScannerUI);
        }, 1000);
      }
    }
    type();
  }
}