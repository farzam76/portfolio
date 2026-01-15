import { Suspense } from "react";
import { Navbar } from "../index";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AnimatedSphere } from "../../../../components/AnimatedSphere";
import { Universe3D } from "../../../../components/Universe3D";
import { FloatingShapes } from "../../../../components/FloatingShapes";
import { useTheme } from "../../../../theme/ThemeContext";
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
  UniverseBackground,
} from "./styles";

function HeroComponent() {
  const { theme } = useTheme();

  return (
    <Section>
      {/* 3D Universe Background - Fixed, covers entire viewport */}
      <UniverseBackground>
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={null}>
            <Universe3D
              primaryColor={theme.colors.primary}
              secondaryColor={theme.colors.secondary}
              accentColor={theme.colors.accent}
              particleColor={theme.colors.particle}
            />
          </Suspense>
        </Canvas>
      </UniverseBackground>

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
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <pointLight position={[-5, -5, -5]} intensity={0.8} color={theme.colors.primary} />
              <pointLight position={[5, 5, 5]} intensity={0.5} color={theme.colors.accent} />

              {/* Main animated sphere */}
              <AnimatedSphere
                position={[0, 0, 0]}
                scale={2.5}
                color={theme.colors.primary}
                distort={0.6}
                speed={2}
              />

              {/* Floating geometric shapes */}
              <FloatingShapes
                primaryColor={theme.colors.primary}
                secondaryColor={theme.colors.secondary}
                accentColor={theme.colors.accent}
              />
            </Suspense>
          </Canvas>
        </Right>
      </Container>
    </Section>
  );
}

export const Hero = HeroComponent;
