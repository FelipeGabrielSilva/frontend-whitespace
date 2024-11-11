import { api } from "../api";

export const criarUsuario = async (userData: any) => {
    try {
        const response = await api.post(`usuario/registro`, userData);

        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao criar usuário.");

    }
};

export const buscarTodosUsuarios = async () => {
    try {
        const response = await api.get(`usuario/`);

        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao buscar usuários.");

    }
};


export const buscarUsuarioPorId = async (id: number) => {
    try {
        const response = await api.get(`usuario/${id}`);

        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao buscar usuário.");

    }
};

export const atualizarUsuario = async (id: number, userData: any) => {
    try {
        const response = await api.patch(`usuario/${id}`, userData);

        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao atualizar usuário.");

    }
};

export const removerUsuario = async (id: number) => {
    try {
        const response = await api.delete(`usuario/${id}`);

        return response.data;

    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao remover usuário.");

    }
};