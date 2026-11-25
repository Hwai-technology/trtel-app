import type { ReactNode } from "react";

import { View, Text, Pressable, StyleSheet } from "react-native";

import { ArrowRight } from "lucide-react-native";
import { THEME } from "../../constants/theme";

type AppBarProps = {
  title: string;
  onBack: () => void;
  logo?: ReactNode;
};

export default function AppBar({ title, onBack, logo }: AppBarProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <ArrowRight size={22} color={THEME.colors.text} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

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
