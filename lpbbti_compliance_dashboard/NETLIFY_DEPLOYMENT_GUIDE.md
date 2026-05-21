# Panduan Deployment LPBBTI Compliance Dashboard ke Netlify

Panduan lengkap untuk men-deploy aplikasi LPBBTI Compliance Dashboard ke Netlify dalam beberapa langkah mudah.

---

## 📋 Prasyarat

Sebelum memulai, pastikan Anda memiliki:

1. **Akun GitHub** (gratis) - https://github.com/signup
2. **Akun Netlify** (gratis) - https://app.netlify.com/signup
3. **Git terinstall** di komputer Anda
4. **Source code aplikasi** sudah siap di folder `/home/ubuntu/lpbbti_compliance_dashboard`

---

## 🚀 Langkah 1: Persiapkan Repository GitHub

### 1.1 Buat Repository Baru di GitHub

1. Buka https://github.com/new
2. Isi form:
   - **Repository name**: `lpbbti_compliance_dashboard`
   - **Description**: `LPBBTI Compliance Dashboard - Perpustakaan Regulasi & Kalender Pelaporan`
   - **Visibility**: Public (agar Netlify bisa akses)
   - **Initialize repository**: Jangan centang (kita akan push dari lokal)
3. Klik **Create repository**

### 1.2 Push Source Code ke GitHub

Jalankan perintah berikut di terminal:

```bash
cd /home/ubuntu/lpbbti_compliance_dashboard

# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: LPBBTI Compliance Dashboard"

# Rename branch ke main
git branch -M main

# Add remote (ganti YOUR_USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard.git

# Push ke GitHub
git push -u origin main
```

**Catatan**: Jika diminta username/password, gunakan Personal Access Token GitHub (bukan password biasa).

### 1.3 Verifikasi di GitHub

1. Buka https://github.com/YOUR_USERNAME/lpbbti_compliance_dashboard
2. Pastikan semua file sudah ter-upload dengan benar

---

## 🌐 Langkah 2: Setup Netlify

### 2.1 Login ke Netlify

1. Buka https://app.netlify.com
2. Klik **Sign up** atau **Log in** dengan GitHub account Anda
3. Authorize Netlify untuk akses GitHub

### 2.2 Connect Repository

1. Setelah login, Anda akan melihat dashboard Netlify
2. Klik **"Add new site"** atau **"New site from Git"**
3. Pilih **GitHub** sebagai Git provider
4. Authorize Netlify jika diminta
5. Cari dan pilih repository `lpbbti_compliance_dashboard`

### 2.3 Konfigurasi Build Settings

Setelah memilih repository, Anda akan melihat form konfigurasi:

**Isi dengan:**

| Field | Value |
|-------|-------|
| **Branch to deploy** | `main` |
| **Build command** | `pnpm run build` |
| **Publish directory** | `dist/public` |

**Catatan**: Jika Netlify tidak mendeteksi build command secara otomatis, Anda perlu isi manual.

### 2.4 Deploy

Klik tombol **"Deploy site"** untuk memulai deployment pertama.

Netlify akan:
1. Clone repository dari GitHub
2. Install dependencies (`pnpm install`)
3. Build aplikasi (`pnpm run build`)
4. Deploy ke Netlify CDN

Proses ini biasanya memakan waktu 2-5 menit.

---

## ✅ Langkah 3: Verifikasi Deployment

### 3.1 Cek Status Deployment

1. Setelah klik "Deploy site", Anda akan melihat deployment log
2. Tunggu hingga status berubah menjadi **"Published"** (hijau)
3. Jika ada error, check log untuk troubleshooting

### 3.2 Akses Aplikasi

Setelah deployment berhasil, Netlify akan memberikan URL:

```
https://[random-name].netlify.app
```

Contoh: `https://lpbbti-compliance.netlify.app`

Buka URL tersebut di browser untuk verifikasi aplikasi berjalan dengan baik.

### 3.3 Test Fitur Utama

Setelah aplikasi berhasil di-deploy, test fitur-fitur berikut:

- [ ] Buka tab "Perpustakaan" - pastikan regulasi muncul
- [ ] Buka tab "Kalender" - pastikan kalender 2026 muncul
- [ ] Test pencarian - cari regulasi dengan keyword
- [ ] Klik "Kelola Regulasi Custom" - pastikan modal terbuka
- [ ] Coba tambah regulasi baru - pastikan bisa disimpan
- [ ] Coba export regulasi - pastikan file JSON ter-download
- [ ] Test export ke Google Calendar - pastikan link berfungsi

---

## 🎯 Langkah 4: Konfigurasi Domain (Opsional)

### 4.1 Gunakan Domain Default Netlify

Domain default Netlify sudah cukup baik untuk internal use:
```
https://lpbbti-compliance.netlify.app
```

### 4.2 Custom Domain (Jika Anda Punya Domain Sendiri)

Jika Anda punya domain custom (misal: `compliance.perusahaan.com`):

1. Di dashboard Netlify, buka **Site settings**
2. Pilih **Domain management**
3. Klik **Add custom domain**
4. Masukkan domain Anda
5. Follow instruksi untuk setup DNS records

---

## 🔄 Langkah 5: Setup Continuous Deployment

Dengan Netlify, deployment otomatis sudah aktif. Setiap kali Anda push ke GitHub:

```bash
# Setelah membuat perubahan
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

Netlify akan otomatis:
1. Detect perubahan di GitHub
2. Build aplikasi
3. Deploy ke production

Anda bisa monitor progress di dashboard Netlify.

---

## 📊 Monitoring & Maintenance

### Cek Deployment Status

1. Buka https://app.netlify.com
2. Pilih site `lpbbti_compliance_dashboard`
3. Lihat **Deploys** untuk history deployment
4. Lihat **Analytics** untuk traffic dan performance

### Rollback ke Versi Sebelumnya

Jika ada error setelah deployment:

1. Di dashboard Netlify, buka **Deploys**
2. Cari deployment sebelumnya yang stabil
3. Klik **Publish deploy** untuk rollback

### Cek Logs

Jika ada error:

1. Di dashboard Netlify, buka **Deploys**
2. Klik deployment yang error
3. Scroll ke bawah untuk melihat **Deploy log**
4. Cari error message dan troubleshoot

---

## 🆘 Troubleshooting

### Error: "Build failed"

**Solusi:**
```bash
# Clear cache dan rebuild
pnpm store prune
pnpm install
pnpm run build
```

Kemudian push ke GitHub dan trigger redeploy di Netlify.

### Error: "Cannot find module"

**Solusi:**
1. Pastikan `pnpm-lock.yaml` sudah di-commit ke GitHub
2. Pastikan semua dependencies di `package.json` sudah benar
3. Coba `pnpm install` lokal dan push ulang

### Aplikasi blank atau error 404

**Solusi:**
1. Check browser console (F12) untuk error messages
2. Pastikan `dist/public` adalah folder yang benar
3. Pastikan `vite.config.ts` sudah benar (terutama `base` path)

### WebSocket error di Netlify

WebSocket error biasanya tidak muncul di production Netlify (hanya di development). Jika muncul:

1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Coba di browser lain

---

## 📝 Dokumentasi Lengkap

Untuk dokumentasi lebih lengkap, lihat file-file berikut:

- **DEPLOYMENT_GUIDE.md** - Panduan deployment ke berbagai platform
- **QUICK_START_DEPLOYMENT.md** - Quick start 5 menit
- **CUSTOM_REGULATIONS.md** - Panduan fitur custom regulations

---

## 🎉 Selesai!

Aplikasi Anda sekarang live di Netlify! 

**URL aplikasi:**
```
https://[your-site-name].netlify.app
```

**Langkah selanjutnya:**

1. **Share dengan tim** - Bagikan URL ke tim compliance
2. **Setup monitoring** - Setup uptime monitoring (UptimeRobot)
3. **Backup data** - Backup regulasi custom secara berkala
4. **Maintenance** - Monitor logs dan performance

---

## 📞 Support

Jika ada pertanyaan atau masalah:

- **Netlify Docs**: https://docs.netlify.com/
- **Vite Docs**: https://vitejs.dev/
- **GitHub Docs**: https://docs.github.com/

---

**Versi**: 1.0  
**Last Updated**: Mei 2026  
**Status**: Production Ready
