import { useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pageStyles } from "../../styles";
import { ThemeContext } from "../../hooks"; 

export default function LoginScreen() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme !== null) {
          setDarkMode(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Gagal memuat tema:", error);
      }
    };

    loadTheme();
  }, []); 

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("appTheme", darkMode ? "dark" : "light");
        console.log("Tema disimpan:", darkMode ? "Dark Mode" : "Light Mode");
      } catch (error) {
        console.error("Gagal menyimpan tema:", error);
      }
    };

    saveTheme();
  }, [darkMode]); 

  return (
    <ScrollView style={{ backgroundColor: darkMode ? "#121212" : "#F5E6D3", flex: 1 }}>
      <View style={[pageStyles.container, { backgroundColor: darkMode ? "#121212" : "#F5E6D3" }]}>
        
        {/* Tombol Toggle Tema */}
        <TouchableOpacity 
          style={{ alignSelf: 'flex-end', padding: 10 }}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Text style={{ color: darkMode ? "#FFF" : "#000", fontWeight: "bold" }}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>

        {/* Bagian Atas: Teks Judul */}
        <View style={pageStyles.headerContainer}>
          <Text style={[pageStyles.subTitle, { color: darkMode ? "#BBBBBB" : "gray" }]}>
            My Camel
          </Text>
          <Text style={[pageStyles.mainTitle, { color: darkMode ? "#FFFFFF" : "#000000" }]}>
            Your Digital Wallet{"\n"}Simplified
          </Text>
        </View>

        {/* Bagian Tengah: Gambar */}
        <View style={pageStyles.imageContainer}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/077/247/968/small/3d-cute-cartoon-brown-leather-wallet-with-credit-cards-inside-isolated-on-transparent-background-png.png",
            }}
            style={pageStyles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Bagian Bawah: Tombol Navigasi */}
        <View style={pageStyles.buttonContainer}>
          <TouchableOpacity
            style={pageStyles.googleButton}
            onPress={() => router.push("./auth/signup")}
          >
            <Text style={pageStyles.googleButtonText}>Sign Up now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={pageStyles.emailButton}
            onPress={() => router.push("./auth")}
          >
            <Text style={pageStyles.emailButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}