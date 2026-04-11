const form = document.getElementById("swapnadeep-form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const dataObject = Object.fromEntries(formData.entries());

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Transmitting...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    });

    const data = await response.json();

    if (response.ok) {
      alert("[SYS_ACK] Transmission successful. Data packet delivered.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("[SYS_ERROR] Transmission failed. Please re-initiate uplink.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
