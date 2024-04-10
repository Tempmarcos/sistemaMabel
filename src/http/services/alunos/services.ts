import { axiosInstance } from "@/http/config/axiosConfig";
import { CreateAlunoRequestType } from "@/http/parses/aluno";

export async function getAlunos(){
    const resposta = await axiosInstance.get('/alunos');
    // console.log(resposta.data);
    return resposta.data;
}

export async function createAluno(data : CreateAlunoRequestType){
    const resposta = await axiosInstance.post('/alunos', data);
    // console.log(resposta.data);
    return resposta.data;
}