import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  House,
  BookOpen,
  Sprout,
  Users,
  MoreHorizontal,
} from "lucide-react-native";

import { THEME } from "../../constants/theme";
export type NavTab = "home" | "quran" | "azkar" | "circles" | "more";
// type NavTab = "home" | "quran" | "azkar" | "circles" | "more";

type AppBottomNavProps = {
  activeTab: NavTab;
  onTabPress: (tab: NavTab) => void;
};

const NAV_ITEMS = [
  {
    id: "home",
    label: "الرئيسية",
    icon: House,
  },
  {
    id: "quran",
    label: "القرآن",
    icon: BookOpen,
  },
  {
    id: "azkar",
    label: "الأذكار",
    icon: Sprout,
  },
  {
    id: "circles",
    label: "المقرأة",
    icon: Users,
  },
  {
    id: "more",
    label: "المزيد",
    icon: MoreHorizontal,
  },
] as const;

export default function AppBottomNav({
  activeTab,
  onTabPress,
}: AppBottomNavProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { height: 64 + insets.bottom, paddingBottom: insets.bottom },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <Pressable
            key={item.id}
            onPress={() => onTabPress(item.id)}
            style={styles.tab}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIcon]}>
              <Icon
                size={21}
                color={isActive ? "#FFFFFF" : THEME.colors.textSecondary}
              />
            </View>

            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: THEME.spacing.sm,
    ...THEME.shadows.small,
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  iconContainer: {
    width: 48,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: THEME.radius.full,
  },

  activeIcon: {
    backgroundColor: THEME.colors.primary,
  },

  label: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: THEME.typography.fontSize.xs,
    color: THEME.colors.textSecondary,
  },

  activeLabel: {
    fontFamily: THEME.typography.fontFamily.bold,
    color: THEME.colors.primary,
  },
});
