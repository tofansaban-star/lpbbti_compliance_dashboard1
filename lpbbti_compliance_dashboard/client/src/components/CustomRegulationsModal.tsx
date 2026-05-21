import { useState } from 'react';
import { CustomRegulasi, useCustomRegulations } from '@/hooks/useCustomRegulations';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import RegulationForm from '@/components/RegulationForm';
import { Plus, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function CustomRegulationsModal() {
  const {
    customRegulations,
    addRegulation,
    updateRegulation,
    deleteRegulation,
    exportAsJSON,
    importFromJSON,
    clearAll,
  } = useCustomRegulations();

  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importText, setImportText] = useState('');

  const editingRegulation = editingId ? customRegulations.find((r) => r.id === editingId) : undefined;

  const handleAddRegulation = (data: any) => {
    addRegulation(data);
    setShowForm(false);
    toast.success('Regulasi berhasil ditambahkan');
  };

  const handleUpdateRegulation = (data: any) => {
    if (editingId) {
      updateRegulation(editingId, data);
      setEditingId(null);
      setShowForm(false);
      toast.success('Regulasi berhasil diperbarui');
    }
  };

  const handleDeleteRegulation = (id: string) => {
    deleteRegulation(id);
    toast.success('Regulasi berhasil dihapus');
  };

  const handleExport = () => {
    const json = exportAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom_regulations_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Regulasi berhasil diexport');
  };

  const handleImport = () => {
    if (!importText.trim()) {
      toast.error('Silakan paste JSON content');
      return;
    }

    if (importFromJSON(importText)) {
      setImportText('');
      toast.success('Regulasi berhasil diimport');
    } else {
      toast.error('Format JSON tidak valid');
    }
  };

  const handleClearAll = () => {
    clearAll();
    toast.success('Semua regulasi custom telah dihapus');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Kelola Regulasi Custom
          {customRegulations.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {customRegulations.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Kelola Regulasi Custom</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Daftar ({customRegulations.length})</TabsTrigger>
            <TabsTrigger value="add">Tambah Baru</TabsTrigger>
            <TabsTrigger value="import">Import/Export</TabsTrigger>
          </TabsList>

          {/* Tab: List */}
          <TabsContent value="list" className="space-y-4">
            {customRegulations.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Belum ada regulasi custom. Tambahkan regulasi baru untuk memulai.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {customRegulations.map((reg) => (
                  <Card key={reg.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {reg.kode}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 text-xs">Custom</Badge>
                        </div>
                        <h3 className="font-semibold text-sm">{reg.nama}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{reg.ringkasan}</p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(reg.id);
                            setShowForm(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>Hapus Regulasi?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Anda yakin ingin menghapus regulasi "{reg.nama}"? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                            <div className="flex gap-3 justify-end">
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteRegulation(reg.id)} className="bg-red-500 hover:bg-red-600">
                                Hapus
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {reg.domain.map((d) => (
                        <Badge key={d} variant="secondary" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab: Add/Edit */}
          <TabsContent value="add" className="space-y-4">
            {showForm ? (
              <RegulationForm
                initialData={editingRegulation}
                onSubmit={editingId ? handleUpdateRegulation : handleAddRegulation}
                onCancel={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                isEditing={!!editingId}
              />
            ) : (
              <Button onClick={() => setShowForm(true)} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Tambah Regulasi Baru
              </Button>
            )}
          </TabsContent>

          {/* Tab: Import/Export */}
          <TabsContent value="import" className="space-y-4">
            <div className="space-y-4">
              {/* Export */}
              <Card className="p-4">
                <h3 className="font-semibold text-sm mb-2">Export Regulasi Custom</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Download semua regulasi custom sebagai file JSON untuk backup atau sharing.
                </p>
                <Button onClick={handleExport} variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download JSON
                </Button>
              </Card>

              {/* Import */}
              <Card className="p-4">
                <h3 className="font-semibold text-sm mb-2">Import Regulasi Custom</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Paste JSON content dari file export untuk import regulasi.
                </p>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON content di sini..."
                  className="w-full h-32 p-2 border rounded text-xs font-mono"
                />
                <Button onClick={handleImport} className="w-full gap-2 mt-3">
                  <Upload className="h-4 w-4" />
                  Import JSON
                </Button>
              </Card>

              {/* Clear All */}
              {customRegulations.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Hapus Semua Regulasi Custom
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Hapus Semua?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda yakin ingin menghapus semua {customRegulations.length} regulasi custom? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                    <div className="flex gap-3 justify-end">
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAll} className="bg-red-500 hover:bg-red-600">
                        Hapus Semua
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
