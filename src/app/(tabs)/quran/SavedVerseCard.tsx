import { View, Text, Pressable, StyleSheet } from "react-native";
import { Play, BookOpen } from "lucide-react-native";
import { SavedVerse } from "@/context/SavedVersesContext";
import AppCardMenu from "@/components/ui/AppCardMenu";
import { THEME } from "@/constants/theme";
import { toArabicDigits } from "@/utils/arabic";
import { formatRelativeDate } from "@/utils/date";


const FOOTER_BG = "#F8F5EC";
const SOFT_GREEN = "#E4F2EE";

type SavedVerseCardProps = {
  verse: SavedVerse;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onRemove: () => void;
  onPlay: () => void;
  onOpenInMushaf: () => void;
};

export default function SavedVerseCard({
  verse,
  menuOpen,
  onToggleMenu,
  onRemove,
  onPlay,
  onOpenInMushaf,
}: SavedVerseCardProps) {
  const meta = [
    `الصفحة ${toArabicDigits(verse.page)}`,
    `الجزء ${toArabicDigits(verse.juz)}`,
    `حُفظت ${formatRelativeDate(verse.savedAt)}`,
  ].join(" · ");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>{`سورة ${verse.surahName}`}</Text>
          <Text style={styles.ayahLabel}>{`الآية ${toArabicDigits(verse.ayahNumber)}`}</Text>
        </View>

        <AppCardMenu
          open={menuOpen}
          onToggle={onToggleMenu}
          items={[{ label: "إزالة من المحفوظات", onPress: onRemove, danger: true }]}
        />
      </View>

      <Text style={styles.verse}>{`«${verse.ayahText}»`}</Text>

      <View style={styles.footer}>
        <Text style={styles.meta}>{meta}</Text>

        <View style={styles.actions}>
          <Pressable style={styles.playButton} onPress={onPlay}>
            <Play size={14} color={THEME.colors.primary} fill={THEME.colors.primary} />
          </Pressable>

          <Pressable style={styles.mushafButton} onPress={onOpenInMushaf}>
            <BookOpen size={14} color={THEME.colors.primary} />
            <Text style={styles.mushafText}>المصحف</Text>
          </Pressable>
        </View>
      </View>
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
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
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
    color: THEME.colors.primary,
  },
  ayahLabel: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  verse: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 22,
    lineHeight: 46,
    color: THEME.colors.text,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: FOOTER_BG,
  },
  meta: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: "#8A5A24",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SOFT_GREEN,
  },
  mushafButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: SOFT_GREEN,
  },
  mushafText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: THEME.colors.primary,
  },
});