import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Section,Container,Left,Right,Title,WhatWeDo,Subtitle,Line,Desc,Button } from "./styles";


function WhoComponent() {
  return (
    <Section>
      <Container>
        <Left>
          {/* <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 2, 1]} />
              <Cube />
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas> */}
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