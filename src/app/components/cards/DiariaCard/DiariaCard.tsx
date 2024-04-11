import styles from './diariacard.module.css'

interface IDiariaCard {
    turno? : string;
    data : string;
    onClick : any;
}

export default function DiariaCard({ turno, data, onClick } : IDiariaCard){

    let cor = 'gray';

    if(turno === 'MANHA'){
        cor = 'cyan';
    } else if(turno === 'TARDE') {
        cor = 'orange';
    }

    return (
        <div className={styles.container}>
            <div className={styles.card} style={{border: '3px solid', borderColor: cor}}>
                <h1 style={{color: cor}}>●</h1>
                <h2>{data}</h2>

            </div>
            <a onClick={onClick} className={styles.fechar}>✖</a>
        </div>
    )
}