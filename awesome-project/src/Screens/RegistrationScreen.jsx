import { ImageBackground, View, StyleSheet, Text } from "react-native";
import { useFonts } from 'expo-font';


export const RegistrationScreen = () => {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../pictures/PhotoBG.png")}
        style={styles.image}
      >
        <View style={styles.registration}>
          <Text style={styles.title}>Реєстрація</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  registration: {
    width: "100%",
    height: "100%",
    left: 0,
    top: 263,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
