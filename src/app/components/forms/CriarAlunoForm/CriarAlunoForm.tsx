import styles from './modal.module.css'
import { useForm, SubmitHandler } from "react-hook-form"



export default function CriarAlunoForm(){
    return (
        <div className={styles.modal}>
            <form className={styles.input}>
                <label htmlFor='nome'>Nome</label> <input id="nome" type="text"  /> <br />
                <label htmlFor='idade'>Idade</label> <input id='idade' type="number" /> <br />
                <label htmlFor='turma'>Turma</label> <input id='turma' type="text" /> <br />
                <label htmlFor='plano'>Plano</label> <input id='plano' type="number" />
                <label htmlFor="almoco">Almoço:</label> <input id="almoco" type="checkbox"  />
           </form>
        </div>
    );
}