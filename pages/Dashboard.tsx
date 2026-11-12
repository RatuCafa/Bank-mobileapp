import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { menuCard } from "../constants";
import { renderMenu } from "../component";
import { dasboardStyles } from "../styles";

// Import service API dan Type
import { getFinancialNews } from "../src/services/newServices";
import { Article } from "../src/types/news";

export function DashboardScreen() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Memanggil API finlight (bisa kirim kata kunci & jumlah berita)
        const result = await getFinancialNews("finance", 19);

        // PERBAIKAN 1: finlight mengembalikan array di dalam 'result.articles'
        setNews(result.articles || []);
      } catch (error: any) {
        setErrorMsg(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <ScrollView
      style={dasboardStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor="#9A7B62" />

      {/* Header Background */}
      <View style={dasboardStyles.headerBackground}>
        <View style={dasboardStyles.headerTopInfo}>
          <View style={dasboardStyles.userInfo}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={dasboardStyles.avatar}
            />
            <Text style={dasboardStyles.greetingText}>Hi, Caca Comel</Text>
          </View>
          <View style={dasboardStyles.notificationIcon}>
            <FontAwesome name="bell" size={18} color="white" />
          </View>
        </View>
      </View>

      {/* Credit Card Section */}
      <View style={dasboardStyles.cardContainer}>
        <View style={dasboardStyles.creditCard}>
          <View style={dasboardStyles.cardShape} />

          <View>
            <Text style={dasboardStyles.cardTitle}>Chava</Text>
            <Text style={dasboardStyles.cardType}>Amazon Platinium</Text>
            <View style={dasboardStyles.cardNumberContainer}>
              <Text style={dasboardStyles.cardNumber}>4756</Text>
              <Text style={dasboardStyles.cardNumber}>••••</Text>
              <Text style={dasboardStyles.cardNumber}>••••</Text>
              <Text style={dasboardStyles.cardNumber}>9018</Text>
            </View>
          </View>

          <View style={dasboardStyles.cardBottom}>
            <Text style={dasboardStyles.cardBalance}>$3,469.52</Text>
            <Text style={dasboardStyles.cardLogo}>VISA</Text>
          </View>
        </View>
      </View>

      {/* Menu Grid Section */}
      <View style={dasboardStyles.menuGridContainer}>
        {renderMenu(menuCard)}
      </View>

      {/* API Fetching Section: Berita Keuangan */}
      {/* 2. Perbarui bagian render daftar berita (hapus .slice(0, 5) dan atur layout gambar) */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 30, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#3E2723",
            marginBottom: 15,
          }}
        >
          Berita Keuangan Terkini ({news.length})
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#9A7B62"
            style={{ marginTop: 20 }}
          />
        ) : errorMsg ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
            {errorMsg}
          </Text>
        ) : (
          news.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row", // Membuat gambar di kiri dan teks di kanan agar tidak pecah di layar lebar
                marginBottom: 15,
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 12,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            >
              {/* Ambil elemen pertama array: item.images[0] */}
              {item.images && item.images.length > 0 && (
                <Image
                  source={{ uri: item.images[0] }}
                  resizeMode="cover"
                  style={{
                    width: 110,
                    height: 90,
                    borderRadius: 8,
                    marginRight: 12,
                    backgroundColor: "#EFEBE9",
                  }}
                />
              )}

              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: 4,
                    }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                    numberOfLines={2}
                  >
                    {item.summary
                      ? item.summary
                      : "Ringkasan berita tidak tersedia."}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 10, color: "#9A7B62", fontWeight: "600" }}
                >
                  Sumber: {item.source}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
