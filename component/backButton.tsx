import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export function backButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Ionicons
        name="arrow-back-circle-outline"
        size={24}
        color="#FFFFFF"
      />
      <Text style={styles.title}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderColor: "#FFFFFF",
    borderRadius: 60,
    borderWidth: 2,
    width: 100,
    height: 44,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
