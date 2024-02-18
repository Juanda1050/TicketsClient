import React, { createContext, useContext, useState, ReactNode } from "react";
const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    userId: string | null;
  }>({
    token: null,
    userId: null,
  });

  const login = (token: string, userId: string) => {
    setAuthState({ token, userId });
  };

  const logout = () => {
    setAuthState({ token: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
