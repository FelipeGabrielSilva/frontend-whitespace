import { api } from "../api";

export const criarFornecedor = async (fornecedorData: any) => {
  try {
    const response = await api.post("fornecedor/registro", fornecedorData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao criar fornecedor."
    );
  }
};

export const procurarTodosFornecedores = async () => {
  try {
    const response = await api.get("/fornecedor");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar fornecedors."
    );
  }
};

export const procurarUmaFornecedor = async (id: number) => {
  try {
    const response = await api.get(`/fornecedor/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar fornecedor."
    );
  }
};

export const atualizarFornecedor = async (id: number, fornecedorData: any) => {
  try {
    const response = await api.patch(`/fornecedor/${id}`, fornecedorData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar fornecedor."
    );
  }
};

export const removerFornecedor = async (id: number) => {
  try {
    const response = await api.delete(`/fornecedor/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover fornecedor."
    );
  }
};
