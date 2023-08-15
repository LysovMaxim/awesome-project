import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import Background from "../Components/Background";
import avatarProfil from "../../src/pictures/avtar-profil.png";
import forest from "../pictures/forest.png";
import sky from "../pictures/sky.png";
import house from "../pictures/house.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

const POSTS = [
  {
    id: "1",
    name: "Ліс",
    photo: forest,
    comments: "8",
    like: "153",
    location: "Ukraine",
    data: {
      latitude: 50.4547,
      longitude: 30.5238,
    },
  },
  {
    id: "2",
    name: "Захід на Чорному морі",
    photo: sky,
    comments: "3",
    like: "200",
    location: "Ukraine",
    data: {
      latitude: 50.4547,
      longitude: 30.5238,
    },
  },
  {
    id: "3",
    name: "Старий будиночок у Венеції",
    photo: house,
    comments: "50",
    like: "200",
    location: "Italy",
    data: {
      latitude: 47.083,
      longitude: 12.183,
    },
  },
];

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { login, imageUser } = useSelector((state) => state.auth);

  const goToCommentsScreen = () => {
    navigation.navigate("CommentsScreen");
  };

  const onMap = (data) => {
    if (!data) {
      alert("not coords");
      return;
    }
    navigation.navigate("MapScreen", {
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

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
      <View style={styles.container}>
        <View style={styles.registration}>
          <Image style={styles.photoUser} source={{uri:imageUser}}/>
          <TouchableOpacity style={styles.btnPhotoClose}>
            <AntDesign name="close" size={13} color="#BDBDBD" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.nameUser}>{login}</Text>
          <ScrollView style={styles.scrollView}>
            {POSTS.map((post) => (
              <View key={post.id}>
                <Image source={post.photo} />
                <Text style={styles.namePost}>{post.name}</Text>
                <View style={styles.informPost}>
                  <TouchableOpacity onPress={goToCommentsScreen}>
                    <Ionicons name="chatbubble" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                  <Text style={styles.comments}>{post.comments}</Text>
                  <TouchableOpacity>
                    <Feather name="thumbs-up" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                  <Text style={styles.like}>{post.like}</Text>
                  <TouchableOpacity
                    style={styles.map}
                    onPress={() => onMap(post.data)}
                  >
                    <Feather
                      style={styles.iconMap}
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.location}>{post.location}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
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
    width: "100%",
    marginTop: 147,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 159,
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
    left: "35%",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnPhotoClose: {
    position: "absolute",
    borderColor: "#BDBDBD",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 100,
    width: 25,
    height: 25,
    left: Platform.OS === "ios" ? "67%" : "63%",
    top: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logOut: {
    position: "absolute",
    left: 350,
    top: 22,
  },
  nameUser: {
    marginTop: 92,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 33,
  },
  scrollView: {
    paddingLeft: 16,
    paddingRight: 16,
    alignSelf: "center",
  },
  namePost: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: 500,
    marginTop: 8,
  },
  informPost: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
  },
  comments: {
    marginLeft: 6,
    marginRight: 24,
  },
  like: {
    marginLeft: 6,
    marginRight: "auto",
  },

  map: {
    flexDirection: "row",
  },
  location: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
