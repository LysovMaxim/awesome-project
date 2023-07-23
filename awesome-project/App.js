import { RegistrationScreen } from "./src/Screens/RegistrationScreen";
import { LoginScreen } from "./src/Screens/LoginScreen";
import { PostScreen } from "./src/Screens/PostsScreen";
import { CreatePostsScreen } from "./src/Screens/CreatePostsScreen"
import { CommentsScreen } from "./src/Screens/CommentsScreen"
import {ProfileScreen} from "./src/Screens/ProfileScreen"
import { useFonts } from 'expo-font';
import { useCallback } from 'react';




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
  return <ProfileScreen />;
}
