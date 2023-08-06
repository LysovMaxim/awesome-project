import { PostScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "PostScreen") {
            iconName = focused = "grid";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused = "plus";
          } else if (route.name === "ProfileScreen") {
            iconName = focused = "user";
          }

          return (
            (<Ionicons name={iconName} size={(size = 24)} color={color} />),
            (<AntDesign name={iconName} size={(size = 24)} color={color} />),
            (<Feather name={iconName} size={(size = 24)} color={color} />)
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FFF",
        inactiveTintColor: "#212121",
        activeBackgroundColor: "#FF6C00",
        tabStyle: {
          borderRadius: 100,
          marginTop: 6,
          marginLeft: 30,
          marginRight: 30,
          height: 40,
        },
        labelStyle: {
          display: "none",
        },
        keyboardHidesTabBar: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="PostScreen"
        options={{ headerShown: false }}
        component={PostScreen}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        options={{
          headerShown: false,
          tabBarStyle:{display:"none"}
        }}
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};
