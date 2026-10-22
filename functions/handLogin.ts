import { Alert } from 'react-native';

export const handleLogin = (userEmail: string, userPass: string)  => {
  if (!userEmail || !userPass) {
    Alert.alert('Peringatan', 'Email dan password tidak boleh kosong!');
    return false;
  }
    Alert.alert('Berhasil', `Selamat datang di My Camel, ${userEmail}!`);
    return true;
};