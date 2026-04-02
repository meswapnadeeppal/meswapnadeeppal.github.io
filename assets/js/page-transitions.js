document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("uplink-loader");
  const progressBar = document.getElementById("uplink-bar");
  const percentageText = document.getElementById("uplink-percentage");
  const statusText = document.getElementById("uplink-status-log");

  if (!loader) return;

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
});
