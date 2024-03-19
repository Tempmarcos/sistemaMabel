import { useState } from "react"
import styles from './sideBar.module.css'



interface ISideBar{
    corElemento: string;
    corTexto: string;
}

export default function SideBar({corElemento, corTexto} : ISideBar){

    const [displaySidebar, setDisplaySidebar]= useState("none");

    function handleSwitchSidebar(){
        displaySidebar == 'flex' ? setDisplaySidebar('none') : setDisplaySidebar('flex');
    }

    return (
        <div className={styles.sidebar}>
           <div className={styles.modalSide} 
           style={{display: displaySidebar, backgroundColor: corElemento, color: corTexto}}>
            <a href="/alunos">Alunos</a>
            <a href="/turmas">Turmas</a>
            <a href="/financeiro/fechamento">Financeiro</a>
            <a href="/admin">Administração</a>
            <div className={styles.divModal}>
            <a href="/config">Configurações</a>
            <a href="../">Sair</a>
            </div>
           </div>
           <a className={styles.botao} onClick={handleSwitchSidebar}>
             <img src="" alt="Botão" />
          </a>
        </div>
    )
}