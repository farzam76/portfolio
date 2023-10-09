import {CardScene} from "../../components/CardScene";
import { CardContainer, StyledCanvas } from "./styles";

export default function NewsGrid() {
  return (
    <CardContainer>
      <StyledCanvas>
        <CardScene />
      </StyledCanvas>
    </CardContainer>
  );
}
