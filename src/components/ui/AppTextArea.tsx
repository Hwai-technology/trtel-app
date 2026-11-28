import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";

type AppTextAreaProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
};

export default function AppTextArea({
  value,
  onChangeText,
  placeholder,
  maxLength,
  autoFocus = false,
}: AppTextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.textSecondary}
        multiline
        maxLength={maxLength}
        autoFocus={autoFocus}
        textAlignVertical="top"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />

      {maxLength !== undefined && (
        <Text style={styles.counter}>
          {toArabicDigits(value.length)}/{toArabicDigits(maxLength)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    backgroundColor: "#FBF7EA",
    borderRadius: THEME.radius.sm,
    padding: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: "transparent",
  },

  focused: {
    borderColor: THEME.colors.primary,
  },

  input: {
    flex: 1,
    minHeight: 72,
    maxHeight: 160,
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

  counter: {
    alignSelf: "flex-start",
    marginTop: 8,
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
});