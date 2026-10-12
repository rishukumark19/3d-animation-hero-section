/**
 * FLORIA v20 — All 25 Enhancements + original interactions
 */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. LOADING SCREEN
  // =========================================================================
  const floriaLoader = document.getElementById('floriaLoader');
  const loaderBar    = document.getElementById('loaderBar');
  const loaderLabel  = document.getElementById('loaderLabel');
  const loaderSteps  = [
    { pct: 18,  label: 'MAPPING REALM 01...'       },
    { pct: 42,  label: 'WEAVING CODEX THREADS...'  },
    { pct: 67,  label: 'CALIBRATING 528 HZ...'     },
    { pct: 88,  label: 'UNLOCKING SANCTUARIES...'  },
    { pct: 100, label: 'REALM OPEN — ENTER'        },
  ];
  let loaderStep = 0;
  function advanceLoader() {
    if (loaderStep >= loaderSteps.length) return;
    const { pct, label } = loaderSteps[loaderStep++];
    if (loaderBar)   loaderBar.style.width  = pct + '%';
    if (loaderLabel) loaderLabel.textContent = label;
    if (loaderStep < loaderSteps.length) {
      setTimeout(advanceLoader, 320 + Math.random() * 220);
    } else {
      setTimeout(() => {
        if (floriaLoader) floriaLoader.classList.add('is-hidden');
        document.body.style.overflow = '';
      }, 550);
    }
  }
  if (floriaLoader) {
    document.body.style.overflow = 'hidden';
    setTimeout(advanceLoader, 200);
  }

  // =========================================================================
  // 2. SCROLL PROGRESS BAR
  // =========================================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    if (!scrollProgressBar) return;
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgressBar.style.width = (isNaN(pct) ? 0 : pct).toFixed(2) + '%';
  }, { passive: true });

  // =========================================================================
  // 3. CUSTOM CURSOR
  // =========================================================================
  const customCursor = document.getElementById('customCursor');
  let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    const dot  = customCursor.querySelector('.cursor-dot');
    const ring = customCursor.querySelector('.cursor-ring');
    window.addEventListener('mousemove', e => { cursorX = e.clientX; cursorY = e.clientY; });
    (function updateCursor() {
      ringX += (cursorX - ringX) * 0.09;
      ringY += (cursorY - ringY) * 0.09;
      if (dot)  dot.style.transform  = 'translate3d(' + cursorX + 'px,' + cursorY + 'px,0) translate(-50%,-50%)';
      if (ring) ring.style.transform = 'translate3d(' + ringX   + 'px,' + ringY   + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(updateCursor);
    })();
    document.addEventListener('mouseover', e => {
      const el = e.target.closest('a,button,[role=button],.discovery-card,.landscape-hotspot');
      customCursor.classList.toggle('is-hovering', !!el);
    });
  }

  // =========================================================================
  // 4. BACK TO TOP
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) backToTopBtn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // =========================================================================
  // 5. AMBIENT PARTICLE SYSTEM
  // =========================================================================
  const pCanvas = document.getElementById('particlesCanvas');
  if (pCanvas) {
    const ctx = pCanvas.getContext('2d');
    const resize = () => { pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -Math.random() * 0.35 - 0.08,
      op: Math.random() * 0.5 + 0.1,
      flicker: Math.random() * Math.PI * 2,
    }));
    (function draw() {
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.flicker += 0.015;
        if (p.y < -5) { p.y = pCanvas.height + 5; p.x = Math.random() * pCanvas.width; }
        if (p.x < -5)              p.x = pCanvas.width + 5;
        if (p.x > pCanvas.width + 5) p.x = -5;
        const a = p.op * (0.6 + 0.4 * Math.sin(p.flicker));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,225,180,' + a.toFixed(3) + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  // =========================================================================
  // 6. MOBILE NAV HAMBURGER
  // =========================================================================
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const open = mobileMenuBtn.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', String(open));
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.toggle('is-open', open);
        mobileNavDrawer.setAttribute('aria-hidden', String(!open));
      }
    });
  }
  document.querySelectorAll('.mobile-nav-link, #mobileNavCta').forEach(l => {
    l.addEventListener('click', () => {
      if (mobileMenuBtn)  { mobileMenuBtn.classList.remove('is-open'); mobileMenuBtn.setAttribute('aria-expanded','false'); }
      if (mobileNavDrawer){ mobileNavDrawer.classList.remove('is-open'); mobileNavDrawer.setAttribute('aria-hidden','true'); }
    });
  });

  // =========================================================================
  // 7. SCROLL DOWN INDICATOR — hide on first scroll
  // =========================================================================
  const scrollDownIndicator = document.getElementById('scrollDownIndicator');
  let indHidden = false;
  window.addEventListener('scroll', () => {
    if (!indHidden && window.scrollY > 80) {
      indHidden = true;
      if (scrollDownIndicator) scrollDownIndicator.classList.add('is-hidden');
    }
  }, { passive: true });

  // =========================================================================
  // CORE DOM ELEMENTS
  // =========================================================================
  const cursorGlow       = document.getElementById('cursorGlow');
  const dominantText     = document.getElementById('dominantText');
  const heroScreen       = document.getElementById('heroScreen');
  const creaturesModal   = document.getElementById('creaturesModal');
  const exploreModal     = document.getElementById('exploreModal');
  const heroRevealLayer  = document.getElementById('heroRevealLayer');
  const spotlightGlowEdge= document.getElementById('spotlightGlowEdge');
  const audioToggle      = document.getElementById('audioToggle');
  const audioStateText   = audioToggle ? audioToggle.querySelector('.audio-state-text') : null;

  let spotTargetX = -9999, spotTargetY = -9999;
  let spotCurrentX = -9999, spotCurrentY = -9999;
  let isHoveringHero = false, targetRevealOpacity = 0, currentRevealOpacity = 0;
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let currentX = mouseX, currentY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (heroScreen) {
      const r = heroScreen.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        spotTargetX = e.clientX - r.left;
        spotTargetY = e.clientY - r.top;
        if (spotCurrentX === -9999) { spotCurrentX = spotTargetX; spotCurrentY = spotTargetY; }
        isHoveringHero = true; targetRevealOpacity = 1;
      } else { isHoveringHero = false; targetRevealOpacity = 0; }
    }
  });
  document.addEventListener('mouseleave', () => { isHoveringHero = false; targetRevealOpacity = 0; });

  (function renderLoop() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    if (cursorGlow) cursorGlow.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0) translate(-50%,-50%)';
    if (dominantText) {
      const tx = (mouseX / window.innerWidth  - 0.5) * 16;
      const ty = (mouseY / window.innerHeight - 0.5) * 8;
      dominantText.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    }
    if (heroRevealLayer) {
      if (isHoveringHero) {
        if (spotCurrentX === -9999) { spotCurrentX = spotTargetX; spotCurrentY = spotTargetY; }
        else {
          spotCurrentX += (spotTargetX - spotCurrentX) * 0.12;
          spotCurrentY += (spotTargetY - spotCurrentY) * 0.12;
        }
      }
      currentRevealOpacity += (targetRevealOpacity - currentRevealOpacity) * 0.1;
      if (currentRevealOpacity < 0.005 && !isHoveringHero) {
        heroRevealLayer.style.opacity = '0';
        if (spotlightGlowEdge) spotlightGlowEdge.style.opacity = '0';
      } else {
        const op = currentRevealOpacity.toFixed(3);
        const xs = spotCurrentX.toFixed(1) + 'px';
        const ys = spotCurrentY.toFixed(1) + 'px';
        heroRevealLayer.style.opacity = op;
        heroRevealLayer.style.setProperty('--spot-x', xs);
        heroRevealLayer.style.setProperty('--spot-y', ys);
        if (spotlightGlowEdge) {
          spotlightGlowEdge.style.opacity = op;
          spotlightGlowEdge.style.setProperty('--spot-x', xs);
          spotlightGlowEdge.style.setProperty('--spot-y', ys);
        }
      }
    }
    requestAnimationFrame(renderLoop);
  })();

  // =========================================================================
  // MODAL MANAGEMENT
  // =========================================================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const cb = modal.querySelector('.modal-close-btn');
    if (cb) cb.focus();
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  const meetCreaturesBtn   = document.getElementById('meetCreaturesBtn');
  const exploreFloriaBtn   = document.getElementById('exploreFloriaBtn');
  const navCtaBtn          = document.getElementById('navCtaBtn');
  const closeCreaturesModal= document.getElementById('closeCreaturesModal');
  const closeExploreModal  = document.getElementById('closeExploreModal');
  const modalExploreBtn    = document.getElementById('modalExploreBtn');
  const backToHeroBtn      = document.getElementById('backToHeroBtn');
  const beginJourneyBtn    = document.getElementById('beginJourneyBtn');

  if (meetCreaturesBtn)    meetCreaturesBtn.addEventListener('click', () => openModal(creaturesModal));
  if (exploreFloriaBtn)    exploreFloriaBtn.addEventListener('click', () => openModal(exploreModal));
  if (navCtaBtn)           navCtaBtn.addEventListener('click', () => openModal(exploreModal));
  if (closeCreaturesModal) closeCreaturesModal.addEventListener('click', () => closeModal(creaturesModal));
  if (closeExploreModal)   closeExploreModal.addEventListener('click', () => closeModal(exploreModal));
  if (backToHeroBtn)       backToHeroBtn.addEventListener('click', () => closeModal(exploreModal));
  if (modalExploreBtn)     modalExploreBtn.addEventListener('click', () => { closeModal(creaturesModal); setTimeout(() => openModal(exploreModal), 250); });
  if (beginJourneyBtn)     beginJourneyBtn.addEventListener('click', () => {
    beginJourneyBtn.textContent = 'Entering Floria...';
    setTimeout(() => { closeModal(exploreModal); beginJourneyBtn.innerHTML = 'Begin Journey &rarr;'; }, 1200);
  });
  [creaturesModal, exploreModal].forEach(m => m && m.addEventListener('click', e => { if (e.target === m) closeModal(m); }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(creaturesModal); closeModal(exploreModal); closeDossier(); }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (link.getAttribute('href') === '#creatures') openModal(creaturesModal);
      else openModal(exploreModal);
    });
  });

  // =========================================================================
  // AMBIENT AUDIO
  // =========================================================================
  let audioCtx = null, isAudioPlaying = false, masterGain = null;
  function initAudio() {
    if (audioCtx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);
      [55, 110, 164.81].forEach((f, i) => {
        const osc = audioCtx.createOscillator(), g = audioCtx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        g.gain.setValueAtTime(i === 0 ? 0.35 : 0.15, audioCtx.currentTime);
        osc.connect(g); g.connect(filter); osc.start();
      });
      filter.connect(masterGain); masterGain.connect(audioCtx.destination);
    } catch(e) {}
  }
  function toggleAudio() {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (!isAudioPlaying) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 2.5);
      isAudioPlaying = true;
      if (audioToggle) audioToggle.classList.add('is-active');
      if (audioStateText) audioStateText.textContent = 'SOUND: ON';
    } else {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      isAudioPlaying = false;
      if (audioToggle) audioToggle.classList.remove('is-active');
      if (audioStateText) audioStateText.textContent = 'SOUND: OFF';
    }
  }
  if (audioToggle) audioToggle.addEventListener('click', toggleAudio);
  function playTone(freq, dur, type) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator(), g = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      g.gain.setValueAtTime(0.04, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      osc.connect(g); g.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch(e) {}
  }

  // =========================================================================
  // 8. CARD FILTER TABS
  // =========================================================================
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true');
      const f = tab.getAttribute('data-filter');
      document.querySelectorAll('.discovery-card').forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        card.classList.toggle('is-filtered-out', f !== 'all' && cat !== f);
      });
    });
  });

  // =========================================================================
  // 9. DOSSIER MODAL
  // =========================================================================
  const dossierOverlay = document.getElementById('dossierOverlay');
  const dossierClose   = document.getElementById('dossierClose');
  const dossierContent = document.getElementById('dossierContent');

  const DOSSIER = {
    'aether-weaver': {
      badge: 'ENTITY 01 &bull; NOCTURNAL WEAVER',
      name:  'Aether Weaver',
      img:   'materials/creature-weaver.jpg',
      desc:  'Spins luminous filaments from dormant twilight pollen to stitch boundary sanctuaries across the deep velvet moss canopy.',
      stats: [{l:'Harmonic',v:'528 Hz'},{l:'Habitat',v:'Deep Shadows'},{l:'Rarity',v:'Legendary'},{l:'Activity',v:'Nocturnal'},{l:'Affinity',v:'Twilight Pollen'},{l:'First Log',v:'Vol. III'}],
      lore:  'When the Aether Weaver stirs at dusk, the canopy brightens — a beacon older than any map in the Codex.',
    },
    'obsidian-bloom': {
      badge: 'SPECIMEN 02 &bull; BOTANICAL RELIC',
      name:  'Nocturne Obsidian Bloom',
      img:   'materials/obsidian-bloom.jpg',
      desc:  'Carved of volcanic glass petals, uncoiling once every century at the winter solstice to exhale warm copper embers into the frost.',
      stats: [{l:'Core Temp',v:'+64 C'},{l:'Substrate',v:'Basalt Crust'},{l:'Rarity',v:'Volcanic Rare'},{l:'Bloom Cycle',v:'Centennial'},{l:'Root Depth',v:'3km'},{l:'First Log',v:'Vol. VI'}],
      lore:  'The bloom exhales warm copper embers carrying whispers of older eruptions.',
    },
    'spun-hills': {
      badge: 'DOMAIN 03 &bull; LIVING ARCHITECTURE',
      name:  'Valley of the Spun Hills',
      img:   'materials/Whimsical Knitted Hillside Village.png',
      desc:  'A gentle mountain haven where cobblestones and thatched roofs are hand-stitched into the hillside, sheltering 42 elder weavers.',
      stats: [{l:'Elevation',v:'1,420M'},{l:'Community',v:'42 Weavers'},{l:'Atmosphere',v:'Spiced Autumn'},{l:'Harmonic',v:'528 Hz'},{l:'Sector',v:'04-G'},{l:'Status',v:'Unlocked'}],
      lore:  'Each cobblestone staircase is hand-stitched into the living earth — the hill itself has forgotten it was ever stone.',
    },
    'moon-cervid': {
      badge: 'ENTITY 04 &bull; TWILIGHT GUARDIAN',
      name:  'Moon-Horned Cervid',
      img:   'materials/moon-stag.jpg',
      desc:  'An ethereal wanderer whose crystalline antler crown gathers cosmic starlight, guiding lost explorers across misted glacial hollows.',
      stats: [{l:'Behavior',v:'Solitary'},{l:'Aura',v:'Astral Lumen'},{l:'Rarity',v:'Celestial'},{l:'Habitat',v:'Glacial Hollows'},{l:'Sighting',v:'Dusk only'},{l:'First Log',v:'Vol. VII'}],
      lore:  'Follow the cervid and you will never be lost — though you may arrive somewhere you did not know you needed to go.',
    },
    'elder-cartographer': {
      badge: 'FIGURE 05 &bull; EXPEDITION GUIDE',
      name:  'The Elder Cartographer',
      img:   'materials/front pic.jpg',
      desc:  'Master of the codex, charting secret hollows with aromatic cinnamon pipe-smoke and hand-bound parchment scrolls.',
      stats: [{l:'Status',v:'Recording'},{l:'Expedition',v:'Vol. IX'},{l:'Rarity',v:'Keeper'},{l:'Domain',v:'All Realms'},{l:'Tools',v:'Parchment, Pipe'},{l:'Age',v:'Unknown'}],
      lore:  'He has mapped every hollow — but insists the most important territories are the unmapped ones.',
    },
  };

  function buildDossierHTML(d) {
    const statsHTML = d.stats.map(s =>
      '<div class="dossier-stat"><span class="dossier-stat-label">' + s.l + '</span><span class="dossier-stat-value">' + s.v + '</span></div>'
    ).join('');
    return (
      '<div class="dossier-header">' +
        '<img class="dossier-img" src="' + d.img + '" alt="' + d.name + '">' +
        '<div class="dossier-meta">' +
          '<span class="dossier-badge">' + d.badge + '</span>' +
          '<h2>' + d.name + '</h2>' +
          '<p>' + d.desc + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="dossier-stats">' + statsHTML + '</div>' +
      '<div class="dossier-lore">' + d.lore + '</div>'
    );
  }

  function openDossier(id) {
    const d = DOSSIER[id];
    if (!d || !dossierContent) return;
    dossierContent.innerHTML = buildDossierHTML(d);
    if (dossierOverlay) {
      dossierOverlay.classList.add('is-open');
      dossierOverlay.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
    if (dossierClose) dossierClose.focus();
  }

  function closeDossier() {
    if (dossierOverlay) {
      dossierOverlay.classList.remove('is-open');
      dossierOverlay.setAttribute('aria-hidden', 'true');
    }
    if (!document.querySelector('.modal-overlay.is-open')) document.body.style.overflow = '';
  }

  if (dossierClose)   dossierClose.addEventListener('click', closeDossier);
  if (dossierOverlay) dossierOverlay.addEventListener('click', e => { if (e.target === dossierOverlay) closeDossier(); });
  document.querySelectorAll('.card-dossier-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openDossier(btn.getAttribute('data-creature')); });
  });

  // =========================================================================
  // 10. CTA RIPPLE RING
  // =========================================================================
  const enterWorldBtn = document.getElementById('enterWorldBtn');
  if (enterWorldBtn) {
    enterWorldBtn.addEventListener('click', () => {
      enterWorldBtn.classList.add('is-rippling');
      setTimeout(() => enterWorldBtn.classList.remove('is-rippling'), 750);
      playTone(432, 0.45, 'triangle');
      openModal(exploreModal);
    });
  }

  // =========================================================================
  // 11. NEWSLETTER
  // =========================================================================
  const newsletterBtn     = document.getElementById('newsletterBtn');
  const newsletterInput   = document.getElementById('newsletterInput');
  const newsletterConfirm = document.getElementById('newsletterConfirm');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const val = (newsletterInput && newsletterInput.value.trim()) || '';
      if (!val || !val.includes('@')) {
        if (newsletterInput) {
          newsletterInput.style.outline = '1.5px solid rgba(211,89,44,0.7)';
          setTimeout(() => { if (newsletterInput) newsletterInput.style.outline = ''; }, 1500);
        }
        return;
      }
      if (newsletterInput) newsletterInput.value = '';
      if (newsletterConfirm) {
        newsletterConfirm.classList.add('is-visible');
        setTimeout(() => newsletterConfirm.classList.remove('is-visible'), 4000);
      }
    });
  }
  if (newsletterInput) newsletterInput.addEventListener('keydown', e => { if (e.key === 'Enter' && newsletterBtn) newsletterBtn.click(); });

  // =========================================================================
  // 12. STAT COUNTER — animated count-up on scroll into view
  // =========================================================================
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el   = entry.target;
        const text = el.textContent;
        const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suf  = text.replace(/[0-9.,]/g, '').trim();
        if (!isNaN(num) && num > 0) {
          const dur = 1200, t0 = performance.now();
          (function tick(now) {
            const p  = Math.min((now - t0) / dur, 1);
            const e2 = 1 - Math.pow(1 - p, 3);
            const c  = Math.round(e2 * num * 10) / 10;
            el.textContent = (Number.isInteger(num) ? Math.round(c) : c.toFixed(1)) + (suf ? ' ' + suf : '');
            if (p < 1) requestAnimationFrame(tick); else el.textContent = text;
          })(t0);
        }
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.spec-row strong').forEach(el => co.observe(el));
  }

  // =========================================================================
  // 3D HERO MODEL
  // =========================================================================
  function initHero3D() {
    const canvas    = document.getElementById('hero3dCanvas');
    const container = document.getElementById('hero3dContainer');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.set(0, 0, 2.3);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    if (renderer.outputEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

    scene.add(new THREE.AmbientLight(0xffffff, 1.25));
    const kl = new THREE.DirectionalLight(0xfff3e0, 2.2); kl.position.set(2.5,3.5,3); scene.add(kl);
    const fl = new THREE.DirectionalLight(0xd2e5ff, 1.1); fl.position.set(-2.5,1.8,2); scene.add(fl);
    const rl = new THREE.DirectionalLight(0xffe6b8, 1.8); rl.position.set(0,2.5,-2.5); scene.add(rl);

    const pivot = new THREE.Group(); scene.add(pivot);
    let loaded = false, tRY = 0, tRX = 0, cRY = 0, cRX = 0;

    if (THREE.GLTFLoader) {
      new THREE.GLTFLoader().load('materials/hero.glb', gltf => {
        const m   = gltf.scene;
        const box = new THREE.Box3().setFromObject(m);
        const ctr = box.getCenter(new THREE.Vector3());
        const sz  = box.getSize(new THREE.Vector3());
        const sc  = 1.30 / Math.max(sz.x, sz.y, sz.z);
        m.scale.set(sc, sc, sc);
        m.position.x = -ctr.x * sc;
        m.position.y = -ctr.y * sc - 0.08;
        m.position.z = -ctr.z * sc;
        m.traverse(c => {
          if (c.isMesh && c.material) {
            (Array.isArray(c.material) ? c.material : [c.material]).forEach(mat => {
              mat.roughness  = Math.min(mat.roughness, 0.72);
              mat.transparent= false; mat.depthWrite = true;
              mat.depthTest  = true;  mat.opacity    = 1;
              mat.needsUpdate= true;
            });
          }
        });
        pivot.add(m); loaded = true;
      }, undefined, e => console.warn('hero.glb:', e));
    }

    (function a3d() {
      requestAnimationFrame(a3d);
      if (loaded) {
        const nx = (mouseX / window.innerWidth)  * 2 - 1;
        const ny = (mouseY / window.innerHeight) * 2 - 1;
        tRY = nx * 0.52; tRX = ny * 0.32;
        cRY += (tRY - cRY) * 0.08; cRX += (tRX - cRX) * 0.08;
        pivot.rotation.y = cRY; pivot.rotation.x = cRX;
        const t = performance.now() * 0.0016;
        pivot.position.y  = Math.sin(t) * 0.02;
        pivot.rotation.z  = Math.sin(t * 0.8) * 0.012 - nx * 0.04;
      }
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight, false);
    });
  }
  initHero3D();

  // =========================================================================
  // EXHIBITION SCROLL (Sanctuary Archive // 02: Flowing Ether & Magnetic Repulsion)
  // =========================================================================
  function initExhibitionScroll() {
    const section      = document.getElementById('exhibitionSection');
    const stage        = document.getElementById('exhibitionStickyStage');
    const portalFrame  = document.getElementById('portalFrame');
    const portalImage  = document.getElementById('portalImage');
    const annotations  = document.querySelectorAll('.annotation-item');
    const hintBarFill  = document.getElementById('hintBarFill');
    const scrollHint   = document.getElementById('scrollHint');
    const finalCaption = document.getElementById('finalCaption');
    const flowCanvas   = document.getElementById('exhibitionFlowCanvas');
    if (!section || !portalFrame) return;

    // -----------------------------------------------------------------------
    // A. SUBTLE FLOWING GOLDEN / CINNAMON SPORES & ETHER CURRENTS IN BG
    // -----------------------------------------------------------------------
    if (flowCanvas && stage) {
      const eCtx = flowCanvas.getContext('2d');
      let eWidth = 0, eHeight = 0;
      let eAnimId = null;
      let isStageVisible = true;
      let mouseExhibitionX = -9999, mouseExhibitionY = -9999;
      let targetMouseX = -9999, targetMouseY = -9999;

      function resizeExhibitionFlow() {
        eWidth = flowCanvas.width = window.innerWidth;
        eHeight = flowCanvas.height = window.innerHeight;
      }
      resizeExhibitionFlow();
      window.addEventListener('resize', resizeExhibitionFlow, { passive: true });

      const eColors = [
        'rgba(235, 150, 60, ',  // cinnamon amber
        'rgba(255, 215, 120, ', // golden thread
        'rgba(255, 240, 200, ', // warm twilight silk
        'rgba(180, 220, 255, '  // starlight whisper
      ];

      const eSpores = Array.from({ length: 42 }, () => ({
        x: Math.random() * (eWidth || 1400),
        y: Math.random() * (eHeight || 900),
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.4,
        radius: 1.3 + Math.random() * 2.2,
        colorPrefix: eColors[Math.floor(Math.random() * eColors.length)],
        baseAlpha: 0.18 + Math.random() * 0.35,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        pulsePhase: Math.random() * Math.PI * 2,
        wavePhase: Math.random() * Math.PI * 2,
        waveSpeed: 0.008 + Math.random() * 0.012
      }));

      window.addEventListener('mousemove', e => {
        const sr = section.getBoundingClientRect();
        if (sr.top <= window.innerHeight && sr.bottom >= 0) {
          targetMouseX = e.clientX;
          targetMouseY = e.clientY;
        } else {
          targetMouseX = -9999;
          targetMouseY = -9999;
        }
      }, { passive: true });

      let eFlowTime = 0;
      function renderExhibitionFlow() {
        if (!isStageVisible) return;
        eFlowTime += 0.016;
        eCtx.clearRect(0, 0, eWidth, eHeight);

        if (targetMouseX !== -9999) {
          if (mouseExhibitionX === -9999) {
            mouseExhibitionX = targetMouseX; mouseExhibitionY = targetMouseY;
          } else {
            mouseExhibitionX += (targetMouseX - mouseExhibitionX) * 0.14;
            mouseExhibitionY += (targetMouseY - mouseExhibitionY) * 0.14;
          }
        } else {
          mouseExhibitionX = -9999; mouseExhibitionY = -9999;
        }

        // Draw 2 delicate undulating golden yarn ribbons in background
        for (let i = 0; i < 2; i++) {
          eCtx.beginPath();
          const baseRibbonY = eHeight * (0.35 + i * 0.32) + Math.sin(eFlowTime * 0.75 + i * 2.5) * 40;
          eCtx.moveTo(0, baseRibbonY);
          for (let x = 0; x <= eWidth; x += 50) {
            const waveY = baseRibbonY + Math.sin(x * 0.0028 + eFlowTime * 0.8 + i) * 32
                                      + Math.cos(x * 0.0042 - eFlowTime * 0.6) * 18;
            eCtx.lineTo(x, waveY);
          }
          const grad = eCtx.createLinearGradient(0, 0, eWidth, 0);
          grad.addColorStop(0, 'rgba(235, 150, 60, 0)');
          grad.addColorStop(0.3, i === 0 ? 'rgba(255, 215, 120, 0.045)' : 'rgba(235, 150, 60, 0.04)');
          grad.addColorStop(0.7, i === 0 ? 'rgba(235, 150, 60, 0.04)' : 'rgba(255, 215, 120, 0.045)');
          grad.addColorStop(1, 'rgba(235, 150, 60, 0)');
          eCtx.strokeStyle = grad;
          eCtx.lineWidth = 1.1;
          eCtx.stroke();
        }

        // Draw drifting spores
        for (let j = 0; j < eSpores.length; j++) {
          const s = eSpores[j];
          s.pulsePhase += s.pulseSpeed;
          s.wavePhase += s.waveSpeed;

          s.x += s.vx + Math.sin(s.wavePhase) * 0.3;
          s.y += s.vy;

          if (mouseExhibitionX !== -9999) {
            const mdx = s.x - mouseExhibitionX;
            const mdy = s.y - mouseExhibitionY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 160 && mDist > 0.1) {
              const mForce = (1 - mDist / 160) * 2.2;
              s.x += (mdx / mDist) * mForce;
              s.y += (mdy / mDist) * mForce;
            }
          }

          if (s.y < -20) { s.y = eHeight + 20; s.x = Math.random() * eWidth; }
          if (s.y > eHeight + 20) { s.y = -20; }
          if (s.x < -20) { s.x = eWidth + 20; }
          if (s.x > eWidth + 20) { s.x = -20; }

          const currentAlpha = s.baseAlpha * (0.7 + Math.sin(s.pulsePhase) * 0.3);
          const radGrad = eCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.4);
          radGrad.addColorStop(0, s.colorPrefix + currentAlpha + ')');
          radGrad.addColorStop(0.5, s.colorPrefix + (currentAlpha * 0.3) + ')');
          radGrad.addColorStop(1, s.colorPrefix + '0)');

          eCtx.fillStyle = radGrad;
          eCtx.beginPath();
          eCtx.arc(s.x, s.y, s.radius * 2.4, 0, Math.PI * 2);
          eCtx.fill();
        }

        eAnimId = requestAnimationFrame(renderExhibitionFlow);
      }

      if ('IntersectionObserver' in window) {
        const eObs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            isStageVisible = entry.isIntersecting;
            if (isStageVisible) {
              if (!eAnimId) eAnimId = requestAnimationFrame(renderExhibitionFlow);
            } else {
              if (eAnimId) { cancelAnimationFrame(eAnimId); eAnimId = null; }
            }
          });
        }, { threshold: 0.05 });
        eObs.observe(section);
      } else {
        eAnimId = requestAnimationFrame(renderExhibitionFlow);
      }
    }

    // -----------------------------------------------------------------------
    // B. ULTRA-RESPONSIVE TACTILE MAGNETIC REPULSION FOR ALL ANNOTATION ITEMS
    // -----------------------------------------------------------------------
    const annotRepel = {};
    annotations.forEach(item => {
      const sid = item.getAttribute('data-slot');
      annotRepel[sid] = {
        curX: 0, curY: 0, curRot: 0, curScale: 1,
        tarX: 0, tarY: 0, tarRot: 0, tarScale: 1,
        isNear: false
      };
    });

    window.addEventListener('mousemove', e => {
      const mx = e.clientX, my = e.clientY;
      const sr = section.getBoundingClientRect();
      if (sr.top <= window.innerHeight && sr.bottom >= 0) {
        annotations.forEach(item => {
          const sid = item.getAttribute('data-slot');
          if (!annotRepel[sid]) return;
          const rect = item.getBoundingClientRect();
          
          // Signed distance to edge of bounding box (instant sensitivity on hover or near)
          const clampedX = Math.max(rect.left, Math.min(mx, rect.right));
          const clampedY = Math.max(rect.top, Math.min(my, rect.bottom));
          const edgeDx = mx - clampedX;
          const edgeDy = my - clampedY;
          const distToEdge = Math.sqrt(edgeDx * edgeDx + edgeDy * edgeDy);
          
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          
          let dirX = cx - mx;
          let dirY = cy - my;
          let len = Math.sqrt(dirX * dirX + dirY * dirY);
          if (len < 0.001) { dirX = 0; dirY = -1; len = 1; }
          dirX /= len;
          dirY /= len;

          const proximityRadius = 260; // broad magnetic detection zone around card edges
          const maxRepel = 32;         // crisp 32px displacement for immediate, palpable tactile response
          const maxTilt = 4.2;         // micro tilt in degrees

          if (distToEdge === 0) {
            // Cursor is hovering DIRECTLY OVER the card/text group
            // Full maximum repulsion vector away from cursor position inside card
            const force = 1.0;
            annotRepel[sid].tarX = dirX * force * maxRepel;
            annotRepel[sid].tarY = dirY * force * maxRepel;
            annotRepel[sid].tarRot = dirX * force * maxTilt;
            annotRepel[sid].tarScale = 1.035;
            if (!annotRepel[sid].isNear) {
              annotRepel[sid].isNear = true;
              item.classList.add('is-repelled');
            }
          } else if (distToEdge < proximityRadius) {
            // Cursor is approaching near the perimeter of the card
            const force = Math.pow(1 - distToEdge / proximityRadius, 1.2);
            annotRepel[sid].tarX = dirX * force * maxRepel;
            annotRepel[sid].tarY = dirY * force * maxRepel;
            annotRepel[sid].tarRot = dirX * force * maxTilt;
            annotRepel[sid].tarScale = 1 + force * 0.025;
            if (force > 0.10) {
              if (!annotRepel[sid].isNear) {
                annotRepel[sid].isNear = true;
                item.classList.add('is-repelled');
              }
            } else if (annotRepel[sid].isNear) {
              annotRepel[sid].isNear = false;
              item.classList.remove('is-repelled');
            }
          } else {
            annotRepel[sid].tarX = 0;
            annotRepel[sid].tarY = 0;
            annotRepel[sid].tarRot = 0;
            annotRepel[sid].tarScale = 1;
            if (annotRepel[sid].isNear) {
              annotRepel[sid].isNear = false;
              item.classList.remove('is-repelled');
            }
          }
        });
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      Object.keys(annotRepel).forEach(sid => {
        const obj = annotRepel[sid];
        obj.tarX = 0; obj.tarY = 0; obj.tarRot = 0; obj.tarScale = 1; obj.isNear = false;
      });
      annotations.forEach(item => item.classList.remove('is-repelled'));
    });

    let tP = 0, cP = 0;
    const calc = () => {
      const r = section.getBoundingClientRect();
      const d = section.offsetHeight - window.innerHeight;
      return d <= 0 ? 0 : Math.min(Math.max(-r.top / d, 0), 1);
    };
    const annotCfg = [
      {slot:'1',start:0.10,end:0.48,moveX:-90, moveY:-60,rotStart:-1.5,rotDelta:-6,scaleDelta:-0.15},
      {slot:'2',start:0.13,end:0.52,moveX:-110,moveY:15, rotStart:-2.2,rotDelta:-5,scaleDelta:-0.1},
      {slot:'3',start:0.17,end:0.56,moveX:-80, moveY:80, rotStart:1.0, rotDelta:-3,scaleDelta:-0.1},
      {slot:'4',start:0.08,end:0.44,moveX:95,  moveY:-55,rotStart:2.0, rotDelta:7, scaleDelta:-0.15},
      {slot:'5',start:0.15,end:0.54,moveX:115, moveY:-20,rotStart:1.8, rotDelta:4, scaleDelta:-0.1},
      {slot:'6',start:0.19,end:0.58,moveX:85,  moveY:85, rotStart:-1.2,rotDelta:6, scaleDelta:-0.1},
      {slot:'7',start:0.06,end:0.38,moveX:0,   moveY:45, rotStart:0,   rotDelta:0, scaleDelta:-0.1},
    ];

    (function render() {
      requestAnimationFrame(render);
      tP = calc(); cP += (tP - cP) * 0.135;
      const vw = window.innerWidth, vh = window.innerHeight;
      let iW = Math.max(240, Math.min(vw * 0.19, 340));
      if (vw <= 768) iW = Math.max(200, Math.min(vw * 0.48, 290));
      if (vw <= 480) iW = Math.max(185, Math.min(vw * 0.58, 240));
      const iH = iW * (16 / 9);
      const er = Math.min(Math.max(cP / 0.74, 0), 1);
      const ee = er < 0.5 ? 4*er*er*er : 1 - Math.pow(-2*er+2,3)/2;
      const cW = iW + (vw - iW) * ee, cH = iH + (vh - iH) * ee;
      const cr = Math.max(0, 22 * (1 - Math.min(ee * 1.35, 1)));
      const bo = Math.max(0, 0.2 * (1 - Math.min(ee * 1.5, 1)));
      if (ee >= 0.99) {
        portalFrame.style.width='100vw'; portalFrame.style.height='100vh';
        portalFrame.style.borderRadius='0'; portalFrame.style.boxShadow='none'; portalFrame.style.border='none';
      } else {
        portalFrame.style.width         = cW.toFixed(1)+'px';
        portalFrame.style.height        = cH.toFixed(1)+'px';
        portalFrame.style.borderRadius  = cr.toFixed(1)+'px';
        portalFrame.style.border        = '1px solid rgba(255,255,255,'+bo.toFixed(3)+')';
        portalFrame.style.boxShadow     = '0 30px 100px rgba(0,0,0,0.95)';
      }
      // Background blur & contrast when caption is active
      let bgBlur = 0;
      if (cP >= 0.44 && cP < 0.62) {
        const bt = (cP - 0.44) / (0.62 - 0.44);
        bgBlur = (1 - Math.pow(1 - bt, 2.2)) * 6.5;
      } else if (cP >= 0.62 && cP <= 0.82) {
        bgBlur = 6.5;
      } else if (cP > 0.82 && cP <= 0.98) {
        const bt = (cP - 0.82) / (0.98 - 0.82);
        bgBlur = Math.max(0, (1 - bt * bt) * 6.5);
      }

      if (portalImage) {
        const baseScale = Math.max(1.05, 1.10 - ee * 0.05);
        if (bgBlur > 0.05) {
          const br = (1 - (bgBlur / 6.5) * 0.16).toFixed(3);
          portalImage.style.transform = 'scale(' + baseScale.toFixed(3) + ')';
          portalImage.style.filter = 'blur(' + bgBlur.toFixed(1) + 'px) brightness(' + br + ')';
        } else {
          portalImage.style.transform = 'scale(' + baseScale.toFixed(3) + ')';
          portalImage.style.filter = 'none';
        }
      }

      // Update card repulsion lerp (snappy & sensitive with 0.20 lerp damping)
      Object.values(annotRepel).forEach(obj => {
        obj.curX += (obj.tarX - obj.curX) * 0.20;
        obj.curY += (obj.tarY - obj.curY) * 0.20;
        obj.curRot += (obj.tarRot - obj.curRot) * 0.20;
        obj.curScale += ((obj.tarScale || 1) - obj.curScale) * 0.20;
      });

      annotations.forEach(item => {
        const sid = item.getAttribute('data-slot');
        const cfg = annotCfg.find(c => c.slot === sid);
        if (!cfg) return;

        const rx = annotRepel[sid] ? annotRepel[sid].curX : 0;
        const ry = annotRepel[sid] ? annotRepel[sid].curY : 0;
        const rr = annotRepel[sid] ? annotRepel[sid].curRot : 0;
        const rs = annotRepel[sid] && annotRepel[sid].curScale ? annotRepel[sid].curScale : 1;

        if (cP <= cfg.start) {
          item.style.opacity = '1';
          item.style.transform = sid === '7'
            ? 'translateX(-50%) translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0) scale(' + rs.toFixed(3) + ')'
            : 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0) rotate(' + (cfg.rotStart + rr).toFixed(2) + 'deg) scale(' + rs.toFixed(3) + ')';
          item.style.pointerEvents = 'auto'; item.style.visibility = 'visible';
        } else if (cP >= cfg.end) {
          item.style.opacity = '0'; item.style.pointerEvents = 'none'; item.style.visibility = 'hidden';
        } else {
          const t   = (cP - cfg.start) / (cfg.end - cfg.start);
          const eo  = 1 - Math.pow(1 - t, 2.5);
          let op    = Math.max(0, 1 - eo);
          if (annotRepel[sid] && annotRepel[sid].isNear) {
            op = Math.max(op, 0.9);
          }
          const tx  = cfg.moveX * eo, ty = cfg.moveY * eo;
          const rot = cfg.rotStart + cfg.rotDelta * eo;
          const sc  = (1 + cfg.scaleDelta * eo) * rs;
          item.style.opacity = op.toFixed(3);
          item.style.visibility = 'visible';
          item.style.pointerEvents = 'auto';
          item.style.transform = sid === '7'
            ? 'translateX(-50%) translateY(' + (ty + ry).toFixed(1) + 'px) translate3d(' + rx.toFixed(1) + 'px,0,0) scale(' + sc.toFixed(3) + ')'
            : 'translate3d(' + (tx + rx).toFixed(1) + 'px,' + (ty + ry).toFixed(1) + 'px,0) rotate(' + (rot + rr).toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
        }
      });

      if (hintBarFill) hintBarFill.style.width = (Math.min(cP, 1) * 100).toFixed(1) + '%';
      if (scrollHint)  scrollHint.style.opacity = cP > 0.4 ? '0' : '1';
      if (finalCaption) {
        if (cP < 0.44) {
          finalCaption.style.opacity = '0';
          finalCaption.style.visibility = 'hidden';
          finalCaption.style.transform = 'translate(-50%, calc(-50% + 180px))';
        } else if (cP >= 0.44 && cP < 0.62) {
          // Slide from bottom into the exact middle of screen (appearing sooner)
          const t = (cP - 0.44) / (0.62 - 0.44);
          const ease = 1 - Math.pow(1 - t, 2.2);
          const y = (1 - ease) * 180;
          const op = Math.min(1, t * 1.35);
          finalCaption.style.opacity = op.toFixed(3);
          finalCaption.style.visibility = 'visible';
          finalCaption.style.transform = 'translate(-50%, calc(-50% + ' + y.toFixed(1) + 'px))';
        } else if (cP >= 0.62 && cP <= 0.82) {
          // Sits beautifully in middle of screen as realm is fully expanded
          const t = (cP - 0.62) / (0.82 - 0.62);
          const y = -t * 15;
          finalCaption.style.opacity = '1';
          finalCaption.style.visibility = 'visible';
          finalCaption.style.transform = 'translate(-50%, calc(-50% + ' + y.toFixed(1) + 'px))';
        } else if (cP > 0.82 && cP <= 0.98) {
          // Slides further up toward the top and disappears
          const t = (cP - 0.82) / (0.98 - 0.82);
          const ease = t * t;
          const y = -15 - ease * 180;
          const op = Math.max(0, 1 - t * 1.35);
          finalCaption.style.opacity = op.toFixed(3);
          finalCaption.style.visibility = op > 0.01 ? 'visible' : 'hidden';
          finalCaption.style.transform = 'translate(-50%, calc(-50% + ' + y.toFixed(1) + 'px))';
        } else {
          finalCaption.style.opacity = '0';
          finalCaption.style.visibility = 'hidden';
          finalCaption.style.transform = 'translate(-50%, calc(-50% - 200px))';
        }
      }
    })();
  }
  initExhibitionScroll();

  // =========================================================================
  // DISCOVERY INTERACTIONS (Flowing Background Ether & Magnetic Card Repulsion)
  // =========================================================================
  function initDiscovery() {
    const cards        = document.querySelectorAll('.discovery-card');
    const ghostWords   = document.querySelectorAll('.oversized-ghost-word');
    const flowCanvas   = document.getElementById('discoveryFlowCanvas');
    const discoverySec = document.getElementById('discoverySection');

    // -----------------------------------------------------------------------
    // A. SUBTLE FLOWING BACKGROUND PARTICLES & UNDULATING ETHER RIBBONS
    // -----------------------------------------------------------------------
    if (flowCanvas && discoverySec) {
      const fCtx = flowCanvas.getContext('2d');
      let fWidth = 0, fHeight = 0;
      let flowAnimId = null;
      let isDiscoveryVisible = true;
      let mouseDiscoveryX = -9999, mouseDiscoveryY = -9999;
      let targetMouseX = -9999, targetMouseY = -9999;

      function resizeFlowCanvas() {
        const r = discoverySec.getBoundingClientRect();
        fWidth = flowCanvas.width = r.width;
        fHeight = flowCanvas.height = r.height;
      }
      resizeFlowCanvas();
      window.addEventListener('resize', resizeFlowCanvas, { passive: true });

      const sporeColors = [
        'rgba(211, 89, 44, ',
        'rgba(140, 205, 255, ',
        'rgba(255, 235, 180, ',
        'rgba(230, 235, 250, '
      ];
      const spores = Array.from({ length: 46 }, () => ({
        x: Math.random() * (fWidth || 1400),
        y: Math.random() * (fHeight || 2000),
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.22 - Math.random() * 0.45,
        radius: 1.4 + Math.random() * 2.2,
        colorPrefix: sporeColors[Math.floor(Math.random() * sporeColors.length)],
        baseAlpha: 0.16 + Math.random() * 0.35,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        pulsePhase: Math.random() * Math.PI * 2,
        wavePhase: Math.random() * Math.PI * 2,
        waveSpeed: 0.007 + Math.random() * 0.012
      }));

      discoverySec.addEventListener('mousemove', e => {
        const r = discoverySec.getBoundingClientRect();
        targetMouseX = e.clientX - r.left;
        targetMouseY = e.clientY - r.top;
      }, { passive: true });

      discoverySec.addEventListener('mouseleave', () => {
        targetMouseX = -9999; targetMouseY = -9999;
      });

      let flowTime = 0;
      function renderFlow() {
        if (!isDiscoveryVisible) return;
        flowTime += 0.016;
        fCtx.clearRect(0, 0, fWidth, fHeight);

        if (targetMouseX !== -9999) {
          if (mouseDiscoveryX === -9999) {
            mouseDiscoveryX = targetMouseX; mouseDiscoveryY = targetMouseY;
          } else {
            mouseDiscoveryX += (targetMouseX - mouseDiscoveryX) * 0.14;
            mouseDiscoveryY += (targetMouseY - mouseDiscoveryY) * 0.14;
          }
        } else {
          mouseDiscoveryX = -9999; mouseDiscoveryY = -9999;
        }

        for (let i = 0; i < 3; i++) {
          fCtx.beginPath();
          const baseRibbonY = fHeight * (0.24 + i * 0.28) + Math.sin(flowTime * 0.7 + i * 2.2) * 45;
          fCtx.moveTo(0, baseRibbonY);
          for (let x = 0; x <= fWidth; x += 55) {
            const waveY = baseRibbonY + Math.sin(x * 0.0022 + flowTime * 0.85 + i) * 38 
                                      + Math.cos(x * 0.0038 - flowTime * 0.5) * 22;
            fCtx.lineTo(x, waveY);
          }
          const grad = fCtx.createLinearGradient(0, 0, fWidth, 0);
          grad.addColorStop(0, 'rgba(211, 89, 44, 0)');
          grad.addColorStop(0.3, i === 1 ? 'rgba(140, 205, 255, 0.032)' : 'rgba(211, 89, 44, 0.038)');
          grad.addColorStop(0.7, i === 1 ? 'rgba(255, 235, 180, 0.035)' : 'rgba(140, 205, 255, 0.028)');
          grad.addColorStop(1, 'rgba(211, 89, 44, 0)');
          fCtx.strokeStyle = grad;
          fCtx.lineWidth = 1.2;
          fCtx.stroke();
        }

        for (let j = 0; j < spores.length; j++) {
          const s = spores[j];
          s.pulsePhase += s.pulseSpeed;
          s.wavePhase += s.waveSpeed;
          s.x += s.vx + Math.sin(s.wavePhase) * 0.32;
          s.y += s.vy;

          if (mouseDiscoveryX !== -9999) {
            const mdx = s.x - mouseDiscoveryX;
            const mdy = s.y - mouseDiscoveryY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 170 && mDist > 0.1) {
              const mForce = (1 - mDist / 170) * 2.4;
              s.x += (mdx / mDist) * mForce;
              s.y += (mdy / mDist) * mForce;
            }
          }

          if (s.y < -30) { s.y = fHeight + 20; s.x = Math.random() * fWidth; }
          if (s.y > fHeight + 30) { s.y = -20; }
          if (s.x < -30) { s.x = fWidth + 20; }
          if (s.x > fWidth + 30) { s.x = -20; }

          const currentAlpha = s.baseAlpha * (0.7 + Math.sin(s.pulsePhase) * 0.3);
          const radGrad = fCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.6);
          radGrad.addColorStop(0, s.colorPrefix + currentAlpha + ')');
          radGrad.addColorStop(0.5, s.colorPrefix + (currentAlpha * 0.35) + ')');
          radGrad.addColorStop(1, s.colorPrefix + '0)');

          fCtx.fillStyle = radGrad;
          fCtx.beginPath();
          fCtx.arc(s.x, s.y, s.radius * 2.6, 0, Math.PI * 2);
          fCtx.fill();
        }

        flowAnimId = requestAnimationFrame(renderFlow);
      }

      if ('IntersectionObserver' in window) {
        const flowObs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            isDiscoveryVisible = entry.isIntersecting;
            if (isDiscoveryVisible) {
              if (!flowAnimId) flowAnimId = requestAnimationFrame(renderFlow);
            } else {
              if (flowAnimId) { cancelAnimationFrame(flowAnimId); flowAnimId = null; }
            }
          });
        }, { threshold: 0.05 });
        flowObs.observe(discoverySec);
      } else {
        flowAnimId = requestAnimationFrame(renderFlow);
      }
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const c = e.target;
            const i = parseInt(c.getAttribute('data-card-index') || '1', 10);
            setTimeout(() => c.classList.add('is-in-view'), (i - 1) * 120);
            obs.unobserve(c);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      cards.forEach(c => obs.observe(c));
    } else {
      cards.forEach(c => c.classList.add('is-in-view'));
    }

    const cardsArray = Array.from(cards);
    if (cardsArray.length > 0 && window.matchMedia('(pointer: fine)').matches) {
      const cardPhysics = cardsArray.map(card => ({
        card,
        curX: 0, curY: 0, curRot: 0,
        tarX: 0, tarY: 0, tarRot: 0
      }));

      window.addEventListener('mousemove', e => {
        const mx = e.clientX, my = e.clientY;
        cardPhysics.forEach(item => {
          const rect = item.card.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
            item.tarX = 0; item.tarY = 0; item.tarRot = 0;
            return;
          }
          const clampedX = Math.max(rect.left, Math.min(mx, rect.right));
          const clampedY = Math.max(rect.top, Math.min(my, rect.bottom));
          const edgeDx = mx - clampedX;
          const edgeDy = my - clampedY;
          const distToEdge = Math.sqrt(edgeDx * edgeDx + edgeDy * edgeDy);

          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          let dirX = cx - mx, dirY = cy - my;
          let len = Math.sqrt(dirX * dirX + dirY * dirY);
          if (len < 0.001) { dirX = 0; dirY = -1; len = 1; }
          dirX /= len; dirY /= len;

          const repelRadius = 300;
          const maxRepel = 24;
          const maxTilt = 2.4;

          if (distToEdge === 0) {
            item.tarX = dirX * maxRepel;
            item.tarY = dirY * maxRepel;
            item.tarRot = dirX * maxTilt;
          } else if (distToEdge < repelRadius) {
            const force = Math.pow(1 - distToEdge / repelRadius, 1.25);
            item.tarX = dirX * force * maxRepel;
            item.tarY = dirY * force * maxRepel;
            item.tarRot = dirX * force * maxTilt;
          } else {
            item.tarX = 0; item.tarY = 0; item.tarRot = 0;
          }
        });
      }, { passive: true });

      function animateCardRepulsion() {
        cardPhysics.forEach(item => {
          const diffX = item.tarX - item.curX;
          const diffY = item.tarY - item.curY;
          const diffRot = item.tarRot - item.curRot;
          if (Math.abs(diffX) > 0.04 || Math.abs(diffY) > 0.04 || Math.abs(diffRot) > 0.01) {
            item.curX += diffX * 0.18;
            item.curY += diffY * 0.18;
            item.curRot += diffRot * 0.18;
            item.card.style.setProperty('--repel-x', item.curX.toFixed(2) + 'px');
            item.card.style.setProperty('--repel-y', item.curY.toFixed(2) + 'px');
            item.card.style.setProperty('--repel-rot', item.curRot.toFixed(2) + 'deg');
          } else if (item.curX !== 0 || item.curY !== 0 || item.curRot !== 0) {
            item.curX = item.tarX; item.curY = item.tarY; item.curRot = item.tarRot;
            item.card.style.setProperty('--repel-x', item.curX.toFixed(2) + 'px');
            item.card.style.setProperty('--repel-y', item.curY.toFixed(2) + 'px');
            item.card.style.setProperty('--repel-rot', item.curRot.toFixed(2) + 'deg');
          }
        });
        requestAnimationFrame(animateCardRepulsion);
      }
      requestAnimationFrame(animateCardRepulsion);

      cards.forEach(card => {
        const inner = card.querySelector('.card-inner');
        if (!inner) return;
        card.addEventListener('mousemove', e => {
          const r  = card.getBoundingClientRect();
          const rX = (((e.clientY - r.top)  / r.height) * 2 - 1) * -5;
          const rY = (((e.clientX - r.left) / r.width)  * 2 - 1) * 6;
          inner.style.transform = 'perspective(1000px) rotateX('+rX.toFixed(2)+'deg) rotateY('+rY.toFixed(2)+'deg) translateY(-8px) scale(1.015)';
        });
        card.addEventListener('mouseleave', () => { inner.style.transform = ''; });
      });
    }

    window.addEventListener('scroll', () => {
      const sy = window.pageYOffset;
      ghostWords.forEach((w, i) => { w.style.transform = 'translateY(' + (sy * (i + 1) * 0.035 * -0.1).toFixed(1) + 'px)'; });
    }, { passive: true });

    const fct = document.getElementById('footerCreaturesTrigger');
    const fet = document.getElementById('footerExploreTrigger');
    const bss = document.getElementById('backToSummitBtn');
    if (fct) fct.addEventListener('click', () => { playTone(528, 0.35, 'sine');     openModal(creaturesModal); });
    if (fet) fet.addEventListener('click', () => { playTone(432, 0.35, 'triangle'); openModal(exploreModal);   });
    if (bss) bss.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  initDiscovery();

});
