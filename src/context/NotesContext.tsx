import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tarteel.notes";

// نسخنا بيانات الآية جوّا الملاحظة، عشان الصفحة تعرضها بدون ما تدوّر عليها
export type Note = {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  page: number;
  juz: number;
  text: string;
  createdAt: number;
  updatedAt: number;
};

// الملاحظة الجديدة: بدون id وتواريخ (بنولّدهم إحنا)
export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

type NotesContextValue = {
  notes: Note[];
  addNote: (note: NewNote) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) لما يفتح التطبيق: اقرا الملاحظات المحفوظة
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setNotes(JSON.parse(json));
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  // 2) كل ما تتغير الملاحظات: احفظيها (بعد ما نخلّص القراءة الأولى)
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes)).catch(() => {});
  }, [notes, isLoaded]);

  const addNote = (note: NewNote) => {
    const now = Date.now();
    const newNote: Note = {
      ...note,
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((current) => [newNote, ...current]);
  };

  const updateNote = (id: string, text: string) => {
    setNotes((current) =>
      current.map((n) =>
        n.id === id ? { ...n, text, updatedAt: Date.now() } : n,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((current) => current.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

// الطريقة اللي بنفتح فيها الدرج من أي صفحة
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes لازم تنستخدم داخل NotesProvider");
  }
  return context;
}
