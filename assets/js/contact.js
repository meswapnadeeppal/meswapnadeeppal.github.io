document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CUSTOM DROPDOWN LOGIC
  // ==========================================
  const wrapper = document.getElementById("roleSelectWrapper");
  const trigger = document.getElementById("roleSelectTrigger");
  const triggerText = trigger ? trigger.querySelector("span") : null;
  const options = document.querySelectorAll("#roleSelectOptions li");
  const hiddenInput = document.getElementById("visitorRoleInput");

  if (wrapper && trigger && triggerText && hiddenInput) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        triggerText.textContent = option.textContent;
        triggerText.style.color = "var(--primary-text)";
        triggerText.style.opacity = "1";

        hiddenInput.value = option.getAttribute("data-value");

        wrapper.classList.remove("open");
      });
    });

    window.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("open");
      }
    });
  }

  // ==========================================
  // 2. ADVANCED SECURITY MODULE LOGIC
  // ==========================================
  const humanToggle = document.getElementById("humanToggle");
  const encryptionText = document.getElementById("encryptionText");
  const captchaLogo = document.querySelector(".captcha-logo");

  if (humanToggle && encryptionText && captchaLogo) {
    encryptionText.textContent =
      "Protection Disabled - Enable encryption to secure data";
    captchaLogo.innerHTML = "🩻 Compromised";

    humanToggle.addEventListener("change", function () {
      if (this.checked) {
        encryptionText.textContent =
          "Protection Enabled - Your data is securely encrypted";
        captchaLogo.innerHTML = "🛡️ Secured";
      } else {
        encryptionText.textContent =
          "Protection Disabled - Enable encryption to secure data";
        captchaLogo.innerHTML = "🩻 Compromised";
      }
    });
  }

  // ==========================================
  // 👉 NEW: 3. SMART URL FORMATTER
  // ==========================================
  const urlInput = document.getElementById("website");

  if (urlInput) {
    urlInput.addEventListener("blur", function () {
      let val = this.value.trim();

      if (val !== "" && !/^https?:\/\//i.test(val)) {
        this.value = "https://" + val;
      }
    });
  }

  // ==========================================
  // 4. DIRECT WEB3FORMS TRANSMISSION LOGIC
  // ==========================================
  const form = document.getElementById("swapnadeep-form");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const dataObject = Object.fromEntries(formData.entries());

      const textSpan = submitBtn.querySelector(".btn-text");
      const originalText = textSpan.textContent;

      textSpan.textContent = "WAIT...";
      submitBtn.disabled = true;

      const logToTerminal = (message, status) => {
        const terminal = document.getElementById("comm-terminal");
        if (terminal) {
          const oldCursor = terminal.querySelector(".cursor");
          if (oldCursor) oldCursor.remove();

          const newLine = document.createElement("p");
          newLine.innerHTML = `> <span class="typing-text"></span><span class="cursor"> _</span>`;

          if (status === "success") newLine.classList.add("success");
          if (status === "error") newLine.style.color = "var(--window-close)";

          terminal.appendChild(newLine);

          const textSpanTerm = newLine.querySelector(".typing-text");
          let i = 0;
          const typingSpeed = 15;

          const typeWriter = () => {
            if (i < message.length) {
              textSpanTerm.textContent += message.charAt(i);
              i++;
              setTimeout(typeWriter, typingSpeed);
            }
          };

          typeWriter();

          terminal.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

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

          if (options) {
            options.forEach((opt) => opt.classList.remove("selected"));
          }

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
