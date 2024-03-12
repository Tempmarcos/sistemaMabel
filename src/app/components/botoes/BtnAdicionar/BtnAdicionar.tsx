import styles from './adicionarAluno.module.css'

interface IBtnAdicionar {
    corElemento: string;
    corTexto: string;
    title: string;
}

export default function BtnAdicionar({corElemento, corTexto, title} : IBtnAdicionar){
    return (
        <span className={styles.button} style={{backgroundColor: corElemento, color: corTexto}} title={title}>+</span>
    );
}