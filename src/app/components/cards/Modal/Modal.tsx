import styles from './modal.module.css'
import { temas } from '@/app/(logged)/temas';



interface IModal {
    children : React.ReactNode;
    display : string;
    onClick : () => void;
}


export default function Modal({ children, display, onClick } : IModal){
    
    return (
        <div className={styles.modal} style={{backgroundColor: temas.corFundo, border: '3px solid',
        borderColor: temas.corElemento, display: display}}>
            {children}
            <a onClick={onClick}><h1>✖</h1></a>
        </div>
    )
}