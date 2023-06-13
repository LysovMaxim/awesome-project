import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../pictures/PhotoBG.png")}
        style={styles.image}
      >
        <View style={styles.registration}>
          <View style={styles.photoUser}></View>
          <TouchableOpacity style={styles.btnPhotoAdd}>
            <AntDesign name="plus" size={20} color="#FF6C00" />
          </TouchableOpacity>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput style={styles.inputLogin} placeholder="Логін"/>
          <TextInput style={styles.inputEmail} placeholder="Адреса електронної пошти"/>
          <TextInput style={styles.inputPassword} placeholder="Пароль" />
          <TouchableOpacity>
            <Text style={styles.btnShow}>Показати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTitle}> Зареєстуватися </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.come}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
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
    paddingTop: 92,
    paddingBottom: 78,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  photoUser: {
    position: "absolute",
    left: "39%",
    top:-60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16
  },
  btnPhotoAdd: {
    position: "absolute",
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 100,
    width: 25,
    height: 25,
    left: Platform.OS === "ios" ? "67%" : "69%",
    top: 20,
     flex: 1,
  alignItems: "center",
  justifyContent: "center",
  },
  inputLogin: {
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: 50,
    padding: 16,
  },
  inputEmail: {
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: 50,
    padding: 16,
  },
  inputPassword: {
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: 50,
    padding: 16,
  },
  btnShow: {
    position: "absolute",
    bottom:16,
    right:16
  },
  btn: {
    height: 51,
    marginTop: 43,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 16,
  },
  come: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  }
});
