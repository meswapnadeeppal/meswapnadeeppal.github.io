import {
  initWindowManager,
  initDraggableIcons,
  initContextMenu,
} from "./core.js";
import {
  initTerminal,
  initFileSystem,
  initContactForm,
  initSystemCV,
} from "./apps.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Core System
  initLoader();
  initClock();
  initWindowManager();
  initDraggableIcons();
  initContextMenu();
  initTopBar();

  // 2. Initialize Applications
  initTerminal();
  initFileSystem();
  initContactForm();
  initSystemCV();
});

/** Handles the initial Uplink loading sequence */
function initLoader() {
  const loader = document.getElementById("uplink-loader");
  const progressBar = document.getElementById("uplink-bar");
  const percentageText = document.getElementById("uplink-percentage");
  const statusText = document.getElementById("uplink-status-log");

  if (!loader) return;

  let loadingMessages = [];

  // Check if we are on the 404 error page
  if (document.querySelector(".error-container")) {
    loadingMessages = [
      "Rerouting connection...",
      "Querying missing directories...",
      "Sector analysis failed...",
      "Entity not found...",
      "Connection terminated.",
    ];
  } else {
    // Standard homepage messages
    loadingMessages = [
      "Establishing secure connection...",
      "Bypassing mainframe security...",
      "Downloading encrypted assets...",
      "Compiling terminal interface...",
      "Access granted.",
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

/** Initializes the OS clock in the taskbar */
function initClock() {
  const clockElement = document.getElementById("os-clock");
  if (clockElement) {
    setInterval(() => {
      clockElement.innerText = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, 1000);
  }
}

/** Initializes the Control Center dropdown logic */
function initTopBar() {
  const ccToggleBtn = document.getElementById("cc-toggle-btn");
  const ccDropdown = document.getElementById("cloudweb-cc");

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
}