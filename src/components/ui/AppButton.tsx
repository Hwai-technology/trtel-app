import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

import { THEME } from "../../constants/theme";

// أنواع التصاميم والأحجام
type ButtonVariant = "primary" | "secondary-white" | "secondary-cream";

type ButtonSize = "large" | "small";

// الخصائص التي يستقبلها الزر
type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "large",
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const isPrimary = variant === "primary";

  const textColor = disabled
    ? "#b3bdbb"
    : isPrimary
      ? "#FFFFFF"
      : THEME.colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        size === "large" ? styles.large : styles.small,
        variant === "primary" && styles.primary,
        variant === "secondary-white" && styles.secondaryWhite,
        variant === "secondary-cream" && styles.secondaryCream,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
           { color: textColor }]} >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // التنسيق المشترك لكل الأزرار
  button: {
    borderRadius: THEME.radius.sm,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  // الأحجام
  large: {
    width: "100%",
    height: 48,
  },

  small: {
    width: 196,
    height: 38,
  },

  // التصميم الأساسي
  primary: {
    backgroundColor: THEME.colors.primary,
  },

  // التصميم الثانوي الأبيض
  secondaryWhite: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
  },

  // التصميم الثانوي الكريمي
  secondaryCream: {
    backgroundColor: "#F0F2ED",
    borderColor: THEME.colors.stroke,
  },

  // النص
  text: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: THEME.typography.fontSize.md,
    // color: THEME.colors.text,
    textAlign: "center",
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: THEME.colors.textSecondary,
  },

  // حالة التعطيل
  disabled: {
    opacity: 0.45,
  },
});
