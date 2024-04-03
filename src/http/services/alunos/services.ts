import { axiosInstance } from "@/http/config/axiosConfig";

export async function getAlunos(){
    const resposta = await axiosInstance.get('/alunos');
    // console.log(resposta.data);
    return resposta.data;
}