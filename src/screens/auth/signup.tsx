import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { RootStackParamList } from "../../types/rootStackParamsTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

interface ISignUp {
  username: string;
  password: string;
}

type Props = {
  navigation: SignupScreenNavigationProp;
};

const Signup = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<ISignUp>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Toast function
  const showToast = (text: string, type: "success" | "error") => {
    setMessage({ text, type });

    // slide down
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // hide after 3s
    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setMessage(null));
    }, 3000);
  };

  const handleRegister = () => {
    if (formData.username === "" || formData.password === "") {
      showToast("Please enter both username and password", "error");
      return;
    }

    // Mock success
    showToast("Account created successfully!", "success");

    // Optionally navigate
    setTimeout(() => navigation.navigate("Login"), 1500);
  };

  return (
    <View style={styles.formContainer}>
      {/* Toast (moved outside the form!) */}
      {message && (
        <Animated.View
          style={[
            styles.toastWrapper,
            {
              transform: [{ translateY: slideAnim }],
              backgroundColor: message.type === "error" ? "#b91c1c" : "#166534",
            },
          ]}
        >
          <Text style={styles.toastText}>{message.text}</Text>
        </Animated.View>
      )}

      <View style={styles.form}>
        <View style={styles.headingWrapper}>
          <Text style={styles.headingWrapper_Logo}>MetaTask</Text>
          <Text style={styles.headingWrapper_Caption}>
            Register your account
          </Text>
        </View>

        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          placeholderTextColor="#9ca3af9a"
          style={styles.inputTextBox}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholder="Enter a valid Username"
          value={formData.username}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          placeholderTextColor="#9ca3af9a"
          style={styles.inputTextBox}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Enter your password"
          value={formData.password}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={styles.loginBtnWrapper}
        >
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.lastRowWrapper}>
          <Text style={styles.headingWrapper_Caption}>
            Already have an account?
          </Text>
          <Text
            style={styles.goToSignupBtn}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  headingWrapper_Logo: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
  },
  headingWrapper_Caption: {
    color: "#ffffffc0",
  },
  form: {
    backgroundColor: "#111827",
    width: "90%",
    borderRadius: 10,
    padding: 16,
    overflow: "hidden",
  },
  inputLabel: {
    color: "#ffffffa2",
  },
  inputTextBox: {
    borderRadius: 10,
    color: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
  },
  loginBtnWrapper: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  loginBtnText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  lastRowWrapper: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  goToSignupBtn: {
    color: "white",
    marginLeft: 10,
    fontWeight: "600",
  },
  toastWrapper: {
    position: "absolute",
    top: 0, // now truly touches top border
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  toastText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
