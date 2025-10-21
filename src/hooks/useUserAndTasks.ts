import { useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, getTask } from "../utils/backendApi";
import apiClient from "./axios.interceptor";

interface UseUserAndTasksProps {
  sendImportantTask: (tasks: any[]) => void;
  sendCompletedTask: (tasks: any[]) => void;
  sendUserData: (user: any) => void;
  sendTaskData: (tasks: any[]) => void;
  sendModalData: (data: any) => void;
  userToken?: string | null;
  trigger?: boolean;
  setToCallHook: (data: boolean) => void;
}

export const useUserAndTasks = ({
  sendImportantTask,
  sendCompletedTask,
  sendUserData,
  sendTaskData,
  sendModalData,
  userToken,
  trigger = false,
  setToCallHook,
}: UseUserAndTasksProps) => {
  const fetchUserAndTasks = useCallback(async () => {
    try {
      // 1️⃣ Get token
      let token = userToken || (await AsyncStorage.getItem("accessToken"));
      if (!token) {
        setToCallHook(false);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 2️⃣ Fetch user and task data
      const [userRes, taskRes] = await Promise.all([
        apiClient.get(getUser, config),
        apiClient.get(getTask, config),
      ]);

      // 3️⃣ Handle user data
      const userData = userRes.data?.user || userRes.data?.otherDetails;
      if (userData) {
        sendUserData(userData);
      }

      // 4️⃣ Extract tasks safely
      let tasks: any[] =
        taskRes.data?.tasks ||
        taskRes.data?.userTask?.allTask ||
        [];

      // 5️⃣ Update context
      sendTaskData(tasks);
      sendImportantTask(tasks.filter((t: any) => t.isImportant));
      sendCompletedTask(tasks.filter((t: any) => t.isCompleted));

      setToCallHook(false);
    } catch (err: any) {
      console.error("[useUserAndTasks] Error:", err?.message);
      setToCallHook(false);
    }
  }, [userToken]);

  // 6️⃣ Trigger effect
  useEffect(() => {
    if (userToken || trigger) {
      fetchUserAndTasks();
    }
  }, [userToken, trigger]);
};
