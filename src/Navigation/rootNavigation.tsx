import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login/login";
import HomeScreen from "../screens";
import BottomTabNavigation from "./bottomTabNavigation";
import  {DefaultTheme } from '@react-navigation/native';


const RootNavigation = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent', 
      color:"white"
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{headerTitle:"hello"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default RootNavigation;
