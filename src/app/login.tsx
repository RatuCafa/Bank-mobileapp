import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { styles } from './loginStyle'; // Mengimpor stylesheet external

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  const handleLogin = () => {
    // Logika autentikasi aplikasi Bank MyCamel
    console.log('Login attempt with:', username);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.title}>MyCamel</Text>
          <Text style={styles.subtitle}>Mobile Banking</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isUsernameFocused && styles.inputFocused]}
            placeholder="User ID / Email"
            placeholderTextColor="#999999"
            value={username}
            onChangeText={setUsername}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            placeholder="PIN / Password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Trouble logging in?</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Get Help</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;