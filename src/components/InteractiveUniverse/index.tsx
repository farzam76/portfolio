import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveUniverseProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  particleColor: string;
  starCount?: number;
  nebulaIntensity?: number;
}

// Deep space stars with parallax effect
const DeepSpaceStars: React.FC<{
  count: number;
  color: string;
  secondaryColor: string;
  depth: number;
}> = ({ count, color, secondaryColor, depth }) => {
  const starsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 80;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - depth;

      // Color variation
      const t = Math.random();
      const starColor = color1.clone().lerp(color2, t);
      col[i * 3] = starColor.r;
      col[i * 3 + 1] = starColor.g;
      col[i * 3 + 2] = starColor.b;

      // Size variation with some bright stars
      siz[i] = Math.random() < 0.05 ? 0.3 + Math.random() * 0.4 : 0.05 + Math.random() * 0.15;
    }

    return [pos, col, siz];
  }, [count, color, secondaryColor]);

  useFrame((state) => {
    // Smooth mouse tracking
    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      state.mouse.x,
      0.02
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      state.mouse.y,
      0.02
    );

    if (starsRef.current) {
      // Parallax effect based on mouse position
      starsRef.current.rotation.y = mouseRef.current.x * 0.05 * (1 / depth);
      starsRef.current.rotation.x = mouseRef.current.y * 0.03 * (1 / depth);

      // Gentle rotation
      starsRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
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
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Nebula clouds - volumetric fog-like effect
const NebulaClouds: React.FC<{
  color: string;
  secondaryColor: string;
  intensity: number;
}> = ({ color, secondaryColor, intensity }) => {
  const cloudsRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const cloudData = useMemo(() => {
    const data: {
      position: THREE.Vector3;
      scale: number;
      rotation: THREE.Euler;
      color: string;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 15; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          -30 - Math.random() * 30
        ),
        scale: 5 + Math.random() * 15,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        color: Math.random() > 0.5 ? color : secondaryColor,
        opacity: 0.02 + Math.random() * 0.04 * intensity,
      });
    }

    return data;
  }, [color, secondaryColor, intensity]);

  useFrame((state) => {
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, state.mouse.x, 0.01);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, state.mouse.y, 0.01);

    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.rotation.z += 0.0003 * (i % 2 === 0 ? 1 : -1);
        cloud.position.x += mouseRef.current.x * 0.02 * (i % 3 === 0 ? 1 : -0.5);
        cloud.position.y += mouseRef.current.y * 0.01 * (i % 2 === 0 ? 1 : -0.5);
      });
    }
  });

  return (
    <group ref={cloudsRef}>
      {cloudData.map((cloud, i) => (
        <mesh
          key={i}
          position={cloud.position}
          rotation={cloud.rotation}
          scale={cloud.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Shooting stars effect
const ShootingStars: React.FC<{ color: string; accentColor: string }> = ({
  color,
  accentColor,
}) => {
  const starsRef = useRef<THREE.Group>(null);

  const starData = useMemo(() => {
    return Array.from({ length: 5 }, () => ({
      startPosition: new THREE.Vector3(
        30 + Math.random() * 20,
        10 + Math.random() * 20,
        -20 - Math.random() * 20
      ),
      speed: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 20,
      length: 2 + Math.random() * 3,
      active: false,
      progress: 0,
    }));
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.children.forEach((star, i) => {
        const data = starData[i];
        const t = state.clock.elapsedTime;

        // Check if it's time to activate this shooting star
        if (Math.floor(t) % 10 === Math.floor(data.delay) % 10) {
          data.active = true;
        }

        if (data.active) {
          data.progress += data.speed * 0.02;

          // Move diagonally
          star.position.x = data.startPosition.x - data.progress * 50;
          star.position.y = data.startPosition.y - data.progress * 30;
          star.position.z = data.startPosition.z;

          // Fade based on progress
          const opacity = Math.sin(data.progress * Math.PI);
          (star as THREE.Mesh).scale.setScalar(opacity * data.length);

          // Reset when complete
          if (data.progress > 1) {
            data.active = false;
            data.progress = 0;
            star.position.copy(data.startPosition);
          }
        }
      });
    }
  });

  return (
    <group ref={starsRef}>
      {starData.map((data, i) => (
        <mesh key={i} position={data.startPosition} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.1, 1, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? color : accentColor}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Distant galaxies
const DistantGalaxies: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => {
  const galaxiesRef = useRef<THREE.Group>(null);

  const galaxyData = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 60,
        -50 - Math.random() * 50
      ),
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * Math.PI,
      color: Math.random() > 0.5 ? color : secondaryColor,
    }));
  }, [color, secondaryColor]);

  useFrame(() => {
    if (galaxiesRef.current) {
      galaxiesRef.current.children.forEach((galaxy, i) => {
        galaxy.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={galaxiesRef}>
      {galaxyData.map((galaxy, i) => (
        <group key={i} position={galaxy.position} rotation={[0, 0, galaxy.rotation]}>
          {/* Galaxy core */}
          <mesh scale={galaxy.scale}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial
              color={galaxy.color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Galaxy spiral arms */}
          <points scale={galaxy.scale}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={100}
                array={new Float32Array(
                  Array.from({ length: 300 }, (_, j) => {
                    const idx = Math.floor(j / 3);
                    const coord = j % 3;
                    const angle = (idx / 100) * Math.PI * 4;
                    const radius = (idx / 100) * 2;
                    if (coord === 0) return Math.cos(angle) * radius;
                    if (coord === 1) return Math.sin(angle) * radius;
                    return (Math.random() - 0.5) * 0.3;
                  })
                )}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.05}
              color={galaxy.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      ))}
    </group>
  );
};

// Cosmic dust particles
const CosmicDust: React.FC<{ color: string; count: number }> = ({ color, count }) => {
  const dustRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, state.mouse.x, 0.01);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, state.mouse.y, 0.01);

    if (dustRef.current) {
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        // Gentle drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.005;
        positions[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.003;

        // Mouse influence
        positions[i * 3] += mouseRef.current.x * 0.01;
        positions[i * 3 + 1] += mouseRef.current.y * 0.005;
      }

      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main InteractiveUniverse Component
export const InteractiveUniverse: React.FC<InteractiveUniverseProps> = ({
  primaryColor,
  secondaryColor,
  accentColor,
  particleColor,
  starCount = 3000,
  nebulaIntensity = 1,
}) => {
  return (
    <group>
      {/* Background stars - multiple layers for depth */}
      <DeepSpaceStars
        count={starCount}
        color={primaryColor}
        secondaryColor={particleColor}
        depth={1}
      />
      <DeepSpaceStars
        count={Math.floor(starCount / 2)}
        color={secondaryColor}
        secondaryColor={accentColor}
        depth={2}
      />
      <DeepSpaceStars
        count={Math.floor(starCount / 3)}
        color={accentColor}
        secondaryColor={primaryColor}
        depth={3}
      />

      {/* Nebula clouds */}
      <NebulaClouds
        color={primaryColor}
        secondaryColor={secondaryColor}
        intensity={nebulaIntensity}
      />

      {/* Shooting stars */}
      <ShootingStars color={primaryColor} accentColor={accentColor} />

      {/* Distant galaxies */}
      <DistantGalaxies color={secondaryColor} secondaryColor={accentColor} />

      {/* Cosmic dust */}
      <CosmicDust color={particleColor} count={500} />
    </group>
  );
};

export default InteractiveUniverse;
