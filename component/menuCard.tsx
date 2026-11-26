import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppMenu } from '../types';
import { dasboardStyles } from '../styles'; // Pastikan path import benar
import { router, type Href } from 'expo-router';

export const renderMenu = (features: AppMenu[]) => {
  return features.map((item, index) => {

    return (
      <TouchableOpacity key={index} style={dasboardStyles.menuItem } onPress={() => router.push(item.navigator as Href)}>
        <View style={dasboardStyles.iconContainer}>
          <FontAwesome5 name={item.iconName} size={28} color={item.iconColor} />
        </View>
        <Text style={dasboardStyles.menuText}>{item.title}</Text>
      </TouchableOpacity>
    );
  });
};