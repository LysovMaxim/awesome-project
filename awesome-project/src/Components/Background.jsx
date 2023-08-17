import { View, Image } from "react-native";
import photoBg from "../../src/pictures/PhotoBG.png";

function Background() {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <Image source={photoBg} style={{ width: "100%" }} resizeMode="cover" />
    </View>
  );
}

export default Background;
