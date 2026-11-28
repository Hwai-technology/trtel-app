import type { ReactNode } from "react";
import { SavedVersesProvider } from "../context/SavedVersesContext";
import { NotesProvider } from "../context/NotesContext";
import { BookmarksProvider } from "../context/BookmarksContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <BookmarksProvider>
        <SavedVersesProvider>
          <NotesProvider>{children}</NotesProvider>
        </SavedVersesProvider>
      </BookmarksProvider>
    </SettingsProvider>
  );
}
