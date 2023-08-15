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
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Background from "../Components/Background";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/sliceAuth";
import * as ImagePicker from "expo-image-picker";
import { writeDataToFirestore } from "../../firebase/frestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase/config"

const initialState = {
  email: "",
  password: "",
  login: "",
  imageUser: null,
};

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isName, setIsName] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [imageUser, setImageUser] = useState("");

  const handleFocusName = () => setIsName(true);
  const handleBlurName = () => setIsName(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocusPassword = () => setIsPassword(true);
  const handleBlurPassword = () => setIsPassword(false);


    const addPhotoUser = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
    }
  };

  const uploadImageToServer = async () => {

    if (imageUser) {
      try {
        const response = await fetch(imageUser);

        const file = await response.blob();
        const uniquePostId = Date.now().toString()
        const imageRef = ref(
          storage,
          `profileImageUser/${uniquePostId}/${file.data.name}`
        );
        
        await uploadBytes(imageRef, file);
        const downloadeURL = await getDownloadURL(imageRef);
        // setImageUser(downloadeURL);
        setState({...state,imageUser: downloadeURL })
        onData()
      } catch (error) {
        console.warn("uploadImageToServer", error);
      }
    }
  };

  const onData = async () => {
    await createUserWithEmailAndPassword(
      auth,
      state.email,
      state.password
      // state.imageUser
    );
    // console.log(imageUser)
    try {
      const user = await auth.currentUser;
      await updateProfile(user, {
        displayName: state.login,
        photoURL: state.imageUser,
      });
      const { displayName, uid, photoURL } = user;
      console.log(photoURL)
      const updatedProfile = {
        login: displayName,
        userId: uid,
        imageUser: photoURL,
        password: state.password,
        email: state.email,
        userRegister: false,
      };
      dispatch(addUser(updatedProfile));
      writeDataToFirestore(updatedProfile);
      setShowPassword(true);
      // dispatch(addUser(state));
      navigation.navigate("Login");
    } catch (error) {
      throw error;
    }
  };

  const getPassword = () => {
    if (state.password !== "") setShowPassword(false);
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
          keyboardVerticalOffset={-130}
        >
          <View style={styles.registration}>
            <Image
              style={styles.photoUser}
              source={imageUser ? { uri: imageUser } : null}
            />
            <TouchableOpacity style={styles.btnPhotoAdd} onPress={addPhotoUser}>
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
              value={state.login}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
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
              keyboardType="email-address"
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
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
              secureTextEntry={showPassword}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              placeholder="Пароль"
            />
            <TouchableOpacity>
              <Text style={styles.btnShow} onPress={getPassword}>
                Показати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTitle} onPress={uploadImageToServer}>
                Зареєстуватися
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.come}
                onPress={() => navigation.navigate("Login")}
              >
                Вже є акаунт? Увійти
              </Text>
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
