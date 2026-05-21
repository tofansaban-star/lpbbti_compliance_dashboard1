import { useState, useEffect } from 'react';
import { Regulasi } from '@/data/regulasiData';
import { CustomRegulasi } from '@/hooks/useCustomRegulations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RegulationFormProps {
  initialData?: CustomRegulasi;
  onSubmit: (data: Omit<Regulasi, 'status'> & { status?: 'Berlaku' | 'Akan Berlaku' | 'Dicabut' }) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const AVAILABLE_DOMAINS = [
  'Kelembagaan', 'Sanksi', 'Perlindungan Data', 'Transaksi Elektronik',
  'Perlindungan Konsumen', 'Infrastruktur TI', 'Operasional', 'Tingkat Kesehatan',
  'Manajemen Risiko', 'Tata Kelola', 'Syariah', 'Credit Scoring', 'SDM',
  'Sertifikasi', 'Pengawasan OJK', 'APU PPT', 'KYC/CDD', 'Penagihan', 'Bunga',
  'Perizinan', 'Pelaporan', 'Etika', 'Pembayaran', 'Escrow'
];

export default function RegulationForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: RegulationFormProps) {
  const [formData, setFormData] = useState({
    kode: initialData?.kode || '',
    nama: initialData?.nama || '',
    ringkasan: initialData?.ringkasan || '',
    pasal: initialData?.pasal || '',
    detailTambahan: initialData?.detailTambahan || '',
    tahun: initialData?.tahun?.toString() || '',
    status: (initialData?.status || 'Berlaku') as 'Berlaku' | 'Akan Berlaku' | 'Dicabut',
    deadline: initialData?.deadline || '',
    selectedDomains: initialData?.domain || [],
    newDomain: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddDomain = () => {
    if (formData.newDomain && !formData.selectedDomains.includes(formData.newDomain)) {
      setFormData((prev) => ({
        ...prev,
        selectedDomains: [...prev.selectedDomains, prev.newDomain],
        newDomain: '',
      }));
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDomains: prev.selectedDomains.filter((d) => d !== domain),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.kode.trim()) newErrors.kode = 'Kode regulasi wajib diisi';
    if (!formData.nama.trim()) newErrors.nama = 'Nama regulasi wajib diisi';
    if (!formData.ringkasan.trim()) newErrors.ringkasan = 'Ringkasan wajib diisi';
    if (formData.selectedDomains.length === 0) newErrors.domain = 'Pilih minimal 1 domain';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      kode: formData.kode,
      nama: formData.nama,
      ringkasan: formData.ringkasan,
      domain: formData.selectedDomains,
      status: formData.status,
      tahun: formData.tahun ? parseInt(formData.tahun) : null,
      pasal: formData.pasal || undefined,
      detailTambahan: formData.detailTambahan || undefined,
      deadline: formData.deadline || undefined,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Kode & Nama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="kode">Kode Regulasi *</Label>
          <Input
            id="kode"
            placeholder="Contoh: POJK No. 50/2024"
            value={formData.kode}
            onChange={(e) => setFormData((prev) => ({ ...prev, kode: e.target.value }))}
            className={errors.kode ? 'border-red-500' : ''}
          />
          {errors.kode && <p className="text-xs text-red-500 mt-1">{errors.kode}</p>}
        </div>

        <div>
          <Label htmlFor="tahun">Tahun</Label>
          <Input
            id="tahun"
            type="number"
            placeholder="2024"
            value={formData.tahun}
            onChange={(e) => setFormData((prev) => ({ ...prev, tahun: e.target.value }))}
          />
        </div>
      </div>

      {/* Nama */}
      <div>
        <Label htmlFor="nama">Nama Regulasi *</Label>
        <Input
          id="nama"
          placeholder="Contoh: Penerapan Manajemen Risiko bagi PVML"
          value={formData.nama}
          onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
          className={errors.nama ? 'border-red-500' : ''}
        />
        {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
      </div>

      {/* Ringkasan */}
      <div>
        <Label htmlFor="ringkasan">Ringkasan *</Label>
        <Textarea
          id="ringkasan"
          placeholder="Ringkasan singkat tentang isi regulasi..."
          value={formData.ringkasan}
          onChange={(e) => setFormData((prev) => ({ ...prev, ringkasan: e.target.value }))}
          rows={3}
          className={errors.ringkasan ? 'border-red-500' : ''}
        />
        {errors.ringkasan && <p className="text-xs text-red-500 mt-1">{errors.ringkasan}</p>}
      </div>

      {/* Pasal & Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pasal">Pasal (Opsional)</Label>
          <Input
            id="pasal"
            placeholder="Contoh: Pasal 42"
            value={formData.pasal}
            onChange={(e) => setFormData((prev) => ({ ...prev, pasal: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="deadline">Deadline (Opsional)</Label>
          <Input
            id="deadline"
            placeholder="Contoh: 15 Mar 2026"
            value={formData.deadline}
            onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
          />
        </div>
      </div>

      {/* Detail Tambahan */}
      <div>
        <Label htmlFor="detailTambahan">Detail Tambahan (Opsional)</Label>
        <Textarea
          id="detailTambahan"
          placeholder="Informasi tambahan atau penjelasan lebih lanjut..."
          value={formData.detailTambahan}
          onChange={(e) => setFormData((prev) => ({ ...prev, detailTambahan: e.target.value }))}
          rows={2}
        />
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Berlaku">Berlaku</SelectItem>
            <SelectItem value="Akan Berlaku">Akan Berlaku</SelectItem>
            <SelectItem value="Dicabut">Dicabut</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Domain Selection */}
      <div>
        <Label>Domain Kepatuhan *</Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Select value={formData.newDomain} onValueChange={(value) => setFormData((prev) => ({ ...prev, newDomain: value }))}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Pilih domain..." />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddDomain}
              variant="outline"
              disabled={!formData.newDomain}
            >
              Tambah
            </Button>
          </div>

          {/* Selected Domains */}
          <div className="flex flex-wrap gap-2">
            {formData.selectedDomains.map((domain) => (
              <Badge key={domain} variant="secondary" className="gap-1">
                {domain}
                <button
                  type="button"
                  onClick={() => handleRemoveDomain(domain)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {errors.domain && <p className="text-xs text-red-500">{errors.domain}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Regulasi'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Batal
        </Button>
      </div>

      {/* Info Box */}
      <Card className="p-3 bg-blue-50 border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>Catatan:</strong> Regulasi yang Anda tambahkan akan disimpan secara lokal di browser ini. 
          Jika Anda menghapus browser cache, data akan hilang. Gunakan fitur Export untuk backup.
        </p>
      </Card>
    </form>
  );
}
