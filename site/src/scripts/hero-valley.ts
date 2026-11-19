// Thung lũng hoa phát sáng ban đêm cho hero trang chủ — code riêng của 126Verse (three.js).
// Một lớp Points + shader tự viết cho 3 loại hạt: hoa (0), lá (1), bụi sáng (2).
// - Hoa nở dần khi lại gần camera, lá mọc ở xa hơn
// - Camera trôi chậm về phía trước, cuộn trang thì bay nhanh hơn, nghiêng nhẹ theo chuột
// - Chuột đẩy các hạt dạt ra trong không gian màn hình, hạt gần con trỏ sáng hơn
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

const LENGTH = 120; // chiều dài đoạn thung lũng lặp vô hạn (đơn vị thế giới)
const HALF_W = 34; // nửa bề rộng thung lũng

// Bảng màu theo thương hiệu: tím 126Verse, tím sáng, hồng tím, kem, chút xanh lạnh
const FLOWER_COLORS = ['#5E0ED7', '#7c3aed', '#a855f7', '#c084fc', '#e879f9', '#f5efe2', '#7dd3fc'];
const FLOWER_WEIGHTS = [3, 3, 4, 3, 2, 1, 0.6];
const LEAF_COLORS = ['#1f4d4a', '#2a3f6b', '#3b2a6b', '#1d5c4a'];

const vertexShader = /* glsl */ `
  attribute float aType;
  attribute float aPhase;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uTravel;
  uniform float uPixel;
  uniform vec2 uMouse;      // NDC, ngoài màn hình = (9,9)
  uniform float uAspect;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vType;
  varying float vPhase;
  varying float vGlow;

  void main() {
    vec3 p = position;
    float t = uTime;
    if (aType > 1.5) {
      // bụi sáng: trôi lơ lửng
      p.x += sin(t * 0.21 + aPhase * 6.283) * 0.9;
      p.y += sin(t * 0.33 + aPhase * 12.0) * 0.5;
    } else {
      // hoa/lá đung đưa nhẹ theo gió
      p.x += sin(t * 0.9 + aPhase * 6.283 + p.z * 0.15) * 0.06;
    }
    // lặp vô hạn: hạt trôi về phía camera, ra sau lưng thì quay lại cuối thung lũng
    p.z = mod(p.z + uTravel, ${LENGTH.toFixed(1)}) - ${LENGTH.toFixed(1)};

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    float grow;
    if (aType < 0.5) grow = 0.18 + 0.82 * smoothstep(48.0, 9.0, dist);       // hoa nở khi lại gần
    else if (aType < 1.5) grow = smoothstep(95.0, 40.0, dist);                // lá mọc ở xa hơn
    else grow = 1.0;

    gl_Position = projectionMatrix * mv;

    // chuột đẩy hạt ra trong không gian màn hình
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 d = ndc - uMouse;
    d.x *= uAspect;
    float r = length(d);
    float push = exp(-r * r / 0.035);
    vec2 dir = r > 0.0001 ? d / r : vec2(0.0);
    dir.x /= uAspect;
    ndc += dir * push * 0.09;
    gl_Position.xy = ndc * gl_Position.w;
    vGlow = push;

    float twinkle = 0.75 + 0.25 * sin(t * (1.2 + aPhase) + aPhase * 40.0);
    gl_PointSize = aSize * grow * uPixel / max(dist, 0.5) * (1.0 + push * 0.6);

    // mờ dần ở xa (sương đêm) và ngay sát camera (tránh hạt "bật" khi lặp)
    float fog = smoothstep(${LENGTH.toFixed(1)}, 55.0, dist);
    float nearFade = smoothstep(0.6, 3.5, dist);
    vAlpha = fog * nearFade * twinkle;
    vColor = aColor;
    vType = aType;
    vPhase = aPhase;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vType;
  varying float vPhase;
  varying float vGlow;

  void main() {
    vec2 q = gl_PointCoord * 2.0 - 1.0;
    float r = length(q);
    if (r > 1.0) discard;
    float a;
    vec3 col = vColor;
    if (vType < 0.5) {
      // hoa 5 cánh + nhuỵ sáng + quầng sáng
      float ang = atan(q.y, q.x) + vPhase * 6.283;
      float petal = 0.5 + 0.32 * cos(5.0 * ang);
      float shape = smoothstep(petal, petal - 0.22, r);
      float core = exp(-r * r * 22.0);
      float halo = exp(-r * r * 3.0) * 0.35;
      col = mix(col, vec3(1.0, 0.96, 0.9), core * 0.7);
      a = shape * 0.8 + core + halo;
    } else if (vType < 1.5) {
      // lá: elip mềm xoay ngẫu nhiên
      float c = cos(vPhase * 6.283), s = sin(vPhase * 6.283);
      vec2 k = vec2(c * q.x - s * q.y, s * q.x + c * q.y);
      a = exp(-(k.x * k.x * 10.0 + k.y * k.y * 1.6)) * 0.55;
    } else {
      // bụi sáng: chấm mềm
      a = exp(-r * r * 7.0) * 0.6;
    }
    col += vGlow * 0.35;                    // sáng lên gần con trỏ
    gl_FragColor = vec4(col, a * vAlpha * (1.0 + vGlow * 0.8));
  }
`;

// Thung lũng hình chữ U thoai thoải + gợn đồi
const groundY = (x: number, z: number) =>
  0.012 * x * x + Math.sin(x * 0.21 + z * 0.13) * 0.55 + Math.sin(z * 0.07) * 0.8 - 0.6;

function pickWeighted<T>(items: T[], weights: number[]) {
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < items.length; i++) if ((r -= weights[i]) <= 0) return items[i];
  return items[items.length - 1];
}

export function initHeroValley(canvas: HTMLCanvasElement, { reducedMotion = false } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  const small = window.matchMedia('(max-width: 820px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.5));
  renderer.setClearColor(0x050308, 1);

  const scene = new Scene();
  const camera = new PerspectiveCamera(58, 1, 0.1, LENGTH + 10);
  camera.position.set(0, 2.4, 0);
  camera.rotation.order = 'YXZ';

  // ─── Sinh hạt ───
  const nFlower = small ? 4200 : 9000;
  const nLeaf = small ? 4000 : 8500;
  const nDust = small ? 350 : 700;
  const n = nFlower + nLeaf + nDust;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const type = new Float32Array(n);
  const phase = new Float32Array(n);
  const size = new Float32Array(n);
  const c = new Color();
  for (let i = 0; i < n; i++) {
    const t = i < nFlower ? 0 : i < nFlower + nLeaf ? 1 : 2;
    // hoa dày ở lòng thung lũng, thưa dần ra hai sườn
    const x = (t === 2 ? (Math.random() * 2 - 1) : Math.sign(Math.random() - 0.5) * Math.pow(Math.random(), 1.35)) * HALF_W;
    const z = -Math.random() * LENGTH;
    const y = t === 2 ? groundY(x, z) + 0.6 + Math.random() * 5.5 : groundY(x, z) + (t === 0 ? 0.15 + Math.random() * 0.5 : Math.random() * 0.3);
    pos.set([x, y, z], i * 3);
    c.set(t === 0 ? pickWeighted(FLOWER_COLORS, FLOWER_WEIGHTS) : t === 1 ? LEAF_COLORS[(Math.random() * LEAF_COLORS.length) | 0] : '#e9d5ff');
    col.set([c.r, c.g, c.b], i * 3);
    type[i] = t;
    phase[i] = Math.random();
    size[i] = t === 0 ? 0.55 + Math.random() * 0.75 : t === 1 ? 0.45 + Math.random() * 0.5 : 0.12 + Math.random() * 0.18;
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new BufferAttribute(col, 3));
  geo.setAttribute('aType', new BufferAttribute(type, 1));
  geo.setAttribute('aPhase', new BufferAttribute(phase, 1));
  geo.setAttribute('aSize', new BufferAttribute(size, 1));

  const uniforms = {
    uTime: { value: 0 },
    uTravel: { value: 0 },
    uPixel: { value: 1 },
    uMouse: { value: [9, 9] as [number, number] },
    uAspect: { value: 1 },
  };
  const mat = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geo, mat);
  points.frustumCulled = false; // vị trí thật tính trong shader
  scene.add(points);

  // ─── Kích thước ───
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;
    // điểm ảnh tỉ lệ theo chiều cao khung để hoa có cùng kích cỡ cảm nhận trên mọi màn
    uniforms.uPixel.value = h * renderer.getPixelRatio() * 0.9;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // ─── Tương tác ───
  const mouse = { x: 9, y: 9, tx: 0, ty: 0 }; // x,y: NDC cho shader; tx,ty: hướng nghiêng camera
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    if (Math.abs(y) > 1.05) { mouse.x = mouse.y = 9; return; } // ngoài hero
    mouse.x = x; mouse.y = y; mouse.tx = x; mouse.ty = y;
  };
  const onLeave = () => { mouse.x = mouse.y = 9; mouse.tx = mouse.ty = 0; };
  let lastScroll = window.scrollY, boost = 0;
  const onScroll = () => { boost += Math.abs(window.scrollY - lastScroll) * 0.04; lastScroll = window.scrollY; };
  if (!reducedMotion) {
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ─── Vòng lặp: chỉ chạy khi hero đang hiện và tab đang mở ───
  let raf = 0, visible = true, last = performance.now(), travel = 0, time = 0;
  let mx = 9, my = 9, tiltX = 0, tiltY = 0;
  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    boost *= Math.pow(0.04, dt); // giảm dần về tốc độ trôi mặc định
    travel += dt * (1.1 + Math.min(boost, 14));
    // làm mượt vị trí chuột và độ nghiêng camera
    const k = 1 - Math.pow(0.002, dt);
    if (mouse.x > 5) { mx = my = 9; }                       // chuột ngoài hero
    else if (mx > 5) { mx = mouse.x; my = mouse.y; }        // vừa vào: nhảy ngay tới vị trí chuột
    else { mx += (mouse.x - mx) * k; my += (mouse.y - my) * k; }
    tiltX += (mouse.tx - tiltX) * k * 0.5;
    tiltY += (mouse.ty - tiltY) * k * 0.5;
    camera.rotation.y = -tiltX * 0.07;
    // màn hình dọc (điện thoại): nhìn chúc xuống hơn để thung lũng lấp phần trên hero
    camera.rotation.x = (camera.aspect < 1 ? -0.34 : -0.1) + tiltY * 0.04;
    camera.position.y = 2.4 + Math.sin(time * 0.35) * 0.12;
    uniforms.uTime.value = time;
    uniforms.uTravel.value = travel;
    uniforms.uMouse.value = [mx, my];
    renderer.render(scene, camera);
    raf = visible && !document.hidden && !reducedMotion ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf && !reducedMotion) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
  io.observe(canvas);
  const onVis = () => { if (!document.hidden) start(); };
  document.addEventListener('visibilitychange', onVis);

  // Khung hình đầu tiên (giảm chuyển động: chỉ vẽ 1 khung tĩnh)
  travel = 18;
  frame(performance.now());
  start();
}
