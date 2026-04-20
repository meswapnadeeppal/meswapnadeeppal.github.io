let topZIndex = 100;

/** Initializes draggable shortcuts on the desktop. */
export function initDraggableIcons() {
  const desktopIcons = document.querySelectorAll(".desktop-shortcut");
  desktopIcons.forEach((icon) => {
    let isDragging = false,
      hasMoved = false,
      startX,
      startY,
      initialLeft,
      initialTop;

    icon.addEventListener("mousedown", (e) => {
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      const style = window.getComputedStyle(icon);
      initialLeft = parseInt(style.left, 10);
      initialTop = parseInt(style.top, 10);

      icon.style.zIndex = ++topZIndex;
      document.body.style.userSelect = "none";

      const onMouseMove = (moveEvent) => {
        if (!isDragging) return;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
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

    icon.addEventListener(
      "click",
      (e) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { capture: true },
    );
  });
}

/** Initializes the Window Manager (Drag, Resize, Focus). */
export function initWindowManager() {
  const windows = document.querySelectorAll(".os-window");

  window.toggleWindow = (id) => {
    const win = document.getElementById(id);
    if (!win) return;
    if (win.classList.contains("hidden")) {
      win.classList.remove("hidden");
      win.style.zIndex = ++topZIndex;

      if (id === "window-terminal") {
        window.triggerAchievement(
          "root_access",
          "Root Access",
          "Initialized the command console.",
          "fa-solid fa-terminal",
        );
      }

      if (window.innerWidth > 850) {
        const leftPos = (window.innerWidth - win.offsetWidth) / 2;
        const topPos = (window.innerHeight - win.offsetHeight) / 2;
        win.style.left = `${Math.max(10, leftPos)}px`;
        win.style.top = `${Math.max(80, topPos)}px`;
      }
    } else {
      win.classList.add("hidden");
    }
  };

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

  initPersonalization();
  initAudioAndMantra();
}

/** Initializes the Win11 style Context Menu */
export function initContextMenu() {
  const contextMenu = document.getElementById("win11-context-menu");
  if (!contextMenu) return;

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    let x = e.clientX,
      y = e.clientY;
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
    if (contextMenu.classList.contains("active"))
      contextMenu.classList.remove("active");
  });
}

/** Triggers an OS Achievement Notification */
export function triggerAchievement(id, title, desc, iconClass) {
  if (localStorage.getItem(`achieved_${id}`)) return;

  localStorage.setItem(`achieved_${id}`, "true");

  const container = document.getElementById("achievement-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "achievement-toast";
  toast.innerHTML = `
    <div class="achievement-icon">
      <i class="${iconClass}"></i>
    </div>
    <div class="achievement-content">
      <span class="achievement-header">Achievement Unlocked</span>
      <span class="achievement-title">${title}</span>
      <span class="achievement-desc">${desc}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 500);
  }, 5000);
}

window.triggerAchievement = triggerAchievement;

/** Private Core Utilities */
function initPersonalization() {
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
      e.target
        .closest(".theme-grid")
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

      window.triggerAchievement(
        "aesthetic",
        "Aesthetic Override",
        "Modified the system visuals.",
        "fa-solid fa-palette",
      );
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
}

function initAudioAndMantra() {
  const ccPlayBtn = document.getElementById("cc-play-btn");
  const bgmPlayer = document.getElementById("bgm-player");
  const mediaLoadBar = document.getElementById("media-load-bar");
  const mediaProgressFill = document.getElementById("media-progress-fill");
  const mantraText = document.getElementById("footer-mantra-text");

  if (bgmPlayer) {
    bgmPlayer.volume = 0.1;
    if (ccPlayBtn) {
      ccPlayBtn.addEventListener("click", () => {
        if (!bgmPlayer.src || bgmPlayer.src === window.location.href) return;
        if (bgmPlayer.paused) {
          bgmPlayer
            .play()
            .then(() => {
              ccPlayBtn.classList.replace("fa-play", "fa-pause");
            })
            .catch(() => alert("Could not play audio."));
        } else {
          bgmPlayer.pause();
          ccPlayBtn.classList.replace("fa-pause", "fa-play");
        }
      });
    }
    if (mediaProgressFill) {
      bgmPlayer.addEventListener("timeupdate", () => {
        if (bgmPlayer.duration)
          mediaProgressFill.style.width = `${(bgmPlayer.currentTime / bgmPlayer.duration) * 100}%`;
      });
    }
    if (mediaLoadBar) {
      mediaLoadBar.addEventListener("click", (e) => {
        if (!bgmPlayer.duration) return;
        const rect = mediaLoadBar.getBoundingClientRect();
        bgmPlayer.currentTime =
          ((e.clientX - rect.left) / rect.width) * bgmPlayer.duration;
      });
    }
  }

  if (mantraText) {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
        /** Devanagari (Sanskrit/Hindi/Marathi) */
        "[ SYS.KERN 💠 ॐ नमो भगवते वासुदेवाय 💠 OMNIVERSAL_FREQ : ???Hz ]",
        /** Bengali / Assamese */
        "[ ROOT_ACCESS 💠 ওঁ নমো ভগবতে বাসুদেবায় 💠 OVERRIDE_0x00 ]",
        /** Telugu */
        "[ THREAD_EXEC 💠 ఓం నమో భగవతే వాసుదేవాయ 💠 PAYLOAD_SECURE ]",
        /** Tamil */
        "[ BIO_METRICS 💠 ஓம் நமோ பகவதே வாசுதேவாய 💠 VITAL_STABLE ]",
        /** Gujarati */
        "[ NEURAL_LINK 💠 ૐ નમો ભગવતે વાસુદેવાય 💠 SYNC_ACTIVE ]",
        /** Kannada */
        "[ QUANTUM_STATE 💠 ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ 💠 OBSERVED ]",
        /** Malayalam */
        "[ SYSTEM_UPTIME 💠 ഓം നമോ ഭഗവതേ വാസുദേവായ 💠 INFINITE ]",
        /** Odia */
        "[ CLUSTER_NODE 💠 ଓଁ ନମୋ ଭଗବତେ ବାସୁଦେବାୟ 💠 CONNECTED ]",
        /** English Transliteration */
        "[ DECRYPTING_SOUL 💠 OM NAMO BHAGAVATE VASUDEVAYA 💠 ALIGN_OK ]",
      ];
      let currentIndex = 0;
      while (true) {
        mantraText.textContent = "";
        await typeSequence(phrase1, 50);
        await sleep(1200);
        await backspaceSequence(phrase1, 15);
        await sleep(500);
        await typeSequence(mantras[currentIndex], 50);
        await sleep(1200);
        await backspaceSequence(mantras[currentIndex], 15);
        await sleep(500);
        currentIndex = (currentIndex + 1) % mantras.length;
      }
    };
    runMantraLoop();
  }
}