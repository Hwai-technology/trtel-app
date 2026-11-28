import { View, Text, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";

type AyahPreviewProps = {
  text: string;
};

export default function AyahPreview({ text }: AyahPreviewProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.text} numberOfLines={4}>
        {`«${text}»`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FBF7EA",
  },
  text: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 18,
    lineHeight: 34,
    color: THEME.colors.text,
    textAlign: "center",
  },
});