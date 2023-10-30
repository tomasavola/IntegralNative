import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import camera from '../styles/camera.js';

export default function ImageScreen({ route, navigation }) {

  const imageUri = route?.params?.imageUri || null;
  console.log('Image URI recibida:', imageUri);
  return (
    <View style={camera.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={camera.image} />
          <TouchableOpacity
            style={camera.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Text>No se ha proporcionado una imagen para mostrar.</Text>
      )}
    </View>
  );
}
