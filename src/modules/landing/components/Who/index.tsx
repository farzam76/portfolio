import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatedCube } from "../../../../components/AnimatedCube";
import { Stars } from "../../../../components/Stars";
import { Section,Container,Left,Right,Title,WhatWeDo,Subtitle,Desc,Button } from "./styles";


function WhoComponent() {
  return (
    <Section>
      <Container>
        <Left>
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 2, 1]} intensity={1} />
              <pointLight position={[-3, -2, -1]} intensity={0.5} color="#da4ea2" />

              {/* Animated cube */}
              <AnimatedCube position={[0, 0, 0]} scale={1.5} color="#8b5cf6" />

              {/* Background stars */}
              <Stars count={2000} radius={0.6} speed={0.2} />

              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Suspense>
          </Canvas>
        </Left>
        <Right>
          <Title>Think outside the square space</Title>
          <WhatWeDo>
            <Subtitle>Who we Are</Subtitle>
          </WhatWeDo>
          <Desc>
            a creative group of designers and developers with a passion for the
            arts.
          </Desc>
          <Button>See our works</Button>
        </Right>
      </Container>
    </Section>
  );
};

export const Who = WhoComponent;