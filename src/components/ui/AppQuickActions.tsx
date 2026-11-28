import { View, Text, Pressable, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import { THEME } from "../../constants/theme";
import {
  Type, // ← جديد (بدل Bookmark)
  BookOpen,
  MessageCircle,
  Triangle,
  type LucideIcon,
} from "lucide-react-native";
// هي ازا بدنا الايقونات متغيرة
// export type QuickAction = {
//   label: string;
//   icon: ReactNode;
//   onPress: () => void;
// };
export type QuickActionId = "font" | "tafsir" | "bookmark" | "note";

type QuickAction = {
  id: QuickActionId;
  label: string;
  icon: LucideIcon;
  tint: string; // لون خلفية الدايرة
  color: string; // لون الأيقونة
  filled?: boolean; // الأيقونة معبّاة
  flip?: boolean; // قلب الأيقونة (للمثلث)
};

// الترتيب: أول واحد عاليمين (لأنه row-reverse)
const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "font",
    label: "الخط",
    icon: Type,
    tint: "#D9EEE8",
    color: "#0B7A66",
    filled: true,
  },
  {
    id: "tafsir",
    label: "التفسير\nوالتدبر",
    icon: BookOpen,
    tint: "#F7DDA8",
    color: "#8A5A24",
  },
  {
    id: "note",
    label: "اضافة\nملاحظة",
    icon: MessageCircle,
    tint: "#EBE9E4",
    color: "#8B3A2E",
  },
  {
    id: "bookmark",
    label: "علامة\nمرجعية",
    icon: Triangle,
    tint: "#E4EBE6",
    color: "#0B7A66",
    flip: true,
  },
];

type AppQuickActionsProps = {
  onAction: (id: QuickActionId) => void;
  bookmarked?: boolean; // ← جديد
};

export default function AppQuickActions({
  onAction,
  bookmarked = false, // ← جديد
}: AppQuickActionsProps) {
  return (
    <View style={styles.container}>
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        const isActiveBookmark = action.id === "bookmark" && bookmarked;
        const label = isActiveBookmark ? "إزالة\nالعلامة" : action.label;
        const filled = action.filled || isActiveBookmark;

        return (
          <Pressable
            key={action.id}
            style={styles.action}
            onPress={() => onAction(action.id)}
          >
            <View style={[styles.iconCircle, { backgroundColor: action.tint }]}>
              <Icon
                size={20}
                color={action.color}
                fill={action.filled ? action.color : "none"}
                style={
                  action.flip
                    ? { transform: [{ rotate: "180deg" }] }
                    : undefined
                }
              />
            </View>

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
    gap: 12,
  },

  action: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 14,
    backgroundColor: "#FBF7EA",
  },

  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: "center",
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
