import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { X, Check } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import AppModal from "../ui/AppModal";
import AppButton from "../ui/AppButton";
import AppTextArea from "../ui/AppTextArea";
import AyahPreview from "./AyahPreview";

const NOTE_MAX_LENGTH = 500;
const BUTTON_CREAM = "#F6F3EA";

type AddNoteModalProps = {
  visible: boolean;
  onClose: () => void;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  onSave: (note: string) => void;
  initialNote?: string; // ← جديد: نص جاهز (للتعديل)
  title?: string; // ← جديد
  saveLabel?: string; // ← جديد
};

export default function AddNoteModal({
  visible,
  onClose,
  surahName,
  ayahNumber,
  ayahText,
  onSave,
  initialNote = "",
  title = "إضافة ملاحظة",
  saveLabel = "حفظ الملاحظة",
}: AddNoteModalProps) {
  const [note, setNote] = useState(initialNote);

  // كل ما تنفتح النافذة: عبّي الحقل بالنص الأولي
  useEffect(() => {
    if (visible) setNote(initialNote);
  }, [visible, initialNote]);

  const canSave = note.trim().length > 0;

  return (
    <AppModal visible={visible} onClose={onClose}>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {`سورة ${surahName} · آية ${toArabicDigits(ayahNumber)}`}
          </Text>
        </View>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={18} color={THEME.colors.text} />
        </Pressable>
      </View>

      {/* الآية */}
      <View style={styles.section}>
        <AyahPreview text={ayahText} />
      </View>

      {/* الملاحظة */}
      <View style={styles.section}>
        <Text style={styles.label}>ملاحظتك أو تدبّرك</Text>

        <View style={styles.field}>
          <AppTextArea
            value={note}
            onChangeText={setNote}
            placeholder="اكتب ملاحظتك أو تدبّرك هنا..."
            maxLength={NOTE_MAX_LENGTH}
            autoFocus
          />
        </View>
      </View>

      {/* الحفظ */}
      <View style={styles.section}>
        <AppButton
          title={saveLabel}
          onPress={() => onSave(note.trim())}
          disabled={!canSave}
          icon={<Check size={18} color={canSave ? "#FFFFFF" : "#b3bdbb"} />}
        />
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titles: {
    alignItems: "flex-end",
    gap: 2,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 16,
    color: THEME.colors.text,
    textAlign: "right",
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BUTTON_CREAM,
  },

  section: {
    marginTop: 16,
  },
  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 13,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  field: {
    marginTop: 8,
  },
});
