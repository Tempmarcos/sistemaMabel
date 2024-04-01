'use client'
import styles from './page.module.css'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import { useForm, SubmitHandler } from "react-hook-form"
import { getPlanos, deletePlano, createPlano, editPlano } from '@/http/services/planos/functions'
import { useCallback, useEffect, useState } from 'react';
import { errorHandler } from '@/http/errorHandler';
import { axiosInstance } from '@/http/config/axiosConfig';



type PlanoData = {
    id : string;
    nome : string;
    valor : number;
}

type InputData = {
    nome : string;
    valor : string | number;
}


export default function Home() {
    const [planos, setPlanos] = useState<PlanoData[]>([] as PlanoData[]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [campoPlano, setCampoPlano] = useState(false);
    const [isBotaoEditarAtivo, setIsBotaoEditarAtivo] = useState<boolean[]>([]);

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
            <button type="submit">Enviar</button>
        </form>
       )
       }
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<InputData>()

    async function handleDeletePlano(id: string) {
        setIsDeleting(true);
        try{
            const resposta = await axiosInstance.delete(`/planos/${id}`);
            // const resposta = await deletePlano(id);
            //alert(JSON.stringify(resposta,null, 2));
            fetchData();
        }catch(error) {
            errorHandler(error);
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

    return (
        <main>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                <LinkButton texto="Atividades" link="financeiro/atividades" />
            </Header>

            <section className={styles.tabela}>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <h1>Nome</h1>
                        <h1>Valor</h1>
                    </div>
                    {isLoading && planos.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && planos.length === 0 && <p>Adicione um plano</p>}
                    {planos.map(plano => {return (
                            <form key={plano.id}>
                                <button disabled={isDeleting} onClick={() => handleDeletePlano(plano.id)}>Excluir</button>
                                <input type="text" defaultValue={plano.nome} />
                                <input type='number' defaultValue={plano.valor} />
                                <button disabled>Editar</button>
                            </form>
                    )})}
                    {criarCampoPlano()}
                    <button onClick={() => setCampoPlano(true)}>Adicionar plano</button>
                </div>
            </section>
        </main>
    )
}