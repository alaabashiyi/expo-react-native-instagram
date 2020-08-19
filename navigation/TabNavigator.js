import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  SearchNavigator,
  HomeNavigator,
  ActivityNavigator,
  PostNavigator,
  ProfileNavigator,
} from "./StackNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "md-home";
            } else if (route.name === "Search") {
              iconName = focused ? "ios-search" : "ios-search";
            } else if (route.name === "Post") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Activity") {
              iconName = focused ? "ios-heart" : "ios-heart-empty";
            } else if (route.name === "MyProfile") {
              iconName = focused ? "ios-person" : "ios-person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="Post" component={PostNavigator} />
        <Tab.Screen name="Activity" component={ActivityNavigator} />
        <Tab.Screen name="MyProfile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
