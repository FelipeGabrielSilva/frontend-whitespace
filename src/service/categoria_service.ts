import { api } from "../api";

export const criarCategoria = async (categoriaData: any) => {
  try {
    const response = await api.post("/categoria/registro", categoriaData); // Rota correta: /categoria/registro
    return response.data;
  } catch (error: any) {
    //console.error("Erro ao criar categoria:", error);
    throw new Error(
      error?.response?.data?.message || "Erro ao criar categoria."
    ); // mensagem mais descritiva
  }
};

export const procurarTodosCategorias = async () => {
  try {
    const response = await api.get("/categoria"); // Rota correta: /categoria
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar categorias."
    );
  }
};

export const procurarUmaCategoria = async (id: number) => {
  try {
    const response = await api.get(`/categoria/${id}`); // Rota correta: /categoria/:id
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar categoria."
    );
  }
};

export const atualizarCategoria = async (id: number, categoriaData: any) => {
  try {
    const response = await api.patch(`/categoria/${id}`, categoriaData); // Rota correta: /categoria/:id
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar categoria."
    );
  }
};

export const removerCategoria = async (id: number) => {
  try {
    const response = await api.delete(`/categoria/${id}`); // Rota correta: /categoria/:id
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover categoria."
    );
  }
};
