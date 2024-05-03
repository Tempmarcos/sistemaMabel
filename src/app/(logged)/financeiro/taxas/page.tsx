'use client'
import styles from './page.module.css'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import SideBar from '@/app/components/sideBar/sideBar';
import { axiosInstance } from '@/http/config/axiosConfig';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';



type TaxaData = {
    id : string;
    nome : string;
    valor : string;
}

type InputData = {
    nome : string;
    valor : string | number | any;
}


export default function Home() {
    const [taxas, setTaxas] = useState<TaxaData[]>([] as TaxaData[]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data : TaxaData[] = await getTaxas();
            setTaxas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    async function getTaxas() {
        const resposta = await axiosInstance.get('/taxas');
        console.log(resposta.data);
        return resposta.data;
    }
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InputData>()


    async function enviarDadosEditar(index : number, taxaId : string) {
        let inputNome = document.getElementById(`nome${index}`) as HTMLInputElement;
        let nome = inputNome.value;
        let inputValor = document.getElementById(`valor${index}`) as HTMLInputElement;
        let valor = parseInt(inputValor.value);

        const taxa = {
            id : taxaId,
            nome,
            valor
        }
        try {
            const resposta = await axiosInstance.put(`/taxas`, taxa);
            //fetchData();
        } catch (error) {
            console.log(error);
            // alert('oi')

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

            <section className={styles.tabela}>
            <div className={styles.table}>
                    <div className={styles.header}>
                        <h1>Nome</h1>
                        <h1>Valor</h1>
                    </div>
                    {isLoading && taxas.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && taxas.length === 0 && <p>Adicione uma taxa</p>}
                    {taxas.map((taxa, index) => {
                        
                        return (
                            <form key={taxa.id}>
                                {/* <button disabled={isDeleting} onClick={() => handleDeletetaxa(taxa.id)}>Excluir</button> */}
                                <input id={`nome${index}`} type="text" defaultValue={taxa.nome} />
                                <input id={`valor${index}`} type='number' defaultValue={taxa.valor} />
                                <button onClick={() => enviarDadosEditar(index, taxa.id)} 
                                disabled={isSubmitting}>Editar</button>
                            </form>
                    )})}
                    {/* {criarCampoPlano()} */}
                    {/* <button onClick={() => setCampoPlano(true)}>Adicionar plano</button> */}
                </div>
            </section>
        </main>
    )
}