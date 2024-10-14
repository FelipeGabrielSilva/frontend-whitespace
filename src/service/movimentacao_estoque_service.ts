import { api } from "../api";

export const procurarTodosEstoque = async () => {
  try {
    const response = await api.get("/movimentacoes");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar itens do pedido."
    );
  }
};
