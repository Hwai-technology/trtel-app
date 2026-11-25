import { View, Text, Pressable, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

type FilterOption = {
  label: string;
  value: string;
};

type AppFilterTabsProps = {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function AppFilterTabs({
  options,
  value,
  onChange,
}: AppFilterTabsProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isActive && styles.activeOption]}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {option.label}
            </Text>
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
    height: 30,
    alignSelf: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: THEME.colors.cardInner,
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
    borderRadius: 6,
    padding: 3,
  },

  option: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  activeOption: {
    backgroundColor: THEME.colors.primary,
  },

  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },

  activeLabel: {
    color: "#FFFFFF",
    fontFamily: THEME.typography.fontFamily.bold,
  },
});
