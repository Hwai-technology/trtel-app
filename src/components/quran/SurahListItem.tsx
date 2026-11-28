import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft, Star, Volume2 } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";
import type { Surah } from "../../constants/surahs";

const GOLD = "#C9A24D";
const GREEN = "#0B7A66";

type SurahListItemProps = {
  surah: Surah;
  onPress: () => void;
  onPlayAudio: () => void;
};

export default function SurahListItem({
  surah,
  onPress,
  onPlayAudio,
}: SurahListItemProps) {
  const isMakki = surah.type === "makki";
  const versesWord = surah.versesCount <= 10 ? "آيات" : "آية";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{toArabicDigits(surah.id)}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{surah.name}</Text>

          {surah.isTodaysWird && (
            <View style={[styles.badge, styles.greenBadge]}>
              <Text style={[styles.badgeText, styles.greenText]}>
                ورد اليوم
              </Text>
            </View>
          )}

          {surah.isFavorite && <Star size={14} color={GOLD} fill={GOLD} />}
        </View>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.badge,
              isMakki ? styles.makkiBadge : styles.greenBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isMakki ? styles.makkiText : styles.greenText,
              ]}
            >
              {isMakki ? "مكية" : "مدنية"}
            </Text>
          </View>

          <View style={styles.dot} />
          <Text style={styles.meta}>
            {toArabicDigits(surah.versesCount)} {versesWord}
          </Text>

          <View style={styles.dot} />
          <Text style={styles.meta}>صفحة {toArabicDigits(surah.page)}</Text>
        </View>
      </View>

      <Pressable onPress={onPlayAudio} hitSlop={8}>
        <Volume2 size={20} color={THEME.colors.textSecondary} />
      </Pressable>

      <ChevronLeft size={18} color={THEME.colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  numberBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F1EA",
  },
  number: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 16,
    color: THEME.colors.text,
  },
  info: {
    flex: 1,
    alignItems: "flex-end",
    gap: 6,
  },
  nameRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 17,
    color: THEME.colors.text,
  },
  metaRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  meta: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: THEME.colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 11,
  },
  makkiBadge: { backgroundColor: "#F3E7D4" },
  makkiText: { color: "#9A6B2F" },
  greenBadge: { backgroundColor: "#D8F3EA" },
  greenText: { color: GREEN },
});
