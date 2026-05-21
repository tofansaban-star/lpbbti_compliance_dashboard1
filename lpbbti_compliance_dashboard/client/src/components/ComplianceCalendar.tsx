import { useState } from 'react';
import { calendarData, checklistData } from '@/data/complianceCalendarData';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { generateGoogleCalendarUrl, downloadCalendar, downloadCSV } from '@/lib/calendarExport';
import { Calendar, Download, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ComplianceCalendar() {
  const { checklist, toggleItem, resetChecklist, getStats, isLoaded } = useChecklistStorage(checklistData);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const stats = getStats();

  const handleExportToGoogle = (deadline: any, monthData: any) => {
    const url = generateGoogleCalendarUrl(deadline, monthData, 2026);
    window.open(url, '_blank');
    toast.success('Membuka Google Calendar...');
  };

  const handleDownloadCalendar = () => {
    downloadCalendar(calendarData, 2026);
    toast.success('File kalender (.ics) berhasil diunduh');
  };

  const handleDownloadCSV = () => {
    downloadCSV(calendarData, 2026);
    toast.success('File CSV berhasil diunduh');
  };

  const handleResetChecklist = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua checklist?')) {
      resetChecklist();
      toast.success('Checklist telah direset');
    }
  };

  if (!isLoaded) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header dengan Export Options */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Compliance Calendar 2026</h2>
          <p className="text-sm text-muted-foreground">
            Jadwal pelaporan dan kewajiban compliance untuk tahun 2026
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleDownloadCalendar}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Calendar className="h-4 w-4" />
            Export ke Google Calendar (.ics)
          </Button>
          <Button
            onClick={handleDownloadCSV}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Kalender Pelaporan</TabsTrigger>
          <TabsTrigger value="checklist">Checklist Kepatuhan</TabsTrigger>
        </TabsList>

        {/* Tab: Calendar */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {calendarData.map((month, idx) => (
              <Button
                key={month.bulan}
                variant={selectedMonth === idx ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMonth(idx)}
                className="text-xs"
              >
                {month.bulan}
              </Button>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {calendarData[selectedMonth].label} 2026
            </h3>

            {calendarData[selectedMonth].deadline.length === 0 ? (
              <p className="text-muted-foreground text-sm">Tidak ada deadline di bulan ini.</p>
            ) : (
              <div className="space-y-3">
                {calendarData[selectedMonth].deadline.map((deadline, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      deadline.penting
                        ? 'border-red-200 bg-red-50'
                        : 'border-border bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-muted-foreground w-12">
                          {deadline.tgl}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{deadline.item}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {deadline.deskripsi}
                          </p>
                        </div>
                      </div>
                      {deadline.penting && (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <Badge variant="outline" className="text-xs">
                        {deadline.regulasi}
                      </Badge>
                      <Button
                        onClick={() =>
                          handleExportToGoogle(deadline, calendarData[selectedMonth])
                        }
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        + Google Calendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Tab: Checklist */}
        <TabsContent value="checklist" className="space-y-4">
          {/* Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress Kepatuhan</span>
              <span className="text-sm font-bold">{stats.done}/{stats.total}</span>
            </div>
            <Progress value={stats.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.percentage}% selesai
            </p>
          </Card>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleResetChecklist}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Checklist
            </Button>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {checklist.map((kategori, kIdx) => (
              <Card key={kategori.kategori} className="p-4">
                <h3 className="font-semibold text-sm mb-3">{kategori.kategori}</h3>
                <div className="space-y-2">
                  {kategori.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={item.done}
                        onCheckedChange={() => toggleItem(kIdx, iIdx)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          className={`text-sm cursor-pointer ${
                            item.done
                              ? 'line-through text-muted-foreground'
                              : 'text-foreground'
                          }`}
                        >
                          {item.label}
                        </label>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.regulasi}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
