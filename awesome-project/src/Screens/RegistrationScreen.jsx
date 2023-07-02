import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Background from "../Components/Background";
import { useState } from "react";

export const RegistrationScreen = () => {
  const [isName, setIsName] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const handleFocusName = () => setIsName(true);
  const handleBlurName = () => setIsName(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocusPassword = () => setIsPassword(true);
  const handleBlurPassword = () => setIsPassword(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-170}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.registration}>
            <View style={styles.photoUser}></View>
            <TouchableOpacity style={styles.btnPhotoAdd}>
              <AntDesign name="plus" size={20} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={{
                marginTop: 32,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                width: "100%",
                height: 50,
                padding: 16,
                borderColor: !isName ? "#E8E8E8" : "#FF6C00",
              }}
              onFocus={handleFocusName}
              onBlur={handleBlurName}
              placeholder="Логін"
            />
            <TextInput
              style={{
                marginTop: 16,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderRadius: 8,
                width: "100%",
                height: 50,
                padding: 16,
                borderColor: !isFocused ? "#E8E8E8" : "#FF6C00",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Адреса електронної пошти"
            />
            <TextInput
              style={{
                marginTop: 16,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderColor: "#E8E8E8",
                borderRadius: 8,
                width: "100%",
                height: 50,
                padding: 16,
                borderColor: !isPassword ? "#E8E8E8" : "#FF6C00",
              }}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              placeholder="Пароль"
            />
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    position: "absolute",
  },
  registration: {
    height: "100%",
    alignItems: "center",
    width: "100%",
    marginTop: 263,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 159,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
  },
  photoUser: {
    position: "absolute",
    left: "39%",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
  // inputLogin: {
  //   marginTop: 32,
  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   borderColor: "#E8E8E8",
  //   borderRadius: 8,
  //   width: "100%",
  //   height: 50,
  //   padding: 16,
  // },
  // inputEmail: {
  //   marginTop: 16,
  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   width: "100%",
  //   height: 50,
  //   padding: 16,
  // },
  // inputPassword: {
  //   marginTop: 16,
  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   borderColor: "#E8E8E8",
  //   borderRadius: 8,
  //   width: "100%",
  //   height: 50,
  //   padding: 16,
  // },
  btnShow: {
    position: "absolute",
    bottom: 16,
    right: -165,
  },
  btn: {
    width: "100%",
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
    fontSize: 16,
    marginTop: 16,
  },
});
