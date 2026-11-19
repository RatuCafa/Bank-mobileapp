import { StyleSheet } from "react-native";

export const SignInStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A27B5C", // Warna coklat kopi susu sesuai gambar
  },
  // Trik membuat lengkungan putih di bawah
  whiteCurve: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "51%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 120, // Membuat kurva melengkung tajam di kiri atas
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Sambutan
  welcomeSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  helloText: {
    fontSize: 14,
    color: "#2C2C2C", // Warna abu gelap/hitam
    fontWeight: "700",
  },

  // Gambar Sisipan
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  metallicCard: {
    width: 350,
    height: 200,
  },

  // Form
  formSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(139, 134, 134, 0.78)", // Transparan putih
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    fontSize: 15,
    color: "#333", // Warna teks ketikan
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  // Footer & Tombol
  footerSection: {
    marginTop: "auto", // Mendorong ke paling bawah layar
    paddingBottom: 40,
  },
  signInButton: {
    backgroundColor: "#A27B5C", // Coklat yang sama dengan background atas
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    color: "#666",
    fontSize: 13,
  },
  signUpText: {
    color: "#A27B5C",
    fontSize: 13,
    fontWeight: "bold",
  },
}
);