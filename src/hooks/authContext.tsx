// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/rootStackParamsTypes";

type TNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setNavigation: (navigation: TNavigationProp) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef<TNavigationProp | null>(null);

  const setNavigation = (navigation: TNavigationProp) => {
    navigationRef.current = navigation;
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setUserToken(token);
          if (navigationRef.current) {
            navigationRef.current.navigate("BottomTabNavigation", { screen: "AllTasks" });
          }
        }
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
    setUserToken(token);
    if (navigationRef.current) {
      navigationRef.current.navigate("BottomTabNavigation", { screen: "AllTasks" });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setUserToken(null);
    if (navigationRef.current) {
      navigationRef.current.navigate("Login");
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout, setNavigation }}>
      {children}
    </AuthContext.Provider>
  );
};