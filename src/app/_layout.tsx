import { useState } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../../hooks"; 

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="auth" options={{ title: "Login" }} />
      </Stack>
    </ThemeContext.Provider>
  );
}