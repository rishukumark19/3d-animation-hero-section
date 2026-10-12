# FLORIA — 3D Interactive Hero Section & Codex Exhibition

An immersive, cinematic web experience featuring interactive 3D character rendering, cursor-driven dual-scene reveal, scroll-triggered narrative exhibition, and creature dossiers.

🌐 **Live Demo:** [https://rishukumark19.github.io/3d-animation-hero-section/](https://rishukumark19.github.io/3d-animation-hero-section/)

---

## ✨ Features

- **Interactive 3D Hero Model**: Real-time 3D character rendering using **Three.js** and **GLTFLoader** with responsive mouse/touch tracking and smooth damping.
- **Cursor-Follow Reveal Spotlight**: Dynamic mask revealing a daylight landscape beneath the twilight night scene as the user moves their cursor.
- **Cinematic Scroll Exhibition**: Sticky-stage expanding sanctuary portal and story annotations driven by user scroll depth.
- **Specimen & Creature Dossier**: Curated archive modal displaying detailed lore, frequencies, and origins for mystical entities.
- **Atmospheric Particle Canvas**: Ambient spore & star-dust particle simulations rendered on HTML5 2D canvas.
- **Binaural Atmospheric Tone**: Synthesized web audio drone toggle with frequency pulse feedback.
- **Zero Dependencies Build**: Pure HTML5, CSS3, and JavaScript — fast load times with no complex build steps.

---

## 🛠️ Tech Stack

- **HTML5 & Vanilla CSS3**: Custom design tokens, glassmorphism, responsive grid layouts, and smooth animations.
- **JavaScript (ES6+)**: Interactive DOM controls, modal systems, audio synthesizer, and scroll monitors.
- **Three.js (r128)**: WebGL 3D rendering pipeline for model loading (`hero.glb`), ambient/directional lighting, and pointer orientation.
- **Hosted on GitHub Pages**: Instant, zero-config static site deployment.

---

## 📂 Project Structure

```text
├── index.html         # Main application markup & sections
├── style.css          # Design system, responsive layout & keyframes
├── script.js          # Three.js 3D character engine & UI interactions
├── libs/
│   ├── three.min.js   # Three.js WebGL library
│   └── GLTFLoader.js  # GLTF/GLB asset loader
└── materials/         # 3D models (.glb), textures, and imagery
```

---

## 🚀 Running Locally

You can run this project with any local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx serve or http-server)
npx serve .
```

Then open `http://localhost:8000` in your browser.

---

## 📄 License

This project is licensed under the MIT License.
