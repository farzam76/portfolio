import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

export const AnimatedSphere: React.FC<AnimatedSphereProps> = ({
  position = [0, 0, 0],
  scale = 2.4,
  color = "#da4ea2",
  distort = 0.5,
  speed = 2,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position tracking
  const { viewport } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Dynamic floating animation
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3 + Math.sin(t * 0.3) * 0.1;

      // Smooth rotation with mouse influence
      meshRef.current.rotation.x = t * 0.1 + mousePosition.current.y * 0.5;
      meshRef.current.rotation.y = t * 0.15 + mousePosition.current.x * 0.5;

      // Pulsing scale effect
      const pulseScale = 1 + Math.sin(t * 0.8) * 0.05;
      meshRef.current.scale.setScalar(scale * pulseScale * (hovered ? 1.1 : 1));
    }

    if (glowRef.current) {
      // Outer glow rotation (opposite direction)
      glowRef.current.rotation.x = state.clock.elapsedTime * -0.05;
      glowRef.current.rotation.y = state.clock.elapsedTime * -0.08;

      // Breathing glow effect
      const glowPulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      glowRef.current.scale.setScalar(scale * 1.15 * glowPulse);
    }

    // Update mouse position smoothly
    mousePosition.current.x = THREE.MathUtils.lerp(
      mousePosition.current.x,
      (state.mouse.x * viewport.width) / 2 * 0.1,
      0.05
    );
    mousePosition.current.y = THREE.MathUtils.lerp(
      mousePosition.current.y,
      (state.mouse.y * viewport.height) / 2 * 0.1,
      0.05
    );
  });

  return (
    <group position={position}>
      {/* Outer glow sphere */}
      <Sphere ref={glowRef} args={[1, 64, 64]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main distorted sphere */}
      <Sphere
        ref={meshRef}
        args={[1, 128, 128]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Inner core sphere */}
      <Sphere args={[0.6, 64, 64]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Orbiting particles */}
      <OrbitingParticles color={color} radius={1.5} count={30} />
    </group>
  );
};

// Orbiting particles component
const OrbitingParticles: React.FC<{ color: string; radius: number; count: number }> = ({
  color,
  radius,
  count,
}) => {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count, radius]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
