"use client"
import { alunos } from "@/mocks/alunos";
import styles from './page.module.css'
import Header from "@/app/components/header/Header";
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";

export default function Home(){
    return(
        <main>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Atividades" link="financeiro/atividades" />
            </Header>
            <header className={styles.header}> 
                <h3>Não pagou</h3> <input type="checkbox" name="" id="" />

            </header>
            <table className={styles.table}>
                <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                </tr>
                {alunos.map(aluno => {return <tr>
                    <th>{aluno.id}</th>
                    <th>{aluno.nome}</th>
                    <th>{aluno.email}</th>
                    <th>{aluno.CPF}</th>
                </tr>
                })}
            </table>
        </main>
    )
}