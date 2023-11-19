import React, { useEffect } from 'react';
import { View, Text, Vibration, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';

export default function ModalMensaje({ mensaje, modalVisible, setModalVisible, success }) {
  useEffect(() => {
    if (modalVisible) {
      Vibration.vibrate();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      presentationStyle="overFullScreen" // Overlay on top of the screen
    >
      <View style={styles.centeredView}>
        {success ? (
          <View style={styles.modalViewSuccess}>
            <Text style={styles.modalText}>{mensaje}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar modal</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.modalViewError}>
            <Text style={styles.modalText}>{mensaje}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar modal</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalViewSuccess: {
    margin: 20,
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalViewError: {
    margin: 20,
    backgroundColor: 'darkgray',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});
