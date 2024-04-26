"use client"
import { alunos } from "@/mocks/alunos";
import styles from './page.module.css'
import Header from "@/app/components/header/Header";
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import { useCallback, useEffect, useState } from "react";
import { ListMensalResponseType } from "@/http/parses/mensal";
import { axiosInstance } from "@/http/config/axiosConfig";
import dayjs from "dayjs";
// import { mensais } from "@/mocks/mensais";

export default function Home(){
    const [mensais, setMensais] = useState<ListMensalResponseType>([] as ListMensalResponseType);
    const [isLoading, setIsLoading] = useState(true);


    

    const fetchMensais = useCallback(async () => {
        const DATA_CORTE = 20;

        let mesDayjs = dayjs().startOf("month")
        let mes = mesDayjs.toDate()

        const isAfterDay20 = dayjs().date() > DATA_CORTE

        if (!isAfterDay20) {
            mesDayjs = mesDayjs.add(-1, 'month')
            mes = mesDayjs.toDate()
        }

        // alert(JSON.stringify(mes, null, 2));

       let mesString = mes.toString();

        try {
            setIsLoading(true);
            const data = await axiosInstance.get(`/mensais/${mesString}`);
            setMensais(data.data);
            // alert(JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchMensais();
    }, [fetchMensais]);


    function alunoPago(index : number){

    }

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
                <div className={styles.header}>
                        <h3>Nome</h3>
                        <h3>Valor do plano</h3>
                        <h3>Valor diárias</h3>
                        <h3>Valor atrasos</h3>
                        <h3>Valor total</h3>
                    </div>
                    {isLoading && mensais.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && mensais.length === 0 && <p>O fechamento não aconteceu ainda, aguarde até o dia 20.</p>}
                    {mensais.map((mensal, index) => {
                        return ( 
                        <div className={styles.linha}>
                            <input type="text" readOnly value={mensal.aluno.nome} />
                            <input type="number" readOnly value={mensal.aluno.valor} />
                            <input type="number" defaultValue={mensal.diarias} />
                            <input type="number" defaultValue={mensal.atrasos} />
                            {/* <h1>{mensal.extras}</h1> */}
                            <input type="number" defaultValue={mensal.valor_total} />
                            <h6>Pago?</h6><input type="checkbox" onChange={() => alunoPago(index)} checked={mensal.pago}/>
                        </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}