import { Suspense } from "react";
import { Navbar } from "../index";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AnimatedSphere } from "../../../../components/AnimatedSphere";
import { Stars } from "../../../../components/Stars";
import { FloatingShapes } from "../../../../components/FloatingShapes";
import {
  Section,
  Container,
  Left,
  Title,
  WhatWeDo,
  Subtitle,
  Desc,
  Button,
  Right,
} from "./styles";

function HeroComponent() {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
          <Title>Think. Make. Solve.</Title>
          <WhatWeDo>
            <Subtitle>What we Do</Subtitle>
          </WhatWeDo>
          <Desc>
            we enjoy creating delightful, human-centered digital experiences.
          </Desc>
          <Button>Learn More</Button>
        </Left>
        <Right>
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#da4ea2" />

              {/* Main animated sphere */}
              <AnimatedSphere
                position={[0, 0, 0]}
                scale={2.2}
                color="#da4ea2"
                distort={0.6}
                speed={2}
              />

              {/* Background stars */}
              <Stars count={3000} radius={0.8} speed={0.3} />

              {/* Floating geometric shapes */}
              <FloatingShapes />
            </Suspense>
          </Canvas>
        </Right>
      </Container>
    </Section>
  );
}

export const Hero = HeroComponent;
