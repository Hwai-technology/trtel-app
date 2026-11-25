import { View, Text, Pressable, StyleSheet } from "react-native";

import { ChevronDown } from "lucide-react-native";
import { THEME } from "../../constants/theme";
import React, { useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type AppDropdownProps = {
  value: string;
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
  icon?: React.ReactNode;
};

export default function AppDropdown({
  value,
  options,
  placeholder = "اختر",
  onSelect,
  icon,
}: AppDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[styles.container, isOpen && styles.focused]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}

        <Text style={[styles.text, !selectedOption && styles.placeholder]}>
          {selectedOption?.label ?? placeholder}
        </Text>

        <ChevronDown size={20} color={THEME.colors.textSecondary} />
      </Pressable>

      {isOpen && (
        <View style={styles.options}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: 400,
    maxWidth: "100%",
    zIndex: 10,
  },

  container: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: THEME.radius.sm,
    paddingHorizontal: THEME.spacing.lg,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    ...THEME.shadows.medium,
  },

  focused: {
    borderColor: THEME.colors.primary,
  },

  icon: {
    marginLeft: THEME.spacing.md,
  },

  text: {
    flex: 1,
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 16,
    color: THEME.colors.text,
    textAlign: "right",
  },

  placeholder: {
    color: THEME.colors.textSecondary,
  },

  options: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: THEME.radius.sm,
    ...THEME.shadows.small,
  },

  option: {
    padding: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.stroke,
  },

  optionText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 16,
    color: THEME.colors.text,
    textAlign: "right",
  },
});
