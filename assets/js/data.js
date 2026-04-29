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
        <h2 style="display: flex; align-items: center; gap: 10px; font-size: 24px; color: var(--cyberpunk-primary);">
          <span class="fa-solid fa-bolt"></span> Neural_vision.AppImage
        </h2>
        
        <p style="font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
          <strong>Neural Vision</strong> is an advanced, multimodal AI image analysis suite integrated directly into the OS environment. Utilizing state-of-the-art neural network architecture, it transforms standard visual data into structured, actionable intelligence. By bypassing traditional file viewers, this tool allows users to extract encoded text, reverse-engineer UI layouts into raw HTML/CSS, decouple entities into structured JSON formats, and generate contextual narratives.
        </p>

        <p style="font-family: var(--font-header); font-size: 13px; line-height: 1.7;  font-style: italic; opacity: 0.7; margin-bottom: 20px;">
          Drag and drop any visual payload into the scanner, authenticate the neural link, and select one of the eight specialized decryption protocols below to process the visual matrix in real-time.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-family: var(--font-header); font-size: 13px; color: var(--secondary-text); background: var(--background-slate); padding: 15px; margin-bottom: 30px; border-radius: 8px; border: 2px solid var(--container-border);">
          <div><strong style="color: #ffd700;">[1]</strong> Write a Poem - <em style="font-family: var(--font-primary); opacity: 0.8;">Evocative Sonnet Gen.</em></div>
          <div><strong style="color: #ff8c00;">[2]</strong> Extract Recipe - <em style="font-family: var(--font-primary); opacity: 0.8;">Culinary Reverse Eng.</em></div>
          <div><strong style="color: #00ff00;">[3]</strong> Describe Image - <em style="font-family: var(--font-primary); opacity: 0.8;">Visual Matrix Scan</em></div>
          <div><strong style="color: #b026ff;">[4]</strong> Extract Text - <em style="font-family: var(--font-primary); opacity: 0.8;">High-Fidelity OCR</em></div>
          <div><strong style="color: #00e5ff;">[5]</strong> Extract Raw Data - <em style="font-family: var(--font-primary); opacity: 0.8;">JSON Entity Dump</em></div>
          <div><strong style="color: #ff3366;">[6]</strong> Write a Story - <em style="font-family: var(--font-primary); opacity: 0.8;">Memory Recovery</em></div>
          <div><strong style="color: #00ffcc;">[7]</strong> Get Website Code - <em style="font-family: var(--font-primary); opacity: 0.8;">UI Wireframe Ext.</em></div>
          <div><strong style="color: #ffffff;">[8]</strong> Translate & Explain - <em style="font-family: var(--font-primary); opacity: 0.8;">Symbol Decryption</em></div>
        </div>
        
        <button onclick="toggleWindow('window-ai-vision')" style="background: rgba(0, 255, 128, 0.1); border: 2px solid var(--cyberpunk-success); font-family: var(--font-header); font-weight: bold; font-size: 14px; color: var(--cyberpunk-success); text-transform: uppercase; letter-spacing: 1px; padding: 14px 20px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; width: 100%; box-shadow: 0 0 10px rgba(0,255,128,0.1);">
          [ INITIATE NEURAL SCANNER ]
        </button>
      </div>`,
  },

  text_forge: {
    path: "Package Info",
    type: "package",
    content: `
      <div style="padding: 20px; animation: windowPopIn 0.4s ease forwards;">
        <h2 style="color: var(--cyberpunk-primary); font-family: var(--font-header); margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 24px;">
          <span class="fa-solid fa-file-signature"></span> Text_Forge.AppImage
        </h2>
        
        <p style="opacity: 0.8; line-height: 1.7; font-size: 14px; margin-bottom: 20px;">
          <strong>Text Forge</strong> is a forensic linguistics and text transformation suite. It analyzes text payloads for AI generation footprints and plagiarism. It also includes protocols to rewrite, humanize, and restructure text to bypass automated detection systems.
        </p>

        <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 30px; font-family: var(--font-header); font-size: 13px; color: var(--secondary-text); background: var(--background-slate); padding: 15px; border-radius: 8px; border: 2px solid var(--container-border);">
          <div><strong style="color: #3b82f6;">[1]</strong> Plagiarism & AI Scan</div>
          <div><strong style="color: #10b981;">[2]</strong> Restructure / Rewrite</div>
          <div><strong style="color: #f59e0b;">[3]</strong> Humanize Payload</div>
        </div>
        
        <button onclick="toggleWindow('window-text-forge')" style="background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6; color: #3b82f6; padding: 14px 20px; border-radius: 4px; cursor: pointer; font-family: var(--font-header); font-weight: bold; font-size: 14px; text-transform: uppercase; transition: all 0.3s ease; width: 100%; letter-spacing: 1px;">
          [ INITIATE TEXT FORGE ]
        </button>
      </div>`,
  },

  sys_config: {
    path: "~/ sys_config.yaml",
    type: "code",
    content: `<span class="code-comment"># SYSTEM KERNEL CONFIGURATION</span>
    <span class="code-keyword">hostname</span>: <span style="color: var(--cyberpunk-hyperlink);"> swapnadeep.cloud </span>
    <span class="code-keyword">os_version</span>: <span style="opacity: 0.9;"> SynthwaveOS 4.0.6 </span>
    <span class="code-keyword">security_clearance</span>: <span style="opacity: 0.9;"> LEVEL_9_ROOT </span>
    
    <span class="code-comment"># GLOBAL SYSTEM CONFIGURATION</span>
    <span class="code-keyword">user_profile</span>: <span style="opacity: 0.9;"> Swapnadeep Pal </span>
    <span class="code-keyword">role</span>: <span style="opacity: 0.9;"> UX Engineer & System Architect </span>
    <span class="code-keyword">location</span>: <span style="opacity: 0.9;"> Kolkata, IN </span>
    <span class="code-keyword">status</span>: <span style="color: var(--cyberpunk-success);"> Open to opportunities </span>

    <span class="code-comment"># LOAD TECH MODULES</span>
    <span class="code-keyword">core_stack</span>: <span style="opacity: 0.9;"> [ HTML, CSS, Vanilla JS ] </span>
    <span class="code-keyword">integrations</span>: <span style="opacity: 0.9;"> [ Gemini API, GitHub, Vercel ] </span>
    <span class="code-keyword">contact_node</span>: <span style="color: var(--cyberpunk-hyperlink); opacity: 0.9;"> meswapnadeeppal@gmail.com </span>

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