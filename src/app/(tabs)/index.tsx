import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotes } from "@/context/NotesContext";
import { THEME } from "@/constants/theme";

// ارتفاع الشريط السفلي، عشان آخر المحتوى ما يتغطى
const TAB_BAR_HEIGHT = 64;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
const { notes } = useNotes();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + THEME.spacing.xxl },
        ]}
      >
        <Text style={styles.title}>الرئيسية</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    padding: THEME.spacing.xxl,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.display,
    color: THEME.colors.primary,
    textAlign: "right",
  },
});