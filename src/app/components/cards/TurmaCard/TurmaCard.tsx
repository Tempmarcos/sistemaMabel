import styles from './turmacard.module.css'

interface TurmaCardProps {
    id: number;
    nome: string;
    prof: string;
    turno: string;
    faixa: string;
}

export default function TurmaCard({ id, nome, prof, turno, faixa} : TurmaCardProps){
    return (
        <div className={styles.card}>
            <h1>{nome}</h1>
            <h2>{prof}</h2>
            <h3>{turno}</h3>
            <h3>{faixa}</h3>
        </div>
    )
}