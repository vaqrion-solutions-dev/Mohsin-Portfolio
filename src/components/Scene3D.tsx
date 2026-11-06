
import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ==========================================
// LEFT-SIDE GLOWING PARTICLES
// ==========================================

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particleCount = viewport.width < 7 ? 35 : 75;
  

  const { geometry, base, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const original = new Float32Array(particleCount * 3);
    const offsets = new Float32Array(particleCount);
    const velocity = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;

      // Left-side background only
      const x = -viewport.width * (0.12 + Math.random() * 0.34);
      const y = (Math.random() - 0.5) * viewport.height * 0.85;
      const z = -1.5 - Math.random() * 2;

      positions[index] = x;
      positions[index + 1] = y;
      positions[index + 2] = z;

      original[index] = x;
      original[index + 1] = y;
      original[index + 2] = z;

      offsets[i] = Math.random() * Math.PI * 2;
      velocity[i] = 0.18 + Math.random() * 0.3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return {
      geometry: geo,
      base: original,
      phases: offsets,
      speeds: velocity,
    };
  }, [particleCount, viewport.width, viewport.height]);

  useFrame((state) => {
    const attribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;

      positions[index] =
        base[index] + Math.sin(time * 0.25 + phases[i]) * 0.055;

      positions[index + 1] =
        base[index + 1] +
        Math.sin(time * speeds[i] + phases[i]) * 0.13;
    }

    attribute.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(time * 0.1) * 0.008;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
  color="#55dfff"
  size={0.085}
  transparent
  opacity={1}
  sizeAttenuation
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>
    </points>
  );
}

// ==========================================
// FLOATING CRYSTAL
// ==========================================

interface FloatingCrystalProps {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
}

function FloatingCrystal({
  position,
  size,
  color,
  speed,
}: FloatingCrystalProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.elapsedTime;

    group.rotation.y += delta * speed;
    group.rotation.x += delta * speed * 0.4;
    group.rotation.z = Math.sin(time * 0.35 + position[0]) * 0.12;

    group.position.y =
      position[1] +
      Math.sin(time * 0.55 + position[0]) * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Transparent outer crystal */}
      <mesh scale={1.15}>
        <icosahedronGeometry args={[size, 0]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Faceted glass body */}
      <mesh>
        <icosahedronGeometry args={[size, 0]} />
        <meshPhysicalMaterial
  color="#153c70"
  emissive={color}
  emissiveIntensity={0.75}
  metalness={0.55}
  roughness={0.12}
  transparent
  opacity={1}
  flatShading
  clearcoat={1}
  clearcoatRoughness={0.08}
/>
      </mesh>

      {/* Inner crystal */}
      <mesh scale={0.48}>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>

      {/* Bright crystal edges */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.IcosahedronGeometry(size, 0)]}
        />
        <lineBasicMaterial
  color={color}
  transparent
  opacity={1}
  blending={THREE.AdditiveBlending}
/>
      </lineSegments>

      {/* White inner highlights */}
      <lineSegments scale={0.53}>
        <edgesGeometry
          args={[new THREE.OctahedronGeometry(size, 0)]}
        />
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.55}
        />
      </lineSegments>

      <pointLight
        color={color}
        intensity={0.75}
        distance={size * 7}
      />
    </group>
  );
}

// ==========================================
// SCENE CONTENT — LEFT SIDE ONLY
// ==========================================

function SceneContent() {
  const { viewport } = useThree();

  const mobile = viewport.width < 7;
  const scale = mobile ? 0.65 : 1;

  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight
        position={[-viewport.width * 0.3, 1.5, 1]}
        color="#258dff"
        intensity={1.4}
        distance={7}
      />

      <pointLight
        position={[-viewport.width * 0.4, -2, 1]}
        color="#914bff"
        intensity={1.2}
        distance={6}
      />

      <ParticleField />

      {/* Upper-left cyan crystal */}
      <FloatingCrystal
        position={[
          -viewport.width * 0.43,
          viewport.height * 0.34,
          -1.3,
        ]}
        size={0.34 * scale}
        color="#31d9ff"
        speed={0.25}
      />

      {/* Left-middle violet crystal */}
      <FloatingCrystal
        position={[
          -viewport.width * 0.46,
          -viewport.height * 0.08,
          -1.5,
        ]}
        size={0.27 * scale}
        color="#a36bff"
        speed={0.34}
      />

      {/* Lower-left blue crystal */}
      <FloatingCrystal
        position={[
          -viewport.width * 0.32,
          -viewport.height * 0.39,
          -1,
        ]}
        size={0.2 * scale}
        color="#39aaff"
        speed={0.42}
      />

      {/* Small upper-left violet crystal */}
      <FloatingCrystal
        position={[
          -viewport.width * 0.18,
          viewport.height * 0.12,
          -2,
        ]}
        size={0.14 * scale}
        color="#bd79ff"
        speed={0.46}
      />
    </>
  );
}

// ==========================================
// MAIN 3D SCENE
// ==========================================

export default function Scene3D() {
  return (
    <div
      className="scene-3d hero-particle-layer"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
