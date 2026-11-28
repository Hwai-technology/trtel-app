import type { ReactNode } from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

type AppBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function AppBottomSheet({
  visible,
  onClose,
  children,
}: AppBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D9D6CC",
    alignSelf: "center",
    marginBottom: THEME.spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "transparent",
  },

  sheet: {
    width: 400,
    maxWidth: "100%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xxl,
    overflow: "hidden",
  },
});
