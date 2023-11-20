import { View, Text, StyleSheet, SafeAreaView, TextInput, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import DataService from '../services/DataService'
import ModalMensaje from '../components/ModalMensaje'
import MessageConstants from '../constants/MessageConstants'
import { Button,Icon } from 'react-native-elements';

let dataService = new DataService();

export default function Configuracion({ navigation }) {

  const [fono, setFono] = useState();
  const [urlVideo, setUrlVideo] = useState();
  const [urlMusica, setUrlMusica] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [image, setImage] = useState(null);

  let handleSubmit = async () => {
    if (fono && urlMusica && urlVideo) {
      if (await dataService.almacenarDatos(fono, urlVideo, urlMusica)) {
        setMensajeModal(MessageConstants.MSG_DATOS_GUARDADOS);
        setSuccess(true)
      } else {
        setMensajeModal(MessageConstants.MSG_GUARDADO_FALLIDO);
        setSuccess(false)
      }
    } else {
      setMensajeModal(MessageConstants.MSG_CAMPOS_INCOMPLETOS);
      setSuccess(false)
    }
    setModalVisible(true)
  }

  let cargarBackground = async () => {
    if (JSON.parse(await dataService.obtenerBackground())) {
      let Background = JSON.parse(await dataService.obtenerBackground());
      setImage(Background.uri);
    }
  }

  useEffect(() => {
    cargarBackground();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <Text style={[styles.textLabel]}>Fono</Text>
        <TextInput
          editable
          style={styles.input}
          placeholder="Ingrese un numero de fono"
          keyboardType="numeric"
          onChangeText={input => setFono(input)}
        />
        <Text style={[styles.textLabel]}>URL Video</Text>
        <TextInput
          editable
          style={styles.input}
          value={urlVideo}
          placeholder="Ingrese una url de un video"
          onChangeText={input => setUrlVideo(input)}
        />
        <Text style={[styles.textLabel]}>URL Musica</Text>
        <TextInput
          editable
          style={styles.input}
          value={urlMusica}
          placeholder="Ingrese una url de una cancion"
          onChangeText={input => setUrlMusica(input)}
        />

       <Button
          title="Ingresar"
          buttonStyle={styles.button}
          titleStyle={{ color: 'white' }}
          onPress={handleSubmit}
        />
    
      </ImageBackground>
      <ModalMensaje mensaje={mensajeModal} modalVisible={modalVisible} setModalVisible={setModalVisible} success={success} />
      <Menu navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    width: '95%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#33A2FF', // Set your desired border color
    borderRadius: 8, // Set your desired border radius
    padding: 10,
    backgroundColor: 'white',
  },
  textLabel: {
    marginLeft: '5%',
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: '#33A2FF',
    borderRadius: 10,
  },
});
