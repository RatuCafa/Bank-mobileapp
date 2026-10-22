import { Alert, Platform } from 'react-native';

export const handleLogin = (userEmail: string, userPass: string) => {
  if (!userEmail || !userPass) {
    if (Platform.OS === 'web') {
      window.alert('Peringatan: Email dan password tidak boleh kosong!');
    } else {
      Alert.alert('Peringatan', 'Email dan password tidak boleh kosong!');
    }
    return false;
  }
  
  if (Platform.OS === 'web') {
    window.alert(`Berhasil: Selamat datang di My Camel, ${userEmail}!`);
  } else {
    Alert.alert('Berhasil', `Selamat datang di My Camel, ${userEmail}!`);
  }
  
  return true;
};