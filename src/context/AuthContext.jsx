import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveLoginData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoginData(decoded);
      } catch (error) {
        console.log("Invalid token");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    saveLoginData();
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, loading, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}
