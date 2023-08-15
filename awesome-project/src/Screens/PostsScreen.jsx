import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import avatar from "../../src/pictures/avatart.png";
import { signOut } from "../../redux/sliceAuth";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

export const PostScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { login, email, imageUser } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(signOut());
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.registr}>Публікації</Text>
        <TouchableOpacity style={styles.logOut} onPress={logout}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <Image style={styles.avtarConteiner} source={{uri : imageUser}}/>
        <View style={styles.avtarInfo}>
          <Text style={styles.avtarName}>{login}</Text>
          <Text style={styles.avtarEmail}>{email}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 88,
    paddingBottom: 11,
    paddingTop: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  registr: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
  
  },
  logOut: {
    position: "absolute",
    right: 10,
    top: 54,
  },
  avatar: {
    marginTop: 32,
    marginLeft: 16,
    flexDirection: "row",
    flexBasis: 60

  },
  avtarConteiner: {
    width: 60,
    heught: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    
  },
  avtarInfo: {
    marginLeft: 8,
    justifyContent: "center",
    
  },
  avtarName: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    fontWeight: 700,
  },
  avtarEmail: {
    color: "#4d4d4d",
    fontSize: 11,
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
  },
});
