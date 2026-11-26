
import { useState } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../../hooks";
import { AuthProvider } from "../../context/AuthContext";

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />

          <Stack.Screen
            name="auth"
            options={{ title: "Login", headerShown: false }}
          />

          <Stack.Screen
            name="menu"
            options={{ title: "Dashboard", headerShown: false }}
          />
        </Stack>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
