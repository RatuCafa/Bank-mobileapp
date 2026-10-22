import { Text, View, TouchableOpacity, Image } from "react-native";
import { router, Stack } from "expo-router";
import { loginStyles } from "../../styles"; 

<Stack.Screen options={{ headerShown: false }} />

const LoginScreen = () => {
  return (
    <View style={loginStyles.container}>
      
      {/* 1. Bagian Atas: Teks Judul Rata Kiri */}
      <View style={loginStyles.headerContainer}>
        <Text style={loginStyles.subTitle}>My Camel</Text>
        <Text style={loginStyles.mainTitle}>Your Digital{"\n"}Wallet{"\n"}Simplified</Text>
      </View>

      {/* 2. Bagian Tengah: Gambar Ilustrasi Mengambang */}
      <View style={loginStyles.imageContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/077/247/968/small/3d-cute-cartoon-brown-leather-wallet-with-credit-cards-inside-isolated-on-transparent-background-png.png' }}
          style={loginStyles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* 3. Bagian Bawah: Tombol Login Oval */}
      <View style={loginStyles.buttonContainer}>
        
        {/* Tombol Atas berubah jadi Sign Up */}
        <TouchableOpacity 
          style={loginStyles.googleButton}
          onPress={() => router.push('/signup')} 
        >
          <Text style={loginStyles.googleButtonText}>Sign Up now</Text>
        </TouchableOpacity>

        {/* Tombol Bawah berubah jadi Sign In */}
        <TouchableOpacity 
          style={loginStyles.emailButton}
          onPress={() => router.push('/login')} 
        >
          <Text style={loginStyles.emailButtonText}>Sign In</Text>
        </TouchableOpacity>


         <TouchableOpacity 
          style={loginStyles.thisButton}
          onPress={() => router.push('/login')} 
        >
          <Text style={loginStyles.thisButtonText}>Ini tombol</Text>
        </TouchableOpacity>
        
      </View>


    </View>
  );
};

export default LoginScreen;