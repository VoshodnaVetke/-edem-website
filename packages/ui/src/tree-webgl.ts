import * as THREE from "three";
import { treeSvg } from "./tree-svg";
/** Loaded only for renderer="webgl"; owns and disposes every GPU/DOM resource. */
export async function mountTree(mount: HTMLDivElement, signal: AbortSignal) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const url = URL.createObjectURL(
    new Blob([treeSvg], { type: "image/svg+xml" }),
  );
  let texture: THREE.Texture;
  try {
    texture = await new THREE.TextureLoader().loadAsync(url);
  } catch (error) {
    geometry.dispose();
    renderer.dispose();
    throw error;
  } finally {
    URL.revokeObjectURL(url);
  }
  texture.colorSpace = THREE.SRGBColorSpace;
  const definitions = [
    {
      z: -0.9,
      opacity: 0.009,
      color: 0xbc5cff,
      x: -0.06,
      y: 0.035,
      scale: 1.07,
    },
    {
      z: -0.5,
      opacity: 0.0115,
      color: 0x25f4ff,
      x: 0.04,
      y: -0.02,
      scale: 1.035,
    },
    { z: 0, opacity: 0.0295, color: 0xffffff, x: 0, y: 0, scale: 1 },
  ];
  const planes = definitions.map((d) => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: d.color,
      transparent: true,
      opacity: d.opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = d.z;
    scene.add(mesh);
    return mesh;
  });
  let raf = 0,
    disposed = false,
    x = 0,
    y = 0,
    tx = 0,
    ty = 0;
  const parent = mount.parentElement;
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    parent?.removeEventListener("pointermove", pointer);
    geometry.dispose();
    texture.dispose();
    planes.forEach((m) => m.material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    mount.dataset.ready = "false";
  }
  function resize() {
    const { width, height } = mount.getBoundingClientRect();
    const w = Math.max(width, 1),
      h = Math.max(height, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.left = -5 * aspect;
    camera.right = 5 * aspect;
    camera.top = 5;
    camera.bottom = -5;
    camera.updateProjectionMatrix();
    const bw = 10 * aspect * (w < 860 ? 2.65 : 1.85);
    planes.forEach((m, i) =>
      m.scale.set(
        bw * definitions[i].scale,
        ((bw * 1555) / 2110) * definitions[i].scale,
        1,
      ),
    );
  }
  function pointer(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = mount.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;
    ty = (e.clientY - r.top) / r.height - 0.5;
  }
  function frame() {
    if (disposed || signal.aborted || document.hidden) return;
    const breathe = Math.sin(performance.now() / 11500);
    x += (tx - x) * 0.008;
    y += (ty - y) * 0.008;
    planes.forEach((m, i) => {
      const d = definitions[i];
      m.position.x =
        d.x +
        x * (0.12 + (i / 2) * 0.18) +
        breathe * (i === 0 ? -0.012 : i === 1 ? 0.009 : 0);
      m.position.y =
        d.y - y * (0.1 + (i / 2) * 0.14) + breathe * (i === 0 ? 0.006 : 0);
      m.material.opacity = d.opacity * (1 + breathe * (i === 2 ? 0.03 : 0.09));
    });
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function visibility() {
    cancelAnimationFrame(raf);
    if (!document.hidden) frame();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);
  if (signal.aborted) {
    dispose();
    return dispose;
  }
  mount.append(renderer.domElement);
  mount.dataset.ready = "true";
  resize();
  document.addEventListener("visibilitychange", visibility);
  parent?.addEventListener("pointermove", pointer);
  frame();
  return dispose;
}
