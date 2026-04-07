document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("roleSelectWrapper");
  const trigger = document.getElementById("roleSelectTrigger");
  const triggerText = trigger.querySelector("span");
  const options = document.querySelectorAll("#roleSelectOptions li");
  const hiddenInput = document.getElementById("visitorRoleInput");

  if (wrapper && trigger) {
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
});
