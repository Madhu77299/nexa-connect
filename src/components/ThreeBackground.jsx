import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn("WebGL not supported. Fallback active.");
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create custom N geometry
    const shape = new THREE.Shape();
    // Coordinates to build a stylized N block
    shape.moveTo(-1.5, -2);
    shape.lineTo(-0.7, -2);
    shape.lineTo(-0.7, 1);
    shape.lineTo(0.7, -2);
    shape.lineTo(1.5, -2);
    shape.lineTo(1.5, 2);
    shape.lineTo(0.7, 2);
    shape.lineTo(0.7, -1);
    shape.lineTo(-0.7, 2);
    shape.lineTo(-1.5, 2);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Materials - Sleek Metallic Matte finish
    const material = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Royal Blue accent
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true
    });

    const sculptureMesh = new THREE.Mesh(geometry, material);
    scene.add(sculptureMesh);

    // Add elegant wireframe overlay
    const wireframeGeom = new THREE.EdgesGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ 
      color: 0xf97316, // Warm Coral wireframe accent
      linewidth: 1,
      transparent: true,
      opacity: 0.4
    });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
    sculptureMesh.add(wireframe);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 15, 30);
    blueLight.position.set(5, 5, 6);
    scene.add(blueLight);

    const coralLight = new THREE.PointLight(0xf97316, 12, 30);
    coralLight.position.set(-5, -5, 6);
    scene.add(coralLight);

    const topWhiteLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topWhiteLight.position.set(0, 8, 2);
    scene.add(topWhiteLight);

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.001;
      targetY = (e.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Damp mouse coordinates
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Slow rotation + mouse response
      sculptureMesh.rotation.y = Date.now() * 0.0006 + mouseX * 1.5;
      sculptureMesh.rotation.x = Date.now() * 0.0003 + mouseY * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 canvas-3d-interactive opacity-90 dark:opacity-100" 
    />
  );
}
