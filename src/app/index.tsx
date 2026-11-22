import { View, Text, StyleSheet } from "react-native";

export default function HomeRoute() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tarteel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F6EF",
  },
  text: {
    fontFamily: "Tajawal-Bold",
    fontSize: 28,
    color: "#047464",
  },
});
