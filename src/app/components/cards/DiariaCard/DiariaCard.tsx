import { useState } from 'react';
import styles from './diariacard.module.css'

interface IDiariaCard {
    turno? : string;
    data : string;
    onClick : any;
    almoco? : boolean;
    valor? : number;
    descricao? : string;
}

export default function DiariaCard({ turno, data, onClick, almoco, valor, descricao } : IDiariaCard){
    // const [almocoIcone, setAlmocoIcone] = useState('');

    let cor = 'gray';

    if(turno === 'MANHA'){
        cor = 'cyan';
    } else if(turno === 'TARDE') {
        cor = 'orange';
    }
    function textoDoAlmoco(almoco : boolean){
        if(almoco === true){
            return '🍔'
        }else {
            return ''
        }
    }

    function textoValor(valor : number){
        if(valor) {
            return `R$ ${valor}`  
        } else {
            return ''
        }
    }
       
    return (
        <div title={descricao} className={styles.container}>
            <div title={descricao} className={styles.card} style={{border: '3px solid', borderColor: cor}}>
                <h1 style={{color: cor}}>●</h1>
                <h2>{data}</h2>
                {textoValor(valor!)}
                {textoDoAlmoco(almoco!)}
            </div>
            <a onClick={onClick} className={styles.fechar}>✖</a>
        </div>
    )
}