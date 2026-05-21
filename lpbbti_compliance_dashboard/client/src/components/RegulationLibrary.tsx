import { useState, useMemo } from 'react';
import { regulasiData, getAllDomains, domainColors } from '@/data/regulasiData';
import { useCustomRegulations } from '@/hooks/useCustomRegulations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Search, Lightbulb } from 'lucide-react';
import { useRegulationSearch, getSuggestedSearches } from '@/hooks/useRegulationSearch';
import SearchResults from '@/components/SearchResults';
import CustomRegulationsModal from '@/components/CustomRegulationsModal';

export default function RegulationLibrary() {
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [selectedDomain, setSelectedDomain] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const { customRegulations } = useCustomRegulations();

  // Combine default dan custom regulations
  const allRegulasi = useMemo(() => {
    const defaultRegs = Object.values(regulasiData).flatMap(k => k.items);
    return [...defaultRegs, ...customRegulations];
  }, [customRegulations]);

  const allKategori = ['Semua', ...Object.keys(regulasiData)];
  const allDomains = ['Semua', ...getAllDomains()];

  // Use local search hook
  const searchResults = useRegulationSearch(searchQuery);

  // Filter logic
  const filteredRegulasi = useMemo(() => {
    let results = searchQuery.trim()
      ? searchResults.map(r => r.regulasi)
      : allRegulasi;

    if (selectedKategori !== 'Semua') {
      results = results.filter(r => {
        if ('isCustom' in r && r.isCustom) return true; // Custom regulations always shown
        const kategori = Object.entries(regulasiData).find(([_, k]) =>
          k.items.some(item => item.kode === r.kode)
        )?.[0];
        return kategori === selectedKategori;
      });
    }

    if (selectedDomain !== 'Semua') {
      results = results.filter(r => r.domain.includes(selectedDomain));
    }

    return results;
  }, [selectedKategori, selectedDomain, searchQuery, searchResults, allRegulasi]);

  const totalRegulasi = allRegulasi.length;
  const newRegulasi = Object.values(regulasiData).reduce((a, b) => a + b.items.filter(i => i.baru).length, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Regulasi</div>
          <div className="text-2xl font-bold">{totalRegulasi}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Regulasi Baru (2024)</div>
          <div className="text-2xl font-bold text-amber-600">{newRegulasi}</div>
        </Card>
      </div>

      {/* Custom Regulations Manager */}
      <div className="flex justify-end">
        <CustomRegulationsModal />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari regulasi, pasal, atau topik spesifik (misal: TKB90, penagihan, data pribadi)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Kategori Regulasi</label>
          <div className="flex flex-wrap gap-2">
            {allKategori.map((k) => (
              <Button
                key={k}
                variant={selectedKategori === k ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedKategori(k)}
              >
                {k}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Domain Kepatuhan</label>
          <div className="flex flex-wrap gap-2">
            {allDomains.map((d) => (
              <Button
                key={d}
                variant={selectedDomain === d ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDomain(d)}
              >
                {d}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Menampilkan {filteredRegulasi.length} dari {totalRegulasi} regulasi
      </div>

      {/* Suggested Searches */}
      {searchQuery.trim() === '' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm text-blue-900 mb-2">Saran Pencarian</h4>
              <div className="flex flex-wrap gap-2">
                {getSuggestedSearches().map((search) => (
                  <button
                    key={search}
                    onClick={() => setSearchQuery(search)}
                    className="text-xs px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regulasi List */}
      <div className="space-y-3">
        {searchQuery.trim() ? (
          <SearchResults results={searchResults} query={searchQuery} />
        ) : filteredRegulasi.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Tidak ada regulasi yang sesuai dengan pencarian Anda.</p>
          </Card>
        ) : (
          filteredRegulasi.map((regulasi) => {
            const isExpanded = expandedItem === regulasi.kode;

            return (
              <Card
                key={regulasi.kode}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedItem(isExpanded ? null : regulasi.kode)}
                  className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {regulasi.kode}
                      </Badge>
                      {regulasi.baru && (
                        <Badge className="bg-amber-100 text-amber-800 text-xs">Baru 2024</Badge>
                      )}
                      {regulasi.deadline && (
                        <Badge variant="secondary" className="text-xs">
                          Deadline: {regulasi.deadline}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm">{regulasi.nama}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {regulasi.ringkasan}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 ml-2 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 ml-2 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t px-4 py-4 bg-muted/30 space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Domain</h4>
                      <div className="flex flex-wrap gap-2">
                        {regulasi.domain.map((d) => (
                          <Badge
                            key={d}
                            style={{
                              backgroundColor: domainColors[d] || '#e0e0e0',
                              color: '#fff',
                            }}
                            className="text-xs"
                          >
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Ringkasan</h4>
                      <p className="text-sm text-foreground">{regulasi.ringkasan}</p>
                    </div>

                    {regulasi.pasal && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Pasal</h4>
                        <p className="text-sm text-foreground">{regulasi.pasal}</p>
                      </div>
                    )}

                    {regulasi.detailTambahan && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Detail Tambahan</h4>
                        <p className="text-sm text-foreground">{regulasi.detailTambahan}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span>Status: <span className="font-medium">{regulasi.status}</span></span>
                      {regulasi.tahun && <span>Tahun: <span className="font-medium">{regulasi.tahun}</span></span>}
                      {'isCustom' in regulasi && (regulasi as any).isCustom && <span className="text-green-600 font-medium">• Custom</span>}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
