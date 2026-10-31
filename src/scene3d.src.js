/* Scaffold Studio · "Growth engine" 3D scroll scene
 * Four marketing objects sit on a ring: megaphone (Reach), phone with a social post (Engage),
 * a lead funnel (Convert) and a rising bar chart (Grow). Scrolling turns the ring so each one
 * swings to the front while the copy beside it changes.
 *
 * Build:  npx esbuild src/scene3d.src.js --bundle --minify --format=iife --outfile=scene3d.js
 * (needs `npm i three@0.170.0 esbuild` in any folder that can resolve "three")
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

window.mountGrowth3D = function mountGrowth3D(section) {
  const canvas = section.querySelector('canvas');
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { section.classList.add('no-webgl'); return; }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8890b0, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0x7a8fff, 1.4); rim.position.set(-6, 2, -4); scene.add(rim);

  /* ---------- palette & materials ---------- */
  const C = { cobalt: 0x2840f0, sky: 0x7a8fff, sun: 0xffc83d, pink: 0xe9466b, ink: 0x121826, green: 0x1a9d55, white: 0xffffff, soft: 0xe7eafb };
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0.05, ...o });
  const M = {
    cobalt: mat(C.cobalt), sky: mat(C.sky), sun: mat(C.sun, { roughness: 0.3 }), pink: mat(C.pink, { roughness: 0.32 }),
    ink: mat(C.ink, { roughness: 0.25, metalness: 0.2 }), white: mat(C.white, { roughness: 0.5 }), green: mat(C.green),
    gold: mat(0xf5b301, { metalness: 0.85, roughness: 0.28 }), soft: mat(C.soft, { roughness: 0.6 })
  };

  /* ---------- shapes ---------- */
  const heartShape = (() => {
    const s = new THREE.Shape(), x = 0, y = 0;
    s.moveTo(x, y + 0.25);
    s.bezierCurveTo(x, y + 0.25, x - 0.05, y, x - 0.25, y);
    s.bezierCurveTo(x - 0.55, y, x - 0.55, y + 0.35, x - 0.55, y + 0.35);
    s.bezierCurveTo(x - 0.55, y + 0.55, x - 0.35, y + 0.77, x, y + 0.95);
    s.bezierCurveTo(x + 0.35, y + 0.77, x + 0.55, y + 0.55, x + 0.55, y + 0.35);
    s.bezierCurveTo(x + 0.55, y + 0.35, x + 0.55, y, x + 0.25, y);
    s.bezierCurveTo(x + 0.1, y, x, y + 0.25, x, y + 0.25);
    return s;
  })();
  const heartGeo = new THREE.ExtrudeGeometry(heartShape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 4, curveSegments: 16 });
  heartGeo.center(); heartGeo.rotateZ(Math.PI);

  const bubbleGeo = (() => {
    const w = 1.1, h = 0.7, r = 0.22, s = new THREE.Shape();
    s.moveTo(-w / 2 + r, -h / 2);
    s.lineTo(-w / 2 + 0.38, -h / 2); s.lineTo(-w / 2 + 0.12, -h / 2 - 0.26); s.lineTo(-w / 2 + 0.2, -h / 2);
    s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    s.lineTo(-w / 2 + r, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3, curveSegments: 10 });
    g.center(); return g;
  })();
  const makeBubble = (m, dotM) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(bubbleGeo, m));
    const dg = new THREE.SphereGeometry(0.075, 16, 12);
    [-0.25, 0, 0.25].forEach(x => { const d = new THREE.Mesh(dg, dotM); d.position.set(x, 0.03, 0.14); g.add(d); });
    return g;
  };

  /* ---------- the ring ---------- */
  const R = 6;
  const ring = new THREE.Group(); scene.add(ring);
  const stations = [];
  const addStation = (obj, i) => {
    const holder = new THREE.Group();
    const th = i * Math.PI / 2;
    holder.position.set(Math.sin(th) * R, 0, Math.cos(th) * R);
    holder.rotation.y = th;
    holder.add(obj); ring.add(holder);
    stations.push({ holder, obj });
  };

  /* 1 · REACH: megaphone with sound waves and floating likes */
  const reach = new THREE.Group();
  {
    const mega = new THREE.Group();
    const pts = [];
    for (let k = 0; k <= 20; k++) { const t = k / 20; pts.push(new THREE.Vector2(0.26 + Math.pow(t, 1.9) * 0.95, t * 1.7)); }
    const bell = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), new THREE.MeshStandardMaterial({ color: C.cobalt, roughness: 0.35, side: THREE.DoubleSide }));
    mega.add(bell);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(1.21, 0.07, 16, 64), M.sun); lip.rotation.x = Math.PI / 2; lip.position.y = 1.7; mega.add(lip);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.75, 32), M.ink); body.position.y = -0.3; mega.add(body);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.ink); cap.position.y = -0.67; mega.add(cap);
    const handle = new RoundedBoxGeometry(0.26, 0.85, 0.3, 4, 0.08);
    const hd = new THREE.Mesh(handle, M.sun); hd.position.set(0.48, -0.2, 0); hd.rotation.z = -0.25; mega.add(hd);
    mega.rotation.z = -Math.PI / 2 + 0.18; // opening points right/up
    mega.rotation.y = -0.55;
    mega.position.set(-0.7, -0.1, 0);
    reach.add(mega);
    // sound waves
    const waves = [];
    for (let k = 0; k < 3; k++) {
      const w = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.035, 10, 64, Math.PI * 0.9), new THREE.MeshBasicMaterial({ color: C.sky, transparent: true, opacity: 0.8 }));
      w.rotation.y = Math.PI / 2 - 0.55; w.rotation.z = -Math.PI * 0.45 + 0.18;
      reach.add(w); waves.push(w);
    }
    reach.userData.waves = waves;
    reach.userData.waveOrigin = new THREE.Vector3(1.0, 0.2, 0.6);
    // floating icons
    const floaters = [];
    const h1 = new THREE.Mesh(heartGeo, M.pink); h1.scale.setScalar(0.5); h1.position.set(1.9, 1.5, 0.3); reach.add(h1); floaters.push(h1);
    const b1 = makeBubble(M.white, M.cobalt); b1.scale.setScalar(0.7); b1.position.set(-1.6, 1.45, 0.2); reach.add(b1); floaters.push(b1);
    const st = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), M.sun); st.position.set(2.2, -1.1, 0.4); reach.add(st); floaters.push(st);
    reach.userData.floaters = floaters;
  }
  addStation(reach, 0);

  /* 2 · ENGAGE: phone with a social post, hearts rising, chat bubbles */
  const engage = new THREE.Group();
  {
    const phone = new THREE.Group();
    phone.add(new THREE.Mesh(new RoundedBoxGeometry(1.6, 3.1, 0.18, 6, 0.2), M.ink));
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 1000;
    const g = cv.getContext('2d');
    const grd = g.createLinearGradient(0, 0, 512, 1000); grd.addColorStop(0, '#FFC83D'); grd.addColorStop(0.55, '#E9466B'); grd.addColorStop(1, '#2840F0');
    g.fillStyle = grd; g.fillRect(0, 0, 512, 1000);
    const rr = (x, y, w, h, r) => { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); g.fill(); };
    g.fillStyle = 'rgba(255,255,255,.45)'; for (let k = 0; k < 3; k++) rr(30 + k * 156, 34, 140, 8, 4);
    g.fillStyle = '#fff'; rr(30, 90, 452, 640, 28);
    const img = g.createLinearGradient(0, 160, 0, 560); img.addColorStop(0, '#2840F0'); img.addColorStop(1, '#7A8FFF');
    g.fillStyle = img; rr(56, 170, 400, 380, 18);
    g.fillStyle = '#121826'; g.beginPath(); g.arc(86, 130, 22, 0, 7); g.fill(); rr(120, 120, 160, 18, 9);
    g.fillStyle = '#FFC83D'; g.beginPath(); g.moveTo(170, 470); g.lineTo(256, 260); g.lineTo(340, 400); g.lineTo(400, 330); g.lineTo(440, 470); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(380, 240, 30, 0, 7); g.fill();
    g.fillStyle = '#E9466B'; g.font = '700 46px sans-serif'; g.fillText('♥ 12.4k', 56, 620);
    g.fillStyle = '#C9CDD8'; rr(56, 650, 360, 14, 7); rr(56, 680, 260, 14, 7);
    g.fillStyle = 'rgba(255,255,255,.95)'; rr(30, 780, 452, 70, 35);
    g.fillStyle = '#596074'; g.font = '600 30px sans-serif'; g.fillText('Add a comment…', 64, 826);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 2.84), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    screen.position.z = 0.1; phone.add(screen);
    phone.rotation.set(0.05, -0.35, 0.08);
    engage.add(phone);
    const hearts = [];
    for (let k = 0; k < 7; k++) {
      const h = new THREE.Mesh(heartGeo, k % 3 === 2 ? M.sun : M.pink);
      h.userData = { x: 0.9 + Math.random() * 0.9, z: 0.2 + Math.random() * 0.6, phase: k / 7, s: 0.22 + Math.random() * 0.2, wob: Math.random() * 6 };
      engage.add(h); hearts.push(h);
    }
    engage.userData.hearts = hearts;
    const b1 = makeBubble(M.white, M.cobalt); b1.scale.setScalar(0.75); b1.position.set(-1.55, 0.9, 0.3); engage.add(b1);
    const b2 = makeBubble(M.cobalt, M.white); b2.scale.set(-0.6, 0.6, 0.6); b2.position.set(-1.35, -0.2, 0.5); engage.add(b2);
    const badge = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), M.pink); badge.position.set(0.8, 1.55, 0.2); engage.add(badge);
    engage.userData.bubbles = [b1, b2]; engage.userData.badge = badge;
  }
  addStation(engage, 1);

  /* 3 · CONVERT: glassy funnel with leads spiralling through */
  const convert = new THREE.Group();
  {
    const prof = [];
    const rOf = y => (y > -0.45 ? 0.26 + Math.pow((y + 0.45) / 1.75, 1.6) * 1.15 : 0.26);
    for (let k = 0; k <= 30; k++) { const y = -1.25 + k / 30 * 2.55; prof.push(new THREE.Vector2(rOf(y), y)); }
    const funnelMat = new THREE.MeshPhysicalMaterial({ color: C.cobalt, roughness: 0.15, metalness: 0, transparent: true, opacity: 0.42, side: THREE.DoubleSide, clearcoat: 1, clearcoatRoughness: 0.1, depthWrite: false });
    const funnel = new THREE.Mesh(new THREE.LatheGeometry(prof, 64), funnelMat);
    convert.add(funnel);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(rOf(1.3), 0.06, 14, 64), M.sun); lip.rotation.x = Math.PI / 2; lip.position.y = 1.3; convert.add(lip);
    const lip2 = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.05, 12, 32), M.cobalt); lip2.rotation.x = Math.PI / 2; lip2.position.y = -1.25; convert.add(lip2);
    const N = coarse ? 42 : 70;
    const parts = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.075, 1), new THREE.MeshStandardMaterial({ roughness: 0.35 }), N);
    const cols = [new THREE.Color(C.sun), new THREE.Color(C.pink), new THREE.Color(C.sky), new THREE.Color(C.white)], green = new THREE.Color(C.green);
    const pd = [];
    for (let k = 0; k < N; k++) { pd.push({ ph: k / N, a: Math.random() * Math.PI * 2, c: cols[k % cols.length], spin: 5 + Math.random() * 5, out: Math.random() * 1.0 }); parts.setColorAt(k, pd[k].c); }
    convert.add(parts);
    // coins collected below = converted leads
    const coinGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.09, 40);
    const coins = [];
    for (let k = 0; k < 4; k++) { const c = new THREE.Mesh(coinGeo, M.gold); c.position.set(0.05 * (k % 2), -1.95 + k * 0.1, 0); convert.add(c); coins.push(c); }
    const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.12, 48), M.white); tray.position.y = -2.05; convert.add(tray);
    convert.userData = { parts, pd, rOf, green, coins };
    convert.rotation.x = 0.18;
  }
  addStation(convert, 2);

  /* 4 · GROW: bar chart that builds up, arrow drawing upward, coin stacks */
  const grow = new THREE.Group();
  {
    const base = new THREE.Mesh(new RoundedBoxGeometry(3.4, 0.16, 1.5, 4, 0.06), M.white); base.position.y = -1.55; grow.add(base);
    const H = [0.55, 0.95, 1.35, 1.95, 2.75], bars = [];
    H.forEach((h, k) => {
      const b = new THREE.Mesh(new RoundedBoxGeometry(0.42, 1, 0.42, 3, 0.06), k === H.length - 1 ? M.sun : (k % 2 ? M.cobalt : M.sky));
      b.geometry.translate(0, 0.5, 0);
      b.position.set(-1.3 + k * 0.65, -1.47, 0); b.userData.h = h; grow.add(b); bars.push(b);
    });
    const tops = H.map((h, k) => new THREE.Vector3(-1.3 + k * 0.65, -1.47 + h + 0.45, 0.32));
    tops.push(new THREE.Vector3(1.75, 1.95, 0.32));
    const curve = new THREE.CatmullRomCurve3(tops);
    const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.06, 10, false);
    const tube = new THREE.Mesh(tubeGeo, M.pink); grow.add(tube);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.4, 24), M.pink); grow.add(head);
    const stackA = [], stackB = [];
    const cg = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 36);
    for (let k = 0; k < 6; k++) { const c = new THREE.Mesh(cg, M.gold); c.position.set(-1.95, -1.42 + k * 0.09, 0.45); grow.add(c); stackA.push(c); }
    for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(cg, M.gold); c.position.set(-1.55, -1.42 + k * 0.09, 0.75); grow.add(c); stackB.push(c); }
    grow.userData = { bars, tube, head, curve, total: tubeGeo.index.count };
    grow.rotation.set(0.12, -0.32, 0);
  }
  addStation(grow, 3);

  /* ---------- ambient confetti ---------- */
  const confetti = new THREE.Group(); scene.add(confetti);
  const cGeos = [new THREE.TetrahedronGeometry(0.12), new THREE.OctahedronGeometry(0.1), new THREE.TorusGeometry(0.09, 0.035, 8, 20), new THREE.BoxGeometry(0.14, 0.14, 0.14)];
  const cMats = [M.sun, M.cobalt, M.pink, M.sky];
  for (let k = 0; k < (coarse ? 26 : 46); k++) {
    const m = new THREE.Mesh(cGeos[k % 4], cMats[(k * 7) % 4]);
    const a = Math.random() * Math.PI * 2, rad = 3 + Math.random() * 6;
    m.position.set(Math.cos(a) * rad, (Math.random() - 0.5) * 9, Math.sin(a) * rad);
    m.userData = { rs: (Math.random() - 0.5) * 2, y0: m.position.y, depth: 0.4 + Math.random() };
    m.rotation.set(Math.random() * 6, Math.random() * 6, 0);
    confetti.add(m);
  }

  /* ---------- sizing ---------- */
  let W = 1, Hh = 1, portrait = false;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); Hh = Math.max(1, r.height);
    renderer.setSize(W, Hh, false);
    camera.aspect = W / Hh;
    portrait = camera.aspect < 0.95;
    camera.fov = portrait ? 48 : 36;
    camera.updateProjectionMatrix();
  };
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas); else addEventListener('resize', resize);

  /* ---------- scroll + pointer ---------- */
  let target = 0, prog = 0, px = 0, py = 0, tx = 0, ty = 0;
  const readScroll = () => {
    const r = section.getBoundingClientRect();
    const span = r.height - innerHeight;
    target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  };
  addEventListener('scroll', readScroll, { passive: true }); readScroll();
  if (!coarse) section.addEventListener('pointermove', e => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });

  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loopStart(); }, { rootMargin: '200px 0px' }).observe(section);

  /* ---------- animation ---------- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const dummy = new THREE.Object3D(), tmp = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const clock = new THREE.Clock();
  let running = false, t = 0;

  function frame() {
    if (!visible || document.hidden) { running = false; return; }
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, clock.getDelta());
    if (!reduced) t += dt;
    prog += (target - prog) * (reduced ? 1 : Math.min(1, dt * 6));
    px += (tx - px) * Math.min(1, dt * 3); py += (ty - py) * Math.min(1, dt * 3);

    // Stations: hold on each object for a bit, swing between them
    const raw = prog * 3, seg = Math.floor(Math.min(raw, 2.999)), f = raw - seg;
    const s = seg + ease(clamp((f - 0.2) / 0.6));
    section.style.setProperty('--m3d', prog.toFixed(4));
    const active = Math.round(s);
    if (section.dataset.step !== String(active)) section.dataset.step = active;

    ring.rotation.y = px * 0.12;
    ring.rotation.x = py * 0.05;
    stations.forEach((st, i) => {
      const d = Math.abs(i - s), ang = (i - s) * Math.PI / 2;
      st.holder.position.set(Math.sin(ang) * R * 0.45, -(i - s) * (portrait ? 2.6 : 2.2), Math.cos(ang) * R);
      st.holder.rotation.y = ang * (portrait ? 0.6 : 1);
      const k = (1 - clamp(d) * 0.45) * (1 - clamp((d - 0.4) / 0.4));
      st.holder.scale.setScalar(Math.max(0.0001, k));
      st.holder.visible = k > 0.001;
      st.obj.rotation.y = (i - s) * 0.6 + Math.sin(t * 0.5 + i) * 0.08;
      st.obj.position.y = Math.sin(t * 0.9 + i * 1.7) * 0.08;
    });

    // camera: shift so the focal object sits right of the copy (desktop) or above it (mobile)
    const off = portrait ? 0 : Math.min(2.6, 1.0 + (camera.aspect - 1) * 1.6);
    const dist = portrait ? 13.5 : 9.2;
    camera.position.set(-off, portrait ? -1.6 : 0.4, R + dist);
    camera.lookAt(-off, portrait ? -1.75 : 0.1, R - 2);

    // Reach: waves pulse out of the megaphone
    const ud = reach.userData;
    ud.waves.forEach((w, k) => {
      const p = ((t * 0.55 + k / 3) % 1);
      w.position.copy(ud.waveOrigin).addScaledVector(tmp.set(0.85, 0.25, 0.45), p * 1.3);
      w.scale.setScalar(0.35 + p * 0.9);
      w.material.opacity = (1 - p) * 0.85;
    });
    ud.floaters.forEach((m, k) => { m.rotation.y = t * (0.8 + k * 0.3); m.position.y += Math.sin(t * 1.4 + k * 2) * 0.003; });

    // Engage: hearts float up from the post
    engage.userData.hearts.forEach(h => {
      const u = h.userData, p = (t * 0.22 + u.phase) % 1;
      h.position.set(u.x + Math.sin(p * 6 + u.wob) * 0.15, -1.1 + p * 3.1, u.z);
      h.scale.setScalar(u.s * Math.sin(Math.PI * p) * 1.4);
      h.rotation.y = Math.sin(t + u.wob) * 0.5;
    });
    engage.userData.bubbles.forEach((b, k) => { b.position.y += Math.sin(t * 1.6 + k * 2) * 0.004; b.rotation.z = Math.sin(t * 1.2 + k) * 0.06; });
    engage.userData.badge.scale.setScalar(1 + Math.max(0, Math.sin(t * 3)) * 0.18);

    // Convert: leads spiral down the funnel and come out as coins
    const cu = convert.userData;
    cu.pd.forEach((d, k) => {
      const p = (t * 0.16 + d.ph) % 1;
      let y = 2.1 - p * 3.6, r, sc = 1;
      if (y > 1.3) r = cu.rOf(1.3) * (0.6 + d.out * 0.4) + (y - 1.3) * 0.3;
      else if (y > -1.25) r = cu.rOf(y) * 0.72;
      else { r = 0.05; sc = clamp(1 - (-1.25 - y) / 0.5); }
      const a = d.a + p * d.spin;
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.scale.setScalar(sc * (p < 0.05 ? p / 0.05 : 1));
      dummy.rotation.set(a, a * 0.5, 0);
      dummy.updateMatrix();
      cu.parts.setMatrixAt(k, dummy.matrix);
      cu.parts.setColorAt(k, y < -0.6 ? cu.green : d.c);
    });
    cu.parts.instanceMatrix.needsUpdate = true; cu.parts.instanceColor.needsUpdate = true;
    cu.coins.forEach((c, k) => { c.rotation.y = t * 0.6 + k; });

    // Grow: bars rise and the trend arrow draws as Grow approaches the front
    const gu = grow.userData, gp = reduced ? (s > 2.5 ? 1 : 0) : clamp((s - 2.15) / 0.85);
    gu.bars.forEach((b, k) => { const local = clamp(gp * 1.4 - k * 0.1); b.scale.y = Math.max(0.04, b.userData.h * ease(local)); });
    const drawn = clamp((gp - 0.25) / 0.75);
    gu.tube.geometry.setDrawRange(0, Math.floor(gu.total * drawn / 3) * 3);
    gu.tube.visible = drawn > 0.01;
    const hp = Math.max(0.001, drawn);
    gu.head.position.copy(gu.curve.getPointAt(hp));
    gu.head.quaternion.setFromUnitVectors(up, gu.curve.getTangentAt(hp).normalize());
    gu.head.visible = drawn > 0.02;

    // Confetti drifts with scroll for depth
    confetti.children.forEach(m => {
      m.rotation.x += dt * m.userData.rs; m.rotation.y += dt * m.userData.rs * 0.7;
      m.position.y = m.userData.y0 + (prog - 0.5) * 6 * m.userData.depth;
    });
    confetti.rotation.y = -s * 0.35;

    renderer.render(scene, camera);
  }
  function loopStart() { if (running) return; running = true; clock.getDelta(); requestAnimationFrame(frame); }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) loopStart(); });

  section.classList.add('ready');
  return { renderer };
};
