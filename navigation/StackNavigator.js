import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import ActivityScreen from "../screens/Activity";
import PostScreen from "../screens/Post";
import CameraScreen from "../screens/Camera";
import MapScreen from "../screens/Map";
import ProfileScreen from "../screens/Profile";
import UserProfileScreen from "../screens/UserProfile";
import EditScreen from "../screens/Signup";
import CommentScreen from "../screens/Comment";
import ChatScreen from "../screens/Chat";
import MessagesScreen from "../screens/Messages";

import { TouchableOpacity, Image, Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// export const SearchNavigator = createAppContainer(
//   createStackNavigator({
//     Search: {
//       screen: SearchScreen,
//       navigationOptions: {
//         title: "Search",
//       },
//     },
//   })
// );

const HomeNavigatorStack = createStackNavigator();
export const HomeNavigator = ({ navigation }) => {
  return (
    <HomeNavigatorStack.Navigator>
      <HomeNavigatorStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Image
              style={{ width: 120, height: 35, alignSelf: "center" }}
              source={require("../assets/logo.jpg")}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <Ionicons
                style={{ marginLeft: 10 }}
                name={"ios-camera"}
                size={30}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <Ionicons
                style={{ marginRight: 10 }}
                name={"ios-send"}
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <HomeNavigatorStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
            </TouchableOpacity>
          ),
          tabBarVisible: () => false,
        }}
      />

      <HomeNavigatorStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeNavigatorStack.Screen name="Comment" component={CommentScreen} />
      <HomeNavigatorStack.Screen name="Messages" component={MessagesScreen} />
      <HomeNavigatorStack.Screen name="Chat" component={ChatScreen} />
    </HomeNavigatorStack.Navigator>
  );
};

const SearchNavigatorStack = createStackNavigator();
export const SearchNavigator = () => {
  return (
    <SearchNavigatorStack.Navigator>
      <SearchNavigatorStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: () => null,
        }}
      />
      <SearchNavigatorStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />
      <SearchNavigatorStack.Screen name="Chat" component={ChatScreen} />
    </SearchNavigatorStack.Navigator>
  );
};

const ActivityNavigatorStack = createStackNavigator();
export const ActivityNavigator = () => {
  return (
    <ActivityNavigatorStack.Navigator>
      <ActivityNavigatorStack.Screen
        name="Activity"
        component={ActivityScreen}
      />
    </ActivityNavigatorStack.Navigator>
  );
};

const PostNavigatorStack = createStackNavigator();
export const PostNavigator = () => {
  return (
    <PostNavigatorStack.Navigator>
      <PostNavigatorStack.Screen name="Post" component={PostScreen} />
    </PostNavigatorStack.Navigator>
  );
};

const ProfileNavigatorStack = createStackNavigator();
export const ProfileNavigator = () => {
  return (
    <ProfileNavigatorStack.Navigator>
      <ProfileNavigatorStack.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{
          headerTitle: "My Profile",
        }}
      />
      <ProfileNavigatorStack.Screen name="Edit" component={EditScreen} />
      <ProfileNavigatorStack.Screen name="Chat" component={ChatScreen} />
    </ProfileNavigatorStack.Navigator>
  );
};
