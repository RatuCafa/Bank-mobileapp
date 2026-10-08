import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppFeature } from '../types';

// 2. Menerapkan Deklarasi Custom Function & Loop (Render UI)
export const renderFeatures = (features: AppFeature[]) => {
  let featureElements = [];
  
  // Menerapkan Loop (for-loop)
  for (let i = 0; i < features.length; i++) {
    const item = features[i];
    featureElements.push(
      React.createElement(
        View,
        {
          key: item.id,
          style: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
        },
        React.createElement(FontAwesome5, {
          name: item.iconName,
          size: 20,
          color: '#D2691E',
          style: { width: 30, textAlign: 'center', marginRight: 10 },
        }),
        React.createElement(
          Text,
          { style: { fontSize: 15, color: '#555', fontStyle: 'italic' } },
          item.title,
        ),
      ),
    );
  }
  
  return featureElements;
};