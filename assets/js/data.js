export const fileSystem = {
  // --- Core System Files ---
  sys_config: {
    path: "~/ sys_config.yaml",
    type: "code",
    content: `<span class="code-comment"># Environment Vars</span>\n<span class="code-keyword">user</span>: swapnadeep\n<span class="code-keyword">role</span>: UX Engineer\n<span class="code-keyword">status</span>: Open to opportunities`,
  },

  // --- Project 1: Web OS Portfolio ---
  portfolio_readme: {
    path: "📁 Projects 👉 WebOS_Portfolio 👉 readme.md",
    type: "code",
    content: `<span class="code-comment"># WebOS Portfolio Architecture</span>\n\nA custom-built, browser-based operating system serving as an interactive portfolio. It was designed to push the limits of native DOM manipulation and showcase verifiable UX design without relying on heavy frontend frameworks like React.\n\n<span class="code-keyword">Key Features:</span>\n- Draggable window management with z-index layering\n- Fully functional Linux-style terminal console\n- Custom file system with executable payloads\n- Retro CRT monitor visual overrides`,
  },
  portfolio_probs: {
    path: "📁 Projects 👉 WebOS_Portfolio 👉 problems_and_solutions.log",
    type: "code",
    content: `<span class="code-comment"># LOG: DEVELOPMENT HURDLES</span>\n\n<span class="code-keyword">[PROBLEM]</span>: Complex z-index management caused dragging windows to slip under inactive windows.\n<span class="code-function">[SOLUTION]</span>: Implemented a global 'topZIndex' counter that increments and applies to any window on 'mousedown'.\n\n<span class="code-keyword">[PROBLEM]</span>: 'X-Frame-Options' blocked remote sites from rendering inside the executable App Runner.\n<span class="code-function">[SOLUTION]</span>: Restructured architecture to host V1 portfolio files locally within the root directory, bypassing cross-origin restrictions.`,
  },
  portfolio_skills: {
    path: "📁 Projects 👉 WebOS_Portfolio 👉 required_skills.json",
    type: "code",
    content: `<span class="code-comment">// Tech Stack Payload</span>\n<span class="code-keyword">{</span>\n  <span class="code-string">"architecture"</span>: <span class="code-string">"Native Web (Vanilla JS, HTML5, CSS3)"</span>,\n  <span class="code-string">"features"</span>: [<span class="code-string">"Draggable GUI"</span>, <span class="code-string">"Live Terminal"</span>, <span class="code-string">"Custom File System"</span>],\n  <span class="code-string">"design_pattern"</span>: <span class="code-string">"Modular ES6 Imports"</span>\n<span class="code-keyword">}</span>`,
  },
  portfolio_AppImage: {
    path: "📁 Projects 👉 WebOS_Portfolio 👉 Initialize_System.AppImage",
    type: "executable",
    url: "https://github.com/meswapnadeeppal/meswapnadeeppal.github.io",
    title: "Initialize_System.AppImage",
  },
};