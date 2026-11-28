import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

export default function QuranScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>شاشة الحلقات </Text>
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
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.xl,
    color: THEME.colors.primary,
  },
});
