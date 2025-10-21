import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiClient from "../../../hooks/axios.interceptor";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useTaskContext } from "../../../hooks/useTaskContext";
import {
  deleteTaskRoute,
  markCompleted,
  markImportant,
} from "../../../utils/backendApi";
import { calculateDeadline } from "../../../utils/calculateDates";

const CompletedTask = () => {
  const isFocused = useIsFocused();
  const [editData, setEditData] = useState();
  const { setToCallHook, completedTask } = useTaskContext();
  console.log("completedtask", completedTask)

  useEffect(() => {
  if (isFocused ) {
    setToCallHook(true);
  }
}, [isFocused]);

  const refetchTasks = () => setToCallHook(true);

  const formatDate = (date: Date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";
    return parsedDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleComplete = async (task: any) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const res = await apiClient.patch(`${markCompleted}/${task._id}`, updatedTask);
      if (res.status === 200) {
        Toast.show({ type: "success", text1: res.data.message });
        refetchTasks();
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    }
  };


  const renderList = ({ item }: any) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title || "Untitled Task"}</Text>
        <Text>
          <Ionicons
            name={item.isImportant ? "star" : "star-outline"}
            size={28}
            color={item.isImportant ? "#05ED98" : "#999"}
          />
        </Text>
      </View>

      <Text style={styles.description}>
        {item.description || "No description provided."}
      </Text>

      <View style={styles.dateAndDeadline}>
        <Text style={styles.date}>{formatDate(item.createdAt) || "N/A"}</Text>
        <Text
          style={[
            styles.deadlineTag,
            calculateDeadline(item.deadline) === "Deadline passed" &&
              styles.deadlinePassed,
            calculateDeadline(item.deadline) === "Deadline for today" &&
              styles.deadlineToday,
          ]}
        >
          {calculateDeadline(item.deadline) || "No deadline"}
        </Text>
      </View>

      <View style={styles.cardActionButtonWrapper}>
        <Text
          style={[
            styles.statusButton,
            item.isCompleted ? styles.completed : styles.inProgress,
          ]}
        >
          <Text style={styles.statusButtonText}>
            {item.isCompleted ? "Completed" : "In Progress"}
          </Text>
        </Text>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(completedTask) && completedTask.length > 0 ? (
        <FlatList
          data={completedTask}
          renderItem={renderList}
          keyExtractor={(item: any) =>
            ((item && (item._id ?? item.id)) ?? "").toString()
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Task found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CompletedTask;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  emptyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: { color: "#cbc8c8ff", marginTop: 20 },
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff1c",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "600", color: "white" },
  description: { color: "#808080", fontSize: 14, marginBottom: 10 },
  dateAndDeadline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  date: { color: "#A1A1A1" },
  deadlineTag: { color: "#fdfdfdff", fontWeight: "500" },
  deadlinePassed: { color: "#df3232ff", fontWeight: "700" },
  deadlineToday: { color: "#EAB308", fontWeight: "700" },
  cardActionButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: { height: 12 },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  completed: { backgroundColor: "#22c55e" },
  inProgress: { backgroundColor: "#ca8a04" },
  statusButtonText: { color: "#fff", fontWeight: "600" },
});
