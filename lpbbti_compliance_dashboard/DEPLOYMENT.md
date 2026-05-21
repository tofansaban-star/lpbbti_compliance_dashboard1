# Panduan Deployment LPBBTI Compliance Dashboard

Aplikasi ini adalah **Static Web Application** yang dapat di-deploy secara gratis ke berbagai platform tanpa biaya bulanan. Berikut adalah panduan deployment untuk setiap platform.

---

## 1. Deployment ke GitHub Pages (Gratis, Recommended)

GitHub Pages memberikan hosting gratis selamanya untuk repository publik atau privat.

### Langkah-langkah:

1. **Siapkan Repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LPBBTI Compliance Dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lpbbti-compliance-dashboard.git
   git push -u origin main
   ```

2. **Konfigurasi GitHub Pages**
   - Buka repository Anda di GitHub
   - Masuk ke **Settings → Pages**
   - Pilih **Deploy from a branch**
   - Pilih branch: `main`
   - Pilih folder: `/ (root)`
   - Klik **Save**

3. **Build dan Deploy**
   ```bash
   pnpm build
   ```
   Hasil build akan ada di folder `dist/public/`

4. **Konfigurasi Vite untuk GitHub Pages**
   Edit `vite.config.ts` dan tambahkan:
   ```typescript
   export default defineConfig({
     base: '/lpbbti-compliance-dashboard/',  // Ganti dengan nama repo Anda
     // ... rest of config
   })
   ```

5. **Deploy**
   Gunakan GitHub Actions untuk auto-deploy setiap kali push:
   
   Buat file `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: pnpm/action-setup@v2
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist/public
   ```

6. **Akses Aplikasi**
   URL: `https://YOUR_USERNAME.github.io/lpbbti-compliance-dashboard/`

---

## 2. Deployment ke Vercel (Gratis)

Vercel menyediakan hosting gratis dengan deployment otomatis dari GitHub.

### Langkah-langkah:

1. **Siapkan Repository GitHub** (seperti di atas)

2. **Daftar di Vercel**
   - Buka https://vercel.com
   - Klik "Sign Up" dan pilih "Continue with GitHub"
   - Authorize Vercel untuk akses repository Anda

3. **Import Project**
   - Klik "New Project"
   - Pilih repository `lpbbti-compliance-dashboard`
   - Vercel akan auto-detect Vite configuration

4. **Konfigurasi Build**
   - Framework Preset: **Vite**
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Klik **Deploy**

5. **Akses Aplikasi**
   URL: `https://lpbbti-compliance-dashboard.vercel.app/` (atau custom domain)

6. **Custom Domain (Opsional)**
   - Di dashboard Vercel, masuk ke **Settings → Domains**
   - Tambahkan domain custom Anda
   - Update DNS records sesuai petunjuk Vercel

---

## 3. Deployment ke Netlify (Gratis)

Netlify juga menyediakan hosting gratis dengan fitur lengkap.

### Langkah-langkah:

1. **Siapkan Repository GitHub** (seperti di atas)

2. **Daftar di Netlify**
   - Buka https://netlify.com
   - Klik "Sign up" dan pilih "GitHub"
   - Authorize Netlify untuk akses repository

3. **Deploy**
   - Klik "New site from Git"
   - Pilih repository `lpbbti-compliance-dashboard`
   - Build command: `pnpm build`
   - Publish directory: `dist/public`
   - Klik **Deploy site**

4. **Akses Aplikasi**
   URL: `https://lpbbti-compliance-dashboard.netlify.app/` (atau custom domain)

---

## 4. Deployment Manual ke Server Sendiri

Jika Anda memiliki server sendiri (VPS, dedicated server, dll):

### Langkah-langkah:

1. **Build Aplikasi**
   ```bash
   pnpm build
   ```

2. **Upload ke Server**
   ```bash
   scp -r dist/public/* user@your-server.com:/var/www/html/
   ```

3. **Konfigurasi Web Server (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Enable HTTPS (Recommended)**
   ```bash
   sudo certbot certonly --nginx -d your-domain.com
   ```

---

## Perbandingan Platform

| Platform | Biaya | Setup | Custom Domain | SSL | Auto-Deploy |
| --- | --- | --- | --- | --- | --- |
| **GitHub Pages** | Gratis | Mudah | Ya | Ya | Ya (via Actions) |
| **Vercel** | Gratis | Sangat Mudah | Ya | Ya | Ya (Otomatis) |
| **Netlify** | Gratis | Sangat Mudah | Ya | Ya | Ya (Otomatis) |
| **Server Sendiri** | Berbayar | Kompleks | Ya | Perlu setup | Manual |

---

## Fitur Penting untuk Deployment

### 1. Local Storage
Aplikasi menyimpan data checklist di **Local Storage** browser. Data tidak akan hilang selama browser cache tidak dihapus.

### 2. Export Functionality
- **Export ke Google Calendar (.ics)**: Pengguna dapat membuka event langsung di Google Calendar
- **Export CSV**: Untuk import ke Excel atau tools lain
- Data disimpan di client-side, tidak ada server yang diperlukan

### 3. Search Functionality
Semua pencarian dilakukan secara lokal di browser menggunakan JavaScript. Tidak ada API call yang diperlukan.

---

## Environment Variables

Aplikasi ini tidak memerlukan environment variables khusus untuk production. Semua konfigurasi sudah built-in.

---

## Performance Optimization

Aplikasi sudah dioptimasi untuk performa:
- **Code Splitting**: Vite secara otomatis melakukan code splitting
- **Asset Optimization**: CSS dan JS di-minify
- **Caching**: Static assets di-cache oleh browser
- **No External Dependencies**: Semua library sudah di-bundle

---

## Troubleshooting

### Aplikasi tidak berjalan setelah deployment
- Pastikan `base` di `vite.config.ts` sesuai dengan path deployment
- Clear browser cache (Ctrl+Shift+Delete)
- Cek console browser untuk error messages

### Data checklist hilang setelah deployment
- Local Storage terikat pada domain/path tertentu
- Jika domain berubah, data lama tidak akan terlihat
- Pengguna dapat export data sebelum migrasi

### Export ke Google Calendar tidak bekerja
- Pastikan browser mengizinkan pop-up dari domain Anda
- Google Calendar harus dalam kondisi login di browser yang sama

---

## Maintenance

### Update Regulasi
Untuk menambah atau mengupdate regulasi:
1. Edit file `client/src/data/regulasiData.ts`
2. Commit dan push ke GitHub
3. Platform deployment akan otomatis rebuild dan deploy

### Update Kalender
Untuk menambah atau mengupdate deadline:
1. Edit file `client/src/data/complianceCalendarData.ts`
2. Commit dan push ke GitHub
3. Platform deployment akan otomatis rebuild dan deploy

---

## Support & Documentation

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **GitHub Pages**: https://pages.github.com/
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com/

---

## Lisensi

Aplikasi ini adalah proprietary software untuk kebutuhan internal compliance LPBBTI.
