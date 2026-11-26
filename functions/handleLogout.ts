import { supabase } from "../lib/supabase";

export const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };

  } catch (error) {
    return {
      success: false,
      error: "Terjadi kesalahan saat logout.",
    };
  }
};
