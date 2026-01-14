import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Racking3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xA3E635, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create Racking Grid
    const railMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
    const palletMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const rackingGroup = new THREE.Group();

    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        // Vertical beams
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 8, 0.1), railMat);
        beam.position.set(x * 2, 0, z * 2);
        rackingGroup.add(beam);

        // Horizontal rails
        if (x < 3) {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, 0.05), railMat);
          rail.position.set(x * 2 + 1, 0, z * 2);
          rackingGroup.add(rail);
        }

        // Dummy Pallets
        if (Math.random() > 0.3) {
          const pallet = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.8), palletMat);
          pallet.position.set(x * 2, (Math.floor(Math.random() * 4) - 2) * 2, z * 2);
          rackingGroup.add(pallet);
        }
      }
    }
    scene.add(rackingGroup);

    // Animated Shuttle (The Taxi)
    const shuttle = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 1), new THREE.MeshStandardMaterial({ color: 0xA3E635, emissive: 0xA3E635, emissiveIntensity: 0.5 }));
    scene.add(shuttle);

    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      shuttle.position.x = Math.sin(time) * 5;
      shuttle.position.z = Math.cos(time * 0.5) * 5;
      shuttle.position.y = Math.sin(time * 0.2) * 2;
      
      rackingGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '500px' }} />;
};

export default Racking3D;