import styles from './diariacard.module.css'

interface IDiariaCard {
    turno : string;
    data : string;
}

export default function DiariaCard({ turno, data } : IDiariaCard){

    let cor = 'gray';

    if(turno === 'MANHA'){
        cor = 'cyan';
    } else if(turno === 'TARDE') {
        cor = 'orange';
    }

    return (
        <div className={styles.card} style={{border: '3px solid', borderColor: cor}}>
            <h1 style={{color: cor}}>●</h1>
            <h2>{data}</h2>
        </div>
    )
}