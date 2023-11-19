import { View, Text, SafeAreaView, StyleSheet, Linking, Alert, Platform, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import {
  Accelerometer,
} from 'expo-sensors';
import { Vibration } from 'react-native';
import DataService from '../services/DataService';
import ModalMensaje from '../components/ModalMensaje'
import MessageConstants from '../constants/MessageConstants'

let dataService = new DataService();

export default function Fono({ navigation }) {
  
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [image, setImage] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const NumeroTelefono = (fono) => {
    console.log('Numero de fono ñeri ----> ', fono);
    let numero = fono;
    if (Platform.OS !== 'android') {
      numero = `telprompt:${fono}`;
    }
    else {
      numero = `tel:${fono}`;
    }
    Linking.canOpenURL(numero)
      .then(supported => {
        if (!supported) {
          Alert.alert('Numero de fono no disponible');
        } else {
          return Linking.openURL(numero);
        }
      })
      .catch(err => console.log(err));
  };

  const _subscribe = () => {
    let auxiliarX;
    setSubscription(Accelerometer.addListener(async (accelerometerData) => {
      auxiliarX = x;
      if (accelerometerData.x < auxiliarX) {
        if ((auxiliarX - accelerometerData.x) > 0.5) {
          let datos = await dataService.obtenerDatos();
          let telefono = datos.telefono;
          if (telefono) {
            NumeroTelefono(telefono)
          } else {
            setMensajeModal(MessageConstants.MSG_TELEFONO_UNDEFINED);
            setModalVisible(true)
          }
          Vibration.vibrate();
        }
      } else {
        if ((accelerometerData.x - auxiliarX) > 0.5) {
          if ((auxiliarX - accelerometerData.x) > 0.5) {
            let datos = await dataService.obtenerDatos();
            let telefono = datos.telefono;
            if (telefono) {
              NumeroTelefono(telefono)
            } else {
              setMensajeModal(MessageConstants.MSG_TELEFONO_UNDEFINED);
              setModalVisible(true)
            }
            Vibration.vibrate();
          }
        }
      }
      setData(accelerometerData);
    }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  let loadBackground = async () => {
    if(JSON.parse(await dataService.obtenerBackground())){
      let Background = JSON.parse(await dataService.obtenerBackground());
      setImage(Background.uri);
    }    
  }

  useEffect(() => {
    loadBackground();
    _subscribe();
    _slow();
    return () => _unsubscribe();    
  }, []);


  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={{uri: image}} style={styles.image}>
        <Text style={{backgroundColor:'white', fontSize: 20, width: '80%', textAlign:'center'}}>Agita para llamar a tu contacto de emergencia</Text>
        <ModalMensaje mensaje={mensajeModal} modalVisible={modalVisible} setModalVisible={setModalVisible} success={success}/>
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
    backgroundColor: '#fff',
    textAlign:'center'
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
