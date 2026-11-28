import type { ReactNode } from "react";
import {
  Modal,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import { THEME } from "../../constants/theme";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function AppModal({
  visible,
  onClose,
  children,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* بيرفع النافذة لما تطلع الكيبورد */}
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* الخلفية المعتّمة: ضغطة عليها بتسكّر */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.card}>{children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: THEME.spacing.lg,
    ...THEME.shadows.medium,
  },
});
