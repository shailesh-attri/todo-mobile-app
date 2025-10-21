import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { bottomNavigationScreens, IBottomScreen } from "./navigation.config";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {bottomNavigationScreens
        ?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        ?.map((screen: IBottomScreen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.Component}
            options={screen.options as BottomTabNavigationOptions}
          />
        ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
