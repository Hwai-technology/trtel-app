import { createContext, useContext, type ReactNode } from "react";

import { usePersistedState } from "../hooks/usePersistedState";

export type Bookmark = {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  page: number;
  juz: number;
    hizb?: number;     // ← جديد
  quarter?: number; 
  createdAt: number;
};

export type NewBookmark = Omit<Bookmark, "id" | "createdAt">;

const bookmarkId = (surahId: number, ayahNumber: number) =>
  `${surahId}-${ayahNumber}`;

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  isBookmarked: (surahId: number, ayahNumber: number) => boolean;
  toggleBookmark: (bookmark: NewBookmark) => void;
  removeBookmark: (id: string) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = usePersistedState<Bookmark[]>(
    "tarteel.bookmarks",
    [],
  );

  const isBookmarked = (surahId: number, ayahNumber: number) =>
    bookmarks.some((b) => b.id === bookmarkId(surahId, ayahNumber));

  // موجودة؟ احذفيها. مو موجودة؟ ضيفيها.
  const toggleBookmark = (bookmark: NewBookmark) => {
    const id = bookmarkId(bookmark.surahId, bookmark.ayahNumber);

    setBookmarks((current) =>
      current.some((b) => b.id === id)
        ? current.filter((b) => b.id !== id)
        : [{ ...bookmark, id, createdAt: Date.now() }, ...current],
    );
  };

  const removeBookmark = (id: string) => {
    setBookmarks((current) => current.filter((b) => b.id !== id));
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks لازم تنستخدم داخل BookmarksProvider");
  }
  return context;
}
