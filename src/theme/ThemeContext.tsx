import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Theme, defaultTheme, themes } from "./config";

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: keyof typeof themes) => void;
  availableThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Update CSS custom properties on the document root
const updateCSSVariables = (theme: Theme) => {
  const root = document.documentElement;

  // Core colors
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--background', theme.colors.background);
  root.style.setProperty('--text', theme.colors.text);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--glow', theme.colors.glow);
  root.style.setProperty('--particle', theme.colors.particle);
  root.style.setProperty('--gradient', theme.colors.gradient);

  // Effects
  root.style.setProperty('--blur', theme.effects.blur);
  root.style.setProperty('--brightness', theme.effects.brightness);

  // Update body background based on theme
  document.body.style.background = `radial-gradient(ellipse at top, ${theme.colors.background}ee 0%, ${theme.colors.background} 50%, #000000 100%)`;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [themeName, setThemeName] = useState<string>('rainbowUnicorn');

  // Apply CSS variables on initial load and theme change
  useEffect(() => {
    updateCSSVariables(theme);
  }, [theme]);

  const setTheme = useCallback((newThemeName: keyof typeof themes) => {
    const newTheme = themes[newThemeName] || defaultTheme;
    setThemeState(newTheme);
    setThemeName(newThemeName as string);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
