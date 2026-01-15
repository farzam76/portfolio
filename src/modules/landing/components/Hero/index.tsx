import { Suspense } from "react";
import { Navbar } from "../index";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CrystallineNexus } from "../../../../components/CrystallineNexus";
import { InteractiveUniverse } from "../../../../components/InteractiveUniverse";
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
  CanvasContainer,
  ThreeDShowcase,
} from "./styles";

function HeroComponent() {
  const { theme } = useTheme();

  return (
    <Section>
      <Navbar />

      {/* Background Universe Layer */}
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
          <Suspense fallback={null}>
            <InteractiveUniverse
              primaryColor={theme.colors.primary}
              secondaryColor={theme.colors.secondary}
              accentColor={theme.colors.accent}
              particleColor={theme.colors.particle}
              starCount={4000}
              nebulaIntensity={1.2}
            />
          </Suspense>
        </Canvas>
      </CanvasContainer>

      {/* Main 3D Centerpiece - Foreground */}
      <ThreeDShowcase>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              color={theme.colors.primary}
            />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.8}
              color={theme.colors.secondary}
            />
            <pointLight
              position={[5, -5, 10]}
              intensity={0.5}
              color={theme.colors.accent}
            />

            {/* Main Crystalline Nexus */}
            <CrystallineNexus
              primaryColor={theme.colors.primary}
              secondaryColor={theme.colors.secondary}
              accentColor={theme.colors.accent}
              particleColor={theme.colors.particle}
              scale={1.3}
            />
          </Suspense>
        </Canvas>
      </ThreeDShowcase>

      {/* Text Content - Floating above */}
      <Container>
        <Left>
          <Title>Think. Make. Solve.</Title>
          <WhatWeDo>
            <Subtitle>What we Do</Subtitle>
          </WhatWeDo>
          <Desc>
            We enjoy creating delighthat, human-centered digital experiences that push the boundaries of what's possible.
          </Desc>
          <Button>Learn More</Button>
        </Left>
      </Container>
    </Section>
  );
}

export const Hero = HeroComponent;
