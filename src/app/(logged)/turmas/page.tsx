'use client'
import styles from './page.module.css'
import TurmaCard from "@/app/components/cards/TurmaCard/TurmaCard"
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar"
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import Modal from "@/app/components/cards/Modal/Modal"
import { useCallback, useEffect, useState } from "react"
import { getProfs, deleteTurma, getTurma, getTurmas, ajustaTurmaAPI } from '@/http/services/turmas/functions'
import { errorHandler } from '@/http/errorHandler'
import SideBar from '@/app/components/sideBar/sideBar'


type InputData = {
    nome : string;
    prof : object[];
    turno : string;
    faixa : string;
}

export type FormData = {
    id : string;
    nome : string;
    prof : {id : string}[];
    turno : string;
    faixa : string;
}

type APIGetData = {
    id : string;
    nome : string;
    prof : PROFDAta[];
    turno : string;
    faixa : string;
    alunos : PROFDAta[];
}
type APIListData = {
    id : string;
    nome : string;
    prof : PROFDAta[];
    turno : string;
    faixa : string;
}
                
type PROFDAta = {
    id : string;
    nome : string;
}

export default function Home(){
    const [displayModal, setDisplayModal] = useState("none");

    const [turmas, setTurmas] = useState<APIListData[]>([] as APIListData[]);
    const [profs, setProfs] = useState<PROFDAta[]>([] as PROFDAta[]);


    const [selectedTurma, setSelectedTurma] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data : APIListData[] = await getTurmas();
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

    async function handleGetTurma(turma : APIListData) {
        // alert(JSON.stringify(turma.prof, null, 2));
    
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
            console.log(error);
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
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if(selectedTurma){
            const dadosAPI = ajustaTurmaAPI(data);
            // alert(JSON.stringify(dadosAPI, null, 2));
            try {
                const resposta = await axiosInstance.put(`/turmas`, dadosAPI);
                fetchData();
            } catch (error) {
                errorHandler(error);
            } finally {
                handleXDisplay();
                setSelectedTurma('');
            }
        }else {
            try {
                // alert(JSON.stringify(data, null, 2));
                //CRIAR FUNÇÃO PARA TRANSFORMAR O ARRAY DE PROFS EM ARRAY DE OBJETOS
                const dadosAPI = ajustaTurmaAPI(data);
                
                const resposta = await axiosInstance.post('/turmas', dadosAPI);
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
        <SideBar corElemento={'orange'} corTexto={'white'}/>
            {isLoading && turmas.length === 0 && <p>Carregando...</p>} 
            {!isLoading && turmas.length === 0 && <p>Para criar uma turma, clique no botão ali embaixo!</p>}
            {!isLoading && turmas.map(turma => {
                return <a className={styles.card} key={turma.id} onClick={() => handleGetTurma(turma)}>
                            <TurmaCard id={turma.id} nome={turma.nome} key={turma.id}
                            faixa={turma.faixa} prof={turma.prof} turno={turma.turno} />
                        </a>
            })}

            <Modal onClick={handleXDisplay} display={displayModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {aparecerBotaoDeletar()}
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input id='nome' {...register("nome", { required: true })} />
                </div>
                <div>
                    <label htmlFor="prof">Professores:</label>
                    <select multiple id="prof" {...register("prof")}>
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
                <input type="submit" disabled={isSubmitting}/>
            </form>
            </Modal>
            <a onClick={handleOpenModal}><BtnAdicionar title="Adicionar turma" corElemento="orange" corTexto="black"/></a>
        </main>
    )
}