import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [namePost, setNamePost] = useState("");

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisabled());
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const checkButtonDisabled = () => {
    return namePost === "" || locationTitle === "" || photo === null;
  };

  const publication = () => {
    navigation.navigate("PostScreen");
    deleteState();
  };

  const deleteState = () => {
    setNamePost("");
    setLocation("");
    setLocationTitle("");
    setPhoto(null);
    setIsButtonDisabled(true);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.registr}>Створити публікацію</Text>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Camera
          style={styles.post}
          type={Camera.Constants.Type.back}
          ref={setCameraRef}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: photo }}
              style={{ height: 240, width: 343 }}
            />
          </View>
        </Camera>
        {!photo ? (
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                setPhoto(uri);
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        ) : null}
        {!photo ? (
          <Text style={styles.loadingPhoto}>Завантажте фото</Text>
        ) : (
          <Text style={styles.loadingPhoto}>Редагувати фото</Text>
        )}
        <TextInput
          style={styles.name}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          value={namePost}
          onChangeText={setNamePost}
        />
        <TextInput
          style={styles.terrain}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
          value={locationTitle}
          onChangeText={setLocationTitle}
        />
        <Feather
          style={styles.iconMap}
          name="map-pin"
          size={24}
          color="#BDBDBD"
        />
        <TouchableOpacity
          onPress={publication}
          style={[
            styles.btn,
            { backgroundColor: isButtonDisabled ? "#F6F6F6" : "#FF6C00" },
          ]}
          disabled={isButtonDisabled}
        >
          <Text
            style={[
              styles.btnTitle,
              { color: isButtonDisabled ? "#BDBDBD" : "white" },
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={deleteState}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    alignSelf: "center",
  },
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
  back: {
    position: "absolute",
    left: 16,
    top: 54,
  },
  post: {
    alignItems: "center",
    justifyContent: "center",
    top: 32,
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  addPhoto: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 100,
    left: 140,
    bottom: 470,
    position: "absolute",
  },
  loadingPhoto: {
    marginTop: 38,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  name: {
    borderBottomColor: "#BDBDBD",
    paddingBottom: 16,
    paddingTop: 16,
    marginTop: 32,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  terrain: {
    borderBottomColor: "#BDBDBD",
    paddingBottom: 16,
    paddingLeft: 28,
    paddingTop: 16,
    marginTop: 16,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  iconMap: {
    position: "absolute",
    top: 428,
    left: 0,
  },
  btn: {
    width: "100%",
    height: 51,
    marginTop: 43,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    color: "#BDBDBD",
    paddingTop: 16,
    paddingBottom: 16,
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
  },
});
