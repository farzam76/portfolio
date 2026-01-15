import React, { createContext, useContext, useState, ReactNode } from "react";
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
