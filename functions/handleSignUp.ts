
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { SignupData } from "../types";

export const handleSignup = async (data: SignupData): Promise<boolean> => {
  // Validasi kolom wajib
  if (
    !data.namaLengkap ||
    !data.ttl ||
    !data.nik ||
    !data.alamat ||
    !data.namaIbuKandung ||
    !data.noHp ||
    !data.email ||
    !data.pekerjaan ||
    !data.password
  ) {
    Alert.alert("Peringatan", "Semua kolom wajib diisi!");
    return false;
  }

  if (data.nik.length !== 16) {
    Alert.alert("Peringatan", "NIK harus terdiri dari 16 angka.");
    return false;
  }

  if (data.password.length < 6) {
    Alert.alert("Peringatan", "Password minimal 6 karakter.");
    return false;
  }

  try {
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: {
          nama_lengkap: data.namaLengkap,
          pekerjaan: data.pekerjaan,
        },
      },
    });

    if (error) {
      Alert.alert("Pendaftaran Gagal", error.message);
      return false;
    }

    if (!result.user) {
      Alert.alert(
        "Pendaftaran Gagal",
        "Akun belum berhasil dibuat. Silakan coba kembali."
      );
      return false;
    }

    if (!result.session) {
      Alert.alert(
        "Pendaftaran Berhasil",
        "Silakan periksa email untuk melakukan konfirmasi akun sebelum login."
      );
    } else {
      Alert.alert(
        "Pendaftaran Berhasil",
        "Akun berhasil dibuat. Silakan lanjutkan ke aplikasi."
      );
    }

    return true;
  } catch {
    Alert.alert(
      "Kesalahan",
      "Terjadi gangguan koneksi. Silakan coba kembali."
    );
    return false;
  }
};
