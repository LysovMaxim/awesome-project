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
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocusPassword = () => setIsPassword(true);
  const handleBlurPassword = () => setIsPassword(false);

    const onData = (event) => {
    event.preventDefault();
    console.log(`email: ${email}`, `password: ${password}`);
    setShowPassword(true);
      reset();
      navigation.navigate("Home")
  };
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const getPassword = () => {
    if (password !== "") setShowPassword(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        keyboardVerticalOffset={-30}
      >
        
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
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            <TouchableOpacity>
              <Text style={styles.btnShow} onPress={getPassword}>Показати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTitle} onPress={onData}> Увійти </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.come} onPress={() => navigation.navigate("Registration")}>Немає акаунту? Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
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
