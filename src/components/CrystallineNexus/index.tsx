import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CrystallineNexusProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  particleColor: string;
  scale?: number;
}

// Crystalline Unicorn Horn - Spiraling crystal structure
const CrystalHorn: React.FC<{ color: string; secondaryColor: string; scale: number }> = ({
  color,
  secondaryColor,
  scale,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalsRef = useRef<THREE.Group>(null);

  // Create spiral crystal positions
  const crystalData = useMemo(() => {
    const data: { position: THREE.Vector3; rotation: THREE.Euler; scale: number; delay: number }[] = [];
    const spiralTurns = 3;
    const crystalCount = 24;

    for (let i = 0; i < crystalCount; i++) {
      const t = i / crystalCount;
      const angle = t * Math.PI * 2 * spiralTurns;
      const radius = 0.3 + t * 0.8;
      const height = t * 2.5 - 0.5;

      data.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        rotation: new THREE.Euler(
          Math.random() * 0.5,
          angle + Math.PI / 2,
          Math.random() * 0.3
        ),
        scale: 0.15 + Math.random() * 0.2 + (1 - t) * 0.15,
        delay: i * 0.1,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (crystalsRef.current) {
      crystalsRef.current.children.forEach((crystal, i) => {
        const t = state.clock.elapsedTime + crystalData[i].delay;
        crystal.position.y = crystalData[i].position.y + Math.sin(t * 2) * 0.05;
        (crystal as THREE.Mesh).scale.setScalar(
          crystalData[i].scale * (1 + Math.sin(t * 3) * 0.1) * scale
        );
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central horn core */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.15, 3, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Spiral crystals */}
      <group ref={crystalsRef}>
        {crystalData.map((data, i) => (
          <mesh
            key={i}
            position={data.position}
            rotation={data.rotation}
          >
            <octahedronGeometry args={[data.scale * scale, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? color : secondaryColor}
              emissive={i % 2 === 0 ? color : secondaryColor}
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Energy Core - Nested geometric shapes with pulsing energy
const EnergyCore: React.FC<{ color: string; accentColor: string; scale: number }> = ({
  color,
  accentColor,
  scale,
}) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const middleRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.1;
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.scale.setScalar(scale * (1 + Math.sin(t * 0.5) * 0.05));
    }
    if (middleRef.current) {
      middleRef.current.rotation.x = -t * 0.2;
      middleRef.current.rotation.z = t * 0.1;
      middleRef.current.scale.setScalar(scale * 0.7 * (1 + Math.sin(t * 0.8) * 0.08));
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.3;
      innerRef.current.rotation.z = -t * 0.2;
      const pulse = 1 + Math.sin(t * 2) * 0.15;
      innerRef.current.scale.setScalar(scale * 0.4 * pulse);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -t * 0.05;
      wireframeRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group>
      {/* Outer dodecahedron wireframe */}
      <lineSegments ref={wireframeRef} scale={scale * 1.3}>
        <edgesGeometry args={[new THREE.DodecahedronGeometry(1, 0)]} />
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>

      {/* Outer icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
          wireframe
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Middle octahedron */}
      <mesh ref={middleRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Inner sphere core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.9}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
};

// Orbital Rings - Data rings orbiting the core
const OrbitalRings: React.FC<{ color: string; secondaryColor: string; scale: number }> = ({
  color,
  secondaryColor,
  scale,
}) => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.3;
      ring1Ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.y = Math.cos(t * 0.15) * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.2;
      ring3Ref.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
  });

  const createRingPoints = (radius: number, count: number) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return points;
  };

  return (
    <group scale={scale}>
      {/* Ring 1 - Horizontal */}
      <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Data nodes on ring */}
        {createRingPoints(1.8, 12).map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial
              color={secondaryColor}
              emissive={secondaryColor}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 2 - Tilted */}
      <group ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Ring 3 - Opposite tilt */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
};

// Constellation Lines - Interconnected energy beams
const ConstellationLines: React.FC<{ color: string; accentColor: string; scale: number }> = ({
  color,
  accentColor,
  scale,
}) => {
  const linesRef = useRef<THREE.Group>(null);

  const lineData = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const connections: [number, number][] = [];

    // Create constellation points
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20);
      const theta = Math.sqrt(20 * Math.PI) * phi;
      const r = 2 + Math.random() * 0.5;

      points.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }

    // Create connections between nearby points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 2) {
          connections.push([i, j]);
        }
      }
    }

    return { points, connections };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef} scale={scale}>
      {/* Constellation points */}
      {lineData.points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? accentColor : color}
            emissive={i % 3 === 0 ? accentColor : color}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      {lineData.connections.map(([start, end], i) => {
        const points = [lineData.points[start], lineData.points[end]];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.3 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
};

// Particle Field - Floating energy particles
const ParticleField: React.FC<{ particleColor: string; count: number; scale: number }> = ({
  particleColor,
  count,
  scale,
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;

      // Smooth mouse tracking
      mouseRef.current.x = THREE.MathUtils.lerp(
        mouseRef.current.x,
        state.mouse.x * 2,
        0.02
      );
      mouseRef.current.y = THREE.MathUtils.lerp(
        mouseRef.current.y,
        state.mouse.y * 2,
        0.02
      );

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Orbital motion
        const x = posArr[i3];
        const z = posArr[i3 + 2];
        const angle = 0.002;

        posArr[i3] = x * Math.cos(angle) - z * Math.sin(angle);
        posArr[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

        // Gentle floating
        posArr[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;

        // Mouse influence
        posArr[i3] += mouseRef.current.x * 0.0001;
        posArr[i3 + 1] += mouseRef.current.y * 0.0001;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef} scale={scale}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={particleColor}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main CrystallineNexus Component
export const CrystallineNexus: React.FC<CrystallineNexusProps> = ({
  primaryColor,
  secondaryColor,
  accentColor,
  particleColor,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Smooth mouse tracking for the whole nexus
    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      state.mouse.x * 0.3,
      0.05
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      state.mouse.y * 0.2,
      0.05
    );

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // Mouse-reactive rotation
      groupRef.current.rotation.x = mouseRef.current.y * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mouseRef.current.x * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Central Energy Core */}
      <EnergyCore color={primaryColor} accentColor={accentColor} scale={1} />

      {/* Crystalline Horn Structure (positioned above core) */}
      <group position={[0, 0.5, 0]} scale={0.8}>
        <CrystalHorn color={primaryColor} secondaryColor={secondaryColor} scale={1} />
      </group>

      {/* Orbital Data Rings */}
      <OrbitalRings color={primaryColor} secondaryColor={secondaryColor} scale={1} />

      {/* Constellation Network */}
      <ConstellationLines color={secondaryColor} accentColor={accentColor} scale={1} />

      {/* Particle Field */}
      <ParticleField
        particleColor={particleColor}
        count={200}
        scale={1}
      />

      {/* Ambient glow sphere */}
      <mesh scale={3.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default CrystallineNexus;
