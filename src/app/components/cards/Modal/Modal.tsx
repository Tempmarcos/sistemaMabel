import styles from './modal.module.css'
import { temas } from '@/app/(logged)/temas';



interface IModal {
    children : React.ReactNode;
    display : string;
    onClick : () => void;
    // onClickMin : () => void;
}


export default function Modal({ children, display, onClick } : IModal){
    
    return (
        <div className={styles.modal} style={{backgroundColor: temas.corFundo, border: '3px solid',
        borderColor: temas.corElemento, display: display}}>
            {children}
            <a onClick={onClick}><h1 className={styles.x}>✖</h1></a>
            {/* <a onClick={onClickMin}><h2>—</h2></a> */}
        </div>
    )
}