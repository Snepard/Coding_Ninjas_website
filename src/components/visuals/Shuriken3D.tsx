"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

type ShurikenProps = {
  className?: string;
};

const createShurikenGeometry = () => {
  const shape = new THREE.Shape();
  const outerRadius = 1;
  const innerRadius = 0.32;
  const points = 4;

  for (let i = 0; i < points * 2; i += 1) {
    const angle = (i / (points * 2)) * Math.PI * 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  const extrudeSettings = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.04,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

const ShurikenMesh = () => {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createShurikenGeometry(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ref.current) {
      ref.current.rotation.z += 0.01;
      ref.current.rotation.y = Math.sin(t * 0.6) * 0.4;
    }

    if (groupRef.current) {
      const { x, y } = state.pointer;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        y * 0.3,
        0.08,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -x * 0.3,
        0.08,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float floatIntensity={0.8} speed={1.6} rotationIntensity={0.4}>
        <mesh geometry={geometry} ref={ref} castShadow receiveShadow>
          <meshStandardMaterial
            color="#FF6D00"
            metalness={0.85}
            roughness={0.25}
            envMapIntensity={1.3}
          />
        </mesh>
        <mesh position={[0, 0, -0.08]} scale={0.45}>
          <cylinderGeometry args={[0.08, 0.08, 0.18, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
};

export const Shuriken3D = ({ className }: ShurikenProps) => (
  <div className={className}>
    <Canvas
      shadows
      camera={{ position: [0, 0, 3.6], fov: 40 }}
      aria-label="Animated shuriken representing the Coding Ninjas"
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 4, 5]}
          intensity={0.9}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-3, -2, -4]}
          intensity={0.45}
          color="#FF6D00"
        />
        <ShurikenMesh />
      </Suspense>
    </Canvas>
  </div>
);

export default Shuriken3D;
