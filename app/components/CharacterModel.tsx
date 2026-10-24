
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function CharacterModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera - Framed to show the FULL character from head to toe
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 1000);
    const initialAspect = width / height;
    if (initialAspect < 1) {
      camera.position.set(0, 0, 2.15 / Math.max(initialAspect, 0.7));
    } else {
      camera.position.set(0, 0, 2.15);
    }
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLightFront = new THREE.DirectionalLight(0xfff8ee, 2.4);
    dirLightFront.position.set(1.5, 2.5, 3);
    scene.add(dirLightFront);

    const dirLightBack = new THREE.DirectionalLight(0x75aaff, 1.9);
    dirLightBack.position.set(-2, 2.5, -2);
    scene.add(dirLightBack);

    const rimLight = new THREE.PointLight(0xffffff, 1.3, 10);
    rimLight.position.set(0, 1.8, -1);
    scene.add(rimLight);

    // Helper to calculate visible half-height of frustum at distance camera.position.z
    const getVisibleHalfHeight = (cam: THREE.PerspectiveCamera) => {
      const vFov = (cam.fov * Math.PI) / 180;
      return cam.position.z * Math.tan(vFov / 2);
    };

    // Character Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    let modelMesh: THREE.Object3D | null = null;
    let modelMinY = 0;

    // Load GLB
    const loader = new GLTFLoader();
    const modelUrl = "/3d-model/cartoon%20character%203d%20model.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        modelMesh = model;

        // Compute exact bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        modelMinY = box.min.y;

        // Center model geometry horizontally and in depth
        model.position.x = -center.x;
        model.position.z = -center.z;

        // Position feet precisely at the bottom edge of the camera view
        const visibleHalfHeight = getVisibleHalfHeight(camera);
        model.position.y = -modelMinY - visibleHalfHeight;

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.3, mat.roughness ?? 0.5);
              mat.metalness = Math.min(0.2, mat.metalness ?? 0.1);
              mat.needsUpdate = true;
            }
          }
        });

        characterGroup.add(model);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading 3D model:", error);
        setLoading(false);
      }
    );

    // Mouse coordinates in normalized device coords [-1, 1]
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0, z: 0 };
    const currentRotation = { x: 0, y: 0, z: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      // Normalize mouse across window: x in [-1, 1], y in [-1, 1]
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Target head & eyes look direction
      targetRotation.y = mouse.x * 0.48;
      targetRotation.x = -mouse.y * 0.22;
      targetRotation.z = -mouse.x * 0.05;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    // Responsive resize handler with portrait aspect preservation
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      if (aspect < 1) {
        camera.position.z = 2.15 / Math.max(aspect, 0.7);
      } else {
        camera.position.z = 2.15;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (modelMesh) {
        const visibleHalfHeight = getVisibleHalfHeight(camera);
        modelMesh.position.y = -modelMinY - visibleHalfHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with Visibility Caching
    let animId: number = 0;
    let isVisible = true;
    let running = true;
    const startTime = performance.now();

    const animate = () => {
      if (!running) return;
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth lerp damping towards target look direction
      const lerpSpeed = 0.08;
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpSpeed;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpSpeed;
      currentRotation.z += (targetRotation.z - currentRotation.z) * lerpSpeed;

      // Subtle breathing / idle tilt oscillation while feet stay planted at the bottom
      const idleTilt = Math.sin(elapsedTime * 1.2) * 0.008;

      characterGroup.rotation.x = currentRotation.x + idleTilt;
      characterGroup.rotation.y = currentRotation.y;
      characterGroup.rotation.z = currentRotation.z;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    // Pause Three.js rendering when scrolled away from Hero
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    animate();

    return () => {
      running = false;
      if (observer) observer.disconnect();
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-mono text-zinc-500 tracking-wider">
          <div className="w-8 h-8 rounded-full border border-zinc-700 border-t-white animate-spin mb-3" />
          <span>LOADING CHARACTER {loadProgress > 0 ? `${loadProgress}%` : ""}</span>
        </div>
      )}
    </div>
  );
}
