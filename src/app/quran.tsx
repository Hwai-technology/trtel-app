import { View, Text, StyleSheet, Pressable } from "react-native";
import { THEME } from "../constants/theme";
import { useState } from "react";
import AppFilterTabs from "../components/ui/AppFilterTabs";
import AppBottomSheet from "../components/ui/AppBottomSheet";
import { Bookmark, Copy, Share2, MessageSquare } from "lucide-react-native";
import AppQuickActions from "../components/ui/AppQuickActions";

export default function QuranScreen() {
  const [activeFilter, setActiveFilter] = useState("font");
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const filterOptions = [
    { label: "القراءة العادية", value: "reading" },
    { label: "ضبط الخط", value: "font" },
    { label: "الاستماع للآية", value: "audio" },
    { label: "مكتبتي القرآنية", value: "library" },
  ];

  return (
    <View style={styles.container}>
      <AppFilterTabs
        options={filterOptions}
        value={activeFilter}
        onChange={setActiveFilter}
      />
      <AppQuickActions />

      <Pressable
        style={styles.testButton}
        onPress={() => setIsSheetVisible(true)}
      >
        <Text style={styles.testButtonText}>اختبار فتح البوب أب</Text>
      </Pressable>

      <AppBottomSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      >
        <Text style={styles.sheetTitle}>عنوان البوب أب</Text>

        <Text style={styles.sheetText}>
          هذا محتوى تجريبي لاختبار شكل البوب أب.
        </Text>

        <Pressable
          style={styles.closeButton}
          onPress={() => setIsSheetVisible(false)}
        >
          <Text style={styles.closeButtonText}>إغلاق</Text>
        </Pressable>
      </AppBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    backgroundColor: THEME.colors.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },

  closeButtonText: {
    fontFamily: THEME.typography.fontFamily.medium,
    color: "#FFFFFF",
  },

  sheetTitle: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 18,
    color: THEME.colors.text,
    textAlign: "right",
  },

  sheetText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "right",
    marginTop: 12,
  },

  testButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 24,
  },

  testButtonText: {
    fontFamily: THEME.typography.fontFamily.medium,
    color: "#FFFFFF",
    fontSize: 14,
  },

  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.xl,
    color: THEME.colors.primary,
  },
});
