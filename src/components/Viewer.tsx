import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
export default function Viewer({
  id,
  finish,
  view = "interactive",
}: {
  id: string;
  finish: string;
  view?: string;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      setError(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Rotatable " + id + " concept model. Drag to rotate or use arrow keys.",
    );
    renderer.domElement.tabIndex = 0;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ebe8df");
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room).texture;
    scene.environment = environment;
    room.dispose();
    pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(5, 3.6, 5);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    const group = new THREE.Group();
    scene.add(group);
    const metal = new THREE.MeshStandardMaterial({
      color: finish === "Graphite" ? "#454849" : "#bfc2c5",
      metalness: 0.95,
      roughness: 0.32,
    });
    const black = new THREE.MeshStandardMaterial({
      color: "#111514",
      roughness: 0.35,
    });
    const glow = new THREE.MeshStandardMaterial({
      color: "#efbe72",
      emissive: "#eda343",
      emissiveIntensity: 1,
    });
    const dims =
      id === "core"
        ? [3.2, 0.65, 3.2]
        : id === "sense"
          ? [1.2, 1.2, 0.5]
          : id === "light"
            ? [1.8, 1.8, 0.4]
            : id === "air"
              ? [1.6, 2.3, 1.6]
              : [1.6, 0.7, 1.6];
    function mesh(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      pos = [0, 0, 0],
    ) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(...(pos as [number, number, number]));
      m.castShadow = true;
      m.receiveShadow = true;
      group.add(m);
      return m;
    }
    const body = mesh(
      id === "control"
        ? new THREE.CylinderGeometry(0.85, 0.85, 0.7, 96)
        : new RoundedBoxGeometry(
            dims[0],
            dims[1],
            dims[2],
            8,
            id === "core" ? 0.29 : 0.16,
          ),
      metal,
    );
    const ring = mesh(
      id === "control"
        ? new THREE.CylinderGeometry(0.855, 0.855, 0.035, 96)
        : new RoundedBoxGeometry(
            dims[0] * 0.98,
            0.035,
            dims[2] * 0.98,
            6,
            0.14,
          ),
      glow,
      [0, -dims[1] / 2 + 0.015, 0],
    );
    if (id === "sense" || id === "light" || id === "air") ring.visible = false;
    mesh(new THREE.SphereGeometry(0.035, 24, 24), black, [0, 0, dims[2] / 2]);
    const port = mesh(
      new RoundedBoxGeometry(0.15, 0.055, 0.02, 3, 0.02),
      black,
      [0, -0.1, -dims[2] / 2 - 0.005],
    );
    if (id === "air") {
      mesh(
        new RoundedBoxGeometry(0.48, 1.5, 0.035, 6, 0.2),
        black,
        [0, 0.18, 0.81],
      );
      for (let i = 0; i < 3; i++)
        mesh(new THREE.SphereGeometry(0.025, 12, 12), glow, [
          0,
          0.33 - i * 0.15,
          0.838,
        ]);
      for (let i = 0; i < 10; i++)
        mesh(new THREE.BoxGeometry(0.015, 0.005, 0.8), black, [
          -0.56 + i * 0.125,
          1.156,
          0,
        ]);
    }
    if (id === "sense") {
      mesh(new THREE.SphereGeometry(0.18, 32, 32), black, [0, 0, 0.24]);
      for (let i = 0; i < 4; i++)
        mesh(new THREE.BoxGeometry(0.17, 0.013, 0.015), black, [
          -0.28 + i * 0.19,
          -0.43,
          0.251,
        ]);
    }
    if (id === "light")
      mesh(
        new RoundedBoxGeometry(1.5, 1.5, 0.03, 6, 0.1),
        new THREE.MeshStandardMaterial({ color: "#eeeade", roughness: 0.4 }),
        [0, 0, 0.218],
      );
    if (id === "light")
      mesh(
        new RoundedBoxGeometry(0.22, 0.025, 0.018, 3, 0.01),
        glow,
        [0, -0.55, 0.241],
      );
    if (id === "control") {
      for (let i = 0; i < 100; i++) {
        const a = (i * Math.PI) / 50;
        const rib = mesh(new THREE.BoxGeometry(0.012, 0.5, 0.02), metal, [
          Math.cos(a) * 0.85,
          0,
          Math.sin(a) * 0.85,
        ]);
        rib.rotation.y = -a;
      }
    }
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "#e8e4d8", roughness: 0.85 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -dims[1] / 2 - 0.02;
    ground.receiveShadow = true;
    scene.add(ground);
    scene.add(new THREE.HemisphereLight("#fff5e1", "#a8a594", 2));
    const key = new THREE.DirectionalLight("#fff0d4", 4);
    key.position.set(-3, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.bias = -0.001;
    key.shadow.normalBias = 0.03;
    scene.add(key);
    const fill = new THREE.DirectionalLight("#e6edf6", 2);
    fill.position.set(4, 2, -4);
    scene.add(fill);
    if (id !== "core") camera.position.multiplyScalar(0.65);
    if (view === "rear")
      camera.position.set(-4, 2.8, -4).multiplyScalar(id === "core" ? 1 : 0.7);
    if (view === "macro") {
      camera.position.set(dims[0] * 0.8, dims[1] + 0.8, dims[2] * 1.1);
      controls.target.set(dims[0] * 0.23, 0, dims[2] * 0.25);
      camera.fov = 26;
    }
    if (view === "exploded") {
      body.position.y += 1.2;
      ring.position.y -= 0.25;
      port.visible = false;
      mesh(
        new RoundedBoxGeometry(dims[0] * 0.8, 0.06, dims[2] * 0.8, 4, 0.08),
        new THREE.MeshStandardMaterial({
          color: "#384e41",
          metalness: 0.2,
          roughness: 0.6,
        }),
        [0, 0.5, 0],
      );
      mesh(
        new THREE.BoxGeometry(dims[0] * 0.2, 0.13, dims[2] * 0.2),
        black,
        [0, 0.6, 0],
      );
      ground.position.y -= 0.8;
      controls.target.y = 0.7;
      camera.position.multiplyScalar(1.3);
    }
    if (view === "lifestyle") {
      ground.material = new THREE.MeshStandardMaterial({
        color: "#a58a68",
        roughness: 0.9,
      });
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 15),
        new THREE.MeshStandardMaterial({ color: "#dad5c5", roughness: 1 }),
      );
      wall.position.set(0, 5, -3);
      scene.add(wall);
      const vase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.22, 0.95, 40),
        new THREE.MeshStandardMaterial({ color: "#c3b7a1", roughness: 0.8 }),
      );
      vase.position.set(-2.3, -dims[1] / 2 + 0.47, -1.2);
      vase.castShadow = true;
      scene.add(vase);
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.018, 1.3, 8),
        new THREE.MeshStandardMaterial({ color: "#6b7051" }),
      );
      stem.position.set(-2.3, 1, -1.2);
      scene.add(stem);
      for (let i = 0; i < 4; i++) {
        const leaf = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 20, 12),
          new THREE.MeshStandardMaterial({ color: "#697154", roughness: 0.9 }),
        );
        leaf.scale.set(1, 0.18, 2);
        leaf.position.set(-2.3 + (i % 2 ? 0.2 : -0.2), 0.8 + i * 0.2, -1.2);
        leaf.rotation.z = i % 2 ? 0.5 : -0.5;
        scene.add(leaf);
      }
      camera.position.set(5, 3, 6).multiplyScalar(id === "core" ? 1 : 0.7);
    }
    controls.update();
    const render = () => {
      renderer.render(scene, camera);
      host.dataset.ready = "true";
    };
    const resize = () => {
      const width = host.clientWidth,
        height = host.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    controls.addEventListener("change", render);
    const keydown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        group.rotation.y +=
          e.key === "ArrowLeft" ? -0.15 : e.key === "ArrowRight" ? 0.15 : 0;
        group.rotation.x +=
          e.key === "ArrowUp" ? -0.1 : e.key === "ArrowDown" ? 0.1 : 0;
        render();
      }
    };
    renderer.domElement.addEventListener("keydown", keydown);
    resize();
    return () => {
      ro.disconnect();
      controls.dispose();
      environment.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.domElement.remove();
    };
  }, [id, finish, view]);
  return (
    <div className="model-mount" ref={mount}>
      {error && (
        <p>
          3D is unavailable in this browser. Explore the concept image gallery
          below.
        </p>
      )}
    </div>
  );
}
