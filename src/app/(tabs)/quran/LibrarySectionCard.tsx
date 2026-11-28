import type { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { THEME } from "../../../constants/theme";

const FOOTER_BG = "#F8F5EC";

type LibrarySectionCardProps = {
  icon: ReactNode;
  iconTint: string;
  title: string;
  badge: string;
  badgeTint: string;
  badgeColor: string;
  subtitle: string;
  footerIcon: ReactNode;
  footerText: string;
  onPress: () => void;
};

export default function LibrarySectionCard({
  icon,
  iconTint,
  title,
  badge,
  badgeTint,
  badgeColor,
  subtitle,
  footerIcon,
  footerText,
  onPress,
}: LibrarySectionCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.body}>
        <View style={[styles.iconBox, { backgroundColor: iconTint }]}>
          {icon}
        </View>

        <View style={styles.texts}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.badge, { backgroundColor: badgeTint }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {badge}
              </Text>
            </View>
          </View>

          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerGroup}>
          {footerIcon}
          <Text style={styles.footerText}>{footerText}</Text>
        </View>

        <Text style={styles.more}>متابعة</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...THEME.shadows.small,
  },
  body: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    flex: 1,
    alignItems: "flex-end",
    gap: 6,
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 11,
  },
  subtitle: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "right",
  },
  footer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: FOOTER_BG,
  },
  footerGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  more: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 11,
    color: THEME.colors.primary,
  },
});
