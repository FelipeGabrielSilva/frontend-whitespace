import { api } from "../api";

export const procurarTodosClientes = async () => {
  try {
    const response = await api.get("/cliente"); // Rota correta: /cliente
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar clientes."
    );
  }
};
