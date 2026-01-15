import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const SwitcherContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ThemeButton = styled.button<{ $primary: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$primary};
  background: linear-gradient(135deg, ${(props) => props.$primary} 0%, #8b5cf6 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px ${(props) => props.$primary}66;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${(props) => props.$primary}99;
  }

  @media only screen and (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
`;

const ThemeMenu = styled.div<{ $isOpen: boolean; $primary: string }>`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid ${(props) => props.$primary};
  border-radius: 10px;
  padding: 15px;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const ThemeOption = styled.button<{ $color: string; $isActive: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => props.$color};
  background: ${(props) =>
    props.$isActive
      ? `linear-gradient(135deg, ${props.$color}60 0%, ${props.$color}30 100%)`
      : `linear-gradient(135deg, ${props.$color}20 0%, transparent 100%)`
  };
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 14px;
  font-weight: ${(props) => props.$isActive ? '700' : '500'};

  &:hover {
    background: linear-gradient(135deg, ${(props) => props.$color}40 0%, ${(props) => props.$color}20 100%);
    transform: translateX(-5px);
    box-shadow: 0 4px 15px ${(props) => props.$color}40;
  }
`;

const ThemeLabel = styled.div<{ $primary: string }>`
  font-size: 12px;
  color: ${(props) => props.$primary};
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, availableThemes } = useTheme();

  const handleThemeSelect = (themeKey: string) => {
    setTheme(themeKey as keyof typeof availableThemes);
    setIsOpen(false);
  };

  return (
    <SwitcherContainer>
      <ThemeMenu $isOpen={isOpen} $primary={theme.colors.primary}>
        <ThemeLabel $primary={theme.colors.primary}>Choose Theme</ThemeLabel>
        {Object.entries(availableThemes).map(([key, themeOption]) => (
          <ThemeOption
            key={key}
            $color={themeOption.colors.primary}
            $isActive={theme.name === themeOption.name}
            onClick={() => handleThemeSelect(key)}
          >
            {themeOption.name}
          </ThemeOption>
        ))}
      </ThemeMenu>
      <ThemeButton $primary={theme.colors.primary} onClick={() => setIsOpen(!isOpen)}>
        🎨
      </ThemeButton>
    </SwitcherContainer>
  );
};
