document.addEventListener("DOMContentLoaded", () => {
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
        imageUrl: "/assets/images/background.webp",
      },
      {
        name: "C++ Algorithm Visualizer",
        techStack: "C++, Data Structures",
        imageUrl: "/assets/images/background.webp",
      },
      {
        name: "AI / ML Data Model",
        techStack: "Python, Machine Learning",
        imageUrl: "/assets/images/background.webp",
      },
      {
        name: "Webart Dashboard UI",
        techStack: "UI/UX, Front-End Design",
        imageUrl: "/assets/images/background.webp",
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
     3. DRAGGABLE DESKTOP ICONS
     ========================================== */
  const desktopIcons = document.querySelectorAll(".desktop-shortcut");

  desktopIcons.forEach((icon) => {
    let isDragging = false;
    let hasMoved = false; // Tracks if it's a drag or just a click
    let startX, startY, initialLeft, initialTop;

    icon.addEventListener("mousedown", (e) => {
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;

      // Get the current position of the icon
      const style = window.getComputedStyle(icon);
      initialLeft = parseInt(style.left, 10);
      initialTop = parseInt(style.top, 10);

      icon.style.zIndex = ++topZIndex; // Bring icon to front while dragging
      document.body.style.userSelect = "none"; // Stop text from highlighting

      const onMouseMove = (moveEvent) => {
        if (!isDragging) return;

        // Calculate how far the mouse has moved
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        // If moved more than 3 pixels, it's a drag, not a click
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved = true;
        }

        if (hasMoved) {
          icon.style.left = `${initialLeft + dx}px`;
          icon.style.top = `${initialTop + dy}px`;
        }
      };

      const onMouseUp = () => {
        isDragging = false;
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    // The Magic Trick: Intercept the click if the user dragged the icon
    icon.addEventListener(
      "click",
      (e) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation(); // Stops the toggleWindow() inline function from firing
        }
      },
      { capture: true }, // Runs this check BEFORE the HTML onclick attribute
    );
  });

  /* ==========================================
     4. OMNIDIRECTIONAL WINDOW MANAGER
     ========================================== */
  const windows = document.querySelectorAll(".os-window");
  let topZIndex = 100;

  window.toggleWindow = (id) => {
    const win = document.getElementById(id);
    if (!win) return;

    if (win.classList.contains("hidden")) {
      win.classList.remove("hidden");
      win.style.zIndex = ++topZIndex;

      const leftPos = (window.innerWidth - win.offsetWidth) / 2;
      const topPos = (window.innerHeight - win.offsetHeight) / 2;

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
     5. CAELESTIA CONTROL CENTER
     ========================================== */
  const ccToggleBtn = document.getElementById("cc-toggle-btn");
  const ccDropdown = document.getElementById("caelestia-cc");
  const ccPlayBtn = document.getElementById("cc-play-btn");
  const bgmPlayer = document.getElementById("bgm-player");
  const mediaLoadBar = document.getElementById("media-load-bar");
  const mediaProgressFill = document.getElementById("media-progress-fill");

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
     6. PERSONALIZATION CENTER & FX
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
     7. CV DECRYPTOR LOGIC (Simulation)
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
     8. INTERACTIVE TERMINAL LOGIC (KALI LINUX)
     ========================================== */
  const cmdInput = document.getElementById("cmd-input");
  const interactiveOutput = document.getElementById(
    "interactive-terminal-output",
  );
  const cmdDisplay = document.getElementById("cmd-text-display");
  const loginTimeDisplay = document.getElementById("login-time-display");

  if (loginTimeDisplay) {
    const now = new Date();
    loginTimeDisplay.innerText = now.toLocaleString("en-US", {
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
        if (command) {
          processCommand(command);
        }
        cmdInput.value = "";
        cmdDisplay.textContent = "";
      }
    });
  }

  function processCommand(cmd) {
    const echoLine = document.createElement("div");
    echoLine.style.display = "flex";
    echoLine.style.alignItems = "flex-end";
    echoLine.style.marginBottom = "8px";

    echoLine.innerHTML = `
      <div class="kali-prompt" style="width: 100%;">
        <div class="kali-prompt-line1"><span class="kali-blue">┌──(</span><span class="kali-green">swapnadeep㉿cloud</span><span class="kali-blue">)-[</span><span class="kali-white">~</span><span class="kali-blue">]</span></div>
        <div class="kali-prompt-line2">
          <span class="kali-blue">└─$</span>
          <span class="kali-cmd-display" style="margin-left: 8px;">${cmd}</span>
        </div>
      </div>
    `;
    interactiveOutput.appendChild(echoLine);

    const responseLine = document.createElement("p");
    responseLine.style.fontFamily =
      "'Fira Code', 'Consolas', 'Courier New', monospace";
    responseLine.style.marginBottom = "15px";
    responseLine.style.color = "#ccc";

    const args = cmd.split(" ");
    const mainCmd = args[0].toLowerCase();

    switch (mainCmd) {
      case "help":
        responseLine.innerHTML =
          "Available commands:<br>- <span style='color: var(--cyberpunk-hyperlink)'>help</span>: Show this message<br>- <span style='color: var(--cyberpunk-hyperlink)'>whoami</span>: Display current user<br>- <span style='color: var(--cyberpunk-hyperlink)'>neofetch</span>: A command-line system information tool<br>- <span style='color: var(--cyberpunk-hyperlink)'>date</span>: Show current date/time<br>- <span style='color: var(--cyberpunk-hyperlink)'>clear</span>: Clear terminal output<br>- <span style='color: var(--cyberpunk-hyperlink)'>ls</span>: List directory contents<br>- <span style='color: var(--cyberpunk-hyperlink)'>pwd</span>: Print working directory<br>- <span style='color: var(--cyberpunk-hyperlink)'>echo [text]</span>: Print text<br>- <span style='color: var(--cyberpunk-hyperlink)'>cat [file]</span>: Read file contents";
        break;
      case "neofetch":
        responseLine.innerHTML = `
          <div style="display: flex; gap: 20px; margin-top: 10px; margin-bottom: 10px;">
            <div style="color: var(--cyberpunk-secondary); font-weight: bold; line-height: 1.2;">
              <pre style="margin:0;">
       .---.
      /     \\
      \\.@-@./
      /\\_-_/\\
     //  _  \\\\
    | \\     / |
    \\_\\_'_/_/_/
               </pre>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; font-size: 13px;">
              <span style="color: var(--cyberpunk-success); font-weight: bold;">swapnadeep@cloud</span>
              <span>----------------</span>
              <span><span style="color: var(--cyberpunk-secondary);">OS:</span> Linux Portfolio Web Edition</span>
              <span><span style="color: var(--cyberpunk-secondary);">Host:</span> swapnadeep.cloud</span>
              <span><span style="color: var(--cyberpunk-secondary);">Kernel:</span> 6.1.0-custom-amd64</span>
              <span><span style="color: var(--cyberpunk-secondary);">Uptime:</span> 24/7/365</span>
              <span><span style="color: var(--cyberpunk-secondary);">Packages:</span> 1337 (dpkg)</span>
              <span><span style="color: var(--cyberpunk-secondary);">Shell:</span> zsh 5.9</span>
              <span><span style="color: var(--cyberpunk-secondary);">Role:</span> UX Engineer / Developer</span>
            </div>
          </div>
        `;
        break;
      case "whoami":
        responseLine.textContent = "swapnadeep";
        break;
      case "date":
        responseLine.textContent = new Date().toString();
        break;
      case "pwd":
        responseLine.textContent = "/home/swapnadeep";
        break;
      case "clear":
        interactiveOutput.innerHTML = "";
        return;
      case "ls":
        responseLine.innerHTML =
          "<span style='color: #2674e8; font-weight: bold;'>projects/</span> &nbsp; <span style='color: #2674e8; font-weight: bold;'>contact/</span> &nbsp; about_me.txt &nbsp; resume.pdf";
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
          "swapnadeep is not in the sudoers file. This incident will be reported.";
        responseLine.classList.add("error-msg");
        break;
      default:
        responseLine.textContent = `bash: ${mainCmd}: command not found`;
        responseLine.classList.add("error-msg");
    }

    interactiveOutput.appendChild(responseLine);

    const terminalContentWrapper = interactiveOutput.parentElement;
    terminalContentWrapper.scrollTop = terminalContentWrapper.scrollHeight;
  }

  /* ==========================================
     9. MEDIA PLAYER & MANTRA
     ========================================== */
  if (bgmPlayer) {
    bgmPlayer.volume = 0.1;

    if (ccPlayBtn) {
      ccPlayBtn.addEventListener("click", () => {
        if (!bgmPlayer.src || bgmPlayer.src === window.location.href) {
          console.error("Audio Error: No audio source file found in the HTML.");
          return;
        }

        if (bgmPlayer.paused) {
          bgmPlayer
            .play()
            .then(() => {
              ccPlayBtn.classList.remove("fa-play");
              ccPlayBtn.classList.add("fa-pause");
            })
            .catch((error) => {
              console.error(
                "Audio Error: Browser blocked playback or file missing.",
                error,
              );
              alert("Could not play audio. Check the F12 Console for details.");
            });
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

  const mantraText = document.getElementById("footer-mantra-text");
  if (mantraText) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
        "[ 01001111 01001101 💠 ॐ नमो भगवते वासुदेवाय 💠 01010110 01000001 ]", // Devanagari (Hindi/Sanskrit)
        "[ 01001111 01001101 💠 ওঁ নমো ভগবতে বাসুদেবায় 💠 01010110 01000001 ]", // Bengali
        "[ 01001111 01001101 💠 ૐ નમો ભગવતે વાસુદેવાય 💠 01010110 01000001 ]", // Gujarati
        "[ 01001111 01001101 💠 ଓଁ ନମୋ ଭଗବତେ ବାସୁଦେବାୟ 💠 01010110 01000001 ]", // Odia
        "[ 01001111 01001101 💠 ఓం నమో భగవతే వాసుదేవాయ 💠 01010110 01000001 ]", // Telugu
        "[ 01001111 01001101 💠 ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ 💠 01010110 01000001 ]", // Kannada
        "[ 01001111 01001101 💠 ஓம் நமோ பகவதே வாசுதேவாய 💠 01010110 01000001 ]", // Tamil
        "[ 01001111 01001101 💠 ഓം നമോ ഭഗവതേ വാസുദേവായ 💠 01010110 01000001 ]", // Malayalam
        "[ 01001111 01001101 💠 ਓਮ ਨਮੋ ਭਗਵਤੇ ਵਾਸੁਦੇਵਾਯ 💠 01010110 01000001 ]", // Punjabi (Gurmukhi)
        "[ 01001111 01001101 💠 OM NAMO BHAGAVATE VASUDEVAYA 💠 01010110 01000001 ]", // Latin (English)
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
     10. FORM LOGIC & SECURITY
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
     11. WEB3FORMS TRANSMISSION LOGIC
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
     12. WINDOWS 11 CUSTOM CONTEXT MENU
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
