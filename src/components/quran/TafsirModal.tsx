import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { X, BookOpen } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import AppModal from "../ui/AppModal";

const BROWN = "#8A5A24";
const GOLD_TINT = "#F5DCA8";
const CREAM = "#FBF7EA";
const BUTTON_CREAM = "#F6F3EA";

type TafsirModalProps = {
  visible: boolean;
  onClose: () => void;
  sourceName: string;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  tafsir: string | null;
};

export default function TafsirModal({
  visible,
  onClose,
  sourceName,
  surahName,
  ayahNumber,
  ayahText,
  tafsir,
}: TafsirModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.iconBadge}>
            <BookOpen size={18} color={BROWN} />
          </View>

          <View style={styles.titles}>
            <Text style={styles.title}>{sourceName}</Text>
            <Text style={styles.subtitle}>
              {`سورة ${surahName} · الآية ${toArabicDigits(ayahNumber)}`}
            </Text>
          </View>
        </View>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={18} color={THEME.colors.text} />
        </Pressable>
      </View>

      {/* المحتوى: بينسحب إذا كان طويل */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <Text style={styles.ayah}>{`«${ayahText}»`}</Text>

          {tafsir ? (
            <Text style={styles.tafsir}>{tafsir}</Text>
          ) : (
            <Text style={styles.empty}>التفسير غير متوفر بعد لهذه الآية.</Text>
          )}
        </View>
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleGroup: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD_TINT,
  },
  titles: {
    flex: 1,
    alignItems: "flex-end",
    gap: 2,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 13,
    color: THEME.colors.text,
    textAlign: "right",
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: BROWN,
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

  scroll: {
    marginTop: 16,
    maxHeight: 380,
  },
  box: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: CREAM,
    gap: 8,
  },
  ayah: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 16,
    lineHeight: 30,
    color: THEME.colors.primary,
    textAlign: "right",
  },
  tafsir: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    lineHeight: 26,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  empty: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 13,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
});
