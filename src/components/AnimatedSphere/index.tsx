import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={scale} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};
