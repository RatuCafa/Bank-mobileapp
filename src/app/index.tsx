import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// Mengimpor file terpisah
import { handleLogin } from "../../component";
import { renderLogin } from "../../page";

// These modules currently expose the values through their runtime module
// exports even though their TypeScript declarations use export type.
import { loginStyles }  from "../../styles"
import { camelFeatures } from "../../constants"

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    // Menggunakan External Styles (styles.container)
    <View style={loginStyles.container}>
      <Text style={loginStyles.headerText}>My Camel</Text>
      <Text style={loginStyles.subHeaderText}>Your Premium Desert Ride</Text>

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

      <TouchableOpacity
        style={loginStyles.loginButton}
        // Memanggil fungsi dari user.ts
        onPress={() => handleLogin(email, password)}
      >
        <Text style={loginStyles.loginButtonText}>MASUK</Text>
      </TouchableOpacity>

      <View style={loginStyles.featureSection}>
        <Text style={loginStyles.featureHeading}>Kenapa memilih My Camel?</Text>

        {/* Memanggil fungsi render dari renderFeature.tsx */}
        {renderLogin(camelFeatures)}
      </View>
    </View>
  );
};

export default LoginScreen;