# 3D Interactive Portfolio ✨

A stunning, modern portfolio website featuring immersive 3D animations and interactive elements built with React, Three.js, and React Three Fiber.

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.157.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)

## 🌐 Live Demo

**Coming Soon:** `https://farzam76.github.io/portfolio/`

After enabling GitHub Pages in repository settings, your portfolio will be automatically deployed!

## 🎨 Features

- **Immersive 3D Animations** - Interactive sphere, cube, and geometric shapes with real-time rendering
- **Dynamic 3D Work Showcase** - Unique 3D models for each service/project type
- **Particle System** - Beautiful star field background with customizable particle effects
- **Theme System** - 6 pre-built color themes with easy customization
- **Smooth Animations** - Buttery smooth 60fps animations powered by React Spring
- **Responsive Design** - Fully responsive across all devices
- **Custom Scrollbar** - Themed scrollbar with gradient effects
- **Interactive Controls** - Orbit controls for 3D navigation
- **Modern Stack** - Built with React 18, TypeScript, and Vite for blazing fast performance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable 3D components
│   │   ├── AnimatedSphere/  # Interactive distortion sphere
│   │   ├── AnimatedCube/    # Rotating cube with glow effect
│   │   ├── Stars/           # Particle system background
│   │   ├── FloatingShapes/  # Ambient floating geometries
│   │   ├── WorkModels/      # 3D models for each work type
│   │   ├── LoadingScreen/   # Loading animation
│   │   └── ThemeSwitcher/   # Theme selection UI
│   ├── modules/
│   │   └── landing/         # Main landing page sections
│   │       ├── components/  # Hero, Who, Works, Contact
│   │       └── store/       # MobX state management
│   ├── theme/               # Theme configuration & context
│   │   ├── config.ts        # 6 pre-built themes
│   │   └── ThemeContext.tsx # Theme provider
│   └── index.css            # Global styles
├── CUSTOMIZATION_GUIDE.md   # Detailed customization instructions
├── CONTENT_TEMPLATE.md      # Content writing guide
└── README.md                # This file
```

## 🎨 Available Themes

1. **Purple Dream** - Purple and pink gradient (default)
2. **Ocean Breeze** - Cyan and blue tones
3. **Sunset Glow** - Orange and warm colors
4. **Forest Mist** - Green nature tones
5. **Midnight Purple** - Deep purple theme
6. **Crimson Wave** - Red and pink theme

Access the theme switcher by clicking the 🎨 button in the bottom-right corner!

## 📝 Customization

### Quick Content Update

See `CONTENT_TEMPLATE.md` for a step-by-step guide to updating:
- Hero section text
- About/bio information
- Services/skills list
- Contact information
- Colors and branding

### Advanced Customization

See `CUSTOMIZATION_GUIDE.md` for detailed instructions on:
- Creating custom themes
- Modifying 3D animations
- Adding new 3D components
- Adjusting particle effects
- Performance optimization

### Basic Theme Change

Edit `/src/theme/config.ts`:

```typescript
export const myTheme: Theme = {
  name: "My Theme",
  colors: {
    primary: "#your-color",
    secondary: "#your-color",
    accent: "#your-color",
    background: "#0a0a0a",
    text: "#ffffff",
    textSecondary: "#d3d3d3",
  }
};
```

## 🛠️ Tech Stack

- **Framework:** React 18.2 with TypeScript
- **Build Tool:** Vite 4.4
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animations:** React Spring
- **Styling:** Styled Components
- **State Management:** MobX + MobX State Tree
- **Forms:** EmailJS for contact form
- **Maps:** React Simple Maps

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "three": "^0.157.0",
  "@react-three/fiber": "^8.14.3",
  "@react-three/drei": "^9.86.3",
  "@react-spring/web": "^9.7.3",
  "styled-components": "^6.0.8",
  "mobx": "^6.10.2",
  "typescript": "^5.0.2"
}
```

## 🎯 Performance Tips

1. **Reduce particle count** for better mobile performance
2. **Adjust animation speeds** - slower = better performance
3. **Optimize images** - compress before adding
4. **Use lazy loading** - already implemented with Suspense
5. **Monitor FPS** - aim for 60fps on target devices

## 📱 Browser Support

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

**Note:** WebGL support required for 3D features.

## 🔧 Development

```bash
# Development with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Lint code
npm run lint
```

## 🚢 Deployment

### GitHub Pages (Automated) ✅

Your portfolio is configured for automatic deployment! See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete setup instructions.

**Quick Steps:**
1. Go to your repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to your branch
4. Visit: `https://farzam76.github.io/portfolio/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Other Platforms

The `dist/` folder contains production-ready files. You can also deploy to:
- Vercel
- Netlify
- Any static hosting service

## 📄 License

MIT License - feel free to use this portfolio template for your own projects!

## 🙏 Credits

- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- 3D helpers from [Drei](https://github.com/pmndrs/drei)
- Animations by [React Spring](https://www.react-spring.dev/)

## 💡 Tips

- Keep your 3D scenes simple for better performance
- Test on mobile devices regularly
- Use the theme system for consistent branding
- Optimize images before adding them
- Check CUSTOMIZATION_GUIDE.md for detailed instructions

## 🐛 Known Issues

- Some TypeScript strict mode warnings in legacy components
- Contact form requires EmailJS configuration
- Map component needs type definitions

---

**Ready to customize?** Start with `CONTENT_TEMPLATE.md`! 🎨

**Need technical help?** Check `CUSTOMIZATION_GUIDE.md`! 🔧

Made with ❤️ and Three.js
