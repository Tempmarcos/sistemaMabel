'use client'
import styles from './page.module.css'
import TurmaCard from "@/app/components/cards/TurmaCard/TurmaCard"
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar"
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import Modal from "@/app/components/cards/Modal/Modal"
import { useCallback, useEffect, useState } from "react"


type InputData = {
    nome : string;
    prof : string[];
    turno : string;
    faixa : string;
}

type APIData = {
    id : number;
    nome : string;
    
    turno : string;
    faixa : string;
} 

export default function Home(){
    const [displayModal, setDisplayModal] = useState("none");

    const [turmas, setTurmas] = useState<APIData[]>([] as APIData[]);
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


    function handleXDisplay(){
        setDisplayModal('none');
        reset({
            nome : '',
            prof : [],
            turno : '',
            faixa : '',
        })
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
        alert(JSON.stringify(data, null, 2));
        try {
            const resposta = await axiosInstance.post('/turmas', data);
            console.log(resposta);
            fetchData();
            handleXDisplay();
        } catch (error) {
            if(error instanceof Error) {
            alert(JSON.stringify(error.message, null, 2));
            handleXDisplay();
        }
        }
        
    } 

    

    return (
        <main className={styles.main}>
            {isLoading && turmas.length === 0 && <p>Carregando...</p>} 
            
            {!isLoading && turmas.map(turma => {
                return <TurmaCard id={turma.id} nome={turma.nome} key={turma.id}
                faixa={turma.faixa} prof='{turma.prof}' turno={turma.turno} />
            })}

            <Modal onClick={handleXDisplay} display={displayModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Nome' {...register("nome", { required: true })} />
                <input placeholder='Professor(a)' {...register("prof")} />
                <input placeholder='Turno' {...register("turno")} />
                <input placeholder='Faixa' {...register("faixa")} />
                {errors.nome && <span>This field is required</span>}

                <input type="submit" />
            </form>
            </Modal>
           
            <a onClick={handleOpenModal}><BtnAdicionar title="Adicionar turma" corElemento="blue" corTexto="white"/></a>
        </main>
    )
}