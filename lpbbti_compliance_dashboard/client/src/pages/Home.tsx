import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RegulationLibrary from '@/components/RegulationLibrary';
import ComplianceCalendar from '@/components/ComplianceCalendar';
import { BookOpen, Calendar, Info } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                LPBBTI Compliance Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Perpustakaan Regulasi & Kalender Kepatuhan 2026
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">2026</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Ikhtisar</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Perpustakaan</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Kalender</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tentang Dashboard */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tentang Dashboard</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Dashboard ini dirancang untuk membantu tim compliance LPBBTI mengelola
                    seluruh regulasi dan kewajiban pelaporan dengan lebih efisien.
                  </p>
                  <p>
                    Fitur utama mencakup perpustakaan regulasi lengkap, pencarian cerdas,
                    kalender pelaporan, dan checklist kepatuhan operasional.
                  </p>
                </div>
              </Card>

              {/* Fitur Utama */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Fitur Utama</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Perpustakaan regulasi lengkap dengan 40+ aturan</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Pencarian lokal untuk menemukan aturan spesifik</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Kalender pelaporan 2026 dengan deadline OJK</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Checklist kepatuhan operasional</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Export ke Google Calendar & CSV</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Regulasi Terbaru */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Regulasi Terbaru (2024)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">POJK No. 40/2024</h3>
                  <p className="text-xs text-muted-foreground">
                    Pembaruan LPBBTI dengan penguatan manajemen risiko dan tata kelola
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">POJK No. 42/2024</h3>
                  <p className="text-xs text-muted-foreground">
                    Manajemen Risiko PVML - Deadline laporan: 15 Feb 2026
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">POJK No. 43/2024</h3>
                  <p className="text-xs text-muted-foreground">
                    Pengembangan Kualitas SDM PVML
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-sm mb-1">POJK No. 48/2024</h3>
                  <p className="text-xs text-muted-foreground">
                    Tata Kelola yang Baik bagi PVML (GCG)
                  </p>
                </div>
              </div>
            </Card>

            {/* Panduan Penggunaan */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Panduan Penggunaan</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">1. Perpustakaan Regulasi</h3>
                  <p className="text-muted-foreground">
                    Jelajahi semua regulasi LPBBTI, filter berdasarkan kategori atau domain kepatuhan,
                    dan gunakan pencarian untuk menemukan aturan spesifik.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">2. Kalender Pelaporan</h3>
                  <p className="text-muted-foreground">
                    Lihat semua deadline pelaporan untuk tahun 2026. Anda dapat mengekspor ke Google
                    Calendar atau CSV untuk integrasi dengan sistem lain.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">3. Checklist Kepatuhan</h3>
                  <p className="text-muted-foreground">
                    Pantau progress kepatuhan operasional dengan checklist interaktif. Data disimpan
                    secara lokal di browser Anda.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Perpustakaan */}
          <TabsContent value="library">
            <RegulationLibrary />
          </TabsContent>

          {/* Tab: Kalender */}
          <TabsContent value="calendar">
            <ComplianceCalendar />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>LPBBTI Compliance Dashboard 2026 • Zero-Cost Edition</p>
            <p className="mt-1">
              Aplikasi statis yang dapat di-deploy gratis di Vercel, GitHub Pages, atau Netlify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
