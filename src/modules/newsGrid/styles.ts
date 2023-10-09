
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';

export const CardContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
box-sizing: border-box; /* Include padding in the total width */
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

export const StyledCanvas = styled(Canvas)`
  width: 100%;
  max-width: 100%;
  touch-action: none;
`;