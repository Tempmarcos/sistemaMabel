'use client'
import styles from './page.module.css'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import { useForm, SubmitHandler } from "react-hook-form"
import { getPlanos, deletePlano, createPlano, editPlano } from '@/http/services/planos/functions'
import { useCallback, useEffect, useState } from 'react';
import { errorHandler } from '@/http/errorHandler';



type PlanoData = {
    id : string;
    nome : string;
    valor : string;
}

type InputData = {
    nome : string;
    valor : string;
}


export default function Home() {
    const [planos, setPlanos] = useState<PlanoData[]>([] as PlanoData[]);
    const [isLoading, setIsLoading] = useState(true);
    const [campoPlano, setCampoPlano] = useState(false);

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
       //função para colocar mais um campo para os planos
       if(campoPlano === true)
       return <tr>
        <th></th>
        <th><input type="text" /></th>
        <th><input type="number" name="" id="" /></th>
        <th><button onSubmit={() => handleCriarPlano}>Criar</button></th>
       </tr>
    }

    async function handleCriarPlano(data : unknown) {
        try{
            const criarPlano = await createPlano(data);
        }catch(error) {
            errorHandler(error);
        }
        setCampoPlano(false);
        fetchData();
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<InputData>()

    async function handleDeletePlano(id: string) {
        try{
            await deletePlano(id);
        }catch(error) {
            errorHandler(error);
        }
        fetchData();
    }

    const onSubmit: SubmitHandler<InputData> = async (data) => {
            try {
                createPlano(data);
                fetchData();
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
                
                <table>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                    {isLoading && planos.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && planos.length === 0 && <p>Adicione um plano</p>}
                    {planos.map(plano => {return (
                            <tr>
                                <th><button onClick={() => handleDeletePlano(plano.id)}>Excluir</button></th>
                                <th><input type="text" defaultValue={plano.nome} {...register("nome")}/></th>
                                <th><input type='number' defaultValue={plano.valor} {...register("valor")}/></th>
                                <th><button disabled>Editar</button></th>
                            </tr>
                    )})}
                    {criarCampoPlano()}
                    <tr><th></th><th><button onClick={() => setCampoPlano(true)}>Adicionar plano</button></th></tr>
                </table>
            </section>
        </main>
    )
}