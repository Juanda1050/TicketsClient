import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    usuarioId: string;
  }>(() => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId") || "";
    return { token, usuarioId };
  });

  const login = (token: string, usuarioId: string) => {
    setAuthState({ token, usuarioId });
    localStorage.setItem("token", token);
    localStorage.setItem("usuarioId", usuarioId);
  };

  const logout = () => {
    setAuthState({ token: null, usuarioId: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");
    if (token && usuarioId) {
      setAuthState({ token, usuarioId });
    }
  }, []);

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
