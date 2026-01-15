import React, { useState } from "react";
import styled from "styled-components";
import { themes } from "../../theme/config";

const SwitcherContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ThemeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #da4ea2;
  background: linear-gradient(135deg, #da4ea2 0%, #8b5cf6 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(218, 78, 162, 0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(218, 78, 162, 0.6);
  }

  @media only screen and (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
`;

const ThemeMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid #da4ea2;
  border-radius: 10px;
  padding: 15px;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const ThemeOption = styled.button<{ $color: string }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => props.$color};
  background: linear-gradient(135deg, ${(props) => props.$color}20 0%, transparent 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, ${(props) => props.$color}40 0%, ${(props) => props.$color}20 100%);
    transform: translateX(-5px);
    box-shadow: 0 4px 15px ${(props) => props.$color}40;
  }
`;

const ThemeLabel = styled.div`
  font-size: 12px;
  color: #da4ea2;
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface ThemeSwitcherProps {
  onThemeChange?: (themeName: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeName: string, color: string) => {
    // Update CSS variables for dynamic theme switching
    document.documentElement.style.setProperty('--primary-color', color);
    setIsOpen(false);
    if (onThemeChange) {
      onThemeChange(themeName);
    }
  };

  return (
    <SwitcherContainer>
      <ThemeMenu $isOpen={isOpen}>
        <ThemeLabel>Choose Theme</ThemeLabel>
        {Object.entries(themes).map(([key, theme]) => (
          <ThemeOption
            key={key}
            $color={theme.colors.primary}
            onClick={() => handleThemeSelect(theme.name, theme.colors.primary)}
          >
            {theme.name}
          </ThemeOption>
        ))}
      </ThemeMenu>
      <ThemeButton onClick={() => setIsOpen(!isOpen)}>
        🎨
      </ThemeButton>
    </SwitcherContainer>
  );
};
