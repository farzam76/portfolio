import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WorkModel } from "../../../../components/WorkModels";
import { Stars } from "../../../../components/Stars";
import { useTheme } from "../../../../theme/ThemeContext";
import { Section, Container, Left, List, ListItem, Right } from "./styles";

const data = [
  "Web Design",
  "Development",
  "Illustration",
  "Product Design",
  "Social Media",
];

function WorksComponent() {
  const [work, setWork] = useState("Web Design");
  const { theme } = useTheme();

  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <ListItem key={item} text={item} onClick={() => setWork(item)}>
                {item}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right>
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, 0, -5]} intensity={0.5} color={theme.colors.primary} />
              <spotLight position={[0, 5, 0]} intensity={0.5} color={theme.colors.accent} />

              {/* Dynamic work model based on selection */}
              <WorkModel
                type={work}
                primaryColor={theme.colors.primary}
                secondaryColor={theme.colors.secondary}
                accentColor={theme.colors.accent}
              />

              {/* Background stars */}
              <Stars count={1500} radius={0.5} speed={0.25} />

              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </Right>
      </Container>
    </Section>
  );
};

export const Works = WorksComponent;
