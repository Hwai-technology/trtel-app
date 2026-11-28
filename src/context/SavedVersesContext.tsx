import { createContext, useContext, type ReactNode } from "react";

import { usePersistedState } from "../hooks/usePersistedState";

export type SavedVerse = {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  page: number;
  juz: number;
  savedAt: number;
};

export type NewSavedVerse = Omit<SavedVerse, "id" | "savedAt">;

const verseId = (surahId: number, ayahNumber: number) =>
  `${surahId}-${ayahNumber}`;

type SavedVersesContextValue = {
  savedVerses: SavedVerse[];
  isSaved: (surahId: number, ayahNumber: number) => boolean;
  toggleSaved: (verse: NewSavedVerse) => void;
  removeSaved: (id: string) => void;
};

const SavedVersesContext = createContext<SavedVersesContextValue | null>(null);

export function SavedVersesProvider({ children }: { children: ReactNode }) {
  const [savedVerses, setSavedVerses] = usePersistedState<SavedVerse[]>(
    "tarteel.savedVerses",
    [],
  );

  const isSaved = (surahId: number, ayahNumber: number) =>
    savedVerses.some((v) => v.id === verseId(surahId, ayahNumber));

  const toggleSaved = (verse: NewSavedVerse) => {
    const id = verseId(verse.surahId, verse.ayahNumber);

    setSavedVerses((current) =>
      current.some((v) => v.id === id)
        ? current.filter((v) => v.id !== id)
        : [{ ...verse, id, savedAt: Date.now() }, ...current],
    );
  };

  const removeSaved = (id: string) => {
    setSavedVerses((current) => current.filter((v) => v.id !== id));
  };

  return (
    <SavedVersesContext.Provider
      value={{ savedVerses, isSaved, toggleSaved, removeSaved }}
    >
      {children}
    </SavedVersesContext.Provider>
  );
}

export function useSavedVerses() {
  const context = useContext(SavedVersesContext);
  if (!context) {
    throw new Error("useSavedVerses لازم تنستخدم داخل SavedVersesProvider");
  }
  return context;
}
