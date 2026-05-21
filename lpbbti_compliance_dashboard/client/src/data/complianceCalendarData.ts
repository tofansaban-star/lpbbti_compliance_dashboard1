export interface Deadline {
  tgl: string;
  item: string;
  regulasi: string;
  penting: boolean;
  deskripsi?: string;
}

export interface MonthData {
  bulan: string;
  label: string;
  deadline: Deadline[];
}

export interface ChecklistItem {
  label: string;
  regulasi: string;
  done: boolean;
}

export interface ChecklistKategori {
  kategori: string;
  items: ChecklistItem[];
}

export const calendarData: MonthData[] = [
  {
    bulan: "Jan",
    label: "Januari",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Desember)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Desember kepada OJK."
      },
      {
        tgl: "31",
        item: "Update statistik platform di website",
        regulasi: "SEOJK 19/2023",
        penting: false,
        deskripsi: "Memperbarui data statistik platform yang ditampilkan di halaman publik."
      },
    ],
  },
  {
    bulan: "Feb",
    label: "Februari",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Profil Risiko (posisi akhir Des 2025) ke OJK",
        regulasi: "POJK 42/2024",
        penting: true,
        deskripsi: "Pelaporan profil risiko tahunan pertama kali sesuai POJK 42/2024."
      },
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Januari)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Januari kepada OJK."
      },
    ],
  },
  {
    bulan: "Mar",
    label: "Maret",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Februari)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Februari kepada OJK."
      },
      {
        tgl: "31",
        item: "Laporan Tahunan (posisi Desember 2025)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Laporan tahunan lengkap untuk tahun buku 2025."
      },
    ],
  },
  {
    bulan: "Apr",
    label: "April",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Maret)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Maret kepada OJK."
      },
      {
        tgl: "30",
        item: "Laporan Keuangan Q1 ke OJK",
        regulasi: "POJK 40/2024",
        penting: false,
        deskripsi: "Laporan keuangan kuartalan untuk kuartal pertama tahun 2026."
      },
    ],
  },
  {
    bulan: "Mei",
    label: "Mei",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi April)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan April kepada OJK."
      },
    ],
  },
  {
    bulan: "Jun",
    label: "Juni",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Mei)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Mei kepada OJK."
      },
      {
        tgl: "30",
        item: "Laporan Keuangan Semester I ke OJK",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Laporan keuangan semester pertama tahun 2026."
      },
    ],
  },
  {
    bulan: "Jul",
    label: "Juli",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Juni)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Juni kepada OJK."
      },
    ],
  },
  {
    bulan: "Agt",
    label: "Agustus",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Juli)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Juli kepada OJK."
      },
    ],
  },
  {
    bulan: "Sep",
    label: "September",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Agustus)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Agustus kepada OJK."
      },
      {
        tgl: "30",
        item: "Laporan Keuangan Q3 ke OJK",
        regulasi: "POJK 40/2024",
        penting: false,
        deskripsi: "Laporan keuangan kuartalan untuk kuartal ketiga tahun 2026."
      },
    ],
  },
  {
    bulan: "Okt",
    label: "Oktober",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi September)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan September kepada OJK."
      },
    ],
  },
  {
    bulan: "Nov",
    label: "November",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi Oktober)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan Oktober kepada OJK."
      },
    ],
  },
  {
    bulan: "Des",
    label: "Desember",
    deadline: [
      {
        tgl: "15",
        item: "Laporan Bulanan ke OJK (posisi November)",
        regulasi: "POJK 40/2024",
        penting: true,
        deskripsi: "Pelaporan data operasional dan keuangan bulan November kepada OJK."
      },
      {
        tgl: "31",
        item: "Penilaian Tingkat Kesehatan (posisi akhir tahun)",
        regulasi: "POJK 40/2024 & 42/2024",
        penting: true,
        deskripsi: "Self-assessment tingkat kesehatan penyelenggara untuk akhir tahun 2026."
      },
      {
        tgl: "31",
        item: "Self-assessment Manajemen Risiko (posisi Des 2026)",
        regulasi: "POJK 42/2024",
        penting: true,
        deskripsi: "Penilaian mandiri terhadap implementasi manajemen risiko di akhir tahun."
      },
    ],
  },
];

export const checklistData: ChecklistKategori[] = [
  {
    kategori: "Publikasi Website",
    items: [
      {
        label: "TKB90 tampil di halaman utama website",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
      {
        label: "Logo OJK terpasang sesuai standar",
        regulasi: "POJK 10/2022",
        done: false,
      },
      {
        label: "Logo AFPI terpasang sesuai standar",
        regulasi: "CoC AFPI",
        done: false,
      },
      {
        label: "Statistik platform diperbarui",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
      {
        label: "Informasi biaya & bunga sesuai regulasi terbaru",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
    ],
  },
  {
    kategori: "Operasional & Penagihan",
    items: [
      {
        label: "Jam penagihan hanya 08.00–20.00",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
      {
        label: "Tidak menggunakan intimidasi dalam penagihan",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
      {
        label: "Debt collector bersertifikat",
        regulasi: "CoC AFPI",
        done: false,
      },
      {
        label: "Maks 3 platform aktif per borrower diverifikasi",
        regulasi: "SEOJK 19/2023",
        done: false,
      },
    ],
  },
  {
    kategori: "Manajemen Risiko (POJK 42/2024)",
    items: [
      {
        label: "Kebijakan manajemen risiko tertulis sudah ada",
        regulasi: "POJK 42/2024",
        done: false,
      },
      {
        label: "Fungsi manajemen risiko dalam struktur organisasi",
        regulasi: "POJK 42/2024",
        done: false,
      },
      {
        label: "Sistem pengendalian internal berjalan",
        regulasi: "POJK 42/2024",
        done: false,
      },
      {
        label: "Pengawasan aktif Direksi & Dewan Komisaris terdokumentasi",
        regulasi: "POJK 42/2024",
        done: false,
      },
    ],
  },
  {
    kategori: "Tata Kelola (POJK 48/2024)",
    items: [
      {
        label: "Kebijakan benturan kepentingan terdokumentasi",
        regulasi: "POJK 48/2024",
        done: false,
      },
      {
        label: "Komite audit/risk berjalan",
        regulasi: "POJK 48/2024",
        done: false,
      },
      {
        label: "Laporan tugas Direksi & Dewan Komisaris tersedia",
        regulasi: "POJK 48/2024",
        done: false,
      },
    ],
  },
  {
    kategori: "APU PPT & KYC",
    items: [
      {
        label: "Prosedur CDD/EDD untuk lender & borrower aktif",
        regulasi: "POJK 8/2023",
        done: false,
      },
      {
        label: "e-KYC terintegrasi dengan data kependudukan",
        regulasi: "POJK 8/2023",
        done: false,
      },
      {
        label: "Pemantauan transaksi mencurigakan berjalan",
        regulasi: "POJK 8/2023",
        done: false,
      },
    ],
  },
  {
    kategori: "Infrastruktur & Keamanan",
    items: [
      {
        label: "Sertifikat ISMS (ISO 27001) aktif",
        regulasi: "POJK 10/2022 Ps.46",
        done: false,
      },
      {
        label: "Data center di wilayah Indonesia",
        regulasi: "PP 71/2019",
        done: false,
      },
      {
        label: "Disaster recovery center aktif",
        regulasi: "PP 71/2019",
        done: false,
      },
      {
        label: "e-signature menggunakan PSrE resmi",
        regulasi: "Permen Kominfo",
        done: false,
      },
    ],
  },
  {
    kategori: "Pengembangan SDM (POJK 43/2024)",
    items: [
      {
        label: "Program pelatihan SDM berkelanjutan tersedia",
        regulasi: "POJK 43/2024",
        done: false,
      },
      {
        label: "Dana kewajiban pendidikan & pelatihan dialokasikan",
        regulasi: "POJK 43/2024",
        done: false,
      },
      {
        label: "Sertifikasi kompetensi kerja SDM terpenuhi",
        regulasi: "POJK 43/2024",
        done: false,
      },
    ],
  },
];
