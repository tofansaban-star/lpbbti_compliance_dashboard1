# Quick Start: Deploy LPBBTI Dashboard dalam 5 Menit

Panduan cepat untuk deploy aplikasi ke hosting gratis. Pilih salah satu opsi di bawah.

---

## ⚡ Opsi 1: GitHub Pages (Paling Cepat)

### Langkah 1: Siapkan GitHub Repository

```bash
cd /home/ubuntu/lpbbti_compliance_dashboard

# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Add remote (ganti YOUR_USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard.git
git push -u origin main
```

### Langkah 2: Build & Push

```bash
# Build aplikasi
pnpm run build

# Commit build files
git add dist/
git commit -m "Build: production"
git push
```

### Langkah 3: Enable GitHub Pages

1. Buka https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard
2. Masuk ke **Settings → Pages**
3. Pilih branch `main` dan folder `/` (root)
4. Klik **Save**

### Langkah 4: Akses

Aplikasi akan tersedia di:
```
https://YOUR_USERNAME.github.io/lpbbti_compliance_dashboard
```

**Waktu setup: ~3 menit** ⏱️

---

## ⚡ Opsi 2: Netlify (Paling User-Friendly)

### Langkah 1: Push ke GitHub

Sama seperti Opsi 1, push repository ke GitHub.

### Langkah 2: Connect ke Netlify

1. Buka https://app.netlify.com
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Pilih repository `lpbbti_compliance_dashboard`
5. Di **Build settings**:
   - Build command: `pnpm run build`
   - Publish directory: `dist/public`
6. Klik **Deploy site**

### Langkah 3: Akses

Aplikasi akan tersedia di:
```
https://your-site-name.netlify.app
```

**Waktu setup: ~2 menit** ⏱️

---

## ⚡ Opsi 3: Cloudflare Pages (Paling Cepat Global)

### Langkah 1: Push ke GitHub

Sama seperti Opsi 1.

### Langkah 2: Connect ke Cloudflare

1. Buka https://dash.cloudflare.com
2. Klik **Pages** di sidebar
3. Klik **Create a project** → **Connect to Git**
4. Authorize GitHub dan pilih repository
5. Di **Build settings**:
   - Build command: `pnpm run build`
   - Build output directory: `dist/public`
6. Klik **Save and Deploy**

### Langkah 3: Akses

Aplikasi akan tersedia di:
```
https://your-site-name.pages.dev
```

**Waktu setup: ~2 menit** ⏱️

---

## 🐳 Opsi 4: Docker (Untuk Self-Hosted)

Jika Anda punya VPS atau server sendiri:

### Langkah 1: Build Docker Image

```bash
cd /home/ubuntu/lpbbti_compliance_dashboard
docker build -t lpbbti-dashboard .
```

### Langkah 2: Run Container

```bash
docker run -p 3000:3000 lpbbti-dashboard
```

### Langkah 3: Akses

Aplikasi akan tersedia di:
```
http://localhost:3000
```

**Catatan:** Untuk production, setup reverse proxy (Nginx) dan SSL certificate.

---

## 📋 Perbandingan Cepat

| Platform | Setup Time | Biaya | Domain | Uptime | Rekomendasi |
|----------|-----------|-------|--------|--------|-------------|
| GitHub Pages | 3 min | Gratis | `username.github.io` | 99.9% | ⭐⭐⭐ |
| Netlify | 2 min | Gratis | `site.netlify.app` | 99.95% | ⭐⭐⭐ |
| Cloudflare Pages | 2 min | Gratis | `site.pages.dev` | 99.99% | ⭐⭐⭐ |
| Docker (Self-hosted) | 5 min | Gratis* | Sesuai server | Tergantung | ⭐⭐ |

*Gratis jika Anda punya server sendiri

---

## ✅ Pre-Deployment Checklist

Sebelum deploy, pastikan:

- [ ] Aplikasi berjalan lokal: `pnpm run dev`
- [ ] Build berhasil: `pnpm run build`
- [ ] Preview build: `pnpm run preview`
- [ ] Semua file sudah di-commit ke Git
- [ ] `.gitignore` sudah benar

---

## 🆘 Troubleshooting Cepat

**Q: Build error "Cannot find module"**
```bash
pnpm install
pnpm run build
```

**Q: Aplikasi blank setelah deploy**
- Check browser console (F12)
- Pastikan `base` di vite.config.ts benar

**Q: Deployment tidak otomatis**
- Pastikan Anda push ke branch `main`
- Check deployment logs di platform (Netlify/Cloudflare)

---

## 📞 Next Steps

Setelah deploy berhasil:

1. **Backup regulasi custom** - Export regulasi ke JSON
2. **Share URL** - Bagikan link ke tim compliance
3. **Monitor uptime** - Setup uptime monitoring (gratis di UptimeRobot)
4. **Custom domain** - (Opsional) Setup domain custom Anda

---

## 🎯 Rekomendasi Akhir

**Untuk Anda:** Gunakan **GitHub Pages** atau **Netlify**
- Paling sederhana
- Deployment otomatis
- 100% gratis selamanya
- Tidak ada vendor lock-in

**Pilih GitHub Pages jika:** Anda sudah familiar dengan Git
**Pilih Netlify jika:** Anda ingin interface yang lebih user-friendly

---

**Versi**: 1.0  
**Last Updated**: Mei 2026
