import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomNavBar = () => {
  const navigation = useNavigation();

  const navigateToAddEvent = () => {
    navigation.navigate('AddEventScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToAddEvent}>
        <Text style={styles.link}>Calendario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default CustomNavBar;
