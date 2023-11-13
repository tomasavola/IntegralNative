import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Fono from './src/screens/Fono'
import Configuration from './src/screens/Configuration'
import BackgroundImageSelector from './src/screens/BackgroundImageSelector'
import UrlPlayer from './src/screens/UrlPlayer'
import Qr from './src/screens/Qr'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Configuration"
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
        <Stack.Screen name="Configuration" component={Configuration} />
        <Stack.Screen name="BackgroundImageSelector" component={BackgroundImageSelector} />
        <Stack.Screen name="UrlPlayer" component={UrlPlayer} />
        <Stack.Screen name="Qr" component={Qr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

