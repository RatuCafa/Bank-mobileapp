import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export function backButton() {
  const style = StyleSheet.create({
    button: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      borderColor: "#ffffff",
      borderRadius: 60,
      borderWidth: 5,
      width: 100,
      alignItems: "center",
      marginBottom: 40
    },
    title: {
      fontSize: 18,
      color: "#FFFFFF",
      fontWeight: "600",
    }
  });

  // Fungsi cerdas untuk mencegah error GO_BACK
  const handleSafeBack = () => {
    if (router.canGoBack()) {
      router.back(); // Mundur normal jika ada histori
    } else {
      router.replace("/" as any); // Paksa ke beranda jika histori kosong
    }
  };

  return (
    <TouchableOpacity style={style.button} onPress={handleSafeBack}>
      <Ionicons name="arrow-back-circle-outline" size={24} color="#ffffff" />
      <Text style={style.title}>
        Back
      </Text>
    </TouchableOpacity>
  );
}