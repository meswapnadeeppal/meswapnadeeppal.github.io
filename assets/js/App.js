document.addEventListener("DOMContentLoaded", () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ==========================================
     1. UPLINK LOADER (Initial Boot Sequence)
     ========================================== */
  const loader = document.getElementById("uplink-loader");
  const progressBar = document.getElementById("uplink-bar");
  const percentageText = document.getElementById("uplink-percentage");
  const statusText = document.getElementById("uplink-status-log");

  if (loader && progressBar && percentageText && statusText) {
    let loadingMessages = [
      "Establishing secure connection...",
      "Bypassing mainframe security...",
      "Downloading encrypted assets...",
      "Compiling terminal interface...",
      "Access granted.",
    ];

    if (document.title.includes("404")) {
      loadingMessages = [
        "Scanning sector for data...",
        "Navigating orbital debris...",
        "Uplink tether severed...",
        "Drifting into the void...",
        "Critical Error: 404.",
      ];
    }

    let progress = 0;
    const simulateLoading = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(simulateLoading);
        progressBar.style.width = "100%";
        percentageText.innerText = "100%";
        statusText.innerText = loadingMessages[loadingMessages.length - 1];
        setTimeout(() => {
          loader.classList.add("uplink-hidden");
          document.body.classList.remove("locked");
        }, 400);
      } else {
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;
        const messageIndex = Math.floor(
          (progress / 100) * (loadingMessages.length - 1),
        );
        statusText.innerText = loadingMessages[messageIndex];
      }
    }, 120);
  }

  /* ==========================================
     2. PROJECT DATA INJECTOR
     ========================================== */
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    const projects = [
      {
        name: "Personal Portfolio",
        techStack: "HTML, CSS, JavaScript",
        imageUrl: "/assets/images/project1.webp",
      },
      {
        name: "C++ Algorithm Visualizer",
        techStack: "C++, Data Structures",
        imageUrl: "/assets/images/project2.webp",
      },
      {
        name: "AI / ML Data Model",
        techStack: "Python, Machine Learning",
        imageUrl: "/assets/images/project3.webp",
      },
      {
        name: "Webart Dashboard UI",
        techStack: "UI/UX, Front-End Design",
        imageUrl: "/assets/images/project4.webp",
      },
    ];
    projectsContainer.innerHTML = projects
      .map(
        (p) => `
      <div class="project-card">
        <img src="${p.imageUrl}" alt="${p.name}">
        <div class="project-overlay">
          <div class="project-data">
            <h3 class="project-name">${p.name}</h3>
            <div class="project-tech-info"><span>💻 ${p.techStack}</span></div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  /* ==========================================
     3. OMNIDIRECTIONAL WINDOW MANAGER
     ========================================== */
  const windows = document.querySelectorAll(".os-window");
  let topZIndex = 100;

  window.toggleWindow = (id) => {
    const win = document.getElementById(id);
    if (!win) return;

    if (win.classList.contains("hidden")) {
      // Show window and bring to front
      win.classList.remove("hidden");
      win.style.zIndex = ++topZIndex;

      // Calculate the exact center of the screen
      const leftPos = (window.innerWidth - win.offsetWidth) / 2;
      const topPos = (window.innerHeight - win.offsetHeight) / 2;

      // Apply the centered coordinates
      // Math.max(10, ...) ensures the window never spawns off-screen or under the top bar
      win.style.left = `${Math.max(10, leftPos)}px`;
      win.style.top = `${Math.max(80, topPos)}px`;
    } else {
      win.classList.add("hidden");
    }
  };

  const clockElement = document.getElementById("os-clock");
  if (clockElement) {
    setInterval(() => {
      clockElement.innerText = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, 1000);
  }

  windows.forEach((win) => {
    const header = win.querySelector(".window-header");

    const dirs = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
    dirs.forEach((dir) => {
      const resizer = document.createElement("div");
      resizer.className = `resizer ${dir}`;
      win.appendChild(resizer);
      resizer.addEventListener("mousedown", initResize, false);
    });

    win.addEventListener("mousedown", () => {
      win.style.zIndex = ++topZIndex;
    });

    let isDragging = false,
      isResizing = false,
      currentResizer;
    let startX, startY, initialX, initialY, initialW, initialH;

    const onMouseMove = (e) => {
      if (isDragging) {
        win.style.left = `${initialX + (e.clientX - startX)}px`;
        win.style.top = `${initialY + (e.clientY - startY)}px`;
      } else if (isResizing) {
        const dir = currentResizer.className.split(" ")[1];
        if (dir.includes("e"))
          win.style.width = initialW + (e.clientX - startX) + "px";
        if (dir.includes("s"))
          win.style.height = initialH + (e.clientY - startY) + "px";
        if (dir.includes("w")) {
          win.style.width = initialW - (e.clientX - startX) + "px";
          win.style.left = initialX + (e.clientX - startX) + "px";
        }
        if (dir.includes("n")) {
          win.style.height = initialH - (e.clientY - startY) + "px";
          win.style.top = initialY + (e.clientY - startY) + "px";
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      isResizing = false;
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    header.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("win-btn")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = win.offsetLeft;
      initialY = win.offsetTop;
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function initResize(e) {
      isResizing = true;
      currentResizer = e.target;
      startX = e.clientX;
      startY = e.clientY;
      initialX = win.offsetLeft;
      initialY = win.offsetTop;
      initialW = parseInt(document.defaultView.getComputedStyle(win).width, 10);
      initialH = parseInt(
        document.defaultView.getComputedStyle(win).height,
        10,
      );
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });

  /* ==========================================
     4. CAELESTIA CONTROL CENTER
     ========================================== */
  const ccToggleBtn = document.getElementById("cc-toggle-btn");
  const ccDropdown = document.getElementById("caelestia-cc");
  const ccPlayBtn = document.getElementById("cc-play-btn");
  const bgmPlayer = document.getElementById("bgm-player");
  const mediaLoadBar = document.getElementById("media-load-bar");
  const mediaProgressFill = document.getElementById("media-progress-fill");
  const mantraText = document.getElementById("footer-mantra-text");

  if (ccToggleBtn && ccDropdown) {
    ccToggleBtn.addEventListener("click", () => {
      ccDropdown.classList.toggle("visible");
    });
  }

  document.addEventListener("click", (e) => {
    if (ccDropdown && ccDropdown.classList.contains("visible")) {
      const clickedInsideDropdown = ccDropdown.contains(e.target);
      const clickedHamburger = ccToggleBtn && ccToggleBtn.contains(e.target);
      if (!clickedInsideDropdown && !clickedHamburger) {
        ccDropdown.classList.remove("visible");
      }
    }
  });

  /* ==========================================
     5. PERSONALIZATION CENTER & FX
     ========================================== */
  const tabGradients = document.getElementById("tab-gradients");
  const tabWallpapers = document.getElementById("tab-wallpapers");
  const gridGradients = document.getElementById("grid-gradients");
  const gridWallpapers = document.getElementById("grid-wallpapers");
  const allBgSwatches = document.querySelectorAll(
    "#grid-gradients .swatch, #grid-wallpapers .swatch",
  );
  const allBgClasses = [
    "bg-grad-1",
    "bg-grad-2",
    "bg-grad-3",
    "bg-grad-4",
    "bg-img-1",
    "bg-img-2",
    "bg-img-3",
    "bg-img-4",
  ];

  let currentMode = localStorage.getItem("os-bg-mode") || "gradient";
  let savedGrad = localStorage.getItem("os-bg-grad") || "bg-grad-1";
  let savedImg = localStorage.getItem("os-bg-img") || "bg-img-1";

  document.body.classList.remove(...allBgClasses);
  if (currentMode === "gradient") {
    document.body.classList.add(savedGrad);
    if (tabGradients) tabGradients.classList.add("active");
    if (tabWallpapers) tabWallpapers.classList.remove("active");
    if (gridGradients) gridGradients.style.display = "grid";
    if (gridWallpapers) gridWallpapers.style.display = "none";
  } else {
    document.body.classList.add(savedImg);
    if (tabWallpapers) tabWallpapers.classList.add("active");
    if (tabGradients) tabGradients.classList.remove("active");
    if (gridGradients) gridGradients.style.display = "none";
    if (gridWallpapers) gridWallpapers.style.display = "grid";
  }

  allBgSwatches.forEach((swatch) => {
    if (swatch.dataset.bg === savedGrad || swatch.dataset.bg === savedImg)
      swatch.classList.add("active");
    else swatch.classList.remove("active");
  });

  if (tabGradients && tabWallpapers) {
    tabGradients.addEventListener("click", () => {
      currentMode = "gradient";
      localStorage.setItem("os-bg-mode", currentMode);
      tabGradients.classList.add("active");
      tabWallpapers.classList.remove("active");
      gridGradients.style.display = "grid";
      gridWallpapers.style.display = "none";
      document.body.classList.remove(...allBgClasses);
      document.body.classList.add(savedGrad);
    });

    tabWallpapers.addEventListener("click", () => {
      currentMode = "wallpaper";
      localStorage.setItem("os-bg-mode", currentMode);
      tabWallpapers.classList.add("active");
      tabGradients.classList.remove("active");
      gridGradients.style.display = "none";
      gridWallpapers.style.display = "grid";
      document.body.classList.remove(...allBgClasses);
      document.body.classList.add(savedImg);
    });
  }

  allBgSwatches.forEach((swatch) => {
    swatch.addEventListener("click", (e) => {
      const newBg = e.target.dataset.bg;
      const parentGrid = e.target.closest(".theme-grid");
      parentGrid
        .querySelectorAll(".swatch")
        .forEach((s) => s.classList.remove("active"));
      e.target.classList.add("active");

      document.body.classList.remove(...allBgClasses);
      document.body.classList.add(newBg);

      if (newBg.includes("grad")) {
        savedGrad = newBg;
        localStorage.setItem("os-bg-grad", savedGrad);
      } else {
        savedImg = newBg;
        localStorage.setItem("os-bg-img", savedImg);
      }
    });
  });

  const toggleCrt = document.getElementById("toggle-crt");
  if (localStorage.getItem("os-crt") === "enabled") {
    document.body.classList.add("crt-mode");
    if (toggleCrt) toggleCrt.checked = true;
  }
  if (toggleCrt) {
    toggleCrt.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.classList.add("crt-mode");
        localStorage.setItem("os-crt", "enabled");
      } else {
        document.body.classList.remove("crt-mode");
        localStorage.setItem("os-crt", "disabled");
      }
    });
  }

  /* ==========================================
     6. CV DECRYPTOR LOGIC
     ========================================== */
  window.startCVDecrypt = () => {
    const idleState = document.getElementById("cv-idle-state");
    const decryptState = document.getElementById("cv-decrypting-state");
    const readyState = document.getElementById("cv-ready-state");
    const progressBar = document.getElementById("cv-progress-bar");
    const progressText = document.getElementById("cv-progress-text");
    const logText = document.getElementById("cv-log-text");
    const footerText = document.getElementById("cv-status-footer");

    if (!idleState || !decryptState || !readyState) return;

    idleState.style.display = "none";
    decryptState.style.display = "block";
    if (footerText) footerText.innerText = "Status: Processing Payload...";

    let progress = 0;
    const logs = [
      "> Initializing handshake...",
      "> Validating RSA tokens...",
      "> Bypassing firewall protocols...",
      "> Decrypting 256-bit AES payload...",
      "> Compiling PDF structure...",
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
          if (footerText) footerText.innerText = "Status: Interaction Required";
        }, 600);
      }

      progressBar.style.width = `${progress}%`;
      progressText.innerText = `${progress}%`;

      const logIndex = Math.min(
        Math.floor((progress / 100) * logs.length),
        logs.length - 1,
      );
      logText.innerText = logs[logIndex];
    }, 150);
  };

  /* ==========================================
     7. INTERACTIVE TERMINAL LOGIC (POWERSHELL THEME)
     ========================================== */
  const cmdInput = document.getElementById("cmd-input");
  const interactiveOutput = document.getElementById(
    "interactive-terminal-output",
  );
  const cmdDisplay = document.getElementById("cmd-text-display");

  // Keep the live prompt time updated
  const updateTerminalTime = () => {
    const timeEl = document.getElementById("live-prompt-time");
    if (timeEl) {
      const now = new Date();
      timeEl.innerText = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  };
  updateTerminalTime();
  setInterval(updateTerminalTime, 60000);

  if (cmdInput && interactiveOutput && cmdDisplay) {
    cmdInput.addEventListener("input", () => {
      cmdDisplay.textContent = cmdInput.value;
    });

    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = cmdInput.value.trim();
        if (command) {
          processCommand(command);
        }
        cmdInput.value = "";
        cmdDisplay.textContent = "";
      }
    });
  }

  function processCommand(cmd) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // 1. Create the echoed prompt line
    const echoLine = document.createElement("div");
    echoLine.style.display = "flex";
    echoLine.style.alignItems = "center";
    echoLine.style.marginBottom = "8px";

    echoLine.innerHTML = `
      <div class="ps-prompt">
        <div class="ps-seg orange"><i class="fa-brands fa-windows"></i> Swapnadeep</div>
        <div class="ps-seg yellow">~</div>
        <div class="ps-seg green"></div>
        <div class="ps-time"><i class="fa-regular fa-clock"></i> <span>${timeStr}</span></div>
        <div class="ps-arrow">➔</div>
      </div>
      <span class="pwsh-cmd-display">${cmd}</span>
    `;
    interactiveOutput.appendChild(echoLine);

    // 2. Process the command response
    const responseLine = document.createElement("p");
    responseLine.style.fontFamily = "'Consolas', 'Courier New', monospace";
    responseLine.style.marginBottom = "15px";
    responseLine.style.color = "#ccc";

    const args = cmd.split(" ");
    const mainCmd = args[0].toLowerCase();

    switch (mainCmd) {
      case "help":
        responseLine.innerHTML =
          "Available commands:<br>- <span style='color: var(--cyberpunk-hyperlink)'>help</span>: Show this message<br>- <span style='color: var(--cyberpunk-hyperlink)'>whoami</span>: Display current user<br>- <span style='color: var(--cyberpunk-hyperlink)'>date</span>: Show current date/time<br>- <span style='color: var(--cyberpunk-hyperlink)'>clear</span>: Clear terminal output<br>- <span style='color: var(--cyberpunk-hyperlink)'>ls</span>: List directory contents<br>- <span style='color: var(--cyberpunk-hyperlink)'>pwd</span>: Print working directory<br>- <span style='color: var(--cyberpunk-hyperlink)'>echo [text]</span>: Print text<br>- <span style='color: var(--cyberpunk-hyperlink)'>cat [file]</span>: Read file contents";
        break;
      case "whoami":
        responseLine.textContent = "swapnadeep@cloud";
        break;
      case "date":
        responseLine.textContent = new Date().toString();
        break;
      case "pwd":
        responseLine.textContent = "C:\\Users\\Swapnadeep";
        break;
      case "clear":
        interactiveOutput.innerHTML = "";
        return;
      case "ls":
        responseLine.innerHTML =
          "<span style='color: var(--cyberpunk-hyperlink)'>projects/</span> &nbsp; <span style='color: var(--cyberpunk-hyperlink)'>contact/</span> &nbsp; about_me.txt &nbsp; resume.pdf";
        break;
      case "echo":
        responseLine.textContent = args.slice(1).join(" ");
        break;
      case "cat":
        if (args[1] === "about_me.txt") {
          responseLine.innerHTML =
            "<span style='color: var(--cyberpunk-success)'>Executing about_me.txt...</span>";
          toggleWindow("window-about");
        } else if (args[1] === "resume.pdf") {
          responseLine.innerHTML =
            "<span style='color: var(--cyberpunk-success)'>Executing resume.pdf...</span>";
          toggleWindow("window-system");
        } else {
          responseLine.textContent = `cat: ${args[1] || ""}: No such file or directory`;
          responseLine.classList.add("error-msg");
        }
        break;
      case "sudo":
        responseLine.textContent =
          "The term 'sudo' is not recognized as the name of a cmdlet, function, script file, or operable program.";
        responseLine.classList.add("error-msg");
        break;
      default:
        responseLine.textContent = `${mainCmd} : The term '${mainCmd}' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`;
        responseLine.classList.add("error-msg");
    }

    interactiveOutput.appendChild(responseLine);

    // Auto-scroll to bottom
    const terminalContentWrapper = interactiveOutput.parentElement;
    terminalContentWrapper.scrollTop = terminalContentWrapper.scrollHeight;
  }

  /* ==========================================
     8. MEDIA PLAYER & MANTRA
     ========================================== */
  if (bgmPlayer) {
    if (ccPlayBtn) {
      ccPlayBtn.addEventListener("click", () => {
        if (!bgmPlayer.src || bgmPlayer.src === window.location.href) return;
        if (bgmPlayer.paused) {
          bgmPlayer.play();
          ccPlayBtn.classList.remove("fa-play");
          ccPlayBtn.classList.add("fa-pause");
        } else {
          bgmPlayer.pause();
          ccPlayBtn.classList.remove("fa-pause");
          ccPlayBtn.classList.add("fa-play");
        }
      });
    }

    if (mediaProgressFill) {
      bgmPlayer.addEventListener("timeupdate", () => {
        if (bgmPlayer.duration) {
          const percentage = (bgmPlayer.currentTime / bgmPlayer.duration) * 100;
          mediaProgressFill.style.width = `${percentage}%`;
        }
      });
    }

    if (mediaLoadBar) {
      mediaLoadBar.addEventListener("click", (e) => {
        if (!bgmPlayer.duration) return;
        const rect = mediaLoadBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        bgmPlayer.currentTime = percentage * bgmPlayer.duration;
      });
    }
  }

  if (mantraText) {
    const typeSequence = async (text, speed) => {
      for (let char of text) {
        mantraText.textContent += char;
        await sleep(speed);
      }
    };
    const backspaceSequence = async (text, speed) => {
      for (let i = text.length; i >= 0; i--) {
        mantraText.textContent = text.substring(0, i);
        await sleep(speed);
      }
    };

    const runMantraLoop = async () => {
      const phrase1 =
        "[ 📡 UPLINK SECURED 🧬 ACKNOWLEDGING UNIVERSAL SOURCE 🌌 ]";
      const mantras = [
        "[ 01001111 01001101 💠 ॐ नमो भगवते वासुदेवाय 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ওঁ নমো ভগবতে বাসুদেবায় 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 OM NAMO BHAGAVATE VASUDEVAYA 💠 01010110 01000001 ]",
      ];
      let currentIndex = 0;
      while (true) {
        mantraText.textContent = "";
        await typeSequence(phrase1, 50);
        await sleep(1200);
        await backspaceSequence(phrase1, 15);
        await sleep(500);
        let currentMantra = mantras[currentIndex];
        await typeSequence(currentMantra, 50);
        await sleep(1200);
        await backspaceSequence(currentMantra, 15);
        await sleep(500);
        currentIndex = (currentIndex + 1) % mantras.length;
      }
    };
    runMantraLoop();
  }

  /* ==========================================
     9. FORM LOGIC & SECURITY
     ========================================== */
  const wrapper = document.getElementById("roleSelectWrapper");
  const trigger = document.getElementById("roleSelectTrigger");
  const triggerText = trigger?.querySelector("span");
  const options = document.querySelectorAll("#roleSelectOptions li");
  const hiddenInput = document.getElementById("visitorRoleInput");

  if (wrapper && trigger && triggerText && hiddenInput) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.classList.toggle("open");
    });
    options.forEach((option) => {
      option.addEventListener("click", () => {
        document
          .querySelector("#roleSelectOptions li.selected")
          ?.classList.remove("selected");
        option.classList.add("selected");
        triggerText.textContent = option.textContent;
        triggerText.style.color = "var(--primary-text)";
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
    humanToggle.addEventListener("change", (e) => {
      updateSecurityState(e.target.checked);
    });
  }

  /* ==========================================
     10. WEB3FORMS TRANSMISSION LOGIC
     ========================================== */
  const form = document.getElementById("swapnadeep-form");
  const submitBtn = form?.querySelector('button[type="submit"]');

  const logToTerminal = (message, status) => {
    const terminalWin = document.getElementById("window-transmission-log");
    if (terminalWin) {
      terminalWin.classList.remove("hidden");
      terminalWin.style.zIndex = ++topZIndex;
    }

    const terminalBody = document.getElementById("comm-terminal");
    if (!terminalBody) return;

    terminalBody.querySelector(".term-cursor")?.remove();
    const newLine = document.createElement("p");
    newLine.innerHTML = `> <span class="typing-text"></span><span class="term-cursor">_</span>`;

    if (status === "success") newLine.classList.add("success");
    if (status === "error") newLine.classList.add("error-msg");
    terminalBody.appendChild(newLine);

    const textSpanTerm = newLine.querySelector(".typing-text");
    let i = 0;
    const typeWriter = () => {
      if (i < message.length) {
        textSpanTerm.textContent += message[i];
        i++;
        setTimeout(typeWriter, 15);
      }
    };
    terminalBody.scrollIntoView({ behavior: "smooth", block: "end" });
    typeWriter();
  };

  if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dataObject = Object.fromEntries(new FormData(form).entries());
      const textSpan = submitBtn.querySelector(".btn-text");
      const originalText = textSpan.textContent;
      textSpan.textContent = "WAIT...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataObject),
        });
        const data = await response.json();

        if (response.ok) {
          logToTerminal(
            "[SYS_ACK] Transmission successful. Data packet delivered.",
            "success",
          );
          form.reset();
        } else {
          logToTerminal(
            `[SYS_ERR] Transmission Error: ${data.message}`,
            "error",
          );
        }
      } catch (error) {
        logToTerminal(
          "[SYS_ERR] Network failure. Please re-initiate uplink.",
          "error",
        );
      } finally {
        textSpan.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================
     11. WINDOWS 11 CUSTOM CONTEXT MENU
     ========================================== */
  const contextMenu = document.getElementById("win11-context-menu");

  if (contextMenu) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      let x = e.clientX;
      let y = e.clientY;

      const menuWidth = 250;
      const menuHeight = contextMenu.offsetHeight || 200;

      if (x + menuWidth > window.innerWidth)
        x = window.innerWidth - menuWidth - 5;
      if (y + menuHeight > window.innerHeight)
        y = window.innerHeight - menuHeight - 5;

      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
      contextMenu.classList.add("active");
    });

    document.addEventListener("click", () => {
      if (contextMenu.classList.contains("active")) {
        contextMenu.classList.remove("active");
      }
    });
  }
});
