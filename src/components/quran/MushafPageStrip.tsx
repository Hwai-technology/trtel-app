import { View, Text, StyleSheet } from "react-native";
import { Bookmark } from "lucide-react-native";

import { THEME } from "../../constants/theme";

type MushafPageStripProps = {
  right: string;
  center: string;
  left: string;
  edge: "top" | "bottom";
  highlightCenter?: boolean;
  bookmarked?: boolean; // ← جديد
};

export default function MushafPageStrip({
  right,
  center,
  left,
  edge,
  highlightCenter = false,
  bookmarked = false,
}: MushafPageStripProps) {
  return (
    <View
      style={[
        styles.strip,
        edge === "top" ? styles.lineBelow : styles.lineAbove,
      ]}
    >
      <Text style={[styles.text, styles.right]}>{right}</Text>

      <View style={styles.centerGroup}>
        {bookmarked && (
          <Bookmark
            size={14}
            color={THEME.colors.primary}
            fill={THEME.colors.primary}
          />
        )}
        <Text style={[styles.text, highlightCenter && styles.centerHighlight]}>
          {center}
        </Text>
      </View>

      <Text style={[styles.text, styles.left]}>{left}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: THEME.colors.stroke,
  },
  lineBelow: {
    borderBottomWidth: 1,
  },
  lineAbove: {
    borderTopWidth: 1,
  },
  text: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  right: {
    flex: 1,
    textAlign: "right",
  },
  centerGroup: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 4,
  },
  left: {
    flex: 1,
    textAlign: "left",
  },
  centerHighlight: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 14,
    color: THEME.colors.primary,
  },
});
