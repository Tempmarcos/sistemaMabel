import styles from './alunocard.module.css'

interface AlunoCardProps {
    id: string;
    nome: string;
    turno: string;
    turma: string;
}

export default function AlunoCard({id, nome, turno, turma} : AlunoCardProps){

    let background;

    if(turno === "MANHA") { 
        background = '#00ffff';
    } else if(turno === 'TARDE') {
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