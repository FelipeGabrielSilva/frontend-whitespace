import { api } from "../api";

export const criarPedido = async (PedidoData: any) => {
  try {
    const response = await api.post("/pedido/registro", PedidoData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Erro ao criar pedido.");
  }
};

export const procurarTodosPedidos = async () => {
  try {
    const response = await api.get("/pedido");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar Pedidos."
    );
  }
};

export const procurarUmaPedido = async (id: number) => {
  try {
    const response = await api.get(`/pedido/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Erro ao buscar pedido.");
  }
};

export const atualizarPedido = async (id: number, PedidoData: any) => {
  try {
    const response = await api.patch(`/pedido/${id}`, PedidoData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar Pedido"
    );
  }
};

export const removerPedido = async (id: number) => {
  try {
    const response = await api.delete(`/pedido/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover pedido."
    );
  }
};
