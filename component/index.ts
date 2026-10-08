export { handleLogin } from "./handLogin"

export interface SignupData {
  namaLengkap: string;
  ttl: string;
  nik: string;
  alamat: string;
  namaIbuKandung: string;
  noHp: string;
  email: string;
  pekerjaan: string;
  password: string; // <-- Tambahan baru
}

export const handleSignup = async (data: SignupData) => {
  // Tambahkan pengecekan password di sini
  if (
    !data.namaLengkap || !data.ttl || !data.nik || !data.alamat ||
    !data.namaIbuKandung || !data.noHp || !data.email || 
    !data.pekerjaan || !data.password
  ) {
    alert("Gagal: Semua kolom data wajib diisi!");
    return false;
  }

  if (data.nik.length !== 16) {
    alert("Gagal: NIK harus terdiri dari 16 angka!");
    return false;
  }

  // Lanjut proses pendaftaran...
  try {
    console.log("Memproses pendaftaran dengan data:", data);
    alert("Berhasil! Pendaftaran akun bank sedang diproses.");
    return true;
  } catch (error) {
    return false;
  }
};