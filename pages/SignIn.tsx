
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { backButton as BackButton } from "../component";
import { handleLogin } from "../functions";
import { SignInStyle } from "../styles";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={[SignInStyle.container, { flex: 1 }]}>
          <View style={SignInStyle.whiteCurve} />

          <View style={SignInStyle.content}>
            <BackButton />

            <View style={SignInStyle.welcomeSection}>
              <Text style={SignInStyle.welcomeText}>
                Welcome Back
              </Text>
              <Text style={SignInStyle.helloText}>
                Hello there, sign in to continue
              </Text>
            </View>

            <View style={SignInStyle.imageContainer}>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/thumbnails/071/928/583/small_2x/double-dark-metallic-banking-cards-3d-icon-png.png",
                }}
                style={SignInStyle.metallicCard}
                resizeMode="contain"
              />
            </View>

            <View style={SignInStyle.formSection}>
              <TextInput
                style={SignInStyle.input}
                placeholder="Username/Email"
                placeholderTextColor="#E0E0E0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />

              <TextInput
                style={SignInStyle.input}
                placeholder="Password"
                placeholderTextColor="#E0E0E0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={() => handleLogin(email, password)}
              />

              <TouchableOpacity style={SignInStyle.forgotPassword}>
                <Text style={SignInStyle.forgotPasswordText}>
                  Forgot your password ?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={SignInStyle.footerSection}>
              <TouchableOpacity
                style={SignInStyle.signInButton}
                onPress={() => handleLogin(email, password)}
              >
                <Text style={SignInStyle.signInButtonText}>
                  Sign in
                </Text>
              </TouchableOpacity>

              <View style={SignInStyle.signUpRow}>
                <Text style={SignInStyle.noAccountText}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("./auth/signup")}
                >
                  <Text style={SignInStyle.signUpText}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
