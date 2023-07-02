// import { RegistrationScreen } from "./src/Screens/RegistrationScreen";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { LoginScreen } from "./src/Screens/LoginScreen";



export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return <LoginScreen />;
}
