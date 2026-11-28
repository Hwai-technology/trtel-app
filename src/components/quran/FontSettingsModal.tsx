import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { X, Type, Play } from "lucide-react-native";

import { THEME } from "../../constants/theme";
import { FONT_SIZE_MIN, FONT_SIZE_MAX } from "../../context/SettingsContext";
import AppModal from "../ui/AppModal";
import AppButton from "../ui/AppButton";

const BROWN = "#8A5A24";
const CREAM = "#FBF7EA";
const BUTTON_CREAM = "#F6F3EA";

type FontSettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  value: number;
  onChange: (size: number) => void;
  onSave: () => void;
};

export default function FontSettingsModal({
  visible,
  onClose,
  value,
  onChange,
  onSave,
}: FontSettingsModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      {/* الهيدر */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Type size={20} color={BROWN} />
          <Text style={styles.title}>خيارات القراءة والخط</Text>
        </View>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <X size={18} color={THEME.colors.text} />
        </Pressable>
      </View>

      {/* حجم الخط */}
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <Text style={styles.label}>حجم الخط القرآني</Text>
          <Text style={styles.value}>{`${Math.round(value)}px`}</Text>
        </View>

        <View style={styles.sliderRow}>
          <Text style={styles.smallA}>A</Text>

          {/* مقلوب أفقياً: الصغير عاليمين والكبير عاليسار */}
          <Slider
            style={styles.slider}
            minimumValue={FONT_SIZE_MIN}
            maximumValue={FONT_SIZE_MAX}
            step={1}
            value={value}
            onValueChange={onChange}
            minimumTrackTintColor={THEME.colors.primary}
            maximumTrackTintColor="#E8E4D8"
            thumbTintColor={THEME.colors.primary}
          />

          <Text style={styles.bigA}>A</Text>
        </View>
      </View>

      {/* الحفظ */}
      <View style={styles.section}>
        <AppButton
          title="حفظ تنسيق الخط"
          onPress={onSave}
          icon={<Play size={14} color="#FFFFFF" fill="#FFFFFF" />}
          iconPosition="right"
        />
      </View>
    </AppModal>
  );
}

const serif = Platform.select({ ios: "Georgia", default: "serif" });

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 14,
    color: THEME.colors.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BUTTON_CREAM,
  },

  box: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: CREAM,
    gap: 8,
  },
  boxHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.text,
  },
  value: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: 12,
    color: BROWN,
  },

  sliderRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 32,
    transform: [{ scaleX: -1 }],
  },
  smallA: {
    fontFamily: serif,
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  bigA: {
    fontFamily: serif,
    fontSize: 20,
    fontWeight: "700",
    color: THEME.colors.text,
  },

  section: {
    marginTop: 16,
  },
});
