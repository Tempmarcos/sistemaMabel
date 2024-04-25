import { useState } from "react"
import styles from './sideBar.module.css'



interface ISideBar{
    corElemento: string;
    corTexto: string;
}

export default function SideBar({corElemento, corTexto} : ISideBar){

    const [displaySidebar, setDisplaySidebar]= useState("none");
    const [displayFinanceiro, setDisplayFinanceiro]= useState("none");
    const [posicaoSeta, setPosicaoSeta] = useState('Financeiro ▼');

    function handleSwitchSidebar(){
        displaySidebar == 'flex' ? setDisplaySidebar('none') : setDisplaySidebar('flex');
    }

    function handleSwitchFinanceiro(){
        displayFinanceiro == 'flex' ? setDisplayFinanceiro('none') : setDisplayFinanceiro('flex');
        posicaoSeta === 'Financeiro ▼' ? setPosicaoSeta('Financeiro ▲') : setPosicaoSeta('Financeiro ▼')
    }

    return (
        <div className={styles.sidebar}>
           <div className={styles.modalSide} 
           style={{display: displaySidebar, backgroundColor: corElemento, color: corTexto}}>
            <a href="/alunos">Alunos</a>
            <a href="/turmas">Turmas</a>
            <div>
            <a onClick={handleSwitchFinanceiro}>{posicaoSeta}</a>
                <div style={{display: displayFinanceiro}} className={styles.listaFinanceiro}>
                    <a href="/financeiro/fechamento">-Fechamento</a>
                    <a href="/financeiro/planos">-Planos</a>
                    <a href="/financeiro/taxas">-Taxas</a>
                    {/* <a href="/financeiro/atividades">-Atividades</a> */}
                </div>
            </div>
            <a href="/admin">Administração</a>
            <div className={styles.divModal}>
            <a href="/config">Configurações</a>
            <a href="../">Sair</a>
            </div>
           </div>
           <a className={styles.botao} onClick={handleSwitchSidebar}>
             <h1>☰</h1>
          </a>
        </div>
    )
}