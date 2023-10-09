import {CardScene} from "../../components/CardScene";
import { Container, StyledCanvas } from "./styles";
import { Hero,Who,Works,Contact } from "./components";
export default function Landing() {
  return (
    <Container>
      <Hero />
      <Who />
      <Works />
      <Contact />
    </Container>
  );
}
