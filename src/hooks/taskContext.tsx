import React, { createContext, useState, ReactNode } from "react";
import { useUserAndTasks } from "./useUserAndTasks";
import { useAuthContext } from "./useAuthContext";

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  [key: string]: any;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

export interface ModalTaskData {
  id?: string;
  visible?: boolean;
  [key: string]: any;
}

interface TaskContextType {
  importantTask: Task[];
  completedTask: Task[];
  userTask: Task[];
  thisUser?: User;
  isModalTaskData: ModalTaskData;

  sendImportantTask: (data: Task[]) => void;
  sendCompletedTask: (data: Task[]) => void;
  sendUserData: (data: User) => void;
  sendTaskData: (data: Task[]) => void;
  sendModalData: (data: ModalTaskData) => void;
  setToCallHook: (data: boolean) => void;
}

interface TaskContextProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
  children,
}) => {
  const { userToken } = useAuthContext();

  const [importantTask, setImportantTask] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [userTask, setUserTask] = useState<Task[]>([]);
  const [thisUser, setThisUser] = useState<User | undefined>();
  const [isModalTaskData, setModalTaskData] = useState<ModalTaskData>({});
  const [toCallHook, setToCallHook] = useState<boolean>(false);

  const sendImportantTask = (data: Task[]) => setImportantTask(data);
  const sendCompletedTask = (data: Task[]) => setCompletedTask(data);
  const sendUserData = (data: User) => setThisUser(data);
  const sendTaskData = (data: Task[]) => setUserTask(data);
  const sendModalData = (data: ModalTaskData) => setModalTaskData(data);

  useUserAndTasks({
    sendImportantTask,
    sendCompletedTask,
    sendUserData,
    sendTaskData,
    sendModalData,
    trigger: toCallHook,
    userToken,
    setToCallHook,
  });

  return (
    <TaskContext.Provider
      value={{
        importantTask,
        completedTask,
        userTask,
        thisUser,
        isModalTaskData,
        sendImportantTask,
        sendCompletedTask,
        sendUserData,
        sendTaskData,
        sendModalData,
        setToCallHook,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
