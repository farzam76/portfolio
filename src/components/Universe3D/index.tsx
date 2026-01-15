import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Universe3DProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  particleColor?: string;
}

export const Universe3D: React.FC<Universe3DProps> = ({
  primaryColor = "#FF6B9D",
  secondaryColor = "#C364FF",
  accentColor = "#4ECDC4",
  particleColor = "#FFE66D",
}) => {
  return (
    <>
      {/* Deep space stars */}
      <DeepSpaceStars count={2000} color={particleColor} />

      {/* Nebula clouds */}
      <NebulaCloud position={[-20, 10, -30]} color={primaryColor} />
      <NebulaCloud position={[25, -15, -40]} color={secondaryColor} />
      <NebulaCloud position={[0, 20, -50]} color={accentColor} />

      {/* Floating particles */}
      <FloatingParticles count={500} colors={[primaryColor, secondaryColor, accentColor]} />

      {/* Ambient orbs */}
      <AmbientOrb position={[-30, 15, -25]} color={primaryColor} scale={3} />
      <AmbientOrb position={[35, -10, -35]} color={secondaryColor} scale={4} />
      <AmbientOrb position={[10, 25, -45]} color={accentColor} scale={2.5} />
    </>
  );
};

// Deep space stars background
const DeepSpaceStars: React.FC<{ count: number; color: string }> = ({ count, color }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, sizes, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute stars in a large sphere
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 50;

      sizes[i] = Math.random() * 2;

      // Mix colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return [positions, sizes, colors];
  }, [count, color]);

  // Create star texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Very slow parallax effect
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      pointsRef.current.position.x = (state.mouse.x * viewport.width) / 100;
      pointsRef.current.position.y = (state.mouse.y * viewport.height) / 100;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Nebula cloud effect
const NebulaCloud: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Floating particles
const FloatingParticles: React.FC<{ count: number; colors: string[] }> = ({ count, colors }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, particleColors, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const colorObjects = colors.map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50 - 20;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    return [positions, particleColors, velocities];
  }, [count, colors]);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Wrap around
        if (positions[i3] > 50) positions[i3] = -50;
        if (positions[i3] < -50) positions[i3] = 50;
        if (positions[i3 + 1] > 50) positions[i3 + 1] = -50;
        if (positions[i3 + 1] < -50) positions[i3 + 1] = 50;
        if (positions[i3 + 2] > 0) positions[i3 + 2] = -50;
        if (positions[i3 + 2] < -50) positions[i3 + 2] = 0;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Ambient glowing orbs
const AmbientOrb: React.FC<{ position: [number, number, number]; color: string; scale: number }> = ({ position, color, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 2;

      const pulseScale = scale * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2);
      meshRef.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};
