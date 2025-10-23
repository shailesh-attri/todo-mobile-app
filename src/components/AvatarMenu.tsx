import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

// ✅ Local fallback avatar (place this image in your assets folder)


const AvatarMenu = () => {
  const { thisUser } = useTaskContext();
  const [visible, setVisible] = useState(false);
  const { logout } = useAuthContext();
  const firstLetter = thisUser?.username ? thisUser.username.charAt(0).toUpperCase() : "U";
  const defaultAvatar = { uri: `https://ui-avatars.com/api/?name=${firstLetter}&background=007AFF&color=fff` };
  const user = {
    email: thisUser?.username || "Unknown User",
    avatar:
      thisUser?.avatarUrl && thisUser.avatarUrl.trim() !== ""
        ? { uri: thisUser.avatarUrl }
        : defaultAvatar, // ✅ fallback
  };
  return (
    <View style={styles.container}>
      {/* Avatar Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.avatarButton}
      >
        <Image source={user.avatar} style={styles.avatar} />
      </TouchableOpacity>

      {/* Popup Menu */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        {/* Overlay */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menuWrapper}>
            <View style={styles.popup}>
              <View style={styles.arrow} />

              {/* Menu Content */}
              <View style={styles.menuContent}>
                <View style={styles.userRow}>
                  <Image source={user.avatar} style={styles.menuAvatar} />
                  <Text style={styles.email}>{user.email}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    logout();
                  }}
                  style={styles.logoutRow}
                >
                  <Ionicons name="log-out-outline" size={22} color="#ff3b30" />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AvatarMenu;


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarButton: {
    marginBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  menuWrapper: {
    position: "absolute",
    bottom: 90, // distance above tab bar
    right: 15, // align with avatar
    alignItems: "flex-end",
  },
  popup: {
    backgroundColor: "transparent",
    position: "relative",
  },
  menuContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  arrow: {
    position: "absolute",
    bottom: -8, // 👈 place arrow at bottom edge
    right: 16, // 👈 near right corner (points to avatar)
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white", // arrow color matches popup
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  menuAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  email: {
    color: "black",
    fontSize: 13,
    flexShrink: 1,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoutText: {
    color: "#ff3b30",
    fontWeight: "600",
  },
});
