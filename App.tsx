import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const handleLogin = ()=>{

  }
  return (
    <View style={styles.container}>
      <View style={[styles.gradient, { backgroundColor: "#4c669f" }]} />
      <View style={[styles.gradient, { backgroundColor: "#3b5998", opacity: 0.7 }]} />
      <View style={[styles.gradient, { backgroundColor: "#192f6a", opacity: 0.5 }]} />

      <Text style={styles.text}>Kuchh dekhna chahte ho?</Text>

      <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
        <Text style={styles.login_text}>Login kar le</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  login_button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  login_text: {
    color: "#192f6a",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
