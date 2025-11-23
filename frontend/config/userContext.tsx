"use client";

import { useUser } from "@/backend/user/user.query";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const { data } = useUser();

  useEffect(() => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token && data?.user) {
        if (user !== data.user) setUser(data.user);
      }
    } catch (err) {
      console.warn("Failed to access localStorage", err);
    }
  }, [data]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
