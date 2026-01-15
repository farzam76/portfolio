import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0b1a 50%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(218, 78, 162, 0.1);
  border-top: 4px solid #da4ea2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.h2`
  color: #da4ea2;
  font-size: 24px;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSubtext = styled.p`
  color: #8b5cf6;
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.8;
`;

export const LoadingScreen: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading Experience</LoadingText>
      <LoadingSubtext>Preparing 3D assets...</LoadingSubtext>
    </LoadingContainer>
  );
};
