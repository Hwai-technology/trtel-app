
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { THEME } from "../../constants/theme";

export default function AppTasbeehCounter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>
        {count}
      </Text>

      <Pressable
        style={styles.counterButton}
        onPress={() => setCount((prev) => prev + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  count: {
    fontFamily: THEME.typography.fontFamily.bold,
    fontSize: 18,
    color: THEME.colors.text,
  },

  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: THEME.typography.fontFamily.bold,
  },
});
