import styles from './dropdown.module.css'

interface DropdownProps{
    children : React.ReactNode;
    name : string;
    corElemento: string;
    corTexto: string;
}

export default function DropdownButton({children, name, corElemento, corTexto} : DropdownProps){
    return (
        <div className={styles.dropdown}>
         <button style={{backgroundColor: corElemento, color: corTexto}} className={styles.dropbtn}>{name}</button>
         <div className={styles.dropdownContent} style={{backgroundColor: corElemento}}>
             {children}
         </div>
        </div>
    )
}