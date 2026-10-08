import { Alert } from 'react-native';

// 1. Menerapkan Deklarasi Custom Function (Logika User)
export const handleLogin = (userEmail: string, userPass: string): void => {
  if (!userEmail || !userPass) {
    Alert.alert('Peringatan', 'Email dan password tidak boleh kosong!');
    return;
  }
  Alert.alert('Berhasil', `Selamat datang di My Camel, ${userEmail}!`);
};