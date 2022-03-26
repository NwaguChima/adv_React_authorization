import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  auth: any;
  persist: boolean;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  setPersist: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<any>();
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist")!) || false
  );

  console.log("xxxx", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
