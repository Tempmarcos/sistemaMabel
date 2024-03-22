'use client'
import styles from './page.module.css'
import TurmaCard from "@/app/components/cards/TurmaCard/TurmaCard"
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar"
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import Modal from "@/app/components/cards/Modal/Modal"
import { useCallback, useEffect, useState } from "react"
import { errorHandler } from '@/http/errorHandler'


type InputData = {
    nome : string;
    prof : string[];
    turno : string;
    faixa : string;
}

type APIData = {
    id : string;
    nome : string;
    
    turno : string;
    faixa : string;
}
                
type PROFDAta = {
    id : string;
    nome : string;
}

export default function Home(){
    const [displayModal, setDisplayModal] = useState("none");

    const [turmas, setTurmas] = useState<APIData[]>([] as APIData[]);
    const [profs, setProfs] = useState<PROFDAta[]>([] as PROFDAta[]);

    const [selectedTurma, setSelectedTurma] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getTurmas();;

            setTurmas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    async function getTurmas() {
      const resposta = await axiosInstance.get('/turmas');
      console.log(resposta.data);
      return resposta.data;
    }


    async function getTurma(id : string) {
        const resposta = await axiosInstance.get(`/turmas/${id}`);
        return resposta.data;
      }

    async function handleGetTurma(id : string) {
        const turma = await getTurma(id);
        handleOpenModal();
        setSelectedTurma(turma.id);
        reset(turma);
    }

    const aparecerBotaoDeletar = () => {
        if(selectedTurma){
            console.log(selectedTurma);
            return <button onClick={() => handleDeleteTurma(selectedTurma)}>Deletar usuário</button>
        }
      }

    async function deleteTurma(id : string) {
        try {
        const resposta = await axiosInstance.delete(`/turmas/${id}`);
        alert(JSON.stringify(resposta.data, null, 2))
        handleXDisplay();
        setSelectedTurma('');
        fetchData();
        return resposta.data;
        } catch(error){
            errorHandler(error);
        }
    }

    async function handleDeleteTurma(id : string) {
        const userDelete = await deleteTurma(id);
      }

    async function getProfs() {
        const resposta = await axiosInstance.get('users/prof');
        return resposta.data;
    }


    function handleXDisplay(){
        setDisplayModal('none');
        reset({
            nome : '',
            prof : [],
            turno : '',
            faixa : '',
        })
        setSelectedTurma('');
    }

    function handleOpenModal() {
        setDisplayModal("flex");
      }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<InputData>()

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        data.prof = [];
        if(selectedTurma){
            try {
                const resposta = await axiosInstance.put(`/turmas`, data);
                fetchData();
            } catch (error) {
                errorHandler(error);
            } finally {
                handleXDisplay();
                setSelectedTurma('');
            }
        }else {
            try {
                const resposta = await axiosInstance.post('/turmas', data);
                fetchData();
            } catch (error) {
                errorHandler(error)
            } finally{
                handleXDisplay()
            }
    }
    } 

    

    return (
        <main className={styles.main}>
            {isLoading && turmas.length === 0 && <p>Carregando...</p>} 
            {!isLoading && turmas.map(turma => {
                return <a className={styles.card} key={turma.id} onClick={() => handleGetTurma(turma.id)}>
                            <TurmaCard id={turma.id} nome={turma.nome} key={turma.id}
                            faixa={turma.faixa} prof='{turma.prof}' turno={turma.turno} />
                        </a>
            })}

            <Modal onClickMin={handleXDisplay} onClick={handleXDisplay} display={displayModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {aparecerBotaoDeletar()}
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input id='nome' {...register("nome", { required: true })} />
                </div>
                <div>
                    <label htmlFor="prof">Professores:</label>
                    <select id="prof" {...register("prof")}>
                        {
                            //criar função para listar os professores
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="turno">Turno:</label>
                    <select id="turno" {...register("turno")}>
                        <option value="MANHA">Manhã</option>
                        <option value="TARDE">Tarde</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="faixa">Faixa:</label>
                    <select id="faixa" {...register("faixa")}>
                        <option value="KIDS">Kids</option>
                        <option value="TEENS">Teens</option>
                    </select>
                </div>
                {errors.nome && <span>This field is required</span>}
                <input type="submit" />
            </form>
            </Modal>
            <a onClick={handleOpenModal}><BtnAdicionar title="Adicionar turma" corElemento="blue" corTexto="white"/></a>
        </main>
    )
}