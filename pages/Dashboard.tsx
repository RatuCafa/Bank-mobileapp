import React from "react";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StatusBar, ActivityIndicator} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { menuCard } from "../constants";
import { renderMenu } from "../component"; // Pastikan path ini benar mengarah ke menuCard.tsx
import { dasboardStyles } from "../styles"; // Pastikan path import benar

import { getFinancialNews } from "../component";
import { Article } from "../types";

export function DashboardScreen() {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
  return (
    <ScrollView style={dasboardStyles.container}>
      {/*<StatusBar barStyle="light-content" backgroundColor="#9A7B62" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Background */}
        <View style={dasboardStyles.headerBackground}>
          <View style={dasboardStyles.headerTopInfo}>
            <View style={dasboardStyles.userInfo}>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }} // Ganti dengan URL avatar asli
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
            {/* Dekorasi Bentuk Melengkung */}
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
              <Text style={dasboardStyles.cardBalance}>Rp3,469,000.52</Text>
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
        <View
          style={{ paddingHorizontal: 20, paddingBottom: 30, marginTop: 10 }}
        >
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
                    style={{
                      fontSize: 10,
                      color: "#9A7B62",
                      fontWeight: "600",
                    }}
                  >
                    Sumber: {item.source}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
