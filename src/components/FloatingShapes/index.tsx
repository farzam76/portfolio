import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  speed?: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  position,
  rotation = [0, 0, 0],
  color = "#da4ea2",
  speed = 1,
}): JSX.Element => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[1, 1, 1]}
      radius={0.05}
      smoothness={4}
      position={position}
      rotation={rotation}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </RoundedBox>
  );
};

export const FloatingShapes: React.FC = () => {
  return (
    <>
      <FloatingShape position={[-3, 2, -5]} color="#da4ea2" speed={0.8} />
      <FloatingShape position={[4, -1, -8]} color="#3d1c56" speed={1.2} />
      <FloatingShape position={[-2, -2, -6]} color="#8b5cf6" speed={1} />
      <FloatingShape position={[3, 3, -7]} color="#ec4899" speed={0.9} />
    </>
  );
};
