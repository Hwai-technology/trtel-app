import { View, Text, StyleSheet } from "react-native";

import { THEME } from "../../constants/theme";
import { toArabicDigits } from "../../utils/arabic";

const OLIVE = "#6B5A2E";
const QUOTE_BG = "#F6F1E6";

type AyahQuoteProps = {
  text: string;
  page: number;
  juz: number;
};

export default function AyahQuote({ text, page, juz }: AyahQuoteProps) {
  return (
    <View style={styles.quote}>
      <Text style={styles.text} numberOfLines={1}>
        {`«${text}»`}
      </Text>

      <View style={styles.chip}>
        <Text style={styles.chipText}>
          {`صفحة ${toArabicDigits(page)} · جزء ${toArabicDigits(juz)}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    gap: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: QUOTE_BG,
    borderRightWidth: 4,
    borderRightColor: OLIVE,
  },
  text: {
    fontFamily: THEME.typography.fontFamily.quran,
    fontSize: 20,
    lineHeight: 36,
    color: THEME.colors.text,
    textAlign: "right",
  },
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#ECE9DF",
  },
  chipText: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
});