import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  BottomTabNavigation: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MetaTask</Text>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.heading}>
          Achieve More, Stress Less with Seamless Task Management
        </Text>
        <Text style={styles.caption}>
          Elevate your productivity with our dynamic task app. Stay organized,
          focused, and in control of your tasks.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity>
            <Text style={styles.HomeBtn} onPress={()=>navigation.navigate("Login")}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.signupBtn}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  logoContainer: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
    zIndex:1
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  caption: {
    fontSize: 16,
    color: "#e7e6e6b9",
    textAlign: "center",
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
  },
  HomeBtn: {
    backgroundColor: "#ffffff",
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    fontWeight: "600",
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: "#000000",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    fontWeight: "600",
    fontSize: 16,
  },
});
