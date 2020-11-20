import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext
} from "react";
import { login } from "../services/fitway-api";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loginUser() {
    try {
      setIsLoading(true);
      const res = await login();
      setUser(res);
    } catch (e) {
      console.log("Not logged ");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loginUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading
    }),
    [user, isLoading]
  );

  return <UserContext.Provider value={value} {...props} />;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser, must be inside UserContext ");
  }
  return context;
}
