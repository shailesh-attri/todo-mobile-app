import { ComponentType } from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons"; // ✅ FIXED — default import
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import Login from "../screens/auth/login";
import Signup from "../screens/auth/signup";
import HomeScreen from "../screens";
import BottomTabNavigation from "./bottomTabNavigation";
import AllTasks from "../screens/Dashboard/AllTask";
import CompletedTask from "../screens/Dashboard/CompletedTask";
import ImportantTask from "../screens/Dashboard/ImportantTask";
import { TouchableOpacity } from "react-native";

export interface IRootScreen {
  name: string;
  Component: ComponentType<any>;
  options?: StackNavigationOptions;
  order?: number;
}

export interface IBottomScreen {
  name: string;
  Component: ComponentType<any>;
  options?: BottomTabNavigationOptions;
  order?: number;
}

export const rootNavigationScreens: IRootScreen[] = [
  {
    name: "Home",
    Component: HomeScreen,
    order: 1,
    options: { headerShown: false },
  },
  {
    name: "Login",
    Component: Login,
    order: 2,
    options: { headerShown: false },
  },
  {
    name: "Signup",
    Component: Signup,
    order: 3,
    options: { headerShown: false },
  },
  {
    name: "BottomTabNavigation",
    Component: BottomTabNavigation,
    order: 5,
    options: { headerTitle: "", headerShown: false },
  },
];

export const bottomNavigationScreens: IBottomScreen[] = [
  {
    name: "AllTasks",
    Component: AllTasks,
    order: 2,
    options: {
      headerShown: true,
      title: "All Tasks",
      headerLeft: () => null,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="list-outline" color={color} size={size} />
      ),
    },
  },
  {
    name: "CompletedTask",
    Component: CompletedTask,
    order: 3,
    options: {
      headerShown: true,
      title: "Completed Tasks",
      headerLeft: () => null,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="checkmark-done-outline" color={color} size={size} />
      ),
    },
  },
  {
  name: "AddTask",
  Component: CompletedTask,
  order: 2.5,
  options: {
    tabBarButton: (props) => (
      <TouchableOpacity
        {...props as any}
        style={{
          position: "absolute",
          top: -30,
          alignSelf: "center", // ✅ center horizontally
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#007AFF",
          width: 65,
          height: 65,
          borderRadius: 32.5,
          shadowColor: "#007AFF",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 5 },
          elevation: 6,
          zIndex: 10, // ✅ ensures it appears above others
        }}

      >
        <Ionicons name="add" color="white" size={30} />
      </TouchableOpacity>
    ),
  },
}

];
