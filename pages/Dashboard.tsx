import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { menuCard } from "../constants";
import { renderMenu } from "../component"; // Pastikan path ini benar mengarah ke menuCard.tsx
import { dasboardStyles } from "../styles"; // Pastikan path import benar

export function DashboardScreen() {
    return (
        <SafeAreaView style={dasboardStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#9A7B62" />
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* Header Background */}
                <View style={dasboardStyles.headerBackground}>
                    <View style={dasboardStyles.headerTopInfo}>
                        <View style={dasboardStyles.userInfo}>
                            <Image 
                                source={{ uri: 'https://via.placeholder.com/150' }} // Ganti dengan URL avatar asli
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
                            <Text style={dasboardStyles.cardBalance}>$3,469.52</Text>
                            <Text style={dasboardStyles.cardLogo}>VISA</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Grid Section */}
                <View style={dasboardStyles.menuGridContainer}>
                    {renderMenu(menuCard)}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}