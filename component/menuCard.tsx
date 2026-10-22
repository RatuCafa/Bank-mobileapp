import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppMenu } from '../types';
import { dasboardStyles } from '../styles'; // Pastikan path import benar

export const renderMenu = (features: AppMenu[]) => {
  return features.map((item, index) => {
    // Menentukan warna ikon berdasarkan nama atau indeks (bisa disesuaikan dengan data)
    let iconColor = '#000';
    if(item.title.includes('Account')) iconColor = '#4B0082';
    else if(item.title.includes('Transfer')) iconColor = '#FF1493';
    else if(item.title.includes('Withdraw')) iconColor = '#00BFFF';
    else if(item.title.includes('Mobile')) iconColor = '#FFA500';
    else if(item.title.includes('Pay')) iconColor = '#20B2AA';
    else if(item.title.includes('Save')) iconColor = '#4B0082';
    else if(item.title.includes('Credit')) iconColor = '#FF8C00';
    else if(item.title.includes('Transaction')) iconColor = '#0000CD';
    else if(item.title.includes('Beneficiary')) iconColor = '#DC143C';

    return (
      <TouchableOpacity key={index} style={dasboardStyles.menuItem}>
        <View style={dasboardStyles.iconContainer}>
          <FontAwesome5 name={item.iconName} size={28} color={iconColor} />
        </View>
        <Text style={dasboardStyles.menuText}>{item.title}</Text>
      </TouchableOpacity>
    );
  });
};