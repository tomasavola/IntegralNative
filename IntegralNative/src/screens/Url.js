import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import Menu from '../components/Menu'
import DataService from '../services/DataService';
import { Video, ResizeMode, Audio } from 'expo-av';
import { Button,Icon } from 'react-native-elements';
let dataService = new DataService();

export default function Url({ navigation }) {

  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [img, setImg] = useState(null);
  const [videoUrl, setVideo] = useState(undefined);
  const [musicaUrl, setMusica] = useState(undefined);
  const [sound, setSound] = useState();
  const [isSoundReproducing, setIsSoundReproducing] = useState(false);

  let loadBackground = async () => {
    if (JSON.parse(await dataService.obtenerBackground())) {
      let Background = JSON.parse(await dataService.obtenerBackground());
      setImg(Background.uri);
    }
  }

  let loadMultimedia = async () => {
    if (await dataService.obtenerDatos()) {
      let datos = await dataService.obtenerDatos();
      if (datos.video && datos.musica) {
        let video = datos.video;
        setVideo(video)
        let musica = datos.musica;
        setMusica(musica)
        const { sound } = await Audio.Sound.createAsync({ uri: musica }, { volume: 0.8 },);
        setSound(sound);
      }
    }
  }

  let reproduceSound = async () => {
    console.log()
    if (isSoundReproducing && sound) {
      setIsSoundReproducing(false)
      console.log('Unloading Sound');
      await sound.pauseAsync();
      sound.unloadAsync();
    } else {
      setIsSoundReproducing(true);
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri: musicaUrl }, { volume: 0.8 },);
      setSound(sound);
    }
  }

  let playSound = async () => {
    setIsSoundReproducing(true)
    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    if (sound) {
      playSound();
    }
  }, [sound]);

  useEffect(() => {
    loadBackground();
    loadMultimedia();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground source={{ uri: img }} style={styles.img}>
        <Text style={{ backgroundColor: 'white', fontSize: 20, width: '80%', textAlign: 'center' }}>MultimediaScreen</Text>
        {videoUrl ? (
          <>
            <Video
              style={styles.video}
              ref={video}
              source={{
                uri: videoUrl,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <Button onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()} titulo={status.isPlaying ? 'Pausar video' : 'Reproducir video'} style={styles.button1} />
            
          </>
        ) : (
          <></>
        )}
        {sound ? (

          /*PREGUNTAR XQ NO FUNCIONA MULTIMEDIA Y EL BOTON*/
          <>
            <button onPress={reproduceSound} titulo={isSoundReproducing ? 'Pausar audio' : 'Reproducir audio'} style={styles.button} />
          </>
        ) : (
          <>
            <Text style={{ backgroundColor: 'white', fontSize: 15, width: '80%', textAlign: 'center' }}>Tiene que agregar el archivo en ajustes</Text>
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
    backgroundColor: '#fff'
  },

  button: {
    marginTop: 20,
    width: 500,
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
  video: {
    width: '80%',
    height: 200
  }
});
