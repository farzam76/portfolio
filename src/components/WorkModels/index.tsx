import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WorkModelProps {
  type: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

interface ModelComponentProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Web Design - Holographic browser window with floating UI elements
const WebDesignModel: React.FC<ModelComponentProps> = ({ primaryColor, secondaryColor, accentColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const elementsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }

    if (elementsRef.current) {
      elementsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 2 + i * 0.5) * 0.1 + (i - 1) * 0.3;
        child.rotation.z = Math.sin(t + i) * 0.05;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main browser frame - holographic */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshStandardMaterial
          color={primaryColor}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.5, 2.5, 0.1)]} />
        <lineBasicMaterial color={primaryColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Browser header bar */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.4, 0.25, 0.05]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Browser dots */}
      {[-1.4, -1.2, -1].map((x, i) => (
        <mesh key={i} position={[x, 1.1, 0.05]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={[accentColor, primaryColor, secondaryColor][i]}
            emissive={[accentColor, primaryColor, secondaryColor][i]}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Floating UI elements */}
      <group ref={elementsRef}>
        <mesh position={[-0.8, 0.3, 0.2]}>
          <boxGeometry args={[1.2, 0.4, 0.02]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0.8, 0.2, 0.15]}>
          <boxGeometry args={[0.8, 0.6, 0.02]} />
          <meshStandardMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        {[-0.3, -0.5, -0.7].map((y, i) => (
          <mesh key={i} position={[-0.3, y, 0.1]}>
            <boxGeometry args={[2 - i * 0.3, 0.08, 0.01]} />
            <meshStandardMaterial
              color={secondaryColor}
              emissive={secondaryColor}
              emissiveIntensity={0.2}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      <DataParticles color={primaryColor} />
    </group>
  );
};

// Development - Rotating code cube with floating syntax
const DevelopmentModel: React.FC<ModelComponentProps> = ({ primaryColor, secondaryColor, accentColor }) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Group>(null);
  const codeRingsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.2;
      outerRef.current.rotation.y = t * 0.3;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.rotation.y = -t * 0.5;
    }

    if (codeRingsRef.current) {
      codeRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (0.2 + i * 0.1) * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner rotating structure */}
      <group ref={innerRef}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* Code rings */}
      <group ref={codeRingsRef}>
        {[1.2, 1.5, 1.8].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / (3 + i), Math.PI / (4 + i), 0]}>
            <torusGeometry args={[radius, 0.02, 8, 64]} />
            <meshStandardMaterial
              color={[primaryColor, secondaryColor, accentColor][i]}
              emissive={[primaryColor, secondaryColor, accentColor][i]}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      <CodeSymbols primaryColor={primaryColor} />
    </group>
  );
};

// Illustration - Artistic torus knot with paint splatter
const IllustrationModel: React.FC<ModelComponentProps> = ({ primaryColor, secondaryColor, accentColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const brushRef = useRef<THREE.Group>(null);
  const splatterRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }

    if (brushRef.current) {
      brushRef.current.rotation.z = Math.sin(t * 2) * 0.3;
      brushRef.current.position.y = Math.sin(t) * 0.2;
    }

    if (splatterRef.current) {
      splatterRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(t * 2 + i * 0.5) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  const splatterPositions = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 1.5 + Math.random() * 0.5;
      return [Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 0.5] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central torus knot - artistic form */}
      <mesh>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Paint brush */}
      <group ref={brushRef} position={[1.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 1.5, 8]} />
          <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <coneGeometry args={[0.15, 0.5, 16]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Paint splatters */}
      <group ref={splatterRef}>
        {splatterPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.1 + (i % 3) * 0.05, 16, 16]} />
            <meshStandardMaterial
              color={[primaryColor, secondaryColor, accentColor][i % 3]}
              emissive={[primaryColor, secondaryColor, accentColor][i % 3]}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      <ColorPalette primaryColor={primaryColor} secondaryColor={secondaryColor} accentColor={accentColor} />
    </group>
  );
};

// Product Design - 3D wireframe product with holographic layers
const ProductDesignModel: React.FC<ModelComponentProps> = ({ primaryColor, secondaryColor, accentColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const layersRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }

    if (layersRef.current) {
      layersRef.current.children.forEach((layer, i) => {
        layer.position.y = Math.sin(t + i * 0.5) * 0.1 + i * 0.3 - 0.3;
        layer.rotation.y = t * 0.1 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main product shape - rounded box */}
      <mesh>
        <boxGeometry args={[1.5, 0.8, 2]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.55, 0.85, 2.05)]} />
        <lineBasicMaterial color={accentColor} transparent opacity={0.8} />
      </lineSegments>

      {/* Exploded view layers */}
      <group ref={layersRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <planeGeometry args={[1.4, 1.9]} />
            <meshStandardMaterial
              color={[primaryColor, secondaryColor, accentColor][i]}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      <DesignAnnotations color={accentColor} />
    </group>
  );
};

// Social Media - Connected network sphere
const SocialMediaModel: React.FC<ModelComponentProps> = ({ primaryColor, secondaryColor, accentColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  const networkData = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];

    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20);
      const theta = Math.sqrt(20 * Math.PI) * phi;

      nodes.push(
        new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi) * 1.2,
          Math.sin(theta) * Math.sin(phi) * 1.2,
          Math.cos(phi) * 1.2
        )
      );
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.2) {
          connections.push([i, j]);
        }
      }
    }

    return { nodes, connections };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const pulse = 1 + Math.sin(t * 3 + i * 0.5) * 0.3;
        node.scale.setScalar(pulse);
      });
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (0.3 + i * 0.1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Network nodes */}
      <group ref={nodesRef}>
        {networkData.nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? accentColor : secondaryColor}
              emissive={i % 3 === 0 ? accentColor : secondaryColor}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Connections */}
      <group>
        {networkData.connections.map(([start, end], i) => {
          const points = [networkData.nodes[start], networkData.nodes[end]];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.3 });
          const lineObj = new THREE.Line(geometry, material);
          return <primitive key={i} object={lineObj} />;
        })}
      </group>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        {[1.6, 1.9, 2.2].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / (2 + i), 0, 0]}>
            <torusGeometry args={[radius, 0.015, 8, 64]} />
            <meshStandardMaterial
              color={[primaryColor, secondaryColor, accentColor][i]}
              emissive={[primaryColor, secondaryColor, accentColor][i]}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      <NotificationParticles color={accentColor} />
    </group>
  );
};

// Helper components
const DataParticles: React.FC<{ color: string }> = ({ color }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.random() * 2;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (ref.current) {
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 50; i++) {
        posArr[i * 3 + 2] -= 0.02;
        if (posArr[i * 3 + 2] < -1) {
          posArr[i * 3 + 2] = 2;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={50} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const CodeSymbols: React.FC<{ primaryColor: string }> = ({ primaryColor }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 2.2;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
            <boxGeometry args={[0.15, 0.05, 0.02]} />
            <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

const ColorPalette: React.FC<{ primaryColor: string; secondaryColor: string; accentColor: string }> = ({
  primaryColor,
  secondaryColor,
  accentColor,
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {[primaryColor, secondaryColor, accentColor, "#FFE66D", "#FF6B6B"].map((color, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]}>
            <circleGeometry args={[0.15, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
};

const DesignAnnotations: React.FC<{ color: string }> = ({ color }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={ref}>
      {[
        [1, 0.6, 1.2],
        [-1, -0.6, 1.2],
        [1, -0.6, -1.2],
        [-1, 0.6, -1.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const NotificationParticles: React.FC<{ color: string }> = ({ color }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random();
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const posArr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 30; i++) {
        const scale = 1 + Math.sin(state.clock.elapsedTime + i) * 0.1;
        posArr[i * 3] *= scale > 1 ? 1.001 : 0.999;
        posArr[i * 3 + 1] *= scale > 1 ? 1.001 : 0.999;
        posArr[i * 3 + 2] *= scale > 1 ? 1.001 : 0.999;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={30} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={color} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export const WorkModel: React.FC<WorkModelProps> = ({
  type,
  primaryColor = "#FF6B9D",
  secondaryColor = "#C364FF",
  accentColor = "#4ECDC4",
}) => {
  const colors = { primaryColor, secondaryColor, accentColor };

  switch (type) {
    case "Web Design":
      return <WebDesignModel {...colors} />;
    case "Development":
      return <DevelopmentModel {...colors} />;
    case "Illustration":
      return <IllustrationModel {...colors} />;
    case "Product Design":
      return <ProductDesignModel {...colors} />;
    case "Social Media":
      return <SocialMediaModel {...colors} />;
    default:
      return <WebDesignModel {...colors} />;
  }
};
