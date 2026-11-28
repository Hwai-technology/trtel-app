import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, type Href } from "expo-router";
import { Plus } from "lucide-react-native";

import { THEME } from "@/constants/theme";
import { notesCountLabel } from "@/utils/arabic";
import { useNotes, type Note } from "@/context/NotesContext";
import AppBar from "@/components/ui/AppBar";
import NoteCard from "@/components/quran/NoteCard";
import AddNoteModal from "@/components/quran/AddNoteModal";
import ConfirmDeleteModal from "@/components/quran/ConfirmDeleteModal";

type Panel = "none" | "edit" | "delete";

export default function NotesScreen() {
  const insets = useSafeAreaInsets();
  const { notes, updateNote, deleteNote } = useNotes();

  // أي كارد قائمتها مفتوحة
  const [menuNoteId, setMenuNoteId] = useState<string | null>(null);
  // آخر ملاحظة اخترناها (بنتركها محفوظة عشان محتوى النافذة ما يختفي وقت التسكير)
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  // أي نافذة مفتوحة
  const [panel, setPanel] = useState<Panel>("none");

  // الأحدث تعديلاً أول
  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  const closePanel = () => setPanel("none");

  const handleEdit = (note: Note) => {
    setMenuNoteId(null);
    setActiveNote(note);
    setPanel("edit");
  };

  const handleDelete = (note: Note) => {
    setMenuNoteId(null);
    setActiveNote(note);
    setPanel("delete");
  };

  const header = (
    <View style={styles.banner}>
      <View style={styles.bannerTexts}>
        <View style={styles.bannerTitleRow}>
          <Text style={styles.bannerTitle}>
            {notesCountLabel(notes.length)}
          </Text>
          <View style={styles.dot} />
        </View>
        <Text style={styles.bannerSubtitle}>
          روضة تدبرك الشخصي لآيات الذكر الحكيم
        </Text>
      </View>

      {/* الملاحظة لازم تكون على آية، فبنروح لتاب القرآن نختار آية */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/quran" as Href)}
      >
        <Plus size={16} color="#FFFFFF" />
        <Text style={styles.addText}>إضافة ملاحظة</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <AppBar
        title="قائمة الملاحظات"
        subtitle="تأملاتك وملاحظاتك المرتبطة بالآيات"
        onBack={() => router.back()}
        logo={
          <Image
            source={require("../assets/images/trtel_logo (1).png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        }
      />

      <FlatList
        data={sortedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            menuOpen={menuNoteId === item.id}
            onToggleMenu={() =>
              setMenuNoteId((current) => (current === item.id ? null : item.id))
            }
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
            onOpenInMushaf={() => router.push(`/quran/${item.page}` as Href)}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            لم تضيفي أي ملاحظة بعد. افتحي صفحة من المصحف واضغطي على آية لتبدأي.
          </Text>
        }
        onScrollBeginDrag={() => setMenuNoteId(null)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      />

      {activeNote && (
        <>
          <AddNoteModal
            visible={panel === "edit"}
            onClose={closePanel}
            surahName={activeNote.surahName}
            ayahNumber={activeNote.ayahNumber}
            ayahText={activeNote.ayahText}
            initialNote={activeNote.text}
            title="تعديل الملاحظة"
            saveLabel="حفظ التعديل"
            onSave={(text) => {
              updateNote(activeNote.id, text);
              closePanel();
            }}
          />

          <ConfirmDeleteModal
            visible={panel === "delete"}
            onClose={closePanel}
            onConfirm={() => {
              deleteNote(activeNote.id);
              closePanel();
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  banner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F0EADA",
  },
  bannerTexts: {
    alignItems: "flex-end",
    gap: 4,
  },
  bannerTitleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  bannerTitle: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 15,
    color: THEME.colors.text,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary,
  },
  bannerSubtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  addButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: THEME.radius.sm,
    backgroundColor: THEME.colors.primary,
  },
  addText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: "#FFFFFF",
  },

  empty: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 24,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    paddingVertical: 32,
  },
});
