/**
 * @file data.js
 * @description Serves as the simulated local hard drive for the WebOS.
 * Contains file structures, JSON payloads, and executable app contents.
 */

export const fileSystem = {
  // --- Core System Files ---
  neural_vision: {
    path: "Package Info",
    type: "package",
    content: `
      <div style="padding: 20px; animation: windowPopIn 0.4s ease forwards;">
        <h2 style="color: var(--cyberpunk-primary); font-family: var(--font-header); margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 24px;">
          <span class="fa-solid fa-bolt"></span> Neural_vision.AppImage
        </h2>
        
        <p style="opacity: 0.8; line-height: 1.7; font-size: 14px; margin-bottom: 20px;">
          <strong>Neural Vision</strong> is an advanced, multimodal AI image analysis suite integrated directly into the OS environment. Utilizing state-of-the-art neural network architecture, it transforms standard visual data into structured, actionable intelligence. By bypassing traditional file viewers, this tool allows users to extract encoded text, reverse-engineer UI layouts into raw HTML/CSS, decouple entities into structured JSON formats, and generate contextual narratives.
        </p>

        <p style="opacity: 0.7; line-height: 1.7; font-family: var(--font-header); font-size: 13px; margin-bottom: 20px; font-style: italic;">
          Drag and drop any visual payload into the scanner, authenticate the neural link, and select one of the eight specialized decryption protocols below to process the visual matrix in real-time.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px; font-family: var(--font-header); font-size: 13px; color: var(--secondary-text); background: var(--background-slate); padding: 15px; border-radius: 8px; border: 2px solid var(--container-border);">
          <div><strong style="color: #ffd700;">[1]</strong> Write a Poem - <em style="font-family: var(--font-primary); opacity: 0.8;">Evocative Sonnet Gen.</em></div>
          <div><strong style="color: #ff8c00;">[2]</strong> Extract Recipe - <em style="font-family: var(--font-primary); opacity: 0.8;">Culinary Reverse Eng.</em></div>
          <div><strong style="color: #00ff00;">[3]</strong> Describe Image - <em style="font-family: var(--font-primary); opacity: 0.8;">Visual Matrix Scan</em></div>
          <div><strong style="color: #b026ff;">[4]</strong> Extract Text - <em style="font-family: var(--font-primary); opacity: 0.8;">High-Fidelity OCR</em></div>
          <div><strong style="color: #00e5ff;">[5]</strong> Extract Raw Data - <em style="font-family: var(--font-primary); opacity: 0.8;">JSON Entity Dump</em></div>
          <div><strong style="color: #ff3366;">[6]</strong> Write a Story - <em style="font-family: var(--font-primary); opacity: 0.8;">Memory Recovery</em></div>
          <div><strong style="color: #00ffcc;">[7]</strong> Get Website Code - <em style="font-family: var(--font-primary); opacity: 0.8;">UI Wireframe Ext.</em></div>
          <div><strong style="color: #ffffff;">[8]</strong> Translate & Explain - <em style="font-family: var(--font-primary); opacity: 0.8;">Symbol Decryption</em></div>
        </div>
        
        <button onclick="toggleWindow('window-ai-vision')" style="background: rgba(0, 255, 128, 0.1); border: 1px solid var(--cyberpunk-success); color: var(--cyberpunk-success); padding: 14px 20px; border-radius: 4px; cursor: pointer; font-family: var(--font-header); font-weight: bold; font-size: 14px; text-transform: uppercase; transition: all 0.3s ease; width: 100%; letter-spacing: 1px; box-shadow: 0 0 10px rgba(0,255,128,0.1);">
          [ INITIATE NEURAL SCANNER ]
        </button>
      </div>`,
  },

  sys_config: {
    path: "~/ sys_config.yaml",
    type: "code",
    content: `<span class="code-comment"># SYSTEM KERNEL CONFIGURATION</span>
    <span class="code-keyword">hostname</span>: swapnadeep.cloud
    <span class="code-keyword">os_version</span>: SynthwaveOS 4.0.6
    <span class="code-keyword">security_clearance</span>: LEVEL_9_ROOT
    
    <span class="code-comment"># GLOBAL SYSTEM CONFIGURATION</span>
    <span class="code-keyword">user_profile</span>: Swapnadeep Pal
    <span class="code-keyword">role</span>: UX Engineer & System Architect
    <span class="code-keyword">location</span>: Kolkata, IN
    <span class="code-keyword">status</span>: Open to opportunities

    <span class="code-comment"># LOAD TECH MODULES</span>
    <span class="code-keyword">core_stack</span>: [ HTML, CSS, Vanilla JS ]
    <span class="code-keyword">integrations</span>: [ Gemini API, GitHub, Vercel ]
    <span class="code-keyword">contact_node</span>: hello@swapnadeep.cloud

    <span class="code-keyword">system_status</span>: ALL SYSTEMS NOMINAL
    <span class="code-keyword">auto_exec</span>: "Awaiting recruiter uplink..."`,
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