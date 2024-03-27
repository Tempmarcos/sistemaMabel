import { axiosInstance } from "@/http/config/axiosConfig";

export async function getUsers() {
    const resposta = await axiosInstance.get('/users');
    return resposta.data;
  }

export async function getUser(id : string) {
    const resposta = await axiosInstance.get(`/users/${id}`);
    return resposta.data;
}

//⁝

export async function deleteUser(id : string) {
    const resposta = await axiosInstance.delete(`/users/${id}`);
    return resposta.data;
}