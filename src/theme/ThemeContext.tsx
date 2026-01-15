import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Theme, defaultTheme, themes } from "./config";

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: keyof typeof themes) => void;
  availableThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const setTheme = (themeName: keyof typeof themes) => {
    setThemeState(themes[themeName] || defaultTheme);
  };

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--text', theme.colors.text);
    root.style.setProperty('--text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--glow', theme.colors.glow);
    root.style.setProperty('--particle', theme.colors.particle);
    root.style.setProperty('--gradient', theme.colors.gradient);

    // Update body background
    if (theme.name.includes('Rainbow')) {
      document.body.style.background = 'radial-gradient(ellipse at top, #1a0b2e 0%, #0F0326 50%, #000000 100%)';
    } else {
      document.body.style.background = 'radial-gradient(ellipse at top, #1a0030 0%, #0A0015 50%, #000000 100%)';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: themes }}>
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
