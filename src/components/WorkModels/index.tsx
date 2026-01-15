import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Sphere, Torus, Cone } from "@react-three/drei";
import * as THREE from "three";

interface WorkModelProps {
  type: string;
}

const WebDesignModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[2.5, 1.8, 0.2]} radius={0.05}>
        <meshStandardMaterial color="#da4ea2" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[2, 1.3, 0.15]} position={[0, 0, 0.2]}>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
    </group>
  );
};

const DevelopmentModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1}>
        <meshStandardMaterial color="#3d1c56" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.08}>
        <meshStandardMaterial color="#da4ea2" wireframe />
      </RoundedBox>
    </group>
  );
};

const IllustrationModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1, 0.4, 16, 100]}>
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </Torus>
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.3} />
      </Sphere>
    </group>
  );
};

const ProductDesignModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Cone args={[1, 2, 6]}>
        <meshStandardMaterial color="#da4ea2" metalness={0.8} roughness={0.2} />
      </Cone>
      <Sphere args={[0.4, 32, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#fff" emissive="#da4ea2" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
};

const SocialMediaModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#3d1c56"
          metalness={0.9}
          roughness={0.1}
          emissive="#da4ea2"
          emissiveIntensity={0.2}
        />
      </Sphere>
      <Torus args={[1.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#da4ea2" metalness={0.8} />
      </Torus>
      <Torus args={[1.5, 0.1, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#ec4899" metalness={0.8} />
      </Torus>
    </group>
  );
};

export const WorkModel: React.FC<WorkModelProps> = ({ type }) => {
  switch (type) {
    case "Web Design":
      return <WebDesignModel />;
    case "Development":
      return <DevelopmentModel />;
    case "Illustration":
      return <IllustrationModel />;
    case "Product Design":
      return <ProductDesignModel />;
    case "Social Media":
      return <SocialMediaModel />;
    default:
      return <WebDesignModel />;
  }
};
