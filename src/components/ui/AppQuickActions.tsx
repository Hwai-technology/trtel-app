import { View, Text, Pressable, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import { THEME } from "../../constants/theme";
import { Bookmark, Copy, Share2, MessageSquare } from "lucide-react-native";
// هي ازا بدنا الايقونات متغيرة
// export type QuickAction = {
//   label: string;
//   icon: ReactNode;
//   onPress: () => void;
// };

//هي ازا بدنا الايقونات ثابتة من هون
const QUICK_ACTIONS = [
  {
    label: "حفظ",
    icon: Bookmark,
    onPress: () => console.log("حفظ"),
  },
  {
    label: "نسخ",
    icon: Copy,
    onPress: () => console.log("نسخ"),
  },
  {
    label: "مشاركة",
    icon: Share2,
    onPress: () => console.log("مشاركة"),
  },
  {
    label: "ملاحظة",
    icon: MessageSquare,
    onPress: () => console.log("ملاحظة"),
  },
];

// type AppQuickActionsProps = {
//   actions: QuickAction[];
// };
export default function AppQuickActions() {
  return (
    <View style={styles.container}>
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;

        return (
          <Pressable
            key={action.label}
            style={styles.action}
            onPress={action.onPress}
          >
            <Icon size={20} color={THEME.colors.primary} />

            <Text style={styles.label}>{action.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    maxWidth: "100%",
    alignSelf: "center",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
  },

  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "center",
  },
});
