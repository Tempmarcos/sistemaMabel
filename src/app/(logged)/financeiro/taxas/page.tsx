'use client'
import styles from './page.module.css'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import { axiosInstance } from '@/http/config/axiosConfig';
import { useCallback, useEffect, useState } from 'react';



type TaxaData = {
    id : string;
    nome : string;
    valor : string;
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

    return (
        <main>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                {/* <LinkButton texto="Atividades" link="financeiro/atividades" /> */}
            </Header>

            <section className={styles.tabela}>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                    </tr>
                    {taxas.map(taxa => {return <tr>
                        <th><input type="text" defaultValue={taxa.nome} /></th>
                        <th><input type='number' defaultValue={taxa.valor}/></th>
                    </tr>})}
                    <tr><button>Adicionar taxa</button></tr>
                </table>
            </section>
        </main>
    )
}