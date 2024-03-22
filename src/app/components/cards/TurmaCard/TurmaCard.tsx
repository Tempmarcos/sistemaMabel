import styles from './turmacard.module.css'

interface TurmaCardProps {
    id: string;
    nome: string;
    prof: string;
    turno: string;
    faixa: string;
}


export default function TurmaCard({ id, nome, prof, turno, faixa} : TurmaCardProps){
    let background;
    if(turno == 'MANHA') {
        background = '#00ffff';
    } else if (turno == 'TARDE'){
        background = '#ffa500';
    } else {
        background = 'gray';
    }


    return (
        <div className={styles.card} style={{backgroundColor: background}}>
            <h1>{nome}</h1>
            <h2>{prof}</h2>
            <h3>{turno}</h3>
            <h3>{faixa}</h3>
        </div>
    )
}