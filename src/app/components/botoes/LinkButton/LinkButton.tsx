import styles from './linkbutton.module.css'
import { temas } from '@/app/(logged)/temas';

interface ILinkButton {
    texto: string;
    link: string;
}

export default function LinkButton({ texto, link } : ILinkButton){
    return(
        <a className={styles.button} href={'/' + link} 
        style={{color: 'black', backgroundColor: 'orange'}}>{texto}</a>
    )
}