import LinkButton from "@/app/components/botoes/LinkButton/LinkButton";
import Header from "@/app/components/header/Header";

export default function Home() {
    return (
        <main>
            <Header>
                <LinkButton texto="Fechamento" link="financeiro/fechamento" />
                <LinkButton texto="Planos" link="financeiro/planos" />
                <LinkButton texto="Atividades" link="financeiro/atividades" />
            </Header>

            
        </main>
    )
}