import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  MoreVertical,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Clock,
} from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import { formatNoteDate } from "../../utils/date";
import type { Note } from "../../context/NotesContext";
import AyahQuote from "./AyahQuote";

// ألوان من التصميم (بدّليها بألوان الثيم إذا موجودة)
const BROWN = "#8A5A24";
const OLIVE = "#6B5A2E";
const QUOTE_BG = "#F6F1E6";
const FOOTER_BG = "#F8F5EC";
const BUTTON_CREAM = "#F6F3EA";

// الملاحظة الأطول من هيك بيظهر لها "عرض المزيد"
const LONG_NOTE_LENGTH = 140;

type NoteCardProps = {
  note: Note;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpenInMushaf: () => void;
};

export default function NoteCard({
  note,
  menuOpen,
  onToggleMenu,
  onEdit,
  onDelete,
  onOpenInMushaf,
}: NoteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = note.text.length > LONG_NOTE_LENGTH;

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        {/* الهيدر */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.dot} />
            <Text style={styles.title}>
              {`سورة ${note.surahName} · الآية ${toArabicDigits(note.ayahNumber)}`}
            </Text>
          </View>

          <Pressable
            style={styles.menuButton}
            onPress={onToggleMenu}
            hitSlop={8}
          >
            <MoreVertical size={18} color={THEME.colors.textSecondary} />
          </Pressable>
        </View>

     <AyahQuote text={note.ayahText} page={note.page} juz={note.juz} />

        {/* الملاحظة */}
        <Text style={styles.noteText} numberOfLines={expanded ? undefined : 3}>
          {note.text}
        </Text>

        {isLong && (
          <Pressable
            style={styles.moreButton}
            onPress={() => setExpanded((v) => !v)}
          >
            <Text style={styles.moreText}>
              {expanded ? "عرض أقل" : "عرض المزيد"}
            </Text>
            {expanded ? (
              <ChevronUp size={14} color={BROWN} />
            ) : (
              <ChevronDown size={14} color={BROWN} />
            )}
          </Pressable>
        )}
      </View>

      {/* الفوتر */}
      <View style={styles.footer}>
        <View style={styles.footerGroup}>
          <Clock size={14} color={THEME.colors.textSecondary} />
          <Text style={styles.footerText}>
            {`آخر تعديل: ${formatNoteDate(note.updatedAt)}`}
          </Text>
        </View>

        <Pressable style={styles.footerGroup} onPress={onOpenInMushaf}>
          <BookOpen size={14} color={THEME.colors.primary} />
          <Text style={styles.openText}>فتح في المصحف</Text>
        </Pressable>
      </View>

      {/* قائمة الثلاث نقاط */}
      {menuOpen && (
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={onEdit}>
            <Text style={[styles.menuText, styles.editText]}>
              تعديل الملاحظة
            </Text>
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable style={styles.menuItem} onPress={onDelete}>
            <Text style={[styles.menuText, styles.deleteText]}>
              حذف الملاحظة
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  body: {
    padding: 16,
    gap: 14,
  },

  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 15,
    color: THEME.colors.text,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BUTTON_CREAM,
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
  },

  quote: {
    gap: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: QUOTE_BG,
    borderRightWidth: 4,
    borderRightColor: OLIVE,
  },
  quoteText: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 20,
    lineHeight: 36,
    color: THEME.colors.text,
    textAlign: "right",
  },
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#ECE9DF",
  },
  chipText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },

  noteText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 26,
    color: THEME.colors.text,
    textAlign: "right",
  },
  moreButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 4,
  },
  moreText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 13,
    color: BROWN,
  },

  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: FOOTER_BG,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  footerGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  openText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: THEME.colors.primary,
  },

  menu: {
    position: "absolute",
    top: 56,
    left: 16,
    width: 130,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
    zIndex: 10,
    elevation: 6,
    ...THEME.shadows.small,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "flex-end",
  },
  menuText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    textAlign: "right",
  },
  editText: { color: "#C2571A" },
  deleteText: { color: "#D32F2F" },
  menuDivider: {
    height: 1,
    backgroundColor: THEME.colors.stroke,
  },
});
