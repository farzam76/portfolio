import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  scale?: number;
}

// DNA Helix - Represents creativity and the building blocks of innovation
export const DNAHelix: React.FC<DNAHelixProps> = ({
  primaryColor,
  secondaryColor,
  accentColor,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const strand1Ref = useRef<THREE.Group>(null);
  const strand2Ref = useRef<THREE.Group>(null);
  const connectorsRef = useRef<THREE.Group>(null);

  // Generate helix data
  const helixData = useMemo(() => {
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const connectors: { start: THREE.Vector3; end: THREE.Vector3; index: number }[] = [];

    const turns = 3;
    const pointsPerTurn = 20;
    const totalPoints = turns * pointsPerTurn;
    const radius = 0.8;
    const height = 4;

    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;

      // First strand
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      points1.push(new THREE.Vector3(x1, y, z1));

      // Second strand (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      points2.push(new THREE.Vector3(x2, y, z2));

      // Connectors (every few points)
      if (i % 4 === 0) {
        connectors.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
          index: i,
        });
      }
    }

    return { points1, points2, connectors };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle overall rotation
      groupRef.current.rotation.y = t * 0.2;
      // Floating animation
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }

    // Animate strand spheres
    if (strand1Ref.current) {
      strand1Ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const pulse = 1 + Math.sin(t * 2 + i * 0.1) * 0.2;
        mesh.scale.setScalar(0.1 * pulse * scale);
      });
    }

    if (strand2Ref.current) {
      strand2Ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const pulse = 1 + Math.sin(t * 2 + i * 0.1 + Math.PI) * 0.2;
        mesh.scale.setScalar(0.1 * pulse * scale);
      });
    }

    // Animate connectors
    if (connectorsRef.current) {
      connectorsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const glow = 0.5 + Math.sin(t * 3 + i * 0.5) * 0.5;
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
      });
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* First strand - spheres along helix */}
      <group ref={strand1Ref}>
        {helixData.points1.map((point, i) => (
          <mesh key={`s1-${i}`} position={point}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={primaryColor}
              emissive={primaryColor}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Second strand */}
      <group ref={strand2Ref}>
        {helixData.points2.map((point, i) => (
          <mesh key={`s2-${i}`} position={point}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={secondaryColor}
              emissive={secondaryColor}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Connectors between strands */}
      <group ref={connectorsRef}>
        {helixData.connectors.map((connector, i) => {
          const midPoint = new THREE.Vector3()
            .addVectors(connector.start, connector.end)
            .multiplyScalar(0.5);
          const direction = new THREE.Vector3()
            .subVectors(connector.end, connector.start);
          const length = direction.length();

          return (
            <mesh
              key={`c-${i}`}
              position={midPoint}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                direction.normalize()
              )}
            >
              <cylinderGeometry args={[0.03, 0.03, length, 8]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>

      {/* Center energy core */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 4 * scale, 16]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.5}>
        <cylinderGeometry args={[1, 1, 5, 16]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating particles around helix */}
      <HelixParticles
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        count={100}
      />
    </group>
  );
};

// Floating particles around the helix
const HelixParticles: React.FC<{
  primaryColor: string;
  secondaryColor: string;
  count: number;
}> = ({ primaryColor, count }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 1.5;
      const y = (Math.random() - 0.5) * 5;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Gentle orbital motion
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        const angle = 0.003;

        positions[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
        positions[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
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
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={primaryColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default DNAHelix;
