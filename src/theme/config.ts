export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  gradient: string;
  glow: string;
  particle: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  effects: {
    blur: string;
    brightness: string;
  };
}

// 🦄 Rainbow Unicorn Theme - Magical, vibrant, dreamy
export const rainbowUnicorn: Theme = {
  name: "Rainbow Unicorn 🌈",
  colors: {
    primary: "#FF6B9D",        // Hot pink
    secondary: "#C364FF",      // Purple
    accent: "#4ECDC4",         // Cyan
    background: "#0F0326",     // Deep purple-black
    text: "#FFFFFF",
    textSecondary: "#E0B0FF",  // Mauve
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #C364FF 25%, #4ECDC4 50%, #FFE66D 75%, #FF6B9D 100%)",
    glow: "#FF6B9D",
    particle: "#FFE66D",       // Golden yellow
  },
  effects: {
    blur: "blur(20px)",
    brightness: "brightness(1.2)",
  },
};

// 🦄 Cyberpunk Gothic Unicorn Theme - Dark, edgy, neon, mysterious
export const cyberpunkGothicUnicorn: Theme = {
  name: "Cyberpunk Gothic 🦄",
  colors: {
    primary: "#00FFFF",        // Electric cyan
    secondary: "#FF00FF",      // Magenta
    accent: "#39FF14",         // Neon green
    background: "#0A0015",     // Near black with purple tint
    text: "#E0E0E0",
    textSecondary: "#B19CD9",  // Muted purple
    gradient: "linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #39FF14 100%)",
    glow: "#00FFFF",
    particle: "#FF00FF",
  },
  effects: {
    blur: "blur(30px)",
    brightness: "brightness(1.4)",
  },
};

// Default theme
export const defaultTheme: Theme = rainbowUnicorn;

// Only two epic unicorn themes
export const themes: Record<string, Theme> = {
  rainbowUnicorn,
  cyberpunkGothicUnicorn,
};

// Helper function to get theme
export const getTheme = (themeName: keyof typeof themes): Theme => {
  return themes[themeName] || defaultTheme;
};
