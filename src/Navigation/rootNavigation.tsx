import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme } from "@react-navigation/native";
import { rootNavigationScreens } from "./navigation.config";
import { IRootScreen } from "./navigation.config";

const RootNavigation = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
      color: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {rootNavigationScreens
        ?.sort((a: IRootScreen, b: IRootScreen) => (a.order ?? 0) - (b.order ?? 0))
        ?.map((screen:IRootScreen)=>(
          <Stack.Screen
            name={screen.name}
            component={screen.Component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default RootNavigation;
