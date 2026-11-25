import { useState } from "react";

import { View, TextInput, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";

type AppInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

export default function AppInput({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 400,
    maxWidth: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: THEME.radius.sm,
    paddingHorizontal: THEME.spacing.lg,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    ...THEME.shadows.small,
  },

  focused: {
    borderColor: THEME.colors.primary,
  },

  icon: {
    marginLeft: THEME.spacing.md,
  },

 input: {
  flex: 1,
  fontFamily: THEME.typography.fontFamily.regular,
  fontSize: 16,
  color: THEME.colors.text,
  textAlign: "right",
  padding: 0,

  borderWidth: 0,
  borderColor: "transparent",
  outlineWidth: 0,
  outlineStyle: "none" as any,
},
});
