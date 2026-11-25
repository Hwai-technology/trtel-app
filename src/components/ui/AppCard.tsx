import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

type CardVariant =
  | "default"
  | "morning"
  | "evening"
  | "info"
  | "error"
  | "warning"
  | "gold";

type AppCardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
};

export default function AppCard({
  children,
  variant = "default",
}: AppCardProps) {
  return <View style={[styles.card, styles[variant]]}>{children}</View>;
}

export function AppCardContent({ children }: { children: React.ReactNode }) {
  return <View style={styles.cardContent}>{children}</View>;
}
const styles = StyleSheet.create({
  cardContent: {
    backgroundColor: THEME.colors.cardInner,
    borderRadius: THEME.radius.sm,
    padding: THEME.spacing.md,
  },
  card: {
    borderRadius: THEME.radius.sm,
    padding: THEME.spacing.lg,
  },

  default: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
  },

  morning: {
    backgroundColor: "rgba(248, 220, 167, 0.3)",
  },

  evening: {
    backgroundColor: "rgba(154, 243, 223, 0.3)",
  },

  info: {
    backgroundColor: "rgba(229, 241, 237, 1)",
    borderWidth: 1,
    borderColor: "rgba(22, 134, 117, 0.25)",
  },

  error: {
    backgroundColor: THEME.colors.errorBackground,
    borderWidth: 1,
    borderColor: THEME.colors.errorBorder,
  },

  warning: {
    backgroundColor: "rgba(251, 223, 170, 0.3)",
  },

  gold: {
    backgroundColor: "rgba(217, 191, 140, 0.3)",
  },
});
