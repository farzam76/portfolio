import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DNAHelix } from "../../../../components/DNAHelix";
import { Stars } from "../../../../components/Stars";
import { useTheme } from "../../../../theme/ThemeContext";
import { Section,Container,Left,Right,Title,WhatWeDo,Subtitle,Desc,Button } from "./styles";


function WhoComponent() {
  const { theme } = useTheme();

  return (
    <Section>
      <Container>
        <Left>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} color={theme.colors.primary} />
              <pointLight position={[-5, -5, -5]} intensity={0.6} color={theme.colors.secondary} />
              <pointLight position={[0, 5, 0]} intensity={0.4} color={theme.colors.accent} />

              {/* DNA Helix - represents creativity and innovation */}
              <DNAHelix
                primaryColor={theme.colors.primary}
                secondaryColor={theme.colors.secondary}
                accentColor={theme.colors.accent}
                scale={0.9}
              />

              {/* Background stars */}
              <Stars count={2000} radius={0.6} speed={0.2} />

              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
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
