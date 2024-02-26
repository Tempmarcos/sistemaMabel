import styles from './modal.module.css'



export default function ModalCard(){
    return (
        <div className={styles.modal}>
            <span className={styles.input}>
                <h1>Nome</h1> <input type="text" name="" id="" /> <br />
                <h1>Idade</h1> <input type="number" /> <br />
                <h1>Turma</h1> <input type="text" /> <br />
                <h1>Plano</h1> <input type="number" />
           </span>
        </div>
    );
}