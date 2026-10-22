import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";

export default function LoginEmailScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* 1. Lengkungan Putih di Background Bawah */}
      <View style={styles.whiteCurve} />

      {/* 2. Konten Utama (Berada di atas lengkungan) */}
      <View style={styles.content}>
        
        {/* Header: Tombol Back & Teks Sign In */}
        <TouchableOpacity 
          onPress={() => router.replace('/')} 
          style={styles.headerRow}
        >
          <View style={styles.backButton}>
            <Text style={styles.backIcon}>{"<"}</Text>
          </View>
          <Text style={styles.headerTitle}>Sign in</Text>
        </TouchableOpacity>

        {/* Teks Sambutan */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.helloText}>Hello there, sign in to continue</Text>
        </View>

        {/* 3. Gambar Kartu Metalik Sesuai Permintaan */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/071/928/583/small_2x/double-dark-metallic-banking-cards-3d-icon-png.png" }}
            style={styles.metallicCard}
            resizeMode="contain"
          />
        </View>

        {/* 4. Form Input */}
        <View style={styles.formSection}>
          <TextInput
            style={styles.input}
            placeholder="Username/Email"
            placeholderTextColor="#E0E0E0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#E0E0E0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot your password ?</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Tombol Sign In & Sign Up */}
        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.signUpRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A27B5C", // Warna coklat kopi susu sesuai gambar
  },
  // Trik membuat lengkungan putih di bawah
  whiteCurve: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "51%", 
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 120, // Membuat kurva melengkung tajam di kiri atas
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  
  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Sambutan
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  helloText: {
    fontSize: 14,
    color: "#2C2C2C", // Warna abu gelap/hitam
    fontWeight: "700",
  },

  // Gambar Sisipan
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  metallicCard: {
    width: 350,
    height: 200,
  },

  // Form
  formSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(139, 134, 134, 0.78)", // Transparan putih
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    fontSize: 15,
    color: "#333", // Warna teks ketikan
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  // Footer & Tombol
  footerSection: {
    marginTop: "auto", // Mendorong ke paling bawah layar
    paddingBottom: 40,
  },
  signInButton: {
    backgroundColor: "#A27B5C", // Coklat yang sama dengan background atas
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    color: "#666",
    fontSize: 13,
  },
  signUpText: {
    color: "#A27B5C",
    fontSize: 13,
    fontWeight: "bold",
  },
});