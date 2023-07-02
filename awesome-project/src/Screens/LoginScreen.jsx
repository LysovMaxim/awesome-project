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
// import { AntDesign } from "@expo/vector-icons";
import Background from "../Components/Background";
import { useState } from "react";

export const LoginScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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
        keyboardVerticalOffset={-50}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.registration}>
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              name="email"
              style={{
                marginTop: 32,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderRadius: 8,
                width: "100%",
                height: 50,
                padding: 16,
                borderColor: !isFocused ? "#E8E8E8" : "#FF6C00",
              }}
              placeholder="Адреса електронної пошти"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <TextInput
              name="password"
              style={{
                marginTop: 16,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderRadius: 8,
                width: "100%",
                height: 50,
                padding: 16,
                borderColor: !isPassword ? "#E8E8E8" : "#FF6C00",
              }}
              placeholder="Пароль"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <TouchableOpacity>
              <Text style={styles.btnShow}>Показати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTitle}> Увійти </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.come}>Немає акаунту? Зареєструватися</Text>
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
    marginTop: 323,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 111,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
  },
  // inputEmail: {
  //   marginTop: 32,
  //   backgroundColor: "#F6F6F6",
  //   borderWidth: 1,
  //   // borderColor: "#E8E8E8",
  //   borderRadius: 8,
  //   width: "100%",
  //   height: 50,
  //   padding: 16,
  //   borderColor: !isFocused ? "#E8E8E8" : '#FF6C00',
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
