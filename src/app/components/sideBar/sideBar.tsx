import { useState } from "react"
import styles from './sideBar.module.css'

export default function SideBar(){

    const [displaySidebar, setDisplaySidebar]= useState("none");

    function handleSwitchSidebar(){
        displaySidebar == 'flex' ? setDisplaySidebar('none') : setDisplaySidebar('flex');
    }

    return (
        <div className={styles.sidebar}>
           <div className={styles.modalSide} style={{display: displaySidebar}}>
            <a href="">Alunos</a>
            <a href="">Financeiro</a>
            <a href="">Administração</a>
            <div className={styles.divModal}>
            <a href="">Configurações</a>
            <a href="">Sair</a>
            </div>
           </div>
           <a className={styles.botao} onClick={handleSwitchSidebar}><img src="" alt="botao" /></a>
        </div>
    )
}