import { createContext, useContext, useEffect, useState } from "react";
import { InterfaceLogin } from "../interface/interfaceLogin";
import { getUsuarioLogado, login, logout } from "../service/auth_service";

interface AuthContextType {
  autenticado: boolean;
  usuario: any | null;
  login: (credenciais: InterfaceLogin) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const autenticado = await isAuthenticated();

          if (autenticado) {
            const usuarioData = await getUsuarioLogado();

            if (usuarioData) {
              setAutenticado(true);
              setUsuario(usuarioData);
            } else {
              localStorage.removeItem("access_token");
            }
          } else {
            localStorage.removeItem("access_token");
          }
        } catch (error) {
          console.error("Erro ao verificar autenticação", error);
          localStorage.removeItem("access_token");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [autenticado]);

  const handleLogin = async (credenciais: InterfaceLogin) => {
    try {
      const res = await login(credenciais);

      if (res) {
        setAutenticado(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    setAutenticado(false);
    setUsuario(null);
  };

  const isAuthenticated = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return false;
    }

    try {
      const usuarioData = await getUsuarioLogado();

      if (usuarioData) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação", error);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    autenticado,
    usuario,
    login: handleLogin,
    logout: handleLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
