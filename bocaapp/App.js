import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

import { Login } from './src/screens/Login';
import { Cadastro } from './src/screens/Cadastro';
import { Esqueci } from './src/screens/Esqueci';
import { Home } from './src/screens/Home';
import { Loja } from './src/screens/Loja';
import { Especial } from './src/screens/Especial';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Esqueci" component={Esqueci} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Loja" component={Loja} options={{ headerShown: false }} />
        <Stack.Screen name="Especial" component={Especial} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}