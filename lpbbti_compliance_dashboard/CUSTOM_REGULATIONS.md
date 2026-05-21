# Fitur Custom Regulations - Panduan Lengkap

## 📌 Pengenalan

Fitur **Custom Regulations** memungkinkan tim compliance untuk menambah, mengedit, dan menghapus regulasi baru secara manual **tanpa perlu developer**. Setiap kali ada peraturan baru dari OJK atau regulasi lainnya, tim compliance dapat langsung menambahkannya ke dalam sistem.

---

## 🎯 Fitur Utama

### 1. **Tambah Regulasi Baru**
- Form lengkap untuk input regulasi
- Validasi otomatis untuk field wajib
- Pilihan domain dari daftar yang sudah ada
- Opsi untuk menambah domain custom

### 2. **Edit Regulasi**
- Ubah informasi regulasi yang sudah ditambahkan
- Perubahan disimpan otomatis

### 3. **Hapus Regulasi**
- Hapus regulasi dengan konfirmasi
- Tidak dapat dibatalkan (gunakan backup jika diperlukan)

### 4. **Export/Import**
- **Export**: Download semua regulasi custom sebagai file JSON
- **Import**: Upload file JSON untuk restore regulasi
- Berguna untuk backup dan sharing antar tim

### 5. **Backup Otomatis**
- Semua regulasi custom disimpan di Local Storage browser
- Data persisten selama browser cache tidak dihapus

---

## 🚀 Cara Menggunakan

### Membuka Custom Regulations Manager

1. Buka aplikasi LPBBTI Compliance Dashboard
2. Masuk ke tab **"Perpustakaan"**
3. Klik tombol **"Kelola Regulasi Custom"** di pojok kanan atas

### Menambah Regulasi Baru

1. Klik tombol **"Kelola Regulasi Custom"**
2. Pilih tab **"Tambah Baru"**
3. Klik **"Tambah Regulasi Baru"**
4. Isi form dengan informasi regulasi:

#### Field Wajib (*)
- **Kode Regulasi**: Contoh `POJK No. 50/2024`
- **Nama Regulasi**: Nama lengkap regulasi
- **Ringkasan**: Deskripsi singkat isi regulasi
- **Domain**: Minimal 1 domain kepatuhan

#### Field Opsional
- **Tahun**: Tahun regulasi diterbitkan
- **Pasal**: Nomor pasal yang relevan
- **Deadline**: Tanggal deadline pelaporan (jika ada)
- **Detail Tambahan**: Informasi tambahan

5. Klik **"Tambah Regulasi"**
6. Regulasi akan muncul di daftar regulasi

### Mengedit Regulasi

1. Buka Custom Regulations Manager
2. Pilih tab **"Daftar"**
3. Cari regulasi yang ingin diedit
4. Klik tombol **Edit** (ikon pensil)
5. Ubah informasi yang diperlukan
6. Klik **"Simpan Perubahan"**

### Menghapus Regulasi

1. Buka Custom Regulations Manager
2. Pilih tab **"Daftar"**
3. Cari regulasi yang ingin dihapus
4. Klik tombol **Delete** (ikon sampah)
5. Konfirmasi penghapusan
6. Regulasi akan dihapus

### Export Regulasi (Backup)

1. Buka Custom Regulations Manager
2. Pilih tab **"Import/Export"**
3. Klik **"Download JSON"**
4. File `custom_regulations_YYYY-MM-DD.json` akan diunduh
5. Simpan file ini sebagai backup

### Import Regulasi (Restore)

1. Buka Custom Regulations Manager
2. Pilih tab **"Import/Export"**
3. Paste konten file JSON ke text area
4. Klik **"Import JSON"**
5. Regulasi akan di-restore

---

## 📋 Contoh Pengisian Form

### Contoh 1: POJK Baru

```
Kode Regulasi: POJK No. 50/2024
Nama Regulasi: Penerapan Teknologi Blockchain untuk LPBBTI
Ringkasan: Regulasi tentang penggunaan teknologi blockchain dalam platform P2P lending untuk meningkatkan transparansi dan keamanan transaksi.
Tahun: 2024
Pasal: Pasal 1-15
Deadline: 30 Juni 2026
Domain: 
  - Infrastruktur TI
  - Operasional
  - Transaksi Elektronik
Status: Berlaku
```

### Contoh 2: Regulasi Kominfo

```
Kode Regulasi: Permen Kominfo No. 5/2024
Nama Regulasi: Standar Keamanan Siber untuk Platform Digital
Ringkasan: Peraturan Menteri Komunikasi tentang standar keamanan siber yang harus dipenuhi oleh platform digital termasuk LPBBTI.
Tahun: 2024
Domain:
  - Infrastruktur TI
  - Perlindungan Data
Status: Akan Berlaku
```

---

## 💾 Data Storage & Persistence

### Lokasi Penyimpanan
- **Browser**: Local Storage
- **Key**: `lpbbti_custom_regulations`
- **Format**: JSON

### Kapan Data Hilang?
- Jika user menghapus browser cache/cookies
- Jika user menggunakan browser private/incognito
- Jika user mengganti browser atau device

### Cara Mencegah Kehilangan Data
1. **Export regulasi secara berkala** ke file JSON
2. **Simpan file backup** di cloud storage (Google Drive, OneDrive, dll)
3. **Share file** dengan tim compliance untuk redundancy

---

## 🔍 Pencarian & Filter

### Regulasi Custom di Pencarian

Regulasi custom yang Anda tambahkan akan:
- ✅ Muncul di perpustakaan regulasi utama
- ✅ Dapat dicari dengan Smart Search
- ✅ Dapat difilter berdasarkan domain
- ✅ Ditandai dengan badge **"Custom"** di detail

### Contoh Pencarian
- Cari `POJK No. 50` → Akan menemukan regulasi custom yang baru ditambahkan
- Cari `blockchain` → Akan menemukan regulasi dengan kata kunci blockchain
- Filter domain `Infrastruktur TI` → Akan menampilkan regulasi custom dengan domain tersebut

---

## ⚠️ Tips & Trik

### 1. Backup Berkala
```
Setiap minggu atau setelah menambah regulasi baru:
1. Buka Custom Regulations Manager
2. Tab "Import/Export"
3. Download JSON
4. Simpan ke cloud storage
```

### 2. Naming Convention
Gunakan format konsisten untuk kode regulasi:
- `POJK No. XX/YYYY` untuk POJK
- `Permen Kominfo No. XX/YYYY` untuk Peraturan Menteri
- `UU No. XX/YYYY` untuk Undang-Undang
- `PP No. XX/YYYY` untuk Peraturan Pemerintah

### 3. Domain Selection
Pilih domain yang paling relevan. Jika tidak ada yang cocok:
1. Gunakan domain yang paling dekat
2. Atau tambahkan domain custom melalui form

### 4. Deadline Format
Gunakan format konsisten untuk deadline:
- `15 Mar 2026` (Recommended)
- `15-03-2026`
- `2026-03-15`

---

## 🐛 Troubleshooting

### Q: Regulasi custom saya hilang setelah menutup browser
**A**: Data disimpan di Local Storage. Jika browser cache dihapus, data akan hilang. Selalu backup dengan export JSON.

### Q: Bagaimana cara share regulasi custom dengan tim?
**A**: 
1. Export regulasi ke JSON
2. Bagikan file JSON ke tim
3. Tim dapat import file tersebut di browser mereka

### Q: Apakah regulasi custom bisa disinkronkan antar device?
**A**: Tidak secara otomatis. Gunakan export/import untuk sync manual antar device.

### Q: Berapa banyak regulasi custom yang bisa ditambahkan?
**A**: Tidak ada batasan, tapi performa mungkin menurun jika > 1000 regulasi. Untuk kasus normal (< 100 regulasi), tidak ada masalah.

### Q: Bagaimana jika saya salah menambahkan regulasi?
**A**: Anda dapat:
1. Edit regulasi untuk memperbaiki informasi
2. Hapus dan tambah ulang
3. Restore dari backup JSON jika diperlukan

---

## 📞 Support

Jika mengalami masalah dengan fitur Custom Regulations:
1. Cek browser console (F12 → Console) untuk error messages
2. Pastikan Local Storage tidak disabled di browser settings
3. Coba export dan import untuk reset data
4. Hubungi tim IT untuk bantuan teknis

---

## 🔄 Update & Maintenance

### Kapan Menggunakan Fitur Ini?

✅ **Gunakan untuk:**
- Regulasi baru dari OJK
- Peraturan dari Kementerian terkait
- Regulasi lokal/regional
- Self-regulation dari asosiasi
- Peraturan internal perusahaan

❌ **Jangan gunakan untuk:**
- Mengedit regulasi default (gunakan admin panel)
- Duplikasi regulasi yang sudah ada
- Catatan atau memo (gunakan tools lain)

### Best Practice
1. **Verifikasi** regulasi sebelum menambahkan
2. **Konsultasi** dengan compliance officer sebelum menambahkan
3. **Backup** secara berkala
4. **Share** dengan tim untuk consistency
5. **Update** jika ada perubahan atau pencabutan

---

## 📝 Checklist Penambahan Regulasi Baru

Sebelum menambahkan regulasi baru, pastikan:

- [ ] Regulasi sudah resmi diterbitkan oleh lembaga yang berwenang
- [ ] Sudah ada surat edaran atau notifikasi resmi
- [ ] Informasi kode dan nama sudah akurat
- [ ] Domain yang dipilih sudah sesuai
- [ ] Deadline sudah jelas (jika ada)
- [ ] Sudah dikonfirmasi dengan compliance officer
- [ ] Backup sudah dibuat sebelum perubahan besar

---

**Versi**: 1.0  
**Last Updated**: Mei 2026  
**Status**: Production Ready
