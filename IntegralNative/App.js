import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Fono from './src/screens/Fono'
import Configuracion from './src/screens/Configuracion'
import BackgroundImageSelector from './src/screens/BackgroundImageSelector'
import Url from './src/screens/Url'
import Qr from './src/screens/Qr'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Configuracion"
        screenOptions={{
          orientation: 'portrait',
          headerShown: false,
          animation: 'none', 
        }}>        
        <Stack.Screen
          name="Fono"
          component={Fono}
          options={{title: 'Fono'}}
        />
        <Stack.Screen name="Configuracion" component={Configuracion} />
        <Stack.Screen name="BackgroundImageSelector" component={BackgroundImageSelector} />
        <Stack.Screen name="Url" component={Url} />
        <Stack.Screen name="Qr" component={Qr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

