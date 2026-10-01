import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

export default function ThreeHologramEffects() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Check WebGL availability
    let gl = null;
    try {
      const testCanvas = document.createElement('canvas');
      gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // 1. Three.js Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);
    camera.updateMatrixWorld(true);

    // 2. High Performance Antialiased WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      
      // Synchronize canvas opacity with page rendering to prevent popping in first
      renderer.domElement.style.opacity = '0';
      renderer.domElement.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      container.appendChild(renderer.domElement);

      requestAnimationFrame(() => {
        if (renderer.domElement) {
          renderer.domElement.style.opacity = '1';
        }
      });
    } catch (e) {
      console.warn('WebGLRenderer creation failed:', e);
      return;
    }

    // 3. Central Anchor Group that aligns with the 3D Glass Orb
    const hubAnchor = new THREE.Group();
    scene.add(hubAnchor);

    // Helper to calculate exact 3D world position of the orb
    const updateHubPosition = () => {
      camera.updateMatrixWorld(true);
      const isDesktop = width >= 1024;
      // In 1376x768 reference, orb center is ~68.9% X, 46.2% Y
      const targetPercentX = isDesktop ? 0.689 : 0.5;
      const targetPercentY = isDesktop ? 0.462 : 0.48;

      const ndcX = targetPercentX * 2 - 1;
      const ndcY = -(targetPercentY * 2 - 1);

      // Convert NDC to 3D world coordinates at z = 0
      const v = new THREE.Vector3(ndcX, ndcY, 0.5);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      hubAnchor.position.set(pos.x, pos.y, 0);

      // Scale effects slightly based on screen width
      const scaleFactor = isDesktop ? Math.min(1.2, Math.max(0.85, width / 1400)) : 0.75;
      hubAnchor.scale.set(scaleFactor, scaleFactor, scaleFactor);
    };

    updateHubPosition();

    // Circular particle texture generator
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTex = createParticleTexture();

    // 4. Create Orbital Rings with Sparkling Particle Streams
    const createOrbitalRing = (radius, count, colorHex, tiltX, tiltY, tiltZ) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.set(tiltX, tiltY, tiltZ);

      // Thin luminous path ring
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.96, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(120);
      const pathGeo = new THREE.BufferGeometry().setFromPoints(points);
      const pathMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: isDarkRef.current ? 0.45 : 0.35,
        blending: THREE.AdditiveBlending
      });
      const pathLine = new THREE.Line(pathGeo, pathMat);
      ringGroup.add(pathLine);

      // Particles orbiting along the ring
      const particlePositions = new Float32Array(count * 3);
      const particleAngles = new Float32Array(count);
      const particleSpeeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.1;
        particleAngles[i] = angle;
        particleSpeeds[i] = 0.4 + Math.random() * 0.6;

        particlePositions[i * 3] = Math.cos(angle) * radius;
        particlePositions[i * 3 + 1] = Math.sin(angle) * (radius * 0.96);
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const pMat = new THREE.PointsMaterial({
        color: colorHex,
        size: isDarkRef.current ? 0.22 : 0.18,
        map: particleTex,
        transparent: true,
        opacity: isDarkRef.current ? 0.9 : 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const pPoints = new THREE.Points(pGeo, pMat);
      ringGroup.add(pPoints);

      // Glowing micro-satellite node
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const satellite = new THREE.Mesh(satGeo, satMat);
      ringGroup.add(satellite);

      hubAnchor.add(ringGroup);

      return {
        group: ringGroup,
        radius,
        pGeo,
        pMat,
        pathGeo,
        pathMat,
        satGeo,
        satMat,
        particleAngles,
        particleSpeeds,
        satellite,
        baseColor: colorHex
      };
    };

    // 3 intersecting orbital rings (Electric Cyan, Emerald Lime, Royal Azure)
    const ring1 = createOrbitalRing(3.2, 36, 0x00d2ff, Math.PI / 3.2, 0.35, 0);
    const ring2 = createOrbitalRing(3.6, 42, 0x10b981, -Math.PI / 3.5, 0.8, Math.PI / 6);
    const ring3 = createOrbitalRing(4.0, 48, 0x0055ff, 0.2, -Math.PI / 2.8, -Math.PI / 5);
    const rings = [ring1, ring2, ring3]; // Defined in outer scope!

    // 5. Concentric Pulsing Holographic Wave Rings (Blue & Emerald)
    const waveCount = 2;
    const waveColors = [0x0055ff, 0x10b981];
    const waves = [];
    for (let i = 0; i < waveCount; i++) {
      const waveGeo = new THREE.RingGeometry(2.2, 2.32, 64);
      const waveMat = new THREE.MeshBasicMaterial({
        color: waveColors[i % waveColors.length],
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      waveMesh.rotation.x = Math.PI / 2.2;
      hubAnchor.add(waveMesh);
      waves.push({
        mesh: waveMesh,
        geo: waveGeo,
        mat: waveMat,
        progress: i / waveCount
      });
    }

    // 6. Ambient Constellation / Floating Cyber Dust across the Terrace
    const dustCount = 180;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = [];

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 26;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: 0.003 + Math.random() * 0.005, // gentle upward drift
        z: (Math.random() - 0.5) * 0.003
      });
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: isDarkRef.current ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 7. Mouse Interaction & Inertial Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Animation Loop
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = lastTime;

    const speedMult = [1.0, -0.85, 0.7];

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const currentTime = performance.now();
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const elapsedTime = (currentTime - startTime) / 1000;

      // Mouse lerp for silky smooth 60fps response
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Parallax tilt on scene camera
      camera.position.x = currentMouseX * 1.2;
      camera.position.y = currentMouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Rotate orbital rings
      rings.forEach((ring, idx) => {
        ring.group.rotation.z += delta * 0.25 * speedMult[idx];

        // Animate particles along the orbit
        const posAttr = ring.pGeo.attributes.position;
        const count = ring.particleAngles.length;

        for (let i = 0; i < count; i++) {
          ring.particleAngles[i] += delta * 0.6 * ring.particleSpeeds[i];
          const a = ring.particleAngles[i];
          posAttr.array[i * 3] = Math.cos(a) * ring.radius;
          posAttr.array[i * 3 + 1] = Math.sin(a) * (ring.radius * 0.96);
        }
        posAttr.needsUpdate = true;

        // Animate satellite position
        const satAngle = elapsedTime * 0.8 * speedMult[idx];
        ring.satellite.position.set(
          Math.cos(satAngle) * ring.radius,
          Math.sin(satAngle) * (ring.radius * 0.96),
          Math.sin(satAngle * 2) * 0.2
        );
      });

      // Animate pulsing waves
      waves.forEach((wave) => {
        wave.progress = (wave.progress + delta * 0.35) % 1.0;
        const currentScale = 1.0 + wave.progress * 1.1;
        wave.mesh.scale.set(currentScale, currentScale, currentScale);

        // Fade in then out
        const alpha = Math.sin(wave.progress * Math.PI) * (isDarkRef.current ? 0.35 : 0.22);
        wave.mat.opacity = Math.max(0, alpha);
      });

      // Animate ambient cyber dust particles
      const dustPos = dustGeo.attributes.position;
      for (let i = 0; i < dustCount; i++) {
        dustPos.array[i * 3] += dustVelocities[i].x;
        dustPos.array[i * 3 + 1] += dustVelocities[i].y;
        dustPos.array[i * 3 + 2] += dustVelocities[i].z;

        // Reset if drifted too high
        if (dustPos.array[i * 3 + 1] > 8) {
          dustPos.array[i * 3 + 1] = -7;
          dustPos.array[i * 3] = (Math.random() - 0.5) * 26;
        }
      }
      dustPos.needsUpdate = true;

      // Theme dynamic updates for all rings and dust
      const targetDustOpacity = isDarkRef.current ? 0.7 : 0.4;
      dustMat.opacity = THREE.MathUtils.lerp(dustMat.opacity, targetDustOpacity, 0.05);

      const targetRingOpacity = isDarkRef.current ? 0.45 : 0.32;
      const targetParticleOpacity = isDarkRef.current ? 0.9 : 0.72;
      rings.forEach((ring) => {
        ring.pathMat.opacity = THREE.MathUtils.lerp(ring.pathMat.opacity, targetRingOpacity, 0.05);
        ring.pMat.opacity = THREE.MathUtils.lerp(ring.pMat.opacity, targetParticleOpacity, 0.05);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateHubPosition();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. Memory Clean Up on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      if (rings) {
        rings.forEach((r) => {
          r.pGeo?.dispose();
          r.pMat?.dispose();
          r.pathGeo?.dispose();
          r.pathMat?.dispose();
          r.satGeo?.dispose();
          r.satMat?.dispose();
        });
      }

      if (waves) {
        waves.forEach((w) => {
          w.geo?.dispose();
          w.mat?.dispose();
        });
      }

      dustGeo?.dispose();
      dustMat?.dispose();
      particleTex?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
