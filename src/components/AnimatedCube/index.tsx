import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedCubeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  wireframe?: boolean;
}

export const AnimatedCube: React.FC<AnimatedCubeProps> = ({
  position = [0, 0, 0],
  scale = 1.5,
  color = "#da4ea2",
  wireframe = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Rotate the cube
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

      // Float animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox ref={meshRef} args={[2, 2, 2]} radius={0.1} smoothness={4} scale={scale}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          wireframe={wireframe}
        />
      </RoundedBox>
      {/* Inner glowing cube */}
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.08} smoothness={4} scale={scale}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </RoundedBox>
    </group>
  );
};
