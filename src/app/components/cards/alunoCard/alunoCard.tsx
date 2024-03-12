import styles from './styles.module.css'

interface AlunoCardProps {
    id: number;
    nome: string;
    turno: string;
    turma: string;
}

export default function AlunoCard({nome, turno, turma} : AlunoCardProps){

    let estilo = "";
    if (turno === "manha") { 
        estilo = styles.cardManha
    }else {
        estilo = styles.cardTarde
    }


    return (
        <div className={estilo}>
           {nome}<br />
           {turma}
        </div>
    );
}