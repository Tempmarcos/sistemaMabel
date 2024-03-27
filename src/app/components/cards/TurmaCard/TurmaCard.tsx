import styles from './turmacard.module.css'

interface TurmaCardProps {
    id: string;
    nome: string;
    prof: PROFDAta[];
    turno: string;
    faixa: string;
}

type PROFDAta = {
    id : string;
    nome : string;
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
            {prof && prof.map(item => {
                return <h2>{item.nome}</h2>
            })}
            <h3>{turno}</h3>
            <h3>{faixa}</h3>
        </div>
    )
}