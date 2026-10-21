import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { loginStyles } from "../../styles";
import { handleSignup } from "../../component"; 

const SignupScreen = () => {
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

  const onSubmit = async () => {
    if (password !== konfirmasiPassword) {
      alert("Gagal: Password dan Konfirmasi Password tidak cocok!");
      return;
    }
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

    const isSuccess = await handleSignup(dataPendaftaran);
    
    if (isSuccess) {
      router.replace("/");
    }
  };

  return (
    // Gunakan ScrollView karena formnya panjang
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[loginStyles.container, { paddingVertical: 40 }]}>
        <Text style={loginStyles.headerText}>My Camel</Text>
        <Text style={loginStyles.subHeaderText}>Buka Rekening Baru</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Nama Lengkap (Sesuai KTP)"
          placeholderTextColor="#999"
          value={namaLengkap}
          onChangeText={setNamaLengkap}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Tempat, Tanggal Lahir"
          placeholderTextColor="#999"
          value={ttl}
          onChangeText={setTtl}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Nomor Induk Kependudukan (NIK)"
          placeholderTextColor="#999"
          value={nik}
          onChangeText={setNik}
          keyboardType="numeric"
          maxLength={16} // Batasi maksimal 16 karakter
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Alamat Lengkap"
          placeholderTextColor="#999"
          value={alamat}
          onChangeText={setAlamat}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Nama Gadis Ibu Kandung"
          placeholderTextColor="#999"
          value={namaIbuKandung}
          onChangeText={setNamaIbuKandung}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Nomor HP Aktif"
          placeholderTextColor="#999"
          value={noHp}
          onChangeText={setNoHp}
          keyboardType="phone-pad"
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Alamat Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Pekerjaan Saat Ini"
          placeholderTextColor="#999"
          value={pekerjaan}
          onChangeText={setPekerjaan}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Buat Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Konfirmasi Password"
          placeholderTextColor="#999"
          value={konfirmasiPassword}
          onChangeText={setKonfirmasiPassword}
          secureTextEntry={true}
        />

        {/* Tombol Daftar */}
        <TouchableOpacity
          style={loginStyles.loginButton}
          onPress={onSubmit}
        >
          <Text style={loginStyles.loginButtonText}>AJUKAN PENDAFTARAN</Text>
        </TouchableOpacity>

        {/* Kembali ke Login */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#555' }}>Sudah memiliki rekening?</Text>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text style={{ color: '#D2691E', fontWeight: 'bold', marginTop: 5 }}>Masuk di sini</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;