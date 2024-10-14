import { api } from "../api";

export const procurarTodosItensPedidos = async () => {
  try {
    const response = await api.get("/item-produto");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar itens do pedido."
    );
  }
};
