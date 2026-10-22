import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppMenu } from '../types';

export const renderFeatures = (features: AppMenu[]) => {
  let menuCard = [];
  
  for (let i = 0; i < features.length; i++) {
    const item = features[i];
    menuCard.push(
      <View>
        <FontAwesome5 name = {item.iconName} size={24} />
        <Text>{item.title}</Text>
      </View>
    );
  }
  
  return menuCard;
};