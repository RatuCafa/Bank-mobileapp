
import { useState } from "react";
import {
  Stack,
  useRouter,
} from "expo-router";
import {
  ActivityIndicator,
  View,
} from "react-native";

import { ThemeContext } from "../../hooks";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function AppNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Halaman yang hanya bisa dibuka saat belum login */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
      </Stack.Protected>

      {/* Halaman yang hanya bisa dibuka saat sudah login */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="menu" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeContext.Provider>
  );
}
