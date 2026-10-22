import { useState } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../../hooks"; 

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false}} />
        <Stack.Screen name="auth" options={{ title: "Login", headerShown: false}} />
        <Stack.Screen name="menu" options={{ title: "Dasboard", headerShown: false}} />
      </Stack>
    </ThemeContext.Provider>
  );
}