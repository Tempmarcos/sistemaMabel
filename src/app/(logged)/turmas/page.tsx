'use client'
import styles from './page.module.css'
import TurmaCard from "@/app/components/cards/TurmaCard/TurmaCard"
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar"
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import Modal from "@/app/components/cards/Modal/Modal"
import { useCallback, useEffect, useState } from "react"
import { getProfs, deleteTurma, getTurma, getTurmas } from '@/http/services/turmas/functions'
import { errorHandler } from '@/http/errorHandler'


type InputData = {
    nome : string;
    prof : object[];
    turno : string;
    faixa : string;
}

type APIData = {
    id : string;
    nome : string;
    prof : PROFDAta[];
    turno : string;
    faixa : string;
    alunos : PROFDAta[];
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
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data : APIData[] = await getTurmas();
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

    const fetchProfs = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getProfs();;
            setProfs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchProfs();
    }, [fetchProfs]);

    async function handleGetTurma(id : string) {
        const turma = await getTurma(id);
        delete turma.alunos;
    
        handleOpenModal();
        setSelectedTurma(turma.id);
        reset(turma);
    }

    const aparecerBotaoDeletar = () => {
        if(selectedTurma){
            return <button className={styles.deletar} onClick={() => handleDeleteTurma(selectedTurma)}>Deletar turma</button>
        }
      }

    async function handleDeleteTurma(id : string) {
        try{
            const turmaDelete = await deleteTurma(id);
        } catch(error){
            errorHandler(error);
        }
        handleXDisplay();
        setSelectedTurma('');
        fetchData();
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
        if(selectedTurma){
            let arrayProf = [];
            arrayProf.push({id: data.prof});
            data.prof = arrayProf;
           alert(JSON.stringify(data, null, 2));
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
                alert(JSON.stringify(data, null, 2));
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
            {!isLoading && turmas.length === 0 && <p>Para criar uma turma, clique no botão ali embaixo!</p>}
            {!isLoading && turmas.map(turma => {
                return <a className={styles.card} key={turma.id} onClick={() => handleGetTurma(turma.id)}>
                            <TurmaCard id={turma.id} nome={turma.nome} key={turma.id}
                            faixa={turma.faixa} prof={turma.prof} turno={turma.turno} />
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
                            //função para listar os professores
                            profs.map(prof => {return <option key={prof.id} value={prof.id}>{prof.nome}</option>})
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