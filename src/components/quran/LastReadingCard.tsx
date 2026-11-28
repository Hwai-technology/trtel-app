import { View, Text, Pressable, StyleSheet } from "react-native";
import { History, Play, ArrowLeft } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";

// ألوان من التصميم (بدّليها بألوان الثيم إذا موجودة)
const HERO_BG = "#0B5A4A";
const SOFT_TEXT = "#9ED7C7";
const BAR_COLOR = "#F2D675";

type LastReadingCardProps = {
  surahName: string;
  details: string;
  progress: number; // من 0 لـ 100
  timeAgo: string;
  onContinue: () => void;
  onPlay: () => void;
};

export default function LastReadingCard({
  surahName,
  details,
  progress,
  timeAgo,
  onContinue,
  onPlay,
}: LastReadingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.badge}>
          <History size={12} color="#D5EDE6" />
          <Text style={styles.badgeText}>آخر تلاوة مسجلة</Text>
        </View>
        <Text style={styles.time}>{timeAgo}</Text>
      </View>

      <View style={[styles.row, styles.titleRow]}>
        <Text style={styles.title}>{surahName}</Text>
        <Text style={styles.percent}>{toArabicDigits(progress)}%</Text>
      </View>

      <Text style={styles.details}>{details}</Text>

      {/* شريط التقدم: التعبئة بتبدأ من اليمين */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.row}>
        <Pressable style={styles.continueButton} onPress={onContinue}>
          <ArrowLeft size={16} color={HERO_BG} />
          <Text style={styles.continueText}>متابعة القراءة</Text>
        </Pressable>

        <Pressable style={styles.playButton} onPress={onPlay}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: HERO_BG,
    borderRadius: 16,
    padding: 16,
    ...THEME.shadows.medium,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  badgeText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: "#D5EDE6",
  },
  time: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: SOFT_TEXT,
  },
  titleRow: {
    marginTop: 14,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 26,
    color: "#FFFFFF",
  },
  percent: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: SOFT_TEXT,
  },
  details: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 13,
    color: SOFT_TEXT,
    textAlign: "right",
    marginTop: 4,
  },
  track: {
    flexDirection: "row-reverse",
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.25)",
    marginTop: 28,
    marginBottom: 16,
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: BAR_COLOR,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  continueText: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 13,
    color: HERO_BG,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});