import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Container } from "./styles";
import { Hero,Who,Works,Contact } from "./components";

export default function Landing() {
  return (
    <Container>
      <Hero />
      <Who />
      <Works />
      <Contact />
      <ThemeSwitcher />
    </Container>
  );
}
