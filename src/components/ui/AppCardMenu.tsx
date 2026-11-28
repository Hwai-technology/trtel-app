import { View, Text, Pressable, StyleSheet } from "react-native";
import { MoreVertical } from "lucide-react-native";

import { THEME } from "../../constants/theme";

export type CardMenuItem = {
  label: string;
  onPress: () => void;
  danger?: boolean;
};

type AppCardMenuProps = {
  open: boolean;
  onToggle: () => void;
  items: CardMenuItem[];
};

export default function AppCardMenu({ open, onToggle, items }: AppCardMenuProps) {
  return (
    <View style={[styles.wrapper, open && styles.wrapperOpen]}>
      <Pressable style={styles.button} onPress={onToggle} hitSlop={8}>
        <MoreVertical size={18} color={THEME.colors.textSecondary} />
      </Pressable>

      {open && (
        <View style={styles.menu}>
          {items.map((item, index) => (
            <View key={item.label}>
              {index > 0 && <View style={styles.divider} />}

              <Pressable style={styles.item} onPress={item.onPress}>
                <Text style={[styles.text, item.danger ? styles.danger : styles.normal]}>
                  {item.label}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  // لما القائمة مفتوحة، بتطلع فوق الكروت التانية
  wrapperOpen: {
    zIndex: 20,
  },
  button: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    position: "absolute",
    top: 34,
    left: 0,
    width: 150,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: THEME.colors.stroke,
    elevation: 6,
    ...THEME.shadows.small,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "flex-end",
  },
  text: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    textAlign: "right",
  },
  normal: { color: THEME.colors.text },
  danger: { color: "#D32F2F" },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.stroke,
  },
});