import { axiosInstance } from "@/http/config/axiosConfig";

export async function getPlanos() {
    const resposta = await axiosInstance.get('/planos');
    return resposta.data;
}

export async function deletePlano(id : string) {
    const resposta = await axiosInstance.delete(`/planos/${id}`)
    return resposta;
}

export async function createPlano(data : unknown) {
    const resposta = await axiosInstance.post('/planos', data);
    return resposta.data;
}

export async function editPlano(id : string) {
    const resposta = await axiosInstance.put(`/planos/${id}`)
    return resposta.data;
}