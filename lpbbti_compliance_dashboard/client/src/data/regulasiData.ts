export interface Regulasi {
  kode: string;
  nama: string;
  domain: string[];
  ringkasan: string;
  status: "Berlaku" | "Akan Berlaku" | "Dicabut";
  tahun: number | null;
  baru?: boolean;
  deadline?: string;
  pasal?: string;
  detailTambahan?: string;
}

export interface KategoriRegulasi {
  nama: string;
  color: string;
  accent: string;
  items: Regulasi[];
}

export const regulasiData: Record<string, KategoriRegulasi> = {
  "Undang-Undang": {
    nama: "Undang-Undang",
    color: "#1a1a2e",
    accent: "#e94560",
    items: [
      {
        kode: "UU No. 4/2023",
        nama: "UU Pengembangan dan Penguatan Sektor Keuangan (P2SK)",
        domain: ["Kelembagaan", "Sanksi"],
        ringkasan: "Menetapkan LPBBTI sebagai bagian ITSK. Sanksi pidana pinjol ilegal: penjara s.d. 10 tahun, denda s.d. Rp250 miliar (Pasal 306).",
        status: "Berlaku",
        tahun: 2023,
        pasal: "Pasal 306",
        detailTambahan: "Mengatur kewenangan OJK dalam penegakan hukum terhadap penyelenggara LPBBTI ilegal."
      },
      {
        kode: "UU No. 27/2022",
        nama: "UU Pelindungan Data Pribadi (PDP)",
        domain: ["Perlindungan Data"],
        ringkasan: "Kewajiban explicit consent. Larangan penyalahgunaan data kontak/galeri.",
        status: "Berlaku",
        tahun: 2022,
        detailTambahan: "Platform harus memastikan persetujuan jelas dari pengguna sebelum mengakses data pribadi."
      },
      {
        kode: "UU No. 1/2024",
        nama: "UU ITE (Perubahan Kedua UU No. 11/2008)",
        domain: ["Transaksi Elektronik"],
        ringkasan: "Dasar hukum e-contract, pembuktian transaksi digital, e-signature tersertifikasi.",
        status: "Berlaku",
        tahun: 2024,
        detailTambahan: "Memperkuat keabsahan kontrak elektronik dan tanda tangan digital dalam transaksi LPBBTI."
      },
      {
        kode: "UU No. 8/1999",
        nama: "UU Perlindungan Konsumen",
        domain: ["Perlindungan Konsumen"],
        ringkasan: "Hak-hak konsumen jasa keuangan. Larangan klausula baku berat sebelah.",
        status: "Berlaku",
        tahun: 1999,
        detailTambahan: "Melindungi hak lender dan borrower dari praktik bisnis yang tidak adil."
      },
    ],
  },
  "Peraturan Pemerintah": {
    nama: "Peraturan Pemerintah",
    color: "#16213e",
    accent: "#f5a623",
    items: [
      {
        kode: "PP No. 71/2019",
        nama: "PP Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE)",
        domain: ["Infrastruktur TI"],
        ringkasan: "Data center & disaster recovery center industri keuangan strategis wajib di wilayah Indonesia.",
        status: "Berlaku",
        tahun: 2019,
        detailTambahan: "Memastikan keamanan data dan kontinuitas bisnis dengan penempatan infrastruktur di Indonesia."
      },
    ],
  },
  "POJK": {
    nama: "Peraturan Otoritas Jasa Keuangan",
    color: "#0f3460",
    accent: "#53d8fb",
    items: [
      {
        kode: "POJK No. 10/2022",
        nama: "Layanan Pendanaan Bersama Berbasis Teknologi Informasi",
        domain: ["Kelembagaan", "Operasional"],
        ringkasan: "Aturan dasar LPBBTI. Modal disetor minimum Rp25 miliar. Batas pendanaan tunggal Rp2 miliar. Kepemilikan asing, tata kelola.",
        status: "Berlaku",
        tahun: 2022,
        detailTambahan: "Mengatur persyaratan kelembagaan, struktur organisasi, dan manajemen risiko dasar."
      },
      {
        kode: "POJK No. 40/2024",
        nama: "LPBBTI (Peraturan Pembaruan) — Penyempurnaan Ketahanan Industri",
        domain: ["Tingkat Kesehatan", "Manajemen Risiko", "Tata Kelola", "Syariah", "Credit Scoring"],
        ringkasan: "Memperkuat POJK 10/2022. Menambahkan penilaian tingkat kesehatan penyelenggara, penguatan manajemen risiko & tata kelola, unit usaha syariah, kewajiban credit scoring, perlindungan lender (RUPD), dan larangan praktik pendanaan tidak sehat.",
        status: "Berlaku",
        tahun: 2024,
        baru: true,
        detailTambahan: "Regulasi pembaruan yang memperkuat ketahanan industri dan perlindungan konsumen."
      },
      {
        kode: "POJK No. 42/2024",
        nama: "Penerapan Manajemen Risiko bagi PVML (termasuk LPBBTI)",
        domain: ["Manajemen Risiko"],
        ringkasan: "4 pilar manajemen risiko wajib: pengawasan aktif Direksi/Dewan Komisaris/DPS, pengendalian internal, organisasi manajemen risiko. LPBBTI wajib lapor profil risiko ke OJK paling lambat 15 Feb 2026.",
        status: "Berlaku",
        tahun: 2024,
        baru: true,
        deadline: "15 Feb 2026",
        detailTambahan: "Mewajibkan struktur organisasi manajemen risiko yang terpisah dan independen."
      },
      {
        kode: "POJK No. 43/2024",
        nama: "Pengembangan Kualitas SDM PVML",
        domain: ["SDM", "Sertifikasi"],
        ringkasan: "Pengembangan kualitas SDM berkelanjutan. Penyediaan dana kewajiban pendidikan & pelatihan. Sertifikasi kompetensi kerja di bidang PVML.",
        status: "Berlaku",
        tahun: 2024,
        baru: true,
        detailTambahan: "Memastikan SDM LPBBTI memiliki kompetensi dan sertifikasi yang sesuai standar industri."
      },
      {
        kode: "POJK No. 48/2024",
        nama: "Tata Kelola yang Baik bagi PVML (Good Corporate Governance)",
        domain: ["Tata Kelola"],
        ringkasan: "Tugas & tanggung jawab Direksi, Dewan Komisaris, DPS. Fungsi pengendalian internal. Penanganan benturan kepentingan.",
        status: "Berlaku",
        tahun: 2024,
        baru: true,
        detailTambahan: "Mengatur struktur governance dan mekanisme pengambilan keputusan yang transparan."
      },
      {
        kode: "POJK No. 49/2024",
        nama: "Penetapan Status Pengawasan & Tindak Lanjut PVML",
        domain: ["Pengawasan OJK"],
        ringkasan: "Prosedur OJK menentukan status pengawasan dan tindak lanjut terhadap penyelenggara bermasalah.",
        status: "Berlaku",
        tahun: 2024,
        baru: true,
        detailTambahan: "Mengatur mekanisme penghitungan tingkat kesehatan dan status pengawasan LPBBTI."
      },
      {
        kode: "POJK No. 22/2023",
        nama: "Perlindungan Konsumen dan Masyarakat di Sektor Jasa Keuangan",
        domain: ["Perlindungan Konsumen"],
        ringkasan: "Tata cara pemasaran, larangan penyebaran data konsumen, etika penagihan, penyelesaian sengketa via LAPS-SJK.",
        status: "Berlaku",
        tahun: 2023,
        detailTambahan: "Melindungi hak konsumen dalam hal transparansi, penagihan etis, dan penyelesaian keluhan."
      },
      {
        kode: "POJK No. 8/2023",
        nama: "Penerapan Program APU PPT dan PPPSPM",
        domain: ["APU PPT", "KYC/CDD"],
        ringkasan: "Kewajiban CDD/EDD dan KYC/e-KYC terhadap lender dan borrower untuk mencegah aliran dana ilegal.",
        status: "Berlaku",
        tahun: 2023,
        detailTambahan: "Implementasi prosedur Know Your Customer dan Customer Due Diligence yang ketat."
      },
    ],
  },
  "SEOJK": {
    nama: "Surat Edaran Otoritas Jasa Keuangan",
    color: "#1a472a",
    accent: "#57cc99",
    items: [
      {
        kode: "SEOJK No. 19/2023",
        nama: "Penyelenggaraan LPBBTI — Operasional Harian",
        domain: ["Operasional", "Penagihan", "Bunga"],
        ringkasan: "Batas bunga harian 2026: konsumtif 0,1%/hari; produktif 0,067%/hari. Maks 3 platform per borrower. Jam penagihan 08.00–20.00.",
        status: "Berlaku",
        tahun: 2023,
        detailTambahan: "Mengatur batasan operasional harian termasuk jam penagihan, batas bunga, dan verifikasi platform."
      },
    ],
  },
  "PADK & Keputusan OJK": {
    nama: "PADK & Keputusan OJK",
    color: "#2d1b69",
    accent: "#bb86fc",
    items: [
      {
        kode: "PADK OJK",
        nama: "Tata Cara Permohonan Perizinan dan Persetujuan Penyelenggara LPBBTI",
        domain: ["Perizinan"],
        ringkasan: "SOP OJK: proses verifikasi berkas, live testing sistem, penerbitan izin usaha.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Mengatur prosedur lengkap permohonan izin dari tahap pengajuan hingga penerbitan."
      },
      {
        kode: "PADK OJK",
        nama: "Tata Cara Fit and Proper Test Pihak Utama LPBBTI",
        domain: ["Tata Kelola", "Perizinan"],
        ringkasan: "Uji kelayakan, integritas, dan kompetensi calon Direksi, Komisaris, dan PSP.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Mengatur kriteria dan prosedur pengujian kelayakan untuk pihak utama penyelenggara."
      },
      {
        kode: "KDK OJK",
        nama: "Sistem Integrasi Pusdafil (Pusat Data Fintech Lending)",
        domain: ["Pelaporan", "Pengawasan OJK"],
        ringkasan: "Standardisasi transmisi data harian ke OJK. Pemantauan TKB90 real-time.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Sistem terintegrasi untuk pelaporan data harian dan monitoring kesehatan platform."
      },
      {
        kode: "KDK OJK",
        nama: "Moratorium Perizinan LPBBTI",
        domain: ["Perizinan"],
        ringkasan: "Kebijakan penghentian/pembukaan kembali izin usaha baru berdasarkan evaluasi pasar.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Keputusan berkala OJK mengenai pembukaan atau penghentian izin penyelenggara baru."
      },
    ],
  },
  "Self-Regulation & Sektoral": {
    nama: "Self-Regulation & Sektoral",
    color: "#3d2b1f",
    accent: "#ff9a3c",
    items: [
      {
        kode: "CoC AFPI",
        nama: "Code of Conduct AFPI (Asosiasi Fintech Pendanaan Bersama Indonesia)",
        domain: ["Penagihan", "Etika", "Sertifikasi"],
        ringkasan: "Sertifikasi wajib debt collector. Sanksi internal: rekomendasi pencabutan izin ke OJK.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Kode etik yang mengikat semua penyelenggara LPBBTI anggota AFPI."
      },
      {
        kode: "Permen Kominfo",
        nama: "Peraturan Menteri Kominfo — Sertifikasi Elektronik",
        domain: ["Transaksi Elektronik"],
        ringkasan: "Kewajiban bermitra dengan PSrE resmi untuk e-signature dan ID digital.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Mengatur penggunaan tanda tangan elektronik dari Penyelenggara Sertifikasi Elektronik resmi."
      },
      {
        kode: "PBI",
        nama: "Peraturan Bank Indonesia — Sistem Pembayaran",
        domain: ["Pembayaran", "Escrow"],
        ringkasan: "Penggunaan Virtual Account, escrow account, dan Rekening Dana Lender (RDL) yang terkoneksi aman dengan perbankan.",
        status: "Berlaku",
        tahun: null,
        detailTambahan: "Mengatur mekanisme pembayaran dan pengelolaan dana dalam transaksi LPBBTI."
      },
    ],
  },
};

export const domainColors: Record<string, string> = {
  "Kelembagaan": "#e94560",
  "Sanksi": "#ff6b6b",
  "Perlindungan Data": "#4ecdc4",
  "Transaksi Elektronik": "#45b7d1",
  "Perlindungan Konsumen": "#96ceb4",
  "Infrastruktur TI": "#ffeaa7",
  "Operasional": "#74b9ff",
  "Tingkat Kesehatan": "#fd79a8",
  "Manajemen Risiko": "#6c5ce7",
  "Tata Kelola": "#a29bfe",
  "Syariah": "#00b894",
  "Credit Scoring": "#fdcb6e",
  "SDM": "#e17055",
  "Sertifikasi": "#d63031",
  "Pengawasan OJK": "#0984e3",
  "APU PPT": "#00cec9",
  "KYC/CDD": "#55efc4",
  "Penagihan": "#fd79a8",
  "Bunga": "#fab1a0",
  "Perizinan": "#81ecec",
  "Pelaporan": "#636e72",
  "Etika": "#b2bec3",
  "Pembayaran": "#dfe6e9",
  "Escrow": "#b2bec3",
};

export const getAllDomains = (): string[] => {
  const domains = new Set<string>();
  Object.values(regulasiData).forEach(kategori => {
    kategori.items.forEach(item => {
      item.domain.forEach(d => domains.add(d));
    });
  });
  return Array.from(domains).sort();
};

export const getAllRegulasi = (): Regulasi[] => {
  return Object.values(regulasiData).flatMap(k => k.items);
};
