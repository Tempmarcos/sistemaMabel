import styles from './styles.module.css'

interface AlunoCardProps {
    id: number;
    nome: string;
    turno: string;
    turma: string;
}

export default function AlunoCard({nome, turno, turma} : AlunoCardProps){

    let background;

    if(turno === "manha") { 
        background = '#00ffff';
    } else if(turno === 'tarde') {
        background = '#ffa500';
    } else {
        background = 'gray';
    }


    return (
        <div className={styles.card} style={{backgroundColor: background}}>
           {nome}<br />
           {turma}
        </div>
    );
}