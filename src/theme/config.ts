export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

// Default theme
export const defaultTheme: Theme = {
  name: "Purple Dream",
  colors: {
    primary: "#da4ea2",
    secondary: "#3d1c56",
    accent: "#ec4899",
    background: "#0a0a0a",
    text: "#ffffff",
    textSecondary: "#d3d3d3",
  },
};

// Additional theme presets
export const themes: Record<string, Theme> = {
  purpleDream: defaultTheme,

  oceanBreeze: {
    name: "Ocean Breeze",
    colors: {
      primary: "#06b6d4",
      secondary: "#0e7490",
      accent: "#22d3ee",
      background: "#0a1929",
      text: "#ffffff",
      textSecondary: "#94a3b8",
    },
  },

  sunsetGlow: {
    name: "Sunset Glow",
    colors: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#fb923c",
      background: "#1a0b05",
      text: "#ffffff",
      textSecondary: "#fcd34d",
    },
  },

  forestMist: {
    name: "Forest Mist",
    colors: {
      primary: "#10b981",
      secondary: "#047857",
      accent: "#34d399",
      background: "#0a1f1a",
      text: "#ffffff",
      textSecondary: "#a7f3d0",
    },
  },

  midnightPurple: {
    name: "Midnight Purple",
    colors: {
      primary: "#8b5cf6",
      secondary: "#6d28d9",
      accent: "#a78bfa",
      background: "#0f0a1a",
      text: "#ffffff",
      textSecondary: "#c4b5fd",
    },
  },

  crimsonWave: {
    name: "Crimson Wave",
    colors: {
      primary: "#ef4444",
      secondary: "#991b1b",
      accent: "#f87171",
      background: "#1a0505",
      text: "#ffffff",
      textSecondary: "#fca5a5",
    },
  },
};

// Helper function to get theme
export const getTheme = (themeName: keyof typeof themes): Theme => {
  return themes[themeName] || defaultTheme;
};
