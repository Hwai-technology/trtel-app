import { View, Text, Pressable, StyleSheet } from "react-native";
import { X, Heart, Play } from "lucide-react-native";
import AyahPreview from "./AyahPreview";
import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import AppButton from "../ui/AppButton";
import AppQuickActions, { type QuickActionId } from "../ui/AppQuickActions";

// ألوان من التصميم (بدّليها بألوان الثيم إذا موجودة)
const BROWN = "#8A5A24";
const GOLD_TINT = "#F5DCA8";
const CREAM = "#FBF7EA";
const BUTTON_CREAM = "#F6F3EA";

type AyahSheetContentProps = {
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  locationLabel: string;
  bookmarked: boolean;
  saved: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onAction: (id: QuickActionId) => void;
  onRepeatListen: () => void;
};

export default function AyahSheetContent({
  surahName,
  ayahNumber,
  ayahText,
  saved,
  locationLabel,
  bookmarked,
  onClose,
  onToggleFavorite,
  onAction,
  onRepeatListen,
}: AyahSheetContentProps) {
  const number = toArabicDigits(ayahNumber);

  return (
    <View>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{number}</Text>
          </View>

          <View style={styles.titles}>
            <Text
              style={styles.title}
            >{`سورة ${surahName} · آية ${number}`}</Text>
            <Text style={styles.subtitle}>{locationLabel}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable style={styles.roundButton} onPress={onClose}>
            <X size={18} color={THEME.colors.text} />
          </Pressable>

          <Pressable style={styles.roundButton} onPress={onToggleFavorite}>
            <Heart
              size={18}
              color={saved ? THEME.colors.primary : BROWN}
              fill={saved ? THEME.colors.primary : "none"}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <AyahPreview text={ayahText} />
      </View>

      {/* بطاقات الإجراءات */}
      <View style={styles.section}>
        <AppQuickActions onAction={onAction} bookmarked={bookmarked} />
      </View>

      {/* زر الاستماع */}
      <View style={styles.section}>
        <AppButton
          title="تكرار الاستماع للحفظ والمراجعة"
          onPress={onRepeatListen}
          icon={<Play size={14} color="#FFFFFF" fill="#FFFFFF" />}
          iconPosition="right"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD_TINT,
  },
  numberText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 14,
    color: BROWN,
  },
  titles: {
    alignItems: "flex-end",
    gap: 2,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 15,
    color: THEME.colors.text,
    textAlign: "right",
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  roundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BUTTON_CREAM,
  },

  verseBox: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: CREAM,
  },
  verse: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 18,
    lineHeight: 34,
    color: THEME.colors.text,
    textAlign: "center",
  },

  section: {
    marginTop: 16,
  },
});
