import { View, Text, Pressable, StyleSheet } from "react-native";
import { Bookmark as BookmarkIcon, ArrowLeft } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import { formatRelativeDate } from "../../utils/date";
import type { Bookmark } from "../../context/BookmarksContext";
import AppCardMenu from "../ui/AppCardMenu";

const BROWN = "#8A5A24";
const QUOTE_BG = "#F6F4EC";

type BookmarkCardProps = {
  bookmark: Bookmark;
  isLast: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onRemove: () => void;
  onOpen: () => void;
};

export default function BookmarkCard({
  bookmark,
  isLast,
  menuOpen,
  onToggleMenu,
  onRemove,
  onOpen,
}: BookmarkCardProps) {
  const hasHizb = bookmark.hizb !== undefined && bookmark.quarter !== undefined;

  return (
    <View style={styles.card}>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.iconBox}>
            <BookmarkIcon size={18} color={BROWN} fill={BROWN} />
          </View>

          <View style={styles.titles}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{`سورة ${bookmark.surahName}`}</Text>

              {isLast && (
                <View style={styles.lastChip}>
                  <Text style={styles.lastChipText}>آخر موضع</Text>
                </View>
              )}
            </View>

            <Text style={styles.subtitle}>{formatRelativeDate(bookmark.createdAt)}</Text>
          </View>
        </View>

        <AppCardMenu
          open={menuOpen}
          onToggle={onToggleMenu}
          items={[{ label: "حذف العلامة", onPress: onRemove, danger: true }]}
        />
      </View>

      {/* الآية */}
      <View style={styles.quote}>
        <Text style={styles.verse} numberOfLines={3}>
          {`«${bookmark.ayahText}»`}
        </Text>
      </View>

      {/* الشارات */}
      <View style={styles.chips}>
        <Text style={styles.chip}>{`الآية ${toArabicDigits(bookmark.ayahNumber)}`}</Text>
        <View style={styles.dot} />
        <Text style={styles.chip}>{`الصفحة ${toArabicDigits(bookmark.page)}`}</Text>
        <View style={styles.dot} />
        <Text style={styles.chip}>{`الجزء ${toArabicDigits(bookmark.juz)}`}</Text>
      </View>

      {/* الفوتر: الزر عاليمين، والحزب عاليسار */}
      <View style={styles.footer}>
        {isLast ? (
          <Pressable style={styles.resumeButton} onPress={onOpen}>
            <ArrowLeft size={14} color="#FFFFFF" />
            <Text style={styles.resumeText}>استئناف القراءة</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.goLink} onPress={onOpen}>
            <ArrowLeft size={14} color={THEME.colors.primary} />
            <Text style={styles.goText}>الانتقال للموضع</Text>
          </Pressable>
        )}

        {hasHizb && (
          <Text style={styles.hizb}>
            {`حزب ${toArabicDigits(bookmark.hizb!)} • ربع ${toArabicDigits(bookmark.quarter!)}`}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    gap: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFE6D2",
  },
  titles: {
    alignItems: "flex-end",
    gap: 2,
  },
  titleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 15,
    color: THEME.colors.text,
  },
  lastChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#E4F2EE",
  },
  lastChipText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 10,
    color: THEME.colors.primary,
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },

  quote: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: QUOTE_BG,
  },
  verse: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 22,
    lineHeight: 44,
    color: THEME.colors.text,
    textAlign: "center",
  },

  chips: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#ECE9DF",
    overflow: "hidden",
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: THEME.colors.textSecondary,
  },

  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.primary,
  },
  resumeText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: "#FFFFFF",
  },
  goLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  goText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 12,
    color: THEME.colors.primary,
  },
  hizb: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: BROWN,
  },
});