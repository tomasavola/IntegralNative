import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import Menu from '../components/Menu';
import DataService from '../services/DataService';
import * as Clipboard from 'expo-clipboard';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-elements';
import { Icon } from '@rneui/themed';


let servicioDatos = new DataService();
const NOMBRE_APP = 'Yifael';

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
  };

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
    <SafeAreaView style={styles.contenedor}>
      <ImageBackground source={{ uri: img }} style={styles.img}>
        {escaneado ? (
          <>
            <Text style={{ fontSize: 20 }}>{NOMBRE_APP}</Text>
            <Text style={{ fontFamily: 'fuente', fontSize: 60 }}>{NOMBRE_APP}</Text>
            
            
          </>
        ) : (
          <>
            <Button
          title="Escanear"
          buttonStyle={styles.button}
          titleStyle={{ color: 'white' }}
          onPress={() => setEscanearQR(true)}
        />
            <Button
          title="Copiar"
          buttonStyle={styles.button}
          titleStyle={{ color: 'white' }}
          onPress={copiarAlPortapapeles}
        />
          </>
        )}
        {escanearQR && (
          <BarCodeScanner
            onBarCodeScanned={escaneado ? undefined : manejarEscaneoCodigoBarras}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </ImageBackground>
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: "#33A2FF",
    borderRadius: 10,
  },
  img: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
