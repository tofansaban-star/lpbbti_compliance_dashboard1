import { useMemo } from 'react';
import { getAllRegulasi, Regulasi } from '@/data/regulasiData';

export interface SearchResult {
  regulasi: Regulasi;
  kategori: string;
  score: number;
  highlights: string[];
}

/**
 * Simple local search implementation without external library
 * Searches through regulasi data based on query string
 */
export const useRegulationSearch = (query: string): SearchResult[] => {
  return useMemo(() => {
    if (!query.trim()) return [];

    const allRegulasi = getAllRegulasi();
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    allRegulasi.forEach((regulasi) => {
      let score = 0;
      const highlights: string[] = [];

      // Exact match in kode (highest priority)
      if (regulasi.kode.toLowerCase().includes(lowerQuery)) {
        score += 100;
        highlights.push(`Kode: ${regulasi.kode}`);
      }

      // Match in nama
      if (regulasi.nama.toLowerCase().includes(lowerQuery)) {
        score += 80;
        highlights.push(`Nama: ${regulasi.nama}`);
      }

      // Match in ringkasan
      if (regulasi.ringkasan.toLowerCase().includes(lowerQuery)) {
        score += 50;
        const excerpt = extractExcerpt(regulasi.ringkasan, lowerQuery);
        highlights.push(`Ringkasan: ${excerpt}`);
      }

      // Match in domain
      const matchedDomains = regulasi.domain.filter(d =>
        d.toLowerCase().includes(lowerQuery)
      );
      if (matchedDomains.length > 0) {
        score += 40;
        highlights.push(`Domain: ${matchedDomains.join(', ')}`);
      }

      // Match in detail tambahan
      if (regulasi.detailTambahan?.toLowerCase().includes(lowerQuery)) {
        score += 30;
        const excerpt = extractExcerpt(regulasi.detailTambahan, lowerQuery);
        highlights.push(`Detail: ${excerpt}`);
      }

      // Match in pasal
      if (regulasi.pasal?.toLowerCase().includes(lowerQuery)) {
        score += 60;
        highlights.push(`Pasal: ${regulasi.pasal}`);
      }

      if (score > 0) {
        results.push({
          regulasi,
          kategori: getKategoriFromRegulasi(regulasi),
          score,
          highlights,
        });
      }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
  }, [query]);
};

/**
 * Extract a snippet around the matched query
 */
function extractExcerpt(text: string, query: string, contextLength = 50): string {
  const index = text.toLowerCase().indexOf(query);
  if (index === -1) return text.substring(0, contextLength) + '...';

  const start = Math.max(0, index - contextLength);
  const end = Math.min(text.length, index + query.length + contextLength);

  let excerpt = text.substring(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';

  return excerpt;
}

/**
 * Determine kategori based on regulasi kode
 */
function getKategoriFromRegulasi(regulasi: Regulasi): string {
  const kode = regulasi.kode.toUpperCase();

  if (kode.startsWith('UU')) return 'Undang-Undang';
  if (kode.startsWith('PP')) return 'Peraturan Pemerintah';
  if (kode.startsWith('POJK')) return 'POJK';
  if (kode.startsWith('SEOJK')) return 'SEOJK';
  if (kode.startsWith('PADK') || kode.startsWith('KDK')) return 'PADK & Keputusan OJK';
  if (kode.startsWith('COC') || kode.startsWith('PERMEN') || kode.startsWith('PBI')) return 'Self-Regulation & Sektoral';

  return 'Lainnya';
}

/**
 * Get suggested search terms based on common compliance queries
 */
export const getSuggestedSearches = (): string[] => {
  return [
    'TKB90',
    'Penagihan',
    'Bunga',
    'Data pribadi',
    'KYC',
    'Manajemen risiko',
    'Tata kelola',
    'Perizinan',
    'E-signature',
    'Debt collector',
  ];
};
