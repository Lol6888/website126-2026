// Nền hero "glyph animals": đàn thú vẽ bằng ký tự trên lưới ô (canvas 2D).
// Engine tách nguyên từ glyph_animals.html (Felix cung cấp); đã bỏ giao diện, URL params,
// localStorage, hiệu ứng kính. Đổi so với bản gốc: canvas/loài truyền vào; click → poke(), thêm hover() (phản ứng nhẹ khi di chuột).
// @ts-nocheck
export function initGlyphField(canvas, opts = {}) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ==========================================================================
     1. UTILITIES, STORAGE & MATH HELPERS
     ========================================================================== */
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (e0, e1, x) => {
    const t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const wrapAngle = (a) => {
    let r = (a + Math.PI) % (Math.PI * 2);
    if (r < 0) r += Math.PI * 2;
    return r - Math.PI;
  };
  const turnToward = (cur, target, maxDelta) => {
    const d = wrapAngle(target - cur);
    if (Math.abs(d) <= maxDelta) return target;
    return cur + Math.sign(d) * maxDelta;
  };

  // Fast deterministic hash -> [0, 1)
  function hash3(a, b, c) {
    let h = Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263) + Math.imul(c | 0, 2147483647);
    h = (h ^ (h >>> 13)) | 0;
    h = Math.imul(h, 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }


  // Luminance-preserving RGB hue rotation matrix
  let hueMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  let cachedHueDeg = 0;
  function updateHueMatrix(deg) {
    cachedHueDeg = deg;
    if (Math.abs(deg) < 0.001) {
      hueMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      return;
    }
    const rad = (deg * Math.PI) / 180;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const lumR = 0.213, lumG = 0.715, lumB = 0.072;
    hueMatrix = [
      lumR + c * (1 - lumR) + s * (-lumR), lumG + c * (-lumG) + s * (-lumG), lumB + c * (-lumB) + s * (1 - lumB),
      lumR + c * (-lumR) + s * 0.143,      lumG + c * (1 - lumG) + s * 0.14, lumB + c * (-lumB) + s * (-0.283),
      lumR + c * (-lumR) + s * (-(1 - lumR)), lumG + c * (-lumG) + s * lumG, lumB + c * (1 - lumB) + s * lumB
    ];
  }

  function applyHue(r, g, b, out) {
    if (Math.abs(cachedHueDeg) < 0.001) {
      out[0] = r; out[1] = g; out[2] = b;
      return;
    }
    const m = hueMatrix;
    out[0] = clamp(r * m[0] + g * m[1] + b * m[2], 0, 255);
    out[1] = clamp(r * m[3] + g * m[4] + b * m[5], 0, 255);
    out[2] = clamp(r * m[6] + g * m[7] + b * m[8], 0, 255);
  }

  const BG_R = 6, BG_G = 7, BG_B = 12;

  /* ==========================================================================
     2. SHARED DEFAULTS, GLASS DEFAULTS & 7 SPECIES DEFINITIONS
     ========================================================================== */
  const SHARED_DEFAULTS = {
    density: 1,
    cornerToCorner: false,
    direction: 49,
    speed: 1,
    sway: 0.04,
    spread: 0.06,
    size: 1,
    farthest: 0.45,
    farBias: 1.6,
    grip: 2,
    separation: 300,
    hue: 0,
    shimmer: 0.3,
    sparkle: 0.12,
    fog: 0.75,
    trail: 1,
    trailFade: 1.3,
    grid: 1.05,
    detail: 1.3
  };

  const GLASS_DEFAULTS = {
    glassBlur: 3.5,
    glassRefraction: 40,
    glassRipple: 0.007,
    glassTint: 0,
    glassEdge: 0.55,
    glassRadius: 24,
    glassWidth: 720
  };

  // Kinds enum
  const KIND_PLAIN = 0;
  const KIND_SHINE = 1;
  const KIND_DARK = 2;
  const KIND_LIGHT = 3;
  const KIND_FUR = 4;
  const KIND_SOFT = 5;
  const KIND_BRIGHT = 6;
  const KIND_LINE = 7;

  const SPECIES_CONFIG = {
    moths: {
      key: 'moths',
      name: 'Moth',
      scale: 1,
      area: 48000,
      speed: 90,
      trailColor: [255, 196, 156],
      extent: 0.78,
      reach: 0.55,
      hideControls: [],
      defaults: {
        direction: 49,
        density: 1.05,
        speed: 1.05,
        sway: 0,
        spread: 0,
        size: 1.25,
        farthest: 0.18,
        farBias: 1.7,
        grip: 5,
        separation: 700,
        trail: 1.55,
        trailFade: 0.15,
        flutter: 0,
        glide: 2.75,
        flapRate: 1
      },
      extraGroups: [
        {
          title: 'Flight',
          controls: [
            { key: 'flutter', label: 'Flutter', min: 0, max: 2, step: 0.05, hint: 'Random lateral flutter impulses while flying.' },
            { key: 'glide', label: 'Glide', min: 0, max: 4, step: 0.05, hint: 'How often moths pause flapping to glide with open wings.' },
            { key: 'flapRate', label: 'Flap rate', min: 0.3, max: 2.5, step: 0.05, hint: 'Speed of the wingbeat cycle.' }
          ]
        }
      ]
    },
    rabbits: {
      key: 'rabbits',
      name: 'Rabbit',
      scale: 1.15,
      area: 80000,
      speed: 95,
      trailColor: [226, 190, 168],
      extent: 0.56,
      reach: 0.5,
      hideControls: [],
      defaults: {
        direction: 0,
        detail: 1.7,
        fog: 0.12,
        density: 1.6,
        sway: 0,
        spread: 0,
        farthest: 0.3,
        farBias: 0.8,
        grip: 3,
        separation: 420,
        trail: 1.2,
        trailFade: 0.35,
        shimmer: 0.1,
        sparkle: 0.03,
        burst: 1,
        pause: 1,
        hopSpeed: 1,
        scare: 0.6
      },
      extraGroups: [
        {
          title: 'Hopping',
          controls: [
            { key: 'burst', label: 'Burst length', min: 0.2, max: 3, step: 0.05, hint: 'Duration of each hopping run.' },
            { key: 'pause', label: 'Pause length', min: 0, max: 3, step: 0.05, hint: 'Rest time between hops (0 to never rest).' },
            { key: 'hopSpeed', label: 'Hop speed', min: 0.3, max: 2.5, step: 0.05, hint: 'Cadence of the bounding gait.' },
            { key: 'scare', label: 'Scare', min: 0, max: 1.5, step: 0.05, hint: 'How strongly rabbits bolt when clicked.' }
          ]
        }
      ]
    },
    turtles: {
      key: 'turtles',
      name: 'Sea turtle',
      scale: 1.6,
      area: 110000,
      speed: 46,
      trailColor: [110, 200, 186],
      extent: 0.58,
      reach: 0.55,
      hideControls: [],
      defaults: {
        direction: 49,
        fog: 0.64,
        density: 1.4,
        speed: 1.4,
        spread: 0,
        sway: 0,
        farthest: 0.33,
        farBias: 1.3,
        grip: 2.65,
        separation: 780,
        trail: 3,
        trailFade: 0.4,
        shimmer: 0.35,
        sparkle: 0.08,
        meander: 0.4,
        flipperBeat: 1,
        foodRange: 200
      },
      extraGroups: [
        {
          title: 'Swimming',
          controls: [
            { key: 'meander', label: 'Meander', min: 0, max: 1.5, step: 0.05, hint: 'Lazy S-curve wandering off the main course.' },
            { key: 'flipperBeat', label: 'Flipper beat', min: 0.3, max: 2.5, step: 0.05, hint: 'Stroke tempo of the front and rear flippers.' }
          ]
        },
        {
          title: 'Feeding',
          controls: [
            { key: 'foodRange', label: 'Food range', min: 50, max: 500, step: 10, hint: 'Distance at which turtles notice clicked food pellets.' }
          ]
        }
      ]
    },
    squid: {
      key: 'squid',
      name: 'Squid',
      scale: 1.55,
      area: 95000,
      speed: 55,
      trailColor: [255, 140, 196],
      extent: 0.62,
      reach: 0.52,
      hideControls: ['shimmer'],
      defaults: {
        direction: 131,
        speed: 1.05,
        sway: 0.04,
        spread: 0.08,
        farthest: 0.3,
        farBias: 1.4,
        grip: 1.4,
        trail: 0.8,
        trailFade: 0.6,
        sparkle: 0.1,
        pulseRate: 1,
        pulsePower: 1,
        pulseGlow: 1,
        armLength: 1
      },
      extraGroups: [
        {
          title: 'Swimming',
          controls: [
            { key: 'pulseRate', label: 'Pulse rate', min: 0.3, max: 2.5, step: 0.05, hint: 'Frequency of mantle jet pulses.' },
            { key: 'pulsePower', label: 'Pulse power', min: 0.3, max: 2.5, step: 0.05, hint: 'Forward thrust on each mantle squeeze.' },
            { key: 'pulseGlow', label: 'Pulse glow', min: 0, max: 2, step: 0.05, hint: 'Bioluminescent halo intensity during each jet.' },
            { key: 'armLength', label: 'Arm length', min: 0.4, max: 1.8, step: 0.05, hint: 'Length of trailing arms and clubbed tentacles.' }
          ]
        }
      ]
    },
    owls: {
      key: 'owls',
      name: 'Owl',
      scale: 2.1,
      area: 130000,
      speed: 70,
      trailColor: [236, 212, 170],
      extent: 0.66,
      reach: 0.52,
      hideControls: ['shimmer'],
      defaults: {
        direction: 49,
        fog: 0.26,
        density: 1.5,
        sway: 0,
        spread: 0,
        farthest: 0.32,
        farBias: 2.4,
        grip: 5,
        separation: 720,
        trail: 0.6,
        trailFade: 1.2,
        sparkle: 0.08,
        hover: 1.3,
        cruising: 0.5,
        swoopSpeed: 1.3,
        wingbeat: 1
      },
      extraGroups: [
        {
          title: 'Flight',
          controls: [
            { key: 'hover', label: 'Hover time', min: 0.2, max: 3, step: 0.05, hint: 'Average duration of hovering before swooping.' },
            { key: 'cruising', label: 'Cruising', min: 0, max: 1, step: 0.05, hint: 'Probability of cruising after a swoop.' },
            { key: 'swoopSpeed', label: 'Swoop speed', min: 0.5, max: 2.5, step: 0.05, hint: 'Speed multiplier during tucked-wing swoops.' },
            { key: 'wingbeat', label: 'Wingbeat', min: 0.3, max: 2.5, step: 0.05, hint: 'Flapping frequency when hovering or cruising.' }
          ]
        }
      ]
    },
    flyingfish: {
      key: 'flyingfish',
      name: 'Flying fish',
      scale: 1.25,
      area: 85000,
      speed: 80,
      trailColor: [120, 214, 226],
      extent: 0.6,
      reach: 0.5,
      hideControls: ['grip'],
      defaults: {
        direction: 131,
        fog: 0,
        size: 1.2,
        density: 1.3,
        sway: 0,
        spread: 0,
        farthest: 0.35,
        farBias: 1.4,
        separation: 450,
        trail: 3.45,
        trailFade: 0.4,
        shimmer: 0.25,
        sparkle: 0.1,
        howOften: 1,
        leapLength: 0.6,
        leapHeight: 1
      },
      extraGroups: [
        {
          title: 'Leaping',
          controls: [
            { key: 'howOften', label: 'How often', min: 0.2, max: 3, step: 0.05, hint: 'Frequency of gliding leaps out of the water.' },
            { key: 'leapLength', label: 'Leap length', min: 0.2, max: 2, step: 0.05, hint: 'Horizontal distance covered per leap.' },
            { key: 'leapHeight', label: 'Leap height', min: 0.2, max: 2, step: 0.05, hint: 'Peak arc altitude and apparent size boost.' }
          ]
        }
      ]
    },
    eagles: {
      key: 'eagles',
      name: 'Eagle',
      scale: 1.5,
      area: 60000,
      speed: 82,
      trailColor: [200, 204, 226],
      extent: 0.68,
      reach: 0.45,
      hideControls: [],
      defaults: {
        direction: 49,
        detail: 1.7,
        density: 0.75,
        speed: 1.4,
        sway: 0,
        spread: 0,
        farthest: 0.35,
        farBias: 1.3,
        grip: 3,
        separation: 150,
        trail: 0,
        shimmer: 0.1,
        sparkle: 0.04,
        wingbeat: 0.85,
        glide: 1.6,
        foldingFlap: false
      },
      extraGroups: [
        {
          title: 'Flight',
          controls: [
            { key: 'wingbeat', label: 'Wingbeat', min: 0.3, max: 2, step: 0.05, hint: 'Cadence of deep soaring wingbeats.' },
            { key: 'glide', label: 'Glide', min: 0, max: 4, step: 0.05, hint: 'How frequently eagles lock wings to soar.' },
            { key: 'foldingFlap', label: 'Folding flap', type: 'toggle', hint: 'Fold the outer hand back at the wrist on the upstroke.' }
          ]
        }
      ]
    }
  };

  function getSpeciesDefaults(speciesKey) {
    return Object.assign({}, SHARED_DEFAULTS, SPECIES_CONFIG[speciesKey].defaults, GLASS_DEFAULTS);
  }

  /* ==========================================================================
     3. GLOBAL STATE & URL PARAMS
     ========================================================================== */
  const fixedCount = null;
  let currentSpeciesKey = SPECIES_CONFIG[opts.species] ? opts.species : 'moths';

  let tuning = getSpeciesDefaults(currentSpeciesKey);

  function loadSpeciesTweaks(speciesKey) {
    tuning = getSpeciesDefaults(speciesKey);
    updateHueMatrix(tuning.hue);
  }

  /* ==========================================================================
     4. CANVAS ASCII GRID RENDERER
     ========================================================================== */
  const ctx = canvas.getContext('2d', { alpha: false });
  const bgCanvas = document.createElement('canvas');
  const bgCtx = bgCanvas.getContext('2d', { alpha: false });

  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cw = 9, ch = 13;
  let cols = 1, rows = 1, totalCells = 1;
  let canvasFontFamily = '"Geist Mono", ui-monospace, Menlo, monospace';
  let glyphFontStr = '600 10px "Geist Mono", ui-monospace, Menlo, monospace';

  // Cell frame buffers
  let cellType = new Uint8Array(1);    // 0=empty, 1=stroke, 2=solid
  let fillR = new Uint8Array(1);
  let fillG = new Uint8Array(1);
  let fillB = new Uint8Array(1);
  let glyphR = new Uint8Array(1);
  let glyphG = new Uint8Array(1);
  let glyphB = new Uint8Array(1);
  let glyphChar = new Array(1);
  let dirtyList = new Int32Array(1);
  let dirtyCount = 0;

  // Trail energy field
  let trailA = new Float32Array(1);
  let trailB = new Float32Array(1);

  function repaintBackground() {
    bgCanvas.width = Math.max(1, Math.round(vw * dpr));
    bgCanvas.height = Math.max(1, Math.round(vh * dpr));
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bgCtx.fillStyle = `rgb(${BG_R},${BG_G},${BG_B})`;
    bgCtx.fillRect(0, 0, vw, vh);

    const alpha = clamp(0.055 * tuning.grid, 0, 1);
    if (alpha > 0.001) {
      bgCtx.fillStyle = `rgba(255,255,255,${alpha.toFixed(4)})`;
      for (let c = 0; c <= cols; c++) {
        bgCtx.fillRect(c * cw, 0, 1, vh);
      }
      for (let r = 0; r <= rows; r++) {
        bgCtx.fillRect(0, r * ch, vw, 1);
      }
    }
  }

  function resizeGrid(preserveTrails = false) {
    const rect = canvas.getBoundingClientRect();
    vw = Math.max(1, Math.round(rect.width || window.innerWidth));
    vh = Math.max(1, Math.round(rect.height || window.innerHeight));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.max(1, Math.round(vw * dpr));
    canvas.height = Math.max(1, Math.round(vh * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cw = clamp(Math.round(vw / 124 / tuning.detail), 5, 24);
    ch = Math.round(cw * 1.45);
    cols = Math.ceil(vw / cw);
    rows = Math.ceil(vh / ch);
    totalCells = cols * rows;

    canvasFontFamily = getComputedStyle(canvas).fontFamily || '"Geist Mono", ui-monospace, Menlo, monospace';
    glyphFontStr = `600 ${Math.round(ch * 0.74)}px ${canvasFontFamily}`;

    cellType = new Uint8Array(totalCells);
    fillR = new Uint8Array(totalCells);
    fillG = new Uint8Array(totalCells);
    fillB = new Uint8Array(totalCells);
    glyphR = new Uint8Array(totalCells);
    glyphG = new Uint8Array(totalCells);
    glyphB = new Uint8Array(totalCells);
    glyphChar = new Array(totalCells).fill('');
    dirtyList = new Int32Array(totalCells);
    dirtyCount = 0;

    if (!preserveTrails || trailA.length !== totalCells) {
      trailA = new Float32Array(totalCells);
      trailB = new Float32Array(totalCells);
    }

    repaintBackground();
    syncPopulation();
    if (currentSpeciesKey === 'squid') initMarineSnow();
  }

  function clearCellBuffer() {
    for (let i = 0; i < dirtyCount; i++) {
      cellType[dirtyList[i]] = 0;
    }
    dirtyCount = 0;
  }

  function setStrokeCell(col, row, chStr, r, g, b) {
    if (col < 0 || col >= cols || row < 0 || row >= rows) return;
    const idx = row * cols + col;
    if (cellType[idx] === 2) return; // solid wins over stroke
    if (cellType[idx] === 0) dirtyList[dirtyCount++] = idx;
    cellType[idx] = 1;
    glyphChar[idx] = chStr;
    glyphR[idx] = clamp(r | 0, 0, 255);
    glyphG[idx] = clamp(g | 0, 0, 255);
    glyphB[idx] = clamp(b | 0, 0, 255);
  }

  function setSolidCell(col, row, chStr, fr, fg, fb, gr, gg, gb) {
    if (col < 0 || col >= cols || row < 0 || row >= rows) return;
    const idx = row * cols + col;
    if (cellType[idx] === 0) dirtyList[dirtyCount++] = idx;
    cellType[idx] = 2;
    fillR[idx] = clamp(fr | 0, 0, 255);
    fillG[idx] = clamp(fg | 0, 0, 255);
    fillB[idx] = clamp(fb | 0, 0, 255);
    glyphChar[idx] = chStr;
    glyphR[idx] = clamp(gr | 0, 0, 255);
    glyphG[idx] = clamp(gg | 0, 0, 255);
    glyphB[idx] = clamp(gb | 0, 0, 255);
  }

  function shedTrail(px, py, amount) {
    if (tuning.trail <= 0) return;
    const col = Math.floor(px / cw);
    const row = Math.floor(py / ch);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return;
    const idx = row * cols + col;
    trailA[idx] = Math.min(1.6, trailA[idx] + amount * tuning.trail);
  }

  function stampTrail(px, py, radiusCells, amount) {
    if (tuning.trail <= 0 && amount < 1.3) return;
    const cx = Math.floor(px / cw);
    const cy = Math.floor(py / ch);
    const r = Math.max(0, Math.round(radiusCells));
    const amt = amount * Math.max(0.4, tuning.trail);
    for (let dy = -r; dy <= r; dy++) {
      const row = cy + dy;
      if (row < 0 || row >= rows) continue;
      for (let dx = -r; dx <= r; dx++) {
        const col = cx + dx;
        if (col < 0 || col >= cols) continue;
        const dist = Math.hypot(dx, dy * 1.4);
        if (r === 0 || dist <= r + 0.5) {
          const falloff = r === 0 ? 1 : 1 - dist / (r + 0.8);
          const idx = row * cols + col;
          trailA[idx] = Math.min(1.6, trailA[idx] + amt * falloff);
        }
      }
    }
  }

  function stepTrails(dt) {
    const decay = Math.exp(-dt * tuning.trailFade);
    for (let r = 0; r < rows; r++) {
      const rowOff = r * cols;
      const upOff = (r > 0 ? r - 1 : r) * cols;
      const dnOff = (r < rows - 1 ? r + 1 : r) * cols;
      for (let c = 0; c < cols; c++) {
        const idx = rowOff + c;
        const self = trailA[idx];
        const left = trailA[rowOff + (c > 0 ? c - 1 : c)];
        const right = trailA[rowOff + (c < cols - 1 ? c + 1 : c)];
        const up = trailA[upOff + c];
        const dn = trailA[dnOff + c];
        const next = ((4 * self + left + right + up + dn) * 0.125) * decay;
        trailB[idx] = next > 0.008 ? next : 0;
      }
    }
    const tmp = trailA;
    trailA = trailB;
    trailB = tmp;
  }

  // Helper to draw rasterised lines, dots, and spots
  const tmpRGB = [0, 0, 0];
  function drawLine(x0, y0, x1, y1, r, g, b, fog, endGlyph) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.hypot(dx, dy);
    if (dist < 1) return;
    const stepPx = Math.max(2, Math.min(cw, ch) * 0.5);
    const steps = Math.max(1, Math.ceil(dist / stepPx));
    const ang = Math.atan2(dy, dx);
    const oct = Math.round((ang / Math.PI) * 4);
    const modOct = ((oct % 4) + 4) % 4;
    const lineGlyph = modOct === 0 ? '-' : modOct === 1 ? '\\' : modOct === 2 ? '|' : '/';

    applyHue(r, g, b, tmpRGB);
    const cr = lerp(tmpRGB[0], BG_R, fog);
    const cg = lerp(tmpRGB[1], BG_G, fog);
    const cb = lerp(tmpRGB[2], BG_B, fog);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x0 + dx * t;
      const py = y0 + dy * t;
      const col = Math.floor(px / cw);
      const row = Math.floor(py / ch);
      const chStr = (i === steps && endGlyph) ? endGlyph : lineGlyph;
      setStrokeCell(col, row, chStr, cr, cg, cb);
    }
  }

  function drawDot(px, py, chStr, r, g, b, fog) {
    const col = Math.floor(px / cw);
    const row = Math.floor(py / ch);
    applyHue(r, g, b, tmpRGB);
    setStrokeCell(col, row, chStr, lerp(tmpRGB[0], BG_R, fog), lerp(tmpRGB[1], BG_G, fog), lerp(tmpRGB[2], BG_B, fog));
  }

  function drawSpot(px, py, chStr, fr, fg, fb, gr, gg, gb, fog) {
    const col = Math.floor(px / cw);
    const row = Math.floor(py / ch);
    applyHue(fr, fg, fb, tmpRGB);
    const r1 = lerp(tmpRGB[0], BG_R, fog);
    const g1 = lerp(tmpRGB[1], BG_G, fog);
    const b1 = lerp(tmpRGB[2], BG_B, fog);
    applyHue(gr, gg, gb, tmpRGB);
    const r2 = lerp(tmpRGB[0], BG_R, fog);
    const g2 = lerp(tmpRGB[1], BG_G, fog);
    const b2 = lerp(tmpRGB[2], BG_B, fog);
    setSolidCell(col, row, chStr, r1, g1, b1, r2, g2, b2);
  }

  // Reusable probe result object to avoid GC churn
  const probeRes = { hit: false, r: 0, g: 0, b: 0, kind: 0, glyphs: null };
  const centerRes = { hit: false, r: 0, g: 0, b: 0, kind: 0, glyphs: null };
  const PLAIN_RAMP = '.:;+=*%#';
  const LINE_RAMP = '.:+*';
  const EDGE_HI = ':;';
  const EDGE_LO = ".,'`";
  const SPARKLE_COLORS = [
    [255, 255, 255],
    [215, 238, 255],
    [195, 252, 255]
  ];

  // Rasterise an animal via implicit shape function probeFn(u, v, out)
  function rasteriseAnimal(a, simTime, cx, cy, cosH, sinH, span, extent, fog, probeFn, lightMul = 1, tilt = 0) {
    const radiusPx = extent * span;
    const minCol = Math.max(0, Math.floor((cx - radiusPx) / cw));
    const maxCol = Math.min(cols - 1, Math.floor((cx + radiusPx) / cw));
    const minRow = Math.max(0, Math.floor((cy - radiusPx) / ch));
    const maxRow = Math.min(rows - 1, Math.floor((cy + radiusPx) / ch));
    if (minCol > maxCol || minRow > maxRow) return;

    const invSpan = 1 / span;
    const flickTick = Math.floor(simTime * 6);
    const sparkTick = Math.floor(simTime * 2.4);
    const shimmerAmt = tuning.shimmer;
    const sparkleAmt = tuning.sparkle;

    // 4 sub-point offsets in cell fractions
    const subX0 = cw * 0.25, subX1 = cw * 0.75;
    const subY0 = ch * 0.30, subY1 = ch * 0.72;
    const halfW = cw * 0.5, halfH = ch * 0.5;

    for (let row = minRow; row <= maxRow; row++) {
      const cellY = row * ch;
      const dyC = cellY + halfH - cy;
      for (let col = minCol; col <= maxCol; col++) {
        const cellX = col * cw;
        const dxC = cellX + halfW - cx;

        // Centre probe
        const uC = (dxC * cosH + dyC * sinH) * invSpan;
        const vC = (-dxC * sinH + dyC * cosH) * invSpan;
        centerRes.hit = false;
        centerRes.glyphs = null;
        probeFn(uC, vC, centerRes);

        let hits = centerRes.hit ? 1 : 0;
        let sample = centerRes.hit ? centerRes : null;

        // 4 sub-points
        const pts = [
          [cellX + subX0 - cx, cellY + subY0 - cy],
          [cellX + subX1 - cx, cellY + subY0 - cy],
          [cellX + subX0 - cx, cellY + subY1 - cy],
          [cellX + subX1 - cx, cellY + subY1 - cy]
        ];
        for (let p = 0; p < 4; p++) {
          const dx = pts[p][0], dy = pts[p][1];
          const u = (dx * cosH + dy * sinH) * invSpan;
          const v = (-dx * sinH + dy * cosH) * invSpan;
          probeRes.hit = false;
          probeRes.glyphs = null;
          probeFn(u, v, probeRes);
          if (probeRes.hit) {
            hits++;
            if (!sample) {
              centerRes.r = probeRes.r;
              centerRes.g = probeRes.g;
              centerRes.b = probeRes.b;
              centerRes.kind = probeRes.kind;
              centerRes.glyphs = probeRes.glyphs;
              sample = centerRes;
            }
          }
        }

        if (hits === 0) continue;

        const coverage = hits * 0.2;
        const hStable = hash3(a.id, Math.round(uC * 26), Math.round(vC * 26));
        const hFlick = hash3(col, row, flickTick);
        const flicker = 0.97 + hFlick * 0.06;

        // Apply hue + lighting + flicker
        applyHue(sample.r * lightMul * flicker, sample.g * lightMul * flicker, sample.b * lightMul * flicker, tmpRGB);
        let cr = tmpRGB[0], cg = tmpRGB[1], cb = tmpRGB[2];

        // Edge cell or Line kind
        if (!centerRes.hit || coverage < 0.6) {
          const edgeFog = clamp(fog + 0.55 - 0.45 * coverage, 0, 1);
          const er = lerp(cr, BG_R, edgeFog);
          const eg = lerp(cg, BG_G, edgeFog);
          const eb = lerp(cb, BG_B, edgeFog);
          const set = coverage >= 0.5 ? EDGE_HI : EDGE_LO;
          const chStr = set[Math.floor(hStable * set.length)];
          setStrokeCell(col, row, chStr, er, eg, eb);
          continue;
        }

        const kind = sample.kind;
        if (kind === KIND_LINE) {
          const lr = lerp(cr, BG_R, fog);
          const lg = lerp(cg, BG_G, fog);
          const lb = lerp(cb, BG_B, fog);
          const lum = (0.299 * lr + 0.587 * lg + 0.114 * lb) / 255;
          const set = sample.glyphs || LINE_RAMP;
          const gi = clamp(Math.floor(lum * set.length), 0, set.length - 1);
          setStrokeCell(col, row, set[gi], lr, lg, lb);
          continue;
        }

        // Shine modulation
        if (kind === KIND_SHINE && shimmerAmt > 0) {
          const sWave = Math.sin(2.2 * simTime + 9 * uC + 6 * vC + tilt + 2 * a.heading);
          const sMul = 1 - 0.4 * shimmerAmt + shimmerAmt * sWave;
          cr = clamp(cr * sMul, 0, 255);
          cg = clamp(cg * sMul, 0, 255);
          cb = clamp(cb * sMul, 0, 255);
        }

        // Depth fog
        const fr0 = lerp(cr, BG_R, fog);
        const fg0 = lerp(cg, BG_G, fog);
        const fb0 = lerp(cb, BG_B, fog);

        let fR = fr0, fG = fg0, fB = fb0;
        let gR = fr0 * 0.42, gG = fg0 * 0.42, gB = fb0 * 0.42;
        let chStr = '.';

        if (kind === KIND_PLAIN || kind === KIND_SHINE) {
          const set = sample.glyphs || PLAIN_RAMP;
          const lum = (0.299 * fR + 0.587 * fG + 0.114 * fB) / 255;
          const jitter = Math.floor(hStable * 3) - 1;
          const gi = clamp(Math.round((1 - lum) * (set.length - 1)) + jitter, 0, set.length - 1);
          chStr = set[gi];
        } else if (kind === KIND_DARK) {
          gR = fR * 1.7 + 34; gG = fG * 1.7 + 30; gB = fB * 1.7 + 30;
          const set = sample.glyphs || '#%@';
          chStr = set[Math.floor(hStable * set.length)];
        } else if (kind === KIND_LIGHT) {
          gR = fR * 0.4; gG = fG * 0.4; gB = fB * 0.4;
          const set = sample.glyphs || 'o*';
          chStr = set[Math.floor(hStable * set.length)];
        } else if (kind === KIND_FUR) {
          gR = fR * 1.6 + 44; gG = fG * 1.6 + 40; gB = fB * 1.6 + 36;
          const set = sample.glyphs || '8#@';
          chStr = set[Math.floor(hStable * set.length)];
        } else if (kind === KIND_SOFT) {
          const sf = Math.min(1, 0.62 + 0.38 * fog);
          fR = lerp(cr, BG_R, sf);
          fG = lerp(cg, BG_G, sf);
          fB = lerp(cb, BG_B, sf);
          gR = fr0; gG = fg0; gB = fb0;
          const set = sample.glyphs || PLAIN_RAMP;
          chStr = set[Math.floor(hStable * set.length)];
        } else if (kind === KIND_BRIGHT) {
          fR = fr0 * 0.58; fG = fg0 * 0.58; fB = fb0 * 0.58;
          gR = fr0 * 1.05 + 50; gG = fg0 * 1.05 + 50; gB = fb0 * 1.05 + 50;
          const set = sample.glyphs || '.:*';
          chStr = set[Math.floor(hStable * set.length)];
        }

        // Sparkle check
        if (sparkleAmt > 0 && (kind === KIND_SHINE || kind === KIND_PLAIN || kind === KIND_SOFT || kind === KIND_BRIGHT)) {
          const rate = kind === KIND_PLAIN ? sparkleAmt * 0.33 : sparkleAmt;
          const hSp = hash3(col + 17, row + 31, sparkTick);
          if (hSp < rate * 0.14) {
            const sc = SPARKLE_COLORS[Math.floor((hSp / (rate * 0.14)) * 3) % 3];
            gR = sc[0]; gG = sc[1]; gB = sc[2];
          }
        }

        setSolidCell(col, row, chStr, fR, fG, fB, gR, gG, gB);
      }
    }
  }

  /* ==========================================================================
     5. SPECIES SHAPES & MOTION (ALL 7 SPECIES)
     ========================================================================== */

  // Polar lobe helper used by Moth wings & Flying fish fins
  function polarLobe(u, v, pivot, minAng, maxAng, reach, peakFrac, roundness, scallopAmp, scallopFreq) {
    const ang = Math.atan2(u - pivot, v);
    if (ang < minAng || ang > maxAng) return -1;
    const t = (ang - minAng) / (maxAng - minAng);
    let env;
    if (t < peakFrac) {
      env = Math.pow(t / peakFrac, roundness);
    } else {
      env = Math.pow((1 - t) / (1 - peakFrac), roundness);
    }
    const maxR = reach * env * (1 + scallopAmp * Math.sin(t * Math.PI * scallopFreq));
    const r = Math.hypot(u - pivot, v);
    if (maxR <= 0.001 || r > maxR) return -1;
    return r / maxR;
  }

  // Sea turtle food pellets
  const pellets = [];
  // Squid marine snow
  let marineSnow = [];

  function initMarineSnow() {
    const count = clamp(Math.round((vw * vh) / 6000), 20, 450);
    marineSnow = [];
    for (let i = 0; i < count; i++) {
      marineSnow.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        vy: 3 + Math.random() * 9,
        phase: Math.random() * Math.PI * 2,
        star: Math.random() < 0.08
      });
    }
  }

  function createAnimal(id, spawnAnywhere) {
    const sp = SPECIES_CONFIG[currentSpeciesKey];
    const roll = Math.random();
    const depth = tuning.farthest + (1 - tuning.farthest) * Math.pow(roll, tuning.farBias);
    const base = clamp(Math.min(vw, vh) * 0.2, 80, 190) * sp.scale;
    const span = base * depth * tuning.size;
    const course = getCourseAngle();
    const bias = (Math.random() * 2 - 1);
    const heading = course + bias * tuning.spread;
    const cruise = sp.speed * (0.55 + 0.45 * depth) * tuning.speed;

    let x, y;
    if (spawnAnywhere) {
      x = Math.random() * vw;
      y = Math.random() * vh;
    } else {
      const pos = pickUpwindSpawn(course, span);
      x = pos.x; y = pos.y;
    }

    const a = {
      id,
      roll,
      depth,
      span,
      x, y,
      vx: Math.cos(heading) * cruise,
      vy: Math.sin(heading) * cruise,
      heading,
      bias,
      phase: Math.random() * Math.PI * 2,
      startled: 0,
      // Species-specific state
      glide: 0,
      glideTimer: 0,
      flutterVx: 0,
      flutterVy: 0,
      // Rabbit
      running: true,
      stateTimer: 0.5 + Math.random() * 1.1,
      hop: 0,
      gaitPhase: Math.random(),
      alarm: 0,
      fleeTimer: 0,
      fleeAngle: 0,
      fleeSpeed: 0,
      faceDir: Math.cos(heading) >= 0 ? 1 : -1,
      // Squid
      turnRate: 0,
      // Owl
      owlState: Math.random() < 0.5 ? 'hover' : 'cruise',
      owlTimer: 0.4 + Math.random() * 1.4,
      owlAim: heading,
      tuck: 0,
      // Flying fish
      fishState: 'wait',
      fishTimer: Math.random() * 1.2,
      leapDur: 0.5,
      leapT: 0,
      leapSx: x, leapSy: y,
      leapTx: x, leapTy: y,
      fishAim: heading,
      // Eagle
      pace: 0.8 + Math.random() * 0.4
    };
    return a;
  }

  function pickUpwindSpawn(course, span) {
    const cx = Math.cos(course);
    const cy = Math.sin(course);
    const wx = Math.abs(cx) * vh;
    const wy = Math.abs(cy) * vw;
    const total = wx + wy || 1;
    if (Math.random() < wx / total) {
      return {
        x: cx >= 0 ? -span * 0.9 : vw + span * 0.9,
        y: Math.random() * vh
      };
    }
    return {
      x: Math.random() * vw,
      y: cy >= 0 ? -span * 0.9 : vh + span * 0.9
    };
  }

  function getCourseAngle() {
    if (tuning.cornerToCorner) {
      // Bottom-left to top-right diagonal in canvas coords (y down)
      return Math.atan2(-vh, vw);
    }
    // 0 = right, 90 = up -> canvas y is down
    return (-tuning.direction * Math.PI) / 180;
  }

  function wrapAnimal(a, course) {
    const sp = a.span;
    const cx = Math.cos(course);
    const cy = Math.sin(course);
    const pastDownwind =
      (cx > 0.1 && a.x > vw + sp) ||
      (cx < -0.1 && a.x < -sp) ||
      (cy > 0.1 && a.y > vh + sp) ||
      (cy < -0.1 && a.y < -sp);
    const farOff = a.x < -3 * sp || a.x > vw + 3 * sp || a.y < -3 * sp || a.y > vh + 3 * sp;
    if (pastDownwind || farOff) {
      const p = pickUpwindSpawn(course, sp);
      a.x = p.x;
      a.y = p.y;
      if (currentSpeciesKey === 'flyingfish') {
        a.fishState = 'wait';
        a.fishTimer = 0.2 + Math.random() * 0.6;
      }
    }
  }

  let animals = [];
  let nextAnimalId = 1;
  let simTime = 0;

  function computeAnimalMetrics(a) {
    const sp = SPECIES_CONFIG[currentSpeciesKey];
    const base = clamp(Math.min(vw, vh) * 0.2, 80, 190) * sp.scale;
    a.depth = tuning.farthest + (1 - tuning.farthest) * Math.pow(a.roll, tuning.farBias);
    a.span = base * a.depth * tuning.size;
  }

  function syncPopulation(forceReset = false) {
    const sp = SPECIES_CONFIG[currentSpeciesKey];
    const base = clamp(Math.min(vw, vh) * 0.2, 80, 190) * sp.scale;
    const scaleFactor = base / sp.scale / 160;
    const target = fixedCount !== null
      ? fixedCount
      : clamp(Math.round((vw * vh) / (sp.area * scaleFactor * scaleFactor) * tuning.density), 1, 200);

    if (forceReset) {
      animals = [];
      pellets.length = 0;
    }

    while (animals.length > target) {
      const idx = Math.floor(Math.random() * animals.length);
      animals.splice(idx, 1);
    }
    const isInitial = animals.length === 0;
    while (animals.length < target) {
      const anywhere = isInitial || Math.random() < 0.5;
      animals.push(createAnimal(nextAnimalId++, anywhere));
    }
    for (let i = 0; i < animals.length; i++) {
      computeAnimalMetrics(animals[i]);
    }
    animals.sort((a, b) => a.roll - b.roll);
  }

  // Shared separation force
  function computeSeparation(a, reach) {
    if (tuning.separation <= 0) return [0, 0];
    let sx = 0, sy = 0;
    for (let j = 0; j < animals.length; j++) {
      const b = animals[j];
      if (b === a) continue;
      if (Math.abs(a.depth - b.depth) >= 0.18) continue;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const minD = (a.span + b.span) * reach;
      const d2 = dx * dx + dy * dy;
      if (d2 > 0.001 && d2 < minD * minD) {
        const d = Math.sqrt(d2);
        const push = (1 - d / minD) * tuning.separation;
        sx += (dx / d) * push;
        sy += (dy / d) * push;
      }
    }
    return [sx, sy];
  }

  /* ---- SIMULATION STEP ---- */
  function stepSimulation(dt) {
    simTime += dt;
    const sp = SPECIES_CONFIG[currentSpeciesKey];
    const course = getCourseAngle();
    const groupHeading = course + tuning.sway * (Math.sin(0.13 * simTime) + 0.5 * Math.sin(0.31 * simTime + 1.7));

    // Update pellets (Sea turtle)
    if (currentSpeciesKey === 'turtles' && pellets.length > 0) {
      const drag = Math.exp(-0.8 * dt);
      for (let i = pellets.length - 1; i >= 0; i--) {
        const p = pellets[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= drag;
        p.vy *= drag;
        p.age += dt;
        if (p.age >= 14) pellets.splice(i, 1);
      }
    }

    // Update marine snow (Squid)
    if (currentSpeciesKey === 'squid') {
      for (let i = 0; i < marineSnow.length; i++) {
        const m = marineSnow[i];
        m.y += m.vy * dt;
        m.x += Math.sin(simTime * 0.7 + m.phase) * 4 * dt;
        if (m.y > vh + 4) { m.y = -4; m.x = Math.random() * vw; }
        if (m.x < -4) m.x = vw + 4;
        if (m.x > vw + 4) m.x = -4;
      }
    }

    for (let i = 0; i < animals.length; i++) {
      const a = animals[i];
      if (a.startled > 0) a.startled = Math.max(0, a.startled - dt);
      const cruise = sp.speed * (0.55 + 0.45 * a.depth) * tuning.speed;
      const aim = groupHeading + a.bias * tuning.spread;
      const [sepX, sepY] = computeSeparation(a, sp.reach);

      if (currentSpeciesKey === 'moths') {
        // Glide timer
        if (a.glideTimer > 0) {
          a.glideTimer -= dt;
          a.glide += (1 - a.glide) * Math.min(1, 6 * dt);
        } else {
          a.glide += (0 - a.glide) * Math.min(1, 6 * dt);
          if (a.startled <= 0 && Math.random() < 0.35 * tuning.glide * dt) {
            a.glideTimer = 0.5 + Math.random() * 0.9;
          }
        }

        // Flutter impulses
        if (tuning.flutter > 0) {
          const fScale = Math.sqrt(dt) * 520 * 1.3 * tuning.flutter * (1 - 0.75 * a.glide);
          a.flutterVx += (Math.random() * 2 - 1) * fScale;
          a.flutterVy += (Math.random() * 2 - 1) * fScale;
        }
        const fDamp = Math.exp(-3 * dt);
        a.flutterVx *= fDamp;
        a.flutterVy *= fDamp;

        const downstroke = Math.max(0, -Math.sin(a.phase));
        const desiredSpeed = cruise * (1 + 0.4 * downstroke * (1 - a.glide));
        const ax = (Math.cos(aim) * desiredSpeed - a.vx) * tuning.grip + sepX + a.flutterVx;
        const ay = (Math.sin(aim) * desiredSpeed - a.vy) * tuning.grip + sepY + a.flutterVy;
        a.vx += ax * dt;
        a.vy += ay * dt;

        // Downstroke forward push
        const push = downstroke * 1.4 * cruise * (1 - a.glide) * dt;
        a.vx += Math.cos(a.heading) * push;
        a.vy += Math.sin(a.heading) * push;

        const maxSpd = cruise * 1.8 + (a.startled > 0 ? 300 : 0);
        const spd = Math.hypot(a.vx, a.vy);
        if (spd > maxSpd) { a.vx = (a.vx / spd) * maxSpd; a.vy = (a.vy / spd) * maxSpd; }

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        if (spd > 2) a.heading = turnToward(a.heading, Math.atan2(a.vy, a.vx), 6 * dt);

        const spdFrac = clamp(spd / Math.max(1, cruise), 0, 2);
        a.phase += dt * Math.PI * 2 * 2.6 * tuning.flapRate * (0.8 + 0.6 * spdFrac) * (1 - 0.9 * a.glide);

        // Wing tips shed trail
        const opening = 0.1 + 0.9 * (Math.pow(0.5 + 0.5 * Math.cos(a.phase), 0.8) * (1 - a.glide) + 0.96 * a.glide);
        const cosH = Math.cos(a.heading), sinH = Math.sin(a.heading);
        const tipLat = 0.52 * opening * a.span;
        const tipAmt = (0.04 + 0.08 * downstroke) * a.depth;
        shedTrail(a.x - sinH * tipLat, a.y + cosH * tipLat, tipAmt);
        shedTrail(a.x + sinH * tipLat, a.y - cosH * tipLat, tipAmt);

      } else if (currentSpeciesKey === 'rabbits') {
        if (a.alarm > 0) a.alarm = Math.max(0, a.alarm - 0.7 * dt);

        if (a.fleeTimer > 0) {
          a.fleeTimer -= dt;
          const frac = clamp(a.fleeTimer / Math.max(0.1, a.fleeDur || 1), 0, 1);
          const fSpd = cruise + a.fleeSpeed * frac * frac;
          a.vx += (Math.cos(a.fleeAngle) * fSpd - a.vx) * 8 * dt;
          a.vy += (Math.sin(a.fleeAngle) * fSpd - a.vy) * 8 * dt;
        } else {
          a.stateTimer -= dt;
          if (a.stateTimer <= 0) {
            if (a.running && tuning.pause > 0) {
              a.running = false;
              a.stateTimer = (0.3 + Math.random() * 1.1) * tuning.pause;
            } else {
              a.running = true;
              a.stateTimer = (0.5 + Math.random() * 1.1) * tuning.burst;
            }
          }
          if (a.running) {
            a.vx += ((Math.cos(aim) * cruise - a.vx) * 2 * tuning.grip + sepX) * dt;
            a.vy += ((Math.sin(aim) * cruise - a.vy) * 2 * tuning.grip + sepY) * dt;
          } else {
            a.vx += (-a.vx * 6 + sepX * 0.2) * dt;
            a.vy += (-a.vy * 6 + sepY * 0.2) * dt;
          }
        }

        const maxSpd = cruise * 1.6 + (a.fleeTimer > 0 ? 300 : 0);
        const spd = Math.hypot(a.vx, a.vy);
        if (spd > maxSpd) { a.vx = (a.vx / spd) * maxSpd; a.vy = (a.vy / spd) * maxSpd; }

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        if (spd > 4) {
          a.heading = turnToward(a.heading, Math.atan2(a.vy, a.vx), (a.fleeTimer > 0 ? 10 : 3) * dt);
          if (Math.abs(a.vx) > 5) a.faceDir = a.vx >= 0 ? 1 : -1;
        }

        const targetHop = spd > 12 ? 1 : 0;
        a.hop += (targetHop - a.hop) * Math.min(1, 8 * dt);
        const prevGait = a.gaitPhase;
        a.gaitPhase += (dt * Math.max(spd, 30 * a.hop) * tuning.hopSpeed) / Math.max(4, 0.32 * a.span);
        if (Math.floor(a.gaitPhase) > Math.floor(prevGait) && a.hop > 0.3) {
          stampTrail(a.x, a.y + 0.14 * a.span, 0, 0.5 * a.depth);
        }
        a.gaitPhase %= 1;

      } else if (currentSpeciesKey === 'turtles') {
        let targetAngle = aim + tuning.meander * 0.6 * Math.sin(0.35 * simTime + 1.7 * a.id);
        let speedMul = 0.85 + 0.25 * Math.sin(0.5 * simTime + a.id);
        let turnLim = 0.9 * tuning.grip;

        // Check nearest food pellet within foodRange
        let nearest = null, nearDist = tuning.foodRange;
        for (let p = 0; p < pellets.length; p++) {
          const d = Math.hypot(pellets[p].x - a.x, pellets[p].y - a.y);
          if (d < nearDist) { nearDist = d; nearest = p; }
        }

        if (nearest !== null) {
          const pel = pellets[nearest];
          const closeFrac = 1 - nearDist / Math.max(1, tuning.foodRange);
          targetAngle = Math.atan2(pel.y - a.y, pel.x - a.x);
          turnLim = lerp(0.9 * tuning.grip, 2.6, closeFrac);
          speedMul = lerp(1.0, 1.8, closeFrac);
          if (nearDist < 0.32 * a.span + 6) {
            stampTrail(pel.x, pel.y, 1, 0.7);
            pellets.splice(nearest, 1);
          }
        }

        // Blend separation into target heading
        if (Math.abs(sepX) + Math.abs(sepY) > 1) {
          const dx = Math.cos(targetAngle) * 180 + sepX;
          const dy = Math.sin(targetAngle) * 180 + sepY;
          targetAngle = Math.atan2(dy, dx);
        }

        a.heading = turnToward(a.heading, targetAngle, turnLim * dt);
        const spd = cruise * speedMul;
        a.vx = Math.cos(a.heading) * spd;
        a.vy = Math.sin(a.heading) * spd;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.phase += dt * (1.4 + spd / 40) * tuning.flipperBeat;

        // Trail behind shell
        shedTrail(a.x - Math.cos(a.heading) * 0.28 * a.span, a.y - Math.sin(a.heading) * 0.28 * a.span, 0.045 * a.depth);

      } else if (currentSpeciesKey === 'squid') {
        const rate = 0.6 * tuning.pulseRate * (0.9 + 0.2 * a.roll);
        a.phase = (a.phase + dt * rate) % 1;
        const squeeze = a.phase < 0.22
          ? smoothstep(0, 0.22, a.phase)
          : 1 - smoothstep(0.22, 1.0, a.phase);

        const prevH = a.heading;
        let desiredH = aim;
        if (Math.abs(sepX) + Math.abs(sepY) > 1) {
          desiredH = Math.atan2(Math.sin(aim) * 160 + sepY, Math.cos(aim) * 160 + sepX);
        }
        a.heading = turnToward(a.heading, desiredH, 0.6 * tuning.grip * dt);
        const instTurn = wrapAngle(a.heading - prevH) / Math.max(0.001, dt);
        a.turnRate += (instTurn - a.turnRate) * Math.min(1, 5 * dt);

        if (a.phase < 0.22) {
          const thrust = 6.2 * cruise * tuning.pulsePower * dt;
          a.vx += Math.cos(a.heading) * thrust;
          a.vy += Math.sin(a.heading) * thrust;
        }
        a.vx += (-1.4 * a.vx + sepX * 0.25) * dt;
        a.vy += (-1.4 * a.vy + sepY * 0.25) * dt;

        const maxSpd = cruise * 2.8 + (a.startled > 0 ? 300 : 0);
        const spd = Math.hypot(a.vx, a.vy);
        if (spd > maxSpd) { a.vx = (a.vx / spd) * maxSpd; a.vy = (a.vy / spd) * maxSpd; }

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.squeeze = squeeze;

      } else if (currentSpeciesKey === 'owls') {
        a.owlTimer -= dt;
        if (a.owlTimer <= 0) {
          if (a.owlState === 'hover') {
            a.owlState = 'swoop';
            a.owlTimer = 0.15 + Math.random() * 0.3;
            a.owlAim = aim + (Math.random() - 0.5) * 0.35;
          } else if (a.owlState === 'swoop') {
            if (Math.random() < tuning.cruising) {
              a.owlState = 'cruise';
              a.owlTimer = 1.2 + Math.random() * 3.3;
              a.owlAim = aim + (Math.random() - 0.5) * 0.45;
            } else {
              a.owlState = 'hover';
              const expDur = -Math.log(Math.max(0.01, Math.random())) * 0.7;
              a.owlTimer = clamp(expDur, 0.15, 3) * tuning.hover;
            }
          } else {
            if (Math.random() < 0.35) {
              a.owlState = 'swoop';
              a.owlTimer = 0.15 + Math.random() * 0.3;
              a.owlAim = aim;
            } else {
              a.owlState = 'hover';
              const expDur = -Math.log(Math.max(0.01, Math.random())) * 0.7;
              a.owlTimer = clamp(expDur, 0.15, 3) * tuning.hover;
            }
          }
        }

        const targetTuck = a.owlState === 'swoop' ? 1 : 0;
        a.tuck += (targetTuck - a.tuck) * Math.min(1, 9 * dt);

        if (a.owlState === 'hover') {
          const wobX = Math.cos(simTime * 2.1 + a.id) * 40;
          const wobY = Math.sin(simTime * 4.2 + a.id) * 40;
          const desVx = Math.cos(aim) * cruise * 0.25;
          const desVy = Math.sin(aim) * cruise * 0.25;
          a.vx += ((desVx - a.vx) * tuning.grip + wobX + sepX) * dt;
          a.vy += ((desVy - a.vy) * tuning.grip + wobY + sepY) * dt;
          a.heading = turnToward(a.heading, aim, 3 * dt);
        } else if (a.owlState === 'swoop') {
          const swoopSpd = 4 * cruise * tuning.swoopSpeed;
          a.vx += ((Math.cos(a.owlAim) * swoopSpd - a.vx) * 6 + sepX * 0.5) * dt;
          a.vy += ((Math.sin(a.owlAim) * swoopSpd - a.vy) * 6 + sepY * 0.5) * dt;
          a.heading = turnToward(a.heading, Math.atan2(a.vy, a.vx), 14 * dt);
          shedTrail(a.x, a.y, 0.08 * a.depth);
        } else {
          a.vx += ((Math.cos(a.owlAim) * cruise - a.vx) * tuning.grip + sepX) * dt;
          a.vy += ((Math.sin(a.owlAim) * cruise - a.vy) * tuning.grip + sepY) * dt;
          a.heading = turnToward(a.heading, Math.atan2(a.vy, a.vx), 4 * dt);
        }

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        const hz = a.owlState === 'hover' ? 3.4 : 2.2;
        a.phase += dt * Math.PI * 2 * hz * tuning.wingbeat * (1 - 0.85 * a.tuck);

      } else if (currentSpeciesKey === 'flyingfish') {
        if (a.fishState === 'wait') {
          a.heading = turnToward(a.heading, a.fishAim, 3 * dt);
          a.fishTimer -= dt;
          if (a.fishTimer <= 0) {
            startFishLeap(a, groupHeading, 1, false);
          }
        } else {
          a.leapT += dt / Math.max(0.05, a.leapDur);
          if (a.leapT >= 1) {
            a.x = a.leapTx;
            a.y = a.leapTy;
            a.fishState = 'wait';
            a.fishTimer = (0.5 + Math.random() * 1.7) / Math.max(0.1, tuning.howOften * tuning.speed);
            a.fishAim = groupHeading + (Math.random() * 2 - 1) * 0.7 * tuning.spread;
            stampTrail(a.x, a.y, 2, 0.7 * a.depth);
          } else {
            a.x = lerp(a.leapSx, a.leapTx, a.leapT);
            a.y = lerp(a.leapSy, a.leapTy, a.leapT);
            shedTrail(a.x, a.y, 0.05 * a.depth);
          }
        }

      } else if (currentSpeciesKey === 'eagles') {
        if (a.glideTimer > 0) {
          a.glideTimer -= dt;
          a.glide += (1 - a.glide) * Math.min(1, 3 * dt);
        } else {
          a.glide += (0 - a.glide) * Math.min(1, 3 * dt);
          if (Math.random() < 0.25 * tuning.glide * dt) {
            a.glideTimer = 1 + Math.random() * 1.5;
          }
        }

        const ax = (Math.cos(aim) * cruise - a.vx) * tuning.grip + sepX;
        const ay = (Math.sin(aim) * cruise - a.vy) * tuning.grip + sepY;
        a.vx += ax * dt;
        a.vy += ay * dt;

        const maxSpd = cruise * 1.6 + (a.startled > 0 ? 300 : 0);
        const spd = Math.hypot(a.vx, a.vy);
        if (spd > maxSpd) { a.vx = (a.vx / spd) * maxSpd; a.vy = (a.vy / spd) * maxSpd; }

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        if (spd > 2) a.heading = turnToward(a.heading, Math.atan2(a.vy, a.vx), 2 * dt);

        a.phase += dt * Math.PI * 2 * 1.25 * tuning.wingbeat * a.pace * (1 - 0.92 * a.glide);
        if (tuning.trail > 0) {
          shedTrail(a.x - Math.cos(a.heading) * 0.25 * a.span, a.y - Math.sin(a.heading) * 0.25 * a.span, 0.03 * a.depth);
        }
      }

      wrapAnimal(a, course);
    }

    stepTrails(dt);
  }

  function startFishLeap(a, dirAngle, power, isStartle) {
    const baseAim = isStartle
      ? dirAngle
      : dirAngle + clamp(wrapAngle(a.fishAim - dirAngle), -0.35, 0.35);
    const baseDist = a.span * (2.4 + Math.random() * 1.2) * tuning.leapLength * tuning.speed * power;

    let bestDist = baseDist;
    if (tuning.separation > 0 && !isStartle) {
      const mults = [1, 0.8, 1.2, 0.65, 1.35];
      let bestRoom = -1;
      for (let m = 0; m < mults.length; m++) {
        const tx = a.x + Math.cos(baseAim) * baseDist * mults[m];
        const ty = a.y + Math.sin(baseAim) * baseDist * mults[m];
        let minRoom = 1e9;
        for (let j = 0; j < animals.length; j++) {
          const b = animals[j];
          if (b === a) continue;
          const d = Math.hypot(tx - b.x, ty - b.y);
          if (d < minRoom) minRoom = d;
        }
        if (minRoom > bestRoom) {
          bestRoom = minRoom;
          bestDist = baseDist * mults[m];
        }
      }
    }

    a.fishState = 'leap';
    a.leapT = 0;
    a.leapSx = a.x;
    a.leapSy = a.y;
    a.leapTx = a.x + Math.cos(baseAim) * bestDist;
    a.leapTy = a.y + Math.sin(baseAim) * bestDist;
    a.heading = baseAim;
    a.leapDur = (0.42 + Math.random() * 0.13) * Math.sqrt(Math.max(0.1, tuning.leapLength)) * (isStartle ? 0.8 : 1);
  }

  /* ---- DRAW EACH SPECIES ---- */
  function drawAnimal(a) {
    const sp = SPECIES_CONFIG[currentSpeciesKey];
    const baseFog = (1 - a.depth) * tuning.fog;

    if (currentSpeciesKey === 'moths') {
      const opening = 0.1 + 0.9 * (Math.pow(0.5 + 0.5 * Math.cos(a.phase), 0.8) * (1 - a.glide) + 0.96 * a.glide);
      const drawH = a.heading + 0.06 * Math.sin(a.phase);
      const cosH = Math.cos(drawH), sinH = Math.sin(drawH);
      const lightMul = 0.6 + 0.4 * opening;

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, a.span, sp.extent, baseFog, (u, v, out) => {
        const av = Math.abs(v);
        // Body: head, thorax, tapered banded abdomen
        if (Math.hypot(u - 0.15, v) < 0.04 || (u >= -0.04 && u <= 0.11 && av < 0.05)) {
          out.hit = true; out.r = 112; out.g = 70; out.b = 50; out.kind = KIND_FUR; out.glyphs = '%#8';
          return;
        }
        if (u >= -0.34 && u < -0.04) {
          const t = (u + 0.34) / 0.30;
          const hw = lerp(0.016, 0.046, t);
          if (av < hw) {
            out.hit = true;
            const band = Math.floor((u + 0.34) * 22) % 2 === 0;
            out.r = band ? 70 : 150; out.g = band ? 42 : 98; out.b = band ? 32 : 72;
            out.kind = KIND_FUR; out.glyphs = '%#8';
            return;
          }
        }
        // Wings (polar lobes)
        const sv = av / Math.max(0.08, opening);
        const rFore = polarLobe(u, sv, 0.05, -0.78, 0.46, 0.64, 0.7, 0.3, 0.02, 5);
        const rHind = polarLobe(u, sv, -0.05, -1.55, -0.3, 0.38, 0.5, 0.55, 0.045, 7);
        const isFore = rFore >= 0;
        const r = isFore ? rFore : rHind;
        if (r < 0) return;

        out.hit = true;
        // Eyespot on hindwing
        if (!isFore && Math.hypot(u + 0.18, sv - 0.17) < 0.055) {
          out.r = 56; out.g = 32; out.b = 26; out.kind = KIND_DARK; out.glyphs = '@';
          return;
        }
        if (r > 0.86) {
          // Cream dots along forewing edge
          if (isFore && r > 0.9 && Math.sin((u * 38) + sv * 18) > 0.55) {
            out.r = 252; out.g = 230; out.b = 204; out.kind = KIND_LIGHT; out.glyphs = 'o*';
          } else {
            out.r = 84; out.g = 46; out.b = 32; out.kind = KIND_DARK;
          }
          return;
        }
        if (r < 0.1) {
          out.r = 120; out.g = 72; out.b = 50; out.kind = KIND_DARK;
          return;
        }
        if (isFore && Math.abs(r - (0.5 + 0.04 * Math.sin(u * 24))) < 0.065) {
          out.r = 150; out.g = 88; out.b = 60; out.kind = KIND_DARK;
          return;
        }
        out.r = 200 + 48 * r; out.g = 132 + 46 * r; out.b = 96 + 40 * r;
        out.kind = KIND_SHINE;
      }, lightMul, a.phase * 0.2);

      // Feathery antennae
      for (const side of [-1, 1]) {
        const wob = Math.sin(simTime * 5 + a.id + side) * 0.025;
        const x0 = a.x + (0.17 * cosH - 0.014 * side * sinH) * a.span;
        const y0 = a.y + (0.17 * sinH + 0.014 * side * cosH) * a.span;
        const x1 = a.x + (0.36 * cosH - (0.13 + wob) * side * sinH) * a.span;
        const y1 = a.y + (0.36 * sinH + (0.13 + wob) * side * cosH) * a.span;
        drawLine(x0, y0, x1, y1, 214, 170, 130, baseFog);
        if (a.span > 70) {
          for (let b = 1; b <= 3; b++) {
            const t = b * 0.27;
            const bx = lerp(x0, x1, t), by = lerp(y0, y1, t);
            const ex = bx + (-sinH * side * 0.035 + cosH * 0.015) * a.span;
            const ey = by + (cosH * side * 0.035 + sinH * 0.015) * a.span;
            drawLine(bx, by, ex, ey, 214, 170, 130, baseFog);
          }
        }
      }

    } else if (currentSpeciesKey === 'rabbits') {
      const air = a.hop * Math.sin(Math.PI * a.gaitPhase);
      const stretch = a.hop * Math.sin(Math.PI * 2 * a.gaitPhase - 0.4);
      const liftY = -0.16 * a.span * air;
      const drawSpan = a.span * (1 + 0.08 * air);
      const slope = clamp(Math.atan2(a.vy, Math.max(10, Math.abs(a.vx))) * 0.35, -0.6, 0.6);
      const dir = a.faceDir;
      const cosT = Math.cos(slope), sinT = Math.sin(slope);
      const cx = a.x, cy = a.y + liftY;
      const earAng = 0.35 + 0.35 * air + 0.25 * a.alarm;
      const cosE = Math.cos(earAng), sinE = Math.sin(earAng);

      // Local frame: +u = facing direction, +v = down
      const cosH = dir * cosT, sinH = sinT;

      rasteriseAnimal(a, simTime, cx, cy, cosH, sinH, drawSpan, sp.extent, baseFog, (u, v, out) => {
        // Flip v if facing left so +v is always down
        const vv = dir < 0 ? -v : v;

        // Near ear & Far ear
        for (let e = 0; e < 2; e++) {
          const ex0 = e === 0 ? 0.13 : 0.105;
          const ey0 = e === 0 ? -0.12 : -0.11;
          const dx = u - ex0, dy = vv - ey0;
          // Rotate ear backward (-u, -v)
          const along = -dx * sinE - dy * cosE;
          const across = dx * cosE - dy * sinE;
          if (along >= 0 && along <= 0.24) {
            const w = 0.034 * (1 - 0.55 * (along / 0.24)) * Math.sin(Math.min(1, along / 0.04) * Math.PI * 0.5);
            if (Math.abs(across) <= w) {
              out.hit = true;
              if (e === 0 && Math.abs(across) < w * 0.45 && along > 0.04 && along < 0.2) {
                out.r = 244; out.g = 150; out.b = 156; out.kind = KIND_LIGHT;
              } else {
                const dim = e === 1 ? 0.82 : 1.0;
                out.r = 248 * dim; out.g = 199 * dim; out.b = 181 * dim;
                out.kind = KIND_FUR; out.glyphs = '%8';
              }
              return;
            }
          }
        }

        // Cotton tail
        if (Math.hypot(u + 0.28 + 0.04 * stretch, vv + 0.01) < 0.048) {
          out.hit = true; out.r = 255; out.g = 250; out.b = 246; out.kind = KIND_LIGHT; out.glyphs = '*@';
          return;
        }

        // Head ellipse
        const hu = (u - (0.17 + 0.03 * stretch)) / 0.09;
        const hv = (vv + 0.07) / 0.072;
        if (hu * hu + hv * hv <= 1) {
          out.hit = true;
          if (hu > 0.72 && Math.abs(hv) < 0.4) {
            out.r = 244; out.g = 150; out.b = 156; out.kind = KIND_LIGHT;
          } else {
            out.r = 248; out.g = 199; out.b = 181; out.kind = KIND_FUR; out.glyphs = '%8';
          }
          return;
        }

        // Body ellipse + haunch + hind foot
        const bu = (u + 0.05) / (0.20 + 0.04 * stretch);
        const bv = (vv - 0.02) / (0.125 - 0.015 * stretch);
        const inBody = bu * bu + bv * bv <= 1;
        const inHaunch = Math.hypot(u + 0.15 + 0.03 * stretch, vv - 0.05) <= 0.12;
        const fu = (u + 0.18 + 0.08 * stretch) / 0.095;
        const fv = (vv - (0.155 - 0.02 * air)) / 0.032;
        const inFoot = fu * fu + fv * fv <= 1;

        if (inBody || inHaunch || inFoot) {
          out.hit = true;
          if (vv > 0.08) {
            out.r = 206; out.g = 150; out.b = 132; out.kind = KIND_FUR; out.glyphs = '%8';
          } else {
            out.r = 248; out.g = 199; out.b = 181; out.kind = KIND_FUR; out.glyphs = '%8';
          }
        }
      }, 1, 0);

      // Front paw stroke
      const px0 = cx + (0.09 * cosH - 0.08 * dir * sinH) * drawSpan;
      const py0 = cy + (0.09 * sinH + 0.08 * dir * cosH) * drawSpan;
      const pawU = 0.16 + 0.06 * stretch;
      const pawV = 0.15 - 0.03 * air;
      const px1 = cx + (pawU * cosH - pawV * dir * sinH) * drawSpan;
      const py1 = cy + (pawU * sinH + pawV * dir * cosH) * drawSpan;
      drawLine(px0, py0, px1, py1, 226, 174, 156, baseFog);

      // Eye spot
      const ex = cx + ((0.20 + 0.03 * stretch) * cosH - (-0.09) * dir * sinH) * drawSpan;
      const ey = cy + ((0.20 + 0.03 * stretch) * sinH + (-0.09) * dir * cosH) * drawSpan;
      drawSpot(ex, ey, '●', 248, 222, 210, 26, 18, 18, baseFog);

    } else if (currentSpeciesKey === 'turtles') {
      const cosH = Math.cos(a.heading), sinH = Math.sin(a.heading);
      const fAng = 1.25 - 0.6 * Math.sin(a.phase) * clamp(tuning.flipperBeat, 0.5, 1.6);
      const rAng = 2.5 + 0.28 * Math.sin(a.phase + 1.4);
      const cosF = Math.cos(fAng), sinF = Math.sin(fAng);
      const cosR = Math.cos(rAng), sinR = Math.sin(rAng);

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, a.span, sp.extent, baseFog, (u, v, out) => {
        const av = Math.abs(v);
        // Shell ellipse
        const su = (u + 0.02) / 0.28;
        const sv = av / 0.22;
        const sr2 = su * su + sv * sv;
        if (sr2 <= 1) {
          out.hit = true;
          const sr = Math.sqrt(sr2);
          if (sr > 0.83) {
            out.r = 74; out.g = 132; out.b = 100; out.kind = KIND_DARK; out.glyphs = '=';
            return;
          }
          // Vertebral & cross seams
          const seamV = Math.abs(sv - 0.34) < 0.065;
          const freq = sv < 0.34 ? 1.7 : 1.4;
          const seamU = Math.abs(((u + 0.32) * freq * 3.2) % 1 - 0.5) < 0.08;
          if (seamV || seamU) {
            out.r = 40; out.g = 84; out.b = 62; out.kind = KIND_DARK;
            return;
          }
          const bright = 0.86 + 0.32 * (1 - sr);
          out.r = 109 * bright; out.g = 176 * bright; out.b = 138 * bright;
          out.kind = KIND_SHINE;
          return;
        }

        // Head & neck
        const hu = (u - 0.33) / 0.085;
        const hv = av / 0.07;
        if (hu * hu + hv * hv <= 1 || (u >= 0.21 && u <= 0.29 && av < 0.048)) {
          out.hit = true; out.r = 142; out.g = 200; out.b = 164; out.kind = KIND_PLAIN;
          return;
        }

        // Small tail
        if (u < -0.28 && u > -0.37 && av < 0.03 * (1 - (-0.28 - u) / 0.09)) {
          out.hit = true; out.r = 118; out.g = 176; out.b = 142; out.kind = KIND_PLAIN;
          return;
        }

        // Front flippers
        const fdx = u - 0.12, fdy = av - 0.17;
        const fl = fdx * cosF + fdy * sinF;
        const fw = -fdx * sinF + fdy * cosF;
        if (fl >= 0 && fl <= 0.24) {
          const maxW = 0.055 * Math.sin(Math.pow(fl / 0.24, 0.7) * Math.PI);
          if (Math.abs(fw) <= maxW) {
            out.hit = true; out.r = 132; out.g = 192; out.b = 156; out.kind = KIND_PLAIN;
            return;
          }
        }

        // Rear flippers
        const rdx = u + 0.2, rdy = av - 0.13;
        const rl = rdx * cosR + rdy * sinR;
        const rw = -rdx * sinR + rdy * cosR;
        if (rl >= 0 && rl <= 0.11) {
          const maxW = 0.042 * Math.sin((rl / 0.11) * Math.PI);
          if (Math.abs(rw) <= maxW) {
            out.hit = true; out.r = 122; out.g = 180; out.b = 146; out.kind = KIND_PLAIN;
          }
        }
      });

      // Eyes
      for (const side of [-1, 1]) {
        const ex = a.x + (0.37 * cosH - 0.045 * side * sinH) * a.span;
        const ey = a.y + (0.37 * sinH + 0.045 * side * cosH) * a.span;
        drawSpot(ex, ey, '●', 142, 200, 164, 18, 28, 22, baseFog);
      }

    } else if (currentSpeciesKey === 'squid') {
      const cosH = Math.cos(a.heading), sinH = Math.sin(a.heading);
      const sq = a.squeeze || 0;
      const glow = (a.phase < 0.16 ? smoothstep(0, 0.16, a.phase) : Math.exp(-4.5 * (a.phase - 0.16))) * tuning.pulseGlow;
      const chromaTick = Math.floor(simTime * 2);

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, a.span, sp.extent, baseFog, (u, v, out) => {
        const av = Math.abs(v);
        // Mantle u in [-0.02, 0.52]
        if (u >= -0.02 && u <= 0.52) {
          const s = (u + 0.02) / 0.54;
          const hw = 0.1 * (1 - 0.16 * sq) * Math.sqrt(Math.max(0, 1 - Math.pow(s, 2.4)));
          // Fins on last 38% of mantle (s > 0.62)
          let finW = 0;
          if (s > 0.62) {
            const fs = (s - 0.62) / 0.38;
            finW = 0.11 * Math.sin(fs * Math.PI);
          }
          if (av <= hw) {
            out.hit = true;
            if (av > hw * 0.78) {
              out.r = 255; out.g = 200; out.b = 226; out.kind = KIND_BRIGHT; out.glyphs = ':;';
              return;
            }
            if (av < 0.015) {
              out.r = 255; out.g = 195; out.b = 222; out.kind = KIND_BRIGHT; out.glyphs = '|';
              return;
            }
            const hCh = hash3(a.id + chromaTick, Math.round(u * 28), Math.round(v * 28));
            if (hCh < 0.16) {
              out.r = 150; out.g = 40; out.b = 96; out.kind = KIND_DARK; out.glyphs = '%#';
              return;
            }
            const cBright = 0.85 + 0.35 * (1 - av / Math.max(0.01, hw)) + glow * 0.25;
            out.r = 232 * cBright; out.g = 106 * cBright; out.b = 160 * cBright;
            out.kind = KIND_SHINE;
            return;
          }
          if (finW > 0 && av <= hw + finW) {
            out.hit = true; out.r = 232; out.g = 126; out.b = 180; out.kind = KIND_SOFT;
            return;
          }
          // Bioluminescent halo around mantle
          if (glow > 0.08 && av <= hw + finW + 0.075 * glow) {
            out.hit = true;
            out.r = 255 * Math.min(1.2, 0.5 + glow * 0.6);
            out.g = 160 * Math.min(1.2, 0.5 + glow * 0.6);
            out.b = 210 * Math.min(1.2, 0.5 + glow * 0.6);
            out.kind = KIND_LINE; out.glyphs = '.';
            return;
          }
        }
        // Head ellipse at u -0.06
        const hu = (u + 0.06) / 0.065;
        const hv = av / 0.065;
        if (hu * hu + hv * hv <= 1) {
          out.hit = true; out.r = 216; out.g = 96; out.b = 152; out.kind = KIND_PLAIN;
        }
      });

      // Eyes
      for (const side of [-1, 1]) {
        const ex = a.x + (-0.055 * cosH - 0.06 * side * sinH) * a.span;
        const ey = a.y + (-0.055 * sinH + 0.06 * side * cosH) * a.span;
        drawSpot(ex, ey, '●', 255, 210, 232, 22, 12, 20, baseFog);
      }

      // 8 waving arms (12 segments)
      const armLen = 0.42 * tuning.armLength;
      const spreadScale = 1 - 0.55 * sq;
      for (let i = 0; i < 8; i++) {
        const frac = (i / 7) * 2 - 1;
        const len = armLen * (0.85 + 0.3 * hash3(a.id, i, 9));
        let px = a.x + (-0.09 * cosH - frac * 0.04 * sinH) * a.span;
        let py = a.y + (-0.09 * sinH + frac * 0.04 * cosH) * a.span;
        for (let seg = 1; seg <= 12; seg++) {
          const s = seg / 12;
          const lu = -0.09 - s * len;
          const lv = frac * 0.06 * spreadScale * (0.6 + 0.6 * s)
            + 0.035 * Math.sin(a.phase * Math.PI * 2 - 3.5 * s + 1.3 * i) * s
            + a.turnRate * 0.06 * s * s;
          const nx = a.x + (lu * cosH - lv * sinH) * a.span;
          const ny = a.y + (lu * sinH + lv * cosH) * a.span;
          const segFog = clamp(baseFog + s * 0.45, 0, 1);
          drawLine(px, py, nx, ny, 232, 104, 168, segFog);
          px = nx; py = ny;
        }
      }

      // 2 long tentacles (22 dotted steps + o@o club)
      const tentLen = 0.78 * tuning.armLength;
      for (const side of [-1, 1]) {
        let tx = 0, ty = 0;
        for (let step = 1; step <= 22; step++) {
          const s = step / 22;
          const lu = -0.09 - s * tentLen;
          const lv = side * (0.045 * spreadScale + 0.04 * s)
            + 0.04 * Math.sin(a.phase * Math.PI * 2 - 4.2 * s + side) * s
            + a.turnRate * 0.1 * s * s;
          tx = a.x + (lu * cosH - lv * sinH) * a.span;
          ty = a.y + (lu * sinH + lv * cosH) * a.span;
          const chStr = step >= 20 ? (step === 21 ? '@' : 'o') : (step % 2 === 0 ? ':' : '|');
          const cR = step >= 20 ? 255 : 226;
          const cG = step >= 20 ? 160 : 104;
          const cB = step >= 20 ? 204 : 164;
          drawDot(tx, ty, chStr, cR, cG, cB, clamp(baseFog + s * 0.3, 0, 1));
        }
        shedTrail(tx, ty, 0.025 * a.depth);
      }

    } else if (currentSpeciesKey === 'owls') {
      const cosH = Math.cos(a.heading), sinH = Math.sin(a.heading);
      const opening = Math.max(0.3, (0.55 + 0.45 * Math.pow(0.5 + 0.5 * Math.cos(a.phase), 0.8)) * (1 - 0.5 * a.tuck));
      const maxWingV = 0.06 + 0.5 * opening;

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, a.span, sp.extent, baseFog, (u, v, out) => {
        const av = Math.abs(v);
        // Face disc
        const fd = Math.hypot(u - 0.13, v);
        if (fd <= 0.1) {
          out.hit = true;
          if (fd > 0.078) {
            out.r = 128; out.g = 100; out.b = 70; out.kind = KIND_DARK;
          } else if (u > 0.14 && u < 0.18 && av < 0.018) {
            out.r = 150; out.g = 112; out.b = 62; out.kind = KIND_DARK; out.glyphs = 'v';
          } else {
            out.r = 244; out.g = 232; out.b = 206; out.kind = KIND_LIGHT; out.glyphs = 'o.';
          }
          return;
        }

        // Body ellipse
        const bu = (u + 0.06) / 0.16;
        const bv = av / 0.085;
        if (bu * bu + bv * bv <= 1) {
          out.hit = true;
          const bar = Math.sin((u + 0.22) * 44) > 0.65;
          if (bar) {
            out.r = 140; out.g = 110; out.b = 76; out.kind = KIND_DARK; out.glyphs = 'v';
          } else {
            out.r = 217; out.g = 195; out.b = 160; out.kind = KIND_FUR; out.glyphs = '%8';
          }
          return;
        }

        // Barred tail
        if (u >= -0.34 && u <= -0.18 && av <= 0.065) {
          out.hit = true;
          const bar = Math.floor((u + 0.34) * 32) % 2 === 0;
          out.r = bar ? 136 : 210; out.g = bar ? 106 : 186; out.b = bar ? 74 : 150;
          out.kind = bar ? KIND_DARK : KIND_PLAIN;
          return;
        }

        // Wings
        if (av >= 0.06 && av <= maxWingV) {
          const s = (av - 0.06) / (maxWingV - 0.06);
          let lead = 0.12 - 0.04 * s - 0.06 * s * s;
          let trail = -0.18 + 0.08 * s + 0.012 * Math.cos(s * Math.PI * 12);
          if (s > 0.8) {
            const ts = (s - 0.8) / 0.2;
            const round = Math.sqrt(Math.max(0, 1 - ts * ts));
            const mid = (lead + trail) * 0.5;
            const half = (lead - trail) * 0.5 * round;
            lead = mid + half;
            trail = mid - half;
            // 5 slotted finger feathers
            const slot = Math.sin(((u - trail) / Math.max(0.01, lead - trail)) * Math.PI * 5);
            if (ts > 0.35 && slot < -0.25) return;
          }
          if (u >= trail && u <= lead) {
            out.hit = true;
            const chordT = (u - trail) / Math.max(0.01, lead - trail);
            if (chordT > 0.65 && s < 0.68) {
              out.r = 238; out.g = 220; out.b = 184; out.kind = KIND_PLAIN;
            } else if (Math.sin(s * 24 + u * 14) > 0.72) {
              out.r = 150; out.g = 118; out.b = 82; out.kind = KIND_DARK;
            } else {
              const shade = 0.86 + 0.22 * chordT;
              out.r = 217 * shade; out.g = 195 * shade; out.b = 160 * shade;
              out.kind = KIND_PLAIN;
            }
          }
        }
      });

      // Ear tufts "^" & Amber eyes "●"
      for (const side of [-1, 1]) {
        const tx = a.x + (0.225 * cosH - 0.06 * side * sinH) * a.span;
        const ty = a.y + (0.225 * sinH + 0.06 * side * cosH) * a.span;
        drawDot(tx, ty, '^', 180, 152, 118, baseFog);

        const ex = a.x + (0.135 * cosH - 0.045 * side * sinH) * a.span;
        const ey = a.y + (0.135 * sinH + 0.045 * side * cosH) * a.span;
        drawSpot(ex, ey, '●', 250, 186, 58, 18, 14, 10, baseFog);
      }

    } else if (currentSpeciesKey === 'flyingfish') {
      const isLeaping = a.fishState === 'leap';
      const s = isLeaping ? a.leapT : 0;
      const arc = isLeaping ? 4 * s * (1 - s) * tuning.leapHeight : 0;
      const surface = isLeaping ? smoothstep(0, 0.1, s) * (1 - smoothstep(0.9, 1, s)) : 0;
      const finSpread = isLeaping ? (0.42 + 0.58 * smoothstep(0.1, 0.16, s) * (1 - smoothstep(0.72, 0.88, s))) : 0.42;
      const drawSpan = a.span * (1 + 0.35 * arc);
      const fishFog = clamp(baseFog + (1 - surface) * 0.22, 0, 1);
      const swayAng = isLeaping ? 0 : Math.sin(simTime * 3.5 + a.id) * 0.06;
      const cosH = Math.cos(a.heading + swayAng), sinH = Math.sin(a.heading + swayAng);

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, drawSpan, sp.extent, fishFog, (u, v, out) => {
        const av = Math.abs(v);
        // Body u in [-0.3, 0.32]
        if (u >= -0.3 && u <= 0.32) {
          const bt = (u + 0.3) / 0.62;
          const hw = 0.082 * Math.sin(Math.pow(bt, 0.72) * Math.PI);
          if (av <= hw) {
            out.hit = true;
            if (av < hw * 0.32) {
              out.r = 62; out.g = 150; out.b = 150; out.kind = KIND_DARK; out.glyphs = '=:';
            } else if (av > hw * 0.74) {
              out.r = 224; out.g = 250; out.b = 246; out.kind = KIND_LIGHT; out.glyphs = 'o.';
            } else {
              out.r = 133; out.g = 227; out.b = 221; out.kind = KIND_SHINE;
            }
            return;
          }
        }

        // Deeply forked tail u in [-0.46, -0.28]
        if (u >= -0.46 && u < -0.28) {
          const tt = (-0.28 - u) / 0.18;
          const lobeW = 0.025 + 0.12 * tt;
          const notchW = 0.075 * tt;
          if (av <= lobeW && av >= notchW * (v > 0 ? 0.85 : 1)) {
            out.hit = true; out.r = 110; out.g = 206; out.b = 204; out.kind = KIND_SOFT; out.glyphs = '.:';
            return;
          }
        }

        // Pectoral & pelvic wing-fins
        const sv = av / Math.max(0.15, finSpread);
        const rPec = polarLobe(u, sv, 0.12, -1.2, -0.12, 0.46, 0.36, 0.45, 0.04, 7);
        const rPel = polarLobe(u, sv, -0.1, -1.35, -0.25, 0.2, 0.4, 0.5, 0.03, 5);
        if (rPec >= 0 || rPel >= 0) {
          out.hit = true;
          const ang = Math.atan2(u - (rPec >= 0 ? 0.12 : -0.1), sv);
          const ray = Math.abs(((ang + 2) * 8) % 1 - 0.5) < 0.08;
          if (ray) {
            out.r = 92; out.g = 190; out.b = 186; out.kind = KIND_LINE;
          } else {
            out.r = 160; out.g = 238; out.b = 232; out.kind = KIND_SOFT; out.glyphs = '.:';
          }
        }
      });

      // Eyes
      for (const side of [-1, 1]) {
        const ex = a.x + (0.24 * cosH - 0.032 * side * sinH) * drawSpan;
        const ey = a.y + (0.24 * sinH + 0.032 * side * cosH) * drawSpan;
        drawSpot(ex, ey, '●', 210, 248, 245, 16, 28, 32, fishFog);
      }

    } else if (currentSpeciesKey === 'eagles') {
      const cosH = Math.cos(a.heading), sinH = Math.sin(a.heading);
      let arm, hand, sweep = 0, scaleBoost = 1;
      if (!tuning.foldingFlap) {
        const flap = Math.pow(0.5 + 0.5 * Math.cos(a.phase), 0.8);
        arm = hand = Math.max(0.12, 0.25 + 0.75 * (flap * (1 - a.glide) + a.glide));
      } else {
        const cyc = ((a.phase / (Math.PI * 2)) % 1 + 1) % 1;
        if (cyc < 0.6) {
          const t = cyc / 0.6;
          const ang = lerp(0.85, -0.6, t);
          arm = Math.max(0.25, Math.cos(ang));
          hand = arm;
          sweep = -0.12 * Math.sin(t * Math.PI);
          scaleBoost = 1 + 0.025 * Math.sin(t * Math.PI);
        } else {
          const t = (cyc - 0.6) / 0.4;
          const fold = Math.sin(t * Math.PI);
          arm = lerp(0.82, 0.52, fold);
          hand = lerp(0.82, 0.38, fold);
          sweep = 1.05 * fold;
        }
        arm = lerp(arm, 1, a.glide);
        hand = lerp(hand, 1, a.glide);
        sweep = lerp(sweep, 0, a.glide);
        scaleBoost = lerp(scaleBoost, 1, a.glide);
      }

      const drawSpan = a.span * scaleBoost;
      const lightMul = 0.82 + 0.18 * arm;
      const wristV = 0.05 + 0.2 * arm;
      const tipV = wristV + 0.29 * hand;
      const cosSw = Math.cos(sweep), sinSw = Math.sin(sweep);

      rasteriseAnimal(a, simTime, a.x, a.y, cosH, sinH, drawSpan, sp.extent, baseFog, (u, v, out) => {
        const av = Math.abs(v);
        // Hooked gold beak
        if (u > 0.27 && u < 0.33 && av < 0.025 * (1 - (u - 0.27) / 0.06)) {
          out.hit = true; out.r = 240; out.g = 190; out.b = 70; out.kind = KIND_DARK; out.glyphs = '@v';
          return;
        }
        // Bright white head
        const hu = (u - 0.215) / 0.075;
        const hv = av / 0.048;
        if (hu * hu + hv * hv <= 1) {
          out.hit = true; out.r = 252; out.g = 252; out.b = 255; out.kind = KIND_LIGHT; out.glyphs = 'o.';
          return;
        }
        // White body ellipse
        const bu = u / 0.17;
        const bv = av / 0.062;
        if (bu * bu + bv * bv <= 1) {
          out.hit = true;
          if (Math.sin(u * 48) > 0.72) {
            out.r = 190; out.g = 196; out.b = 214; out.kind = KIND_PLAIN; out.glyphs = 'v';
          } else {
            out.r = 236; out.g = 238; out.b = 246; out.kind = KIND_PLAIN;
          }
          return;
        }
        // White fan tail u in [-0.38, -0.14]
        if (u >= -0.38 && u <= -0.14) {
          const tt = (-0.14 - u) / 0.24;
          const tw = lerp(0.04, 0.12, tt);
          if (av <= tw) {
            // Notched tip
            if (tt > 0.88 && Math.sin(av * 90) < -0.3) return;
            out.hit = true; out.r = 244; out.g = 246; out.b = 252; out.kind = KIND_LIGHT; out.glyphs = 'o.';
            return;
          }
        }
        // Wings (inner arm + swept outer hand)
        if (av >= 0.05) {
          let s = -1, wu = u;
          if (av <= wristV) {
            s = ((av - 0.05) / Math.max(0.01, wristV - 0.05)) * 0.41;
          } else {
            const du = u - 0.05;
            const dv = av - wristV;
            const ru = du * cosSw + dv * sinSw + 0.05;
            const rv = -du * sinSw + dv * cosSw;
            if (rv >= 0 && rv <= 0.29 * hand) {
              s = 0.41 + (rv / Math.max(0.01, 0.29 * hand)) * 0.59;
              wu = ru;
            }
          }
          if (s >= 0 && s <= 1) {
            let lead = 0.13 + 0.02 * s - 0.07 * s * s;
            let trail = -0.115 + 0.025 * s + (s < 0.74 ? 0.01 * Math.cos(s * Math.PI * 16) : 0);
            if (s > 0.7) {
              const ts = (s - 0.7) / 0.3;
              const round = Math.sqrt(Math.max(0, 1 - ts * ts));
              const mid = (lead + trail) * 0.5;
              const half = (lead - trail) * 0.5 * round;
              lead = mid + half;
              trail = mid - half;
              // 6 spread finger primaries
              if (ts > 0.3 && Math.sin(((wu - trail) / Math.max(0.01, lead - trail)) * Math.PI * 6) < -0.22) return;
            }
            if (wu >= trail && wu <= lead) {
              out.hit = true;
              const chordT = (wu - trail) / Math.max(0.01, lead - trail);
              if (s > 0.72) {
                out.r = 112; out.g = 120; out.b = 144; out.kind = KIND_DARK;
              } else if (chordT < 0.42) {
                out.r = 150; out.g = 158; out.b = 180; out.kind = KIND_DARK; out.glyphs = '=#';
              } else {
                out.r = 236; out.g = 238; out.b = 246; out.kind = KIND_PLAIN;
              }
            }
          }
        }
      }, lightMul);

      // Gold talon lines under tail
      for (const side of [-1, 1]) {
        const tx0 = a.x + (-0.15 * cosH - 0.028 * side * sinH) * drawSpan;
        const ty0 = a.y + (-0.15 * sinH + 0.028 * side * cosH) * drawSpan;
        const tx1 = a.x + (-0.23 * cosH - 0.042 * side * sinH) * drawSpan;
        const ty1 = a.y + (-0.23 * sinH + 0.042 * side * cosH) * drawSpan;
        drawLine(tx0, ty0, tx1, ty1, 240, 190, 70, baseFog);
      }

      // Gold-ringed eyes when bird is large enough
      if (drawSpan > 48) {
        const eyeV = Math.max(0.026, cw / drawSpan);
        for (const side of [-1, 1]) {
          const ex = a.x + (0.225 * cosH - eyeV * side * sinH) * drawSpan;
          const ey = a.y + (0.225 * sinH + eyeV * side * cosH) * drawSpan;
          drawSpot(ex, ey, '●', 240, 190, 70, 18, 20, 26, baseFog);
        }
      }
    }
  }

  /* ---- RENDER FRAME ---- */
  function renderFrame() {
    clearCellBuffer();

    // 1. Background species extras (Squid marine snow, Turtle food pellets)
    if (currentSpeciesKey === 'squid') {
      for (let i = 0; i < marineSnow.length; i++) {
        const m = marineSnow[i];
        const twFog = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(simTime * 2.2 + m.phase));
        drawDot(m.x, m.y, m.star ? '*' : '.', 255, 176, 214, twFog);
      }
    } else if (currentSpeciesKey === 'turtles') {
      for (let i = 0; i < pellets.length; i++) {
        const p = pellets[i];
        const lifeFrac = p.age / 14;
        const pfog = lifeFrac > 0.7 ? (lifeFrac - 0.7) / 0.3 : 0;
        drawDot(p.x, p.y, lifeFrac < 0.5 ? 'o' : '.', 190, 226, 150, pfog);
      }
    }

    // 2. Rasterise all animals (sorted back-to-front by roll)
    for (let i = 0; i < animals.length; i++) {
      drawAnimal(animals[i]);
    }

    // 3. Blit cached background grid
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 4. Draw trail energy layer (never over solid cells)
    const tc = SPECIES_CONFIG[currentSpeciesKey].trailColor;
    applyHue(tc[0], tc[1], tc[2], tmpRGB);
    const tr = tmpRGB[0] | 0, tg = tmpRGB[1] | 0, tb = tmpRGB[2] | 0;
    const baseSq = Math.max(2, Math.round(0.19 * cw));
    const cxOff = cw * 0.5;
    const cyOff = ch * 0.6;

    for (let step = 1; step <= 6; step++) {
      const alpha = ((0.85 * step) / 6).toFixed(3);
      ctx.fillStyle = `rgba(${tr},${tg},${tb},${alpha})`;
      const lo = (step - 1) / 6;
      const hi = step === 6 ? 99 : step / 6;
      for (let r = 0; r < rows; r++) {
        const rowOff = r * cols;
        const yBase = r * ch + cyOff;
        for (let c = 0; c < cols; c++) {
          const idx = rowOff + c;
          const e = trailA[idx];
          if (e <= 0.02 || cellType[idx] === 2) continue;
          const tw = e * (0.75 + 0.25 * Math.sin(5 * simTime + hash3(c, r, 13) * 40));
          if (tw < lo || tw >= hi) continue;
          const sz = e > 0.6 ? baseSq + 1 : baseSq;
          ctx.fillRect(Math.round(c * cw + cxOff - sz * 0.5), Math.round(yBase - sz * 0.5), sz, sz);
        }
      }
    }

    // 5. Draw all non-empty cells
    ctx.font = glyphFontStr;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < dirtyCount; i++) {
      const idx = dirtyList[i];
      const t = cellType[idx];
      if (t === 0) continue;
      const c = idx % cols;
      const r = (idx / cols) | 0;
      const x = c * cw;
      const y = r * ch;

      if (t === 2) {
        ctx.fillStyle = `rgb(${fillR[idx]},${fillG[idx]},${fillB[idx]})`;
        ctx.fillRect(x + 1, y + 1, cw - 1, ch - 1);
      }

      ctx.fillStyle = `rgb(${glyphR[idx]},${glyphG[idx]},${glyphB[idx]})`;
      ctx.fillText(glyphChar[idx], x + cw * 0.5, y + ch * 0.5 + 1);
    }
  }

  /* ==========================================================================
     6. INTERACTION: CLICK TO SCATTER / FEED
     ========================================================================== */
  function poke(clientX, clientY) {
    if (prefersReducedMotion.matches) return;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    if (currentSpeciesKey === 'turtles') {
      const count = 7 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        if (pellets.length >= 60) pellets.shift();
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 70;
        const spd = 4 + Math.random() * 10;
        const x = px + Math.cos(ang) * rad;
        const y = py + Math.sin(ang) * rad;
        pellets.push({ x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, age: 0 });
        stampTrail(x, y, 1, 0.45);
      }
      return;
    }

    stampTrail(px, py, 6, 1.4);
    react(px, py, 240, 1, false);
  }

  // Phản ứng của đàn với một điểm: click (mạnh, mọi con trong bán kính) hoặc
  // hover (yếu hơn, mỗi con nghỉ HOVER_COOLDOWN_MS giữa 2 lần để không giật liên hồi).
  const HOVER_COOLDOWN_MS = 1400;
  function react(px, py, radius, strength, fromHover) {
    const groupHeading = getCourseAngle();
    const now = performance.now();

    for (let i = 0; i < animals.length; i++) {
      const a = animals[i];
      const dx = a.x - px;
      const dy = a.y - py;
      const d = Math.hypot(dx, dy);
      if (d >= radius) continue;
      if (fromHover) {
        if (now - (a.hoverAt || 0) < HOVER_COOLDOWN_MS) continue;
        a.hoverAt = now;
      }
      const k = (1 - d / radius) * strength;
      const away = Math.atan2(dy, dx);

      if (currentSpeciesKey === 'moths') {
        const kick = k * 420 * a.depth;
        a.vx += Math.cos(away) * kick;
        a.vy += Math.sin(away) * kick;
        a.startled = 0.6 + Math.random() * 0.6;
        a.glideTimer = 0;
        a.glide = 0;
      } else if (currentSpeciesKey === 'rabbits' && tuning.scare > 0) {
        const sp = SPECIES_CONFIG.rabbits;
        const cruise = sp.speed * (0.55 + 0.45 * a.depth) * tuning.speed;
        a.fleeAngle = away + (Math.random() - 0.5) * 0.7;
        a.fleeSpeed = cruise * (2.5 + 3 * k) * tuning.scare;
        a.fleeDur = (1 + 1.5 * k) * Math.sqrt(tuning.scare);
        a.fleeTimer = a.fleeDur;
        a.alarm = 1;
        a.running = true;
      } else if (currentSpeciesKey === 'squid') {
        a.phase = 0;
        const kick = 260 * k * a.depth;
        a.vx += Math.cos(a.heading) * kick;
        a.vy += Math.sin(a.heading) * kick;
        a.startled = 0.8;
      } else if (currentSpeciesKey === 'owls') {
        a.owlState = 'swoop';
        a.owlTimer = 0.25 + 0.3 * k;
        a.owlAim = groupHeading;
        a.startled = 0.6;
      } else if (currentSpeciesKey === 'flyingfish') {
        if (a.fishState === 'wait') {
          startFishLeap(a, away, 1 + k, true);
        }
      } else if (currentSpeciesKey === 'eagles') {
        const kick = k * 280 * a.depth;
        a.vx += Math.cos(away) * kick;
        a.vy += Math.sin(away) * kick;
        a.startled = 0.7;
        a.glideTimer = 0;
      } else if (currentSpeciesKey === 'turtles') {
        // chỉ tới đây khi hover (click với rùa là thả mồi ở poke): rùa né nhẹ khỏi con trỏ
        const kick = k * 120 * a.depth;
        a.vx += Math.cos(away) * kick;
        a.vy += Math.sin(away) * kick;
      }
    }
  }

  // Di chuột: vệt sáng mờ theo con trỏ + đàn phản ứng nhẹ (không cần click)
  let lastHoverStamp = 0;
  function hover(clientX, clientY) {
    if (prefersReducedMotion.matches) return;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const now = performance.now();
    if (now - lastHoverStamp > 40) {
      stampTrail(px, py, 2, 0.35);
      lastHoverStamp = now;
    }
    react(px, py, 170, 0.6, true);
  }

  /* ==========================================================================
     VÒNG LẶP (giữ nguyên bản gốc): bước cố định 60Hz, dừng khi khuất màn hình
     ========================================================================== */
  let isVisible = true;
  let rafId = 0;
  let lastTime = 0;
  let accumulator = 0;
  const FIXED_DT = 1 / 60;

  function renderReducedMotionStill() {
    const drawStill = () => {
      for (let i = 0; i < 240; i++) stepSimulation(FIXED_DT);
      renderFrame();
    };
    if (document.fonts && document.fonts.load) {
      document.fonts.load('600 16px "Geist Mono"').then(drawStill, drawStill);
    } else {
      drawStill();
    }
  }

  function loop(now) {
    if (!isVisible || prefersReducedMotion.matches) { rafId = 0; return; }
    if (!lastTime) lastTime = now;
    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;
    accumulator += dt;
    let steps = 0;
    while (accumulator >= FIXED_DT && steps < 4) {
      stepSimulation(FIXED_DT);
      accumulator -= FIXED_DT;
      steps++;
    }
    if (steps === 4) accumulator = 0;
    renderFrame();
    rafId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (prefersReducedMotion.matches || !isVisible || rafId) return;
    lastTime = 0;
    accumulator = 0;
    rafId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) { stopLoop(); renderReducedMotionStill(); } else startLoop();
  });

  new ResizeObserver(() => {
    resizeGrid(true);
    if (prefersReducedMotion.matches) renderFrame();
  }).observe(canvas);

  new IntersectionObserver((entries) => {
    isVisible = entries.some((e) => e.isIntersecting);
    if (isVisible) startLoop(); else stopLoop();
  }).observe(canvas);

  // khởi tạo loài (tương đương selectSpecies(key, true) của bản gốc)
  loadSpeciesTweaks(currentSpeciesKey);
  resizeGrid(false);
  syncPopulation(true);
  if (currentSpeciesKey === 'squid') initMarineSnow();
  if (prefersReducedMotion.matches) renderReducedMotionStill(); else startLoop();

  return { poke, hover };
}
