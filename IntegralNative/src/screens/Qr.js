import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import DataService from '../services/DataService';
import Boton from '../components/Boton'
import * as Clipboard from 'expo-clipboard';
import { BarCodeScanner } from 'expo-barcode-scanner';

let servicioDatos = new DataService();
const NOMBRE_APP = 'Yifael'

export default function Qr({ navigation }) {

  const [img, setImg] = useState(null);
  const [permisos, setPermisos] = useState(null);
  const [escaneado, setEscaneado] = useState(false);
  const [escanearQR, setEscanearQR] = useState(false);

  

  let cargarFondo = async () => {
    if (JSON.parse(await servicioDatos.obtenerBackground())) {
      let fondo = JSON.parse(await servicioDatos.obtenerBackground());
      setImg(fondo.uri);
    }
  }

  const copiarAlPortapapeles = async () => {
    await Clipboard.setStringAsync(NOMBRE_APP);
  };

  const manejarEscaneoCodigoBarras = ({ type, data }) => {
    setEscaneado(true);
    alert(`Código de barras de tipo ${type} y datos ${data} ha sido escaneado!`);
  };

  useEffect(() => {
    const obtenerPermisosEscaneoCodigoBarras = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermisos(status === 'granted');
    };
    obtenerPermisosEscaneoCodigoBarras();
    cargarFondo();
    }, []);

  return (
    <>
      <SafeAreaView style={[styles.contenedor]} >
        <ImageBackground source={{ uri: img }} style={styles.img}>
          {(
            <>
              <Text style={{ fontSize: 20 }}>{NOMBRE_APP}</Text>
              <Text style={{ fontFamily: 'fuente', fontSize: 60 }}>{NOMBRE_APP}</Text>
              <Boton onPress={copiarAlPortapapeles} titulo='Copiar ' style={styles.boton} />
            </>
          )(
            <></>
          )}
          <Boton onPress={() => setEscanearQR(true)} titulo='Escanear ' style={styles.boton} />
          {escanearQR ? (
            <>
              <BarCodeScanner
                onBarCodeScanned={escaneado ? undefined : manejarEscaneoCodigoBarras}
                style={StyleSheet.absoluteFillObject}
              />
              {escaneado && <>
                <Boton onPress={() => setEscaneado(false)} titulo='Escanear de nuevo' style={styles.boton} />
                <Boton onPress={() => setEscanearQR(false)} titulo='Cerrar escáner' style={styles.boton} />
              </>
              }
            </>
          ) : (
            <></>
          )}
        </ImageBackground>
        <Menu navigation={navigation} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  },
  boton: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10
  },
  img: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
