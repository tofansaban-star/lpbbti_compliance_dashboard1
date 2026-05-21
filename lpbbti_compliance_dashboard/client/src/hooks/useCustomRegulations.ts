import { useState, useEffect } from 'react';
import { Regulasi } from '@/data/regulasiData';

const CUSTOM_REGULATIONS_KEY = 'lpbbti_custom_regulations';

export interface CustomRegulasi extends Regulasi {
  id: string; // UUID untuk custom regulasi
  isCustom: true;
}

export const useCustomRegulations = () => {
  const [customRegulations, setCustomRegulations] = useState<CustomRegulasi[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_REGULATIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomRegulations(parsed);
      }
    } catch (error) {
      console.error('Failed to load custom regulations:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save ke localStorage whenever customRegulations changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CUSTOM_REGULATIONS_KEY, JSON.stringify(customRegulations));
      } catch (error) {
        console.error('Failed to save custom regulations:', error);
      }
    }
  }, [customRegulations, isLoaded]);

  const addRegulation = (regulasi: Omit<Regulasi, 'status'> & { status?: 'Berlaku' | 'Akan Berlaku' | 'Dicabut' }) => {
    const newRegulasi: CustomRegulasi = {
      ...regulasi,
      status: regulasi.status || 'Berlaku',
      id: generateId(),
      isCustom: true,
    };
    setCustomRegulations((prev) => [...prev, newRegulasi]);
    return newRegulasi;
  };

  const updateRegulation = (id: string, updates: Partial<Omit<CustomRegulasi, 'id' | 'isCustom'>>) => {
    setCustomRegulations((prev) =>
      prev.map((reg) =>
        reg.id === id ? { ...reg, ...updates } : reg
      )
    );
  };

  const deleteRegulation = (id: string) => {
    setCustomRegulations((prev) => prev.filter((reg) => reg.id !== id));
  };

  const getRegulationById = (id: string): CustomRegulasi | undefined => {
    return customRegulations.find((reg) => reg.id === id);
  };

  const exportAsJSON = (): string => {
    return JSON.stringify(customRegulations, null, 2);
  };

  const importFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setCustomRegulations(parsed);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import regulations:', error);
      return false;
    }
  };

  const clearAll = () => {
    setCustomRegulations([]);
    localStorage.removeItem(CUSTOM_REGULATIONS_KEY);
  };

  return {
    customRegulations,
    addRegulation,
    updateRegulation,
    deleteRegulation,
    getRegulationById,
    exportAsJSON,
    importFromJSON,
    clearAll,
    isLoaded,
  };
};

/**
 * Generate unique ID untuk custom regulasi
 */
function generateId(): string {
  return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
