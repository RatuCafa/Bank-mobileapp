import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  // ==========================================
  // GAYA UMUM & SPLASH SCREEN (Desain Baru)
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: "#F5E6D3", 
    paddingHorizontal: 24,
    paddingTop: 80, 
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    color: "#8D6E63", 
    fontWeight: "600",
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: "900", 
    color: "#3E2723", 
    lineHeight: 48, 
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 320,
    height: 320,
  },
  buttonContainer: {
    width: "100%",
    gap: 16, 
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 30, 
    alignItems: "center",
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  googleButtonText: {
    color: "#AC7F5E",
    fontSize: 16,
    fontWeight: "bold",
  },
  emailButton: {
    backgroundColor: "#AC7F5E", 
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
  },
  emailButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ==========================================
  // GAYA FORM (Untuk Sign Up & Login Email)
  // ==========================================
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#AC7F5E",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#8D6E63",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7CCC8", // Warna coklat sangat pudar untuk garis pinggir
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 15,
    color: "#AC7F5E",
  },
  loginButton: {
    backgroundColor: "#C68E17", // Coklat keemasan agar beda dengan Splash Screen
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});