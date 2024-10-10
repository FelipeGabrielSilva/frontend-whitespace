import { api } from "../api";

export const criarProduto = async (ProdutoData: any) => {
  try {
    const response = await api.post("/produto/registro", ProdutoData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Erro ao criar produto");
  }
};

export const procurarTodosProdutos = async () => {
  try {
    const response = await api.get("/produto");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao buscar Produtos."
    );
  }
};

export const procurarUmProduto = async (id: number) => {
  try {
    const response = await api.get(`/produto/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Erro ao buscar produto");
  }
};

export const atualizarProduto = async (id: number, ProdutoData: any) => {
  try {
    const response = await api.patch(`/produto/${id}`, ProdutoData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao atualizar Produto"
    );
  }
};

export const removerProduto = async (id: number) => {
  try {
    const response = await api.delete(`/produto/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Erro ao remover produto"
    );
  }
};
