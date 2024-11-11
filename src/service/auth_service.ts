import { InterfaceLogin } from "../interface/interfaceLogin";
import { message } from "antd";
import { api } from "../api";

export const login = async (login: InterfaceLogin) => {
  try {
    const res = await api.post(`/auth/login`, login);

    localStorage.setItem("access_token", res.data.access_token);
    message.success("Login realizado com sucesso!");

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message);

      throw new Error(error.response.data.message);
    } else {
      message.error("Falha ao realizar login. Verifique suas credenciais.");

      throw new Error("Falha ao realizar login.");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");

  window.location.href = "/";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export const getUsuarioLogado = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  try {
    const response = await api.get("/auth/usuario/logado", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        "Erro ao obter dados do usuário:",
        response.status,
        response.data
      );
      return null;
    }
  } catch (error) {
    console.error("Erro na requisição getUsuarioLogado:", error);
    return null;
  }
};
