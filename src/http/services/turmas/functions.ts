import { axiosInstance } from "@/http/config/axiosConfig";

export async function getProfs() {
    const resposta = await axiosInstance.get('users/prof');
    return resposta.data;
}

export async function deleteTurma(id : string) {
    const resposta = await axiosInstance.delete(`/turmas/${id}`);
    return resposta.data;
}

export async function getTurma(id : string) {
    const resposta = await axiosInstance.get(`/turmas/${id}`);
    return resposta.data;
  }

export async function getTurmas() {
    const resposta = await axiosInstance.get('/turmas');
    return resposta.data;
  }