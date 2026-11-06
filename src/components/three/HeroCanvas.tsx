
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingOrb({
  position,
  color,
  size = 1
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

// Particle field
function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();

      if (colorChoice < 0.5) {
        colors[i * 3] = 0.31;
        colors[i * 3 + 1] = 0.56;
        colors[i * 3 + 2] = 0.97;
      } else {
        colors[i * 3] = 0.13;
        colors[i * 3 + 1] = 0.83;
        colors[i * 3 + 2] = 0.93;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.015;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Mouse-responsive camera controller
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.8 - target.current.x) * 0.04;
    target.current.y += (mouse.current.y * 0.5 - target.current.y) * 0.04;

    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Torus ring
function TorusRing({
  position,
  color,
  rotation
}: {
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[1.5, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

// Icosahedron
function IcoMesh({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#4f8ef7"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

interface HeroCanvasProps {
  isMobile?: boolean;
}

const HeroCanvas: React.FC<HeroCanvasProps> = ({ isMobile = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f8ef7" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#7c3aed" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 1000 : 3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Particles */}
      {!isMobile && <ParticleField />}

      {/* Geometric objects */}
      <FloatingOrb position={[3.5, 0, -2]} color="#4f8ef7" size={1.8} />
      <FloatingOrb position={[-3.5, 1, -3]} color="#7c3aed" size={1.2} />
      <FloatingOrb position={[0, -2.5, -4]} color="#22d3ee" size={1} />

      {!isMobile && (
        <>
          <IcoMesh position={[3, 2, -1]} />
          <TorusRing
            position={[-2, -1, -2]}
            color="#4f8ef7"
            rotation={[0.5, 0.3, 0]}
          />
          <TorusRing
            position={[2, -1.5, -3]}
            color="#22d3ee"
            rotation={[0.8, 0, 0.3]}
          />
          <TorusRing
            position={[0, 2, -2]}
            color="#7c3aed"
            rotation={[0, 0.5, 0.5]}
          />
        </>
      )}

      {/* Mouse controller */}
      <CameraController />

      {/* Fog */}
      <fog attach="fog" args={['#080c14', 15, 40]} />
    </Canvas>
  );
};

export default HeroCanvas;
