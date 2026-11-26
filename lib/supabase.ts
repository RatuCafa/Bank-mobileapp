
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

// Adapter penyimpanan session terenkripsi
const ExpoSecureStoreAdapter = {
  getItem: (key: string) =>
    SecureStore.getItemAsync(key),

  setItem: (key: string, value: string) =>
    SecureStore.setItemAsync(key, value),

  removeItem: (key: string) =>
    SecureStore.deleteItemAsync(key),
};

// Ambil konfigurasi dari environment
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || "";

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// Validasi konfigurasi
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials belum dikonfigurasi!");
}

// Satu Supabase Client untuk seluruh aplikasi
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
