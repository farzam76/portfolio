import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedCubeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export const AnimatedCube: React.FC<AnimatedCubeProps> = ({
  position = [0, 0, 0],
  scale = 1.5,
  color = "#8b5cf6",
}) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (outerRef.current) {
      // Outer cube: Slow, smooth rotation
      outerRef.current.rotation.x = t * 0.2 + Math.sin(t * 0.5) * 0.1;
      outerRef.current.rotation.y = t * 0.3 + Math.cos(t * 0.3) * 0.1;

      // Floating animation
      outerRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;

      // Hover scale effect
      const targetScale = hovered ? 1.15 : 1;
      outerRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (innerRef.current) {
      // Inner cube: Faster, opposite rotation
      innerRef.current.rotation.x = -t * 0.5;
      innerRef.current.rotation.y = -t * 0.7;

      // Pulsing glow effect
      const glowIntensity = 0.8 + Math.sin(t * 2) * 0.4;
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;

      // Pulsing scale
      const innerScale = 0.7 + Math.sin(t * 1.5) * 0.05;
      innerRef.current.scale.setScalar(innerScale);
    }

    if (wireframeRef.current) {
      // Wireframe: Medium speed rotation
      wireframeRef.current.rotation.x = t * 0.4;
      wireframeRef.current.rotation.y = -t * 0.35;
      wireframeRef.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow sphere */}
      <mesh scale={scale * 1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main outer cube */}
      <RoundedBox
        ref={outerRef}
        args={[scale, scale, scale]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Wireframe cube */}
      <RoundedBox
        ref={wireframeRef}
        args={[scale * 1.25, scale * 1.25, scale * 1.25]}
        radius={0.05}
        smoothness={2}
      >
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Inner glowing cube */}
      <RoundedBox
        ref={innerRef}
        args={[scale * 0.6, scale * 0.6, scale * 0.6]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </RoundedBox>

      {/* Corner particles */}
      <CornerParticles color={color} size={scale} />
    </group>
  );
};

// Corner particles for extra detail
const CornerParticles: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(8 * 3);
    const offset = size * 0.7;
    const corners = [
      [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1],
    ];
    corners.forEach((corner, i) => {
      pos[i * 3] = corner[0] * offset;
      pos[i * 3 + 1] = corner[1] * offset;
      pos[i * 3 + 2] = corner[2] * offset;
    });
    return pos;
  }, [size]);

  useFrame((state) => {
    if (particlesRef.current) {
      // Pulse the particles
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={8}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
