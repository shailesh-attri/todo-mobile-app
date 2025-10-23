import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
import TaskModal from "../../../components/editTaskModal";
import EditTaskModal from "../../../components/editTaskModal";

const AllTasks = () => {
  const isFocused = useIsFocused();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { setToCallHook, userTask } = useTaskContext();
  const [loading, setLoading] = useState<
    false | "taskProgress" | "forImportant" | "deleteTask"
  >(false);
  const hasFetched = useRef(false);

  // 🧠 Avoid refetching infinitely
  useEffect(() => {
    if (isFocused) {
      // Only fetch if not fetched yet this focus
      if (!hasFetched.current) {
        setToCallHook(true);
        hasFetched.current = true;
      }
    } else {
      // Reset flag when leaving screen, so it can refetch next time
      hasFetched.current = false;
    }
  }, [isFocused]);

  const refetchTasks = () => setToCallHook(true);

  // 🗓️ Date formatting
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

  // ✅ Toggle completion
  const toggleComplete = async (task: any) => {
    try {
      setLoading("taskProgress");
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const res = await apiClient.patch(
        `${markCompleted}/${task._id}`,
        updatedTask
      );
      if (res.status === 200) {
        Toast.show({ type: "success", text1: res.data.message });
        refetchTasks();
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete task
  const deleteTask = async (taskId: any) => {
    try {
      setLoading("deleteTask");
      const res = await apiClient.delete(`${deleteTaskRoute}/${taskId}`);
      if (res.status === 200) {
        Toast.show({ type: "success", text1: res.data.message });
        refetchTasks();
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Toggle important
  const toggleImportant = async (task: any) => {
    try {
      setLoading("forImportant");
      const updatedTask = { ...task, isImportant: !task.isImportant };
      const res = await apiClient.patch(
        `${markImportant}/${task._id}`,
        updatedTask
      );
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: task.isImportant
            ? "Task marked Important!"
            : "Task marked Unimportant!",
        });
        refetchTasks();
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: any) => {
    console.log("✏️ Edited task:", data);
    setShowEdit(false);
    setSelectedTask(null);
    refetchTasks();
  };

  // 🧩 Render each task card
  const renderList = ({ item }: any) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title || "Untitled Task"}</Text>
          {loading === "forImportant" ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={() => toggleImportant(item)}>
              <Ionicons
                name={item.isImportant ? "star" : "star-outline"}
                size={28}
                color={item.isImportant ? "#05ED98" : "#999"}
              />
            </TouchableOpacity>
          )}
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
         {loading === "taskProgress" ? (
            <ActivityIndicator />
          ) : (
          <TouchableOpacity
            onPress={() => toggleComplete(item)}
            style={[
              styles.statusButton,
              item.isCompleted ? styles.completed : styles.inProgress,
            ]}
          >
            <Text style={styles.statusButtonText}>
              {item.isCompleted ? "Completed" : "In Progress"}
            </Text>
          </TouchableOpacity>
          )}

        <View style={styles.actionBtnWrapper}>
          {!item.isCompleted && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTask(item);
                setShowEdit(true);
              }}
              style={styles.iconButton}
            >
              <Ionicons name="create-outline" size={26} color="#007AFF" />
            </TouchableOpacity>
          )}
           {loading === "deleteTask" ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() => deleteTask(item.id || item._id)}
              style={styles.iconButton}
            >
              <Ionicons name="trash-outline" size={26} color="#ff3b30" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(userTask) && userTask.length > 0 ? (
        <FlatList
          data={userTask}
          renderItem={renderList}
          keyExtractor={(item: any) =>
            ((item && (item._id ?? item.id)) ?? "").toString()
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Task found.</Text>
        </View>
      )}

      {showEdit && (
        <EditTaskModal
          visible={showEdit}
          onClose={() => {
            setShowEdit(false);
            setSelectedTask(null);
          }}
          onSubmit={handleEdit}
          initialData={selectedTask}
          refetchTasks={refetchTasks}
        />
      )}
    </SafeAreaView>
  );
};

export default AllTasks;

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

  // ➕ Floating Action Button
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#10B981",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
