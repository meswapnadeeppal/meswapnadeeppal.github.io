/** Application: Neural Vision (AI Image Scanner) */
export function initNeuralVision() {
  const dropZone = document.getElementById("vision-drop-zone");
  const fileInput = document.getElementById("vision-file-input");
  const outputTerminal = document.getElementById("vision-output");

  if (!dropZone || !fileInput || !outputTerminal) return;

  // ==========================================
  // MASTER API KEY (Defined once for the whole app)
  const API_KEY = "PASTE_YOUR_NEW_API_KEY_HERE";
  // ==========================================

  // --- STATE LOCK ---
  let isScannerLocked = false;

  // 1. Click-to-Upload Fallback
  dropZone.addEventListener("click", () => {
    if (isScannerLocked) return;
    fileInput.click();
  });

  // 2. Drag and Drop Visual Effects
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (isScannerLocked) return;
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    if (isScannerLocked) return;
    dropZone.classList.remove("dragover");
  });

  // 3. Handle the Dropped File
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    if (isScannerLocked) return;

    dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      isScannerLocked = true;
      processImagePayload(file);
    } else {
      printToVisionTerminal(
        "<span style='color: var(--window-close);'>[ERR] Invalid payload. Visual data (image) required.</span>",
      );
    }
  });

  // Handle the Clicked File
  fileInput.addEventListener("change", (e) => {
    if (isScannerLocked) return;
    const file = e.target.files[0];
    if (file) {
      isScannerLocked = true;
      processImagePayload(file);
    }
  });

  // Master Reset Function (Clears the UI)
  function triggerReset() {
    isScannerLocked = false;
    fileInput.value = "";

    const imgPreview = document.getElementById("vision-image-preview");
    if (imgPreview) imgPreview.remove();

    const controlsContainer = document.getElementById("vision-controls");
    if (controlsContainer) controlsContainer.remove();

    const topResetBtn = document.getElementById("vision-top-reset");
    if (topResetBtn) topResetBtn.remove();

    Array.from(dropZone.children).forEach((child) => {
      child.style.display = "";
    });

    dropZone.style.display = "";
    dropZone.style.cursor = "pointer";

    outputTerminal.innerHTML =
      '<span class="vision-muted-text">Awaiting visual data...</span><span class="term-cursor"> _</span>';
  }

  // 4. Loading the Image & Silent Pre-Scan
  function processImagePayload(file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      let topResetBtn = document.getElementById("vision-top-reset");
      if (!topResetBtn) {
        topResetBtn = document.createElement("div");
        topResetBtn.id = "vision-top-reset";
        dropZone.appendChild(topResetBtn);
      }

      let imgPreview = document.getElementById("vision-image-preview");
      if (!imgPreview) {
        imgPreview = document.createElement("img");
        imgPreview.id = "vision-image-preview";
        dropZone.appendChild(imgPreview);
      }

      let controlsContainer = document.getElementById("vision-controls");
      if (!controlsContainer) {
        controlsContainer = document.createElement("div");
        controlsContainer.id = "vision-controls";
        dropZone.appendChild(controlsContainer);
      }

      Array.from(dropZone.children).forEach((child) => {
        if (
          child !== imgPreview &&
          child !== controlsContainer &&
          child !== topResetBtn &&
          child.id !== "vision-file-input"
        ) {
          child.style.display = "none";
        }
      });

      dropZone.style.cursor = "default";
      dropZone.style.display = "flex";
      dropZone.style.flexDirection = "column";
      dropZone.style.justifyContent = "center";
      dropZone.style.alignItems = "center";

      topResetBtn.style.cssText =
        "width: 90%; text-align: right; margin-bottom: 8px; animation: windowPopIn 0.3s ease forwards;";
      topResetBtn.innerHTML = `<span id="top-reset-click" style="color: #ffcc00; cursor: pointer; font-family: monospace; font-size: 13px; font-weight: bold; letter-spacing: 1px;">[ RESET SCANNER ]</span>`;
      document
        .getElementById("top-reset-click")
        .addEventListener("click", triggerReset);

      imgPreview.style.cssText =
        "width: 100%; max-height: 60%; object-fit: contain; border-radius: 6px; padding: 10px; box-sizing: border-box; filter: drop-shadow(0 0 15px var(--cyberpunk-primary)); animation: windowPopIn 0.3s ease forwards;";
      imgPreview.src = e.target.result;
      imgPreview.style.display = "block";

      controlsContainer.style.display = "none";

      const base64Data = e.target.result.split(",")[1];
      const mimeType = file.type;

      printToVisionTerminal(
        `> Uploading payload: <span style="color: var(--cyberpunk-primary);">[${file.name}]</span>...`,
      );

      setTimeout(() => {
        typeSystemLog(
          "> Scanning visual matrix for compatible protocols... ",
          20,
          async () => {
            // Start the sleek Braille spinner right after the text
            outputTerminal.innerHTML += `<span id="prescan-spinner" style="color: var(--cyberpunk-primary); font-weight: bold;"></span>`;
            const spinnerInterval = startTerminalSpinner("prescan-spinner");

            // --- SILENT PRE-SCAN ---
            let hasFood = false;
            try {
              const checkEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
              const checkBody = {
                contents: [
                  {
                    parts: [
                      {
                        text: "Look closely at this image. Is there any edible human food in it? Reply ONLY with the exact word YES or NO.",
                      },
                      {
                        inline_data: { mime_type: mimeType, data: base64Data },
                      },
                    ],
                  },
                ],
              };
              const checkRes = await fetch(checkEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(checkBody),
              });
              const checkData = await checkRes.json();

              if (
                !checkData.error &&
                checkData.candidates[0].content.parts[0].text
                  .trim()
                  .toUpperCase()
                  .includes("YES")
              ) {
                hasFood = true;
              }
            } catch (err) {
              console.error("Pre-scan failed.");
            }

            // Stop the spinner and mark as done
            clearInterval(spinnerInterval);
            const prescanSpan = document.getElementById("prescan-spinner");
            if (prescanSpan) {
              prescanSpan.innerText = "[ DONE ]";
              prescanSpan.style.color = "var(--cyberpunk-success)";
            }

            // Move to the next line and show buttons
            typeSystemLog(
              "> Awaiting protocol selection from UI panel...",
              20,
              () => {
                controlsContainer.style.cssText =
                  "width: 90%; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; animation: windowPopIn 0.5s ease forwards;";

                let buttonsHTML = `<button id="btn-protocol-poem" style="background: rgba(0, 255, 128, 0.05); border: 1px solid var(--cyberpunk-success); color: var(--cyberpunk-success); padding: 10px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 13px; font-weight: bold; width: 100%; transition: 0.2s;">[1] EXECUTE: Cyberpunk Poem</button>`;

                if (hasFood) {
                  buttonsHTML += `<button id="btn-protocol-recipe" style="background: rgba(255, 153, 0, 0.05); border: 1px solid #ff9900; color: #ff9900; padding: 10px; border-radius: 4px; cursor: pointer; font-family: monospace; font-size: 13px; font-weight: bold; width: 100%; transition: 0.2s;">[2] EXECUTE: Culinary Analysis (Recipe)</button>`;
                } else {
                  buttonsHTML += `<button id="btn-protocol-custom" style="background: rgba(188, 19, 254, 0.05); border: 1px solid var(--cyberpunk-primary); color: var(--cyberpunk-primary); padding: 10px; border-radius: 4px; cursor: not-allowed; font-family: monospace; font-size: 13px; font-weight: bold; width: 100%; opacity: 0.5; transition: 0.2s;">[2] EXECUTE: Custom Protocol (Soon)</button>`;
                }

                controlsContainer.innerHTML = buttonsHTML;
                controlsContainer.style.display = "flex";

                const poemBtn = document.getElementById("btn-protocol-poem");
                const recipeBtn = document.getElementById(
                  "btn-protocol-recipe",
                );
                const customBtn = document.getElementById(
                  "btn-protocol-custom",
                );

                poemBtn.addEventListener("mouseover", () => {
                  if (poemBtn.style.pointerEvents !== "none")
                    poemBtn.style.background = "rgba(0, 255, 128, 0.2)";
                });
                poemBtn.addEventListener("mouseout", () => {
                  if (poemBtn.style.pointerEvents !== "none")
                    poemBtn.style.background = "rgba(0, 255, 128, 0.05)";
                });

                poemBtn.addEventListener("click", function () {
                  poemBtn.style.background = "rgba(0, 255, 128, 0.4)";
                  poemBtn.innerText = "[ PROCESSING PROTOCOL... ]";
                  poemBtn.style.pointerEvents = "none";
                  if (recipeBtn) recipeBtn.style.display = "none";
                  if (customBtn) customBtn.style.display = "none";
                  if (topResetBtn) topResetBtn.style.display = "none";

                  executeAIProtocol(file, e.target.result, "poem");
                });

                if (recipeBtn) {
                  recipeBtn.addEventListener("mouseover", () => {
                    if (recipeBtn.style.pointerEvents !== "none")
                      recipeBtn.style.background = "rgba(255, 153, 0, 0.2)";
                  });
                  recipeBtn.addEventListener("mouseout", () => {
                    if (recipeBtn.style.pointerEvents !== "none")
                      recipeBtn.style.background = "rgba(255, 153, 0, 0.05)";
                  });

                  recipeBtn.addEventListener("click", function () {
                    recipeBtn.style.background = "rgba(255, 153, 0, 0.4)";
                    recipeBtn.innerText = "[ PROCESSING PROTOCOL... ]";
                    recipeBtn.style.pointerEvents = "none";
                    poemBtn.style.display = "none";
                    if (topResetBtn) topResetBtn.style.display = "none";

                    executeAIProtocol(file, e.target.result, "recipe");
                  });
                }
              },
            );
          },
        );
      }, 400);
    };

    reader.readAsDataURL(file);
  }

  // 5. The Actual API Execution with Sleek Spinner
  async function executeAIProtocol(file, fileDataUrl, protocolType) {
    printToVisionTerminal("<br>> Establishing Neural Net connection...", true);

    if (API_KEY === "PASTE_YOUR_NEW_API_KEY_HERE" || !API_KEY) {
      typewriterEffect(
        "[ERR] AUTH FAILURE: Missing API Key",
        40,
        "var(--window-close)",
      );
      return;
    }

    // Print text and start spinner
    printToVisionTerminal(
      `> Processing Data Request... <span id="exec-spinner" style="color: var(--cyberpunk-primary); font-weight: bold;"></span>`,
      true,
    );
    const execSpinnerInterval = startTerminalSpinner("exec-spinner");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
    const base64Data = fileDataUrl.split(",")[1];

    let systemPrompt = "";
    if (protocolType === "poem") {
      systemPrompt =
        "You are a cyberpunk AI system. Analyze this image and write a short, 4-line cyberpunk poem about exactly what you see in the image. Keep it dark, poetic, and related to machines, data, or neon. End the response with '> Analysis Complete.'";
    } else if (protocolType === "recipe") {
      systemPrompt =
        "You are a rogue AI chef in a cyberpunk city. Analyze the food in this image. Give the dish a gritty, neon-themed name. List the visible ingredients. Finally, write a quick, 3-step dystopian recipe to prepare it. End the response with '> Culinary Analysis Complete.'";
    }

    const requestBody = {
      contents: [
        {
          parts: [
            { text: systemPrompt },
            {
              inline_data: {
                mime_type: file.type,
                data: base64Data,
              },
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Stop the animation
      clearInterval(execSpinnerInterval);
      const spinnerEl = document.getElementById("exec-spinner");

      if (data.error) {
        if (spinnerEl) {
          spinnerEl.innerText = "[ FAILED ]";
          spinnerEl.style.color = "var(--window-close)";
        }
        console.error("API Error:", data.error);
        typewriterEffect(
          `[ERR] API Error: ${data.error.message}`,
          40,
          "var(--window-close)",
        );
        return;
      }

      // Handle Success Visuals
      if (spinnerEl) {
        spinnerEl.innerText = "[ SUCCESS ]";
        spinnerEl.style.color = "var(--cyberpunk-success)";
      }

      const realPoem = data.candidates[0].content.parts[0].text;

      // Add a tiny delay before typing starts
      setTimeout(() => {
        typewriterEffect(realPoem, 40);
      }, 400);
    } catch (error) {
      clearInterval(execSpinnerInterval);
      const spinnerEl = document.getElementById("exec-spinner");
      if (spinnerEl) {
        spinnerEl.innerText = "[ FAILED ]";
        spinnerEl.style.color = "var(--window-close)";
      }
      console.error("Fetch failed:", error);
      typewriterEffect(
        "[ERR] Neural link severed. Network failure.",
        40,
        "var(--window-close)",
      );
    }
  }

  // --- HELPER FUNCTIONS ---

  // Helper: Starts a sleek Braille loading spinner on any span ID
  function startTerminalSpinner(elementId) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    return setInterval(() => {
      const el = document.getElementById(elementId);
      if (el) el.innerText = frames[i];
      i = (i + 1) % frames.length;
    }, 80); // Speed of the spin
  }

  // Helper: Prints standard text to the terminal instantly
  function printToVisionTerminal(text, append = false) {
    const cursor = outputTerminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    if (!append) {
      outputTerminal.innerHTML = text + `<span class="term-cursor"> _</span>`;
    } else {
      outputTerminal.innerHTML += `<br>${text}<span class="term-cursor"> _</span>`;
    }
    outputTerminal.scrollTop = outputTerminal.scrollHeight;
  }

  // Helper: Types out system logs line-by-line and executes a callback when done
  function typeSystemLog(text, speed, callback) {
    const cursor = outputTerminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    outputTerminal.innerHTML += `<br><span style="color: var(--cyberpunk-success);" id="sys-typing"></span><span class="term-cursor"> _</span>`;
    const targetSpan = document.getElementById("sys-typing");

    let i = 0;
    function type() {
      if (i < text.length) {
        targetSpan.innerHTML += text.charAt(i);
        i++;
        outputTerminal.scrollTop = outputTerminal.scrollHeight;
        setTimeout(type, speed);
      } else {
        targetSpan.removeAttribute("id");
        if (callback) callback();
      }
    }
    type();
  }

  // Helper: Types out the final AI text block
  function typewriterEffect(
    text,
    speed,
    textColor = "var(--cyberpunk-primary)",
  ) {
    const cursor = outputTerminal.querySelector(".term-cursor");
    if (cursor) cursor.remove();

    outputTerminal.innerHTML += `<br><br><span style="color: ${textColor};" id="typing-span"></span><span class="term-cursor"> _</span>`;
    const targetSpan = document.getElementById("typing-span");

    let i = 0;
    function type() {
      if (i < text.length) {
        if (text.charAt(i) === "\n") {
          targetSpan.innerHTML += "<br>";
        } else {
          targetSpan.innerHTML += text.charAt(i);
        }
        i++;
        outputTerminal.scrollTop = outputTerminal.scrollHeight;
        setTimeout(type, speed);
      } else {
        targetSpan.removeAttribute("id");
        setTimeout(() => {
          printToVisionTerminal(
            "<br>> Awaiting next visual data... <span id='vision-reset-btn' style='color: #ffcc00; cursor: pointer; font-weight: bold;'>[RESET SCANNER]</span>",
            true,
          );
          document
            .getElementById("vision-reset-btn")
            .addEventListener("click", triggerReset);
        }, 1000);
      }
    }
    type();
  }
}
