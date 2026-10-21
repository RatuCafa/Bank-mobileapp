import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { handleLogin } from "../component";
import { renderFeatures, infoIcon as InfoIcon } from "../component";
import { loginStyles } from "../styles";
import { camelFeatures } from "../constants";

export function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  return (
    <ScrollView>
      <View style={loginStyles.container}>
        <Text style={loginStyles.headerText}>My Camel</Text>
        <Text style={loginStyles.subHeaderText}>Bank Account</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Masukkan Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Masukkan Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={loginStyles.featureSection}>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={() => handleLogin(email, password)}
            >
              <Text style={loginStyles.loginButtonText}>MASUK</Text>
            </TouchableOpacity>

            <Text style={{ color: "#555" }}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => router.push("./auth/signup")}>
              <Text
                style={{ color: "#D2691E", fontWeight: "bold", marginTop: 5 }}
              >
                Daftar di sini
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={loginStyles.featureHeading}>
            Kenapa memilih My Camel?
          </Text>
          {renderFeatures(camelFeatures)}
        </View>

        <TouchableOpacity
          style={loginStyles.infoIcon}
          onPress={() => router.push("./feature")}
        >
          <InfoIcon />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
