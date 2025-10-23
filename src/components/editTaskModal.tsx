import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import apiClient from "../hooks/axios.interceptor";
import { updateTaskRoute } from "../utils/backendApi";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  refetchTasks: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  initialData?: { title?: string; description?: string, _id?: string, deadline?: string  };
}

const EditTaskModal = ({
  visible,
  onClose,
  refetchTasks,
  initialData,
}: TaskModalProps) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Update local state when modal opens or initialData changes
  useEffect(() => {
    if (visible) {
      setTaskName(initialData?.title || "");
      setDescription(initialData?.description || "");
      setDate(new Date(initialData?.deadline ?? ""));
    }
  }, [visible, initialData]);

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
      const addTaskRes = await apiClient.put(updateTaskRoute+"/"+initialData?._id, data);
      if (addTaskRes?.status === 200) {
        Toast.show({
          type: "success",
          text1: "New Task Created Successfully!",
        });
        setTaskName("");
        setDescription("");
        setDate(new Date());
        refetchTasks?.();
      }
    } catch (error: any) {
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setLoading(false);
      onClose?.();
    }
  };

  const handleCloseModal = () => {
    onClose?.();
  };

  return (
    <Modal animationType="slide" transparent onRequestClose={handleCloseModal}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Update Task</Text>

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
                <Text style={styles.buttonText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;

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
