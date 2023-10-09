
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';


export const Container = styled.div`
height: 100vh;
scroll-snap-type: y mandatory;
scroll-behavior: smooth;
overflow-y: auto;
scrollbar-width: none;
color: white;
background: url("./img/bg.jpeg");
&::-webkit-scrollbar{
  display: none;
}
`;

export const StyledCanvas = styled(Canvas)`
  width: 100%;
  max-width: 100%;
  touch-action: none;
`;