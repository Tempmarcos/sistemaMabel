"use client"
import { alunos } from "@/mocks/alunos";
import styles from './page.module.css'
import Header from "@/app/components/header/Header";
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import { useCallback, useEffect, useState } from "react";
import { ListMensalResponseType } from "@/http/parses/mensal";
import { axiosInstance } from "@/http/config/axiosConfig";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import { useForm } from "react-hook-form";
import SideBar from "@/app/components/sideBar/sideBar";
// import { mensais } from "@/mocks/mensais";


type MensalData = any;


export default function Home(){
    const [mensais, setMensais] = useState<ListMensalResponseType>([] as ListMensalResponseType);
    const [corLinha, setCorLinha] = useState<string[]>(new Array(mensais.length).fill(''));
    const [isLoading, setIsLoading] = useState(true);
    const [mesString, setMesString] = useState('');

    const fetchMensais = useCallback(async (mesEscolhido : string) => {
        try {
            // alert(mesEscolhido)
            setIsLoading(true);
            // alert(dayjs(mesString).locale('pt-br').format('MMMM-YY'))
            const data = await axiosInstance.get(`/mensais/${mesEscolhido}`);
            setMensais(data.data);
            // alert(JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        let mesInicial;
        if(!mesString){
            const DATA_CORTE = 20;
            dayjs.extend(utc);
            let mesDayjs = dayjs().startOf("month")
            let mes = mesDayjs.format('YYYY-MM-DDTHH:mm:ss[Z]')
            // alert(mes)
            const isAfterDay20 = dayjs().date() > DATA_CORTE
            if (!isAfterDay20) {
                mesDayjs = mesDayjs.add(-1, 'month')
                mes = mesDayjs.format('YYYY-MM-DDTHH:mm:ss[Z]')
            }
            mesInicial = mes.toString();
            setMesString(mesInicial);
            fetchMensais(mesInicial);

        }
        fetchMensais(mesString);
        //  alert(JSON.stringify(mensais))
    }, [fetchMensais, mesString]);

    
    function fetchMesAnterior(){
        setMesString((prev) => dayjs(prev).add(-1, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]'));
        const arrayCores = new Array(mensais.length).fill('');
        setCorLinha(arrayCores);
    }

    function fetchProximoMes(){
        setMesString(dayjs(mesString).add(1, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]'));
        const arrayCores = new Array(mensais.length).fill('');
        setCorLinha(arrayCores);
    }


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MensalData>()

    function alunoPago(index : number){

    }

    async function enviarDadosEditar(index : number, mensalId : string) {
        let inputDiarias = document.getElementById(`diarias${index}`) as HTMLInputElement;
        let diarias = parseInt(inputDiarias.value);
        let inputAtrasos = document.getElementById(`atrasos${index}`) as HTMLInputElement;
        let atrasos = parseInt(inputAtrasos.value);
        let inputExtras = document.getElementById(`ajuste${index}`) as HTMLInputElement;
        let extras = parseInt(inputExtras.value);
        let inputValor = document.getElementById(`valor${index}`) as HTMLInputElement;
        let valor_total = parseInt(inputValor.value);
        let inputPago = document.getElementById(`pago${index}`) as HTMLInputElement;
        let pago = inputPago.checked;

        const mensal = {
            id : mensalId,
            diarias,
            atrasos,
            extras,
            valor_total,
            pago
        }
        //alert(JSON.stringify(mensal, null, 2));
        try {
            const resposta = await axiosInstance.put(`/mensais`, mensal);
            //fetchData();
            const novaCor = [...corLinha];
            novaCor[index] = '#a3d9b3';
            setCorLinha(novaCor);
        } catch (error) {
            console.log(error);
            //alert('oi')

        }
    }

    function recalcularMensal(index : number){
        // alert('mudança')
        let inputPlano = document.getElementById(`plano${index}`) as HTMLInputElement;
        let plano = parseInt(inputPlano.value);
        let inputDiarias = document.getElementById(`diarias${index}`) as HTMLInputElement;
        let diarias = parseInt(inputDiarias.value);
        let inputAtrasos = document.getElementById(`atrasos${index}`) as HTMLInputElement;
        let atrasos = parseInt(inputAtrasos.value);
        let inputAjuste = document.getElementById(`ajuste${index}`) as HTMLInputElement;
        let ajuste = parseInt(inputAjuste.value);
        let inputValor = document.getElementById(`valor${index}`) as HTMLInputElement;
        

        let valorTotal = plano + diarias + atrasos + ajuste;
        inputValor.value = valorTotal.toString();

        const novaCor = [...corLinha];
        novaCor[index] = '#d9a3a3';
        setCorLinha(novaCor);
        // let linha = document.getElementById(`atrasos${index}`) as HTMLElement;
        // linha
    }

    return(
        <main>
            <SideBar corElemento={'orange'} corTexto={'white'}/>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                {/* <LinkButton texto="Atividades" link="financeiro/atividades" /> */}
            </Header>
            <section className={styles.tabela}>
                <a onClick={fetchMesAnterior}
                style={{position: 'absolute', top: '75px', left: '20px'}}>Mês anterior</a>
                <a onClick={fetchProximoMes} 
                style={{position: 'absolute', top: '75px', right: '20px'}}>Próximo mês</a>
                <h1>21 {dayjs(mesString).locale('pt-br').format('MMMM')} - 20 {dayjs(mesString).add(1, "month").locale('pt-br').format('MMMM-YY')}</h1>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <h4 style={{marginRight: '80px'}}>Nome</h4>
                        <h4>Plano</h4>
                        <h4>Diárias</h4>
                        <h4>Atrasos</h4>
                        <h4>Ajuste</h4>
                        <h4 style={{marginRight: '100px'}}>Total</h4>
                    </div>
                    {isLoading && mensais.length === 0 && <p>Carregando...</p>} 
                    {!isLoading && mensais.length === 0 && <p>O fechamento não aconteceu ainda, aguarde até o dia 20.</p>}
                    {mensais.map((mensal, index) => {
                        
                        return ( 
                        <div key={mensal.id} id={`linha${index}`} onChange={() => recalcularMensal(index)} 
                        style={{backgroundColor: corLinha[index]}} className={styles.linha}>
                            <input type="text" readOnly value={mensal.aluno.nome} />
                            {/* COLOCAR INFORMAÇÕES DO RESPONSÁVEL FINANCEIRO */}
                            <input id={`plano${index}`} type="number" readOnly value={mensal.aluno.valor} />
                            <input id={`diarias${index}`} type="number" defaultValue={mensal.diarias} />
                            <input id={`atrasos${index}`} type="number" defaultValue={mensal.atrasos} />
                            <input id={`ajuste${index}`} type="number" defaultValue={mensal.extras} />
                            <input id={`valor${index}`} readOnly type="number" defaultValue={mensal.valor_total} />
                            <h6>Pago?</h6><input type="checkbox" id={`pago${index}`} onChange={() => alunoPago(index)} defaultChecked={mensal.pago} />
                            <button onClick={() => enviarDadosEditar(index, mensal.id)} 
                                disabled={isSubmitting}>Editar</button>
                        </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}