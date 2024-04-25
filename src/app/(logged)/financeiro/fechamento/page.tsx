"use client"
import { alunos } from "@/mocks/alunos";
import styles from './page.module.css'
import Header from "@/app/components/header/Header";
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import { useCallback, useEffect, useState } from "react";
import { ListMensalResponseType } from "@/http/parses/mensal";
import { axiosInstance } from "@/http/config/axiosConfig";
import { mensais } from "@/mocks/mensais";

export default function Home(){
    // const [mensais, setMensais] = useState<ListMensalResponseType>([] as ListMensalResponseType);
    const [isLoading, setIsLoading] = useState(true);

    // const fetchMensais = useCallback(async () => {
    //     try {
    //         setIsLoading(true);
    //         const data = await axiosInstance.get('/mensais');
    //         setMensais(data.data);
    //         // alert(JSON.stringify(data, null, 2));
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, []);
    // useEffect(() => {
    //     fetchMensais();
    // }, [fetchMensais]);

    return(
        <main>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                {/* <LinkButton texto="Atividades" link="financeiro/atividades" /> */}
            </Header>
            <section className={styles.tabela}>
                <div className={styles.table}>
                    {isLoading && mensais.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && mensais.length === 0 && <p>O fechamento não aconteceu ainda, aguarde até o dia 20.</p>}
                    {mensais.map(mensal => {
                        return ( 
                        <div className={styles.linha}>
                            <h1>{mensal.nome}</h1>
                            <h1>{mensal.valor}</h1>
                            <h1>{mensal.diarias}</h1>
                            <h1>{mensal.atrasos}</h1>
                            <h1>{mensal.extras}</h1>
                            <h1>{mensal.valorTotal}</h1>
                            <input type="checkbox" name="" id="" checked={mensal.pago}/>
                        </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}