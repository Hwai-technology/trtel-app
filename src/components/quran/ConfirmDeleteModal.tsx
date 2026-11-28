import { View, Text, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";
import AppModal from "../ui/AppModal";
import AppButton from "../ui/AppButton";

type ConfirmDeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  visible,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>حذف الملاحظة؟</Text>
      <Text style={styles.message}>
        لن تتمكن من استرجاع هذه الملاحظة بعد حذفها.
      </Text>

      <View style={styles.buttons}>
        <View style={styles.buttonWrap}>
          <AppButton
            title="إلغاء"
            variant="secondary-white"
            onPress={onClose}
          />
        </View>
        <View style={styles.buttonWrap}>
          <AppButton title="حذف" variant="danger" onPress={onConfirm} />
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 16,
    color: THEME.colors.text,
    textAlign: "right",
  },
  message: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: "right",
    marginTop: 8,
  },
  buttons: {
    flexDirection: "row-reverse",
    gap: 12,
    marginTop: 20,
  },
  buttonWrap: {
    flex: 1,
  },
});
