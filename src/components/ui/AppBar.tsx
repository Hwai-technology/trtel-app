import type { ReactNode } from "react";

import { View, Text, Pressable, StyleSheet } from "react-native";

import { ArrowRight } from "lucide-react-native";
import { THEME } from "../../constants/theme";

type AppBarProps = {
  title?: string;
   subtitle?: string; 
  onBack: () => void;
  logo?: ReactNode;
  badge?: string;
};

export default function AppBar({ title, subtitle, onBack, logo, badge }: AppBarProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <ArrowRight size={22} color={THEME.colors.text} />
      </Pressable>
  {title ? (
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : null}
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}

      <View style={styles.spacer} />

      <View style={styles.logo}>{logo}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 440,
    maxWidth: "100%",
    height: 56,
    alignSelf: "center",
    backgroundColor: THEME.colors.background,
    paddingHorizontal: THEME.spacing.lg,
    flexDirection: "row-reverse",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  badge: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#ECE9DF",
  },

  badgeText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },

  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: THEME.radius.sm,
    alignItems: "center",
    justifyContent: "center",
    ...THEME.shadows.small,
  },

  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 16,
    color: THEME.colors.text,
    marginRight: THEME.spacing.lg,
  },
subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
   // العنوان والسطر الفرعي فوق بعض
  titleBlock: {
    marginRight: THEME.spacing.lg,
    alignItems: "flex-end",
  },

  spacer: {
    flex: 1,
  },

  logo: {
    width: 44,
    height: 30,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: THEME.colors.primary,

    borderTopLeftRadius: 22,
    borderBottomRightRadius: 22,

    overflow: "hidden",
    padding: 3,
  },
});
