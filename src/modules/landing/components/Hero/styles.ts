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

// Full-screen 3D canvas container (background layer)
export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// Main 3D showcase area - takes 60-70% of screen in foreground
export const ThreeDShowcase = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 80vh;
  z-index: 5;
  pointer-events: auto;

  canvas {
    filter: drop-shadow(0 0 100px var(--glow, rgba(255, 107, 157, 0.4)));
  }

  @media only screen and (max-width: 1200px) {
    width: 75vw;
    left: 50%;
  }

  @media only screen and (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    height: 50vh;
    min-height: 350px;
  }
`;

export const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;
  position: relative;
  z-index: 10;
  pointer-events: none;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 20px;
    justify-content: flex-end;
    padding-bottom: 60px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 500px;
  pointer-events: auto;
  animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1);

  /* Glass morphism background */
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    gap: 20px;
    max-width: 100%;
    padding: 30px 20px;
    margin-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
  position: relative;

  /* Animated gradient text using CSS variables */
  background: linear-gradient(
    135deg,
    var(--primary, #FF6B9D) 0%,
    var(--secondary, #C364FF) 25%,
    var(--accent, #4ECDC4) 50%,
    var(--particle, #FFE66D) 75%,
    var(--primary, #FF6B9D) 100%
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
  filter: drop-shadow(0 0 30px var(--glow, rgba(255, 107, 157, 0.5)))
          drop-shadow(0 0 60px var(--secondary, rgba(195, 100, 255, 0.3)));

  @media only screen and (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
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
    background: linear-gradient(90deg, var(--primary, #FF6B9D), var(--secondary, #C364FF));
    box-shadow: 0 0 10px var(--primary, #FF6B9D);
    animation: pulse 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  margin: 0;
  color: var(--primary, #FF6B9D);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px var(--glow, rgba(255, 107, 157, 0.6));
`;

export const Desc = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.8;
  color: var(--text, rgba(255, 255, 255, 0.85));
  max-width: 500px;
  font-weight: 400;
  letter-spacing: 0.01em;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, var(--primary, #FF6B9D) 0%, var(--secondary, #C364FF) 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 16px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px color-mix(in srgb, var(--primary, #FF6B9D) 40%, transparent);
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
    box-shadow:
      0 12px 35px color-mix(in srgb, var(--primary, #FF6B9D) 60%, transparent),
      0 0 40px color-mix(in srgb, var(--secondary, #C364FF) 40%, transparent);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  @media only screen and (max-width: 768px) {
    padding: 14px 32px;
    font-size: 0.9rem;
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
    filter: drop-shadow(0 0 80px var(--glow, rgba(255, 107, 157, 0.3)));
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
