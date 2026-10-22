import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { backButton as BackButton } from "../component";
import { handleLogin } from "../functions";
import { SignInStyle } from "../styles";


export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView>
      <View style={SignInStyle.container}>
        {/* 1. Lengkungan Putih di Background Bawah */}
        <View style={SignInStyle.whiteCurve} />

        {/* 2. Konten Utama (Berada di atas lengkungan) */}
        <View style={SignInStyle.content}>
          {/* Header: Tombol Back & Teks Sign In */}
          {/*<TouchableOpacity
            onPress={() => router.replace("/")}
            style={SignInStyle.headerRow}
          >
            <View style={SignInStyle.backButton}>
              <Text style={SignInStyle.backIcon}>{"<"}</Text>
            </View>
            <Text style={SignInStyle.headerTitle}>Sign in</Text>
          </TouchableOpacity>*/}

          <BackButton />

          {/* Teks Sambutan */}
          <View style={SignInStyle.welcomeSection}>
            <Text style={SignInStyle.welcomeText}>Welcome Back</Text>
            <Text style={SignInStyle.helloText}>
              Hello there, sign in to continue
            </Text>
          </View>

          {/* 3. Gambar Kartu Metalik Sesuai Permintaan */}
          <View style={SignInStyle.imageContainer}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/071/928/583/small_2x/double-dark-metallic-banking-cards-3d-icon-png.png",
              }}
              style={SignInStyle.metallicCard}
              resizeMode="contain"
            />
          </View>

          {/* 4. Form Input */}
          <View style={SignInStyle.formSection}>
            <TextInput
              style={SignInStyle.input}
              placeholder="Username/Email"
              placeholderTextColor="#E0E0E0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={SignInStyle.input}
              placeholder="Password"
              placeholderTextColor="#E0E0E0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={SignInStyle.forgotPassword}>
              <Text style={SignInStyle.forgotPasswordText}>
                Forgot your password ?
              </Text>
            </TouchableOpacity>
          </View>

          {/* 5. Tombol Sign In & Sign Up */}
          <View style={SignInStyle.footerSection}>
            <TouchableOpacity
              style={SignInStyle.signInButton}
              onPress={ () => router.replace("./menu")}
            >
              <Text style={SignInStyle.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={SignInStyle.signUpRow}>
              <Text style={SignInStyle.noAccountText}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("./auth/signup")}>
                <Text style={SignInStyle.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
