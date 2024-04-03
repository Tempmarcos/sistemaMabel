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


  export function ajustaTurmaAPI(data: any) {
     const arrayArrumado = data.prof.map((item : string) => {
        return {id : item}
      })
      data.prof = arrayArrumado;
      return data;
  }

