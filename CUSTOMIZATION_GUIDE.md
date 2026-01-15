# 3D Portfolio Customization Guide

Welcome to your modern 3D portfolio! This guide will help you customize every aspect of your portfolio to make it truly yours.

## 🎨 Theme Customization

### Available Themes

Your portfolio comes with 6 pre-built themes that you can switch between instantly:

1. **Purple Dream** (default) - Purple and pink gradient
2. **Ocean Breeze** - Cyan and blue tones
3. **Sunset Glow** - Orange and warm colors
4. **Forest Mist** - Green nature tones
5. **Midnight Purple** - Deep purple theme
6. **Crimson Wave** - Red and pink theme

### How to Change Theme

Edit `/src/theme/config.ts` to change the default theme or add your own:

```typescript
export const defaultTheme: Theme = {
  name: "Your Theme Name",
  colors: {
    primary: "#your-color",      // Main accent color
    secondary: "#your-color",    // Secondary accent
    accent: "#your-color",       // Highlight color
    background: "#your-color",   // Background
    text: "#your-color",         // Main text
    textSecondary: "#your-color" // Secondary text
  }
};
```

## 🎭 3D Elements Customization

### Hero Section Sphere

Edit `/src/modules/landing/components/Hero/index.tsx`:

```tsx
<AnimatedSphere
  position={[0, 0, 0]}    // X, Y, Z position
  scale={2.2}              // Size of sphere
  color="#da4ea2"          // Color (use your theme)
  distort={0.6}            // How much distortion (0-1)
  speed={2}                // Animation speed
/>
```

### Stars Background

Customize the particle effect in any section:

```tsx
<Stars
  count={3000}    // Number of particles
  radius={0.8}    // Size of particles
  speed={0.3}     // Rotation speed
  color="#ffffff" // Particle color
/>
```

### Floating Shapes

Edit `/src/components/FloatingShapes/index.tsx` to:
- Add more shapes
- Change colors
- Adjust positions
- Modify animation speeds

## 📝 Content Customization

### Hero Section

File: `/src/modules/landing/components/Hero/index.tsx`

```tsx
<Title>Your Tagline</Title>
<Subtitle>Your Subtitle</Subtitle>
<Desc>Your description here</Desc>
<Button>Your CTA</Button>
```

### About/Who Section

File: `/src/modules/landing/components/Who/index.tsx`

```tsx
<Title>Your About Title</Title>
<Subtitle>Your Section Name</Subtitle>
<Desc>Your description</Desc>
```

### Works/Services Section

File: `/src/modules/landing/components/Works/index.tsx`

Modify the `data` array to change your services:

```typescript
const data = [
  "Your Service 1",
  "Your Service 2",
  "Your Service 3",
  // Add more services
];
```

## 🎬 Animation Customization

### Scroll Behavior

Edit `/src/index.css`:

```css
html {
  scroll-behavior: smooth;        /* smooth or auto */
  scroll-snap-type: y mandatory;  /* Enable snap scrolling */
}
```

### Section Transitions

Each section supports scroll-snap. Adjust in component styles:

```typescript
export const Section = styled.div`
  scroll-snap-align: center;  // start, center, or end
`;
```

## 🎨 Color Scheme

### Global Colors

All colors are managed through the theme system. To update globally:

1. Edit `/src/theme/config.ts`
2. Update the color values in your chosen theme
3. Colors will update throughout the entire portfolio

### Component-Specific Colors

Each 3D component accepts a `color` prop:

```tsx
<AnimatedCube color="#your-color" />
<AnimatedSphere color="#your-color" />
<WorkModel type="Web Design" /> // Uses theme colors
```

## 🔧 3D Model Customization

### Work Models

Edit `/src/components/WorkModels/index.tsx` to customize each work type's 3D representation:

```tsx
const YourCustomModel: React.FC = () => {
  return (
    <group>
      {/* Add your 3D shapes here */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#your-color" />
      </Sphere>
    </group>
  );
};
```

Available 3D shapes from `@react-three/drei`:
- `Sphere`
- `Box` / `RoundedBox`
- `Cone`
- `Cylinder`
- `Torus`
- `Plane`

## 📱 Responsive Design

All components are responsive. Breakpoint is set at 768px.

To adjust responsive behavior, edit the component's `styles.ts`:

```typescript
@media only screen and (max-width: 768px) {
  // Mobile styles
}
```

## ⚡ Performance Optimization

### Reduce Particle Count

Lower particle counts for better performance:

```tsx
<Stars count={1500} /> // Reduce from 3000
```

### Adjust Animation Speeds

Slower animations = better performance:

```tsx
<AnimatedSphere speed={1} /> // Reduce from 2
```

## 🎯 Quick Customization Checklist

- [ ] Update theme colors in `/src/theme/config.ts`
- [ ] Change hero title and description
- [ ] Update about section content
- [ ] Modify services/works list
- [ ] Adjust 3D element colors to match theme
- [ ] Customize particle counts for performance
- [ ] Update contact information
- [ ] Add your own images/assets
- [ ] Test on mobile devices

## 🚀 Advanced Customization

### Adding New 3D Components

1. Create a new component in `/src/components/YourComponent/`
2. Import Three.js and React Three Fiber
3. Use `useFrame` hook for animations
4. Export and use in your sections

### Custom Animations

Use the `useFrame` hook from `@react-three/fiber`:

```tsx
useFrame((state) => {
  if (meshRef.current) {
    meshRef.current.rotation.y = state.clock.elapsedTime;
  }
});
```

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Styled Components](https://styled-components.com/)

## 💡 Tips

1. **Keep it simple** - Don't overload with too many 3D elements
2. **Test performance** - Check on lower-end devices
3. **Match colors** - Use the theme system for consistency
4. **Optimize images** - Compress images before using
5. **Mobile first** - Always test mobile responsiveness

---

Enjoy customizing your 3D portfolio! 🎨✨
