'use client'

import SideBar from "@/app/components/sideBar/sideBar"

export default function Home(){
    return (
        <main style={{minHeight: '100vh', minWidth: '100vw', 
        display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <SideBar corElemento={'orange'} corTexto={'white'}/>

            {/* <h1>Escolha dos temas: </h1>
            <label>Cor do texto:</label>
            <input type="color" name="" id="textoEscolher" value={corTexto}/>
            <label>Cor primária:</label>
            <input type="color" name="" id="fundoEscolher" value={corFundo}/>
            <label>Cor secundária:</label>
            <input type="color" name="" id="elementoEscolher" value={corElemento}/> */}

            <h1>As configurações virão na segunda versão :D</h1>
        </main>
    )
}