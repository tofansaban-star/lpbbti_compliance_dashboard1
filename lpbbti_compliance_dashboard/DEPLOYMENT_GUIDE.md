# Panduan Deployment LPBBTI Compliance Dashboard ke Hosting Gratis

## 📋 Ringkasan Pilihan Hosting Gratis

Berikut adalah perbandingan pilihan hosting gratis yang paling cocok untuk aplikasi static React Anda:

| Platform | Biaya | Domain Gratis | Storage | Uptime | Setup | Rekomendasi |
|----------|-------|---------------|---------|--------|-------|-------------|
| **GitHub Pages** | Gratis | `username.github.io` | Unlimited | 99.9% | Mudah | ⭐⭐⭐ Terbaik |
| **Netlify** | Gratis | `site.netlify.app` | 100GB/bulan | 99.95% | Sangat Mudah | ⭐⭐⭐ Sangat Baik |
| **Vercel** | Gratis | `site.vercel.app` | 100GB/bulan | 99.95% | Sangat Mudah | ⭐⭐⭐ Sangat Baik |
| **Surge.sh** | Gratis | `site.surge.sh` | Unlimited | 99.9% | Mudah | ⭐⭐ Baik |
| **Cloudflare Pages** | Gratis | `site.pages.dev` | Unlimited | 99.99% | Mudah | ⭐⭐⭐ Sangat Baik |
| **Render (Static)** | Gratis | `site.onrender.com` | Unlimited | 99.9% | Mudah | ⭐⭐ Baik |

---

## 🎯 Rekomendasi Terbaik: GitHub Pages + Cloudflare Pages

Untuk kasus Anda, saya merekomendasikan **kombinasi GitHub Pages + Cloudflare Pages**:

### Alasan:
1. **100% Gratis selamanya** - Tidak ada biaya hidden atau trial period
2. **Tidak ada vendor lock-in** - Source code Anda tetap di GitHub (milik Anda)
3. **Uptime tinggi** - GitHub Pages (99.9%) + Cloudflare (99.99%)
4. **Easy to maintain** - Cukup push ke GitHub, deployment otomatis
5. **Custom domain support** - Bisa pakai domain gratis atau domain custom Anda sendiri

### Workflow:
```
Your Computer → Git Push → GitHub Repository → GitHub Pages (Automatic Deploy)
                                            ↓
                                    Cloudflare Pages (Optional, untuk CDN global)
```

---

## 🚀 Opsi 1: GitHub Pages (Paling Sederhana)

### Kelebihan:
- Paling sederhana dan paling stabil
- Terintegrasi langsung dengan GitHub
- Deployment otomatis saat push ke branch `main`
- Domain gratis: `username.github.io/lpbbti_compliance_dashboard`

### Kekurangan:
- Domain agak panjang (bisa diperbaiki dengan custom domain)
- Tidak bisa custom domain gratis (perlu beli domain sendiri)

### Langkah-Langkah:

#### 1. Siapkan Repository GitHub
```bash
# Jika belum ada akun GitHub, buat di https://github.com/signup

# Clone atau inisialisasi repository
cd /home/ubuntu/lpbbti_compliance_dashboard
git init
git add .
git commit -m "Initial commit: LPBBTI Compliance Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard.git
git push -u origin main
```

#### 2. Konfigurasi GitHub Pages

1. Buka repository di GitHub
2. Masuk ke **Settings → Pages**
3. Di bagian "Source", pilih:
   - Branch: `main`
   - Folder: `/ (root)` atau `/dist/public` (tergantung build output)
4. Klik **Save**

#### 3. Build dan Deploy

```bash
# Build aplikasi
cd /home/ubuntu/lpbbti_compliance_dashboard
pnpm run build

# GitHub Pages akan otomatis mengambil file dari branch main
# Jika menggunakan /dist/public, pastikan folder ini di-commit ke GitHub
git add dist/
git commit -m "Build: production build"
git push
```

#### 4. Akses Aplikasi

Aplikasi akan tersedia di:
```
https://YOUR_USERNAME.github.io/lpbbti_compliance_dashboard
```

---

## 🚀 Opsi 2: Netlify (Paling User-Friendly)

### Kelebihan:
- Interface yang sangat user-friendly
- Deployment otomatis dari GitHub
- Domain gratis: `site.netlify.app`
- Build environment yang powerful
- Continuous deployment dengan preview

### Kekurangan:
- Perlu account Netlify (tapi bisa pakai GitHub login)
- Domain default agak panjang

### Langkah-Langkah:

#### 1. Push ke GitHub (sama seperti opsi 1)

#### 2. Connect ke Netlify

1. Buka https://app.netlify.com
2. Klik **"New site from Git"**
3. Pilih **GitHub** dan authorize
4. Pilih repository `lpbbti_compliance_dashboard`
5. Di bagian **Build settings**:
   - Build command: `pnpm run build`
   - Publish directory: `dist/public`
6. Klik **Deploy site**

#### 3. Akses Aplikasi

Aplikasi akan tersedia di:
```
https://your-site-name.netlify.app
```

---

## 🚀 Opsi 3: Cloudflare Pages (Paling Cepat Globally)

### Kelebihan:
- Uptime tertinggi (99.99%)
- CDN global tercepat
- Domain gratis: `site.pages.dev`
- Unlimited bandwidth
- Build environment yang powerful

### Kekurangan:
- Interface sedikit lebih kompleks
- Perlu account Cloudflare

### Langkah-Langkah:

#### 1. Push ke GitHub

#### 2. Connect ke Cloudflare Pages

1. Buka https://dash.cloudflare.com
2. Klik **Pages** di sidebar
3. Klik **Create a project**
4. Pilih **Connect to Git** → **GitHub**
5. Authorize dan pilih repository
6. Di bagian **Build settings**:
   - Framework preset: `React`
   - Build command: `pnpm run build`
   - Build output directory: `dist/public`
7. Klik **Save and Deploy**

#### 3. Akses Aplikasi

Aplikasi akan tersedia di:
```
https://your-site-name.pages.dev
```

---

## 🌐 Opsi 4: Surge.sh (Tercepat untuk Deploy)

### Kelebihan:
- Deploy hanya dengan satu command
- Paling cepat untuk setup
- Domain gratis: `site.surge.sh`

### Kekurangan:
- Tidak ada continuous deployment otomatis
- Perlu manual deploy setiap kali ada update

### Langkah-Langkah:

#### 1. Install Surge CLI
```bash
npm install -g surge
```

#### 2. Build Aplikasi
```bash
cd /home/ubuntu/lpbbti_compliance_dashboard
pnpm run build
```

#### 3. Deploy
```bash
surge dist/public --domain lpbbti-compliance.surge.sh
```

#### 4. Akses Aplikasi
```
https://lpbbti-compliance.surge.sh
```

---

## 🔧 Persiapan File untuk Deployment

### 1. Pastikan `package.json` sudah benar

```json
{
  "name": "lpbbti_compliance_dashboard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview --host"
  }
}
```

### 2. Pastikan `vite.config.ts` sudah benar

```typescript
export default defineConfig({
  base: "/lpbbti_compliance_dashboard/", // Jika di subdirectory
  // atau
  base: "/", // Jika di root domain
  
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
  },
});
```

### 3. Build Lokal untuk Testing

```bash
cd /home/ubuntu/lpbbti_compliance_dashboard
pnpm run build
pnpm run preview
```

Buka browser di `http://localhost:4173` untuk test build production.

---

## 📦 Dockerfile untuk Self-Hosted (Opsional)

Jika Anda ingin self-host di server sendiri (VPS, Docker, dll), gunakan Dockerfile ini:

```dockerfile
# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install simple HTTP server
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist/public ./public

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "public", "-l", "3000"]
```

### Build dan Run:
```bash
# Build image
docker build -t lpbbti-dashboard .

# Run container
docker run -p 3000:3000 lpbbti-dashboard
```

---

## ✅ Checklist Pre-Deployment

Sebelum deploy, pastikan:

- [ ] Aplikasi berjalan dengan baik di local (`pnpm run dev`)
- [ ] Build production berhasil (`pnpm run build`)
- [ ] Preview build berjalan dengan baik (`pnpm run preview`)
- [ ] Semua file sudah di-commit ke Git
- [ ] `.gitignore` sudah benar (exclude `node_modules`, `dist`, dll)
- [ ] Environment variables sudah di-setup (jika ada)
- [ ] Source code sudah di-backup

---

## 🔄 Update & Maintenance

### Untuk GitHub Pages / Netlify / Cloudflare Pages:

```bash
# Setiap kali ada update:
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main

# Deployment otomatis akan berjalan
```

### Untuk Surge.sh:

```bash
# Setiap kali ada update:
pnpm run build
surge dist/public --domain lpbbti-compliance.surge.sh
```

---

## 🆘 Troubleshooting

### Error: "Cannot find module"
```bash
pnpm install
pnpm run build
```

### Error: "Build failed"
- Pastikan Node.js version 18+: `node --version`
- Pastikan pnpm terinstall: `npm install -g pnpm`
- Coba clear cache: `pnpm store prune`

### Aplikasi tidak muncul setelah deploy
- Check browser console (F12) untuk error messages
- Pastikan `base` di `vite.config.ts` sudah benar
- Pastikan build output directory benar

### Custom domain tidak bekerja
- Untuk GitHub Pages: Tambahkan file `CNAME` di root dengan isi domain Anda
- Untuk Netlify: Setup DNS records di domain registrar
- Untuk Cloudflare Pages: Setup DNS records di Cloudflare

---

## 📞 Support & Resources

- **GitHub Pages Docs**: https://pages.github.com/
- **Netlify Docs**: https://docs.netlify.com/
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Vite Build Guide**: https://vitejs.dev/guide/build.html

---

## 🎯 Rekomendasi Final

Untuk kasus Anda, saya merekomendasikan:

1. **Pilihan Terbaik**: **GitHub Pages**
   - Paling sederhana
   - Terintegrasi dengan Git workflow Anda
   - Deployment otomatis
   - Domain: `username.github.io/lpbbti_compliance_dashboard`

2. **Alternatif Terbaik**: **Netlify** atau **Cloudflare Pages**
   - Lebih user-friendly
   - Lebih banyak fitur
   - Deployment otomatis dari GitHub

Semua opsi di atas **100% gratis** dan **tidak ada vendor lock-in** karena source code Anda tetap di GitHub milik Anda.

---

**Versi**: 1.0  
**Last Updated**: Mei 2026  
**Status**: Production Ready
