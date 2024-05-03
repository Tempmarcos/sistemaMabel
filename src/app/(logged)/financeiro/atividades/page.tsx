'use client'
import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";
import SideBar from "@/app/components/sideBar/sideBar";

export default function Home() {
    return (
        <main>
             <SideBar corElemento={'orange'} corTexto={'white'}/>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Taxas" link="financeiro/taxas" />
                <LinkButton texto="Atividades" link="financeiro/atividades" />
            </Header>

            
        </main>
    )
}