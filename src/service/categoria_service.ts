import { api } from "../api";

export const criarCategoria = async (categoriaData: any) => {
  try {
    const response = await api.post("/categoria/registro", categoriaData); 
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao criar categoria."
    ); 
  }
};

export const procurarTodosCategorias = async () => {
  try {
    const response = await api.get("/categoria"); 
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar categorias."
    );
  }
};

export const procurarUmaCategoria = async (id: number) => {
  try {
    const response = await api.get(`/categoria/${id}`); 
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar categoria."
    );
  }
};

export const atualizarCategoria = async (id: number, categoriaData: any) => {
  try {
    const response = await api.patch(`/categoria/${id}`, categoriaData); 
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar categoria."
    );
  }
};

export const removerCategoria = async (id: number) => {
  try {
    const response = await api.delete(`/categoria/${id}`); 
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover categoria."
    );
  }
};
