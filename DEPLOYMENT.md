# GitHub Pages Deployment Guide

Your portfolio is now configured for automatic deployment to GitHub Pages! 🚀

## 🎯 Quick Setup

Follow these steps to enable GitHub Pages for your repository:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/farzam76/portfolio`
2. Click on **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - Save the settings

### 2. Automatic Deployment

The GitHub Actions workflow is already set up! It will automatically:
- Build your portfolio whenever you push to the branch
- Deploy to GitHub Pages
- Update your live site

### 3. Access Your Live Portfolio

After the first deployment completes (takes ~2-3 minutes), your portfolio will be live at:

**URL:** `https://farzam76.github.io/portfolio/`

## 🔄 How It Works

Every time you push code to this branch or merge to main:
1. GitHub Actions automatically triggers
2. Installs dependencies and builds the project
3. Deploys the built files to GitHub Pages
4. Your live site updates automatically

## 📋 Check Deployment Status

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the deployment workflow running
3. Click on a workflow run to see detailed logs
4. Green checkmark = successful deployment ✅
5. Red X = deployment failed (check the logs)

## 🛠️ Manual Deployment (Optional)

If you want to deploy manually from your local machine:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Note:** The automated GitHub Actions approach is recommended as it's more reliable.

## ⚙️ Configuration Files

The following files configure GitHub Pages deployment:

- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`vite.config.ts`** - Sets base path to `/portfolio/`
- **`public/.nojekyll`** - Prevents Jekyll processing
- **`package.json`** - Contains deploy scripts

## 🌐 Custom Domain (Optional)

Want to use your own domain?

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain
3. Add CNAME record in your domain provider:
   - Type: CNAME
   - Name: www (or @)
   - Value: farzam76.github.io

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS for your site. It may take a few minutes after the first deployment for the SSL certificate to be issued.

## 📱 Testing Before Deployment

Always test locally before pushing:

```bash
# Run development server
npm run dev

# Build and preview production version
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Deployment Failed
- Check the Actions tab for error logs
- Ensure all dependencies are listed in package.json
- Verify the build completes locally with `npm run build`

### 404 Error on Live Site
- Wait a few minutes after first deployment
- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that the base path in vite.config.ts matches your repo name

### Assets Not Loading
- Verify the `base: '/portfolio/'` setting in vite.config.ts
- Clear your browser cache
- Check browser console for errors

### Changes Not Showing
- Check Actions tab to ensure deployment completed
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait ~1 minute for CDN to update

## 📊 Monitoring

- **Actions Tab**: See all deployment runs and their status
- **Environment**: Check the "Environments" section for deployment history
- **Commits**: Each commit shows deployment status

## 🎨 Next Steps

1. Enable GitHub Pages in repository settings
2. Wait for first deployment to complete
3. Visit your live portfolio
4. Share the URL with the world!

---

**Your portfolio URL will be:** `https://farzam76.github.io/portfolio/`

Happy deploying! 🚀
