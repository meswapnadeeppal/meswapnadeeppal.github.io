const projects = [
  {
    name: "Personal Portfolio",
    techStack: "HTML, CSS, JavaScript",
    imageUrl: "/assets/images/project-data-breach.webp",
  },
  {
    name: "C++ Algorithm Visualizer",
    techStack: "C++, Data Structures",
    imageUrl: "/assets/images/decor-programmer.webp",
  },
  {
    name: "AI / ML Data Model",
    techStack: "Python, Machine Learning",
    imageUrl: "/assets/images/project-data-breach.webp",
  },
  {
    name: "Webart Dashboard UI",
    techStack: "UI/UX, Front-End Design",
    imageUrl: "/assets/images/decor-programmer.webp",
  },
];

const container = document.getElementById("projects-container");

function renderProjects() {
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card">
            <img src="${project.imageUrl}" alt="${project.name}">
            <div class="project-overlay">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-tech-info">
                    <span>💻 ${project.techStack}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

renderProjects();
