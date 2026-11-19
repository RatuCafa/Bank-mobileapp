import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { backButton as BackButton} from "../component";


import { loginStyle } from "../styles";

import { handleSignup } from "../functions"; 

export function SignupScreen ()  {
  // Semua state untuk menampung inputan pengguna
  const [namaLengkap, setNamaLengkap] = useState<string>("");
  const [ttl, setTtl] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [namaIbuKandung, setNamaIbuKandung] = useState<string>("");
  const [noHp, setNoHp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pekerjaan, setPekerjaan] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // <-- Tambahan
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");

  // Fungsi yang dipanggil saat tombol DAFTAR ditekan
  const onSubmit = async () => {
    // Validasi tambahan khusus di UI: Pastikan password sama
    if (password !== konfirmasiPassword) {
      alert("Gagal: Password dan Konfirmasi Password tidak cocok!");
      return;
    }
    // Gabungkan semua data ke dalam satu objek
    const dataPendaftaran = {
      namaLengkap,
      ttl,
      nik,
      alamat,
      namaIbuKandung,
      noHp,
      email,
      pekerjaan,
      password
    };

    // Jalankan fungsi logika Sign Up
    const isSuccess = await handleSignup(dataPendaftaran);
    
    // Jika berhasil, arahkan kembali ke halaman Login (opsional)
    if (isSuccess) {
      router.replace("/");
    }
  };

  return (
    // Gunakan ScrollView karena formnya panjang
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[loginStyle.container, { paddingVertical: 40 }]}>
        <BackButton />
        <Text style={loginStyle.headerText}>My Camel</Text>
        <Text style={loginStyle.subHeaderText}>Buka Rekening Baru</Text>

        <TextInput
          style={loginStyle.input}
          placeholder="Nama Lengkap (Sesuai KTP)"
          placeholderTextColor="#999"
          value={namaLengkap}
          onChangeText={setNamaLengkap}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Tempat, Tanggal Lahir"
          placeholderTextColor="#999"
          value={ttl}
          onChangeText={setTtl}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Nomor Induk Kependudukan (NIK)"
          placeholderTextColor="#999"
          value={nik}
          onChangeText={setNik}
          keyboardType="numeric"
          maxLength={16} // Batasi maksimal 16 karakter
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Alamat Lengkap"
          placeholderTextColor="#999"
          value={alamat}
          onChangeText={setAlamat}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Nama Gadis Ibu Kandung"
          placeholderTextColor="#999"
          value={namaIbuKandung}
          onChangeText={setNamaIbuKandung}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Nomor HP Aktif"
          placeholderTextColor="#999"
          value={noHp}
          onChangeText={setNoHp}
          keyboardType="phone-pad"
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Alamat Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Pekerjaan Saat Ini"
          placeholderTextColor="#999"
          value={pekerjaan}
          onChangeText={setPekerjaan}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Buat Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TextInput
          style={loginStyle.input}
          placeholder="Konfirmasi Password"
          placeholderTextColor="#999"
          value={konfirmasiPassword}
          onChangeText={setKonfirmasiPassword}
          secureTextEntry={true}
        />

        {/* Tombol Daftar */}
        <TouchableOpacity
          style={loginStyle.loginButton}
          onPress={onSubmit}
        >
          <Text style={loginStyle.loginButtonText}>AJUKAN PENDAFTARAN</Text>
        </TouchableOpacity>

        {/* Kembali ke Login */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#555' }}>Sudah memiliki rekening?</Text>
            <TouchableOpacity>
              <Text style={{ color: '#D2691E', fontWeight: 'bold', marginTop: 5 }} onPress={ () => router.back()}>Masuk di sini</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
