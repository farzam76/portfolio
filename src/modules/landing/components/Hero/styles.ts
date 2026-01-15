import styled from "styled-components";

export const Section = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
  }
`;

export const UniverseBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  padding: 0 60px;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 40px;
    gap: 40px;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
    gap: 20px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 10;
  animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1);

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
  position: relative;

  /* Animated gradient text */
  background: linear-gradient(
    135deg,
    #FF6B9D 0%,
    #C364FF 25%,
    #4ECDC4 50%,
    #FFE66D 75%,
    #FF6B9D 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 8s ease infinite;

  @keyframes gradientFlow {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Text glow effect */
  filter: drop-shadow(0 0 30px rgba(255, 107, 157, 0.5))
          drop-shadow(0 0 60px rgba(195, 100, 255, 0.3));

  @media only screen and (max-width: 768px) {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
`;

export const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;

  &::before {
    content: '';
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #FF6B9D, #C364FF);
    box-shadow: 0 0 10px #FF6B9D;
    animation: pulse 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0;
  color: #FF6B9D;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px rgba(255, 107, 157, 0.6);
`;

export const Desc = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  max-width: 500px;
  font-weight: 400;
  letter-spacing: 0.01em;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #FF6B9D 0%, #C364FF 100%);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 16px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(255, 107, 157, 0.6),
                0 0 40px rgba(195, 100, 255, 0.4);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  @media only screen and (max-width: 768px) {
    padding: 14px 32px;
    font-size: 1rem;
  }
`;

export const Right = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1);

  /* Add some glow around the canvas */
  canvas {
    border-radius: 20px;
    filter: drop-shadow(0 0 80px rgba(255, 107, 157, 0.3));
  }

  @media only screen and (max-width: 1200px) {
    height: 70vh;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 60vh;
    min-height: 400px;
  }
`;

export const Line = styled.img`
  height: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-30px);
    }
  }
`;
