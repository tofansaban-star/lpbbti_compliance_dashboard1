import { useState, useEffect } from 'react';
import { ChecklistKategori, ChecklistItem } from '@/data/complianceCalendarData';

const STORAGE_KEY = 'lpbbti_compliance_checklist';

export const useChecklistStorage = (initialData: ChecklistKategori[]) => {
  const [checklist, setChecklist] = useState<ChecklistKategori[]>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setChecklist(parsed);
      }
    } catch (error) {
      console.error('Failed to load checklist from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever checklist changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
      } catch (error) {
        console.error('Failed to save checklist to localStorage:', error);
      }
    }
  }, [checklist, isLoaded]);

  const toggleItem = (kategoriIndex: number, itemIndex: number) => {
    setChecklist((prev) =>
      prev.map((k, ki) =>
        ki !== kategoriIndex
          ? k
          : {
              ...k,
              items: k.items.map((item, ii) =>
                ii !== itemIndex ? item : { ...item, done: !item.done }
              ),
            }
      )
    );
  };

  const resetChecklist = () => {
    setChecklist(initialData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getStats = () => {
    let total = 0;
    let done = 0;

    checklist.forEach((k) => {
      k.items.forEach((item) => {
        total++;
        if (item.done) done++;
      });
    });

    return {
      total,
      done,
      percentage: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  };

  return {
    checklist,
    toggleItem,
    resetChecklist,
    getStats,
    isLoaded,
  };
};
