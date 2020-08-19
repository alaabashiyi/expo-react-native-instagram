import TabNavigator from "./TabNavigator";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: "Signup",
    },
  },
});

export default createAppContainer(StackNavigator);
