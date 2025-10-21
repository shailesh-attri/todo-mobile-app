import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../Navigation/navigationRef";

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setUserToken(token);
          navigate("BottomTabNavigation", { screen: "AllTasks" });
        }
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      setUserToken(token);
      navigate("BottomTabNavigation", { screen: "AllTasks" });
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setUserToken(null);
      navigate("Login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
