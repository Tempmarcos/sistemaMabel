import { Children } from "react";
import styles from './dropdown.module.css'

interface DropdownProps{
   children : React.ReactNode;
    name : string;
}

export default function DropdownButton({children, name} : DropdownProps){
    return (
        <div className={styles.dropdown}>
         <button className={styles.dropbtn}>{name}</button>
         <div className={styles.dropdownContent}>
             {children}
         </div>
        </div>
    )
}