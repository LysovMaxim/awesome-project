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
import { useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

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
              style={{ height: 240, width: 343, zIndex: 1 }}
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
        />
        <TextInput
          style={styles.terrain}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        />
        <Feather
          style={styles.iconMap}
          name="map-pin"
          size={24}
          color="#BDBDBD"
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTitle}>Опубліковати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete}>
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
    bottom: 120,
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
    top: 425,
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
