/**
 * @file data.js
 * @description Serves as the simulated local hard drive for the WebOS.
 * Contains file structures, JSON payloads, and executable app contents.
 */

export const fileSystem = {
  neural_vision: {
    path: "Package Info",
    type: "package",
    content: `
      <div style="padding: 20px; animation: windowPopIn 0.4s ease forwards;">
        <h2 style="display: flex; align-items: center; gap: 10px; font-size: 24px; color: var(--cyberpunk-circuit); margin-top: 0;">
          <span class="fa-solid fa-bolt" style="color: var(--cyberpunk-circuit)"></span> Neural_vision.AppImage
        </h2>
        
        <p style="font-size: 14px; line-height: 1.7; margin-bottom: 20px; color: var(--secondary-text);">
          <strong>Neural Vision</strong> is an advanced, multimodal AI image analysis suite integrated directly into the OS environment. Utilizing state-of-the-art neural network architecture, it transforms standard visual data into structured, actionable intelligence. By bypassing traditional file viewers, this tool allows users to extract encoded text, reverse-engineer UI layouts into raw HTML/CSS, decouple entities into structured JSON formats, and generate contextual narratives.
        </p>

        <p style="font-family: var(--font-header); font-size: 13px; line-height: 1.7; font-style: italic; opacity: 0.7; margin-bottom: 20px; color: var(--secondary-text);">
          Drag and drop any visual payload into the scanner, authenticate the neural link, and select one of the eight specialized decryption protocols below to process the visual matrix in real-time.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px 18px; font-family: var(--font-primary); color: var(--secondary-text); text-align: justify; text-justify: inter-character; background: var(--background-slate); padding: 20px; margin-bottom: 30px; border-radius: 8px; border: 2px solid var(--container-border);">
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-hyperlink);">[1] Generate Poem</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Evocative Sonnet Gen.</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Analyzes the visual matrix and synthesizes a highly detailed, original 14-line sonnet (ABAB CDCD EFEF GG) capturing the exact mood and subjects of the scene.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--dracula-soul);">[2] Extract Recipe</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Culinary Reverse Eng.</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Scans edible materials to reverse-engineer a complete recipe, including a creative name, precise measurements, and step-by-step cooking instructions.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--window-maximize);">[3] Describe Image</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Visual Matrix Scan</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Performs a deep forensic scan to provide a highly detailed, comprehensive breakdown of all visible subjects, background geometry, lighting, and atmosphere.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-primary);">[4] Extract Text</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// High-Fidelity OCR</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Isolates and transcribes all legible text, typography, signage, or documents embedded within the image exactly as they appear.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-neon);">[5] Extract Raw Data</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// JSON Entity Dump</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Parses the image into a raw machine-readable JSON structure, cataloging detected entities, dominant colors, locations, and a calculated threat level.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-circuit);">[6] Write a Story</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Memory Recovery</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Processes the image as a corrupted memory file from a destroyed android, generating a gritty, two-paragraph cyberpunk flash fiction narrative of that exact moment.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-secondary);">[7] Get Website Code</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// UI Wireframe Ext.</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Analyzes screenshots of applications or websites and attempts to reverse-engineer them into structural HTML and inline CSS code.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--synthwave-brass);">[8] Translate & Explain</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Symbol Decryption</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Scans for foreign languages, complex symbols, or technical charts, translating them to English and explaining their contextual meaning.</div>
          </div>

        </div>
        
        <button onclick="toggleWindow('window-ai-vision')" style="background: rgba(255, 0, 128, 0.1); border: 2px solid var(--cyberpunk-secondary); font-family: var(--font-header); font-weight: bold; font-size: 14px; color: var(--cyberpunk-hyperlink); text-transform: uppercase; letter-spacing: 1px; padding: 14px 20px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; width: 100%; box-shadow: 0 0 10px rgba(255, 0, 128, 0.1);">
          [ INITIATE NEURAL SCANNER ]
        </button>
      </div>`,
  },

  text_forge: {
    path: "Package Info",
    type: "package",
    content: `
      <div style="padding: 20px; animation: windowPopIn 0.4s ease forwards;">
        <h2 style="display: flex; align-items: center; gap: 10px; font-size: 24px; color: var(--cyberpunk-circuit); margin-top: 0;">
          <span class="fa-solid fa-file-signature" style="color: var(--cyberpunk-circuit)"></span> Text_Forge.AppImage
        </h2>
        
        <p style="font-size: 14px; line-height: 1.7; margin-bottom: 20px; color: var(--secondary-text);">
          <strong>Text Forge</strong> is a forensic linguistics and text transformation suite. It analyzes text payloads for AI generation footprints and plagiarism. It also includes protocols to rewrite, humanize, and restructure text to bypass automated detection systems.
        </p>

        <div style="display: grid; grid-template-columns: 1fr; gap: 20px; font-family: var(--font-primary); color: var(--secondary-text); background: var(--background-slate); padding: 20px; margin-bottom: 30px; border-radius: 8px; border: 2px solid var(--container-border);">
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--cyberpunk-neon);">[1] Plagiarism & AI Scan</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Forensic Linguistic Analysis</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Scans the text matrix to detect machine-generated linguistic patterns and calculates a probabilistic plagiarism risk score with detailed forensic notes.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--window-maximize);">[2] Structural Rewrite</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Technical Refactoring</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Acts as a senior technical editor to refine clarity and syntax. It reconstructs the text to remove repetitive AI fingerprints while strictly preserving the factual payload.</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-family: var(--font-header); font-size: 14px;"><strong style="color: var(--synthwave-brass);">[3] Humanize Payload</strong> <span style="opacity: 0.5; font-size: 11px; margin-left: 6px;">// Organic Cadence Injection</span></div>
            <div style="font-size: 12px; opacity: 0.8; line-height: 1.5;">Injects natural conversational cadence into the text. It actively strips out common AI buzzwords and introduces authentic, human-like variations in sentence structure.</div>
          </div>

        </div>
        
        <button onclick="toggleWindow('window-text-forge')" style="background: rgba(0, 128, 255, 0.1); border: 2px solid var(--cyberpunk-neon); font-family: var(--font-header); font-weight: bold; font-size: 14px; color: var(--cyberpunk-success); text-transform: uppercase; letter-spacing: 1px; padding: 14px 20px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; width: 100%; box-shadow: 0 0 10px rgba(0, 128, 255, 0.1);">
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

  /**
   * @project_01 data.js
   * Contains file structures, JSON payloads, and executable app contents.
   */
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