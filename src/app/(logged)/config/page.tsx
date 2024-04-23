'use client'
import { temas } from "../temas"

let corElemento= temas.corElemento;
let corTexto= temas.corTexto;
let corFundo= temas.corFundo;


const textoEscolher = document.querySelector('textoEscolher');
textoEscolher?.addEventListener("input", updateTexto, false);
textoEscolher?.addEventListener("change", updateTextoSubmit, false);

function updateTexto(event : any){
    temas.corTexto = event.target.value;
}

function updateTextoSubmit(event : any){
    temas.corTexto = event.target.value;
}

export default function Home(){
    return (
        <main style={{minHeight: '100vh', minWidth: '100vw', 
        display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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