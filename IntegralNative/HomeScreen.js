import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import camera from '../styles/camera.js';

export default function HomeScreen({ navigation, setImageGaleria }) {
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permisos insuficientes para acceder a la galería de imágenes.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        console.log("El usuario canceló la selección");
      } else {
        console.log(result);
        const path = result.assets[0].uri;
        setImageGaleria(path);
        console.log("Imagen seleccionada:", path);
        navigation.navigate("ImageScreen", { imageUri: path });
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return (
    <View style={camera.container}>
      <Text style={camera.text}>¡Bienvenido a la aplicación de cámara!</Text>
      <Button
        title="Abrir Cámara"
        onPress={() => navigation.navigate("Camera")}
      />
      <Button
        title="Seleccionar Imagen"
        onPress={selectImage} 
      />
    </View>
  );
}