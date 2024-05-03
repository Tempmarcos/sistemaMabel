'use client'
import styles from './page.module.css'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import { useForm, SubmitHandler } from "react-hook-form"
import { getPlanos, deletePlano, createPlano, editPlano } from '@/http/services/planos/functions'
import { useCallback, useEffect, useState } from 'react';
import { errorHandler } from '@/http/errorHandler';
import { axiosInstance } from '@/http/config/axiosConfig';
import SideBar from '@/app/components/sideBar/sideBar';



type PlanoData = {
    id : string;
    nome : string;
    valor : number;
}

type InputData = {
    nome : string;
    valor : string | number | any;
}

// type ArrayBotaoEditar = {
//     id : string;
//     desativado : boolean;
// }


export default function Home() {
    const [planos, setPlanos] = useState<PlanoData[]>([] as PlanoData[]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [campoPlano, setCampoPlano] = useState(false);

    // const [isBotaoEditarAtivo, setIsBotaoEditarAtivo] = useState<boolean[]>([]);
    // const [isBotaoEditarAtivo, setIsBotaoEditarAtivo] = useState(true);
    // const [isBotaoEditarAtivo, setIsBotaoEditarAtivo] = useState<boolean[]>([]);
    const [isEditando, setIsEditando] = useState(false);


    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data : PlanoData[] = await getPlanos();
            setPlanos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    function criarCampoPlano() {
       if(campoPlano === true){
       return (
        <form style={{marginLeft: '55px'}} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('nome')}/>
            <input type="number" {...register('valor')} />
            <button type="submit" disabled={isSubmitting}>Enviar</button>
        </form>
       )
       }
    }


    
    // function handleFormChange(index : number){
    //     alert(JSON.stringify(isBotaoEditarAtivo, null, 2));
    //     alert(index);
    //     // let array = isBotaoEditarAtivo.splice(index, 1, false);
        
    //     setIsBotaoEditarAtivo(prev => prev.splice(index, 1, false));
    // }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InputData>()

    async function handleDeletePlano(id: string) {
        setIsDeleting(true);
        try{
            const resposta = await axiosInstance.delete(`/planos/${id}`);
            // const resposta = await deletePlano(id);
            //alert(JSON.stringify(resposta,null, 2));
            fetchData();
        }catch(error) {
            console.log(error);
        }finally {
            setIsDeleting(false);
        }
    }

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        try {
            data.valor = parseInt(data.valor);
            // alert(JSON.stringify(data, null, 2));
            const resposta = await axiosInstance.post(`/planos`, data);
            fetchData();
            reset ({
                nome : '',
                 valor : ''
                 })
            setCampoPlano(false);
        } catch (error) {
                errorHandler(error)
        }
    }
    


    async function enviarDadosEditar(index : number, planoId : string) {

        let inputNome = document.getElementById(`nome${index}`) as HTMLInputElement;
        let nome = inputNome.value;
        let inputValor = document.getElementById(`valor${index}`) as HTMLInputElement;
        let valor = parseInt(inputValor.value);

        const plano = {
            id : planoId,
            nome,
            valor
        }
        try {
            const resposta = await axiosInstance.put(`/planos`, plano);
            //fetchData();
        } catch (error) {
            console.log(error);
            alert('oi')

        }
    }

    return (
        <main>
            <SideBar corElemento={'orange'} corTexto={'white'}/>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                {/* <LinkButton texto="Atividades" link="financeiro/atividades" /> */}
            </Header>
            <form style={{display: 'none'}} onSubmit={handleSubmit(onSubmit)}>

            </form>
            <section className={styles.tabela}>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <h1>Nome</h1>
                        <h1>Valor</h1>
                    </div>
                    {isLoading && planos.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && planos.length === 0 && <p>Adicione um plano</p>}
                    {planos.map((plano, index) => {
                        
                        return (
                            <form key={plano.id}>
                                <button disabled={isDeleting} onClick={() => handleDeletePlano(plano.id)}>Excluir</button>
                                <input id={`nome${index}`} type="text" defaultValue={plano.nome} />
                                <input id={`valor${index}`} type='number' defaultValue={plano.valor} />
                                <button onClick={() => enviarDadosEditar(index, plano.id)} 
                                disabled={isSubmitting}>Editar</button>
                            </form>
                    )})}
                    {criarCampoPlano()}
                    <button onClick={() => setCampoPlano(true)}>Adicionar plano</button>
                </div>
            </section>
        </main>
    )
}