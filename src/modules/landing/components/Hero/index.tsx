import React, { Suspense } from "react";
import { Navbar } from "../index";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
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
            {/* <Line src="./img/line.png" /> */}
            <Subtitle>What we Do</Subtitle>
          </WhatWeDo>
          <Desc>
            we enjoy creating delightful, human-centered digital experiences.
          </Desc>
          <Button>Learn More</Button>
        </Left>
        <Right>
          {/* <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                  color="#3d1c56"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas> */}
          {/* <Img src="./img/moon.png" /> */}
        </Right>
      </Container>
    </Section>
  );
}

export const Hero = HeroComponent;
