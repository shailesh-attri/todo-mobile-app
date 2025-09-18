import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// ✅ Step 1: Type for navigation
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// ✅ Step 2: Home Component
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login"); // 👈 navigate to Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏠 Welcome to Home Page</Text>
      <Button title="Go to Login" onPress={handleLogin} />
    </View>
  );
};

export default HomeScreen;

// ✅ Step 3: CSS (StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1, // full screen
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
