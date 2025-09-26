import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/bgImage.png")} // 👈 background image
      style={styles.background}
      blurRadius={4}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>MetaTask</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.topRightLink}>Sign in</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heading}>
          Achieve More, Stress Less {"\n"} with Seamless Task Management App
        </Text>
        <Text style={styles.subtext}>
          Elevate your productivity with our dynamic task app. Stay organized,
          focused, and in control of your tasks.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.signInBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signUpBtn]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  topBar: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  topRightLink: {
    fontSize: 16,
    color: "white",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  subtext: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  signInBtn: {
    backgroundColor: "#1976d2",
  },
  signUpBtn: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
