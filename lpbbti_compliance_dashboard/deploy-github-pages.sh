#!/bin/bash

# Script untuk deploy LPBBTI Compliance Dashboard ke GitHub Pages
# Usage: ./deploy-github-pages.sh

set -e

echo "🚀 LPBBTI Compliance Dashboard - GitHub Pages Deployment"
echo "=========================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard.git"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🔨 Building application..."
pnpm run build

echo "✅ Build successful!"
echo ""
echo "📝 Next steps:"
echo "1. Commit the build files:"
echo "   git add ."
echo "   git commit -m 'Build: production build for GitHub Pages'"
echo ""
echo "2. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "3. Go to your repository settings and enable GitHub Pages:"
echo "   - Settings → Pages"
echo "   - Source: main branch"
echo "   - Folder: / (root)"
echo ""
echo "4. Your site will be available at:"
echo "   https://YOUR_USERNAME.github.io/lpbbti_compliance_dashboard"
echo ""
echo "🎉 Deployment ready!"
