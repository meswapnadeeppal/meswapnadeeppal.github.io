<h1 align="center">InteractivePortfolio.AppImage [ root@swapnadeep ]</h1>
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=cssdesignawards&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/License_MIT-9929ea?style=for-the-badge&logo=github&logoColor=white" alt="License" />
</p>

<p align="center">
  <b>A high-performance, framework-free digital operating system built entirely from scratch.</b><br>
  <i>Showcasing advanced DOM manipulation, modular architecture, and immersive UX.</i>
</p>

<p align="center">
  <a href="https://swapnadeep.cloud"><b>🚀 Initiate Uplink: swapnadeep.cloud</b></a>
</p>

<p align="center">
  <img src="/assets/images/readme.webp" alt="WebOS Screenshot Placeholder" width="800" style="border-radius: 8px; box-shadow: 0 4px 8px var(--halloween-purple);">
</p>

---

```bash
swapnadeep@cloud:~$ ./execute_portfolio.sh --verbose
[ OK ] Initializing BIOS Boot Sequence...
[ OK ] Mounting Virtual File System...
[ OK ] Loading UX_Engine.sys...
[ OK ] Welcome to the Grid.
```

Welcome to the core repository of my interactive WebOS portfolio. More than just a gallery of past projects, this repository serves as a **verifiable demonstration of native web engineering**. By stepping away from heavy frontend frameworks like React or Vue, this project highlights a deep understanding of browser mechanics, complex state management, and immersive UI/UX design.

## 🧠 A Philosophy of Craft

In an ecosystem crowded with bloated frameworks and templated drag-and-drop builders, I chose to engineer this operating system entirely from scratch using **Vanilla JavaScript, HTML5, and CSS3**.

This approach grants absolute control over every pixel, DOM node, and paint cycle. The result? A lightweight, lightning-fast, and uniquely personalized digital environment that runs smoothly across all modern devices.

### ⚙️ System Specs

- **Architecture:** Native Web (Vanilla JS, HTML5, CSS3)
- **Design Pattern:** Modular ES6 Imports (`core.js`, `apps.js`, `data.js`)
- **Dependencies:** `0` (Zero external libraries for core UI/UX)

## 🛠️ Core Architecture & Features

- **🪟 Draggable Window Manager:** A custom-built, responsive GUI with dynamic resizing across N, S, E, and W axes, complete with active-window Z-index layering.
- **⌨️ Interactive Terminal Console:** A fully functional, custom-built command-line interface. Try commands like `help`, `whoami`, `neofetch`, `ls`, and `cat [file]`.
- **📁 Virtual File System:** Seamless integration of dynamic content payloads, managed purely as a data layer (`data.js`). Includes a spotlight-style quick search accessible via `Ctrl+K`.
- **🏆 Gamified User Experience:** A custom, `localStorage`-backed achievement system that tracks interactions (e.g., unlocking "Root Access").
- **🎨 Personalization Engine:** Real-time aesthetic overrides featuring custom wallpapers, dynamic gradients, and an immersive retro CRT scanline mode.
- **💾 Encrypted CV Decryptor:** A simulated brute-force payload extraction animation for decrypting and viewing the system resume.
- **🖱️ Context Menus:** Custom Windows 11-style right-click desktop overrides for intuitive navigation.

## 🌐 Browser Support

| Browser                      | Status                    |
| :--------------------------- | :------------------------ |
| **Chrome / Edge (Chromium)** | ✔️ Supported              |
| **Firefox**                  | ✔️ Supported              |
| **Safari**                   | ✔️ Supported              |
| **Mobile Browsers**          | ✔️ Supported (Responsive) |

## 📂 Directory Map

```
📦 [[ MESWAPNADEEPPAL.GITHUB.IO ]]
 ┣ 📂 api                       # Vercel Serverless Functions
 ┃ ┗ 📜 gemini.js               # Secure backend route for Gemini AI
 ┣ 📂 assets                    # System resources and core logic
 ┃ ┣ 📂 audio                   # Media files
 ┃ ┃ ┗ 🎵 om-namo-bhagavate-vasudevay...
 ┃ ┣ 📂 css                     # Modular stylesheet architecture
 ┃ ┃ ┣ 🎨 404.css
 ┃ ┃ ┣ 🎨 apps.css              # App-specific UI (Terminal, Vision, Forge)
 ┃ ┃ ┣ 🎨 base.css              # Global resets and CSS background gradients
 ┃ ┃ ┣ 🎨 layout.css            # Desktop, taskbar, and context menus
 ┃ ┃ ┣ 🎨 main.css              # Central import hub
 ┃ ┃ ┣ 🎨 utilities.css         # Animations, keyframes, and loaders
 ┃ ┃ ┣ 🎨 variables.css         # Global design tokens and color palettes
 ┃ ┃ ┗ 🎨 windows.css           # OS window dragging and resizing mechanics
 ┃ ┣ 📂 icons                   # Native SVG system icons
 ┃ ┃ ┣ 🖼️ accessories-notes.svg
 ┃ ┃ ┣ 🖼️ applications-interface-design.svg
 ┃ ┃ ┣ 🖼️ atom.svg
 ┃ ┃ ┣ 🖼️ bug.svg
 ┃ ┃ ┣ 🖼️ chakra.svg
 ┃ ┃ ┣ 🖼️ debian.svg
 ┃ ┃ ┣ 🖼️ favicon.svg
 ┃ ┃ ┣ 🖼️ folder-open.svg
 ┃ ┃ ┣ 🖼️ manjaro.svg
 ┃ ┃ ┣ 🖼️ text-editor.svg
 ┃ ┃ ┣ 🖼️ utilities-system-monitor.svg
 ┃ ┃ ┣ 🖼️ utilities-terminal.svg
 ┃ ┃ ┗ 🖼️ weather.svg
 ┃ ┣ 📂 images                  # Static visual assets
 ┃ ┃ ┣ 📂 desktop-background    # Wallpaper system graphics
 ┃ ┃ ┃ ┣ 🖼️ bg-forest-sunset.webp
 ┃ ┃ ┃ ┣ 🖼️ bg-new-worlds.webp
 ┃ ┃ ┃ ┣ 🖼️ bg-night-town.webp
 ┃ ┃ ┃ ┗ 🖼️ bg-retro-truck.webp
 ┃ ┃ ┣ 🖼️ background.webp
 ┃ ┃ ┣ 🖼️ error.png
 ┃ ┃ ┗ 🖼️ readme.webp
 ┃ ┗ 📂 js                      # Vanilla ES6 JavaScript Engine
 ┃   ┣ 📜 apps.js               # GUI apps, file explorer, Web3Forms
 ┃   ┣ 📜 core.js               # Window manager, boot sequence, dragging
 ┃   ┣ 📜 data.js               # Simulated virtual hard drive (JSON payloads)
 ┃   ┣ 📜 forensics.js          # Text Forge AI application logic
 ┃   ┣ 📜 main.js               # Initialization bootstrapper
 ┃   ┗ 📜 vision.js             # Neural Vision Multimodal AI logic
 ┣ 📜 404.html                  # Custom Halt/Error screen
 ┣ 📜 index.html                # Main OS DOM structure
 ┣ 📜 LICENSE                   # Open source licensing
 ┣ 📜 package.json              # Node config (forces modern ES modules)
 ┣ 📜 README.md                 # Project documentation
 ┣ 📜 robots.txt                # Search engine crawler instructions
 ┣ 📜 sitemap.xml               # SEO mapping
 ┗ 📜 vercel.json               # Serverless API routing rules
```

## 💻 Local Boot Sequence

Want to run this system locally? No node modules or build steps required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/meswapnadeeppal/meswapnadeeppal.github.io.git
   ```
2. **Navigate into the directory:**
   ```bash
   cd meswapnadeeppal.github.io
   ```
3. **Initialize the environment:**
   Simply open the `index.html` file in your preferred web browser. <br>
   _Tip: For an optimal development experience with automatic hot-reloading, use the **Live Server** extension in Visual Studio Code._

---

<div align="center">
  <i>"Explore the code behind the digital experience."</i><br><br>
  <b><a href="https://www.linkedin.com/in/meswapnadeeppal/">LinkedIn</a></b> • <b><a href="https://github.com/meswapnadeeppal">GitHub</a></b>
</div>