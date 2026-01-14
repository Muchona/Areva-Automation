import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface PartSpecs {
  key: string;
  name: string;
  specs: string[];
  description: string;
}

const PART_METADATA: Record<string, PartSpecs> = {
  chassis: {
    key: "chassis",
    name: "Aeronautical Grade Chassis",
    description: "The structural foundation of the Taxi™, engineered for high-density load bearing and millimetre precision alignment.",
    specs: ["Load Capacity: 1,500kg", "Material: High-Tensile Slate Steel", "Zero-Flex Geometry"]
  },
  topPlate: {
    key: "topPlate",
    name: "Power & Logic Module",
    description: "The primary control interface housing the WCS integration board and power distribution systems.",
    specs: ["Input Voltage: 48V DC", "IP65 Rated Housing", "Integrated Cooling"]
  },
  wheel: {
    key: "wheel",
    name: "4-Way Omni-Drive System",
    description: "Proprietary drive units allowing instant 90-degree vector changes without turning cycles.",
    specs: ["Max Speed: 3.0 m/s", "High-Grip Polyurethane", "Precision Encoder Feedback"]
  },
  pallet: {
    key: "pallet",
    name: "Standardized Cargo Unit",
    description: "The payload module. Areva systems handle Euro, UK, and bespoke pallet footprints with zero-slip transit.",
    specs: ["Max Payload: 1,500kg", "Slip-Resistant Surface", "Auto-Centering Logic"]
  }
};

interface Taxi3DProps {
  progress?: number; // 0 (exploded) to 1 (assembled)
}

const Taxi3D: React.FC<Taxi3DProps> = ({ progress = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const [selectedPart, setSelectedPart] = useState<PartSpecs | null>(null);
  const progressRef = useRef(progress);
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    gsap.to(progressRef, {
      current: progress,
      duration: 0.35,
      ease: "power2.out"
    });
  }, [progress]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(24, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); 
    containerRef.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 12, 5);
    scene.add(keyLight);

    const spotLight = new THREE.SpotLight(0xA3E635, 450);
    spotLight.position.set(8, 15, 8);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.6;
    scene.add(spotLight);

    const blueRim = new THREE.PointLight(0x3b82f6, 160);
    blueRim.position.set(-10, -8, -10);
    scene.add(blueRim);

    const brandRedMat = new THREE.MeshStandardMaterial({ 
      color: 0xA3E635, metalness: 0.85, roughness: 0.15, emissive: 0xA3E635, emissiveIntensity: 0.08
    });
    const onyxMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, metalness: 1, roughness: 0.12, emissive: 0x3b82f6, emissiveIntensity: 0
    });
    const tireMat = new THREE.MeshStandardMaterial({ 
      color: 0x020617, roughness: 0.95
    });
    const woodMat = new THREE.MeshStandardMaterial({ 
      color: 0x451a03, roughness: 0.9, metalness: 0.02
    });

    const taxiGroup = new THREE.Group();
    scene.add(taxiGroup);

    const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.22, 2.2), onyxMat);
    chassis.userData = { 
      partKey: 'chassis', 
      targetPos: new THREE.Vector3(0, 0.11, 0),
      explodedPos: new THREE.Vector3(0, -0.75, 0)
    };
    taxiGroup.add(chassis);

    const topPlate = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.08, 2.3), brandRedMat);
    topPlate.userData = { 
      partKey: 'topPlate',
      targetPos: new THREE.Vector3(0, 0.26, 0),
      explodedPos: new THREE.Vector3(0, 1.5, 0)
    };
    taxiGroup.add(topPlate);

    const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 32);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelPositions = [
      {x:-1.1, z:0.7, ex:-1.25, ez:1}, {x:1.1, z:0.7, ex:1.25, ez:1}, 
      {x:-1.1, z:-0.7, ex:-1.25, ez:-1}, {x:1.1, z:-0.7, ex:1.25, ez:-1}
    ];
    wheelPositions.forEach((pos) => {
      const w = new THREE.Mesh(wheelGeo, tireMat);
      w.userData = { 
        partKey: 'wheel',
        targetPos: new THREE.Vector3(pos.x, 0.1, pos.z),
        explodedPos: new THREE.Vector3(pos.ex, 0, pos.ez)
      };
      taxiGroup.add(w);
    });

    const pallet = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 2.4), woodMat);
    pallet.userData = { 
      partKey: 'pallet',
      targetPos: new THREE.Vector3(0, 0.5, 0),
      explodedPos: new THREE.Vector3(0, 3, 0)
    };
    taxiGroup.add(pallet);

    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0.15, 0);

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(taxiGroup.children, true);
      if (intersects.length > 0) {
        const key = intersects[0].object.userData.partKey;
        if (key && PART_METADATA[key]) {
          setSelectedPart(PART_METADATA[key]);
          gsap.to(intersects[0].object.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
        }
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onClick);

    const animate = () => {
      const p = progressRef.current;
      const elapsedTime = clock.current.getElapsedTime();
      const pulse = 0.3 + 0.3 * Math.sin(elapsedTime * 5);
      
      taxiGroup.children.forEach((obj: THREE.Object3D) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (obj.userData.targetPos && obj.userData.explodedPos) {
          obj.position.lerpVectors(obj.userData.explodedPos, obj.userData.targetPos, p);
        }
        if (selectedPart && obj.userData.partKey === selectedPart.key) {
          mat.emissiveIntensity = 0.5 + pulse;
        } else {
          mat.emissiveIntensity = obj.userData.partKey === 'topPlate' ? 0.05 : 0;
        }
      });

      taxiGroup.rotation.y += 0.0008;
      taxiGroup.rotation.x = THREE.MathUtils.lerp(taxiGroup.rotation.x, mouse.current.y * 0.06, 0.05);
      taxiGroup.rotation.z = THREE.MathUtils.lerp(taxiGroup.rotation.z, -mouse.current.x * 0.06, 0.05);

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onClick);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [selectedPart]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-crosshair" style={{ minHeight: '500px' }} />
      
      {progress > 0.8 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none text-center animate-in fade-in duration-1000">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
            Interactive Hardware Inspection Active
          </p>
        </div>
      )}

      {selectedPart && (
        <div className="absolute top-2 right-2 w-72 z-50 bg-slate-900/95 backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-black text-white uppercase italic">{selectedPart.name}</h3>
            <button onClick={() => setSelectedPart(null)} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">{selectedPart.description}</p>
          <div className="space-y-2">
            {selectedPart.specs.map((s, i) => (
              <div key={i} className="flex items-center space-x-2 text-[9px] font-black uppercase text-brandRed">
                <div className="w-1 h-1 rounded-full bg-brandRed" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxi3D;