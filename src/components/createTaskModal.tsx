import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamsTypes";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiClient from "../hooks/axios.interceptor";
import { createTask } from "../utils/backendApi";
import Toast from "react-native-toast-message";

type Navigation = StackNavigationProp<RootStackParamList>;

interface TaskModalProps {
  initialData?: {
    taskName?: string;
    description?: string;
    deadline?: string;
    isCompleted?: boolean;
  };
}

const CreateTaskModal = ({}: TaskModalProps) => {
  const navigation = useNavigation<Navigation>();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!taskName.trim() || !description.trim()) {
      Toast.show({
        type: "error",
        text1: "Task name and description cannot be empty",
      });
      return;
    }
    const formattedDate = date.toISOString().split("T")[0]; // -> "YYYY-MM-DD"
    const data = {
      taskName,
      description,
      deadline: formattedDate,
      isCompleted: false,
    };
    try {
      setLoading(true);
      const addTaskRes = await apiClient.post(createTask, data);
      if (addTaskRes?.status === 200) {
        Toast.show({
          type: "success",
          text1: "New Task Created Successfully!",
        });
        setTaskName("");
        setDescription("");
        setDate(new Date());
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setLoading(false);
      navigation.navigate("BottomTabNavigation", { screen: "AllTasks" });
    }
  };

  const handleCloseModal = () => {
    navigation.navigate("BottomTabNavigation", { screen: "AllTasks" });
  };

  return (
    <Modal animationType="slide" transparent onRequestClose={handleCloseModal}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Create Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Name"
            placeholderTextColor="#aaa"
            value={taskName}
            onChangeText={setTaskName}
          />

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Task Description"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* 📅 Date Selector */}
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              📅 Deadline: {date.toDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              disabled={loading}
              style={[styles.button, styles.cancelBtn]}
              onPress={handleCloseModal}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              style={[styles.button, styles.submitBtn]}
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#2C2C2C",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  datePickerButton: {
    backgroundColor: "#2C2C2C",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  datePickerText: {
    color: "white",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: "#555",
  },
  submitBtn: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
