import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, CurrencyStyle } from "../styles";

interface RateItem {
  target: string;
  rate: number;
}

export function dumpPage() {
  const [amount, setAmount] = useState("1");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetInput, setTargetInput] = useState("");

  const [targetList, setTargetList] = useState(["IDR", "EUR", "JPY"]);

  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Menambahkan mata uang tujuan
  const handleAddTarget = () => {
    const target = targetInput.trim().toUpperCase();
    const source = sourceCurrency.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(target)) {
      setError("Kode mata uang harus terdiri dari 3 huruf.");
      return;
    }

    if (target === source) {
      setError("Mata uang tujuan tidak boleh sama dengan mata uang asal.");
      return;
    }

    if (targetList.includes(target)) {
      setError("Mata uang tersebut sudah ditambahkan.");
      return;
    }

    setTargetList([...targetList, target]);
    setTargetInput("");
    setError(null);
  };

  // Menghapus mata uang tujuan
  const handleRemoveTarget = (code: string) => {
    setTargetList((previous) => previous.filter((item) => item !== code));

    setRates((previous) => previous.filter((item) => item.target !== code));
  };

  // Mengambil data kurs dari API

  // CUSTOM ASYNC FUNCTION
  const fetchRates = async () => {
    Keyboard.dismiss();

    const source = sourceCurrency.trim().toUpperCase();
    const numericAmount = Number(amount);

    // Validasi input
    if (!/^[A-Z]{3}$/.test(source)) {
      setError("Kode mata uang asal tidak valid.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Masukkan nominal yang valid.");
      return;
    }

    if (targetList.length === 0) {
      setError("Tambahkan mata uang tujuan.");
      return;
    }

    if (targetList.includes(source)) {
      setError("Mata uang asal tidak boleh sama dengan tujuan.");
      return;
    }

    setLoading(true);
    setError(null);
    setRates([]);

    // PROMISE.RESOLVE()
    return (
      Promise.resolve(targetList.join(","))

        // THEN() - Mengambil data dari API menggunakan fetch()
        .then((targets) => {
          const url = `{IP_ADDRESS}:3000/api/rates?source=${source}&targets=${targets}`;

          return fetch(url);
        })

        // THEN() - Membaca response API
        .then((response) => {
          return response.json().then((result) => {
            // PROMISE.REJECT() - Menangani HTTP error
            if (!response.ok) {
              return Promise.reject(
                new Error(result.error || "Gagal mengambil kurs"),
              );
            }

            return result;
          });
        })

        
        .then((result) => {
          if (!Array.isArray(result)) {
            return Promise.reject(new Error("Format data API tidak valid."));
          }

          const validRates: RateItem[] = result.map((item: any) => ({
            target: item.target,
            rate: Number(item.rate),
          }));

          if (validRates.length === 0) {
            setError("Data kurs tidak ditemukan.");
          } else {
            setRates(validRates);
          }

          console.log("Data kurs:", validRates);
        })

        // CATCH() - Menangani error
        .catch((error: any) => {
          console.log("Fetch error:", error);
          setError(error.message || "Gagal mengambil data kurs.");
        })

        // FINALLY() - Menghentikan loading
        .finally(() => {
          setLoading(false);
        })
    );
  };

  // Mengambil kurs saat halaman pertama kali dibuka
  useEffect(() => {
    fetchRates();
  }, []);

  const numericAmount = Number(amount) || 0;

  const formatNumber = (value: number, digits = 2) => {
    return value.toLocaleString("id-ID", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  };

  return (
    <ScrollView
      style={CurrencyStyle.container}
      contentContainerStyle={CurrencyStyle.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={CurrencyStyle.header}>
        <Text style={CurrencyStyle.headerTitle}>Currency Converter</Text>

        <Text style={CurrencyStyle.headerSubtitle}>
          Konversi mata uang secara mudah dan praktis
        </Text>
      </View>

      {/* Form Input */}
      <View style={CurrencyStyle.formCard}>
        <Text style={CurrencyStyle.label}>Nominal Uang</Text>

        <TextInput
          style={CurrencyStyle.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="Masukkan nominal"
          placeholderTextColor={COLORS.accent}
        />

        <Text style={CurrencyStyle.label}>Mata Uang Asal</Text>

        <TextInput
          style={CurrencyStyle.currencyInput}
          value={sourceCurrency}
          onChangeText={(text) => setSourceCurrency(text.toUpperCase())}
          maxLength={3}
          autoCapitalize="characters"
          placeholder="USD"
          placeholderTextColor={COLORS.accent}
        />

        <Text style={CurrencyStyle.label}>Tambah Mata Uang Tujuan</Text>

        <View style={CurrencyStyle.inputRow}>
          <TextInput
            style={CurrencyStyle.targetInput}
            value={targetInput}
            onChangeText={(text) => setTargetInput(text.toUpperCase())}
            maxLength={3}
            autoCapitalize="characters"
            placeholder="Contoh: SGD, GBP"
            placeholderTextColor={COLORS.accent}
            onSubmitEditing={handleAddTarget}
          />

          <TouchableOpacity
            style={CurrencyStyle.addButton}
            onPress={handleAddTarget}
          >
            <Text style={CurrencyStyle.addButtonText}>+ Tambah</Text>
          </TouchableOpacity>
        </View>

        {/* Daftar Mata Uang */}
        <View style={CurrencyStyle.chipContainer}>
          {targetList.map((code) => (
            <TouchableOpacity
              key={code}
              style={CurrencyStyle.chip}
              onPress={() => handleRemoveTarget(code)}
            >
              <Text style={CurrencyStyle.chipText}>{code}</Text>

              <Text style={CurrencyStyle.chipRemove}>×</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tombol Konversi */}
        <TouchableOpacity
          style={[
            CurrencyStyle.submitButton,
            loading && CurrencyStyle.disabledButton,
          ]}
          onPress={fetchRates}
          disabled={loading}
        >
          <Text style={CurrencyStyle.submitButtonText}>
            {loading ? "Memuat Data..." : "Konversi Sekarang"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={CurrencyStyle.errorText}>{error}</Text>}
      </View>

      {/* Hasil Konversi */}
      <Text style={CurrencyStyle.sectionTitle}>Hasil Konversi</Text>

      <Text style={CurrencyStyle.resultSubtitle}>
        {formatNumber(numericAmount)} {sourceCurrency}
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.dark}
          style={{ marginTop: 30 }}
        />
      ) : (
        <View style={CurrencyStyle.listContainer}>
          {rates.length > 0 ? (
            rates.map((item) => {
              const converted = numericAmount * item.rate;

              return (
                <View key={item.target} style={CurrencyStyle.rateCard}>
                  <View style={CurrencyStyle.currencyInfo}>
                    <Text style={CurrencyStyle.currencyCode}>
                      {item.target}
                    </Text>

                    <Text style={CurrencyStyle.rateSubtext}>
                      1 {sourceCurrency} = {formatNumber(item.rate, 4)}{" "}
                      {item.target}
                    </Text>
                  </View>

                  <Text style={CurrencyStyle.convertedValue}>
                    {formatNumber(converted)}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={CurrencyStyle.emptyText}>
              Belum ada data kurs untuk ditampilkan.
            </Text>
          )}
        </View>
      )}

      <Text style={CurrencyStyle.footer}>
        Data nilai tukar disediakan oleh AllRatesToday
      </Text>
    </ScrollView>
  );
}
