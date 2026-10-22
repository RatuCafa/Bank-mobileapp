import { LoginPage } from "./auth/signin";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { pageStyles } from "../../styles";

export default function LoginScreen() {
  return (
    <ScrollView>
      <View style={pageStyles.container}>
        {/* 1. Bagian Atas: Teks Judul Rata Kiri */}
        <View style={pageStyles.headerContainer}>
          <Text style={pageStyles.subTitle}>My Camel</Text>
          <Text style={pageStyles.mainTitle}>
            Your Digital{"\n"}Wallet{"\n"}Simplified
          </Text>
        </View>

        {/* 2. Bagian Tengah: Gambar Ilustrasi Mengambang */}
        <View style={pageStyles.imageContainer}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/077/247/968/small/3d-cute-cartoon-brown-leather-wallet-with-credit-cards-inside-isolated-on-transparent-background-png.png",
            }}
            style={pageStyles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* 3. Bagian Bawah: Tombol Login Oval */}
        <View style={pageStyles.buttonContainer}>
          {/* Tombol Atas berubah jadi Sign Up */}
          <TouchableOpacity
            style={pageStyles.googleButton}
            onPress={() => router.push("./auth/signup")}
          >
            <Text style={pageStyles.googleButtonText}>Sign Up now</Text>
          </TouchableOpacity>

          {/* Tombol Bawah berubah jadi Sign In */}
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
