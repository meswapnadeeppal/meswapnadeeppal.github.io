document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const projects = [
    {
      name: "Personal Portfolio",
      techStack: "HTML, CSS, JavaScript",
      imageUrl: "/assets/images/index/project-data-breach.webp",
    },
    {
      name: "C++ Algorithm Visualizer",
      techStack: "C++, Data Structures",
      imageUrl: "/assets/images/index/decor-programmer.webp",
    },
    {
      name: "AI / ML Data Model",
      techStack: "Python, Machine Learning",
      imageUrl: "/assets/images/index/project-data-breach.webp",
    },
    {
      name: "Webart Dashboard UI",
      techStack: "UI/UX, Front-End Design",
      imageUrl: "/assets/images/index/decor-programmer.webp",
    },
  ];

  container.innerHTML = projects
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
});
