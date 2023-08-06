import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import avatar from "../../src/pictures/avatart.png";

export const PostScreen = () => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.registr}>Публікації</Text>
        <TouchableOpacity style={styles.logOut}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <View style={styles.avtarConteiner}>
          <Image source={avatar} />
        </View>
        <View style={styles.avtarInfo}>
          <Text style={styles.avtarName}>Natali Romanova</Text>
          <Text style={styles.avtarEmail}>email@example.com</Text>
        </View>
      </View>
      {/* <View style={styles.menu}>
        <TouchableOpacity style={styles.grid}>
          <Ionicons name="md-grid-outline" size={24} color="#212121" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.plus}>
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.user}>
          <Feather name="user" size={24} color="#212121" />
        </TouchableOpacity>
      </View> */}
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
  // menu: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   paddingTop: 9,
  //   alignItems: "baseline",
  //   gap: 39,
  //   borderTopWidth: 1,
  //   borderTopColor: "#b3b3b3",
  //   top: 540,
  //   height: 83,
  // },
  // plus: {
  //   width: 70,
  //   height: 40,
  //   backgroundColor: "#FF6C00",
  //   borderRadius: 100,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
