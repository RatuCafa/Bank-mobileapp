import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { handleLogin } from "../../component";
import { renderLogin } from "../../page";
import { loginStyles }  from "../../styles"
import { camelFeatures } from "../../constants"

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={loginStyles.container}>

      <TouchableOpacity
        style={loginStyles.loginButton}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={loginStyles.loginButtonText}>MASUK</Text>
      </TouchableOpacity>
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
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          
          <Text style={{ color: '#555' }}>Belum punya akun?</Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={{ color: '#D2691E', fontWeight: 'bold', marginTop: 5 }}>Daftar di sini</Text>
            </TouchableOpacity>
          </Link>
          
        </View>
        <Text style={loginStyles.featureHeading}>Kenapa memilih My Camel?</Text>
        {renderLogin(camelFeatures)}
      </View>
    </View>
  );
};

export default LoginScreen;