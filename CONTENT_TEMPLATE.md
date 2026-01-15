# Portfolio Content Template

Use this template to quickly update your portfolio content.

## 🎯 Hero Section

**Location:** `/src/modules/landing/components/Hero/index.tsx`

```tsx
<Title>Your Name / Brand</Title>
<Subtitle>Your Role or Tagline</Subtitle>
<Desc>
  Brief description of what you do and your passion.
  Keep it concise and impactful!
</Desc>
<Button>Your CTA (e.g., "See My Work")</Button>
```

**Example:**
```tsx
<Title>John Smith</Title>
<Subtitle>Full Stack Developer</Subtitle>
<Desc>
  I build beautiful, performant web experiences with modern technologies.
  Passionate about clean code and user-centric design.
</Desc>
<Button>View Projects</Button>
```

---

## 👤 About/Who Section

**Location:** `/src/modules/landing/components/Who/index.tsx`

```tsx
<Title>Your About Title</Title>
<Subtitle>About / Who I Am</Subtitle>
<Desc>
  Tell your story. What drives you? What's your background?
  What makes you unique?
</Desc>
<Button>Download Resume / Learn More</Button>
```

**Example:**
```tsx
<Title>Creative Problem Solver</Title>
<Subtitle>Who I Am</Subtitle>
<Desc>
  With 5+ years in web development, I specialize in creating
  interactive experiences that engage users and drive results.
</Desc>
<Button>Download CV</Button>
```

---

## 💼 Works/Services Section

**Location:** `/src/modules/landing/components/Works/index.tsx`

### Update Services List

```typescript
const data = [
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
];
```

**Example:**
```typescript
const data = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "Brand Identity",
  "Consulting",
];
```

### Customize 3D Models

Each service has a unique 3D model. You can customize them in:
`/src/components/WorkModels/index.tsx`

Or create your own models!

---

## 📧 Contact Section

**Location:** `/src/modules/landing/components/Contacts/index.tsx`

### Update Contact Form

1. **Email Service:** Currently using EmailJS
2. **Your Email Settings:** Update in the Contact component
3. **Form Fields:** Name, Email, Message (customizable)

### Add Your Contact Info

```tsx
// Add your social links
const socialLinks = {
  github: "your-github-url",
  linkedin: "your-linkedin-url",
  twitter: "your-twitter-url",
  email: "your-email@example.com"
};
```

---

## 🎨 Personal Branding

### Colors

Choose your brand colors in `/src/theme/config.ts`:

```typescript
export const myTheme: Theme = {
  name: "My Brand",
  colors: {
    primary: "#your-primary-color",    // Main brand color
    secondary: "#your-secondary-color", // Supporting color
    accent: "#your-accent-color",      // Highlights
    background: "#0a0a0a",             // Dark background
    text: "#ffffff",                   // Text color
    textSecondary: "#d3d3d3",          // Secondary text
  }
};
```

### Typography

Update fonts in `/src/index.css`:

```css
:root {
  font-family: 'Your Font', Inter, system-ui, sans-serif;
}
```

To add a custom font:
1. Add to `/public/fonts/` or use Google Fonts
2. Import in `index.css`
3. Update font-family

---

## 📸 Images & Assets

### Add Your Images

1. **Portfolio Images:** Place in `/public/images/`
2. **Profile Photo:** `/public/images/profile.jpg`
3. **Project Screenshots:** `/public/images/projects/`

### Reference Images

```tsx
<img src="/images/your-image.jpg" alt="Description" />
```

### Background Images

For 3D textures:
```tsx
const texture = useTexture('/images/your-texture.jpg');
```

---

## 🚀 Projects Showcase

### Add Your Projects

Create a projects array in `/src/modules/landing/components/Works/`:

```typescript
const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description",
    image: "/images/projects/project1.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://project-url.com",
    github: "https://github.com/you/project"
  },
  // Add more projects
];
```

---

## 📱 Navigation

**Location:** `/src/modules/landing/components/Navbar/index.tsx`

Update menu items:

```tsx
const menuItems = [
  { label: "Home", link: "#hero" },
  { label: "About", link: "#about" },
  { label: "Work", link: "#work" },
  { label: "Contact", link: "#contact" }
];
```

---

## ✅ Content Checklist

Before launching, make sure you've updated:

- [ ] Hero title and description
- [ ] Your name/brand in navbar
- [ ] About section content
- [ ] Services/skills list
- [ ] Contact email configuration
- [ ] Social media links
- [ ] Project portfolio items
- [ ] Theme colors to match your brand
- [ ] Images and assets
- [ ] Meta tags for SEO (in `index.html`)
- [ ] Favicon (in `/public/`)

---

## 💡 Content Writing Tips

1. **Be Concise:** Keep descriptions short and impactful
2. **Show Personality:** Let your unique voice shine through
3. **Focus on Value:** What can you do for clients/employers?
4. **Use Action Words:** "Build", "Create", "Design", "Develop"
5. **Tell a Story:** Make it memorable and relatable
6. **Proofread:** Check for typos and grammar
7. **Update Regularly:** Keep content fresh and current

---

## 🎯 SEO & Meta Tags

Update in `/index.html`:

```html
<title>Your Name - Your Title</title>
<meta name="description" content="Your portfolio description">
<meta name="keywords" content="your, keywords, here">
<meta property="og:title" content="Your Name Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="/images/og-image.jpg">
```

---

Need help? Check the `CUSTOMIZATION_GUIDE.md` for technical details!
