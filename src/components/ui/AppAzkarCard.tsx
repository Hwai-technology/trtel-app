import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { THEME } from "../../constants/theme";

type AppAzkarCardProps = {
  text: string;
  repetitions: number;
};

export default function AppAzkarCard({ text, repetitions }: AppAzkarCardProps) {
  const [count, setCount] = useState(0);

  const isCompleted = count >= repetitions;

  const handlePress = () => {
    if (isCompleted) return;

    setCount((prev) => Math.min(prev + 1, repetitions));
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isCompleted}
      style={[styles.container, isCompleted && styles.completedContainer]}
    >
      <Text style={styles.text}>{text}</Text>

      <View style={styles.footer}>
        <Text style={styles.counter}>
          {count} / {repetitions}
        </Text>

        {isCompleted && (
          <View style={styles.completedBadge}>
            <Check size={14} color="#047464" />
            <Text style={styles.completedText}>تم الإتمام</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    maxWidth: "100%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
    borderRadius: 6,
    padding: THEME.spacing.lg,
    gap: 16,
  },

  completedContainer: {
    backgroundColor: "#F0F7F4",
    borderColor: "#B8D9CE",
  },

  text: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 16,
    color: THEME.colors.text,
    textAlign: "right",
    lineHeight: 28,
  },

  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },

  counter: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 14,
    color: THEME.colors.primary,
  },

  completedBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 4,
  },

  completedText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: THEME.colors.primary,
  },
});
