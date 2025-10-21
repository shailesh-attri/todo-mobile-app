import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Platform,
  Pressable as PressButton,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import AvatarMenu from "../components/AvatarMenu";

const { width } = Dimensions.get("window");

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  // Helper function to render each tab
  const renderTab = (route, index) => {
    const isFocused =
      state.index === state.routes.findIndex((r) => r.name === route.name);

    const icon =
      route.name === "AllTasks"
        ? "list-outline"
        : route.name === "CompletedTask"
        ? "checkmark-done-outline"
        : null;

    const label =
      route.name === "AllTasks"
        ? "All Tasks"
        : route.name === "CompletedTask"
        ? "Completed"
        : "";

    return (
      <PressButton
        key={route.key}
        onPress={() => navigation.navigate(route.name)}
        style={styles.tabButton}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={isFocused ? "#007AFF" : "#888"}
          />
        )}
        <Text
          style={[styles.tabLabel, { color: isFocused ? "#007AFF" : "#888" }]}
        >
          {label}
        </Text>
      </PressButton>
    );
  };

  // Separate tabs into left and right (excluding AddTask)
  const filteredRoutes = state.routes.filter((r) => r.name !== "AddTask");
  const mid = Math.ceil(filteredRoutes.length / 2);
  const leftTabs = filteredRoutes.slice(0, mid);
  const rightTabs = filteredRoutes.slice(mid);

  return (
    <View style={styles.wrapper}>
      {/* SVG background with center dip */}
      <Svg width={width} height={80} style={styles.svgStyle}>
        <Path
          d={`M0 20 
          H${width / 2 - 80}
          C${width / 2 - 40} 20, ${width / 2 - 40} 60, ${width / 2} 60
          C${width / 2 + 40} 60, ${width / 2 + 40} 20, ${width / 2 + 80} 20
          H${width}
          V80
          H0
          Z`}
          fill="white"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1}
        />
      </Svg>

      {/* Center Add Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddTask")}
        style={styles.addButton}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Tabs split left and right */}
      <View style={styles.tabRow}>
        <View style={styles.sideTabs}>{leftTabs.map(renderTab)}</View>

        <View style={styles.sideTabsRight}>
          {rightTabs.map(renderTab)}

          {/* ✅ Avatar Button at the end */}
          <AvatarMenu />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
  },
  svgStyle: {
    position: "absolute",
    bottom: 0,
  },
  sideTabsRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: width / 2.5,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 0, // small margin from screen edges
  },

  sideTabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width / 2.5, // make each side wider so tabs move away from center
  },

  tabButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
  addButton: {
    position: "absolute",
    bottom: 35,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 10,
  },
});

export default CustomTabBar;
