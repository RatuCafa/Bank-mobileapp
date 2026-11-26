
import { supabase } from "../lib/supabase";

export const handleLogin = async (
  userEmail: string,
  userPass: string
) => {
  // Validasi input
  if (!userEmail.trim() || !userPass) {
    return {
      success: false,
      error: "Email dan password tidak boleh kosong!",
    };
  }

  try {
    // Proses autentikasi Supabase
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: userEmail.trim(),
        password: userPass,
      });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
      error: null,
    };

  } catch (error) {
    return {
      success: false,
      error: "Terjadi kesalahan koneksi. Silakan coba lagi.",
    };
  }
};
