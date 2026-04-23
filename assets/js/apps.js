import { fileSystem } from "./data.js";

/** Application: Interactive Terminal Console */
export function initTerminal() {
  const cmdInput = document.getElementById("cmd-input");
  const interactiveOutput = document.getElementById(
    "interactive-terminal-output",
  );
  const cmdDisplay = document.getElementById("cmd-text-display");
  const loginTimeDisplay = document.getElementById("login-time-display");

  if (loginTimeDisplay) {
    loginTimeDisplay.innerText = new Date().toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  if (cmdInput && interactiveOutput && cmdDisplay) {
    cmdInput.addEventListener("input", () => {
      cmdDisplay.textContent = cmdInput.value;
    });
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = cmdInput.value.trim();
        if (command) processCommand(command, interactiveOutput);
        cmdInput.value = "";
        cmdDisplay.textContent = "";
      }
    });
  }
}

function processCommand(cmd, interactiveOutput) {
  const echoLine = document.createElement("div");
  echoLine.style.display = "flex";
  echoLine.style.alignItems = "flex-end";
  echoLine.innerHTML = `<div class="console-prompt" style="width: 100%;"><div class="console-prompt-line1"><span class="console-blue">┌──(</span><span class="console-green">swapnadeep㉿cloud</span><span class="console-blue">)-[</span><span class="console-white">~</span><span class="console-blue">]</span></div><div class="console-prompt-line2"><span class="console-blue">└─$</span><span class="console-cmd-display" style="margin-left: 8px;">${cmd}</span></div></div>`;
  interactiveOutput.appendChild(echoLine);

  const responseLine = document.createElement("p");
  responseLine.style.color = "var(--secondary-text)";
  responseLine.style.marginBottom = "12px";

  const args = cmd.split(" ");
  const mainCmd = args[0].toLowerCase();

  switch (mainCmd) {
    case "help":
      responseLine.innerHTML =
        "Available commands:<br>- <span style='color: var(--cyberpunk-hyperlink)'>help</span>: Show this message<br>- <span style='color: var(--cyberpunk-hyperlink)'>whoami</span>: Display current user<br>- <span style='color: var(--cyberpunk-hyperlink)'>neofetch</span>: A command-line system information tool<br>- <span style='color: var(--cyberpunk-hyperlink)'>clear</span>: Clear terminal output<br>- <span style='color: var(--cyberpunk-hyperlink)'>ls</span>: List directory contents<br>- <span style='color: var(--cyberpunk-hyperlink)'>cat [file]</span>: Read file contents";
      break;
    case "neofetch":
      responseLine.innerHTML = `<div style="display: flex; gap: 20px; margin-top: 10px; margin-bottom: 10px;"><div style="color: var(--cyberpunk-secondary); font-weight: bold; line-height: 1.2;"><pre style="margin:0;">   .--.\n  /    \\\n  \\.@-@./\n  /\\_-_/\\\n //  _  \\\\\n| \\     / |\n\\_\\_'_/_/_/</pre></div><div style="display: flex; flex-direction: column; justify-content: center; font-size: 13px;"><span style="color: var(--cyberpunk-success); font-weight: bold;">swapnadeep@cloud</span><span>----------------</span><span><span style="color: var(--cyberpunk-secondary);">OS:</span> Linux Portfolio Web Edition</span><span><span style="color: var(--cyberpunk-secondary);">Host:</span> swapnadeep.cloud</span><span><span style="color: var(--cyberpunk-secondary);">Role:</span> UX Engineer</span></div></div>`;
      break;
    case "whoami":
      responseLine.textContent = "swapnadeep";
      break;
    case "clear":
      interactiveOutput.innerHTML = "";
      return;
    case "ls":
      responseLine.innerHTML =
        "<span style='color: var(--dracula-soul); font-weight: bold;'>projects/</span> &nbsp; about_me.txt &nbsp; resume.pdf";
      break;
    case "cat":
      if (args[1] === "about_me.txt") {
        responseLine.innerHTML =
          "<span style='color: var(--cyberpunk-success)'>Executing about_me.txt...</span>";
        window.toggleWindow("window-about");
      } else if (args[1] === "resume.pdf") {
        responseLine.innerHTML =
          "<span style='color: var(--cyberpunk-success)'>Executing resume.pdf...</span>";
        window.toggleWindow("window-system");
      } else {
        responseLine.textContent = `cat: ${args[1] || ""}: No such file or directory`;
        responseLine.classList.add("error-msg");
      }
      break;
    default:
      responseLine.textContent = `bash: ${mainCmd}: command not found`;
      responseLine.classList.add("error-msg");
  }
  interactiveOutput.appendChild(responseLine);
  interactiveOutput.parentElement.scrollTop =
    interactiveOutput.parentElement.scrollHeight;
}

/** Application: File Explorer */
export function initFileSystem() {
  window.toggleFolder = function (folderId) {
    const folder = document.getElementById(folderId);
    if (folder) {
      folder.classList.toggle("open");
      folder.previousElementSibling.classList.toggle("open");
    }
  };

  window.openFile = function (fileId, element) {
    document
      .querySelectorAll(".file-item")
      .forEach((el) => el.classList.remove("active"));
    element.classList.add("active");

    const fileData = fileSystem[fileId];
    if (!fileData) return;

    if (fileData.type === "executable") {
      document.getElementById("viewer-filepath").innerText = fileData.path;
      document.getElementById("viewer-content").innerHTML = `
        <div class="viewer-empty-state">
          <i class="fa-solid fa-satellite-dish browser-success-icon" style="color: var(--cyberpunk-success); animation: pulse 1s infinite;"></i>
          <p class="browser-success-text">Establishing Secure Connection...</p>
          <p style="font-size: 12px;">Rerouting visual interface to external display module.</p>
        </div>`;

      setTimeout(() => {
        window.open(fileData.url, "_blank");

        document.getElementById("viewer-content").innerHTML = `
          <div class="viewer-empty-state">
            <i class="fa-solid fa-rocket browser-success-icon" style="color: var(--cyberpunk-success);"></i>
            <p class="browser-success-text">Payload Executed Successfully</p>
            <p style="font-size: 12px;">Process is now running in an external tab.</p>
          </div>`;
      }, 1200);

      if (window.triggerAchievement) {
        window.triggerAchievement(
          "runtime",
          "Runtime Execution",
          "Compiled and executed a live project payload.",
          "fa-solid fa-bolt",
        );
      }
    } else {
      document.getElementById("viewer-filepath").innerText = fileData.path;
      document.getElementById("viewer-content").innerHTML =
        `<div class="code-block">${fileData.content.trim()}</div>`;
    }
  };

  /** Spotlight Search Exports */
  const searchOverlay = document.getElementById("search-modal-overlay");
  const paletteInput = document.getElementById("palette-search-input");
  const searchResultsContainer = document.getElementById(
    "search-results-container",
  );

  window.openSearchModal = function () {
    if (searchOverlay) {
      searchOverlay.classList.remove("hidden");
      setTimeout(() => paletteInput?.focus(), 100);
    }
  };

  window.closeSearchModal = function () {
    if (searchOverlay) {
      searchOverlay.classList.add("hidden");
      if (paletteInput) paletteInput.value = "";
      if (searchResultsContainer) searchResultsContainer.innerHTML = "";
    }
  };

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (searchOverlay?.classList.contains("hidden")) window.openSearchModal();
      else window.closeSearchModal();
    }
    if (
      e.key === "Escape" &&
      searchOverlay &&
      !searchOverlay.classList.contains("hidden")
    )
      window.closeSearchModal();
  });

  if (paletteInput) {
    paletteInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      const searchResultsContainer = document.querySelector(
        ".search-results-list",
      );

      if (!searchResultsContainer) return;

      searchResultsContainer.innerHTML = "";

      if (searchTerm === "") return;

      for (const [fileId, fileData] of Object.entries(fileSystem)) {
        if (
          fileId.toLowerCase().includes(searchTerm) ||
          (fileData.path && fileData.path.toLowerCase().includes(searchTerm)) ||
          (fileData.title && fileData.title.toLowerCase().includes(searchTerm))
        ) {
          let iconHTML = "";
          let typeDesc = "";

          if (fileData.type === "executable") {
            iconHTML =
              '<i class="fa-solid fa-bolt icon-mr-5" style="color: var(--cyberpunk-success);"></i>';
            typeDesc = "Executable System Payload";
          } else if (fileData.type === "code") {
            iconHTML =
              '<i class="fa-solid fa-file-code icon-mr-5" style="color: var(--cyberpunk-primary);"></i>';
            typeDesc = "System Configuration File";
          } else {
            iconHTML = '<i class="fa-solid fa-file icon-mr-5"></i>';
            typeDesc = "Standard Document";
          }

          const views = Math.floor(Math.random() * 50) + 1;
          const score = Math.floor(Math.random() * 100) + 1;

          const resultElement = document.createElement("div");
          resultElement.className = "search-result-item";

          resultElement.innerHTML = `
            <div class="result-header">
              <div class="result-title">${iconHTML} ${fileData.title || fileId}</div>
              <div class="result-stats">
                <span title="Views"><i class="fa-regular fa-eye"></i> ${views}</span>
                <span title="Productivity Score"><i class="fa-solid fa-bolt"></i> ${score}</span>
              </div>
            </div>
            <div class="result-desc">${fileData.path || typeDesc}</div>
            <div class="result-expand">Run Command <i class="fa-solid fa-chevron-right" style="font-size: 10px; margin-left: 5px;"></i></div>
          `;

          resultElement.onclick = () => {
            const dummyElement = document.createElement("div");

            const projectsWindow = document.getElementById("window-projects");
            if (projectsWindow && projectsWindow.classList.contains("hidden")) {
              window.toggleWindow("window-projects");
            }

            window.openFile(fileId, dummyElement);

            window.closeSearchModal();
          };

          searchResultsContainer.appendChild(resultElement);
        }
      }
    });
  }
}

/** Application: Contact Form (Web3Forms) */
export function initContactForm() {
  const wrapper = document.getElementById("roleSelectWrapper");
  const trigger = document.getElementById("roleSelectTrigger");
  const hiddenInput = document.getElementById("visitorRoleInput");

  if (wrapper && trigger && hiddenInput) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.classList.toggle("open");
    });
    document.querySelectorAll("#roleSelectOptions li").forEach((option) => {
      option.addEventListener("click", () => {
        document
          .querySelector("#roleSelectOptions li.selected")
          ?.classList.remove("selected");
        option.classList.add("selected");
        trigger.querySelector("span").textContent = option.textContent;
        trigger.querySelector("span").style.color = "var(--primary-text)";
        hiddenInput.value = option.dataset.value;
        wrapper.classList.remove("open");
      });
    });
    window.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) wrapper.classList.remove("open");
    });
  }

  const humanToggle = document.getElementById("humanToggle");
  const encryptionText = document.getElementById("encryptionText");
  const captchaLogo = document.querySelector(".captcha-logo");

  if (humanToggle && encryptionText && captchaLogo) {
    const updateSecurityState = (isSecure) => {
      encryptionText.textContent = isSecure
        ? "Protection Enabled - Your data is securely encrypted"
        : "Protection Disabled - Enable encryption to secure data";
      captchaLogo.innerHTML = isSecure ? "🛡️ Secured" : "🩻 Compromised";
    };
    updateSecurityState(false);
    humanToggle.addEventListener("change", (e) =>
      updateSecurityState(e.target.checked),
    );
  }

  const form = document.getElementById("swapnadeep-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const textSpan = btn.querySelector(".btn-text");
      const originalText = textSpan.textContent;
      textSpan.textContent = "WAIT...";
      btn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(
            Object.fromEntries(new FormData(form).entries()),
          ),
        });
        if (response.ok) {
          form.reset();
          alert("Transmission Successful");
        } else alert("Transmission Error");
      } catch (error) {
        alert("Network failure. Please try again.");
      } finally {
        textSpan.textContent = originalText;
        btn.disabled = false;
      }
    });
  }
}

/** Application: System CV Decryptor */
export function initSystemCV() {
  window.startCVDecrypt = () => {
    const idleState = document.getElementById("cv-idle-state");
    const decryptState = document.getElementById("cv-decrypting-state");
    const readyState = document.getElementById("cv-ready-state");
    if (!idleState || !decryptState || !readyState) return;

    idleState.style.display = "none";
    decryptState.style.display = "block";
    document.getElementById("cv-status-footer").innerText =
      "Status: Processing Payload...";

    let progress = 0;
    const logs = [
      "> Initializing handshake...",
      "> Validating RSA tokens...",
      "> Bypassing firewall protocols...",
      "> Payload successfully extracted.",
    ];
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          decryptState.style.display = "none";
          readyState.style.display = "block";
          document.getElementById("cv-status-footer").innerText =
            "Status: Interaction Required";
          window.triggerAchievement(
            "payload",
            "The Payload",
            "Successfully decrypted the system resume.",
            "fa-solid fa-file-shield",
          );
        }, 600);
      }
      document.getElementById("cv-progress-bar").style.width = `${progress}%`;
      document.getElementById("cv-progress-text").innerText = `${progress}%`;
      document.getElementById("cv-log-text").innerText =
        logs[
          Math.min(Math.floor((progress / 100) * logs.length), logs.length - 1)
        ];
    }, 150);
  };
}