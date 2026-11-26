# Supabase Database & Auth Architecture Documentation

Dokumen ini mendeskripsikan skema arsitektur autentikasi, database, file-file integrasi, serta payload metadata yang digunakan pada project Bank-mobileapp (Supabase backend).

---

## 1. Konfigurasi Client Supabase

### File: `lib/supabase.ts`
Menginisialisasi satu instance Supabase Client untuk seluruh aplikasi:
- **Environment Variables**:
  - `EXPO_PUBLIC_SUPABASE_URL`: URL project Supabase.
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Kunci anon / publik Supabase.
- **Storage Adapter (`ExpoSecureStoreAdapter`)**:
  - **Native (iOS & Android)**: Menggunakan `expo-secure-store` untuk menyimpan session dan refresh token terenkripsi di keychain / keystore.
  - **Web / SSR**: Menggunakan `localStorage` (dengan pengecekan `typeof window !== 'undefined'` untuk keamanan rendering server/Node.js SSR).
- **Session Settings**:
  - `autoRefreshToken: true`
  - `persistSession: true`
  - `detectSessionInUrl: Platform.OS === 'web'`

---

## 2. Autentikasi & Tabel Supabase

Project menggunakan **Supabase Auth** (`auth.users`) sebagai fondasi autentikasi akun pengguna.

### Tabel Inti: `auth.users` (Supabase Auth Schema)
Tabel internal bawaan Supabase yang mengelola kredensial login:

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key unik pengguna |
| `email` | `VARCHAR` | Alamat email unik pengguna |
| `encrypted_password` | `VARCHAR` | Hash password pengguna |
| `raw_user_meta_data` | `JSONB` | Metadata profil tambahan pengguna |
| `created_at` | `TIMESTAMPTZ` | Waktu akun didaftarkan |
| `confirmed_at` | `TIMESTAMPTZ` | Waktu konfirmasi email (jika diaktifkan) |

### Struktur Metadata Profil Pengguna (`raw_user_meta_data`)
Pada fungsi pendaftaran akun (`functions/handleSignUp.ts`), data pengguna disimpan ke dalam `raw_user_meta_data`:

```json
{
  "nama_lengkap": "string",
  "pekerjaan": "string"
}
```

*Catatan: Form frontend juga mengumpulkan `ttl`, `nik`, `alamat`, `namaIbuKandung`, dan `noHp` yang siap dipetakan ke metadata tambahan atau tabel publik terpisah (seperti tabel `profiles` atau `nasabah`).*

### Contoh Rekomendasi Skema Tabel Publik (`public.profiles`)
Jika ingin memisahkan data sensitif nasabah/perbankan ke tabel publik relasional dengan Row Level Security (RLS):

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  ttl TEXT,
  nik VARCHAR(16) UNIQUE,
  alamat TEXT,
  nama_ibu_kandung TEXT,
  no_hp VARCHAR(20),
  pekerjaan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Pengguna hanya dapat membaca dan memperbarui profil mereka sendiri
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);
```

---

## 3. Alur & Modul Fungsi Autentikasi

### 1. Registrasi Akun: `functions/handleSignUp.ts`
- **Fungsi**: `handleSignup(data: SignupData): Promise<boolean>`
- **Validasi Frontend**:
  - Memastikan semua kolom wajib (`namaLengkap`, `ttl`, `nik`, `alamat`, `namaIbuKandung`, `noHp`, `email`, `pekerjaan`, `password`) terisi.
  - Validasi panjang NIK tepat 16 karakter angka.
  - Validasi panjang password minimal 6 karakter.
- **Eksekusi**:
  - `supabase.auth.signUp({ email, password, options: { data: { nama_lengkap, pekerjaan } } })`
- **Output**:
  - Menampilkan Alert status konfirmasi email atau berhasil login langsung, mengembalikan boolean status sukses.

### 2. Login: `functions/handLogin.ts`
- **Fungsi**: `handleLogin(userEmail: string, userPass: string)`
- **Validasi**: Memastikan email dan password tidak kosong.
- **Eksekusi**:
  - `supabase.auth.signInWithPassword({ email: userEmail.trim(), password: userPass })`
- **Output**:
  - Mengembalikan object `{ success: boolean, data, error: string | null }`.

### 3. Logout: `functions/handleLogout.ts`
- **Fungsi**: `handleLogout()`
- **Eksekusi**:
  - `supabase.auth.signOut()`
- **Output**:
  - Menghapus session lokal dari storage adapter dan mengembalikan status `{ success: boolean, error?: string }`.

---

## 4. State Management Autentikasi Global

### File: `context/AuthContext.tsx`
Menyediakan `AuthProvider` dan custom hook `useAuth()`:
- **Listener Realtime**:
  - Memasang `supabase.auth.onAuthStateChange((_event, currentSession) => { ... })` untuk sinkronisasi otomatis status login/logout di seluruh halaman.
- **State yang disediakan**:
  - `session: Session | null`
  - `user: User | null`
  - `loading: boolean`

### File Navigasi: `src/app/_layout.tsx`
- Menggunakan `Stack.Protected` berbasis `session`:
  - `!session`: Hanya dapat mengakses rute publik (`index`, `auth/signin`, `auth/signup`).
  - `!!session`: Mengizinkan akses rute terproteksi (`menu/dasboard`, `menu/dumpScreen`).
