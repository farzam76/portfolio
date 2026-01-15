import  { useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox, Html } from "@react-three/drei";
import img from "../../assets/breaking.jpeg";
import "./style.css";

function NewsCard() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const originalPosition = [0, 0, 0];

  const [spring, set] = useSpring(() => ({
    position: originalPosition,
    config: { mass: 1, friction: 40, tension: 800 },
  }));

  const bind = useDrag(({ movement: [x, y], down }) => {
    set({
      config: { mass: down ? 1 : 4, tension: down ? 2000 : 800 },
      position: down ? [x / aspect, -y / aspect, 0] : originalPosition,
    });
  });
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useLoader(THREE.TextureLoader, img);

  return (
    // @ts-ignore - Type incompatibility with react-spring and @react-three/fiber
    <animated.mesh {...spring} {...bind()} castShadow>
      <RoundedBox
        castShadow
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        smoothness={4}
        radius={0.015}
        scale={[viewport.width, viewport.height, 1]}
      >
        <meshBasicMaterial color="grey" />
      </RoundedBox>
      <group position={[0, viewport.height / 4, 1]} rotation={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[viewport.width, viewport.height / 2]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
      <group
        position={[-viewport.width / 2 + 20, viewport.height / 14 - 20, -5]}
        rotation={[0, 0, 0]}
        ref={groupRef}
      >
        <Html>
          <div className="card-content">
            <div>
              <h1>Title</h1>
            </div>
            <div>
              <p>Description goes here.</p>
            </div>
          </div>
        </Html>
      </group>
    </animated.mesh>
  );
}

export default NewsCard;
