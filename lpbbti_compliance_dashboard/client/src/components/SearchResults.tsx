import { useState } from 'react';
import { SearchResult } from '@/hooks/useRegulationSearch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { domainColors } from '@/data/regulasiData';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  const [expandedKode, setExpandedKode] = useState<string | null>(null);

  if (results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Tidak ada hasil untuk pencarian "{query}". Coba gunakan kata kunci lain atau jelajahi
          perpustakaan secara manual.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        Ditemukan {results.length} hasil untuk "{query}"
      </div>

      {results.map((result) => {
        const isExpanded = expandedKode === result.regulasi.kode;

        return (
          <Card
            key={result.regulasi.kode}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() =>
                setExpandedKode(isExpanded ? null : result.regulasi.kode)
              }
              className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {result.regulasi.kode}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: 'rgb(37, 99, 235)',
                    }}
                  >
                    {result.kategori}
                  </Badge>
                  {result.regulasi.baru && (
                    <Badge className="bg-amber-100 text-amber-800 text-xs">
                      Baru 2024
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{result.regulasi.nama}</h3>

                {/* Highlights */}
                <div className="mt-2 space-y-1">
                  {result.highlights.slice(0, 2).map((highlight, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-muted-foreground italic line-clamp-1"
                    >
                      {highlight}
                    </p>
                  ))}
                </div>

                {/* Score indicator */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${Math.min(result.score, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Relevansi: {Math.min(result.score, 100)}%
                  </span>
                </div>
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
                    {result.regulasi.domain.map((d) => (
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
                  <p className="text-sm text-foreground">{result.regulasi.ringkasan}</p>
                </div>

                {result.regulasi.pasal && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Pasal</h4>
                    <p className="text-sm text-foreground">{result.regulasi.pasal}</p>
                  </div>
                )}

                {result.regulasi.detailTambahan && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Detail Tambahan</h4>
                    <p className="text-sm text-foreground">
                      {result.regulasi.detailTambahan}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <span>
                    Status: <span className="font-medium">{result.regulasi.status}</span>
                  </span>
                  {result.regulasi.tahun && (
                    <span>
                      Tahun: <span className="font-medium">{result.regulasi.tahun}</span>
                    </span>
                  )}
                </div>

                {/* All Highlights */}
                {result.highlights.length > 0 && (
                  <div className="pt-2 border-t">
                    <h4 className="font-medium text-xs mb-2">Kecocokan Pencarian</h4>
                    <ul className="space-y-1">
                      {result.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
