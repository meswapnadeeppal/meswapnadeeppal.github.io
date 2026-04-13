document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // GLOBAL UTILITIES
  // ==========================================
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==========================================
  // 1. UPLINK LOADER (Page Transitions)
  // ==========================================
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
    let messageIndex = 0;

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

        if (progress > 20 && messageIndex === 0) {
          messageIndex = 1;
          statusText.innerText = loadingMessages[messageIndex];
        } else if (progress > 50 && messageIndex === 1) {
          messageIndex = 2;
          statusText.innerText = loadingMessages[messageIndex];
        } else if (progress > 80 && messageIndex === 2) {
          messageIndex = 3;
          statusText.innerText = loadingMessages[messageIndex];
        }
      }
    }, 120);
  }

  // ==========================================
  // 2. PROJECT GRID INJECTOR (Main Components)
  // ==========================================
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
        ({ name, techStack, imageUrl }) => `
          <div class="project-card">
            <img src="${imageUrl}" alt="${name}">
            <div class="project-overlay">
              <div class="project-data">
                <h3 class="project-name">${name}</h3>
                <div class="project-tech-info">
                  <span>💻 ${techStack}</span>
                </div>
              </div>
            </div>
          </div>
      `,
      )
      .join("");
  }

  // ==========================================
  // 3. CUSTOM DROPDOWN LOGIC
  // ==========================================
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
        triggerText.style.opacity = "1";

        hiddenInput.value = option.dataset.value;

        wrapper.classList.remove("open");
      });
    });

    window.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) wrapper.classList.remove("open");
    });
  }

  // ==========================================
  // 4. ADVANCED SECURITY MODULE LOGIC
  // ==========================================
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

  // ==========================================
  // 5. SMART URL FORMATTER
  // ==========================================
  const urlInput = document.getElementById("companyLink"); // Updated to match HTML ID

  if (urlInput) {
    urlInput.addEventListener("blur", function () {
      const val = this.value.trim();
      if (val && !/^https?:\/\//i.test(val)) {
        this.value = `https://${val}`;
      }
    });
  }

  // ==========================================
  // 6. FOOTER MANTRA TYPING SEQUENCE
  // ==========================================
  const mantraText = document.getElementById("footer-mantra-text");

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

    const runFooterLoop = async () => {
      const phrase1 =
        "[ 📡 UPLINK SECURED 🧬 ACKNOWLEDGING UNIVERSAL SOURCE 🌌 ]";
      const mantras = [
        "[ 01001111 01001101 💠 ॐ नमो भगवते वासुदेवाय 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ওঁ নমো ভগবতে বাসুদেবায় 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ఓం నమో భగవతే వాసుదేవాయ 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ஓம் நமோ பகவதே வாஸுதேவாய 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ഓം നമോ ഭഗവതേ വാസുദേവായ 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ૐ નમો ભગવતે વાસુદેવાય 💠 01010110 01000001 ]",
        "[ 01001111 01001101 💠 ଓଁ ନମୋ ଭଗବତେ ବାସୁଦେବାୟ 💠 01010110 01000001 ]",
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

    const observer = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        runFooterLoop();
        obs.disconnect();
      }
    });

    observer.observe(document.querySelector(".terminal-footer-mantra"));
  }

  // ==========================================
  // 7. WEB3FORMS TRANSMISSION LOGIC
  // ==========================================
  const form = document.getElementById("swapnadeep-form");
  const submitBtn = form?.querySelector('button[type="submit"]');
  const terminal = document.getElementById("comm-terminal");

  const logToTerminal = (message, status) => {
    if (!terminal) return;

    terminal.querySelector(".cursor")?.remove();

    const newLine = document.createElement("p");
    newLine.innerHTML = `> <span class="typing-text"></span><span class="cursor"> _</span>`;

    if (status === "success") newLine.classList.add("success");
    if (status === "error") newLine.style.color = "var(--window-close)";

    terminal.appendChild(newLine);
    const textSpanTerm = newLine.querySelector(".typing-text");

    let i = 0;
    const typeWriter = () => {
      if (i < message.length) {
        textSpanTerm.textContent += message[i];
        i++;
        setTimeout(typeWriter, 15);
      }
    };

    terminal.scrollIntoView({ behavior: "smooth", block: "center" });
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

          if (triggerText) {
            triggerText.textContent = "Select your role";
            triggerText.style.color = "var(--secondary-text)";
            triggerText.style.opacity = "0.5";
          }
          document
            .querySelector("#roleSelectOptions li.selected")
            ?.classList.remove("selected");

          if (humanToggle && encryptionText && captchaLogo) {
            humanToggle.checked = false;
            encryptionText.textContent =
              "Protection Disabled - Enable encryption to secure data";
            captchaLogo.innerHTML = "🩻 Compromised";
          }
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
});