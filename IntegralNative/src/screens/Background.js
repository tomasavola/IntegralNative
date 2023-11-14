import { View, Text, StyleSheet, SafeAreaView, Button, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import Menu from '../components/Menu';
import * as ImagePicker from 'expo-image-picker';
import DataService from '../services/DataService';
import Boton from '../components/Boton';
import { Camera, CameraType } from 'expo-camera';

let dataService = new DataService();

export default function Background({ navigation }) {

  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [startCamera, setStartCamera] = useState(false)

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await dataService.guardarBackground(JSON.stringify(result.assets[0]));
      let background = JSON.parse(await dataService.obtenerBackground());
      setImage(background.uri);
    }
  };

  let seleccionarBackground = async () => {
    if (JSON.parse(await dataService.obtenerBackground())) {
      let background = JSON.parse(await dataService.obtenerBackground());
      setImage(background.uri);
    }
  }

  const __sacarFoto = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync();
    await dataService.guardarBackground(JSON.stringify(photo));
    let background = JSON.parse(await dataService.obtenerBackground());
    setImage(background.uri);
    setStartCamera(false)
  }

  const __abrirCamara = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Acceso denegado')
    }
  }

  useEffect(() => {
    seleccionarBackground();
  }, []);

  const eliminarBackground = async () => {
    try {
      await dataService.eliminarBackground();
      setImage(null);
      console.log('Imagen de fondo eliminada exitosamente');
    } catch (error) {
      console.log('Error al eliminar la imagen de fondo:', error);
      Alert.alert('Error al eliminar la imagen de fondo');
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <Boton onPress={seleccionarImagen} titulo='Elegir una imagen de tu galería' style={styles.button} />
        <Boton onPress={eliminarBackground} titulo='Eliminar Imagen de Fondo' style={styles.button} />
        {startCamera ? (
          <Camera
            style={{ flex: 1, width: "100%" }}
            ref={(r) => {
              camera = r
            }}
          >
            <View
              style={styles.cameraContainer}
            >
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={__sacarFoto}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 125,
                    borderRadius: 50,
                    backgroundColor: '#fff'
                  }}
                />
              </View>
            </View>
          </Camera>
        ) : (
          <>
            <Boton onPress={__abrirCamara} titulo='Tomar una foto' style={styles.button} />
          </>
        )}
      </ImageBackground>
      <Menu navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  }
});
