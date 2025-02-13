import styles from './alunocard.module.css'

interface AlunoCardProps {
    id: string;
    nome: string;
    turno: string;
    turma: string;
    dias?: boolean[] | null;
    ativo: boolean;
}

export default function AlunoCard({id, nome, turno, turma, dias, ativo} : AlunoCardProps){

    let background;

    if(turno === "MANHA") { 
        background = '#00ffff';
    } else if(turno === 'TARDE') {
        background = '#ffa500';
    } else {
        background = 'gray';
    }

    if(ativo === false){
        background = 'gray'
    }

    return (
        <div className={styles.card} style={{backgroundColor: background}}>
                <div className={styles.container}>
                    <span>
                        <em className={dias![0] ? styles.ativo : styles.inativo}>S</em> 
                        <em className={dias![1] ? styles.ativo : styles.inativo}>T</em> 
                        <em className={dias![2] ? styles.ativo : styles.inativo}>Q</em> 
                        <em className={dias![3] ? styles.ativo : styles.inativo}>Q</em> 
                        <em className={dias![4] ? styles.ativo : styles.inativo}>S</em>
                    </span>
                    <div className={styles.content}>
                        {nome}<br />
                        <strong>{turma}</strong>
                    </div>
                </div>
        </div>
    );
}