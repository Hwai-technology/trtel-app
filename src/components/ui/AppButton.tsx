import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { ReactNode } from "react";
import { THEME } from "../../constants/theme";

// أنواع التصاميم والأحجام
type ButtonVariant = "primary" | "secondary-white" | "secondary-cream" | "danger";

type ButtonSize = "large" | "small";

// الخصائص التي يستقبلها الزر
type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right"; // ← جديد
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "large",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
}: AppButtonProps) {
  const isFilled = variant === "primary" || variant === "danger";

  const textColor = disabled
    ? "#b3bdbb"
    : isFilled
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
        variant === "danger" && styles.danger,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {iconPosition === "left" && icon}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
          {iconPosition === "right" && icon}
        </>
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
    gap: 8,
  },

  // الأحجام
  large: {
    width: "100%",
    height: 48,
  },
// وبالـ styles
danger: {
  backgroundColor: "#D32F2F",
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
