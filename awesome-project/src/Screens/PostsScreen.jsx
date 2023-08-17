import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { signOut } from "../../redux/sliceAuth";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const PostScreen = () => {
  const [posts, setPosts] = useState([]);
  const { login, email, imageUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = () => {
    dispatch(signOut());
    navigation.navigate("Login");
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

  const like = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: increment(1),
    });
  };

  useEffect(() => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (data) => {
      const postsData = data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(postsData);
    });
  }, []);

  const onComment = (id, url) => {
    navigation.navigate("CommentsScreen", { postId: id, uri: url });
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
        <Image style={styles.avtarConteiner} source={{ uri: imageUser }} />
        <View style={styles.avtarInfo}>
          <Text style={styles.avtarName}>{login}</Text>
          <Text style={styles.avtarEmail}>{email}</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {posts.map((post) => (
          <View key={post.id}>
            <Image style={styles.postPhoto} source={{ uri: post.data.photo }} />
            <Text style={styles.namePost}>{post.data.namePost}</Text>
            <View style={styles.informPost}>
              <TouchableOpacity
                onPress={() => onComment(post.id, post.data.photo)}
              >
                {post.data.comments === 0 ? (
                  <Ionicons name="chatbubble" size={24} color="#BDBDBD" />
                ) : (
                  <Ionicons name="chatbubble" size={24} color="#FF6C00" />
                )}
              </TouchableOpacity>
              <Text style={styles.comments}>{post.data.comments}</Text>
              <TouchableOpacity onPress={() => like(post.id)}>
                {post.data.likes === 0 ? (
                  <Feather name="thumbs-up" size={24} color="#BDBDBD" />
                ) : (
                  <Feather name="thumbs-up" size={24} color="#FF6C00" />
                )}
              </TouchableOpacity>
              <Text style={styles.like}>{post.data.likes}</Text>
              <TouchableOpacity
                style={styles.map}
                onPress={() => onMap(post.data.location)}
              >
                <Feather
                  style={styles.iconMap}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.location}>{post.data.locationTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
    flexBasis: 60,
  },
  avtarConteiner: {
    width: 60,
    height: 60,
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
  postPhoto: {
    width: 343,
    height: 240,
  },
  scrollView: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 20,
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
