# LPBBTI Compliance Dashboard

**Perpustakaan Regulasi & Kalender Kepatuhan untuk Industri LPBBTI (P2P Lending) Indonesia**

Aplikasi web statis yang dirancang untuk membantu tim compliance LPBBTI mengelola seluruh regulasi dan kewajiban pelaporan dengan lebih efisien.

---

## 🎯 Fitur Utama

### 1. **Perpustakaan Regulasi Lengkap**
- 40+ aturan LPBBTI dari berbagai tingkat regulasi
- Termasuk 4 POJK terbaru tahun 2024 (POJK 40, 42, 43, 48, 49)
- Kategori: UU, PP, POJK, SEOJK, PADK, dan Self-Regulation
- Filter berdasarkan kategori dan domain kepatuhan

### 2. **Smart Local Search**
- Pencarian cepat tanpa memerlukan server
- Hasil relevan berdasarkan scoring algorithm
- Highlight kecocokan pencarian
- Saran pencarian untuk topik umum (TKB90, penagihan, data pribadi, dll)

### 3. **Compliance Calendar 2026**
- Jadwal pelaporan lengkap untuk tahun 2026
- Deadline bulanan, kuartalan, dan tahunan ke OJK
- Indikator prioritas untuk deadline kritis
- Deskripsi detail setiap deadline

### 4. **Checklist Kepatuhan Operasional**
- 7 kategori checklist (Publikasi Website, Operasional, Manajemen Risiko, Tata Kelola, APU-PPT, Infrastruktur, SDM)
- 30+ item checklist yang dapat di-track
- Progress indicator
- Data disimpan secara otomatis di Local Storage

### 5. **Export & Integration**
- **Export ke Google Calendar**: Semua deadline dapat langsung ditambahkan ke Google Calendar
- **Export CSV**: Untuk import ke Excel atau tools lain
- **iCalendar (.ics)**: Format standar untuk kalender aplikasi

---

## 🚀 Teknologi

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Static (GitHub Pages, Vercel, Netlify, atau server sendiri)
- **Storage**: Local Storage (client-side)

---

## 📦 Instalasi & Development

### Prerequisites
- Node.js 18+
- pnpm (atau npm/yarn)

### Setup Development Environment

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build untuk production
pnpm build

# Preview production build
pnpm preview
```

Development server akan berjalan di `http://localhost:3000`

---

## 📋 Struktur Proyek

```
client/
├── src/
│   ├── data/
│   │   ├── regulasiData.ts          # Data semua regulasi LPBBTI
│   │   └── complianceCalendarData.ts # Data kalender & checklist
│   ├── hooks/
│   │   ├── useRegulationSearch.ts    # Hook untuk smart search
│   │   └── useChecklistStorage.ts    # Hook untuk checklist dengan localStorage
│   ├── lib/
│   │   └── calendarExport.ts         # Utility untuk export kalender
│   ├── components/
│   │   ├── RegulationLibrary.tsx      # Komponen perpustakaan regulasi
│   │   ├── ComplianceCalendar.tsx     # Komponen kalender & checklist
│   │   └── SearchResults.tsx          # Komponen hasil pencarian
│   ├── pages/
│   │   └── Home.tsx                  # Halaman utama
│   └── App.tsx                       # Root component
├── public/
│   └── [favicon dan assets statis]
└── index.html                        # HTML entry point
```

---

## 🔍 Fitur Pencarian (Smart Search)

Pencarian menggunakan algoritma scoring lokal yang mempertimbangkan:
- **Exact Match di Kode** (Score: 100)
- **Match di Nama** (Score: 80)
- **Match di Ringkasan** (Score: 50)
- **Match di Domain** (Score: 40)
- **Match di Detail Tambahan** (Score: 30)
- **Match di Pasal** (Score: 60)

Hasil diurutkan berdasarkan score tertinggi.

### Contoh Pencarian
- `TKB90` → Menemukan semua regulasi terkait Tingkat Keberhasilan Bayar 90 hari
- `penagihan` → Menemukan regulasi tentang etika dan jam penagihan
- `data pribadi` → Menemukan UU PDP dan regulasi perlindungan data
- `POJK 42` → Menemukan POJK 42/2024 tentang Manajemen Risiko

---

## 💾 Data Persistence

### Checklist
- Disimpan di **Local Storage** browser
- Otomatis tersimpan setiap kali ada perubahan
- Dapat di-reset kapan saja

### Kalender & Regulasi
- Data statis yang di-embed di aplikasi
- Tidak memerlukan database atau server

---

## 📤 Export Functionality

### 1. Export ke Google Calendar
```javascript
// Membuka Google Calendar event creation dengan pre-filled data
generateGoogleCalendarUrl(deadline, monthData, 2026)
```

### 2. Export CSV
```javascript
// Download file CSV dengan semua deadline
downloadCSV(calendarData, 2026)
```

### 3. Export iCalendar (.ics)
```javascript
// Download file .ics untuk import ke aplikasi kalender apapun
downloadCalendar(calendarData, 2026)
```

---

## 🌐 Deployment

Aplikasi ini dapat di-deploy secara **gratis** ke berbagai platform:

### Recommended: GitHub Pages
```bash
git push origin main
# GitHub Actions akan otomatis build dan deploy
# URL: https://YOUR_USERNAME.github.io/lpbbti-compliance-dashboard/
```

### Alternative: Vercel
```bash
# Vercel akan auto-detect dan deploy
# URL: https://lpbbti-compliance-dashboard.vercel.app/
```

### Alternative: Netlify
```bash
# Netlify akan auto-detect dan deploy
# URL: https://lpbbti-compliance-dashboard.netlify.app/
```

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap.

---

## 🔐 Security & Privacy

- **Tidak ada data yang dikirim ke server** - Semua proses terjadi di client-side
- **Local Storage**: Data checklist disimpan di browser pengguna
- **No Tracking**: Tidak ada analytics atau tracking eksternal
- **HTTPS**: Semua deployment menggunakan HTTPS

---

## 📝 Data Regulasi

### Regulasi yang Tercakup

#### Undang-Undang (4)
- UU No. 4/2023 (P2SK)
- UU No. 27/2022 (PDP)
- UU No. 1/2024 (ITE)
- UU No. 8/1999 (Perlindungan Konsumen)

#### Peraturan Pemerintah (1)
- PP No. 71/2019 (PSTE)

#### POJK (8)
- POJK No. 10/2022 (Dasar LPBBTI)
- POJK No. 40/2024 (Pembaruan LPBBTI)
- POJK No. 42/2024 (Manajemen Risiko)
- POJK No. 43/2024 (SDM)
- POJK No. 48/2024 (Tata Kelola)
- POJK No. 49/2024 (Status Pengawasan)
- POJK No. 22/2023 (Perlindungan Konsumen)
- POJK No. 8/2023 (APU-PPT)

#### SEOJK (1)
- SEOJK No. 19/2023 (Operasional LPBBTI)

#### PADK & Keputusan OJK (4)
- Perizinan & Persetujuan
- Fit and Proper Test
- Pusdafil Integration
- Moratorium Perizinan

#### Self-Regulation & Sektoral (3)
- CoC AFPI
- Permen Kominfo (E-Signature)
- PBI (Sistem Pembayaran)

**Total: 21 kategori regulasi dengan 40+ aturan spesifik**

---

## 🛠️ Customization

### Menambah Regulasi Baru
Edit `client/src/data/regulasiData.ts`:
```typescript
{
  kode: "POJK No. XX/2024",
  nama: "Nama Regulasi",
  domain: ["Domain1", "Domain2"],
  ringkasan: "Ringkasan singkat",
  status: "Berlaku",
  tahun: 2024,
  baru: true,
  pasal: "Pasal XX",
  detailTambahan: "Detail tambahan"
}
```

### Menambah Deadline Kalender
Edit `client/src/data/complianceCalendarData.ts`:
```typescript
{
  tgl: "15",
  item: "Nama Deadline",
  regulasi: "POJK XX/2024",
  penting: true,
  deskripsi: "Deskripsi detail"
}
```

### Menambah Checklist Item
Edit `client/src/data/complianceCalendarData.ts`:
```typescript
{
  label: "Deskripsi checklist",
  regulasi: "POJK XX/2024",
  done: false
}
```

---

## 🐛 Troubleshooting

### Checklist tidak tersimpan
- Pastikan browser mengizinkan Local Storage
- Cek di DevTools → Application → Local Storage

### Pencarian tidak menemukan hasil
- Coba gunakan kata kunci yang lebih spesifik
- Gunakan saran pencarian yang tersedia

### Export ke Google Calendar tidak bekerja
- Pastikan browser mengizinkan pop-up
- Pastikan sudah login ke Google Calendar

---

## 📞 Support

Untuk pertanyaan atau saran tentang regulasi LPBBTI, silakan hubungi:
- **OJK**: https://www.ojk.go.id/
- **AFPI**: https://afpi.or.id/

---

## 📄 Lisensi

Aplikasi ini adalah proprietary software untuk kebutuhan internal compliance LPBBTI.

---

## 🙏 Acknowledgments

- Data regulasi bersumber dari OJK, Kementerian Kominfo, dan AFPI
- UI Components dari shadcn/ui
- Icons dari Lucide React

---

**Versi**: 1.0.0  
**Last Updated**: Mei 2026  
**Status**: Production Ready
