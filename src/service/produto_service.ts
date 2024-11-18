import { notification } from "antd";
import { api } from "../api";

export const criarProduto = async (ProdutoData: any) => {
  try {
    const response = await api.post("/produto/registro", ProdutoData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const procurarTodosProdutos = async () => {
  try {
    const response = await api.get("/produto/");

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const procurarUmProduto = async (id: number) => {
  try {
    const response = await api.get(`/produto/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const atualizarProduto = async (id: number, ProdutoData: any) => {
  try {
    const response = await api.patch(`/produto/${id}`, ProdutoData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const removerProduto = async (id: number) => {
  try {
    const response = await api.delete(`/produto/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
