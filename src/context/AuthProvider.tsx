import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<any>();

  console.log("xxxx", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
