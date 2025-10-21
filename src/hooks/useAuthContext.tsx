// src/hooks/useAuthContext.ts
import { useContext } from "react";
import { AuthContext } from "./authContext"; // adjust path as needed

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
