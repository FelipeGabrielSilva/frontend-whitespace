import { api } from "../api";

export const criarCliente = async (ClienteData: any) => {
  try {
    const response = await api.post("/cliente/registro", ClienteData);
    return response.data;
  } catch (error: any) {
    //console.error("Erro ao criar Cliente:", error);
    throw new Error(error?.response?.data?.message || "Erro ao criar cliente");
  }
};

export const procurarTodosClientes = async () => {
  try {
    const response = await api.get("/cliente");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar Clientes."
    );
  }
};

export const procurarUmaCliente = async (id: number) => {
  try {
    const response = await api.get(`/cliente/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Erro ao buscar cliente");
  }
};

export const atualizarCliente = async (id: number, ClienteData: any) => {
  try {
    const response = await api.patch(`/cliente/${id}`, ClienteData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar cliente"
    );
  }
};

export const removerCliente = async (id: number) => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover cliente"
    );
  }
};
