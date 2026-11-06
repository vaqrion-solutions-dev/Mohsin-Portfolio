import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating skill orbs
function SkillOrb({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.5;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.4;
  const z = Math.sin(angle) * 0.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const currentAngle = angle + t * 0.2;
    meshRef.current.position.x = Math.cos(currentAngle) * radius;
    meshRef.current.position.z = Math.sin(currentAngle) * 0.8;
    meshRef.current.position.y = y + Math.sin(t + index) * 0.1;
    meshRef.current.rotation.y = t * 0.5;
  });

  const colors = ['#4f8ef7', '#7c3aed', '#22d3ee', '#10b981', '#f59e0b'];
  const color = colors[index % colors.length];

  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.7} />
    </mesh>
  );
}

// Rotating ring scene
function RingScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <SkillOrb key={i} index={i} total={12} />
      ))}
      <mesh>
        <torusGeometry args={[2.5, 0.01, 16, 200]} />
        <meshBasicMaterial color="#4f8ef7" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

const SkillsCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4f8ef7" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#7c3aed" />
      <RingScene />
    </Canvas>
  );
};

export default SkillsCanvas;
