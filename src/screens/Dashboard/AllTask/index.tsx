import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tasks } from "../../../utils/task";
import { calculateDeadline } from "../../../utils/calculateDates";
import axios from "axios";
import {
  deleteTaskRoute,
  markCompleted,
  markImportant,
} from "../../../utils/backendApi";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const AllTasks = () => {
  const [editData, setEditData] = useState();
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
  const renderList = ({ item }: any) => {
    return (
      <View style={styles.cardContainer}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title || "Title"}</Text>
          <TouchableOpacity onPress={() => toggleImportant(item)}>
            <Ionicons
              name={item.isImportant ? "star" : "star-outline"}
              size={28}
              color={item.isImportant ? "#05ED98" : "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {item.description || "Description"}
        </Text>

        {/* Date & Deadline */}
        <View style={styles.dateAndDeadline}>
          <Text style={styles.date}>
            {formatDate(item.createdAt) || "Date"}
          </Text>
          <Text
            style={[
              styles.deadlineTag,
              calculateDeadline(item.deadline) === "Deadline passed" &&
                styles.deadlinePassed,
              calculateDeadline(item.deadline) === "Deadline for today" &&
                styles.deadlineToday,
            ]}
          >
            {calculateDeadline(item.deadline) || "Deadline"}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.cardActionButtonWrapper}>
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
          <View style={styles.actionBtnWrapper}>
            {/* Only show edit if task is not completed */}
            {!item.isCompleted && (
              <TouchableOpacity
                onPress={() => {
                  handleEdit(item);
                  // setUpdateModal((prev) => !prev);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="create-outline" size={26} color="#007AFF" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.iconButton}
            >
              <Ionicons name="trash-outline" size={26} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const toggleComplete = async (task: any) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const res = await axios.patch(
        `${markCompleted}/${task._id}`,
        updatedTask
      );

      if (res.status === 200) {
        console.log(res.data);
        // setNotify(res.data);
        // toast.success(res.data.message);
        Toast.show({
          type: "success",
          text1: res.data.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  const handleEdit = (task: any) => {
    setEditData(task);
  };

  const deleteTask = async (taskId: any) => {
    console.log(taskId);
    try {
      const res = await axios.delete(`${deleteTaskRoute}/${taskId}`);
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: res.data.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  const toggleImportant = async (task: any) => {
    try {
      const updatedTask = { ...task, isImportant: !task.isImportant };

      const res = await axios.patch(
        `${markImportant}/${task._id}`,
        updatedTask
      );

      if (res.status === 200) {
        console.log(res.data);
        // setNotify(res.data);
        if (res.data.markedImportant === true) {
          //   toast.success("Task marked UnImportant!");
          Toast.show({
            type: "success",
            text1: "Task marked UnImportant!",
          });
        } else {
          //   toast.success("Task marked Important!");
          Toast.show({
            type: "success",
            text1: "Task marked Important!",
          });
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={
          Array.isArray((tasks as any)?.userTask?.allTask)
            ? (tasks as any).userTask.allTask
            : Array.isArray(tasks)
            ? tasks
            : []
        }
        renderItem={renderList}
        keyExtractor={(item: any) =>
          ((item && (item._id ?? item.id)) ?? "").toString()
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5F5F5",
    padding: 10,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff1c",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 0, // Android shadow
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  description: {
    color: "#808080",
    fontSize: 14,
    marginBottom: 10,
  },
  dateAndDeadline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  date: {
    color: "#A1A1A1",
  },
  deadlineTag: {
    color: "#fdfdfdff",
    fontWeight: "500",
  },
  deadlinePassed: {
    color: "#df3232ff",
    fontWeight: "700",
  },
  deadlineToday: {
    color: "#EAB308", // yellow-ish
    fontWeight: "700",
  },
  cardActionButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  separator: {
    height: 12,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  completed: {
    backgroundColor: "#22c55e", // green-500
  },
  inProgress: {
    backgroundColor: "#ca8a04", // yellow-700
  },
  statusButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
