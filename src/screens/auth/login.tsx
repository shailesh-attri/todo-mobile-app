import React, { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStackParamsTypes";
import { loginRoute } from "../../utils/backendApi";
import { useTaskContext } from "../../hooks/useTaskContext";
import { SafeAreaView } from "react-native-safe-area-context";
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface ILogin {
  username: string;
  password: string;
}

const Login = ({ navigation }: Props) => {
  const { sendUserData } = useTaskContext();
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const slideAnim = useRef(new Animated.Value(-100)).current;
  // hidden initially
  const [formData, setFormData] = useState<ILogin>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔔 Toast Animation Function
  const showToast = (text: string, type: "success" | "error") => {
    setMessage({ text, type });

    Animated.timing(slideAnim, {
      toValue: 0, // 👈 moves to exact top (no offset)
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setMessage(null));
    }, 3000);
  };

  const handleLogin = async () => {
    if (formData.username === "" || formData.password === "") {
      showToast("Please enter both username and password", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(loginRoute, formData);
      if (res.status === 200) {
        showToast("Login successful!", "success");
        AsyncStorage.setItem("accessToken", res?.data?.token);
        sendUserData(res?.data);
        navigation.navigate("BottomTabNavigation", { screen: "AllTasks" });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          showToast("User not found", "error");
        } else if (error.response.status === 401) {
          showToast("Invalid password", "error");
        } else {
          showToast("Server error: " + error.response.status, "error");
        }
      } else if (error.request) {
        showToast("No response from server", "error");
      } else {
        showToast("Request error: " + error.message, "error");
      }
    }
  };

  return (
    <View style={styles.root}>
      {/* 🧾 Toast Message */}
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

      {/* 🧭 Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.headingWrapper}>
            <Text style={styles.headingWrapper_Logo}>MetaTask</Text>
            <Text style={styles.headingWrapper_Caption}>
              Sign in below to access your account
            </Text>
          </View>

          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            placeholderTextColor="#9ca3af9a"
            style={styles.inputTextBox}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
            placeholder="Enter a valid Username"
            value={formData.username}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholderTextColor="#9ca3af9a"
            style={styles.inputTextBox}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            placeholder="Enter your password"
            value={formData.password}
            secureTextEntry
          />

          {loading ? (
            <View style={styles.loginBtnWrapper}>
              <ActivityIndicator color="#000" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginBtnWrapper}
            >
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          )}

          <View style={styles.lastRowWrapper}>
            <Text style={styles.headingWrapper_Caption}>
              Don’t have an account yet?
            </Text>
            <Text
              style={styles.goToSignupBtn}
              onPress={() => navigation.navigate("Signup")}
            >
              Signup
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingWrapper: {
    alignItems: "center",
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
    justifyContent: "center",
    paddingVertical: 12,
    height: 48,
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
