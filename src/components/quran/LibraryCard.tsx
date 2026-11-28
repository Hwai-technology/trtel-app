import type { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ArrowLeft, Bookmark, Heart, PenLine } from "lucide-react-native";

import { THEME } from "../../constants/theme";

type StatProps = {
  icon: ReactNode;
  tint: string;
  value: number;
  label: string;
  onPress?: () => void;
};

function Stat({ icon, tint, value, label, onPress }: StatProps) {
  return (
    <Pressable style={styles.stat} onPress={onPress} disabled={!onPress}>
      <View style={[styles.statIcon, { backgroundColor: tint }]}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

type LibraryCardProps = {
  bookmarks: number;
  savedVerses: number;
  notes: number;
  onPress?: () => void;
  onBookmarksPress?: () => void;
  onSavedPress?: () => void; // ← جديد
  onNotesPress?: () => void;
  hideHeader?: boolean; // ← جديد
};

export default function LibraryCard({
  bookmarks,
  savedVerses,
  notes,
  onPress,
  onBookmarksPress,
  onSavedPress,
  onNotesPress,
  hideHeader = false,
}: LibraryCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} disabled={!onPress}>
      {!hideHeader && (
        <View style={styles.header}>
          <Text style={styles.title}>مكتبتي القرآنية</Text>
          <ArrowLeft size={16} color={THEME.colors.text} />
        </View>
      )}

      <View style={[styles.stats, !hideHeader && styles.statsWithHeader]}>
        <Stat
          icon={<Bookmark size={18} color="#8A5A24" fill="#8A5A24" />}
          tint="#FBEBD3"
          value={bookmarks}
          label="علامات مرجعية"
          onPress={onBookmarksPress}
        />
        <Stat
          icon={<Heart size={18} color="#0B7A66" fill="#0B7A66" />}
          tint="#CDF5EA"
          value={savedVerses}
          label="آيات محفوظة"
          onPress={onSavedPress}
        />
        <Stat
          icon={<PenLine size={18} color="#8B3A2E" />}
          tint="#E8E6DF"
          value={notes}
          label="ملاحظات وتدبّر"
          onPress={onNotesPress}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    ...THEME.shadows.small,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 16,
    color: THEME.colors.text,
  },
  stats: {
    flexDirection: "row-reverse",
  },
  statsWithHeader: {
    marginTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 18,
    color: THEME.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
});